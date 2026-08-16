"use client";

import { Shield, Clock, Globe2, RefreshCw, Lock, HeartHandshake } from "lucide-react";
import { Container, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { CountUp } from "../shared/count-up";
import { LivePulse } from "../shared/live-pulse";

const ITEMS = [
  {
    icon: Clock,
    stat: "<60s",
    label: "Average response time",
    sub: "From first ring to caller speaking with the agent.",
  },
  {
    icon: Shield,
    stat: "99.97%",
    label: "Uptime · last 90 days",
    sub: "Redundant telephony, automatic failover, multi-region.",
  },
  {
    icon: Globe2,
    stat: "30+",
    label: "Languages supported",
    sub: "Auto-detects caller language, responds natively.",
  },
  {
    icon: RefreshCw,
    stat: "48h",
    label: "From signup to live",
    sub: "Most businesses answer their first Bukwin call within 48 hours.",
  },
  {
    icon: Lock,
    stat: "AES-256",
    label: "Encryption at rest & in transit",
    sub: "TLS 1.3 between every hop. Per-tenant data isolation.",
  },
  {
    icon: HeartHandshake,
    stat: "30 days",
    label: "Money-back guarantee",
    sub: "No questions asked. If it doesn't earn its keep, cancel.",
  },
];

export function TrustSignalsSection() {
  return (
    <Section bg="navy" id="trust" className="noise-overlay">
      <Container size="xl">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-success">
                <LivePulse color="bg-success" />
                Trust signals
              </span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl font-semibold leading-[1.12] tracking-[-0.01em] text-white">
                Receipts, not promises.
              </h2>
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                Anyone can claim 24/7 and enterprise-grade. Here&apos;s what
                we actually deliver — measured, not marketed.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <p className="font-display text-3xl font-medium text-accent">
                    <CountUp to={200} suffix="+" />
                  </p>
                  <p className="mt-1 text-[11px] text-white/60 leading-tight">
                    Businesses live today
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <p className="font-display text-3xl font-medium text-accent">
                    <CountUp to={1} suffix="M+" />
                  </p>
                  <p className="mt-1 text-[11px] text-white/60 leading-tight">
                    Calls answered
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 gap-3" stagger={0.08}>
            {ITEMS.map((it) => (
              <StaggerItem key={it.label}>
                <article className="group h-full rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.05]">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-transform group-hover:scale-110">
                      <it.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-display text-2xl md:text-3xl font-medium text-white leading-none">
                        {it.stat}
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-accent">
                        {it.label}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                        {it.sub}
                      </p>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </Section>
  );
}
