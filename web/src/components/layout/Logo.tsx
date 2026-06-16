import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** ForwardCraft wordmark — an original geometric mark plus the brand name. */
export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <rect width="28" height="28" rx="7" className={invert ? "fill-paper" : "fill-ink"} />
        <path
          d="M8 9.5h10M8 14h7M8 18.5h10"
          className={invert ? "stroke-ink" : "stroke-paper"}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M19.5 12.5l3 3-3 3"
          className="stroke-accent"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className={cn(
          "text-base font-semibold tracking-tight",
          invert ? "text-ink-inverse" : "text-ink",
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
