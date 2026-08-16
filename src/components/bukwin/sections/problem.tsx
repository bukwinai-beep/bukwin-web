"use client";

import { Clock, Moon, Repeat } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { CountUp } from "../shared/count-up";
import { TextReveal } from "../shared/text-reveal";

const PROBLEMS = [
  {
    icon: Clock,
    title: "The calls you can't take.",
    body: "The chair is full, the kitchen is slammed, you're mid-viewing. The phone rings anyway — and it rings out. The customer moves on, usually within minutes, to whoever picks up first.",
  },
  {
    icon: Moon,
    title: "The hours you're closed but demand isn't.",
    body: "Evenings, weekends, holidays. Customers call when they're free, not when you're open. Voicemail catches almost none of them, and the ones it does rarely leave a message worth acting on.",
  },
  {
    icon: Repeat,
    title: "The same five questions, forty times a day.",
    body: "Opening hours. Parking. Price. Availability. Your team recites the same script instead of serving the customer in front of them — and the call still ends without a booking.",
  },
];

const STATS = [
  { value: 62, suffix: "%", label: "of calls to small businesses go unanswered" },
  { value: 85, suffix: "%", label: "of unanswered callers never call back" },
  { value: 62, suffix: "%", label: "ring a competitor instead, within minutes" },
];

export function ProblemSection() {
  return (
    <Section bg="default" id="problem">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>The Problem</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Every missed call is a customer calling your competitor."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 max-w-2xl text-lg md:text-xl text-text-secondary leading-relaxed">
              You&apos;re not bad at answering the phone. You&apos;re busy
              running the business.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {PROBLEMS.map((p) => (
            <StaggerItem key={p.title}>
              <article className="group h-full rounded-xl border border-border bg-surface p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  <p.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-primary leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

      {/* Stat bar */}
      <div className="mt-20 bg-navy text-white noise-overlay">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {STATS.map((s, i) => (
              <FadeIn
                key={s.label}
                delay={i * 0.15}
                className="py-12 md:py-16 md:px-8 text-center md:text-left"
              >
                <p className="font-display text-6xl md:text-7xl font-medium text-accent leading-none">
                  <CountUp to={s.value} suffix={s.suffix} duration={2.2} />
                </p>
                <p className="mt-4 text-base text-white/70 max-w-xs mx-auto md:mx-0 leading-relaxed">
                  {s.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
