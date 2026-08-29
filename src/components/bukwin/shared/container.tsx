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
  const wrapClass =
    tone === "light"
      ? "border-indigo-400/30 bg-indigo-400/10 text-indigo-400"
      : "border-accent/20 bg-accent/5 text-accent";
  const dotClass = tone === "light" ? "bg-indigo-400" : "bg-accent";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] uppercase",
        wrapClass,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotClass)} aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const titleClass = tone === "light" ? "text-white" : "text-primary";
  const descClass = tone === "light" ? "text-white/60" : "text-muted-foreground";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-5 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em]",
          titleClass
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base md:text-lg leading-relaxed", descClass)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
