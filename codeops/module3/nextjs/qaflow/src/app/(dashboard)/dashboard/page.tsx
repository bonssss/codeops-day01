import Link from "next/link";
import { getDashboardData } from "@/lib/dashboard-data";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ExecutionTrendChart } from "@/components/dashboard/execution-trend-chart";
import { StatusDistributionChart } from "@/components/dashboard/status-distribution-chart";
import { ProjectHealthTable } from "@/components/dashboard/project-health-table";
import { RecentActivityFeed } from "@/components/dashboard/recent-activity-feed";
import { Button } from "@/components/ui/button";
import { PlaySquare, Bug, Plus } from "lucide-react";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            QA Analytics Dashboard
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-mono">
              Live
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time test execution progress, pass rate distributions, and bug
            metrics across projects
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="text-xs">
            <Link href="/test-cases">
              <Plus className="h-3.5 w-3.5 mr-1" />
              New Test Case
            </Link>
          </Button>

          <Button asChild size="sm" variant="destructive" className="text-xs">
            <Link href="/bugs">
              <Bug className="h-3.5 w-3.5 mr-1" />
              Report Bug
            </Link>
          </Button>

          <Button asChild size="sm" className="text-xs">
            <Link href="/test-runs">
              <PlaySquare className="h-3.5 w-3.5 mr-1" />
              Start Test Run
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <section>
        <MetricsCards metrics={data.metrics} />
      </section>

      {/* Interactive Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExecutionTrendChart data={data.trend} />
        <StatusDistributionChart data={data.statusDistribution} />
      </section>

      {/* Project Health & Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectHealthTable projects={data.projectsHealth} />
        <RecentActivityFeed activities={data.recentActivity} />
      </section>
    </div>
  );
}
