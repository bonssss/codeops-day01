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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TrendData {
  date: string;
  executed: number;
  passed: number;
  failed: number;
}

interface ExecutionTrendChartProps {
  data: TrendData[];
}

const emptySubscribe = () => () => {};

export function ExecutionTrendChart({ data }: ExecutionTrendChartProps) {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <Card className="border shadow-sm col-span-1 lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Test Execution Trend
            </CardTitle>
            <CardDescription className="text-xs">
              Daily test executions, passed vs. failed results
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Total
              Executed
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Passed
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Failed
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full pt-4">
          {isClient ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-slate-100 dark:stroke-slate-800"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="executed"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="#3b82f6"
                  fillOpacity={0.08}
                  name="Executed"
                />
                <Area
                  type="monotone"
                  dataKey="passed"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="#16a34a"
                  fillOpacity={0.08}
                  name="Passed"
                />
                <Area
                  type="monotone"
                  dataKey="failed"
                  stroke="#dc2626"
                  strokeWidth={2}
                  fill="transparent"
                  name="Failed"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
              Loading chart...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
