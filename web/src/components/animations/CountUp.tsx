"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places to display. Inferred from `to` when omitted. */
  decimals?: number;
  durationMs?: number;
  className?: string;
}

/** Animated number that counts up once when scrolled into view. */
export function CountUp({ to, prefix = "", suffix = "", decimals, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const places = decimals ?? (Number.isInteger(to) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // Reduced motion: skip the animation and show the final value immediately.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / durationMs, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(to * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, durationMs]);

  const display = value.toLocaleString("en-US", {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
