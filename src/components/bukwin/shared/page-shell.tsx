import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/bukwin/navigation";
import { Footer } from "@/components/bukwin/footer";
import { ScrollProgress } from "@/components/bukwin/shared/scroll-progress";
import { CookieConsent } from "@/components/bukwin/shared/cookie-consent";
import { Eyebrow } from "@/components/bukwin/shared/container";

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
 * Compact page hero for sub-pages — a floating white card on a light
 * page background, mirroring the homepage hero's visual language.
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
  const isDark = bg === "navy";

  return (
    <section className="bg-[#F1F2F4] dark:bg-background py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className={cn(
            "rounded-[32px] shadow-xl border overflow-hidden px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20",
            isDark
              ? "bg-navy border-white/10"
              : "bg-white dark:bg-card border-black/5 dark:border-border"
          )}
        >
          <Eyebrow tone={isDark ? "light" : "dark"}>{eyebrow}</Eyebrow>
          <h1
            className={cn(
              "mt-5 font-display font-bold leading-[1.1] tracking-[-0.02em] text-4xl md:text-5xl lg:text-[3.5rem]",
              isDark ? "text-white" : "text-[#0B0E14] dark:text-foreground"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lg md:text-xl leading-relaxed",
                isDark ? "text-white/60" : "text-slate-500 dark:text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
