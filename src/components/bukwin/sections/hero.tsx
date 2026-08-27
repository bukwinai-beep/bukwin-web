"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, PhoneCall, CalendarCheck } from "lucide-react";
import { Container } from "../shared/container";

// Bold "floating card + glowing orb" hero — indigo/violet gradient,
// concentric rings, floating icon chips, stat row. Full-color redesign
// replacing the previous minimal ink/ivory direction.

const STATS = [
  { value: "60", suffix: "s", label: "Avg. response time" },
  { value: "24", suffix: "/7", label: "Always answering" },
  { value: "3,048", suffix: "+", label: "Calls handled" },
];

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

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

function GlowOrb() {
  return (
    <div className="relative flex items-center justify-center h-full min-h-[340px]">
      {/* Concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-indigo-500/10"
          style={{ width: `${220 + i * 100}px`, height: `${220 + i * 100}px` }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Glow behind the orb */}
      <div
        className="absolute h-56 w-56 rounded-full blur-3xl opacity-40"
        style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
      />

      {/* The gradient orb itself */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative h-40 w-40 rounded-3xl shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #4338CA 100%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl opacity-60"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.25), transparent 50%)" }}
        />
      </motion.div>

      {/* Floating icon chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute top-[26%] right-[22%] h-11 w-11 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center"
      >
        <PhoneCall className="h-4.5 w-4.5 text-indigo-600" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-[24%] left-[24%] h-11 w-11 rounded-2xl bg-white shadow-lg border border-black/5 flex items-center justify-center"
      >
        <CalendarCheck className="h-4.5 w-4.5 text-violet-600" />
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-[#F1F2F4] dark:bg-background py-14 lg:py-20">
      <Container size="xl">
        <div className="relative rounded-[32px] bg-white dark:bg-card shadow-xl border border-black/5 dark:border-border overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 lg:p-16">
            {/* Left: copy */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] text-indigo-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                AI RECEPTIONIST PLATFORM
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0B0E14] dark:text-foreground"
              >
                Your business,
                <br />
                always{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  answered.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-md text-[16px] leading-relaxed text-slate-500 dark:text-muted-foreground"
              >
                An AI receptionist that answers calls, books appointments,
                answers questions, and follows up — 24/7.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="/demo"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B0E14] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                >
                  Try the AI Receptionist
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/how-it-works"
                  className="inline-flex items-center rounded-lg border border-black/10 dark:border-border px-6 py-3 text-sm font-medium text-[#0B0E14] dark:text-foreground hover:bg-black/[0.03] dark:hover:bg-secondary transition-colors"
                >
                  See how it works
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 grid grid-cols-3 gap-6 max-w-md"
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-bold text-[#0B0E14] dark:text-foreground">
                      <CountUp to={parseInt(s.value.replace(/,/g, ""), 10)} />
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: glowing orb visual */}
            <GlowOrb />
          </div>
        </div>
      </Container>
    </section>
  );
}
