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
      className="group flex flex-col gap-4 rounded-lg border border-line bg-paper p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-lg bg-surface text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
          <Icon className="size-5" />
        </span>
        <Badge tone="outline">{solution.category}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">{solution.name}</h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{solution.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-ink">
        Explore
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
