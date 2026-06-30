"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "fc-cookie-consent";
const OPEN_EVENT = "open-cookie-preferences";

interface Prefs {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPrefs: Prefs = { necessary: true, analytics: true, marketing: false };

/** Button (used in the footer) that opens the cookie preferences modal. */
export function CookiePrefsButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn("text-left", className)}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {children}
    </button>
  );
}

/** Cookie banner + preferences modal. Consent persists to localStorage. */
export function CookieConsent() {
  const [decided, setDecided] = useState(true); // assume decided until we read storage
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Initialize from localStorage on mount (external store; unavailable during SSR).
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPrefs(JSON.parse(stored));
        setDecided(true);
      } else {
        setDecided(false);
      }
    } catch {
      setDecided(false);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    const onOpen = () => setModalOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Close modal on ESC.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModalOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  function persist(p: Prefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      /* ignore */
    }
    setPrefs(p);
    setDecided(true);
    setModalOpen(false);
  }

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {!decided ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[55] p-4"
            role="dialog"
            aria-label="Cookie consent"
          >
            <div className="container-page">
              <div className="flex flex-col gap-4 rounded-2xl border border-line-strong bg-paper/95 p-5 shadow-lg ring-1 ring-line backdrop-blur-sm md:flex-row md:items-center md:justify-between md:gap-8 md:p-6">
                <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
                  We use cookies to run the site and understand how it&apos;s used. You can accept all,
                  reject non-essential, or set preferences. (This is a mock banner — no cookies are set.)
                </p>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
                    Preferences
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => persist({ necessary: true, analytics: false, marketing: false })}
                  >
                    Reject non-essential
                  </Button>
                  <Button size="sm" onClick={() => persist({ necessary: true, analytics: true, marketing: true })}>
                    Accept all
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Preferences modal */}
      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
          >
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-line-strong bg-paper p-6 shadow-lg ring-1 ring-line"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <h2 className="text-xl font-medium text-ink">Cookie preferences</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                  className="-mr-1 -mt-1 rounded-md p-1.5 text-ink-muted transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface hover:text-ink active:scale-90"
                >
                  <X className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="flex flex-col divide-y divide-line rounded-lg border border-line bg-surface/40 px-4">
                {[
                  { key: "necessary" as const, label: "Strictly necessary", desc: "Required for the site to function.", locked: true },
                  { key: "analytics" as const, label: "Analytics", desc: "Helps us understand usage.", locked: false },
                  { key: "marketing" as const, label: "Marketing", desc: "Used to personalize content.", locked: false },
                ].map((row) => (
                  <label key={row.key} className="flex items-start justify-between gap-4 py-4">
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-ink">{row.label}</span>
                      <span className="text-xs text-ink-muted">{row.desc}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={prefs[row.key]}
                      disabled={row.locked}
                      onChange={(e) => setPrefs((p) => ({ ...p, [row.key]: e.target.checked }))}
                      className="mt-0.5 size-4 shrink-0 rounded-sm accent-accent transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] not-disabled:active:scale-90 disabled:opacity-50"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => persist({ necessary: true, analytics: false, marketing: false })}>
                  Reject non-essential
                </Button>
                <Button size="sm" onClick={() => persist(prefs)}>
                  Save preferences
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
