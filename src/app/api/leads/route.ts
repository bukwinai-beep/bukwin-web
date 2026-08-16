import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().email("Please enter a valid email"),
  businessName: z.string().max(200).optional().nullable(),
  phone: z
    .string()
    .max(40)
    .optional()
    .nullable()
    .or(z.literal("")),
  industry: z.string().max(80).optional().nullable(),
  callVolume: z.string().max(40).optional().nullable(),
  scheduler: z.string().max(80).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  source: z.string().max(40).default("homepage_cta"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        businessName: parsed.data.businessName ?? null,
        phone: parsed.data.phone || null,
        industry: parsed.data.industry ?? null,
        callVolume: parsed.data.callVolume ?? null,
        scheduler: parsed.data.scheduler ?? null,
        message: parsed.data.message ?? null,
        source: parsed.data.source,
      },
    });

    return NextResponse.json({
      success: true,
      id: lead.id,
      message:
        "Thanks! We'll reach out within 2 business hours — usually faster.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/leads] error:", message);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.lead.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
