"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TimeDataPoint {
  date: string;
  amount: number;
  count: number;
}

interface DistributionPoint {
  range: string;
  count: number;
}

interface PieDataPoint {
  name: string;
  value: number;
  [key: string]: unknown;
}

const PIE_COLORS = ["#f59e0b", "#10b981", "#06b6d4", "#8b5cf6", "#ec4899"];

export function AnalyticsClient({
  dailyData,
  monthlyData,
  distributionData,
  supporterBreakdown,
  paymentMethodData,
  currency,
}: {
  dailyData: TimeDataPoint[];
  monthlyData: TimeDataPoint[];
  distributionData: DistributionPoint[];
  supporterBreakdown: PieDataPoint[];
  paymentMethodData: PieDataPoint[];
  currency: string;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-96 w-full animate-pulse bg-neutral-900/50 rounded-3xl" />;
  }

  return (
    <div className="space-y-6">
      {/* Chart Row 1: Daily Revenue & Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Area Chart */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Daily Revenue Trend</h3>
              <p className="text-xs text-neutral-400">Tips earned over the past 30 days</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono">{currency}</Badge>
          </div>

          <div className="h-[280px] w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as TimeDataPoint;
                      return (
                        <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-2xl backdrop-blur-md text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-amber-400 font-extrabold">{formatCurrency(item.amount, currency)}</p>
                          <p className="text-neutral-400">{item.count} tips received</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="amount" stroke="#f59e0b" strokeWidth={3} fill="url(#analyticsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Bar Chart */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Monthly Revenue</h3>
              <p className="text-xs text-neutral-400">Total volume grouped by month</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono">{currency}</Badge>
          </div>

          <div className="h-[280px] w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as TimeDataPoint;
                      return (
                        <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-3 shadow-2xl backdrop-blur-md text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-emerald-400 font-extrabold">{formatCurrency(item.amount, currency)}</p>
                          <p className="text-neutral-400">{item.count} tips</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Tip Size Distribution & Payment/Supporter Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tip Distribution */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div>
            <h3 className="font-bold text-white text-base">Tip Size Breakdown</h3>
            <p className="text-xs text-neutral-400">Distribution by contribution tiers</p>
          </div>

          <div className="h-[240px] w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="range" stroke="#737373" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
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
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {distributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Supporter Privacy Breakdown */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div>
            <h3 className="font-bold text-white text-base">Supporter Privacy</h3>
            <p className="text-xs text-neutral-400">Public names vs anonymous supporters</p>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={supporterBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {supporterBreakdown.map((_, index) => (
                    <Cell key={`pie-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as PieDataPoint;
                      return (
                        <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-2.5 shadow-xl text-xs">
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-amber-400">{item.value} tips</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", color: "#a3a3a3" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div>
            <h3 className="font-bold text-white text-base">Payment Methods</h3>
            <p className="text-xs text-neutral-400">Channels used by supporters</p>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethodData.map((_, index) => (
                    <Cell key={`pay-${index}`} fill={PIE_COLORS[(index + 2) % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as PieDataPoint;
                      return (
                        <div className="rounded-xl border border-white/10 bg-neutral-900/95 p-2.5 shadow-xl text-xs">
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-emerald-400">{item.value} payments</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", color: "#a3a3a3" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
