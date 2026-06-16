import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Visual size of the title. */
  size?: "md" | "lg";
  /** Use white-on-dark coloring for dark sections. */
  invert?: boolean;
}

/** Eyebrow + title + intro block used to open most sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  size = "md",
  invert = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn("eyebrow", invert && "text-ink-inverse-muted")}>{eyebrow}</span>
      ) : null}
      <h2
        className={cn(
          "font-medium tracking-tight",
          size === "lg" ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl",
          invert ? "text-ink-inverse" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn("text-base leading-relaxed", invert ? "text-ink-inverse-muted" : "text-ink-muted")}>
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
