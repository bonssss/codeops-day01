"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DistributionPoint {
  range: string;
  count: number;
}

const COLORS = ["#f59e0b", "#10b981", "#06b6d4", "#8b5cf6", "#ec4899"];

export function TipBreakdownChart({ data }: { data: DistributionPoint[] }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[280px] w-full animate-pulse bg-neutral-900/50 rounded-2xl" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-xs text-neutral-500">
        No breakdown data
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="range"
            stroke="#737373"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#737373"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as DistributionPoint;
                return (
                  <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-2xl backdrop-blur-md text-xs space-y-1">
                    <p className="font-bold text-white">{item.range}</p>
                    <p className="text-amber-400 font-extrabold">{item.count} tips</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
