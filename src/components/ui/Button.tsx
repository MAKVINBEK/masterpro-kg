import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition-colors duration-200 select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-primary hover:bg-accent-hover",
  secondary: "bg-primary text-white hover:bg-primary-hover",
  outline:
    "border border-primary/25 bg-white text-primary hover:border-primary hover:bg-primary/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

interface ButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  // Внутренние ссылки через Link, а tel:, wa.me и внешние через обычный <a>
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}