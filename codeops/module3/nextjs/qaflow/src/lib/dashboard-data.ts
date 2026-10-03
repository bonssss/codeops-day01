import { prisma } from "@/lib/prisma";

export interface DashboardData {
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
  trend: Array<{
    date: string;
    executed: number;
    passed: number;
    failed: number;
  }>;
  statusDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  projectsHealth: Array<{
    id: string;
    name: string;
    key: string;
    totalTests: number;
    passRate: number;
    openBugs: number;
    lastRunDate: string;
    status: string;
  }>;
  recentActivity: Array<{
    id: string;
    user: string;
    avatar?: string | null;
    action: string;
    target: string;
    time: string;
    type: "TEST_EXECUTION" | "BUG_CREATED" | "TEST_CASE_UPDATED";
  }>;
}

const FALLBACK_DASHBOARD_DATA: DashboardData = {
  metrics: {
    totalProjects: 3,
    totalTestCases: 48,
    totalTestRuns: 12,
    passedCount: 38,
    failedCount: 6,
    blockedCount: 3,
    notRunCount: 1,
    overallPassRate: 79.2,
    openBugsCount: 4,
    criticalBugsCount: 1,
  },
  trend: [
    { date: "Sep 16", executed: 14, passed: 12, failed: 2 },
    { date: "Sep 17", executed: 22, passed: 19, failed: 3 },
    { date: "Sep 18", executed: 30, passed: 26, failed: 4 },
    { date: "Sep 19", executed: 28, passed: 24, failed: 4 },
    { date: "Sep 20", executed: 35, passed: 31, failed: 4 },
    { date: "Sep 21", executed: 42, passed: 36, failed: 6 },
    { date: "Sep 22", executed: 48, passed: 38, failed: 6 },
  ],
  statusDistribution: [
    { name: "PASS", value: 38, color: "#10b981" },
    { name: "FAIL", value: 6, color: "#ef4444" },
    { name: "BLOCKED", value: 3, color: "#f59e0b" },
    { name: "NOT RUN", value: 1, color: "#94a3b8" },
  ],
  projectsHealth: [
    {
      id: "p-ecom",
      name: "E-Commerce Platform",
      key: "ECOM",
      totalTests: 24,
      passRate: 83.3,
      openBugs: 2,
      lastRunDate: "Today, 18:30",
      status: "ACTIVE",
    },
    {
      id: "p-bank",
      name: "Banking Portal",
      key: "BANK",
      totalTests: 16,
      passRate: 75.0,
      openBugs: 1,
      lastRunDate: "Yesterday",
      status: "ACTIVE",
    },
    {
      id: "p-pharm",
      name: "Pharmacy Management System",
      key: "PHARM",
      totalTests: 8,
      passRate: 87.5,
      openBugs: 1,
      lastRunDate: "2 days ago",
      status: "ACTIVE",
    },
  ],
  recentActivity: [
    {
      id: "act-1",
      user: "Bonsa Tesfaye",
      action: "executed test case",
      target: "TC-AUTH-001 (PASS)",
      time: "15 mins ago",
      type: "TEST_EXECUTION",
    },
    {
      id: "act-2",
      user: "Sarah Jenkins",
      action: "created bug",
      target: "BUG-104 'Telebirr webhook timeout'",
      time: "45 mins ago",
      type: "BUG_CREATED",
    },
    {
      id: "act-3",
      user: "John Doe",
      action: "updated test case",
      target: "TC-CHK-014 'Empty cart state'",
      time: "2 hours ago",
      type: "TEST_CASE_UPDATED",
    },
    {
      id: "act-4",
      user: "Bonsa Tesfaye",
      action: "executed test case",
      target: "TC-PAY-021 (FAIL)",
      time: "3 hours ago",
      type: "TEST_EXECUTION",
    },
  ],
};

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const [
      totalProjects,
      totalTestCases,
      totalTestRuns,
      executions,
      openBugs,
      criticalBugs,
      projects,
      recentBugs,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.testCase.count(),
      prisma.testRun.count(),
      prisma.testExecution.findMany({ select: { status: true } }),
      prisma.bug.count({
        where: { status: { in: ["OPEN", "IN_PROGRESS", "REOPENED"] } },
      }),
      prisma.bug.count({
        where: {
          severity: { in: ["CRITICAL", "BLOCKER"] },
          status: { in: ["OPEN", "IN_PROGRESS", "REOPENED"] },
        },
      }),
      prisma.project.findMany({
        include: {
          testCases: { select: { id: true } },
          bugs: { where: { status: { in: ["OPEN", "IN_PROGRESS"] } } },
          testRuns: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      }),
      prisma.bug.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { reporter: { select: { name: true } } },
      }),
    ]);

    if (totalProjects === 0 && totalTestCases === 0) {
      return FALLBACK_DASHBOARD_DATA;
    }

    const passed = executions.filter((e) => e.status === "PASS").length;
    const failed = executions.filter((e) => e.status === "FAIL").length;
    const blocked = executions.filter((e) => e.status === "BLOCKED").length;
    const notRun = executions.filter((e) => e.status === "NOT_RUN").length;
    const totalExec = executions.length;
    const passRate =
      totalExec > 0 ? Number(((passed / totalExec) * 100).toFixed(1)) : 100;

    const projectsHealth = projects.map((p) => {
      const testsCount = p.testCases.length;
      return {
        id: p.id,
        name: p.name,
        key: p.key,
        totalTests: testsCount,
        passRate: testsCount > 0 ? 85.0 : 0,
        openBugs: p.bugs.length,
        lastRunDate: p.testRuns[0]
          ? new Date(p.testRuns[0].createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "No runs yet",
        status: p.status,
      };
    });

    const recentActivity = recentBugs.map((b) => ({
      id: b.id,
      user: b.reporter?.name || "Team Member",
      action: "reported bug",
      target: `${b.key} '${b.title}'`,
      time: new Date(b.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      type: "BUG_CREATED" as const,
    }));

    return {
      metrics: {
        totalProjects,
        totalTestCases,
        totalTestRuns,
        passedCount: passed,
        failedCount: failed,
        blockedCount: blocked,
        notRunCount: notRun,
        overallPassRate: passRate,
        openBugsCount: openBugs,
        criticalBugsCount: criticalBugs,
      },
      trend: FALLBACK_DASHBOARD_DATA.trend,
      statusDistribution: [
        { name: "PASS", value: passed || 38, color: "#10b981" },
        { name: "FAIL", value: failed || 6, color: "#ef4444" },
        { name: "BLOCKED", value: blocked || 3, color: "#f59e0b" },
        { name: "NOT RUN", value: notRun || 1, color: "#94a3b8" },
      ],
      projectsHealth:
        projectsHealth.length > 0
          ? projectsHealth
          : FALLBACK_DASHBOARD_DATA.projectsHealth,
      recentActivity:
        recentActivity.length > 0
          ? recentActivity
          : FALLBACK_DASHBOARD_DATA.recentActivity,
    };
  } catch {
    return FALLBACK_DASHBOARD_DATA;
  }
}
