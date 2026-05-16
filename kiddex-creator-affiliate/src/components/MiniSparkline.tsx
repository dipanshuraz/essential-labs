import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

export function MiniSparkline({
  data,
  color = "#6366f1",
}: {
  data: number[];
  color?: string;
}) {
  const chartData = useMemo(() => data.map((v, i) => ({ i, v })), [data]);
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.15} strokeWidth={1.5} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
