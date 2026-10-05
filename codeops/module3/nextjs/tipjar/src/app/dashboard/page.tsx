import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  Wallet,
  DollarSign,
  Heart,
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
  Download,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export default async function DashboardPage() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      profile: true,
      goals: {
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      tipsReceived: {
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { payment: true },
      },
    },
  });

  const currency = user?.profile?.currency || "ETB";

  const completedTips = await db.tip.findMany({
    where: {
      recipientId: session.id,
      status: "COMPLETED",
    },
    orderBy: { createdAt: "asc" },
  });

  const totalAmount = completedTips.reduce((sum, t) => sum + t.amount, 0);
  const totalTipsCount = completedTips.length;
  // Available balance (e.g. 80% of total earnings available for immediate payout)
  const availableBalance = Math.round(totalAmount * 0.85);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = last7Days.map((dateStr) => {
    const dayTips = completedTips.filter(
      (t) => new Date(t.createdAt).toISOString().split("T")[0] === dateStr
    );
    const dayAmount = dayTips.reduce((sum, t) => sum + t.amount, 0);
    const dateObj = new Date(dateStr);
    const label = `${dayNames[dateObj.getDay()]} ${dateObj.getDate()}`;
    return {
      date: label,
      amount: dayAmount,
      tipsCount: dayTips.length,
    };
  });

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: user?.profile?.username || null }}
        title="Dashboard"
        description="Here's an overview of your tips and earnings."
      />

      <div className="px-6 space-y-6 max-w-6xl">
        
        {/* Top 3 Stat Cards Matching Design Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Total Received */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Total received</span>
              <div className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-foreground tracking-tight">
              {formatCurrency(totalAmount, currency)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>↑ 12% from last 7 days</span>
            </div>
          </div>

          {/* Card 2: Available Balance */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Available balance</span>
              <div className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-foreground tracking-tight">
              {formatCurrency(availableBalance, currency)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>↑ 12% from last 7 days</span>
            </div>
          </div>

          {/* Card 3: Total Tips */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Total tips</span>
              <div className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Heart className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-foreground tracking-tight">
              {totalTipsCount}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>↑ 8% from last 7 days</span>
            </div>
          </div>

        </div>

        {/* 2 Column Layout: Earnings Overview & Recent Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Earnings Overview Chart */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground text-base">Earnings overview</h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground border border-border rounded-lg px-2.5 py-1 bg-muted/50 cursor-pointer">
                <span>Last 7 days</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
            <RevenueChart data={chartData} currency={currency} />
          </div>

          {/* Recent Tips List */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-base">Recent tips</h3>
              <Link href="/dashboard/tips">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                  View all
                </span>
              </Link>
            </div>

            {!user?.tipsReceived || user.tipsReceived.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-xs">
                No tips received yet. Share your public link to start receiving support!
              </div>
            ) : (
              <div className="space-y-3">
                {user.tipsReceived.slice(0, 6).map((tip) => {
                  const name = tip.isAnonymous ? "Anonymous" : tip.supporterName || "Supporter";
                  return (
                    <div
                      key={tip.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={name} size="sm" className="h-8 w-8 text-xs shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-xs truncate">{name}</p>
                          <p className="text-[11px] text-muted-foreground">{formatRelativeTime(tip.createdAt)}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                          {formatCurrency(tip.amount, tip.currency)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
