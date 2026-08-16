"use client";

import { BadgeCheck } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";

const TESTIMONIALS = [
  {
    quote:
      "We were losing leads overnight and never knew it. Now every inquiry gets a reply in seconds — our booked calls doubled without hiring anyone.",
    name: "Aria Chen",
    role: "COO",
    company: "Meridian B2B",
    initials: "AC",
  },
  {
    quote:
      "The 60-second response is the whole game. Prospects tell us we were the only company that actually got back to them fast.",
    name: "Marcus Vale",
    role: "Founder",
    company: "Kernel Labs",
    initials: "MV",
  },
  {
    quote:
      "The no-show recovery flow alone paid for the system in the first month. Leads I'd written off just started rebooking themselves.",
    name: "Devi Ramachandran",
    role: "Head of Growth",
    company: "Indigo Studio",
    initials: "DR",
  },
  {
    quote:
      "One inbox, one pipeline, everything automated. It replaced four tools and finally gave us a single source of truth.",
    name: "Jonas Weber",
    role: "Director of Sales Ops",
    company: "Helix Group",
    initials: "JW",
  },
  {
    quote:
      "Our review count tripled on autopilot. The local SEO lift from that alone brought in new inbound we weren't getting before.",
    name: "Sana Malik",
    role: "Owner",
    company: "Vale Consulting",
    initials: "SM",
  },
  {
    quote:
      "I was skeptical an AI could sound natural. Then I heard it handle an angry customer with more patience than my best employee.",
    name: "David Park",
    role: "Owner",
    company: "Park Auto Repair",
    initials: "DP",
  },
];

export function TestimonialsSection() {
  return (
    <Section bg="default" id="testimonials">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>Testimonials</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Real businesses. Real results."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
        </div>

        <StaggerContainer
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={0.1}
        >
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <article className="group h-full rounded-xl border border-border bg-surface p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30 border-l-[3px] !border-l-accent">
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -top-2 -left-1 font-display text-6xl text-accent/15 select-none"
                  >
                    &ldquo;
                  </span>
                  <p className="relative pl-6 text-[15px] md:text-base italic leading-relaxed text-primary">
                    {t.quote}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 border border-accent/30 font-display text-sm font-medium text-accent">
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary">{t.name}</p>
                    <p className="text-xs text-text-secondary">
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-success"
                    title="Verified business"
                  >
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
