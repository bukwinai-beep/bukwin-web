"use client";

import { ArrowUpRight, Quote, TrendingUp, Clock, PhoneMissed } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";

const CASES = [
  {
    company: "Bright Smile Dental",
    industry: "Healthcare · 3 locations",
    quote:
      "We were sending 60+ callers to voicemail every week. Within the first month, Bukwin booked 142 new patients we'd have lost. The ROI was visible by week two.",
    name: "Dr. Sarah Lin",
    role: "Practice Owner",
    initials: "SL",
    stats: [
      { label: "New patients / mo", value: "+142", icon: TrendingUp },
      { label: "After-hours bookings", value: "+38", icon: Clock },
      { label: "Voicemail rate", value: "0%", icon: PhoneMissed },
    ],
  },
  {
    company: "Meridian Realty",
    industry: "Real Estate · 8 agents",
    quote:
      "Every missed call was a $4,000 commission walking out the door. Bukwin qualifies, books viewings, and routes hot leads to the right agent in seconds. We've stopped chasing dead leads.",
    name: "Marcus Vale",
    role: "Managing Broker",
    initials: "MV",
    stats: [
      { label: "Viewings booked / mo", value: "+87", icon: TrendingUp },
      { label: "Avg response time", value: "11s", icon: Clock },
      { label: "Missed leads", value: "0", icon: PhoneMissed },
    ],
  },
  {
    company: "Tavolo Restaurant Group",
    industry: "Hospitality · 4 venues",
    quote:
      "Friday nights used to be a disaster — phone ringing off the hook, no one to answer. Bukwin handles reservations, waitlist, and dietary questions across all four venues simultaneously.",
    name: "Aria Chen",
    role: "Operations Director",
    initials: "AC",
    stats: [
      { label: "Reservations / wk", value: "+340", icon: TrendingUp },
      { label: "No-show rate", value: "-46%", icon: TrendingUp },
      { label: "Peak concurrent calls", value: "12", icon: Clock },
    ],
  },
];

export function CaseStudiesSection() {
  return (
    <Section bg="default" id="case-studies">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>Case Studies</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Real businesses. Real numbers."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              Not testimonials. Outcome reports — pulled straight from the
              dashboard, with the receipts to back them up.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-12 space-y-5" stagger={0.15}>
          {CASES.map((c) => (
            <StaggerItem key={c.company}>
              <article
                className="relative overflow-hidden rounded-2xl border border-border bg-surface p-7 md:p-9 transition-all duration-300 hover:shadow-lg hover:border-accent/30"
              >
                {/* Subtle corner accent — solid color, no blur */}
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.04] pointer-events-none"
                />
                <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-indigo-400 font-display text-lg font-semibold">
                        {c.initials[0]}
                      </span>
                      <div>
                        <p className="font-display text-lg font-medium text-primary">
                          {c.company}
                        </p>
                        <p className="text-xs text-text-secondary">{c.industry}</p>
                      </div>
                    </div>

                    <Quote className="h-7 w-7 text-accent/40 mb-3" />
                    <p className="font-display text-xl md:text-2xl font-medium leading-snug text-primary italic">
                      &ldquo;{c.quote}&rdquo;
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 border border-accent/30 font-display text-sm font-medium text-accent">
                        {c.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">{c.name}</p>
                        <p className="text-xs text-text-secondary">{c.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-border bg-background p-4"
                      >
                        <s.icon className="h-4 w-4 text-accent mb-2" strokeWidth={1.5} />
                        <p className="font-display text-2xl md:text-3xl font-medium text-primary leading-none">
                          {s.value}
                        </p>
                        <p className="mt-1 text-[11px] text-text-secondary leading-tight">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-10 text-center">
            <BukwinButton asChild size="lg" variant="secondary">
              <a href="/contact">
                Become our next case study
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </BukwinButton>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
