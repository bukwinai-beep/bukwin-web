import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { format, fromZonedTime, toZonedTime } from "date-fns-tz";
import { db } from "@/lib/db";
import { isSlotFree, createCalendarEvent } from "@/lib/google-calendar";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { verifyToolKey } from "@/lib/verify-tool-key";
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
  // Ideally an exact instant (with Z/offset) previously returned by
  // /api/appointments/availability. We do NOT hard-require the offset here
  // anymore — AI agents occasionally strip it despite instructions — and
  // instead normalize it ourselves below. See normalizeStartToUTC().
  start: z.string().min(1),
  notes: z.string().max(1000).optional().nullable(),
});

/**
 * Converts a caller-supplied `start` string into a real UTC Date, no
 * matter whether it arrived as a fully-qualified instant (with Z or a
 * numeric offset, e.g. "2026-08-28T06:00:00.000Z") or — due to an AI
 * agent occasionally dropping the offset despite instructions — as a
 * naive local-looking string with no offset (e.g. "2026-08-28T11:00:00").
 *
 * A naive string is assumed to represent business-local time
 * (BUSINESS_TIMEZONE) and is converted to the correct UTC instant
 * accordingly, rather than being misread as UTC (which previously
 * caused bookings to land 5 hours off for Asia/Karachi).
 *
 * Returns null if the string can't be parsed as a valid date at all.
 */
function normalizeStartToUTC(raw: string): Date | null {
  const hasOffset = /Z$|[+-]\d{2}:?\d{2}$/.test(raw.trim());

  if (hasOffset) {
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // No offset present — treat as business-local wall-clock time.
  try {
    const d = fromZonedTime(raw, BUSINESS_TIMEZONE);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = verifyToolKey(req);
    if (authError) return authError;

    const body = await req.json().catch(() => ({}));
    const parsed = BookingSchema.safeParse(body);

    if (!parsed.success) {
      console.error(
        "[/api/appointments] validation failed. Body received:",
        JSON.stringify(body),
        "Issues:",
        JSON.stringify(parsed.error.issues)
      );
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

    const startDate = normalizeStartToUTC(start);
    if (!startDate) {
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

    const localLabel = format(
      toZonedTime(startDate, BUSINESS_TIMEZONE),
      "EEEE, MMM d 'at' h:mm a"
    );

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
