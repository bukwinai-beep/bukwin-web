"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";

const POSTS = [
  {
    category: "Operations",
    title: "The 60-second rule: why speed beats script every time",
    excerpt:
      "A study of 12,000 inbound calls shows that response time — not script polish — predicts booking conversion. Here's what the data says, and how to apply it.",
    readTime: "6 min",
    date: "Aug 12, 2026",
    accent: "bg-accent/15 text-accent",
  },
  {
    category: "Industry",
    title: "What dental practices lose to voicemail (with real numbers)",
    excerpt:
      "We analyzed 4 months of calls across 23 dental offices. The average missed-call cost was $312. The fix isn't more staff — it's coverage during the hours you can't be there.",
    readTime: "8 min",
    date: "Aug 6, 2026",
    accent: "bg-primary/10 text-primary",
  },
  {
    category: "Engineering",
    title: "How we got Bukwin to sound human, not robotic",
    excerpt:
      "Latency is the enemy of natural conversation. Here's the architecture we built to keep end-to-end voice response under 800ms — including the tradeoffs we made.",
    readTime: "11 min",
    date: "Jul 29, 2026",
    accent: "bg-success/15 text-success",
  },
];

export function BlogSection() {
  return (
    <Section bg="default" id="insights">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <FadeIn>
              <Eyebrow>Insights</Eyebrow>
              <TextReveal
                as="h2"
                text="Field notes from the front desk."
                className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
              />
              <p className="mt-5 text-lg text-text-secondary leading-relaxed">
                Practical research on missed calls, conversion, and the
                economics of being reachable — written by the team building
                Bukwin.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <BukwinButton asChild size="md" variant="secondary">
              <a href="/blog">
                All articles
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </BukwinButton>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-12 grid md:grid-cols-3 gap-5" stagger={0.12}>
          {POSTS.map((post, i) => (
            <StaggerItem key={post.title} className="h-full">
              <article className="group flex h-full flex-col rounded-xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30">
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary/30">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        i === 0
                          ? "radial-gradient(circle at 30% 30%, rgba(79,70,229,0.25), transparent 60%), linear-gradient(135deg, #0B0E14 0%, #1E293B 100%)"
                          : i === 1
                          ? "radial-gradient(circle at 70% 40%, rgba(16,185,129,0.18), transparent 60%), linear-gradient(135deg, #F1F2F4 0%, #EEF0F3 100%)"
                          : "linear-gradient(135deg, #0B0E14 0%, #4F46E5 130%)",
                    }}
                  />
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <span className={`absolute top-4 left-4 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${post.accent}`}>
                    {post.category}
                  </span>
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-[10px] font-mono text-text-secondary">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-text-muted font-mono">
                    {post.date}
                  </p>
                  <h3 className="mt-2 font-display text-lg md:text-xl font-medium leading-snug text-primary group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
