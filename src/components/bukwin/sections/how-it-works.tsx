"use client";

import { BookOpen, Plug, Phone, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";

const STEPS = [
  {
    num: "01",
    icon: BookOpen,
    title: "We learn your business",
    body: "Share your hours, services, pricing, and tone. We build a knowledge base that sounds like your best employee — not a generic chatbot reading a script.",
    duration: "Day 1",
    side: "What you do: a 15-minute call.",
    ours: "What we handle: build the brain.",
  },
  {
    num: "02",
    icon: Plug,
    title: "We connect your tools",
    body: "Calendar, CRM, phone number, WhatsApp. Bukwin integrates with what you already use — nothing changes for your customers, and nothing breaks in your workflow.",
    duration: "Day 1–2",
    side: "What you do: share access.",
    ours: "What we handle: every integration.",
  },
  {
    num: "03",
    icon: Phone,
    title: "Go live in 48 hours",
    body: "Your existing number routes to Bukwin. The agent answers, qualifies, books, and transfers — just like a human receptionist, except it never takes a break or has a bad day.",
    duration: "Day 2",
    side: "What you do: watch the first call.",
    ours: "What we handle: routing, monitoring, fallback.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "It gets smarter every day",
    body: "Call transcripts, booking patterns, and customer feedback train the agent to handle more autonomously over time. You get a monthly report — not a black box.",
    duration: "Week 2 onward",
    side: "What you do: read the monthly report.",
    ours: "What we handle: continuous tuning.",
  },
];

export function HowItWorksSection() {
  return (
    <Section bg="default" id="how-it-works">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>How It Works</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Your AI receptionist. Setup in days, not months."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
        </div>

        <div className="mt-16 relative">
          {/* Vertical progress line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
            aria-hidden
          />
          <div className="space-y-12 md:space-y-20">
            {STEPS.map((step, i) => (
              <Step key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-16 text-center">
            <BukwinButton asChild size="lg">
              <a href="/contact">
                Book Your Setup Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </BukwinButton>
            <p className="mt-4 text-sm text-text-muted">
              Live in 48 hours. Cancel anytime.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      {/* Number node (mobile + desktop center) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="absolute left-5 md:left-1/2 top-0 -translate-x-1/2 z-10"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-accent font-mono text-sm font-semibold ring-4 ring-background">
          {step.num}
        </span>
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className={`pl-14 md:pl-0 ${
          isLeft ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
        }`}
      >
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent ${
            isLeft ? "md:ml-auto" : ""
          }`}
        >
          <step.icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-accent font-medium">
          {step.duration}
        </p>
        <h3 className="mt-2 font-display text-2xl md:text-3xl font-medium text-primary leading-snug">
          {step.title}
        </h3>
        <p className="mt-3 text-[15px] md:text-base text-text-secondary leading-relaxed">
          {step.body}
        </p>
        <div
          className={`mt-4 flex flex-col gap-1 text-xs ${
            isLeft ? "md:items-end" : ""
          }`}
        >
          <span className="text-text-secondary">
            <span className="text-text-muted">You:</span> {step.side}
          </span>
          <span className="text-text-secondary">
            <span className="text-text-muted">Us:</span> {step.ours}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
