import { NextRequest, NextResponse } from "next/server";

/**
 * Verifies the shared-secret header sent by trusted external callers
 * (e.g. the ElevenLabs voice agent) on write/lookup endpoints that used
 * to be reachable only from our own frontend.
 *
 * Set TOOL_API_KEY in Vercel env vars, and configure the same value as
 * a header (x-bukwin-tool-key) on every ElevenLabs Server Tool.
 *
 * If TOOL_API_KEY is not set, this is a no-op (so local dev / your own
 * frontend calls are unaffected) — but you should always set it before
 * connecting a real voice agent, since these endpoints write to your
 * real calendar and send real emails.
 */
export function verifyToolKey(req: NextRequest): NextResponse | null {
  const required = process.env.TOOL_API_KEY;
  if (!required) return null; // not configured — allow through (dev mode)

  const provided = req.headers.get("x-bukwin-tool-key");
  if (provided !== required) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
