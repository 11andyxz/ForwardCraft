import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { EventItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
      <div className="flex items-center justify-between">
        <Badge tone="neutral">{event.type}</Badge>
        <Badge tone={event.mode === "Virtual" ? "accent" : "outline"}>{event.mode}</Badge>
      </div>
      <h3 className="text-lg font-medium leading-snug text-ink">{event.title}</h3>
      <p className="text-sm text-ink-muted">{event.summary}</p>
      <div className="flex flex-col gap-2 text-sm text-ink-muted">
        <span className="flex items-center gap-2.5">
          <Calendar className="size-4 shrink-0 text-ink-subtle" strokeWidth={1.75} />
          <time dateTime={event.date} className="nums-tabular">{formatDate(event.date)}</time>
        </span>
        <span className="flex items-center gap-2.5">
          <MapPin className="size-4 shrink-0 text-ink-subtle" strokeWidth={1.75} />
          {event.location}
        </span>
      </div>
      <Link
        href={event.registerHref}
        className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent active:translate-y-px"
      >
        Register
        <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
