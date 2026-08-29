"use client";

import { useEffect, useState, useRef } from "react";
import { io as ioClient, type Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Phone, ArrowRight } from "lucide-react";
import { LivePulse } from "./live-pulse";
import { cn } from "@/lib/utils";

type CallEvent = {
  id: string;
  callerName: string;
  callerNumber: string;
  scenario: string;
  outcome: "ringing" | "answered" | "booked" | "transferred" | "qualified";
  duration?: number;
  language?: string;
  sentiment?: "positive" | "neutral" | "negative";
  timestamp: string;
};

export function LiveCallFeed({ className }: { className?: string }) {
  const [events, setEvents] = useState<CallEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Per the gateway convention: use relative path with XTransformPort query
    const socket = ioClient("/?XTransformPort=3004", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1500,
      timeout: 8000,
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", () => setConnected(false));

    socket.on("call-event", (event: CallEvent) => {
      setEvents((prev) => [event, ...prev].slice(0, 8));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={cn("rounded-2xl border border-border bg-background p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="h-4 w-4 text-accent" />
          <span className="text-xs uppercase tracking-[0.15em] text-text-secondary">
            Live call feed
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[10px] font-medium",
            connected ? "text-success" : "text-text-muted"
          )}
        >
          <LivePulse color={connected ? "bg-success" : "bg-text-muted"} />
          {connected ? "Streaming" : "Offline"}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary animate-pulse">
            <PhoneCall className="h-4 w-4 text-text-muted" />
          </div>
          <p className="mt-3 text-xs text-text-muted">
            {connected ? "Waiting for the next call to come in…" : "Connecting to live feed…"}
          </p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[260px] overflow-y-auto scroll-bukwin">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.li
                key={event.id}
                layout
                initial={{ opacity: 0, y: -10, backgroundColor: "rgba(79, 70, 229, 0.14)" }}
                animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2.5"
              >
                <div
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-medium",
                    outcomeStyle(event.outcome)
                  )}
                >
                  {event.callerName.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-primary truncate">
                      {event.callerName}
                    </p>
                    <span className="text-[10px] text-text-muted font-mono shrink-0">
                      {formatTime(event.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide",
                        outcomeBadge(event.outcome)
                      )}
                    >
                      {event.outcome === "transferred" ? (
                        <ArrowRight className="h-2.5 w-2.5" />
                      ) : (
                        <Phone className="h-2.5 w-2.5" />
                      )}
                      {event.outcome}
                    </span>
                    <span className="text-[11px] text-text-secondary truncate">
                      {event.scenario}
                    </span>
                    {event.language && event.language !== "English" && (
                      <span className="text-[10px] text-accent font-mono shrink-0">
                        · {event.language}
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

function outcomeStyle(outcome: CallEvent["outcome"]): string {
  switch (outcome) {
    case "booked":
      return "bg-success/15 text-success";
    case "qualified":
      return "bg-accent/15 text-accent";
    case "transferred":
      return "bg-primary/10 text-primary";
    default:
      return "bg-secondary text-text-secondary";
  }
}

function outcomeBadge(outcome: CallEvent["outcome"]): string {
  switch (outcome) {
    case "booked":
      return "bg-success/15 text-success";
    case "qualified":
      return "bg-accent/15 text-accent";
    case "transferred":
      return "bg-primary/10 text-primary";
    case "answered":
      return "bg-secondary text-text-secondary";
    default:
      return "bg-secondary text-text-secondary";
  }
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
