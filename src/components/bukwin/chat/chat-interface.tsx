"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { onChatKitScriptLoad } from "@/components/bukwin/shared/chatkit-script";
import { Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const text = await res.text().catch(() => "");
    throw new Error(`Session failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  if (!data.client_secret) {
    throw new Error("No client_secret returned from server");
  }
  return data.client_secret;
}

type ChatKitStatus = "loading" | "ready" | "error" | "not-configured";

interface ChatInterfaceProps {
  className?: string;
  onStatusChange?: (status: ChatKitStatus) => void;
}

export function ChatInterface({ className, onStatusChange }: ChatInterfaceProps) {
  const [status, setStatus] = useState<ChatKitStatus>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const kitRef = useRef<HTMLElement | null>(null);
  const initializedRef = useRef(false);

  const updateStatus = useCallback(
    (s: ChatKitStatus, msg?: string) => {
      setStatus(s);
      if (msg) setErrorMsg(msg);
      onStatusChange?.(s);
    },
    [onStatusChange]
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const WORKFLOW_CONFIGURED =
      process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_CONFIGURED === "true";

    if (!WORKFLOW_CONFIGURED) {
      updateStatus("not-configured", "ChatKit is not configured. Set NEXT_PUBLIC_CHATKIT_WORKFLOW_CONFIGURED=true");
      return;
    }

    const init = async () => {
      try {
        // Wait for the ChatKit script to load
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("ChatKit script load timeout (10s)"));
          }, 10000);

          onChatKitScriptLoad(() => {
            clearTimeout(timeout);
            resolve();
          });
        });

        // Wait for custom element to be defined
        await new Promise<void>((resolve, reject) => {
          if (customElements.get("openai-chatkit")) {
            resolve();
            return;
          }
          const timeout = setTimeout(() => {
            reject(new Error("openai-chatkit custom element not registered"));
          }, 5000);

          const check = setInterval(() => {
            if (customElements.get("openai-chatkit")) {
              clearInterval(check);
              clearTimeout(timeout);
              resolve();
            }
          }, 100);
        });

        // Find the element
        const kit = document.querySelector("openai-chatkit") as any;
        if (!kit || !kit.setOptions) {
          throw new Error("openai-chatkit element not found or not initialized");
        }
        kitRef.current = kit;

        // Configure ChatKit
        kit.setOptions({
          api: {
            getClientSecret: async () => {
              return fetchClientSecret();
            },
          },
          onClientTool: async (toolCall: { name: string; params: Record<string, any> }) => {
            console.log("[ChatKit onClientTool]", toolCall.name, toolCall.params);
            try {
              if (toolCall.name === "check_availability") {
                const qs = new URLSearchParams({
                  date: String(toolCall.params.date ?? ""),
                  service: String(toolCall.params.service ?? ""),
                });
                const res = await fetch(`/api/appointments/availability?${qs.toString()}`);
                const data = await res.json();
                if (!res.ok) {
                  return { error: data.error || `Availability check failed (${res.status})` };
                }
                return data;
              }

              if (toolCall.name === "book_appointment") {
                const res = await fetch("/api/appointments", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(toolCall.params),
                });
                const data = await res.json();
                if (!res.ok) {
                  return { error: data.error || `Booking failed (${res.status})` };
                }
                return data;
              }

              if (toolCall.name === "lookup_appointment") {
                const email = String(toolCall.params.email ?? "");
                if (!email) {
                  return { error: "Email is required to look up appointments." };
                }
                const qs = new URLSearchParams({ email });
                const res = await fetch(`/api/appointments/lookup?${qs.toString()}`);
                const data = await res.json();
                if (!res.ok) {
                  return { error: data.error || `Lookup failed (${res.status})` };
                }
                return data;
              }

              if (toolCall.name === "reschedule_appointment") {
                const id = String(toolCall.params.id ?? "");
                const start = String(toolCall.params.start ?? "");
                if (!id || !start) {
                  return { error: "Appointment ID and new start time are required." };
                }
                const res = await fetch(`/api/appointments/${id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    start,
                    service: toolCall.params.service ?? undefined,
                    notes: toolCall.params.notes ?? undefined,
                  }),
                });
                const data = await res.json();
                if (!res.ok) {
                  return { error: data.error || `Reschedule failed (${res.status})` };
                }
                return data;
              }

              if (toolCall.name === "cancel_appointment") {
                const id = String(toolCall.params.id ?? "");
                if (!id) {
                  return { error: "Appointment ID is required to cancel." };
                }
                const res = await fetch(`/api/appointments/${id}`, {
                  method: "DELETE",
                });
                const data = await res.json();
                if (!res.ok) {
                  return { error: data.error || `Cancellation failed (${res.status})` };
                }
                return data;
              }

              return { error: `Unknown tool: ${toolCall.name}` };
            } catch (err) {
              console.error("[ChatInterface] client tool error:", err);
              return {
                error: "Something went wrong reaching the booking system. Please try again in a moment.",
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
              {
                label: "Cancel appointment",
                prompt: "I want to cancel my appointment",
                icon: "x",
              },
            ],
          },
          composer: {
            placeholder: "Ask me about scheduling...",
          },
        });

        updateStatus("ready");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error initializing chat";
        console.error("[ChatInterface] init error:", msg);
        updateStatus("error", msg);
      }
    };

    init();
  }, [updateStatus]);

  if (status === "not-configured") {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <AlertCircle className="h-10 w-10 text-amber-500 mb-3" />
        <p className="text-sm text-gray-600 font-medium">Chat not configured</p>
        <p className="text-xs text-gray-400 mt-1">{errorMsg}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-sm text-gray-700 font-medium">Could not load chat</p>
        <p className="text-xs text-gray-400 mt-1 max-w-[260px]">{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 text-xs font-medium bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338ca] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full", className)}>
        <Loader2 className="h-8 w-8 text-[#4F46E5] animate-spin mb-3" />
        <p className="text-sm text-gray-500">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full relative", className)}>
      <openai-chatkit
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
