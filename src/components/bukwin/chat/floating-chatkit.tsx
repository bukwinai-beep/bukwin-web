"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Set these in your deployment environment (.env / hosting provider) —
// see docs/BOOKING-SETUP.md. No placeholder fallback in production: an
// unset value means the widget simply won't initialize rather than
// silently pointing at a demo workflow that isn't yours.
// Workflow ID is safe to be public — it just identifies which Agent Builder
// workflow to talk to. The actual secret (OPENAI_API_KEY) never leaves the
// server; see /api/chatkit/session/route.ts.
const WORKFLOW_CONFIGURED = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_CONFIGURED === "true";

function getDeviceId(): string {
  if (typeof window === "undefined") return "server";
  const key = "bukwin_chatkit_device_id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

async function fetchClientSecret(): Promise<string> {
  const res = await fetch("/api/chatkit/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: getDeviceId() }),
  });
  if (!res.ok) {
    throw new Error("Could not start chat session");
  }
  const data = await res.json();
  return data.client_secret;
}

export function FloatingChatKit() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 100;

    function initChatKit() {
      const kit = document.querySelector("openai-chatkit") as any;
      if (kit && kit.setOptions) {
        kit.setOptions({
          api: {
            // ChatKit calls this whenever it needs a session (first load,
            // and again automatically when a session expires). We never
            // hand the browser a permanent key — just short-lived tokens.
            getClientSecret: async (currentClientSecret: string | null) => {
              return fetchClientSecret();
            },
          },
          // This is the piece that actually connects the agent's
          // check_availability / book_appointment tool calls (defined in
          // Agent Builder) to our real backend routes. Agent Builder only
          // defines the *shape* of these tools — it can't call our API by
          // itself. ChatKit intercepts the tool call in the browser here,
          // we run the fetch, and whatever we return goes back to the agent
          // as the tool's result.
          onClientTool: async (toolCall: { name: string; params: Record<string, any> }) => {
            try {
              if (toolCall.name === "check_availability") {
                const qs = new URLSearchParams({
                  date: String(toolCall.params.date ?? ""),
                  service: String(toolCall.params.service ?? ""),
                });
                const res = await fetch(`/api/appointments/availability?${qs.toString()}`);
                return await res.json();
              }

              if (toolCall.name === "book_appointment") {
                const res = await fetch("/api/appointments", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(toolCall.params),
                });
                return await res.json();
              }

              return { error: `Unknown tool: ${toolCall.name}` };
            } catch (err) {
              console.error("[FloatingChatKit] client tool error:", err);
              return {
                error:
                  "Something went wrong reaching the booking system. Please try again in a moment.",
              };
            }
          },
          theme: {
            colorScheme: "light",
            color: {
              accent: { primary: "#4F46E5", level: 2 },
            },
            radius: "round",
            density: "spacious",
          },
          startScreen: {
            greeting:
              "Hi! I can help you book, reschedule, or cancel appointments. What would you like to do?",
            prompts: [
              {
                label: "Book an appointment",
                prompt: "I want to book an appointment",
                icon: "calendar",
              },
              {
                label: "Check availability",
                prompt: "What times are available?",
                icon: "clock",
              },
              {
                label: "Reschedule",
                prompt: "I need to reschedule my appointment",
                icon: "reload",
              },
            ],
          },
          composer: {
            placeholder: "Ask me about scheduling...",
          },
        });
        setIsReady(true);
        return true;
      }
      return false;
    }

    const interval = setInterval(() => {
      attempts++;
      if (initChatKit() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!WORKFLOW_CONFIGURED) {
    // No env config yet — don't render a bubble that opens onto nothing.
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full border-none",
          "bg-[#4F46E5] text-white cursor-pointer",
          "shadow-lg hover:shadow-xl hover:scale-105",
          "flex items-center justify-center transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-[9998] w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)]",
          "rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200",
          "transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <openai-chatkit style={{ width: "100%", height: "100%", display: "block" }} />
      </div>
    </>
  );
}
