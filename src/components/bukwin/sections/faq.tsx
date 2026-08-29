"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";

const FAQ = [
  {
    q: "How does the AI receptionist actually work?",
    a: "We point your existing number at Bukwin. The agent answers, follows the script and rules we build with you, checks your calendar, books or transfers, then writes everything back to your systems. Nothing changes for the caller.",
  },
  {
    q: "Will it sound like a robot?",
    a: "No. It speaks naturally, handles interruptions and pauses, and can be tuned to your brand's tone. Most callers treat it like a normal front-desk conversation. You can hear it yourself in the live demo above.",
  },
  {
    q: "Can it speak my customers' language?",
    a: "Yes — 30+ languages supported. It can detect the caller's language and switch automatically. This matters a lot for businesses serving diverse communities.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. You define the triggers — urgency, deal size, a specific service, an angry caller — and the agent routes to the right person, with full conversation context attached.",
  },
  {
    q: "Does it work with my calendar and CRM?",
    a: "Google Calendar, Outlook, Calendly, HubSpot, Salesforce, GoHighLevel, and more. If you don't have a system yet, we'll set up a simple one for you.",
  },
  {
    q: "Does it handle WhatsApp and website chat too?",
    a: "Yes. The same agent, the same knowledge, across phone, WhatsApp, and your website — so answers never contradict each other.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses go live within 48 hours. Complex integrations or multi-location setups take a few days longer, and we'll tell you honestly on the first call.",
  },
  {
    q: "What does it cost?",
    a: "Flat monthly pricing based on call volume and integrations — no per-minute surprises. We quote it after a 15-minute call, once we know what your phone actually does on a busy day.",
  },
];

export function FaqSection() {
  return (
    <Section bg="default" id="faq">
      <Container size="lg">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <Eyebrow className="justify-center">FAQ</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="Good questions. Honest answers."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
        </div>

        <FadeIn delay={0.2}>
          <Accordion
            type="single"
            collapsible
            className="mt-12 w-full space-y-3"
          >
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-surface px-5 md:px-6 data-[state=open]:border-accent/40 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left font-display text-lg md:text-xl font-medium text-primary hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] md:text-base text-text-secondary leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </Container>
    </Section>
  );
}
