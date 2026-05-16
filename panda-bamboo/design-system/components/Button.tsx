import Link from "next/link";
import { cn } from "../cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-theme text-white shadow-md hover:bg-theme-dark focus-visible:ring-theme/40",
  secondary:
    "bg-ink text-white hover:bg-ink/90 focus-visible:ring-ink/30",
  ghost:
    "bg-transparent text-ink border border-border hover:border-theme hover:text-theme",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm font-semibold",
  lg: "px-8 py-3 text-base font-semibold",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
