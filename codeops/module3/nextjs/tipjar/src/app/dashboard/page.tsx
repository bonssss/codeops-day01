import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  ArrowUpRight,
  Sparkles,
  Coins,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
        take: 10,
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

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const thisMonthTips = completedTips.filter((t) => new Date(t.createdAt) >= startOfMonth);
  const thisMonthAmount = thisMonthTips.reduce((sum, t) => sum + t.amount, 0);

  const distinctSupporters = new Set(
    completedTips.map((t) => (t.isAnonymous ? `anon-${t.id}` : t.supporterName || t.senderId || t.id))
  ).size;

  const averageTip = totalTipsCount > 0 ? totalAmount / totalTipsCount : 0;

  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().split("T")[0];
  });

  const chartData = last14Days.map((dateStr) => {
    const dayTips = completedTips.filter(
      (t) => new Date(t.createdAt).toISOString().split("T")[0] === dateStr
    );
    const dayAmount = dayTips.reduce((sum, t) => sum + t.amount, 0);
    const dateObj = new Date(dateStr);
    const label = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    return {
      date: label,
      amount: dayAmount,
      tipsCount: dayTips.length,
    };
  });

  const activeGoal = user?.goals[0];

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: user?.profile?.username || null }}
        title="Dashboard Overview"
        description="Monitor your tipping revenue, supporter growth, and active goals"
      />

      <div className="px-6 space-y-6 max-w-7xl">
        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold uppercase tracking-wider">Total Received</span>
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center font-bold">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">
              {formatCurrency(totalAmount, currency)}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Lifetime Earnings</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold uppercase tracking-wider">This Month</span>
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center font-bold">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">
              {formatCurrency(thisMonthAmount, currency)}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {thisMonthTips.length} tips received this month
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold uppercase tracking-wider">Total Supporters</span>
              <div className="h-8 w-8 rounded-xl bg-muted text-amber-700 dark:text-amber-300 border border-border flex items-center justify-center font-bold">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">{distinctSupporters}</div>
            <div className="mt-2 text-xs text-muted-foreground">Across {totalTipsCount} transactions</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold uppercase tracking-wider">Average Tip</span>
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center font-bold">
                <Coins className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">
              {formatCurrency(averageTip, currency)}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Per contribution</div>
          </div>
        </div>

        {/* Middle Section: Revenue Chart & Active Goal Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chart */}
          <div className="lg:col-span-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground text-base">Tips Over Time</h3>
                <p className="text-xs text-muted-foreground">Daily revenue volume over the last 14 days</p>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                {currency}
              </Badge>
            </div>
            <RevenueChart data={chartData} currency={currency} />
          </div>

          {/* Active Goal */}
          <div className="lg:col-span-4 rounded-3xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-bold text-foreground text-base">Active Goal</h3>
              </div>
              <Link href="/dashboard/goals">
                <Button variant="ghost" size="sm" className="text-xs text-amber-600 dark:text-amber-400 p-0 h-auto font-semibold">
                  Manage
                </Button>
              </Link>
            </div>

            {activeGoal ? (
              <div className="space-y-3 pt-1">
                <h4 className="font-bold text-sm text-foreground">{activeGoal.title}</h4>
                {activeGoal.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {activeGoal.description}
                  </p>
                )}

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {formatCurrency(activeGoal.currentAmount, activeGoal.currency)}
                    </span>
                    <span className="text-muted-foreground">
                      Target: {formatCurrency(activeGoal.targetAmount, activeGoal.currency)}
                    </span>
                  </div>
                  <Progress value={activeGoal.currentAmount} max={activeGoal.targetAmount} className="h-2" />
                  <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
                    <span>
                      {Math.min(100, Math.round((activeGoal.currentAmount / activeGoal.targetAmount) * 100))}% funded
                    </span>
                    {activeGoal.deadline && (
                      <span>Due: {new Date(activeGoal.deadline).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-muted-foreground">
                  You don&apos;t have an active goal yet. Setting a goal increases tips by up to 40%!
                </p>
                <Link href="/dashboard/goals">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    + Create First Goal
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Recent Tips Table */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-foreground text-base">Recent Tips</h3>
              <p className="text-xs text-muted-foreground">Latest incoming tips and supporter notes</p>
            </div>
            <Link href="/dashboard/tips">
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <span>View All History</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {!user?.tipsReceived || user.tipsReceived.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-xs">
              No tips received yet. Share your public link to start receiving support!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 px-3">Supporter</th>
                    <th className="pb-3 px-3">Amount</th>
                    <th className="pb-3 px-3">Message</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3">Method</th>
                    <th className="pb-3 px-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {user.tipsReceived.map((tip) => (
                    <tr key={tip.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-foreground">
                        {tip.isAnonymous ? (
                          <span className="text-muted-foreground italic">Anonymous</span>
                        ) : (
                          tip.supporterName || "Supporter"
                        )}
                      </td>
                      <td className="py-3 px-3 font-black text-amber-600 dark:text-amber-400">
                        {formatCurrency(tip.amount, tip.currency)}
                      </td>
                      <td className="py-3 px-3 max-w-xs truncate text-muted-foreground">
                        {tip.message || <span className="text-muted-foreground/60">-</span>}
                      </td>
                      <td className="py-3 px-3">
                        {tip.status === "COMPLETED" && (
                          <Badge variant="default" className="text-[10px]">
                            Completed
                          </Badge>
                        )}
                        {tip.status === "PENDING" && (
                          <Badge variant="secondary" className="text-[10px]">
                            Pending
                          </Badge>
                        )}
                        {tip.status === "FAILED" && (
                          <Badge variant="destructive" className="text-[10px]">
                            Failed
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {tip.payment?.paymentMethod || "Mock Pay"}
                      </td>
                      <td className="py-3 px-3 text-right text-muted-foreground">
                        {formatRelativeTime(tip.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
