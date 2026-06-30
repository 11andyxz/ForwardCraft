"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  children: (activeId: string) => ReactNode;
  className?: string;
  /** Visual style of the tab strip. */
  variant?: "underline" | "pill";
  ariaLabel?: string;
}

/** Accessible tabs with roving focus (arrow keys) and an animated indicator. */
export function Tabs({ tabs, children, className, variant = "underline", ariaLabel = "Tabs" }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);
  const baseId = useId();
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "flex gap-1 overflow-x-auto no-scrollbar",
          variant === "underline" ? "border-b border-line" : "rounded-lg border border-line bg-surface p-1",
        )}
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative shrink-0 rounded-md px-4 py-2.5 text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px",
                variant === "underline"
                  ? selected
                    ? "text-ink"
                    : "text-ink-muted hover:bg-surface hover:text-ink"
                  : selected
                    ? "bg-paper text-ink shadow-sm"
                    : "text-ink-muted hover:text-ink",
              )}
            >
              {tab.label}
              {variant === "underline" && selected ? (
                reduce ? (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" />
                ) : (
                  <motion.span
                    layoutId={`${baseId}-indicator`}
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent"
                  />
                )
              ) : null}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-8"
      >
        {children(active)}
      </div>
    </div>
  );
}
