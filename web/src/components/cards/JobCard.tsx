import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Job } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-line bg-surface/60 p-5 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper hover:shadow-md active:translate-y-px sm:flex-row sm:items-center sm:justify-between"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-accent opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{job.department}</Badge>
          {job.remote ? <Badge tone="accent">Remote</Badge> : null}
          <Badge tone="outline">{job.type}</Badge>
        </div>
        <h3 className="text-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent">{job.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-ink-muted">
          <MapPin className="size-3.5" strokeWidth={1.75} />
          {job.location}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
        View role
        <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
