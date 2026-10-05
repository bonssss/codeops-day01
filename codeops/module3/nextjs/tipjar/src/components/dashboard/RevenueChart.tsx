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
  const strokeColor = isDark ? "#34D399" : "#059669";
  const fillColor = isDark ? "rgba(52, 211, 153, 0.15)" : "rgba(5, 150, 105, 0.15)";
  const gridColor = isDark ? "rgba(148, 163, 184, 0.15)" : "rgba(229, 231, 235, 0.8)";
  const textColor = isDark ? "#94A3B8" : "#6B7280";

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
                  <div className="rounded-xl border border-border bg-card p-3 shadow-lg text-xs space-y-1">
                    <p className="font-bold text-card-foreground">{label}</p>
                    <p className="text-primary font-bold">
                      {formatCurrency(item.amount, currency)}
                    </p>
                    <p className="text-muted-foreground text-[11px]">{item.tipsCount} tips received</p>
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
