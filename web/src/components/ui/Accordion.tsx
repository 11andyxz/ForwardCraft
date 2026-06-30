"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once. */
  multiple?: boolean;
  /** Item id open by default. */
  defaultOpen?: string;
  className?: string;
}

/** Accessible accordion (FAQ + mobile menus). Animated, reduced-motion safe. */
export function Accordion({ items, multiple = false, defaultOpen, className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen ? [defaultOpen] : []);
  const baseId = useId();
  const reduce = useReducedMotion();

  function toggle(id: string) {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (multiple) return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      return isOpen ? [] : [id];
    });
  }

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                id={`${baseId}-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-content-${item.id}`}
                onClick={() => toggle(item.id)}
                className="group/trigger -mx-4 flex w-[calc(100%+2rem)] items-center justify-between gap-4 rounded-lg px-4 py-5 text-left transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface active:scale-[0.997]"
              >
                <span
                  className={cn(
                    "text-base font-medium transition-colors duration-200",
                    isOpen ? "text-ink" : "text-ink group-hover/trigger:text-accent",
                  )}
                >
                  {item.trigger}
                </span>
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen
                      ? "border-transparent bg-accent text-paper"
                      : "border-line-strong text-ink-muted group-hover/trigger:border-accent group-hover/trigger:text-accent",
                  )}
                >
                  <Plus
                    className={cn(
                      "size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen && "rotate-45",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`${baseId}-content-${item.id}`}
                  role="region"
                  aria-labelledby={`${baseId}-trigger-${item.id}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-10 text-base leading-relaxed text-ink-muted">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
