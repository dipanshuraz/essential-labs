import { cn } from "../cn";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-full border border-border bg-white px-5 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-theme focus:ring-2 focus:ring-theme/20",
        className,
      )}
      {...props}
    />
  );
}
