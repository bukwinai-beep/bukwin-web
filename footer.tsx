"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Youtube,
  Github,
  ArrowRight,
  Phone,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Container } from "./shared/container";
import { BukwinButton } from "./shared/button";

const FOOTER_LINKS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
      { label: "Live Demo", href: "/demo" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/blog" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <footer className="bg-navy text-white border-t border-white/10 pt-16 pb-8">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/5 border border-white/10">
                <span className="font-display text-xl font-semibold text-indigo-400 leading-none">B</span>
              </span>
              <span className="font-display text-lg font-semibold">
                Bukwin <span className="text-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              AI receptionists that answer your phone 24/7, handle enquiries,
              qualify leads, book appointments, and transfer the calls that
              matter.
            </p>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-3">
                Get product updates
              </p>
              <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="h-11 flex-1 rounded-md border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-indigo-400/60 focus:bg-white/10 focus:outline-none transition"
                />
                <BukwinButton type="submit" size="md" className="shrink-0" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </BukwinButton>
              </form>
              {status === "success" && (
                <p className="mt-2 text-xs text-indigo-400 inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  You&apos;re on the list.
                </p>
              )}
              {status === "error" && (
                <p className="mt-2 text-xs text-error">
                  Couldn&apos;t subscribe — try again.
                </p>
              )}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-xs uppercase tracking-[0.18em] text-white/40 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-indigo-400 transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 grid gap-4 md:grid-cols-3 items-center">
          <p className="text-xs text-white/50 order-2 md:order-1 text-center md:text-left">
            © 2026 Bukwin AI. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-3 order-1 md:order-2">
            {[Linkedin, Twitter, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/50 hover:text-indigo-400 hover:border-indigo-400/40 transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center md:justify-end gap-2 order-3 text-xs text-white/40">
            <Phone className="h-3.5 w-3.5" />
            <a href="tel:5550192834" className="font-mono hover:text-indigo-400 transition">
              (555) 019-2834
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
