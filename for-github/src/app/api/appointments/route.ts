import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { format } from "date-fns-tz";
import { db } from "@/lib/db";
import { isSlotFree, createCalendarEvent } from "@/lib/google-calendar";
import { sendBookingConfirmationEmail } from "@/lib/email";
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

const BookingSchema = z.object({
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().email(),
  customerPhone: z.string().max(40).optional().nullable(),
  service: z.string().min(1),
  // Must be an exact ISO instant, ideally one previously returned by
  // /api/appointments/availability. We do not trust it blindly — see checks below.
  start: z.string().datetime({ offset: true }),
  notes: z.string().max(1000).optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = BookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid booking request" },
        { status: 400 }
      );
    }

    const { customerName, customerEmail, customerPhone, service, start, notes } =
      parsed.data;

    const serviceDef = getServiceById(service);
    const durationMinutes =
      serviceDef?.durationMinutes ?? DEFAULT_APPOINTMENT_DURATION_MINUTES;
    const serviceName = serviceDef?.name ?? service;

    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) {
      return NextResponse.json({ error: "Invalid start time." }, { status: 400 });
    }
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    // --- Defense-in-depth checks (never trust client-provided times blindly) ---
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

    // --- Final availability check against the real calendar, immediately before booking ---
    let free: boolean;
    try {
      free = await isSlotFree(startDate.toISOString(), endDate.toISOString());
    } catch (err) {
      console.error("[/api/appointments] calendar check error:", err);
      return NextResponse.json(
        { error: "Could not verify calendar availability. Please try again." },
        { status: 502 }
      );
    }
    if (!free) {
      return NextResponse.json(
        { error: "That time was just taken. Please choose another slot." },
        { status: 409 }
      );
    }

    // --- Atomically claim the slot in our own DB (protects against a second
    // request racing between the calendar check above and the calendar
    // event creation below). SQLite serializes writes per-connection, so an
    // interactive transaction here is a reliable enough lock for a single
    // deployed instance. ---
    let appointmentId: string;
    try {
      appointmentId = await db.$transaction(async (tx) => {
        const conflict = await tx.appointment.findFirst({
          where: {
            status: { in: ["PENDING", "CONFIRMED"] },
            startTime: { lt: endDate },
            endTime: { gt: startDate },
          },
          select: { id: true },
        });
        if (conflict) {
          throw new Error("SLOT_TAKEN");
        }

        const created = await tx.appointment.create({
          data: {
            customerName,
            customerEmail,
            customerPhone: customerPhone || null,
            service: serviceName,
            startTime: startDate,
            endTime: endDate,
            timezone: BUSINESS_TIMEZONE,
            status: "PENDING",
            notes: notes || null,
          },
        });
        return created.id;
      });
    } catch (err) {
      if (err instanceof Error && err.message === "SLOT_TAKEN") {
        return NextResponse.json(
          { error: "That time was just taken. Please choose another slot." },
          { status: 409 }
        );
      }
      console.error("[/api/appointments] DB transaction error:", err);
      return NextResponse.json(
        { error: "Could not save the appointment. Please try again." },
        { status: 500 }
      );
    }

    // --- Create the real Google Calendar event ---
    let calendarEventId: string | null = null;
    let calendarLink: string | null = null;
    try {
      const event = await createCalendarEvent({
        summary: `${serviceName} — ${customerName}`,
        description: [
          `Booked via ${BUSINESS_NAME} AI receptionist.`,
          customerPhone ? `Phone: ${customerPhone}` : null,
          notes ? `Notes: ${notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        startISO: startDate.toISOString(),
        endISO: endDate.toISOString(),
        timeZone: BUSINESS_TIMEZONE,
        attendeeEmail: customerEmail,
        attendeeName: customerName,
      });
      calendarEventId = event.id;
      calendarLink = event.htmlLink;
    } catch (err) {
      console.error("[/api/appointments] calendar event creation failed:", err);
      // Roll back our DB claim so the slot isn't stuck as PENDING forever.
      await db.appointment
        .update({ where: { id: appointmentId }, data: { status: "CANCELLED" } })
        .catch(() => {});
      return NextResponse.json(
        {
          error:
            "Could not create the calendar event, so the booking was not completed. Please try again.",
        },
        { status: 502 }
      );
    }

    const confirmed = await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "CONFIRMED", calendarEventId },
    });

    const localLabel = format(startDate, "EEEE, MMM d 'at' h:mm a", {
      timeZone: BUSINESS_TIMEZONE,
    });

    // Best-effort — never fails the booking response.
    const emailResult = await sendBookingConfirmationEmail({
      toEmail: customerEmail,
      customerName,
      service: serviceName,
      startLabel: localLabel,
      timezone: BUSINESS_TIMEZONE,
      calendarLink,
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: confirmed.id,
        service: serviceName,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        timezone: BUSINESS_TIMEZONE,
        localLabel,
        status: confirmed.status,
        calendarEventId,
      },
      emailSent: emailResult.sent,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/appointments] error:", message);
    return NextResponse.json(
      { error: "Could not complete the booking. Please try again." },
      { status: 500 }
    );
  }
}

// Lightweight listing for the internal dashboard — not used by the agent.
export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      where: { status: { in: ["PENDING", "CONFIRMED"] } },
      orderBy: { startTime: "asc" },
      take: 50,
    });
    return NextResponse.json({ appointments });
  } catch {
    return NextResponse.json({ appointments: [] });
  }
}
