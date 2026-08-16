"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = {
  id: string;
  label: string;
  href?: string;
  content: ReactNode;
};

export function TabNav({
  tabs,
  defaultTab,
  className,
}: {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className={className}>
      {/* Sticky tab bar */}
      <div className="sticky top-16 md:top-20 z-30 -mx-4 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex gap-1 overflow-x-auto scroll-bukwin py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                active === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-text-secondary hover:bg-secondary hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          {activeTab?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
