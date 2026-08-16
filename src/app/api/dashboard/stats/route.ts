import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [leadCount, subscriberCount, chatSessionCount, recentLeads] =
      await Promise.all([
        db.lead.count(),
        db.newsletterSubscriber.count(),
        db.chatSession.count(),
        db.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            name: true,
            email: true,
            businessName: true,
            industry: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    // Calls answered today (simulated — based on time of day)
    const DAY_START = new Date().setHours(0, 0, 0, 0);
    const MS_PER_CALL = 47_000;
    const callsToday = Math.floor((Date.now() - DAY_START) / MS_PER_CALL) + 1847;

    return NextResponse.json({
      leads: leadCount,
      subscribers: subscriberCount,
      chatSessions: chatSessionCount,
      callsToday,
      recentLeads: recentLeads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        businessName: l.businessName,
        industry: l.industry,
        status: l.status,
        createdAt: l.createdAt.toISOString(),
        timeAgo: timeAgo(l.createdAt),
      })),
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[/api/dashboard/stats]", err);
    return NextResponse.json(
      { error: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
