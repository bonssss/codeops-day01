"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { useTheme } from "@/components/shared/theme-provider";

interface DataPoint {
  date: string;
  amount: number;
  tipsCount: number;
}

export function RevenueChart({
  data,
  currency = "ETB",
}: {
  data: DataPoint[];
  currency?: string;
}) {
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
        No tip history available yet
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";
  const strokeColor = isDark ? "#f59e0b" : "#d97706";
  const fillColor = isDark ? "#78350f" : "#fef3c7";
  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="h-[280px] w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="date"
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
            tickFormatter={(val) => `${val}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as DataPoint;
                return (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">{label}</p>
                    <p className="text-amber-600 dark:text-amber-400 font-bold">
                      {formatCurrency(item.amount, currency)}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{item.tipsCount} tips received</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={strokeColor}
            strokeWidth={2.5}
            fill={fillColor}
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
