import type { WorkflowStep } from "@/types";
import { Reveal } from "@/components/animations/Reveal";

/** Numbered delivery/process steps — horizontal on desktop, stacked on mobile. */
export function WorkflowSteps({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line shadow-sm md:grid-cols-5">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.step} delay={i * 0.06} className="group relative flex flex-col gap-3 bg-paper p-6 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface">
          <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          <span className="nums-tabular font-mono text-sm font-medium tracking-tight text-accent">
            {String(step.step).padStart(2, "0")}
          </span>
          <span className="text-base font-medium text-ink">{step.title}</span>
          <span className="text-sm text-ink-muted">{step.description}</span>
        </Reveal>
      ))}
    </ol>
  );
}
