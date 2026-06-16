import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/types";
import { getIcon } from "@/lib/icons";

export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = getIcon(industry.icon);
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group relative flex flex-col gap-3 rounded-lg border border-line bg-paper p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-lg bg-surface text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">{industry.name}</h3>
      <p className="line-clamp-2 text-sm text-ink-muted">{industry.tagline}</p>
    </Link>
  );
}
