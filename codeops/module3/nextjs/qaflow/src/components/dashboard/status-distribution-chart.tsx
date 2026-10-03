"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatusItem {
  name: string;
  value: number;
  color: string;
}

interface StatusDistributionChartProps {
  data: StatusItem[];
}

const emptySubscribe = () => () => {};

export function StatusDistributionChart({
  data,
}: StatusDistributionChartProps) {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="border shadow-sm col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Test Status Distribution
        </CardTitle>
        <CardDescription className="text-xs">
          Ratio of PASS, FAIL, BLOCKED and NOT RUN tests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full relative">
          {isClient ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Metrics Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {total}
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Total Tests
                </span>
              </div>
            </>
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
