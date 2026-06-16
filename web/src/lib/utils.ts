/**
 * Tiny classNames joiner. Keeps deps minimal — no clsx/tailwind-merge needed
 * for our usage. Filters falsy values and joins with a space.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** Format an ISO date string as e.g. "Mar 14, 2026". */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Rough reading-time estimate from a word count. */
export function readingTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** Slugify a string for ids/anchors. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Format a large number compactly, e.g. 30000 -> "30K". */
export function compactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
