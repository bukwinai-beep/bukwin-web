"use client";

import {
  PhoneCall,
  CalendarCheck,
  Globe,
  Database,
  ArrowRight,
  MessageCircle,
  Filter,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { LivePulse } from "../shared/live-pulse";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: PhoneCall,
    title: "24/7 Voice Answering",
    body: "Nights, weekends, public holidays. Unlimited calls at once, no hold music. Every caller gets answered on the first ring.",
    span: "lg:col-span-2 lg:row-span-2",
    accent: true,
    visual: true,
  },
  {
    icon: CalendarCheck,
    title: "Instant Appointment Booking",
    body: "Checks live availability, books the slot, sends confirmations by SMS or WhatsApp, and reminders that cut your no-shows.",
    span: "",
  },
  {
    icon: Globe,
    title: "Speaks Their Language",
    body: "Natural conversation in 30+ languages. Detects the caller's language and switches automatically.",
    span: "",
  },
  {
    icon: Database,
    title: "CRM Sync",
    body: "Contacts, notes, call summaries, and appointments written back automatically.",
    span: "",
  },
  {
    icon: ArrowRight,
    title: "Smart Transfers",
    body: "Urgent or high-value callers get routed to the right person, with full conversation context attached.",
    span: "",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp & Chat",
    body: "The same agent on your website and WhatsApp. Answers never contradict each other.",
    span: "",
  },
  {
    icon: Filter,
    title: "Lead Qualification",
    body: "Asks your qualifying questions, flags real buyers, and politely handles non-buyers.",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Call Analytics",
    body: "Every call measured: response time, resolution rate, booking conversion, and sentiment.",
    span: "",
  },
  {
    icon: RefreshCw,
    title: "No-Show Recovery",
    body: "Automatically follows up with missed appointments to rebook them before they go cold.",
    span: "",
  },
];

export function FeaturesSection() {
  return (
    <Section bg="navy" id="features" className="noise-overlay">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>Features</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="A premium front desk, without hiring one."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-white"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed">
              Everything a great receptionist does — answered instantly, priced
              flat, and running while you sleep.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4"
          stagger={0.08}
        >
          {FEATURES.map((f) => (
            <StaggerItem
              key={f.title}
              className={cn(f.span, "h-full")}
            >
              <FeatureCard {...f} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  accent,
  visual,
}: {
  icon: typeof PhoneCall;
  title: string;
  body: string;
  accent?: boolean;
  visual?: boolean;
}) {
  return (
    <article
      className={cn(
        "group h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.05]",
        accent && "border-accent/20 bg-accent/[0.06]"
      )}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3
        className={cn(
          "mt-5 font-display font-medium leading-snug",
          visual ? "text-3xl md:text-4xl" : "text-xl"
        )}
      >
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-white/60">{body}</p>

      {visual && (
        <div className="mt-6 rounded-lg border border-white/10 bg-primary/40 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-accent">
              <LivePulse color="bg-accent" />
              Answering now
            </span>
            <span className="font-mono text-xs text-white/40">00:42</span>
          </div>
          <div className="flex items-end justify-center gap-1 h-14">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar w-1 rounded-full bg-accent/70"
                style={{
                  height: `${15 + Math.abs(Math.sin(i * 0.5)) * 80}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-white/5 p-2">
              <p className="font-mono text-lg text-white">3</p>
              <p className="text-[10px] text-white/50">In progress</p>
            </div>
            <div className="rounded-md bg-white/5 p-2">
              <p className="font-mono text-lg text-white">128</p>
              <p className="text-[10px] text-white/50">Answered today</p>
            </div>
            <div className="rounded-md bg-white/5 p-2">
              <p className="font-mono text-lg text-accent">100%</p>
              <p className="text-[10px] text-white/50">Pickup rate</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
