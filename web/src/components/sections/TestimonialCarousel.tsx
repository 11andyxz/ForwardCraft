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
      <Quote className={cn("size-8", dark ? "text-ink-inverse-muted" : "text-ink-subtle")} />
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className={cn("text-xl font-medium leading-snug tracking-tight md:text-2xl", dark ? "text-ink-inverse" : "text-ink")}>
              “{active.quote}”
            </p>
            <footer className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <cite className={cn("not-italic text-sm font-medium", dark ? "text-ink-inverse" : "text-ink")}>
                  {active.authorName}
                </cite>
                <span className={cn("text-sm", dark ? "text-ink-inverse-muted" : "text-ink-muted")}>
                  {active.authorTitle}, {active.company}
                </span>
              </div>
              <MockLogo name={active.company} seed={active.logoId} className={dark ? "text-ink-inverse-muted" : ""} />
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-6" : "w-1.5",
                  dark
                    ? i === index ? "bg-ink-inverse" : "bg-line-inverse"
                    : i === index ? "bg-ink" : "bg-line-strong",
                )}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-1">
            <button
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              aria-label="Previous"
              className={cn("flex size-9 items-center justify-center rounded-md border transition-colors", dark ? "border-line-inverse text-ink-inverse-muted hover:text-ink-inverse" : "border-line text-ink-muted hover:text-ink")}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % count)}
              aria-label="Next"
              className={cn("flex size-9 items-center justify-center rounded-md border transition-colors", dark ? "border-line-inverse text-ink-inverse-muted hover:text-ink-inverse" : "border-line text-ink-muted hover:text-ink")}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
