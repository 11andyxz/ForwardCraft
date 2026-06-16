import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "success" | "outline" | "inverse";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-ink",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  outline: "border border-line-strong text-ink-muted",
  inverse: "bg-night-3 text-ink-inverse",
};

/** Small status/label pill. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
