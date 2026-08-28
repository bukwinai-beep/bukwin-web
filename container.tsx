import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Container({
  children,
  className,
  size = "xl",
}: {
  children: ReactNode;
  className?: string;
  size?: "xl" | "lg" | "md" | "full";
}) {
  const sizeClass = {
    xl: "max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12",
    lg: "max-w-[1024px] px-4 sm:px-6 lg:px-8",
    md: "max-w-[768px] px-4 sm:px-6",
    full: "px-4 sm:px-6 lg:px-8",
  }[size];

  return (
    <div className={cn("mx-auto w-full", sizeClass, className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  bg = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "default" | "navy" | "surface" | "warm";
}) {
  const bgClass = {
    default: "bg-background",
    navy: "bg-navy text-white",
    surface: "bg-surface",
    warm: "bg-secondary/40",
  }[bg];

  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 lg:py-32 scroll-mt-20", bgClass, className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const accentClass = tone === "light" ? "text-indigo-400" : "text-accent";
  const barClass = tone === "light" ? "bg-indigo-400/60" : "bg-accent/60";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] font-sans",
        accentClass,
        className
      )}
    >
      <span className={cn("h-px w-6", barClass)} aria-hidden />
      {children}
    </span>
  );
}
