"use client";

import { motion, useReducedMotion } from "framer-motion";

interface StaggerTextProps {
  /** Lines rendered one after another with a staggered fade-up. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

/**
 * Renders text line-by-line with a staggered reveal — used for hero
 * headlines. Falls back to static lines under reduced-motion.
 */
export function StaggerText({ lines, className, lineClassName, delay = 0 }: StaggerTextProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={lineClassName} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            className={lineClassName}
            style={{ display: "block" }}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
