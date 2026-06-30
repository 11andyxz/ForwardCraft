import { cn } from "@/lib/utils";

/**
 * Deterministic, abstract company mark — used for client/partner logo walls.
 * No real brand assets: the mark is generated geometry plus a wordmark, so the
 * "logo wall" reads correctly without using anyone's actual logo.
 */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

interface MockLogoProps {
  name: string;
  seed?: string;
  className?: string;
  /** Render only the mark (no wordmark). */
  markOnly?: boolean;
}

export function MockLogo({ name, seed, className, markOnly = false }: MockLogoProps) {
  const h = hash(seed ?? name);
  const variant = h % 4;

  const mark = (
    <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden="true">
      {variant === 0 && (
        <>
          <circle cx="12" cy="16" r="9" fill="currentColor" opacity="0.85" />
          <circle cx="22" cy="16" r="9" fill="currentColor" opacity="0.45" />
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="4" y="6" width="13" height="20" rx="2" fill="currentColor" opacity="0.85" />
          <rect x="15" y="10" width="13" height="16" rx="2" fill="currentColor" opacity="0.45" />
        </>
      )}
      {variant === 2 && (
        <>
          <path d="M6 26 L16 6 L26 26 Z" fill="currentColor" opacity="0.85" />
          <circle cx="16" cy="20" r="5" fill="currentColor" opacity="0.45" />
        </>
      )}
      {variant === 3 && (
        <>
          <rect x="6" y="6" width="20" height="20" rx="10" fill="currentColor" opacity="0.3" />
          <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" />
        </>
      )}
    </svg>
  );

  if (markOnly) {
    return (
      <span
        className={cn(
          "text-ink-subtle transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent",
          className,
        )}
      >
        {mark}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "group inline-flex items-center gap-2.5 text-ink-subtle transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-ink",
        className,
      )}
    >
      {mark}
      <span className="font-mono text-sm font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-ink">
        {name}
      </span>
    </span>
  );
}
