import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Job } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-line bg-paper p-5 transition-all duration-300 hover:border-line-strong hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{job.department}</Badge>
          {job.remote ? <Badge tone="accent">Remote</Badge> : null}
          <Badge tone="outline">{job.type}</Badge>
        </div>
        <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">{job.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-ink-muted">
          <MapPin className="size-3.5" />
          {job.location}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink">
        View role
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
