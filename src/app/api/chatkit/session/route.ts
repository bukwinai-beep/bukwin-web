import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// SERVER-SIDE ONLY. This is the "gatekeeper" pattern ChatKit requires:
// the browser never sees OPENAI_API_KEY. It calls this route, we call
// OpenAI with our secret key, and hand back a short-lived client_secret
// that's safe to use in the browser for one chat session.
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.CHATKIT_WORKFLOW_ID;

    if (!apiKey || !workflowId) {
      return NextResponse.json(
        { error: "ChatKit is not configured on the server yet." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    // A unique-per-visitor identifier. Cookie-based device id is fine here —
    // it just needs to be roughly stable per browser, not personally verified.
    const user: string = body.deviceId || `guest-${Date.now()}`;

    const res = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[/api/chatkit/session] OpenAI error:", errText);
      return NextResponse.json(
        { error: "Could not start a chat session. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ client_secret: data.client_secret });
  } catch (err) {
    console.error("[/api/chatkit/session] error:", err);
    return NextResponse.json(
      { error: "Could not start a chat session." },
      { status: 500 }
    );
  }
}
