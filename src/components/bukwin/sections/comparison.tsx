"use client";

import { Check, X, Minus, ArrowRight } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { cn } from "@/lib/utils";

type Cell = "yes" | "no" | "partial";
type Row = {
  feature: string;
  detail?: string;
  bukwin: Cell;
  human: Cell;
  voicemail: Cell;
  ivr: Cell;
};

const ROWS: Row[] = [
  {
    feature: "Answers 24/7",
    detail: "Nights, weekends, holidays",
    bukwin: "yes",
    human: "no",
    voicemail: "yes",
    ivr: "yes",
  },
  {
    feature: "Answers on first ring",
    bukwin: "yes",
    human: "partial",
    voicemail: "yes",
    ivr: "yes",
  },
  {
    feature: "Conversational (not menu-driven)",
    detail: "Caller doesn't have to press 1, press 2",
    bukwin: "yes",
    human: "yes",
    voicemail: "no",
    ivr: "no",
  },
  {
    feature: "Book appointments in real-time",
    detail: "Checks live calendar, confirms on the call",
    bukwin: "yes",
    human: "yes",
    voicemail: "no",
    ivr: "partial",
  },
  {
    feature: "Speaks 30+ languages",
    bukwin: "yes",
    human: "partial",
    voicemail: "no",
    ivr: "partial",
  },
  {
    feature: "Handles unlimited concurrent calls",
    bukwin: "yes",
    human: "no",
    voicemail: "yes",
    ivr: "yes",
  },
  {
    feature: "Transfers urgent calls with context",
    detail: "Routes to right person, conversation attached",
    bukwin: "yes",
    human: "yes",
    voicemail: "no",
    ivr: "partial",
  },
  {
    feature: "Writes back to CRM",
    bukwin: "yes",
    human: "partial",
    voicemail: "no",
    ivr: "no",
  },
  {
    feature: "No-show recovery",
    detail: "Auto-texts missed appointments to rebook",
    bukwin: "yes",
    human: "no",
    voicemail: "no",
    ivr: "no",
  },
  {
    feature: "Full call transcripts & analytics",
    bukwin: "yes",
    human: "no",
    voicemail: "no",
    ivr: "partial",
  },
  {
    feature: "No per-minute fees",
    bukwin: "yes",
    human: "yes",
    voicemail: "yes",
    ivr: "yes",
  },
  {
    feature: "Never has a bad day / takes breaks",
    bukwin: "yes",
    human: "no",
    voicemail: "yes",
    ivr: "yes",
  },
];

const COLUMNS = [
  { key: "bukwin", label: "Bukwin AI", highlight: true, price: "from $79/mo" },
  { key: "human", label: "Human Receptionist", highlight: false, price: "~$3,500/mo" },
  { key: "voicemail", label: "Voicemail", highlight: false, price: "free" },
  { key: "ivr", label: "Traditional IVR", highlight: false, price: "$200–800/mo" },
] as const;

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/15 text-success">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-error/10 text-error/70">
        <X className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-text-secondary">
      <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
}

export function ComparisonSection() {
  return (
    <Section bg="surface" id="comparison" className="border-y border-border">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>Comparison</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Bukwin vs. the alternatives."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              The honest comparison. We don&apos;t pretend a human
              receptionist&apos;s empathy is replaceable — but for 80% of
              incoming calls, Bukwin is the better answer.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 overflow-x-auto scroll-bukwin rounded-2xl border border-border bg-background">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-[0.12em] text-text-secondary w-[36%]">
                    What it does
                  </th>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-4 text-center align-bottom",
                        col.highlight && "bg-accent/[0.04]"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={cn(
                            "font-display text-base md:text-lg font-medium",
                            col.highlight ? "text-accent" : "text-primary"
                          )}
                        >
                          {col.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.1em] text-text-muted font-mono">
                          {col.price}
                        </span>
                        {col.highlight && (
                          <span className="mt-1 inline-flex rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-accent-foreground">
                            Best
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-border/60 last:border-0 transition-colors hover:bg-secondary/20",
                      i % 2 === 1 && "bg-secondary/10"
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-primary text-[13px]">{row.feature}</p>
                      {row.detail && (
                        <p className="text-[11px] text-text-muted mt-0.5">{row.detail}</p>
                      )}
                    </td>
                    <td className={cn("px-4 py-3.5 text-center", row.bukwin === "yes" && "bg-accent/[0.04]")}>
                      <div className="flex justify-center">
                        <CellIcon value={row.bukwin} />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.human} />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.voicemail} />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.ivr} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 md:p-6">
            <div>
              <p className="font-display text-lg md:text-xl font-medium text-primary">
                Still on the fence? Book a 15-min call.
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                We&apos;ll show you a live side-by-side of Bukwin vs. your
                current setup. No deck.
              </p>
            </div>
            <BukwinButton asChild size="lg">
              <a href="/contact">
                See it for yourself
                <ArrowRight className="h-4 w-4" />
              </a>
            </BukwinButton>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
