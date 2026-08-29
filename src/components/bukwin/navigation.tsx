"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ArrowRight,
  Moon,
  Sun,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./shared/container";
import { BukwinButton } from "./shared/button";
import { ThemeToggle } from "./shared/theme-toggle";
import { LiveCallCounter } from "./shared/live-call-counter";
import { LivePulse } from "./shared/live-pulse";

type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Product",
    items: [
      { label: "Features", href: "/features", description: "What Bukwin does", icon: Sparkles },
      { label: "How It Works", href: "/how-it-works", description: "Setup in 48 hours", icon: ArrowRight },
      { label: "Live Demo", href: "/demo", description: "Try the AI agent", icon: Phone },
      { label: "Dashboard", href: "/features#dashboard", description: "See it in action", icon: ArrowRight },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Industries", href: "/industries", description: "Tuned per vertical", icon: ArrowRight },
      { label: "Integrations", href: "/features#integrations", description: "50+ tools supported", icon: ArrowRight },
      { label: "Case Studies", href: "/case-studies", description: "Real outcomes", icon: ArrowRight },
      { label: "Pricing", href: "/pricing", description: "Flat, simple tiers", icon: ArrowRight },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", description: "Founder story & values", icon: ArrowRight },
      { label: "Security", href: "/security", description: "HIPAA · GDPR · SOC 2", icon: ArrowRight },
      { label: "Insights", href: "/blog", description: "Field notes & research", icon: ArrowRight },
      { label: "Contact", href: "/contact", description: "Book a 15-min call", icon: ArrowRight },
    ],
  },
];

const DIRECT_LINKS = [
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/pricing#faq" },
];

function Logo({ onDark, size = "md" }: { onDark: boolean; size?: "sm" | "md" }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Bukwin AI home">
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-md bg-accent",
          size === "md" ? "h-9 w-9" : "h-8 w-8"
        )}
      >
        <span className="font-display text-xl font-bold text-accent-foreground leading-none">B</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tight transition-colors",
            size === "md" ? "text-lg" : "text-base",
            onDark ? "text-white" : "text-primary"
          )}
        >
          Bukwin<span className="text-accent"> AI</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] uppercase tracking-[0.2em] font-medium transition-colors",
            onDark ? "text-white/60" : "text-text-secondary"
          )}
        >
          AI Receptionist
        </span>
      </span>
    </Link>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The homepage hero is a light card on a light page background (matching
  // the white/black/blue theme), so the nav always uses theme colors —
  // no dark-hero special case needed anymore.
  const onDark = false;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-background border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container size="xl">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Logo onDark={onDark} />

          {/* Desktop nav with dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map((group) => (
              <Dropdown
                key={group.label}
                group={group}
                onDark={onDark}
                isOpen={openGroup === group.label}
                onToggle={() =>
                  setOpenGroup((cur) => (cur === group.label ? null : group.label))
                }
                onClose={() => setOpenGroup(null)}
              />
            ))}
            {DIRECT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "link-underline px-3.5 py-2 text-sm font-medium transition-colors",
                  onDark
                    ? "text-white/80 hover:text-white"
                    : "text-primary/80 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: live counter + theme + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-2 text-xs font-medium transition-colors",
                onDark ? "text-white/70" : "text-text-secondary"
              )}
              title="Calls answered by Bukwin today"
            >
              <LivePulse color="bg-success" />
              <span className="font-mono">
                <LiveCallCounter />
              </span>
            </span>
            <ThemeToggle />
            <a
              href="tel:5550192834"
              className={cn(
                "hidden xl:inline-flex items-center gap-2 text-sm font-medium transition-colors",
                onDark
                  ? "text-white/80 hover:text-accent"
                  : "text-primary/80 hover:text-accent"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="font-mono text-[13px]">(555) 019-2834</span>
            </a>
            <BukwinButton asChild size="md">
              <Link href="/contact">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </BukwinButton>
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md transition",
              onDark
                ? "text-white hover:bg-white/10"
                : "text-primary hover:bg-primary/5"
            )}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <MobileDrawer
            onClose={() => setOpen(false)}
            onDark={false}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function Dropdown({
  group,
  onDark,
  isOpen,
  onToggle,
  onClose,
}: {
  group: NavGroup;
  onDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseLeave={onClose}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-md",
          onDark
            ? "text-white/80 hover:text-white hover:bg-white/5"
            : "text-primary/80 hover:text-primary hover:bg-secondary"
        )}
        aria-expanded={isOpen}
      >
        {group.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 top-full pt-2 w-[320px]"
          >
            <div className="rounded-2xl border border-border bg-surface shadow-xl overflow-hidden">
              <div className="px-4 pt-3 pb-2 border-b border-border">
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-text-muted">
                  {group.label}
                </p>
              </div>
              <ul className="p-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-start gap-3 rounded-lg p-2.5 hover:bg-secondary transition-colors"
                    >
                      {item.icon && (
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-transform group-hover:scale-110">
                          <item.icon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      )}
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-primary">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-text-secondary mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDrawer({ onClose, onDark }: { onClose: () => void; onDark: boolean }) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("Product");

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-navy/70 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-[400px] bg-surface shadow-2xl lg:hidden flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Logo onDark={onDark} size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-secondary"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto scroll-bukwin">
          {/* Live status pill */}
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary">
                <LivePulse color="bg-success" />
                <span className="font-mono">
                  <LiveCallCounter /> calls today
                </span>
              </span>
              <ThemeToggle />
            </div>
          </div>

          {/* Expandable nav groups */}
          <nav className="px-3 py-3">
            {NAV_GROUPS.map((group) => {
              const isExpanded = expandedGroup === group.label;
              return (
                <div key={group.label} className="border-b border-border/60 last:border-0">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedGroup((cur) =>
                        cur === group.label ? null : group.label
                      )
                    }
                    className="flex w-full items-center justify-between py-3 px-2 text-left"
                    aria-expanded={isExpanded}
                  >
                    <span className="text-sm font-semibold text-primary">
                      {group.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-text-muted transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center gap-3 py-2.5 px-2 rounded-md hover:bg-secondary transition-colors"
                            >
                              {item.icon && (
                                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                                  <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                                </span>
                              )}
                              <span className="flex flex-col">
                                <span className="text-sm font-medium text-primary">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="text-[11px] text-text-secondary">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Direct links row */}
          <div className="px-5 py-3 flex flex-wrap gap-2 border-t border-border">
            {DIRECT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-accent/40 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer footer — sticky CTAs */}
        <div className="shrink-0 border-t border-border bg-background p-4 space-y-2">
          <a
            href="tel:5550192834"
            className="flex items-center justify-center gap-2 text-sm font-medium text-text-secondary"
          >
            <Phone className="h-4 w-4 text-accent" />
            <span className="font-mono">(555) 019-2834</span>
          </a>
          <BukwinButton asChild size="lg" className="w-full">
            <Link href="/contact" onClick={onClose}>
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </BukwinButton>
        </div>
      </motion.div>
    </>
  );
}
