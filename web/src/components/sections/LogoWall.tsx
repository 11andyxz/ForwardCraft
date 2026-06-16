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
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-center bg-paper px-6 py-8">
            <MockLogo name={item.name} seed={item.seed} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Marquee>
      {items.map((item) => (
        <MockLogo key={item.name} name={item.name} seed={item.seed} className="opacity-70" />
      ))}
    </Marquee>
  );
}
