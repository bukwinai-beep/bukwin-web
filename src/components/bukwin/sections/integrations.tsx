"use client";

import { Container, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";

const INTEGRATIONS = [
  "Google Calendar",
  "Outlook",
  "Calendly",
  "HubSpot",
  "Salesforce",
  "GoHighLevel",
  "Twilio",
  "WhatsApp",
  "Slack",
  "Zapier",
  "Stripe",
  "Shopify",
];

export function IntegrationsSection() {
  return (
    <Section bg="surface" id="integrations" className="border-y border-border py-16 md:py-20">
      <Container size="xl">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-primary leading-snug">
              Works with what you already use.
            </h3>
            <p className="mt-3 text-sm text-text-secondary">
              Native integrations with the tools your team already lives in.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INTEGRATIONS.map((name) => (
              <div
                key={name}
                className="group flex items-center justify-center rounded-lg border border-border bg-background px-3 py-5 transition-all hover:border-accent/40 hover:shadow-sm"
              >
                <span className="font-display text-base md:text-lg font-medium text-text-secondary transition-colors group-hover:text-primary">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-8 text-center text-sm text-text-muted">
            And 50+ more. Don&apos;t see your tool?{" "}
            <a href="/contact" className="text-accent hover:underline underline-offset-4">
              We build custom integrations.
            </a>
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
