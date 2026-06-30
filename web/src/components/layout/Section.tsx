import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "paper" | "surface" | "dark";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  /** Vertical padding density. */
  size?: "sm" | "md" | "lg";
  /** When false, children are rendered without the inner Container. */
  contained?: boolean;
  id?: string;
  ariaLabel?: string;
}

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  dark: "relative overflow-hidden bg-night text-ink-inverse",
};

const sizeClass = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

/** Standard page section with consistent vertical rhythm and tonal bands. */
export function Section({
  children,
  className,
  tone = "paper",
  size = "md",
  contained = true,
  id,
  ariaLabel,
}: SectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(toneClass[tone], sizeClass[size], className)}
    >
      {isDark ? (
        <>
          {/* Depth for dark bands: soft ambient glow + film grain, behind content. */}
          <div className="ambient-accent grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
          <div className="relative z-10">
            {contained ? <Container>{children}</Container> : children}
          </div>
        </>
      ) : contained ? (
        <Container>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
