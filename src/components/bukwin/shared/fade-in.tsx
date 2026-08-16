"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
};

const buildVariants = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.4, 0, 0.2, 1],
    },
  },
});

export function FadeIn({
  children,
  delay = 0,
  y = 30,
  duration = 0.6,
  once = true,
  className,
  as = "div",
}: FadeInProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={buildVariants(y, duration, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  once = true,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
