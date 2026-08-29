"use client";

import { Shield, Heart, GitBranch, TrendingUp, ArrowRight } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { CountUp } from "../shared/count-up";

const VALUES = [
  {
    icon: Heart,
    title: "Human-First",
    body: "The agent must sound like your best employee on their best day. If it sounds like a robot, we failed.",
  },
  {
    icon: Shield,
    title: "Radical Honesty",
    body: "If your business doesn't need Bukwin yet, we'll tell you on the first call. We're not in the business of selling seats nobody uses.",
  },
  {
    icon: GitBranch,
    title: "Systemic Thinking",
    body: "Fix the system, not the symptom. One missed call is a human problem; a hundred missed calls is an architecture problem.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    body: "Every call trains the agent. We ship improvements weekly, not quarterly, and you see them in your dashboard.",
  },
];

export function FounderSection() {
  return (
    <Section bg="surface" id="about" className="border-y border-border">
      <Container size="xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Founder card */}
          <FadeIn>
            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-2xl border border-border bg-background p-6 md:p-8 overflow-hidden">
                {/* Decorative corner accent — solid, no blur */}
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/5"
                />
                <div className="relative">
                  <Eyebrow>Founder Note</Eyebrow>
                  <p className="mt-5 font-display text-2xl md:text-3xl font-medium leading-snug text-primary">
                    &ldquo;I built Bukwin because I lost a customer to voicemail.
                    Once. That was enough.&rdquo;
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">
                    I ran a small dental practice for nine years. One Tuesday
                    morning, a new patient called while my receptionist was on
                    lunch. The call went to voicemail. They booked elsewhere.
                    Six months later, I found out that patient had a $14,000
                    treatment plan with the competitor down the street.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                    That missed call cost me a year of tuition for my daughter.
                    I started sketching Bukwin that night.
                  </p>

                  <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-accent font-display text-lg font-semibold">
                      AR
                    </div>
                    <div>
                      <p className="font-display text-base font-medium text-primary">
                        Arehman R.
                      </p>
                      <p className="text-xs text-text-secondary">
                        Founder &amp; CEO, Bukwin AI
                      </p>
                    </div>
                  </div>

                  <BukwinButton asChild size="md" className="mt-6 w-full">
                    <a href="/contact">
                      Book a 15-min call with me
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </BukwinButton>
                </div>
              </div>

              {/* Mini-stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-background p-4 text-center">
                  <p className="font-display text-3xl font-medium text-accent">
                    <CountUp to={200} suffix="+" />
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Businesses served
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 text-center">
                  <p className="font-display text-3xl font-medium text-accent">
                    <CountUp to={1} suffix="M+" />
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Calls answered
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Values */}
          <div>
            <FadeIn>
              <Eyebrow>Our Principles</Eyebrow>
              <TextReveal
                as="h2"
                text="Built on conviction, not vibes."
                className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
              />
              <p className="mt-5 text-lg text-text-secondary leading-relaxed">
                Four principles guide every product decision we make. They
                aren&apos;t marketing copy — they&apos;re the standards we
                hold ourselves to, and the ones our customers hold us to.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-10 space-y-3" stagger={0.1}>
              {VALUES.map((v) => (
                <StaggerItem key={v.title}>
                  <article className="group flex gap-4 rounded-2xl border border-border bg-background p-5 transition-all hover:border-accent/30 hover:shadow-sm">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110">
                      <v.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-medium text-primary">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.4}>
              <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-5 md:p-6">
                <p className="font-display text-lg md:text-xl font-medium text-primary leading-snug">
                  &ldquo;I am willing to tell you not to build it.&rdquo;
                </p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  If your business doesn&apos;t get enough calls to justify
                  Bukwin, we&apos;ll say so on the discovery call. We&apos;d
                  rather earn your trust than your first invoice.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
