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
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong px-6 py-20 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-surface text-ink-subtle">
        <SearchX className="size-6" />
      </div>
      <h3 className="text-lg font-medium text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink-muted">{message}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
