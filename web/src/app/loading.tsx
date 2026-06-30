import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

/** Global route loading skeleton. Mimics a hero band plus a content grid. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>

      {/* Hero-area skeleton */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
        <div className="container-page relative py-20 md:py-28">
          <div className="flex max-w-2xl flex-col gap-5">
            <Skeleton className="h-5 w-28 rounded-md" />
            <div className="flex flex-col gap-3 pt-1">
              <Skeleton className="h-11 w-4/5 rounded-lg" />
              <Skeleton className="h-11 w-1/2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2.5 pt-1">
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-2/3 rounded-sm" />
            </div>
            <div className="flex gap-3 pt-3">
              <Skeleton className="h-11 w-36 rounded-md" />
              <Skeleton className="h-11 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Content grid skeleton */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-page">
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <CardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
