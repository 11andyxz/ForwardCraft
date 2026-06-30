import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/types";
import { getIcon } from "@/lib/icons";

export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = getIcon(industry.icon);
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-line bg-surface/60 p-6 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper hover:shadow-md active:translate-y-px"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-lg bg-paper text-ink shadow-sm transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-ink group-hover:text-paper">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <ArrowUpRight className="size-4 text-ink-subtle transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>
      <h3 className="mt-1 text-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent">{industry.name}</h3>
      <p className="line-clamp-2 text-sm text-ink-muted">{industry.tagline}</p>
    </Link>
  );
}
