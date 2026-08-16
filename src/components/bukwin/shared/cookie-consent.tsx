"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { BukwinButton } from "./button";

const STORAGE_KEY = "bukwin-cookie-consent-v1";
type Consent = "all" | "essential" | null;

function readStored(): Consent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "all" || raw === "essential") return raw;
  } catch {
    /* ignore */
  }
  return null;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Defer state update to avoid synchronous setState-in-effect warning.
    const id = setTimeout(() => {
      setConsent(readStored());
      setHydrated(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const setChoice = (c: Exclude<Consent, null>) => {
    setDismissed(true);
    setConsent(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  };

  const open = hydrated && consent === null && !dismissed;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-[640px] rounded-2xl border border-border bg-surface shadow-2xl"
        >
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-4">
              <span className="hidden md:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Cookie className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base md:text-lg font-medium text-primary">
                  We use cookies — sparingly.
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  Essential cookies keep the site working. Analytics cookies
                  help us understand which pages are useful. We never sell your
                  data.{" "}
                  <a href="#" className="text-accent hover:underline underline-offset-4">
                    Read the policy
                  </a>
                  .
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <BukwinButton
                    type="button"
                    size="sm"
                    onClick={() => setChoice("all")}
                  >
                    Accept all
                  </BukwinButton>
                  <BukwinButton
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setChoice("essential")}
                  >
                    Essential only
                  </BukwinButton>
                  <button
                    type="button"
                    onClick={() => setChoice("essential")}
                    className="inline-flex items-center justify-center px-3 py-2 text-xs text-text-muted hover:text-text-secondary transition"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
