"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mic, PhoneOff } from "lucide-react";
import { Container } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { LivePulse } from "../shared/live-pulse";

// "Quiet Ledger" hero, v2 — headline + subcopy + two CTAs, then a real
// interactive-looking call card as the hero visual (per the brief: a
// live product mockup sells this far better than an abstract graphic).
// Fonts loaded in layout.tsx as --font-fraunces / --font-plex-sans /
// --font-plex-mono, applied here via inline style.

const serif = { fontFamily: "var(--font-fraunces), Georgia, serif" };
const mono = { fontFamily: "var(--font-plex-mono), monospace" };
const sans = { fontFamily: "var(--font-plex-sans), sans-serif" };

const GREETING = "Hi, thanks for calling Bukwin. How can I help you today?";

// ─── Count-up number, triggers once when scrolled into view ────────────────
function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;
    const step = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} style={mono}>
      {value.toLocaleString()}
    </span>
  );
}

// ─── Typewriter reveal for the greeting line ────────────────────────────────
function Typewriter({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 22);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, startDelay]);

  return <>{shown}</>;
}

// ─── The hero's visual centerpiece: a real, live-looking call card ─────────
function CallCard() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-[440px] rounded-xl border border-border bg-card shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <span style={mono} className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          AI Receptionist
        </span>
        <span style={mono} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-accent">
          <LivePulse color="bg-accent" />
          Live
        </span>
      </div>

      <div className="border-t border-border" />

      {/* Body */}
      <div className="px-6 pt-5 pb-6">
        <p style={serif} className="text-lg font-medium text-foreground mb-3">
          Sarah
        </p>
        <p style={sans} className="text-[15px] leading-relaxed text-muted-foreground min-h-[48px]">
          "<Typewriter text={GREETING} startDelay={900} />"
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
              <Mic className="h-4 w-4 text-accent" />
            </div>
            <div className="flex items-end gap-[3px] h-6">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="wave-bar w-[2.5px] rounded-full bg-accent/50"
                  style={{
                    height: `${25 + Math.abs(Math.sin(i * 0.8)) * 70}%`,
                    animationDelay: `${i * 0.07}s`,
                  }}
                />
              ))}
            </div>
            <span style={mono} className="text-[13px] text-muted-foreground tabular-nums">
              {mm}:{ss}
            </span>
          </div>

          <button
            style={sans}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[13px] text-muted-foreground hover:border-destructive/40 hover:text-destructive transition-colors"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            End call
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-background text-foreground">
      <Container size="lg">
        <div className="max-w-[640px] mx-auto text-center pt-28 pb-14 lg:pt-32">
          <FadeIn delay={0.1} y={14}>
            <p
              style={mono}
              className="flex items-center justify-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-accent mb-6"
            >
              <LivePulse color="bg-accent" />
              <CountUp to={3048} /> calls answered so far
            </p>
          </FadeIn>

          <TextReveal
            as="h1"
            text="Your business, always answered."
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.015em] text-foreground"
          />

          <FadeIn delay={0.5} y={16}>
            <p style={sans} className="mt-6 mx-auto max-w-[480px] text-[17px] leading-[1.65] text-muted-foreground">
              An AI receptionist that answers calls, books appointments,
              answers questions, and follows up — 24/7.
            </p>
          </FadeIn>

          <FadeIn delay={0.65} y={16}>
            <div className="mt-8 flex items-center justify-center gap-8">
              <motion.a
                href="/demo"
                style={sans}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground text-sm px-7 py-3.5 transition-shadow hover:shadow-lg"
              >
                Try the AI Receptionist
              </motion.a>
              <a
                href="/how-it-works"
                style={sans}
                className="group inline-flex items-center gap-1.5 text-sm text-foreground pb-0.5"
              >
                <span className="relative">
                  Watch how it works
                  <span className="absolute left-0 -bottom-0.5 h-px w-full bg-border group-hover:bg-foreground transition-colors" />
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Hero visual: a real, live-looking call card — not an abstract graphic */}
        <div className="flex justify-center pb-28">
          <CallCard />
        </div>
      </Container>
    </section>
  );
}
