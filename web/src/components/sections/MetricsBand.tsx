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
        "grid gap-px overflow-hidden rounded-lg border",
        dark ? "border-line-inverse bg-line-inverse" : "border-line bg-line",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {metrics.map((m, i) => (
        <Reveal
          key={m.label}
          delay={i * 0.05}
          className={cn("flex flex-col gap-1.5 p-6", dark ? "bg-night" : "bg-paper")}
        >
          <span className={cn("text-3xl font-medium tracking-tight md:text-4xl", dark ? "text-ink-inverse" : "text-ink")}>
            {m.countTo !== undefined ? (
              <CountUp to={m.countTo} prefix={m.prefix} suffix={m.suffix} />
            ) : (
              m.value
            )}
          </span>
          <span className={cn("text-sm", dark ? "text-ink-inverse-muted" : "text-ink-muted")}>{m.label}</span>
          {m.description ? (
            <span className={cn("text-xs", dark ? "text-ink-inverse-muted" : "text-ink-subtle")}>{m.description}</span>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}
