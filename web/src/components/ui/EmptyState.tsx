import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

/** Shown when a filtered/searched list has no results. */
export function EmptyState({
  title = "No results found",
  message = "Try adjusting your search or filters.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-line-strong bg-surface/40 px-6 py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent shadow-sm ring-1 ring-line">
        <SearchX className="size-6" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-medium text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink-muted">{message}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
