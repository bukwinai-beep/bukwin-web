"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { LivePulse } from "../shared/live-pulse";

// "Quiet Ledger" hero — serif headline, mono data labels, hairline rules
// instead of cards/badges/gradients. Fonts are loaded in layout.tsx as
// --font-fraunces / --font-plex-sans / --font-plex-mono, scoped here via
// inline style rather than new Tailwind utilities, so the rest of the
// site's existing type system is untouched.

const LEDGER: { time: string; who: string; what: string }[] = [
  { time: "10:24 AM", who: "Abdul Rahman", what: "Consultation Call" },
  { time: "09:57 AM", who: "Anas Ali", what: "Live Product Demo" },
  { time: "09:12 AM", who: "S. Rehman", what: "AI Receptionist Setup" },
];

const serif = { fontFamily: "var(--font-fraunces), Georgia, serif" };
const mono = { fontFamily: "var(--font-plex-mono), monospace" };
const sans = { fontFamily: "var(--font-plex-sans), sans-serif" };

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
              Now answering — 3,048 calls handled
            </p>
          </FadeIn>

          <FadeIn delay={0.25} y={18}>
            <h1
              style={serif}
              className="text-[clamp(2.25rem,5.2vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.015em] text-foreground"
            >
              The receptionist that
              <br />
              never{" "}
              <em style={{ ...serif, fontStyle: "italic", fontWeight: 400 }} className="text-accent">
                misses a call.
              </em>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4} y={16}>
            <p style={sans} className="mt-7 max-w-[540px] text-[17px] leading-[1.65] text-muted-foreground">
              Bukwin answers, qualifies, and books appointments on real
              calendars — by phone or chat — so nothing falls through after
              hours, ever.
            </p>
          </FadeIn>

          <FadeIn delay={0.55} y={16}>
            <div className="mt-9 flex items-center gap-8">
              <a
                href="/demo"
                style={sans}
                className="bg-primary text-primary-foreground text-sm px-7 py-3.5 hover:opacity-90 transition-opacity"
              >
                Book a Demo
              </a>
              <a
                href="/how-it-works"
                style={sans}
                className="inline-flex items-center gap-1.5 text-sm text-foreground border-b border-border pb-0.5 hover:border-foreground transition-colors"
              >
                Talk to the live agent
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Signature element: live ledger strip of recent bookings */}
        <FadeIn delay={0.7} y={12}>
          <div className="border-t border-border pb-20">
            <div
              style={mono}
              className="flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              <span>Recent bookings</span>
              <span>Live · Real calendar</span>
            </div>
            {LEDGER.map((row) => (
              <div
                key={row.time + row.who}
                className="grid grid-cols-[90px_1fr_auto] sm:grid-cols-[110px_1fr_200px] items-center gap-4 py-4 border-t border-border"
              >
                <span style={mono} className="text-[13px] text-muted-foreground">
                  {row.time}
                </span>
                <span style={serif} className="text-[16px] font-medium text-foreground truncate">
                  {row.who}
                </span>
                <span style={sans} className="hidden sm:block text-sm text-muted-foreground">
                  {row.what}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
