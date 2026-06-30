import { cn } from "@/lib/utils";

/**
 * Deterministic abstract cover art — stands in for photography/illustration
 * without any external assets. Picks a generative pattern from a string seed
 * so each card/article gets a stable, distinct (monochrome) graphic.
 */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

interface CoverArtProps {
  seed: string;
  className?: string;
  tone?: "light" | "dark";
  /** Show a faint accent element. */
  accent?: boolean;
}

export function CoverArt({ seed, className, tone = "light", accent = true }: CoverArtProps) {
  const h = hash(seed);
  const variant = h % 5;
  const rng = (n: number) => (hash(seed + n) % 1000) / 1000;

  // Palette mapped to the design tokens (warm neutrals + ultramarine accent).
  const fg = tone === "dark" ? "#f7f5ec" : "#181712";
  const bg = tone === "dark" ? "#15140f" : "#f2f0e8";
  const line = tone === "dark" ? "#322f24" : "#cfccbd";
  const accentColor = "#2438c9";
  const signalColor = "#cbdc4a";

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: bg }} aria-hidden="true">
      <svg viewBox="0 0 400 250" className="size-full" preserveAspectRatio="xMidYMid slice">
        {/* base grid */}
        <defs>
          <pattern id={`grid-${h}`} width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M25 0H0V25" fill="none" stroke={line} strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="400" height="250" fill={`url(#grid-${h})`} opacity="0.6" />

        {variant === 0 && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <circle
                key={i}
                cx={60 + i * 55}
                cy={125 + Math.sin(i + rng(i) * 3) * 50}
                r={6 + rng(i) * 10}
                fill={i === 4 && accent ? signalColor : "none"}
                stroke={i === 2 && accent ? accentColor : fg}
                strokeWidth="1.5"
                opacity={0.5 + rng(i) * 0.4}
              />
            ))}
            <path
              d="M40 160 C120 90, 180 200, 360 100"
              fill="none"
              stroke={accent ? accentColor : fg}
              strokeWidth="1.5"
            />
          </>
        )}

        {variant === 1 && (
          <>
            {Array.from({ length: 7 }).map((_, i) => {
              const x = 50 + i * 48;
              const barH = 30 + rng(i) * 130;
              return (
                <rect
                  key={i}
                  x={x}
                  y={210 - barH}
                  width="22"
                  height={barH}
                  fill={i === 4 && accent ? accentColor : fg}
                  opacity={0.25 + rng(i) * 0.5}
                />
              );
            })}
          </>
        )}

        {variant === 2 && (
          <>
            {Array.from({ length: 5 }).map((_, i) =>
              Array.from({ length: 3 }).map((_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={80 + i * 60}
                  cy={70 + j * 55}
                  r="3.5"
                  fill={i === 2 && j === 1 && accent ? signalColor : fg}
                  opacity={i === 2 && j === 1 && accent ? 0.9 : 0.5}
                />
              )),
            )}
            <path d="M80 70 L140 125 L200 70 L260 180 L320 125" fill="none" stroke={accent ? accentColor : fg} strokeWidth="1.5" />
          </>
        )}

        {variant === 3 && (
          <>
            <polygon points="200,40 330,125 200,210 70,125" fill="none" stroke={fg} strokeWidth="1.5" opacity="0.5" />
            <polygon points="200,75 295,125 200,175 105,125" fill="none" stroke={fg} strokeWidth="1.25" opacity="0.4" />
            <circle cx="200" cy="125" r="10" fill={accent ? accentColor : fg} />
          </>
        )}

        {variant === 4 && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${70 + i * 28} C100 ${40 + i * 28 + rng(i) * 30}, 300 ${110 + i * 18 - rng(i) * 30}, 400 ${70 + i * 26}`}
                fill="none"
                stroke={i === 2 && accent ? accentColor : fg}
                strokeWidth="1.25"
                opacity={0.3 + i * 0.12}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
