import { Card, CardContent } from "@/components/ui/card";
import {
  FolderKanban,
  FileCode2,
  PlaySquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bug,
  ShieldAlert,
  Percent,
} from "lucide-react";

interface MetricsCardsProps {
  metrics: {
    totalProjects: number;
    totalTestCases: number;
    totalTestRuns: number;
    passedCount: number;
    failedCount: number;
    blockedCount: number;
    notRunCount: number;
    overallPassRate: number;
    openBugsCount: number;
    criticalBugsCount: number;
  };
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      label: "Total Projects",
      value: metrics.totalProjects,
      icon: FolderKanban,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      label: "Total Test Cases",
      value: metrics.totalTestCases,
      icon: FileCode2,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      label: "Test Runs",
      value: metrics.totalTestRuns,
      icon: PlaySquare,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      label: "Overall Pass Rate",
      value: `${metrics.overallPassRate}%`,
      icon: Percent,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      label: "Passed Tests",
      value: metrics.passedCount,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      label: "Failed Tests",
      value: metrics.failedCount,
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/50",
    },
    {
      label: "Blocked Tests",
      value: metrics.blockedCount,
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
    {
      label: "Open Bugs",
      value: metrics.openBugsCount,
      icon: Bug,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/50",
    },
    {
      label: "Critical Bugs",
      value: metrics.criticalBugsCount,
      icon: ShieldAlert,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Card key={c.label} className="border shadow-sm">
            <CardContent className="p-3.5 flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 truncate">
                  {c.label}
                </span>
                <div className={`p-1.5 rounded-lg ${c.bg} ${c.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {c.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
