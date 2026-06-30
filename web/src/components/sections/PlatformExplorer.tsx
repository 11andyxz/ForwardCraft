"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { platformModules } from "@/data/mock/platform";
import { getIcon } from "@/lib/icons";
import { Tabs } from "@/components/ui/Tabs";
import { CountUp } from "@/components/animations/CountUp";

/** Mock "dashboard" — a workflow node flow plus metric chips for a module. */
function ModuleDashboard({ moduleId }: { moduleId: string }) {
  const mod = platformModules.find((m) => m.id === moduleId)!;
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/60 p-6 shadow-md ring-1 ring-line/40 lg:mt-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <span className="font-mono text-2xs uppercase tracking-[0.18em] text-ink-subtle">{mod.name} · pipeline</span>
        <span className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.1em] text-ink-muted">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          live
        </span>
      </div>

      {/* node flow */}
      <div className="flex flex-wrap items-center gap-2">
        {mod.diagram.nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <span className="rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink shadow-sm">
              {node}
            </span>
            {i < mod.diagram.nodes.length - 1 ? <ArrowRight className="size-3.5 shrink-0 text-accent/60" /> : null}
          </div>
        ))}
      </div>

      {/* metric chips */}
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
        {mod.metrics.map((m, i) => (
          <div key={m.label} className="group/metric relative flex flex-col gap-1.5 bg-paper p-4 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface">
            {i === 0 ? <span className="absolute inset-x-0 top-0 h-px bg-signal" /> : null}
            <span className="nums-tabular text-xl font-medium tracking-tight text-ink">
              {m.countTo !== undefined ? <CountUp to={m.countTo} prefix={m.prefix} suffix={m.suffix} /> : m.value}
            </span>
            <span className="text-2xs uppercase leading-tight tracking-wide text-ink-muted">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlatformExplorer() {
  return (
    <Tabs
      tabs={platformModules.map((m) => ({ id: m.id, label: m.name }))}
      ariaLabel="Platform modules"
    >
      {(activeId) => {
        const mod = platformModules.find((m) => m.id === activeId)!;
        const Icon = getIcon(mod.icon);
        return (
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="flex flex-col gap-5">
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-ink-inverse shadow-accent">
                <Icon className="size-6" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow">{mod.kicker}</span>
                <h3 className="text-2xl font-medium tracking-tight text-ink">{mod.name}</h3>
              </div>
              <p className="text-base text-ink-muted">{mod.description}</p>
              <ul className="flex flex-col gap-3 border-t border-line pt-5">
                {mod.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check className="size-3.5" strokeWidth={2.25} />
                    </span>
                    {cap}
                  </li>
                ))}
              </ul>
              <Link
                href={mod.href}
                className="group inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-medium text-ink transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent"
              >
                Explore {mod.name}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ModuleDashboard moduleId={mod.id} />
          </div>
        );
      }}
    </Tabs>
  );
}
