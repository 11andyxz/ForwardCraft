"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/types";
import { getIcon } from "@/lib/icons";

/** Desktop mega-menu panel content for a single nav item. */
export function MegaMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const columns = item.groups ?? [];
  const hasFeature = !!item.feature;

  return (
    <div className="container-page py-9">
      <div className={hasFeature ? "grid gap-10 lg:grid-cols-[1fr_19rem]" : ""}>
        <div
          className="grid gap-x-10 gap-y-7"
          style={{ gridTemplateColumns: `repeat(${Math.min(columns.length, 3)}, minmax(0, 1fr))` }}
        >
          {columns.map((group) => (
            <div key={group.heading ?? group.label} className="flex flex-col gap-3.5">
              {group.heading ? (
                <p className="eyebrow border-b border-line pb-2.5">{group.heading}</p>
              ) : null}
              <ul className="flex flex-col gap-0.5">
                {group.leaves.map((leaf) => {
                  const Icon = getIcon(leaf.icon);
                  return (
                    <li key={leaf.href}>
                      <Link
                        href={leaf.href}
                        onClick={onNavigate}
                        className="group flex items-start gap-3.5 rounded-lg px-3 py-2.5 transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface active:translate-y-px"
                      >
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink-muted transition-[color,background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-accent/30 group-hover:bg-accent-soft group-hover:text-accent">
                          <Icon className="size-4" strokeWidth={1.75} />
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-ink">{leaf.label}</span>
                          {leaf.description ? (
                            <span className="text-xs leading-snug text-ink-muted">{leaf.description}</span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {item.feature ? (
          <Link
            href={item.feature.href}
            onClick={onNavigate}
            className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl bg-night p-6 text-ink-inverse shadow-md transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-px"
          >
            <div aria-hidden className="ambient-accent pointer-events-none absolute inset-0" />
            <div aria-hidden className="grain absolute inset-0" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="eyebrow text-ink-inverse-muted">{item.feature.eyebrow}</span>
              <p className="text-lg font-medium leading-snug text-ink-inverse">{item.feature.title}</p>
              <p className="text-sm text-ink-inverse-muted">{item.feature.description}</p>
            </div>
            <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-inverse">
              {item.feature.cta}
              <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" strokeWidth={1.75} />
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
