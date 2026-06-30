"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { MockLogo } from "@/components/ui/MockLogo";
import { cn } from "@/lib/utils";

/** Auto-advancing testimonial carousel with manual controls. */
export function TestimonialCarousel({ testimonials, tone = "light" }: { testimonials: Testimonial[]; tone?: "light" | "dark" }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  const count = testimonials.length;

  useEffect(() => {
    if (reduce || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [reduce, count]);

  const active = testimonials[index];

  return (
    <div className="flex flex-col gap-8">
      <Quote
        className={cn("size-9", dark ? "text-line-inverse" : "text-line-strong")}
        strokeWidth={1.5}
      />
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <p className={cn("font-display text-2xl leading-snug tracking-tight md:text-3xl", dark ? "text-ink-inverse" : "text-ink")}>
              “{active.quote}”
            </p>
            <footer className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("h-8 w-px", dark ? "bg-line-inverse" : "bg-line-strong")}
                />
                <span className="flex flex-col">
                  <cite className={cn("not-italic text-sm font-medium", dark ? "text-ink-inverse" : "text-ink")}>
                    {active.authorName}
                  </cite>
                  <span className={cn("text-sm", dark ? "text-ink-inverse-muted" : "text-ink-muted")}>
                    {active.authorTitle}, {active.company}
                  </span>
                </span>
              </div>
              <MockLogo name={active.company} seed={active.logoId} className={dark ? "text-ink-inverse-muted" : ""} />
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.92]",
                  i === index ? "w-7" : "w-1.5",
                  dark
                    ? i === index ? "bg-signal" : "bg-line-inverse hover:bg-ink-inverse-muted"
                    : i === index ? "bg-accent" : "bg-line-strong hover:bg-ink-subtle",
                )}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-1.5">
            <button
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              aria-label="Previous"
              className={cn(
                "flex size-10 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.95]",
                dark
                  ? "border-line-inverse text-ink-inverse-muted hover:border-ink-inverse-muted hover:text-ink-inverse hover:bg-night-2"
                  : "border-line-strong text-ink-muted hover:border-ink-subtle hover:text-ink hover:bg-surface",
              )}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % count)}
              aria-label="Next"
              className={cn(
                "flex size-10 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.95]",
                dark
                  ? "border-line-inverse text-ink-inverse-muted hover:border-ink-inverse-muted hover:text-ink-inverse hover:bg-night-2"
                  : "border-line-strong text-ink-muted hover:border-ink-subtle hover:text-ink hover:bg-surface",
              )}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
