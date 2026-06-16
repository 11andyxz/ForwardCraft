"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay before animating in. */
  delay?: number;
  /** Vertical offset to animate from (px). */
  y?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "span" | "article" | "p" | "figure" | "ul" | "ol" | "blockquote" | "aside";
}

/**
 * Scroll-reveal wrapper. Fades + lifts content into view once. Honors
 * prefers-reduced-motion by rendering content statically.
 */
export function Reveal({ children, delay = 0, y = 16, className, id, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
