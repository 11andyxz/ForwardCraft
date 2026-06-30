import type { Metric } from "@/types";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/animations/CountUp";
import { Reveal } from "@/components/animations/Reveal";

interface MetricsBandProps {
  metrics: Metric[];
  tone?: "light" | "dark";
  className?: string;
}

/** Row of headline metrics with count-up animation. */
export function MetricsBand({ metrics, tone = "light", className }: MetricsBandProps) {
  const dark = tone === "dark";
  const cols = Math.min(metrics.length, 4);
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border",
        dark ? "border-line-inverse bg-line-inverse" : "border-line bg-line",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {metrics.map((m, i) => (
        <Reveal
          key={m.label}
          delay={i * 0.05}
          className={cn(
            "group relative flex flex-col gap-2 p-6 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-7",
            dark ? "bg-night hover:bg-night-2" : "bg-paper hover:bg-surface",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
          <span
            className={cn(
              "nums-tabular font-mono text-3xl font-medium tracking-tight md:text-4xl",
              dark ? "text-ink-inverse" : "text-ink",
            )}
          >
            {m.countTo !== undefined ? (
              <CountUp to={m.countTo} prefix={m.prefix} suffix={m.suffix} />
            ) : (
              m.value
            )}
          </span>
          <span className={cn("text-sm font-medium", dark ? "text-ink-inverse-muted" : "text-ink-muted")}>{m.label}</span>
          {m.description ? (
            <span className={cn("text-xs leading-relaxed", dark ? "text-ink-inverse-muted" : "text-ink-subtle")}>{m.description}</span>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}
