"use client";

import { useState } from "react";
import { Check, Shield, ArrowRight } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  blurb: string;
  monthly: number;
  annual: number;
  customPrice?: boolean;
  features: string[];
  cta: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    blurb: "Perfect for solo practitioners",
    monthly: 79,
    annual: 63,
    features: [
      "Up to 200 minutes/month",
      "1 phone number",
      "Website chat + WhatsApp",
      "Google Calendar integration",
      "Basic call transcripts",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    blurb: "For growing businesses",
    monthly: 199,
    annual: 159,
    recommended: true,
    features: [
      "Up to 800 minutes/month",
      "3 phone numbers",
      "All channels (Voice, Chat, WhatsApp, SMS, Email)",
      "Calendar + CRM integration",
      "Advanced analytics",
      "Multilingual (5 languages)",
      "Priority support",
      "No-show recovery",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    blurb: "For multi-location teams",
    monthly: 0,
    annual: 0,
    customPrice: true,
    features: [
      "Unlimited minutes",
      "Unlimited numbers",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise deployment option",
      "White-label option",
    ],
    cta: "Book a Call",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <Section bg="surface" id="pricing" className="border-y border-border">
      <Container size="xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <Eyebrow className="justify-center">Pricing</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="The cost of a full-time receptionist, without the salary."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />

          <FadeIn delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-background p-1">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition",
                  !annual ? "bg-primary text-primary-foreground" : "text-text-secondary hover:text-primary"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition inline-flex items-center gap-2",
                  annual ? "bg-primary text-primary-foreground" : "text-text-secondary hover:text-primary"
                )}
              >
                Annual
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-wide",
                  annual ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"
                )}>
                  Save 20%
                </span>
              </button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid lg:grid-cols-3 gap-5 lg:gap-6 items-start">
            {TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} annual={annual} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10 text-center space-y-4">
            <p className="text-sm text-text-muted">
              All plans include: 24/7 answering · instant setup · call recording · SSL security · data encryption
            </p>
            <p className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary">
              <Shield className="h-4 w-4 text-accent" />
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function PricingCard({ tier, annual }: { tier: Tier; annual: boolean }) {
  const price = annual ? tier.annual : tier.monthly;

  return (
    <article
      className={cn(
        "relative h-full rounded-2xl border bg-background p-7 md:p-8 transition-all duration-300 hover:-translate-y-1",
        tier.recommended
          ? "border-accent shadow-xl shadow-accent/10 lg:scale-[1.04] lg:-mt-2"
          : "border-border hover:border-accent/30 hover:shadow-md"
      )}
    >
      {tier.recommended && (
        <>
          <div
            className="absolute -inset-px -z-10 rounded-2xl opacity-30 blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.3), transparent)",
            }}
          />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-foreground">
            Recommended
          </span>
        </>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl font-medium text-primary">{tier.name}</h3>
      </div>
      <p className="mt-1 text-sm text-text-secondary">{tier.blurb}</p>

      <div className="mt-6 flex items-end gap-2">
        {tier.customPrice ? (
          <span className="font-display text-4xl font-medium text-primary">Custom</span>
        ) : (
          <>
            <span className="font-display text-5xl font-medium text-primary leading-none">
              ${price}
            </span>
            <span className="text-sm text-text-secondary pb-1">/month</span>
          </>
        )}
      </div>
      {!tier.customPrice && annual && (
        <p className="mt-1 text-xs text-accent">
          Billed annually · save ${(tier.monthly - tier.annual) * 12}/year
        </p>
      )}

      <BukwinButton
        asChild
        size="lg"
        variant={tier.recommended ? "primary" : "secondary"}
        className="mt-7 w-full"
      >
        <a href="/contact">
          {tier.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </BukwinButton>

      <ul className="mt-7 space-y-3 border-t border-border pt-6">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-primary">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
