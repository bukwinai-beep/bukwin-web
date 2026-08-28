import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/bukwin/navigation";
import { Footer } from "@/components/bukwin/footer";
import { ScrollProgress } from "@/components/bukwin/shared/scroll-progress";
import { CookieConsent } from "@/components/bukwin/shared/cookie-consent";

/**
 * Standard page wrapper for all sub-routes.
 * - Fixed navbar at top
 * - Top padding so content starts below the navbar (h-16 mobile, h-20 desktop)
 * - Sticky footer at bottom
 * - Cookie consent banner
 */
export function PageShell({
  children,
  className,
  noTopPadding = false,
}: {
  children: ReactNode;
  className?: string;
  noTopPadding?: boolean;
}) {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navigation />
      <main
        className={cn(
          "flex-1",
          !noTopPadding && "pt-16 md:pt-20",
          className
        )}
      >
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

/**
 * Compact page hero for sub-pages (smaller than homepage hero).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  bg = "default",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bg?: "default" | "navy" | "surface";
}) {
  const bgClass = {
    default: "bg-background",
    navy: "bg-navy text-white",
    surface: "bg-surface border-y border-border",
  }[bg];

  const isDark = bg === "navy";

  return (
    <section className={cn("py-16 md:py-24 lg:py-28", bgClass)}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] font-sans",
            isDark ? "text-indigo-400" : "text-accent"
          )}
        >
          <span className={cn("h-px w-6", isDark ? "bg-indigo-400/60" : "bg-accent/60")} aria-hidden />
          {eyebrow}
        </span>
        <h1
          className={cn(
            "mt-5 font-display font-bold leading-[1.1] tracking-[-0.02em] text-4xl md:text-5xl lg:text-[3.5rem]",
            isDark ? "text-white" : "text-primary"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg md:text-xl leading-relaxed",
              isDark ? "text-white/70" : "text-text-secondary"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
