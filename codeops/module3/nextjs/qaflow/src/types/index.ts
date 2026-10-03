import {
  UserRole,
  ProjectRole,
  ProjectStatus,
  TestCasePriority,
  TestCaseType,
  TestCaseStatus,
  TestRunStatus,
  TestExecutionStatus,
  BugSeverity,
  BugPriority,
  BugStatus,
  NotificationType,
} from "@prisma/client";

export type {
  UserRole,
  ProjectRole,
  ProjectStatus,
  TestCasePriority,
  TestCaseType,
  TestCaseStatus,
  TestRunStatus,
  TestExecutionStatus,
  BugSeverity,
  BugPriority,
  BugStatus,
  NotificationType,
};

export interface DashboardMetrics {
  totalProjects: number;
  totalTestCases: number;
  totalTestRuns: number;
  totalPassed: number;
  totalFailed: number;
  totalBlocked: number;
  totalNotRun: number;
  overallPassRate: number;
  openBugsCount: number;
  criticalBugsCount: number;
}

export interface ActivityItem {
  id: string;
  userName: string;
  userImage?: string | null;
  action: string;
  targetKey: string;
  targetTitle: string;
  timestamp: Date | string;
  type:
    "TEST_EXECUTION" | "BUG_CREATED" | "TEST_CASE_UPDATED" | "TEST_RUN_STARTED";
}
