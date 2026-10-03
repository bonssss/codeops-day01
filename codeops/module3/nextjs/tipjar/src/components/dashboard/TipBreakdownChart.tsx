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
  const primaryBarColor = isDark ? "#f59e0b" : "#d97706";
  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const textColor = isDark ? "#94a3b8" : "#64748b";

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
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">{item.range}</p>
                    <p className="text-amber-600 dark:text-amber-400 font-bold">{item.count} tips</p>
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
