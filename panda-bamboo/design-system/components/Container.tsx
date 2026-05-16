import { cn } from "../cn";

export function Container({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        narrow ? "max-w-4xl" : "max-w-[1320px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
