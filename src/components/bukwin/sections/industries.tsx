"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Home,
  UtensilsCrossed,
  Sparkles,
  Scale,
  Car,
  Wrench,
  BedDouble,
  ShoppingBag,
  Briefcase,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { cn } from "@/lib/utils";

type Industry = {
  id: string;
  icon: typeof Stethoscope;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  integrations: string[];
  stats: { label: string; value: string }[];
};

const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    icon: Stethoscope,
    name: "Healthcare & Dental",
    tagline: "HIPAA-aware patient intake",
    problem:
      "Patients call to book, reschedule, and ask about insurance — usually during clinic hours when your front desk is already slammed. After-hours calls go to voicemail, and 70% never leave a message.",
    solution:
      "Bukwin answers on the first ring, books against your practice management system, screens for new vs. existing patients, and handles intake forms. Urgent symptoms trigger a transfer to the on-call provider.",
    integrations: ["Open Dental", "Dentrix", "Eaglesoft", "Google Calendar", "Twilio SMS"],
    stats: [
      { label: "New patients / mo", value: "+142" },
      { label: "After-hours bookings", value: "+38" },
      { label: "Voicemail rate", value: "0%" },
    ],
  },
  {
    id: "real-estate",
    icon: Home,
    name: "Real Estate",
    tagline: "Property viewings & lead qualification",
    problem:
      "Every missed call is a $4,000 commission walking. Agents are out showing homes, not sitting by the phone, and inquiries from Zillow or your website go to voicemail during peak hours.",
    solution:
      "Bukwin qualifies (budget, timeline, location), books viewings against agent calendars, and routes hot leads to the right agent in seconds with full conversation context attached.",
    integrations: ["HubSpot", "Salesforce", "Follow Up Boss", "Google Calendar", "Zapier"],
    stats: [
      { label: "Viewings booked / mo", value: "+87" },
      { label: "Avg response time", value: "11s" },
      { label: "Missed leads", value: "0" },
    ],
  },
  {
    id: "restaurants",
    icon: UtensilsCrossed,
    name: "Restaurants & Food",
    tagline: "Reservations, waitlist, dietary",
    problem:
      "Friday nights are chaos. Phone rings nonstop with reservation requests, dietary questions, and catering inquiries. Hosts are seating guests, not answering calls — so callers book elsewhere.",
    solution:
      "Bukwin handles reservations, waitlist callbacks, dietary questions, and catering quotes across all your venues simultaneously. Auto-syncs to your reservation system.",
    integrations: ["OpenTable", "Resy", "Toast", "Square", "Shopify"],
    stats: [
      { label: "Reservations / wk", value: "+340" },
      { label: "No-show rate", value: "-46%" },
      { label: "Peak concurrent calls", value: "12" },
    ],
  },
  {
    id: "salons",
    icon: Sparkles,
    name: "Salons & Spas",
    tagline: "Service bookings & stylist routing",
    problem:
      "Clients call between appointments to book — usually when your front desk is checking someone in. Result: hold music, dropped calls, and bookings lost to competitors who picked up.",
    solution:
      "Bukwin checks stylist availability in real-time, books the right service with the right stylist, handles reschedules, and sends reminders that cut no-shows by 40%+.",
    integrations: ["Vagaro", "Mindbody", "Booksy", "Square", "Google Calendar"],
    stats: [
      { label: "Bookings / mo", value: "+218" },
      { label: "No-show rate", value: "-42%" },
      { label: "Avg booking time", value: "8s" },
    ],
  },
  {
    id: "legal",
    icon: Scale,
    name: "Legal Services",
    tagline: "Consultation intake & qualifying",
    problem:
      "Law firms get calls from potential clients at all hours. Most need a quick consultation to determine if the case fits — and that screening is exactly what a paralegal would do, but at 2am on a Sunday.",
    solution:
      "Bukwin asks your qualifying questions (case type, jurisdiction, urgency), books consultations, and flags high-value or time-sensitive cases for immediate partner review.",
    integrations: ["Clio", "MyCase", "PracticePanther", "Google Calendar", "Calendly"],
    stats: [
      { label: "Consultations / mo", value: "+34" },
      { label: "After-hours capture", value: "+19" },
      { label: "Qualified leads", value: "78%" },
    ],
  },
  {
    id: "automotive",
    icon: Car,
    name: "Automotive",
    tagline: "Service scheduling & recall",
    problem:
      "Service advisors are under the hood, not at the desk. Customers calling for oil changes, recalls, and status updates get voicemail — and book at the shop across town.",
    solution:
      "Bukwin schedules service by vehicle make/model, handles recall lookups, gives status updates on in-progress work, and books loaner vehicles — all in the customer's language.",
    integrations: ["CDK", "Reynolds & Reynolds", "Shopify", "Google Calendar", "Twilio"],
    stats: [
      { label: "Service bookings / mo", value: "+97" },
      { label: "Recall follow-ups", value: "+62" },
      { label: "Avg hold time", value: "0s" },
    ],
  },
  {
    id: "home-services",
    icon: Wrench,
    name: "Home Services",
    tagline: "Dispatch, quotes, emergencies",
    problem:
      "Plumbers, electricians, and HVAC techs are on the road. Calls for emergencies, quotes, and scheduling go unanswered — and emergency callers go to whoever picks up first.",
    solution:
      "Bukwin triages emergencies (transfers immediately), gives quote ranges from your pricing rules, schedules service windows against technician calendars, and texts arrival ETA.",
    integrations: ["Housecall Pro", "Jobber", "ServiceTitan", "Google Calendar", "Twilio"],
    stats: [
      { label: "Emergency response", value: "<60s" },
      { label: "Bookings / mo", value: "+128" },
      { label: "Quote conversion", value: "+31%" },
    ],
  },
  {
    id: "hospitality",
    icon: BedDouble,
    name: "Hospitality",
    tagline: "Reservations & concierge",
    problem:
      "Hotels get calls for reservations, concierge questions, room availability, and amenity hours — in 10+ languages. Front desk staff can't keep up during check-in/out peaks.",
    solution:
      "Bukwin handles room reservations, concierge inquiries, and amenity bookings in 30+ languages. Routes VIP and loyalty members to guest services with full context.",
    integrations: ["Opera PMS", "Mews", "Cloudbeds", "Google Calendar", "WhatsApp"],
    stats: [
      { label: "Reservations / mo", value: "+412" },
      { label: "Languages handled", value: "12" },
      { label: "Concierge deflection", value: "67%" },
    ],
  },
  {
    id: "retail",
    icon: ShoppingBag,
    name: "Retail & E-commerce",
    tagline: "Orders, returns, inventory",
    problem:
      "Online shoppers call about order status, returns, sizing, and stock — usually outside your support hours. They expect answers in minutes, not 24 hours.",
    solution:
      "Bukwin checks order status from your e-commerce backend, processes returns, answers sizing questions from product data, and books personal shopping appointments.",
    integrations: ["Shopify", "WooCommerce", "BigCommerce", "Stripe", "Klaviyo"],
    stats: [
      { label: "Order inquiries / mo", value: "+280" },
      { label: "Returns processed", value: "+94" },
      { label: "Avg resolution", value: "2:14" },
    ],
  },
  {
    id: "consulting",
    icon: Briefcase,
    name: "Consulting",
    tagline: "Lead qualification & scheduling",
    problem:
      "Consultants are in client meetings, not answering calls. Inbound leads from speaking gigs, podcasts, and referrals go to voicemail and lose momentum by the time you call back tomorrow.",
    solution:
      "Bukwin qualifies (company size, project scope, budget range), books a discovery call against your calendar, and sends a pre-call brief with the prospect's summary.",
    integrations: ["HubSpot", "Pipedrive", "Calendly", "Notion", "Stripe"],
    stats: [
      { label: "Discovery calls / mo", value: "+22" },
      { label: "Lead response time", value: "11s" },
      { label: "Show-up rate", value: "+34%" },
    ],
  },
];

export function IndustriesSection() {
  const [expanded, setExpanded] = useState<string | null>("healthcare");

  return (
    <Section bg="default" id="industries">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>Industries</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Not a generic bot. Trained for your business."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              Click any industry to see the script, integrations, and the
              outcomes other businesses like yours are seeing.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 grid gap-3">
            {INDUSTRIES.map((ind) => {
              const isOpen = expanded === ind.id;
              return (
                <div
                  key={ind.id}
                  className={cn(
                    "rounded-xl border bg-surface transition-all duration-300 overflow-hidden",
                    isOpen ? "border-accent/40 shadow-md" : "border-border hover:border-accent/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : ind.id)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-all",
                        isOpen
                          ? "bg-accent text-accent-foreground scale-110"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      <ind.icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-lg md:text-xl font-medium text-primary">
                          {ind.name}
                        </h3>
                        <span className="text-[11px] uppercase tracking-[0.12em] text-text-muted">
                          {ind.tagline}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-transform",
                        isOpen && "rotate-180 bg-accent/10 text-accent"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 grid lg:grid-cols-[1.3fr_1fr] gap-6">
                          <div className="space-y-4">
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-error/70 mb-1.5">
                                The problem
                              </p>
                              <p className="text-[14px] leading-relaxed text-text-secondary">
                                {ind.problem}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-accent mb-1.5">
                                How Bukwin handles it
                              </p>
                              <p className="text-[14px] leading-relaxed text-text-secondary">
                                {ind.solution}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted mb-2">
                                Native integrations
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {ind.integrations.map((ig) => (
                                  <span
                                    key={ig}
                                    className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-primary"
                                  >
                                    {ig}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                            {ind.stats.map((s) => (
                              <div
                                key={s.label}
                                className="rounded-lg border border-border bg-background p-3 text-center lg:text-left"
                              >
                                <p className="font-display text-xl md:text-2xl font-medium text-accent leading-none">
                                  {s.value}
                                </p>
                                <p className="mt-1 text-[10px] text-text-secondary leading-tight">
                                  {s.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <BukwinButton asChild size="lg" variant="secondary">
              <a href="/contact">
                Get a custom quote for your industry
                <ArrowRight className="h-4 w-4" />
              </a>
            </BukwinButton>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
