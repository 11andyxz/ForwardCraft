"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import type { NavItem } from "@/types";
import { getIcon } from "@/lib/icons";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

/** Full-screen mobile navigation with accordion submenus. */
export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Lock body scroll + close on ESC while open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-md p-2 text-ink hover:bg-surface"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col">
              {items.map((item) => {
                const isOpen = expanded === item.label;
                if (!item.groups) {
                  return (
                    <li key={item.label} className="border-b border-line">
                      <Link
                        href={item.href ?? "#"}
                        onClick={onClose}
                        className="flex items-center py-4 text-lg font-medium text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.label} className="border-b border-line">
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-lg font-medium text-ink"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-5 text-ink-muted transition-transform", isOpen && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-5 pb-5">
                            {item.groups.map((group) => (
                              <div key={group.heading ?? group.label}>
                                {group.heading ? (
                                  <p className="eyebrow mb-2">{group.heading}</p>
                                ) : null}
                                <ul className="flex flex-col">
                                  {group.leaves.map((leaf) => {
                                    const Icon = getIcon(leaf.icon);
                                    return (
                                      <li key={leaf.href}>
                                        <Link
                                          href={leaf.href}
                                          onClick={onClose}
                                          className="flex items-center gap-3 py-2.5 text-base text-ink-muted"
                                        >
                                          <Icon className="size-4 text-ink-subtle" />
                                          {leaf.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 border-t border-line px-5 py-5">
            <Button href="/ai-training/expert-network" variant="secondary" size="lg" className="w-full" onClick={onClose}>
              Expert network
            </Button>
            <Button href="/contact" size="lg" className="w-full" withArrow onClick={onClose}>
              Book a demo
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
