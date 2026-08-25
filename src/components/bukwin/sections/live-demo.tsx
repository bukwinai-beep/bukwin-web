"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Send, Calendar, Check, Phone, Loader2 } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { LivePulse } from "../shared/live-pulse";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/business-config";

type Msg = { role: "user" | "agent"; text: string };

type ConfirmedBooking = {
  id: string;
  service: string;
  start: string;
  localLabel: string;
  status: string;
};

type Slot = { start: string; end: string; label: string };

const GREETING =
  "Hi, I'm Bukwin — the AI receptionist you're about to hire. Ask me anything, or book a real call with the team.";

const STARTERS = SERVICES.map((s) => ({
  id: s.id,
  label: s.name,
  message: `I'd like to book a ${s.name.toLowerCase()}.`,
}));

export function LiveDemoSection() {
  const [booking, setBooking] = useState<ConfirmedBooking | null>(null);

  return (
    <Section bg="surface" id="demo" className="border-y border-border">
      <Container size="xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <Eyebrow className="justify-center">Live Demo</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Experience it yourself. No signup required."
            className="mt-5 font-display text-4xl md:text-5xl font-medium leading-[1.15] tracking-[-0.01em] text-primary"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              Talk to the real agent. Anything you book here is a real
              appointment on our real calendar.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
            <ChatPanel onBooked={setBooking} />
            <CalendarPanel booking={booking} />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 text-center text-sm text-text-muted">
            This is not a recording. It&apos;s a real conversation with Bukwin
            AI, backed by our real booking system.
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}

function ChatPanel({ onBooked }: { onBooked: (b: ConfirmedBooking) => void }) {
  const [tab, setTab] = useState<"voice" | "chat">("chat");
  const [messages, setMessages] = useState<Msg[]>([{ role: "agent", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setError(null);
    setInput("");
    const updated = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(updated);
    setTyping(true);

    try {
      const payload = {
        messages: [
          { role: "assistant", content: GREETING },
          ...updated.map((m) => ({
            role: m.role === "agent" ? "assistant" : "user",
            content: m.text,
          })),
        ],
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);

      setTyping(false);
      setMessages((m) => [...m, { role: "agent", text: data.reply || "…" }]);

      if (data.booking) {
        onBooked({
          id: data.booking.id,
          service: data.booking.service,
          start: data.booking.start,
          localLabel: data.booking.localLabel,
          status: data.booking.status,
        });
      }
    } catch (err) {
      setTyping(false);
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Couldn't reach the live agent (${msg}). Please try again in a moment.`);
    }
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="rounded-3xl border border-border bg-background overflow-hidden flex flex-col h-[560px]">
      {/* Minimal top bar — just the chat/voice switch and a status dot */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex gap-1">
          {(["chat", "voice"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                tab === t
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "chat" ? "Chat" : "Voice"}
            </button>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </div>

      {tab === "voice" ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <PhoneCall className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Try a real call</p>
            <p className="mt-1 font-display text-2xl font-medium text-foreground">(555) 019-2834</p>
          </div>
          
            href="tel:5550192834"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            Call now
          </a>
          <p className="text-xs text-muted-foreground max-w-xs">
            Or switch to chat — same agent, same brain, same real booking system.
          </p>
        </div>
      ) : (
        <>
          <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
            {STARTERS.map((s) => (
              <button
                key={s.id}
                onClick={() => send(s.message)}
                disabled={typing}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent/40 hover:text-foreground disabled:opacity-50"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div ref={scrollRef} className="scroll-bukwin flex-1 overflow-y-auto px-4 py-2 space-y-3">
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 inline-flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-3 pb-3 pt-1 shrink-0">
            <form onSubmit={onSend} className="flex items-end gap-2">
              <div className="flex-1 rounded-3xl border border-border bg-secondary/60 px-4 py-2.5 focus-within:border-accent/50 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      onSend(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder={typing ? "Bukwin is thinking…" : "Message Bukwin…"}
                  rows={1}
                  disabled={typing}
                  className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 min-h-[20px] max-h-[100px]"
                />
              </div>
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30"
              >
                {typing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
            {error && <p className="mt-2 text-[11px] text-destructive px-1">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}

function CalendarPanel({ booking }: { booking: ConfirmedBooking | null }) {
  return (
    <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
      <div className="border-b border-border bg-secondary/30 px-5 py-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          <Calendar className="h-4 w-4 text-accent" />
          Live calendar
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-success">
          <LivePulse color="bg-success" />
          Real-time sync
        </span>
      </div>

      <div className="p-5">
        <CalendarMini />

        <AnimatePresence>
          {booking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-accent">New booking</p>
                  <p className="mt-1 text-sm font-medium text-primary">{booking.service}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">Status: {booking.status}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 border border-success/30 px-2 py-0.5 text-[10px] text-success">
                  <Check className="h-3 w-3" /> Synced
                </span>
              </div>
              <p className="mt-3 font-mono text-xs text-accent">{booking.localLabel}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-xs text-text-muted text-center">
          {booking
            ? "This booking was just written to our real calendar."
            : "Book something on the left — it'll show up here instantly."}
        </p>
      </div>
    </div>
  );
}

function CalendarMini() {
  const [monthDate, setMonthDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday-first offset (0 = Monday ... 6 = Sunday)
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const monthLabel = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const changeMonth = (delta: number) => {
    setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));
    setSelectedDate(null);
    setSlots(null);
  };

  const pickDay = async (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    if (d.getTime() < today.getTime()) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSlots(null);
    setLoadingSlots(true);
    try {
      const res = await fetch(
        `/api/appointments/availability?date=${dateStr}&service=${SERVICES[0]?.id ?? "consultation"}`
      );
      const data = await res.json();
      setSlots(Array.isArray(data.slots) ? data.slots.slice(0, 6) : []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">{monthLabel}</p>
        <div className="flex gap-1 text-text-muted">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="h-6 w-6 inline-flex items-center justify-center rounded hover:bg-secondary"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="h-6 w-6 inline-flex items-center justify-center rounded hover:bg-secondary"
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {dayLabels.map((d, i) => (
          <span key={i} className="text-[10px] font-medium uppercase text-text-muted">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
          const cellDate = new Date(year, month, date);
          cellDate.setHours(0, 0, 0, 0);
          const isPast = cellDate.getTime() < today.getTime();
          const isToday = cellDate.getTime() === today.getTime();
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
          const isSelected = dateStr === selectedDate;
          return (
            <button
              type="button"
              key={date}
              onClick={() => pickDay(date)}
              disabled={isPast}
              className={cn(
                "aspect-square rounded-md flex items-center justify-center text-[11px] font-medium transition",
                isPast && "text-text-muted/50 cursor-not-allowed",
                !isPast && !isSelected && "text-primary hover:bg-secondary",
                isToday && !isSelected && "border border-accent text-accent",
                isSelected && "bg-accent text-primary font-semibold"
              )}
            >
              {date}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-3 border-t border-border pt-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-secondary mb-2">
            Open slots — {selectedDate}
          </p>
          {loadingSlots && (
            <p className="text-xs text-text-muted inline-flex items-center gap-1.5">
              <Loader2 className="h-3 w-3 animate-spin" /> Checking real availability…
            </p>
          )}
          {!loadingSlots && slots && slots.length === 0 && (
            <p className="text-xs text-text-muted">No open slots that day.</p>
          )}
          {!loadingSlots && slots && slots.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {slots.map((s) => (
                <span
                  key={s.start}
                  className="rounded-full border border-border px-2 py-1 text-[10px] text-text-secondary"
                >
                  {s.label.split(", ")[1] ?? s.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
