import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types";
import { getIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/Badge";

export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = getIcon(solution.icon);
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-line bg-surface/60 p-6 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper hover:shadow-md active:translate-y-px"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-lg bg-paper text-ink shadow-sm transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-ink group-hover:text-paper">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <Badge tone="outline">{solution.category}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent">{solution.name}</h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{solution.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
        Explore
        <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
