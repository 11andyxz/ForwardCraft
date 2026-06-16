"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Root error boundary. Must be a client component. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real build this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="container-page relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-lg border border-line bg-surface text-danger">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Something went wrong
          </h1>
          <p className="max-w-md text-ink-muted">
            We hit an unexpected error while loading this page. Sorry about that — you can try again,
            or head back to the homepage.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button onClick={() => reset()}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
            <Button href="/" variant="secondary">
              <Home className="size-4" aria-hidden="true" />
              Back to home
            </Button>
          </div>

          {error.digest ? (
            <p className="pt-2 font-mono text-xs text-ink-subtle">Error reference: {error.digest}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
