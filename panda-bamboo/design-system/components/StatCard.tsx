import { cn } from "../cn";

export function StatCard({
  value,
  suffix = "+",
  label,
  className,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-white p-6 text-center shadow-card", className)}>
      <p className="text-4xl font-extrabold text-theme">
        {value}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
