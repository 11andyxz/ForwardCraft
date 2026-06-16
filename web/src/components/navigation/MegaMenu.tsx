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
    <div className="container-page py-8">
      <div className={hasFeature ? "grid gap-8 lg:grid-cols-[1fr_18rem]" : ""}>
        <div
          className="grid gap-x-8 gap-y-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(columns.length, 3)}, minmax(0, 1fr))` }}
        >
          {columns.map((group) => (
            <div key={group.heading ?? group.label} className="flex flex-col gap-3">
              {group.heading ? (
                <p className="eyebrow">{group.heading}</p>
              ) : null}
              <ul className="flex flex-col gap-0.5">
                {group.leaves.map((leaf) => {
                  const Icon = getIcon(leaf.icon);
                  return (
                    <li key={leaf.href}>
                      <Link
                        href={leaf.href}
                        onClick={onNavigate}
                        className="group flex items-start gap-3 rounded-md px-3 py-2 transition-colors hover:bg-surface"
                      >
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-paper text-ink-muted transition-colors group-hover:border-line-strong group-hover:text-ink">
                          <Icon className="size-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-medium text-ink">{leaf.label}</span>
                          {leaf.description ? (
                            <span className="text-xs text-ink-muted">{leaf.description}</span>
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
            className="group flex flex-col justify-between gap-6 rounded-lg bg-night p-6 text-ink-inverse"
          >
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-ink-inverse-muted">{item.feature.eyebrow}</span>
              <p className="text-lg font-medium leading-snug text-ink-inverse">{item.feature.title}</p>
              <p className="text-sm text-ink-inverse-muted">{item.feature.description}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-inverse">
              {item.feature.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
