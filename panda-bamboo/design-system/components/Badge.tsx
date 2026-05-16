import { cn } from "../cn";

export function Badge({
  children,
  className,
  tone = "theme",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "theme" | "dark" | "sale";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide",
        tone === "theme" && "bg-theme-light text-theme",
        tone === "dark" && "bg-ink text-white",
        tone === "sale" && "bg-theme text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
