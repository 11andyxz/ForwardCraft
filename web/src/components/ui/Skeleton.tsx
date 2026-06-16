import { cn } from "@/lib/utils";

/** Shimmering placeholder block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface-2",
        className,
      )}
      aria-hidden="true"
    />
  );
}

/** A card-shaped skeleton matching the content card grid. */
export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line p-5">
      <Skeleton className="aspect-[16/10] w-full" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
