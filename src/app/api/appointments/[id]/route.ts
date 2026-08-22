import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { format } from "date-fns-tz";
import { db } from "@/lib/db";
import {
  isSlotFree,
  createCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/google-calendar";
import {
  sendBookingConfirmationEmail,
  sendRescheduleEmail,
  sendCancellationEmail,
} from "@/lib/email";
import {
  BUSINESS_TIMEZONE,
  BUSINESS_NAME,
  DEFAULT_APPOINTMENT_DURATION_MINUTES,
  MAX_BOOKING_HORIZON_DAYS,
  MIN_BOOKING_NOTICE_MINUTES,
  getServiceById,
} from "@/lib/business-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── PATCH: Reschedule ──────────────────────────────────────────────────────
const RescheduleSchema = z.object({
  start: z.string().datetime({ offset: true }),
  service: z.string().optional(),
  notes: z.string().max(1000).optional().nullable(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const parsed = RescheduleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid reschedule request" },
        { status: 400 }
      );
    }

    const { start, service, notes } = parsed.data;
    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) {
      return NextResponse.json({ error: "Invalid start time." }, { status: 400 });
    }

    const existing = await db.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }
    if (existing.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This appointment has already been cancelled." },
        { status: 409 }
      );
    }

    const serviceDef = service ? getServiceById(service) : undefined;
    const durationMinutes =
      serviceDef?.durationMinutes ??
      getServiceById(existing.service)?.durationMinutes ??
      DEFAULT_APPOINTMENT_DURATION_MINUTES;
    const serviceName = serviceDef?.name ?? existing.service;

    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    const now = new Date();
    const earliestBookable = new Date(now.getTime() + MIN_BOOKING_NOTICE_MINUTES * 60000);
    if (startDate.getTime() < earliestBookable.getTime()) {
      return NextResponse.json(
        { error: "That time is too soon to book. Please choose a later slot." },
        { status: 400 }
      );
    }
    const horizonMs = MAX_BOOKING_HORIZON_DAYS * 24 * 60 * 60 * 1000;
    if (startDate.getTime() - now.getTime() > horizonMs) {
      return NextResponse.json(
        { error: "That date is too far in the future to book." },
        { status: 400 }
      );
    }

    let free: boolean;
    try {
      free = await isSlotFree(startDate.toISOString(), endDate.toISOString());
    } catch (err) {
      console.error("[/api/appointments/:id] calendar check error:", err);
      return NextResponse.json(
        { error: "Could not verify calendar availability. Please try again." },
        { status: 502 }
      );
    }

    const dbConflict = await db.appointment.findFirst({
      where: {
        id: { not: id },
        status: { in: ["PENDING", "CONFIRMED"] },
        startTime: { lt: endDate },
        endTime: { gt: startDate },
      },
      select: { id: true },
    });

    if (!free || dbConflict) {
      return NextResponse.json(
        { error: "That time is no longer available. Please choose another slot." },
        { status: 409 }
      );
    }

    if (existing.calendarEventId) {
      try {
        await deleteCalendarEvent(existing.calendarEventId);
      } catch (err) {
        console.error("[/api/appointments/:id] failed to delete old calendar event:", err);
      }
    }

    let calendarEventId: string | null = null;
    let calendarLink: string | null = null;
    try {
      const event = await createCalendarEvent({
        summary: `${serviceName} — ${existing.customerName}`,
        description: [
          `Rescheduled via ${BUSINESS_NAME} AI receptionist.`,
          existing.customerPhone ? `Phone: ${existing.customerPhone}` : null,
          notes ? `Notes: ${notes}` : existing.notes ? `Notes: ${existing.notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        startISO: startDate.toISOString(),
        endISO: endDate.toISOString(),
        timeZone: BUSINESS_TIMEZONE,
        attendeeEmail: existing.customerEmail,
        attendeeName: existing.customerName,
      });
      calendarEventId = event.id;
      calendarLink = event.htmlLink;
    } catch (err) {
      console.error("[/api/appointments/:id] calendar event creation failed:", err);
      return NextResponse.json(
        { error: "Could not create the new calendar event. Please try again." },
        { status: 502 }
      );
    }

    const updated = await db.appointment.update({
      where: { id },
      data: {
        service: serviceName,
        startTime: startDate,
        endTime: endDate,
        status: "CONFIRMED",
        notes: notes ?? existing.notes,
        calendarEventId,
      },
    });

    const localLabel = format(startDate, "EEEE, MMM d 'at' h:mm a", {
      timeZone: BUSINESS_TIMEZONE,
    });

    const emailResult = await sendRescheduleEmail({
      toEmail: existing.customerEmail,
      customerName: existing.customerName,
      service: serviceName,
      startLabel: localLabel,
      timezone: BUSINESS_TIMEZONE,
      calendarLink,
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: updated.id,
        service: serviceName,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        timezone: BUSINESS_TIMEZONE,
        localLabel,
        status: updated.status,
        calendarEventId,
      },
      emailSent: emailResult.sent,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/appointments/:id] PATCH error:", message);
    return NextResponse.json(
      { error: "Could not reschedule the appointment. Please try again." },
      { status: 500 }
    );
  }
}

// ─── DELETE: Cancel ─────────────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }
    if (existing.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This appointment is already cancelled." },
        { status: 409 }
      );
    }

    if (existing.calendarEventId) {
      try {
        await deleteCalendarEvent(existing.calendarEventId);
      } catch (err) {
        console.error("[/api/appointments/:id] failed to delete calendar event:", err);
      }
    }

    const updated = await db.appointment.update({
      where: { id },
      data: { status: "CANCELLED", calendarEventId: null },
    });

    const localLabel = format(existing.startTime, "EEEE, MMM d 'at' h:mm a", {
      timeZone: BUSINESS_TIMEZONE,
    });

    const emailResult = await sendCancellationEmail({
      toEmail: existing.customerEmail,
      customerName: existing.customerName,
      service: existing.service,
      startLabel: localLabel,
      timezone: BUSINESS_TIMEZONE,
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: updated.id,
        service: updated.service,
        start: existing.startTime.toISOString(),
        end: existing.endTime.toISOString(),
        timezone: BUSINESS_TIMEZONE,
        localLabel,
        status: updated.status,
      },
      emailSent: emailResult.sent,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/appointments/:id] DELETE error:", message);
    return NextResponse.json(
      { error: "Could not cancel the appointment. Please try again." },
      { status: 500 }
    );
  }
}
