import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** ForwardCraft wordmark — an original geometric mark plus the brand name. */
export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99]",
        className,
      )}
    >
      <svg
        viewBox="0 0 28 28"
        className="size-7 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        aria-hidden="true"
      >
        <rect
          width="28"
          height="28"
          rx="8"
          className={invert ? "fill-paper" : "fill-ink"}
        />
        <path
          d="M8 9.5h10M8 14h7M8 18.5h10"
          className={invert ? "stroke-ink" : "stroke-paper"}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M19.5 12.5l3 3-3 3"
          className="stroke-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
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
