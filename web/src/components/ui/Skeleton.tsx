import { cn } from "@/lib/utils";

/** Shimmering placeholder block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-[fc-shimmer_1.6s_linear_infinite] rounded-md bg-gradient-to-r from-surface-2 via-surface to-surface-2 bg-[length:200%_100%]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

/** A card-shaped skeleton matching the content card grid. */
export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface/50 p-5">
      <Skeleton className="aspect-[16/10] w-full rounded-lg" />
      <Skeleton className="h-3 w-20 rounded-sm" />
      <Skeleton className="h-5 w-3/4 rounded-sm" />
      <Skeleton className="h-3 w-full rounded-sm" />
      <Skeleton className="h-3 w-2/3 rounded-sm" />
    </div>
  );
}
