"use client";

import { motion } from "framer-motion";
import { PhoneCall, Calendar, Check, ArrowRight, Play } from "lucide-react";
import { Container } from "../shared/container";
import { BukwinButton } from "../shared/button";
import { TextReveal } from "../shared/text-reveal";
import { FadeIn } from "../shared/fade-in";
import { LivePulse } from "../shared/live-pulse";

const TRUST_LOGOS = ["Meridian", "Kernel Labs", "Vale", "Park Auto", "Dr. Chen DDS"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy text-white noise-overlay">
      {/* Radial gradient + grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 168, 83, 0.08), transparent 70%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(212, 168, 83, 0.04), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <Container size="xl" className="relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center min-h-[88vh] pt-28 pb-16 lg:pt-32 lg:pb-24">
          {/* Left: text */}
          <div>
            <FadeIn delay={0.1} y={20}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                <LivePulse color="bg-accent" />
                AI Receptionist for your business
              </span>
            </FadeIn>

            <TextReveal
              as="h1"
              text="Never miss a call. Never lose a customer."
              className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
            />

            <FadeIn delay={0.7} y={20}>
              <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-white/70 font-sans">
                Bukwin AI answers your phone 24/7, books appointments, takes
                orders, and speaks your customers&apos; language — all while
                you focus on running your business.
              </p>
            </FadeIn>

            <FadeIn delay={0.9} y={20}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <BukwinButton asChild size="lg" variant="primary">
                  <a href="/demo">
                    <Play className="h-4 w-4" />
                    Hear It Answer Live
                  </a>
                </BukwinButton>
                <BukwinButton asChild size="lg" variant="ghost">
                  <a href="/how-it-works">
                    See How It Works
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </BukwinButton>
              </div>
            </FadeIn>

            <FadeIn delay={1.1} y={20}>
              <div className="mt-12">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-4">
                  Trusted by 200+ businesses
                </p>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {TRUST_LOGOS.map((name) => (
                    <span
                      key={name}
                      className="font-display text-base md:text-lg font-medium text-white/40 hover:text-white/80 transition-colors"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: phone mockup */}
          <FadeIn delay={0.6} y={40} duration={0.9}>
            <HeroPhoneMockup />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function HeroPhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md animate-float">
      {/* Phone frame — solid surface, no glassmorphism */}
      <div className="relative rounded-2xl border border-white/15 bg-navy p-5 shadow-2xl">
        {/* Status bar */}
        <div className="mb-4 flex items-center justify-between text-[11px] font-mono text-white/50">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1">
              <LivePulse color="bg-accent" />
              LIVE
            </span>
          </span>
        </div>

        {/* Incoming call card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-3"
        >
          <div className="flex items-start gap-3">
            <div className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 border border-accent/30">
              <PhoneCall className="h-5 w-5 text-accent" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-[0.15em] text-accent/80">
                Incoming call
              </p>
              <p className="mt-1 text-base font-medium text-white truncate">
                +1 (415) 555-0192
              </p>
              <p className="mt-0.5 text-sm text-white/50">
                New patient inquiry
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-2.5 py-1 text-[11px] text-accent">
              <LivePulse color="bg-accent" />
              Bukwin AI is answering…
            </span>
            <span className="text-[11px] font-mono text-white/40">00:14</span>
          </div>

          {/* Waveform */}
          <div className="mt-4 flex items-end justify-center gap-1 h-10">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar w-1 rounded-full bg-accent/60"
                style={{
                  height: `${20 + Math.abs(Math.sin(i * 0.7)) * 70}%`,
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Live booking animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              Calendar
            </p>
            <span className="rounded-full bg-success/10 border border-success/30 px-2 py-0.5 text-[10px] text-success">
              Booking confirmed
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Dental Cleaning
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  John D. — New patient
                </p>
              </div>
              <p className="font-mono text-xs text-accent">2:30 PM</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/60">
              <Check className="h-3 w-3 text-success" />
              Confirmation SMS sent
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating notification chip */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute -right-3 top-1/3 hidden md:block rounded-xl border border-accent/30 bg-navy px-4 py-3 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-[0.15em] text-accent">
          Response time
        </p>
        <p className="mt-1 font-mono text-2xl text-white">
          &lt;60<span className="text-sm text-white/60">s</span>
        </p>
      </motion.div>
    </div>
  );
}
