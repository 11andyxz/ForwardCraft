import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper shadow-sm hover:bg-night-2 hover:shadow-md",
  secondary: "border border-line-strong bg-paper text-ink hover:bg-surface hover:border-ink-subtle",
  ghost: "text-ink hover:bg-surface",
  inverse: "bg-paper text-ink shadow-sm hover:bg-surface hover:shadow-md",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", withArrow, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], "group", className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, onClick } = props;
    const arrow = withArrow ? (
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    ) : null;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
          {children}
          {arrow}
        </a>
      );
    }
    // In-page hash anchors render as plain <a> for native scroll + :target.
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
        {arrow}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
}
