"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Abstract "agents in production" schematic — original generative SVG, not a
 * stock illustration. A data layer feeds an agent core that drives governed
 * actions, with animated signal pulses along the connectors.
 */
export function HeroGraphic() {
  const reduce = useReducedMotion();

  const nodes = [
    { x: 60, y: 60, label: "Data" },
    { x: 60, y: 130, label: "Docs" },
    { x: 60, y: 200, label: "Events" },
  ];
  const actions = [
    { x: 400, y: 70 },
    { x: 400, y: 130 },
    { x: 400, y: 190 },
  ];

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 460 260" className="w-full" role="img" aria-label="Schematic of data feeding AI agents that take governed actions">
        {/* connectors: sources -> core */}
        {nodes.map((n, i) => (
          <path
            key={`in-${i}`}
            d={`M${n.x + 44} ${n.y} C 160 ${n.y}, 170 130, 210 130`}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />
        ))}
        {/* connectors: core -> actions */}
        {actions.map((a, i) => (
          <path
            key={`out-${i}`}
            d={`M250 130 C 300 130, 300 ${a.y}, ${a.x - 16} ${a.y}`}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />
        ))}

        {/* animated pulses */}
        {!reduce &&
          nodes.map((n, i) => (
            <motion.circle
              key={`pulse-in-${i}`}
              r="3"
              fill="var(--color-accent)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
              style={{ offsetPath: `path("M${n.x + 44} ${n.y} C 160 ${n.y}, 170 130, 210 130")` } as React.CSSProperties}
            />
          ))}
        {!reduce &&
          actions.map((a, i) => (
            <motion.circle
              key={`pulse-out-${i}`}
              r="3"
              fill="var(--color-accent)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 + i * 0.6, ease: "easeInOut" }}
              style={{ offsetPath: `path("M250 130 C 300 130, 300 ${a.y}, ${a.x - 16} ${a.y}")` } as React.CSSProperties}
            />
          ))}

        {/* source nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x - 44} y={n.y - 16} width="88" height="32" rx="8" fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth="1.5" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-ink" fontSize="11" fontFamily="var(--font-mono)">
              {n.label}
            </text>
          </g>
        ))}

        {/* agent core */}
        <rect x="206" y="98" width="48" height="64" rx="12" fill="var(--color-night)" />
        <text x="230" y="126" textAnchor="middle" fill="var(--color-ink-inverse)" fontSize="10" fontFamily="var(--font-mono)">
          AGENT
        </text>
        <text x="230" y="140" textAnchor="middle" fill="var(--color-ink-inverse-muted)" fontSize="9" fontFamily="var(--font-mono)">
          CORE
        </text>
        {!reduce ? (
          <motion.rect
            x="206"
            y="98"
            width="48"
            height="64"
            rx="12"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        {/* action nodes */}
        {actions.map((a, i) => (
          <g key={`act-${i}`}>
            <circle cx={a.x} cy={a.y} r="14" fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="1.5" />
            <circle cx={a.x} cy={a.y} r="4" fill="var(--color-night)" />
          </g>
        ))}
        <text x="400" y="232" textAnchor="middle" className="fill-ink-subtle" fontSize="10" fontFamily="var(--font-mono)">
          ACTIONS
        </text>
      </svg>
    </div>
  );
}
