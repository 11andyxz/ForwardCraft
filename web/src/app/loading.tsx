import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

/** Global route loading skeleton. Mimics a hero band plus a content grid. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>

      {/* Hero-area skeleton */}
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="flex max-w-2xl flex-col gap-5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-11 w-36" />
              <Skeleton className="h-11 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Content grid skeleton */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
