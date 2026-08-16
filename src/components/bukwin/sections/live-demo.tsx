"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Send, Calendar, Check, Sparkles, Phone } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { LivePulse } from "../shared/live-pulse";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "agent"; text: string };

type Scenario = {
  id: string;
  label: string;
  greeting: string;
  flow: Msg[];
  booking?: { name: string; service: string; time: string };
};

const SCENARIOS: Scenario[] = [
  {
    id: "dental",
    label: "Book a dental cleaning",
    greeting: "Thanks for calling Bright Smile Dental — this is Bukwin, how can I help?",
    flow: [
      { role: "user", text: "Hi, I'd like to book a cleaning for next week." },
      { role: "agent", text: "Of course. Are you an existing patient, or is this your first visit?" },
      { role: "user", text: "First time." },
      { role: "agent", text: "Welcome. I have Tuesday at 2:30 PM or Thursday at 11:00 AM open. Which works?" },
      { role: "user", text: "Tuesday at 2:30 works." },
      { role: "agent", text: "Booked. I'll text you a confirmation and a reminder the day before. Anything else?" },
    ],
    booking: { name: "John D.", service: "Dental Cleaning — New Patient", time: "Tue · 2:30 PM" },
  },
  {
    id: "restaurant",
    label: "Check restaurant availability",
    greeting: "Thanks for calling Tavolo — this is Bukwin. How can I help tonight?",
    flow: [
      { role: "user", text: "Do you have a table for 4 at 7:30 tonight?" },
      { role: "agent", text: "Let me check… Yes, I can hold a table for 4 at 7:30 PM. May I have a name?" },
      { role: "user", text: "Chen." },
      { role: "agent", text: "Booked under Chen, party of 4, tonight at 7:30 PM. We'll hold the table 15 minutes." },
    ],
    booking: { name: "Chen, party of 4", service: "Dinner reservation", time: "Tonight · 7:30 PM" },
  },
  {
    id: "property",
    label: "Schedule a property viewing",
    greeting: "Thanks for calling Meridian Realty — this is Bukwin. How can I help?",
    flow: [
      { role: "user", text: "I saw the listing on Oak Street. Can I view it this weekend?" },
      { role: "agent", text: "Yes — I have Saturday at 10:00 AM or Sunday at 2:00 PM available with our agent Maya." },
      { role: "user", text: "Saturday at 10." },
      { role: "agent", text: "Confirmed with Maya for Saturday at 10:00 AM at 142 Oak Street. I'll email you the details." },
    ],
    booking: { name: "Maya R. (Agent)", service: "Property viewing — 142 Oak St", time: "Sat · 10:00 AM" },
  },
];

export function LiveDemoSection() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

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
              Speak to the agent or type at it. See exactly how it handles a
              real customer.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
            <ChatPanel
              key={active.id}
              active={active}
              onScenarioChange={setActiveId}
              scenarios={SCENARIOS}
            />
            <CalendarPanel key={active.id} active={active} />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 text-center text-sm text-text-muted">
            This is not a recording. It&apos;s a real conversation with Bukwin
            AI.
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}

function ChatPanel({
  active,
  onScenarioChange,
  scenarios,
}: {
  active: Scenario;
  onScenarioChange: (id: string) => void;
  scenarios: Scenario[];
}) {
  const [tab, setTab] = useState<"voice" | "chat">("chat");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "agent", text: active.greeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [running, setRunning] = useState(false);
  const [liveMode, setLiveMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Run the scenario flow with timers — reading messages from active.flow
  useEffect(() => {
    if (!running) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let idx = 0;

    const scheduleNext = () => {
      if (cancelled || idx >= active.flow.length) {
        if (!cancelled) setRunning(false);
        return;
      }
      const next = active.flow[idx];
      const isAgent = next.role === "agent";
      const delay = isAgent ? 1400 : 600;

      if (isAgent) {
        setTyping(true);
      }
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setMessages((m) => [...m, next]);
          idx += 1;
          scheduleNext();
        }, delay)
      );
    };

    // Kick off the flow after a short delay (greeting already set by click handler)
    timeouts.push(setTimeout(scheduleNext, 700));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [running, active]);

  const runScenario = () => {
    // Reset messages to greeting BEFORE turning on `running` to avoid
    // synchronous setState inside the running effect.
    setTyping(false);
    setMessages([{ role: "agent", text: active.greeting }]);
    setRunning(true);
  };

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setError(null);
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);

    // Try live AI first; fall back to canned reply if the API is unreachable
    if (liveMode) {
      try {
        const payload = {
          scenario: active.id,
          messages: [
            { role: "assistant", content: active.greeting },
            ...messages
              .filter((m) => m.role === "user" || m.role === "agent")
              .map((m) => ({
                role: m.role === "agent" ? "assistant" : "user",
                content: m.text,
              })),
            { role: "user", content: text },
          ],
        };
        const res = await fetch("/api/demo/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { reply?: string; error?: string };
        if (!data.reply) throw new Error(data.error || "No reply");
        setTyping(false);
        const updatedMessages = [
          ...messages,
          { role: "user" as const, text },
          { role: "agent" as const, text: data.reply },
        ];
        setMessages(updatedMessages);

        // Persist the session to the DB when conversation has 4+ turns
        if (updatedMessages.length >= 4) {
          fetch("/api/demo/chat", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              scenario: active.id,
              mode: "live",
              messages: updatedMessages.map((m) => ({
                role: m.role === "agent" ? "assistant" : "user",
                content: m.text,
              })),
            }),
            keepalive: true,
          }).catch(() => {
            /* best-effort — ignore failures */
          });
        }
      } catch (err) {
        setTyping(false);
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(`Couldn't reach the live AI (${msg}). Showing fallback reply.`);
        setMessages((m) => [
          ...m,
          {
            role: "agent",
            text:
              "I'd love to help with that. In a live deployment I'd check your real calendar and respond with available slots — try the preset scenario above to see a full booking flow.",
          },
        ]);
      }
    } else {
      // Scripted fallback
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          {
            role: "agent",
            text:
              "I've noted that. In a live call, Bukwin would check your calendar and respond with real availability — try one of the preset scenarios above to see a full booking flow.",
          },
        ]);
      }, 1200);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-5 py-3">
        <div className="flex gap-1">
          {(["chat", "voice"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium capitalize transition",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-text-secondary hover:bg-secondary"
              )}
            >
              {t === "chat" ? "Website Chat" : "Voice Call"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLiveMode((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-accent transition hover:bg-accent/10"
            title="Toggle between live AI and scripted demo"
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", liveMode ? "bg-accent" : "bg-text-muted")} />
            {liveMode ? "Live AI" : "Scripted"}
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
            <LivePulse color="bg-success" />
            {tab === "chat" ? "Online" : "Ready"}
          </span>
        </div>
      </div>

      {tab === "voice" && (
        <div className="p-6 border-b border-border bg-navy text-white noise-overlay">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 border border-accent/40">
              <PhoneCall className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.15em] text-accent">
                Try a real call
              </p>
              <p className="font-display text-2xl font-medium">
                (555) 019-2834
              </p>
            </div>
            <BukwinButton asChild size="md">
              <a href="tel:5550192834">
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </BukwinButton>
          </div>
          <p className="mt-4 text-xs text-white/60">
            Or simulate a call below — the agent handles voice and chat with the same brain.
          </p>
        </div>
      )}

      <div className="px-5 pt-4 pb-2 flex flex-wrap gap-2 border-b border-border">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => onScenarioChange(s.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition",
              active.id === s.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-text-secondary hover:border-accent/40 hover:text-primary"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="scroll-bukwin h-[360px] overflow-y-auto p-5 space-y-3 bg-background/40"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-end gap-2",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role === "agent" && (
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 border border-accent/30 shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-surface border border-border text-primary rounded-bl-md"
                )}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-end gap-2"
            >
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 border border-accent/30 shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="rounded-2xl rounded-bl-md bg-surface border border-border px-4 py-3 inline-flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="typing-dot h-1.5 w-1.5 rounded-full bg-accent"
                    style={{ animationDelay: `${i * 0.16}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        onSubmit={onSend}
        className="border-t border-border bg-secondary/30 p-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={typing ? "Bukwin is thinking…" : "Type a message…"}
          disabled={typing}
          className="flex-1 h-10 rounded-md border border-border bg-surface px-3 text-sm focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
        />
        <BukwinButton
          type="button"
          onClick={runScenario}
          size="sm"
          variant="secondary"
          disabled={running}
        >
          {running ? "Running…" : "Run scenario"}
        </BukwinButton>
        <BukwinButton type="submit" size="icon" variant="solid" disabled={typing || !input.trim()}>
          <Send className="h-4 w-4" />
        </BukwinButton>
      </form>
      {error && (
        <div className="border-t border-error/20 bg-error/5 px-4 py-2 text-[11px] text-error">
          {error}
        </div>
      )}
    </div>
  );
}

function CalendarPanel({ active }: { active: Scenario }) {
  // Booking shows once the scenario flow completes — since the panel is
  // keyed by scenario id in the parent, it mounts fresh per scenario.
  const [booked, setBooked] = useState(false);

  // Display the booking card after the scenario's natural completion time.
  useEffect(() => {
    const totalSteps = active.flow.length;
    const approxDuration = 700 + totalSteps * 1700; // greeting delay + per-step
    const t = setTimeout(() => setBooked(true), approxDuration);
    return () => clearTimeout(t);
  }, [active]);

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
          {booked && active.booking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-accent">
                    New booking
                  </p>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {active.booking.name}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {active.booking.service}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 border border-success/30 px-2 py-0.5 text-[10px] text-success">
                  <Check className="h-3 w-3" /> Synced
                </span>
              </div>
              <p className="mt-3 font-mono text-xs text-accent">
                {active.booking.time}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-xs text-text-muted text-center">
          This is a simulated demo. In production, Bukwin connects to your real
          Google Calendar or Outlook.
        </p>
      </div>
    </div>
  );
}

function CalendarMini() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = Array.from({ length: 28 }, (_, i) => i + 1);
  const today = 14;
  const bookedDay = 17;

  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
          August 2026
        </p>
        <div className="flex gap-1 text-text-muted">
          <button type="button" className="h-6 w-6 inline-flex items-center justify-center rounded hover:bg-secondary">‹</button>
          <button type="button" className="h-6 w-6 inline-flex items-center justify-center rounded hover:bg-secondary">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {days.map((d, i) => (
          <span key={i} className="text-[10px] font-medium uppercase text-text-muted">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dates.map((date) => {
          const isToday = date === today;
          const isBooked = date === bookedDay;
          const isPast = date < today;
          return (
            <div
              key={date}
              className={cn(
                "aspect-square rounded-md flex items-center justify-center text-[11px] font-medium",
                isPast && "text-text-muted/50",
                !isPast && !isBooked && "text-primary hover:bg-secondary",
                isToday && "border border-accent text-accent",
                isBooked && "bg-accent text-primary font-semibold"
              )}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
}
