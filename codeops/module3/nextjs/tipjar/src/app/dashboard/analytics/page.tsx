import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsClient } from "@/components/analytics/AnalyticsClient";

export const metadata = {
  title: "Analytics - TipJar Dashboard",
};

export default async function DashboardAnalyticsPage() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      profile: true,
      tipsReceived: {
        where: { status: "COMPLETED" },
        include: { payment: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const currency = user?.profile?.currency || "ETB";
  const completedTips = user?.tipsReceived || [];

  // 1. Daily Data (Last 30 Days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  const dailyData = last30Days.map((dateStr) => {
    const dayTips = completedTips.filter(
      (t) => new Date(t.createdAt).toISOString().split("T")[0] === dateStr
    );
    const amount = dayTips.reduce((sum, t) => sum + t.amount, 0);
    const dateObj = new Date(dateStr);
    return {
      date: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
      amount,
      count: dayTips.length,
    };
  });

  // 2. Monthly Data (Last 6 Months)
  const monthsMap = new Map<string, { amount: number; count: number }>();
  completedTips.forEach((t) => {
    const d = new Date(t.createdAt);
    const key = d.toLocaleString("default", { month: "short", year: "2-digit" });
    const existing = monthsMap.get(key) || { amount: 0, count: 0 };
    monthsMap.set(key, {
      amount: existing.amount + t.amount,
      count: existing.count + 1,
    });
  });

  const monthlyData = Array.from(monthsMap.entries()).map(([date, val]) => ({
    date,
    amount: val.amount,
    count: val.count,
  }));

  // 3. Distribution Data
  const ranges = [
    { label: "< 100", min: 0, max: 99 },
    { label: "100 - 250", min: 100, max: 250 },
    { label: "250 - 500", min: 251, max: 500 },
    { label: "500 - 1000", min: 501, max: 1000 },
    { label: "1000+", min: 1001, max: Infinity },
  ];

  const distributionData = ranges.map((r) => {
    const count = completedTips.filter((t) => t.amount >= r.min && t.amount <= r.max).length;
    return {
      range: r.label,
      count,
    };
  });

  // 4. Supporter Breakdown (Anonymous vs Public)
  const anonCount = completedTips.filter((t) => t.isAnonymous).length;
  const publicCount = completedTips.length - anonCount;
  const supporterBreakdown = [
    { name: "Public Supporters", value: publicCount },
    { name: "Anonymous", value: anonCount },
  ];

  // 5. Payment Methods Breakdown
  const methodMap = new Map<string, number>();
  completedTips.forEach((t) => {
    const m = t.payment?.paymentMethod || "Telebirr";
    methodMap.set(m, (methodMap.get(m) || 0) + 1);
  });

  const paymentMethodData = Array.from(methodMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: user?.profile?.username || null }}
        title="Analytics & Insights"
        description="Detailed breakdown of your tips, trends, and supporters"
      />

      <div className="px-6 max-w-7xl">
        <AnalyticsClient
          dailyData={dailyData}
          monthlyData={monthlyData}
          distributionData={distributionData}
          supporterBreakdown={supporterBreakdown}
          paymentMethodData={paymentMethodData}
          currency={currency}
        />
      </div>
    </div>
  );
}
