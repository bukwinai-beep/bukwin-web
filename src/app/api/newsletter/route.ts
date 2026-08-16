import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Schema = z.object({
  email: z.string().email("Please enter a valid email"),
  source: z.string().max(40).default("footer"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid email" },
        { status: 400 }
      );
    }

    // Upsert so re-subscribes don't crash
    const sub = await db.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { source: parsed.data.source },
      create: {
        email: parsed.data.email,
        source: parsed.data.source,
      },
    });

    return NextResponse.json({
      success: true,
      id: sub.id,
      message: "You're on the list. We'll send only useful stuff.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/newsletter] error:", message);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 }
    );
  }
}
