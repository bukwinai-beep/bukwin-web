"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { LivePulse } from "../shared/live-pulse";

// "Quiet Ledger" hero — serif headline, mono data labels, hairline rules.
// Fonts loaded in layout.tsx as --font-fraunces / --font-plex-sans /
// --font-plex-mono, applied here via inline style so the rest of the
// site's type system is untouched.

const serif = { fontFamily: "var(--font-fraunces), Georgia, serif" };
const mono = { fontFamily: "var(--font-plex-mono), monospace" };
const sans = { fontFamily: "var(--font-plex-sans), sans-serif" };

const LEDGER_POOL: { who: string; what: string }[] = [
  { who: "Abdul Rahman", what: "Consultation Call" },
  { who: "Anas Ali", what: "Live Product Demo" },
  { who: "S. Rehman", what: "AI Receptionist Setup" },
  { who: "M. Farooq", what: "Consultation Call" },
  { who: "K. Siddiqui", what: "Live Product Demo" },
];

function nowLabel(offsetMinutes: number) {
  const d = new Date(Date.now() - offsetMinutes * 60_000);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

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

// ─── Ledger strip that quietly grows a new "live" entry over time ──────────
function LiveLedger() {
  const [rows, setRows] = useState(
    LEDGER_POOL.slice(0, 3).map((r, i) => ({ ...r, id: i, offset: 8 + i * 27 }))
  );
  const nextId = useRef(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) => {
        const next = LEDGER_POOL[nextId.current % LEDGER_POOL.length];
        nextId.current += 1;
        const fresh = { ...next, id: nextId.current, offset: 0 };
        return [fresh, ...prev.slice(0, 2)];
      });
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-20">
      <div
        style={mono}
        className="flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
      >
        <span>Recent bookings</span>
        <span className="inline-flex items-center gap-2">
          <LivePulse color="bg-accent" />
          Live · Real calendar
        </span>
      </div>
      <AnimatePresence initial={false} mode="popLayout">
        {rows.map((row) => (
          <motion.div
            key={row.id}
            layout
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-[90px_1fr_auto] sm:grid-cols-[110px_1fr_200px] items-center gap-4 py-4 border-t border-border"
          >
            <span style={mono} className="text-[13px] text-muted-foreground">
              {nowLabel(row.offset)}
            </span>
            <span style={serif} className="text-[16px] font-medium text-foreground truncate">
              {row.who}
            </span>
            <span style={sans} className="hidden sm:block text-sm text-muted-foreground">
              {row.what}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-background text-foreground">
      <Container size="lg">
        <div className="max-w-[720px] pt-28 pb-20 lg:pt-36 lg:pb-24">
          <FadeIn delay={0.1} y={14}>
            <p
              style={mono}
              className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-accent mb-6"
            >
              <LivePulse color="bg-accent" />
              Now answering — <CountUp to={3048} /> calls handled
            </p>
          </FadeIn>

          <TextReveal
            as="h1"
            text="The receptionist that never misses a call."
            className="text-[clamp(2.25rem,5.2vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.015em] text-foreground"
            wordClassName=""
          />

          <FadeIn delay={0.5} y={16}>
            <p style={sans} className="mt-7 max-w-[540px] text-[17px] leading-[1.65] text-muted-foreground">
              Bukwin answers, qualifies, and books appointments on real
              calendars — by phone or chat — so nothing falls through after
              hours, ever.
            </p>
          </FadeIn>

          <FadeIn delay={0.65} y={16}>
            <div className="mt-9 flex items-center gap-8">
              <motion.a
                href="/demo"
                style={sans}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground text-sm px-7 py-3.5 transition-shadow hover:shadow-lg"
              >
                Book a Demo
              </motion.a>
              <a
                href="/how-it-works"
                style={sans}
                className="group inline-flex items-center gap-1.5 text-sm text-foreground pb-0.5"
              >
                <span className="relative">
                  Talk to the live agent
                  <span className="absolute left-0 -bottom-0.5 h-px w-full bg-border group-hover:bg-foreground transition-colors" />
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Hairline that draws itself in, then the live ledger */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "left" }}
          className="border-t border-border"
        />
        <LiveLedger />
      </Container>
    </section>
  );
}
