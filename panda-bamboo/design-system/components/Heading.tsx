import { cn } from "../cn";

export function Heading({
  as: Tag = "h2",
  children,
  className,
  highlight,
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
  highlight?: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-bold tracking-tight text-ink",
        Tag === "h1" && "text-4xl sm:text-5xl",
        Tag === "h2" && "text-3xl sm:text-4xl",
        Tag === "h3" && "text-2xl",
        Tag === "h4" && "text-lg",
        className,
      )}
    >
      {children}
      {highlight ? (
        <>
          {" "}
          <span className="text-theme">{highlight}</span>
        </>
      ) : null}
    </Tag>
  );
}
