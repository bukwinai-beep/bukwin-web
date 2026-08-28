"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const bukwinButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-[0.02em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-[#4338CA] hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]",
        secondary:
          "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost:
          "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
        lightGhost:
          "bg-transparent border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40",
        solid:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
        link: "bg-transparent text-accent hover:text-[#4338CA] hover:underline underline-offset-4 p-0 h-auto",
      },
      size: {
        sm: "text-[13px] px-4 py-2 rounded-md",
        md: "text-sm px-6 py-3 rounded-md",
        lg: "text-sm md:text-base px-8 py-3.5 rounded-md",
        xl: "text-base md:text-lg px-10 py-4 rounded-md",
        icon: "p-2 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BukwinButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bukwinButtonVariants> {
  asChild?: boolean;
}

export const BukwinButton = forwardRef<HTMLButtonElement, BukwinButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          bukwinButtonVariants({ variant, size }),
          props.disabled && "opacity-50 pointer-events-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
BukwinButton.displayName = "BukwinButton";
