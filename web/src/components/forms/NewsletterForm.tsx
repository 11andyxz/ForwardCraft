"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Newsletter signup with simulated async submit. No backend — resolves a
 * Promise after a delay and surfaces success/error states.
 */
export function NewsletterForm({ invert = false, className }: { invert?: boolean; className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    // Simulate a rare failure path for demonstration.
    if (email.endsWith("@error.test")) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-lg border px-4 py-3.5 text-sm shadow-sm",
          invert ? "border-line-inverse bg-night-2 text-ink-inverse" : "border-line bg-surface text-ink",
          className,
        )}
        role="status"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
          <Check className="size-4" strokeWidth={2.25} />
        </span>
        You&apos;re subscribed. Watch your inbox for the next issue.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-2", className)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@company.com"
          aria-invalid={status === "error"}
          className={cn(
            "h-11 flex-1 rounded-md border px-3.5 text-sm transition-[color,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1",
            status === "error"
              ? "border-danger"
              : invert
              ? "border-line-inverse bg-night-2 text-ink-inverse placeholder:text-ink-inverse-muted hover:border-ink-inverse-muted"
              : "border-line-strong bg-paper text-ink placeholder:text-ink-subtle hover:border-ink-subtle",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "group inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium shadow-sm transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
            invert ? "bg-paper text-ink hover:bg-surface" : "bg-ink text-paper hover:bg-night-2",
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Subscribing…
            </>
          ) : (
            <>
              Subscribe{" "}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
      {error ? (
        <p className="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <AlertCircle className="size-3.5 shrink-0" strokeWidth={2.25} />
          {error}
        </p>
      ) : (
        <p
          className={cn(
            "text-xs",
            invert ? "text-ink-inverse-muted" : "text-ink-subtle",
          )}
        >
          Join 30,000+ operators. No spam — unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
