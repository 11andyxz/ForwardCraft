import type { Capability } from "@/types";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/animations/Reveal";

/** Grid of capabilities with icon, title, description. */
export function CapabilityGrid({ capabilities, columns = 2 }: { capabilities: Capability[]; columns?: 2 | 3 }) {
  return (
    <div
      className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
      style={{ gridTemplateColumns: undefined }}
      data-columns={columns}
    >
      {capabilities.map((cap, i) => {
        const Icon = getIcon(cap.icon);
        return (
          <Reveal key={cap.title} delay={i * 0.05} className="group flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-sm transition-[background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col gap-1.5 pt-0.5">
              <h3 className="text-base font-medium text-ink">{cap.title}</h3>
              <p className="text-sm text-ink-muted">{cap.description}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
