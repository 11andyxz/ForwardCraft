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
    <div className="flex flex-col gap-5 rounded-xl border border-line bg-paper p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-mono text-2xs uppercase tracking-wider text-ink-subtle">{mod.name} · pipeline</span>
        <span className="flex items-center gap-1.5 text-2xs text-ink-muted">
          <span className="size-1.5 rounded-full bg-success" /> live
        </span>
      </div>

      {/* node flow */}
      <div className="flex flex-wrap items-center gap-2">
        {mod.diagram.nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <span className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink">
              {node}
            </span>
            {i < mod.diagram.nodes.length - 1 ? <ArrowRight className="size-3.5 text-ink-subtle" /> : null}
          </div>
        ))}
      </div>

      {/* metric chips */}
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
        {mod.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1 bg-paper p-3">
            <span className="text-lg font-medium text-ink">
              {m.countTo !== undefined ? <CountUp to={m.countTo} prefix={m.prefix} suffix={m.suffix} /> : m.value}
            </span>
            <span className="text-2xs leading-tight text-ink-muted">{m.label}</span>
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
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <span className="flex size-12 items-center justify-center rounded-lg bg-ink text-paper">
                <Icon className="size-6" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="eyebrow">{mod.kicker}</span>
                <h3 className="text-2xl font-medium tracking-tight text-ink">{mod.name}</h3>
              </div>
              <p className="text-base text-ink-muted">{mod.description}</p>
              <ul className="flex flex-col gap-2.5 pt-1">
                {mod.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {cap}
                  </li>
                ))}
              </ul>
              <Link
                href={mod.href}
                className="group inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-ink"
              >
                Explore {mod.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ModuleDashboard moduleId={mod.id} />
          </div>
        );
      }}
    </Tabs>
  );
}
