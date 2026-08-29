"use client";

import { Shield, Lock, FileCheck, Globe, Server, Eye } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { LivePulse } from "../shared/live-pulse";

const COMPLIANCE = [
  {
    region: "United States",
    badge: "HIPAA-aligned",
    detail:
      "Business Associate Agreements available for healthcare customers. PHI handling, audit logs, and encryption at rest.",
    icon: FileCheck,
  },
  {
    region: "European Union / UK",
    badge: "GDPR-compliant",
    detail:
      "Right to erasure, data portability, and granular consent. EU data residency available on Enterprise plans.",
    icon: Shield,
  },
  {
    region: "Australia",
    badge: "Privacy Act",
    detail:
      "Australian Privacy Principles (APP) aligned. Data processed and stored in compliance with local requirements.",
    icon: Shield,
  },
  {
    region: "Global",
    badge: "SOC 2 Type II",
    detail:
      "In progress. Security, availability, and confidentiality controls audited annually by an independent firm.",
    icon: Lock,
  },
];

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    body: "AES-256 at rest, TLS 1.3 in transit. Call recordings and transcripts encrypted per-business.",
  },
  {
    icon: Server,
    title: "Per-tenant isolation",
    body: "Your data never mixes with another customer's. Vector memory, transcripts, and recordings are scoped by business_id.",
  },
  {
    icon: Eye,
    title: "Audit logs",
    body: "Every agent action — booking, transfer, CRM write — is logged with timestamp and caller context. Exportable.",
  },
  {
    icon: Globe,
    title: "Regional data residency",
    body: "Choose US, EU, or AU data regions. Enterprise can request on-premise deployment.",
  },
];

export function ComplianceSection() {
  return (
    <Section bg="default" id="security">
      <Container size="xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <Eyebrow>Security &amp; Compliance</Eyebrow>
              <TextReveal
                as="h2"
                text="Built for industries that take privacy seriously."
                className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
              />
              <p className="mt-5 text-lg text-text-secondary leading-relaxed">
                Healthcare, legal, financial — if your business is regulated,
                Bukwin is built to live inside that fence. Not bolted on later.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 px-4 py-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-success/15 text-success">
                  <Shield className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-medium text-primary flex items-center gap-2">
                    All systems operational
                    <LivePulse color="bg-success" />
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    99.97% uptime over the last 90 days
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div>
            {/* Compliance grid */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-3" stagger={0.1}>
              {COMPLIANCE.map((c) => (
                <StaggerItem key={c.region}>
                  <article className="group h-full rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-accent/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                        <Globe className="h-3.5 w-3.5" />
                        {c.region}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
                        <c.icon className="h-3 w-3" />
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-text-secondary">
                      {c.detail}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Security features */}
            <StaggerContainer
              className="mt-6 grid sm:grid-cols-2 gap-3"
              stagger={0.08}
            >
              {SECURITY_FEATURES.map((s) => (
                <StaggerItem key={s.title}>
                  <article className="flex gap-3 rounded-2xl border border-border bg-background p-4 hover:border-accent/30 transition-colors">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary">
                      <s.icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">{s.title}</h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">
                        {s.body}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-xs text-text-muted leading-relaxed">
                Need a DPA, BAA, or custom security review?{" "}
                <a href="/contact" className="text-accent hover:underline underline-offset-4">
                  Contact our security team
                </a>
                . We respond within one business day.
              </p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
