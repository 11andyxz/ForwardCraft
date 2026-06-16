import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { EventItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-paper p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md">
      <div className="flex items-center justify-between">
        <Badge tone="neutral">{event.type}</Badge>
        <Badge tone={event.mode === "Virtual" ? "accent" : "outline"}>{event.mode}</Badge>
      </div>
      <h3 className="text-lg font-medium leading-snug text-ink">{event.title}</h3>
      <p className="text-sm text-ink-muted">{event.summary}</p>
      <div className="flex flex-col gap-1.5 text-sm text-ink-muted">
        <span className="flex items-center gap-2">
          <Calendar className="size-4 text-ink-subtle" />
          <time dateTime={event.date}>{formatDate(event.date)}</time>
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="size-4 text-ink-subtle" />
          {event.location}
        </span>
      </div>
      <Link
        href={event.registerHref}
        className="group mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-ink"
      >
        Register
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
