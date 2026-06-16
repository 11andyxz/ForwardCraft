import type { WorkflowStep } from "@/types";
import { Reveal } from "@/components/animations/Reveal";

/** Numbered delivery/process steps — horizontal on desktop, stacked on mobile. */
export function WorkflowSteps({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.step} delay={i * 0.06} className="flex flex-col gap-3 bg-paper p-6">
          <span className="font-mono text-xs text-ink-subtle">
            {String(step.step).padStart(2, "0")}
          </span>
          <span className="text-base font-medium text-ink">{step.title}</span>
          <span className="text-sm text-ink-muted">{step.description}</span>
        </Reveal>
      ))}
    </ol>
  );
}
