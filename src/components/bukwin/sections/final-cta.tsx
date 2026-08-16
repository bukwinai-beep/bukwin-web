"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
} from "lucide-react";
import { Container, Section } from "../shared/container";
import { FadeIn } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { LivePulse } from "../shared/live-pulse";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Healthcare & Dental",
  "Real Estate",
  "Restaurants & Food",
  "Salons & Spas",
  "Legal Services",
  "Automotive",
  "Home Services",
  "Hospitality",
  "Retail & E-commerce",
  "Consulting",
  "Other",
];

const CALL_VOLUMES = [
  "Under 50 / month",
  "50–200 / month",
  "200–500 / month",
  "500–1000 / month",
  "1000+ / month",
];

const SCHEDULERS = [
  "Google Calendar",
  "Outlook / Microsoft 365",
  "Calendly",
  "HubSpot",
  "GoHighLevel",
  "Salesforce",
  "Other / none",
];

type Status = "idle" | "loading" | "success" | "error";

export function FinalCtaSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: "",
    industry: "",
    callVolume: "",
    scheduler: "",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage_cta" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        businessName: "",
        phone: "",
        industry: "",
        callVolume: "",
        scheduler: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <Section bg="navy" id="cta" className="noise-overlay relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 168, 83, 0.12), transparent 70%)",
        }}
      />
      <Container size="xl" className="relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Left: pitch */}
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                <LivePulse color="bg-accent" />
                Book a free demo
              </span>
            </FadeIn>

            <TextReveal
              as="h2"
              text="Your next customer is already calling."
              className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-[-0.01em] text-white"
            />

            <FadeIn delay={0.3}>
              <p className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                Fifteen minutes, no pitch deck. We&apos;ll ask what your phone
                does on a busy day, then show you Bukwin handling it.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mt-8 space-y-3">
                {[
                  { icon: Clock, label: "Response within 2 business hours" },
                  { icon: Calendar, label: "Live in 48 hours, no contract" },
                  { icon: CheckCircle2, label: "30-day money-back guarantee" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 border border-accent/30">
                      <item.icon className="h-4 w-4 text-accent" />
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.15em] text-white/40">
                <span>No credit card required</span>
                <span className="hidden md:inline">·</span>
                <span>Cancel anytime</span>
                <span className="hidden md:inline">·</span>
                <a
                  href="tel:5550192834"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-accent transition"
                >
                  <Phone className="h-3 w-3" />
                  <span className="font-mono normal-case tracking-normal">
                    (555) 019-2834
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.4}>
            <div className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 border border-success/40">
                      <CheckCircle2 className="h-7 w-7 text-success" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl md:text-3xl font-medium text-white">
                      Got it — talk soon.
                    </h3>
                    <p className="mt-3 text-sm text-white/70 max-w-sm mx-auto">
                      Your request is in. We&apos;ll reach out within 2 business
                      hours with a calendar link. Check your inbox (and spam,
                      just in case).
                    </p>
                    <BukwinButton
                      type="button"
                      onClick={() => setStatus("idle")}
                      variant="ghost"
                      size="md"
                      className="mt-6"
                    >
                      Submit another
                    </BukwinButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full name" required>
                        <input
                          type="text"
                          required
                          minLength={2}
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          placeholder="Sarah Mitchell"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Work email" required>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          placeholder="sarah@business.com"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Business name">
                        <input
                          type="text"
                          value={form.businessName}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              businessName: e.target.value,
                            }))
                          }
                          placeholder="Bright Smile Dental"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Phone (optional)">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          placeholder="(555) 555-0192"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Industry">
                        <select
                          value={form.industry}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, industry: e.target.value }))
                          }
                          className={inputCls}
                        >
                          <option value="">Select industry</option>
                          {INDUSTRIES.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Calls per month">
                        <select
                          value={form.callVolume}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              callVolume: e.target.value,
                            }))
                          }
                          className={inputCls}
                        >
                          <option value="">Select volume</option>
                          {CALL_VOLUMES.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Current scheduling tool">
                      <select
                        value={form.scheduler}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, scheduler: e.target.value }))
                        }
                        className={inputCls}
                      >
                        <option value="">Select tool</option>
                        {SCHEDULERS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Anything we should know?">
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="e.g. We get slammed Friday afternoons and need after-hours coverage."
                        className={cn(inputCls, "resize-none")}
                      />
                    </Field>

                    <BukwinButton
                      type="submit"
                      size="lg"
                      variant="primary"
                      disabled={status === "loading"}
                      className="w-full"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Book Your Free Demo
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </BukwinButton>

                    {status === "error" && (
                      <div className="flex items-start gap-2 rounded-md border border-error/30 bg-error/10 px-3 py-2 text-xs text-error">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{errorMsg ?? "Something went wrong. Please try again."}</span>
                      </div>
                    )}

                    <p className="text-center text-[11px] text-white/40">
                      By submitting, you agree to be contacted about Bukwin AI.
                      We never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

const inputCls =
  "w-full h-10 rounded-md border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 focus:border-accent/60 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/20 transition";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
