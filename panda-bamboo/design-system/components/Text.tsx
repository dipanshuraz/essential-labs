import { cn } from "../cn";

export function Text({
  children,
  className,
  muted,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  as?: "p" | "span";
}) {
  return (
    <Tag className={cn("text-base leading-relaxed", muted ? "text-muted" : "text-ink/80", className)}>
      {children}
    </Tag>
  );
}
