"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

type TextRevealProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
};

export function TextReveal({
  text,
  className,
  wordClassName,
  as = "h2",
  once = true,
}: TextRevealProps) {
  const MotionTag = motion[as];
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      style={{ perspective: 1000 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          className={`inline-block ${wordClassName ?? ""}`}
          style={{ transformOrigin: "bottom" }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
