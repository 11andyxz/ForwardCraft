"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number; // 1-based
  pageCount: number;
  onPageChange: (page: number) => void;
}

/** Numbered pagination with prev/next and truncation for long ranges. */
export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const btn =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors";

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        className={cn(btn, "text-ink-muted hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent")}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-ink-subtle">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              btn,
              p === page ? "bg-ink text-paper" : "text-ink-muted hover:bg-surface",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        className={cn(btn, "text-ink-muted hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent")}
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
