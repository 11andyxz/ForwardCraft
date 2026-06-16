"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Pause the scroll on hover. */
  pauseOnHover?: boolean;
}

/**
 * Seamless horizontal marquee. Duplicates its children so the loop is
 * continuous; CSS animation is disabled under prefers-reduced-motion.
 */
export function Marquee({ children, className, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", pauseOnHover && "marquee-paused", className)}>
      <div className="marquee-track flex w-max items-center gap-12 pr-12">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
