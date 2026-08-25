import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fromZonedTime, toZonedTime, format } from "date-fns-tz";
import { db } from "@/lib/db";
import { getBusyPeriods } from "@/lib/google-calendar";
import {
  BUSINESS_TIMEZONE,
  BUSINESS_HOURS_START,
  BUSINESS_HOURS_END,
  WORKING_DAYS,
  DEFAULT_APPOINTMENT_DURATION_MINUTES,
  MAX_BOOKING_HORIZON_DAYS,
  MIN_BOOKING_NOTICE_MINUTES,
  getServiceById,
} from "@/lib/business-config";
import { verifyToolKey } from "@/lib/verify-tool-key";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  service: z.string().optional(),
});

function parseHHMM(hhmm: string): { h: number; m: number } {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return { h, m };
}

export async function GET(req: NextRequest) {
  try {
    const authError = verifyToolKey(req);
    if (authError) return authError;

    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.safeParse({
      date: searchParams.get("date") ?? "",
      service: searchParams.get("service") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid query" },
        { status: 400 }
      );
    }

    const { date } = parsed.data;
    const duration = parsed.data.service
      ? getServiceById(parsed.data.service)?.durationMinutes ??
        DEFAULT_APPOINTMENT_DURATION_MINUTES
      : DEFAULT_APPOINTMENT_DURATION_MINUTES;

    // Bound how far ahead someone can query/book.
    const requestedDay = fromZonedTime(`${date}T00:00:00`, BUSINESS_TIMEZONE);
    const now = new Date();
    const horizonMs = MAX_BOOKING_HORIZON_DAYS * 24 * 60 * 60 * 1000;
    if (requestedDay.getTime() - now.getTime() > horizonMs) {
      return NextResponse.json({ date, timezone: BUSINESS_TIMEZONE, slots: [] });
    }

    // Closed day?
    // toZonedTime shifts the instant so the wall-clock value must be read
    // with UTC getters — this keeps the result correct regardless of the
    // server host's own local timezone.
    const localDow = toZonedTime(requestedDay, BUSINESS_TIMEZONE).getUTCDay();
    if (!WORKING_DAYS.includes(localDow)) {
      return NextResponse.json({ date, timezone: BUSINESS_TIMEZONE, slots: [] });
    }

    const { h: startH, m: startM } = parseHHMM(BUSINESS_HOURS_START);
    const { h: endH, m: endM } = parseHHMM(BUSINESS_HOURS_END);

    const dayStartUTC = fromZonedTime(
      `${date}T${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}:00`,
      BUSINESS_TIMEZONE
    );
    const dayEndUTC = fromZonedTime(
      `${date}T${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}:00`,
      BUSINESS_TIMEZONE
    );

    // Generate candidate slots on a fixed grid (every `duration` minutes).
    const candidates: { startUTC: Date; endUTC: Date }[] = [];
    let cursor = new Date(dayStartUTC);
    while (cursor.getTime() + duration * 60000 <= dayEndUTC.getTime()) {
      const slotEnd = new Date(cursor.getTime() + duration * 60000);
      candidates.push({ startUTC: new Date(cursor), endUTC: slotEnd });
      cursor = slotEnd;
    }

    // Drop anything inside the minimum notice window.
    const earliestBookable = new Date(
      now.getTime() + MIN_BOOKING_NOTICE_MINUTES * 60000
    );
    const futureCandidates = candidates.filter(
      (c) => c.startUTC.getTime() >= earliestBookable.getTime()
    );

    if (futureCandidates.length === 0) {
      return NextResponse.json({ date, timezone: BUSINESS_TIMEZONE, slots: [] });
    }

    // Real calendar busy periods for the whole business day.
    let busy: { start: string; end: string }[] = [];
    try {
      busy = await getBusyPeriods(dayStartUTC.toISOString(), dayEndUTC.toISOString());
    } catch (err) {
      console.error("[/api/appointments/availability] calendar error:", err);
      return NextResponse.json(
        { error: "Could not reach the calendar right now. Please try again shortly." },
        { status: 502 }
      );
    }

    // Also cross-check our own DB in case of calendar sync lag.
    const dbAppointments = await db.appointment.findMany({
      where: {
        status: { in: ["PENDING", "CONFIRMED"] },
        startTime: { gte: dayStartUTC, lt: dayEndUTC },
      },
      select: { startTime: true, endTime: true },
    });

    const isBusy = (start: Date, end: Date) => {
      const overlapsBusy = busy.some((b) => {
        const bStart = new Date(b.start).getTime();
        const bEnd = new Date(b.end).getTime();
        return start.getTime() < bEnd && end.getTime() > bStart;
      });
      if (overlapsBusy) return true;

      return dbAppointments.some((a) => {
        return (
          start.getTime() < a.endTime.getTime() &&
          end.getTime() > a.startTime.getTime()
        );
      });
    };

    const openSlots = futureCandidates
      .filter((c) => !isBusy(c.startUTC, c.endUTC))
      .map((c) => ({
        start: c.startUTC.toISOString(),
        end: c.endUTC.toISOString(),
        label: format(c.startUTC, "EEE MMM d, h:mm a", {
          timeZone: BUSINESS_TIMEZONE,
        }),
      }));

    return NextResponse.json({
      date,
      timezone: BUSINESS_TIMEZONE,
      durationMinutes: duration,
      slots: openSlots,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/appointments/availability] error:", message);
    return NextResponse.json(
      { error: "Could not load availability." },
      { status: 500 }
    );
  }
}
