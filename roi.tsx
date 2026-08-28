"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";

export function RoiSection() {
  const [calls, setCalls] = useState(200);
  const [value, setValue] = useState(250);
  const [answerRate, setAnswerRate] = useState(45);
  const bukwinRate = 98;

  const currentBookings = Math.round((calls * answerRate) / 100);
  const bukwinBookings = Math.round((calls * bukwinRate) / 100);
  const currentRevenue = currentBookings * value;
  const bukwinRevenue = bukwinBookings * value;
  const monthlyGain = bukwinRevenue - currentRevenue;
  const annualGain = monthlyGain * 12;
  const monthlyInvest = 199;
  const roi = monthlyInvest > 0 ? Math.round(monthlyGain / monthlyInvest) : 0;

  return (
    <Section bg="navy" id="roi" className="noise-overlay">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow tone="light">ROI Calculator</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="See what missed calls are costing you."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-white"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              Drag the sliders. The math is done in your browser — nothing is
              sent to us.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="font-display text-xl font-medium text-white mb-6">
                Your numbers
              </h3>

              <div className="space-y-8">
                <SliderRow
                  label="Calls per month"
                  value={calls}
                  min={50}
                  max={1000}
                  step={10}
                  onChange={setCalls}
                  format={(v) => v.toLocaleString()}
                />
                <SliderRow
                  label="Average customer value"
                  value={value}
                  min={50}
                  max={2000}
                  step={10}
                  onChange={setValue}
                  format={(v) => `$${v.toLocaleString()}`}
                />
                <SliderRow
                  label="Current answer rate"
                  value={answerRate}
                  min={10}
                  max={90}
                  step={1}
                  onChange={setAnswerRate}
                  format={(v) => `${v}%`}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white/80">
                      Bukwin answer rate
                    </label>
                    <span className="font-mono text-sm text-indigo-400">98%</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-indigo-400/20 bg-indigo-400/5 px-4 py-3">
                    <TrendingUp className="h-4 w-4 text-indigo-400 shrink-0" />
                    <p className="text-xs text-white/60">
                      We answer every call that connects — no voicemail, no hold music.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-indigo-400/30 bg-indigo-400/[0.06] p-6 md:p-8">
              <h3 className="font-display text-xl font-medium text-white mb-6">
                With Bukwin
              </h3>

              <div className="space-y-5">
                <ResultRow
                  label="Current monthly bookings"
                  value={currentBookings.toString()}
                  tone="muted"
                />
                <ResultRow
                  label="With Bukwin"
                  value={bukwinBookings.toString()}
                  tone="default"
                />
                <div className="h-px bg-white/10" />
                <ResultRow
                  label="Additional monthly revenue"
                  value={`$${monthlyGain.toLocaleString()}`}
                  tone="accent"
                />
                <ResultRow
                  label="Annual impact"
                  value={`$${annualGain.toLocaleString()}`}
                  tone="accent"
                  large
                />
                <div className="rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-white/70">Return on investment</span>
                    <span className="font-display text-3xl font-medium text-indigo-400">
                      {roi}×
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    Your monthly investment vs. recovered revenue
                  </p>
                </div>
              </div>

              <BukwinButton asChild size="lg" className="mt-6 w-full">
                <a href="/contact">
                  Book a Free Assessment
                  <ArrowRight className="h-4 w-4" />
                </a>
              </BukwinButton>
              <p className="mt-3 text-xs text-white/40 text-center">
                Illustration, not a guarantee. Results depend on your business,
                call quality, and conversion rate.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-white/80">{label}</label>
        <span className="font-mono text-sm text-indigo-400">{format(value)}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="[&_[role=slider]]:bg-indigo-400 [&_[role=slider]]:border-indigo-400 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-indigo-400/30 [&_.bg-primary]:bg-indigo-400/30"
      />
      <div className="mt-1.5 flex justify-between text-[10px] text-white/30 font-mono">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  tone = "default",
  large = false,
}: {
  label: string;
  value: string;
  tone?: "default" | "accent" | "muted";
  large?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span
        className={
          tone === "muted"
            ? "text-sm text-white/50"
            : tone === "accent"
            ? "text-sm font-medium text-white"
            : "text-sm text-white/70"
        }
      >
        {label}
      </span>
      <span
        className={`font-mono ${
          large ? "text-3xl md:text-4xl" : "text-xl"
        } ${
          tone === "accent" ? "text-indigo-400 font-semibold" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
