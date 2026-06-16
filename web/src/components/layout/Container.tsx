import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width content wrapper with responsive gutters. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}
