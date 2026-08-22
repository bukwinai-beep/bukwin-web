import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QuerySchema = z.object({
  email: z.string().email(),
  status: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.safeParse({
      email: searchParams.get("email") ?? "",
      status: searchParams.get("status") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid query" },
        { status: 400 }
      );
    }

    const { email, status } = parsed.data;

    const appointments = await db.appointment.findMany({
      where: {
        customerEmail: email,
        status: status ? { equals: status } : { in: ["PENDING", "CONFIRMED"] },
      },
      orderBy: { startTime: "asc" },
      take: 10,
    });

    return NextResponse.json({
      email,
      appointments: appointments.map((a) => ({
        id: a.id,
        customerName: a.customerName,
        service: a.service,
        start: a.startTime.toISOString(),
        end: a.endTime.toISOString(),
        timezone: a.timezone,
        status: a.status,
        notes: a.notes,
        calendarEventId: a.calendarEventId,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/appointments/lookup] error:", message);
    return NextResponse.json(
      { error: "Could not look up appointments." },
      { status: 500 }
    );
  }
}
