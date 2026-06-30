import { Marquee } from "@/components/animations/Marquee";
import { MockLogo } from "@/components/ui/MockLogo";

interface LogoWallProps {
  items: { name: string; seed?: string }[];
  variant?: "marquee" | "grid";
}

/** Wall of abstract mock company marks (no real logos). */
export function LogoWall({ items, variant = "marquee" }: LogoWallProps) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="group flex items-center justify-center bg-paper px-6 py-9 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface"
          >
            <MockLogo
              name={item.name}
              seed={item.seed}
              className="text-ink-subtle opacity-75 transition-[opacity,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:text-ink-muted group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative [--fade:5rem] [mask-image:linear-gradient(to_right,transparent,#000_var(--fade),#000_calc(100%-var(--fade)),transparent)]">
      <Marquee>
        {items.map((item) => (
          <MockLogo key={item.name} name={item.name} seed={item.seed} className="opacity-70 transition-opacity duration-300 hover:opacity-100" />
        ))}
      </Marquee>
    </div>
  );
}
