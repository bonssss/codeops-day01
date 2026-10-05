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
import { useTheme } from "@/components/shared/theme-provider";

interface DistributionPoint {
  range: string;
  count: number;
}

export function TipBreakdownChart({ data }: { data: DistributionPoint[] }) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[280px] w-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-xs text-slate-400">
        No breakdown data
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";
  const primaryBarColor = isDark ? "#FBBF24" : "#F59E0B";
  const gridColor = isDark ? "rgba(168, 162, 158, 0.15)" : "rgba(28, 25, 23, 0.08)";
  const textColor = isDark ? "#A8A29E" : "#78716C";

  return (
    <div className="h-[280px] w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="range"
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={textColor}
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
                  <div className="rounded-xl border border-border bg-card p-3 shadow-lg text-xs space-y-1">
                    <p className="font-bold text-card-foreground">{item.range}</p>
                    <p className="text-primary font-bold">{item.count} tips</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} fill={primaryBarColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
