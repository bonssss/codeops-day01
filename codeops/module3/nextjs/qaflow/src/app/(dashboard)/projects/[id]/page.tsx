"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TestCaseEditorDialog } from "@/components/test-cases/test-case-editor-dialog";
import { CreateRunDialog } from "@/components/test-runs/create-run-dialog";
import { CreateBugDialog } from "@/components/bugs/create-bug-dialog";
import {
  FileCode2,
  PlaySquare,
  Bug,
  BarChart3,
  Users,
  Settings,
  Layers,
  ArrowLeft,
  Plus,
  Link2,
} from "lucide-react";

type TabKey =
  | "overview"
  | "suites"
  | "test-cases"
  | "test-runs"
  | "bugs"
  | "reports"
  | "members"
  | "settings";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "ecom";
  const [activeTab, setActiveTab] = React.useState<TabKey>("overview");

  const project = {
    id: projectId,
    name: "E-Commerce Platform",
    key: "ECOM",
    description:
      "Modern cloud-native retail e-commerce platform with microservices checkout, inventory, and payment gateways.",
    passRate: 83.3,
    totalTests: 24,
    passedTests: 20,
    failedTests: 3,
    blockedTests: 1,
    openBugs: 2,
    status: "ACTIVE",
  };

  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "suites", label: "Test Suites", icon: Layers },
    { key: "test-cases", label: "Test Cases", icon: FileCode2 },
    { key: "test-runs", label: "Test Runs", icon: PlaySquare },
    { key: "bugs", label: "Bugs", icon: Bug },
    { key: "reports", label: "Reports", icon: BarChart3 },
    { key: "members", label: "Members", icon: Users },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Back Link & Project Header */}
      <div className="space-y-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              {project.key.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {project.name}
                </h1>
                <Badge variant="outline" className="font-mono text-xs">
                  {project.key}
                </Badge>
                <Badge variant="pass" className="text-[10px] uppercase">
                  {project.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TestCaseEditorDialog projectId={project.id} />
            <CreateRunDialog projectId={project.id} />
            <CreateBugDialog projectId={project.id} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1 border-b overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/40"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <span className="text-xs text-slate-500">Test Coverage</span>
                <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">
                  {project.totalTests} cases
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <span className="text-xs text-slate-500">Pass Rate</span>
                <p className="text-2xl font-bold mt-1 text-emerald-600">
                  {project.passRate}%
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <span className="text-xs text-slate-500">Open Defects</span>
                <p className="text-2xl font-bold mt-1 text-rose-600">
                  {project.openBugs} bugs
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <span className="text-xs text-slate-500">Last Test Run</span>
                <p className="text-2xl font-bold mt-1 text-purple-600">
                  RUN #24
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Execution Health Summary
              </CardTitle>
              <CardDescription className="text-xs">
                Distribution across test execution sessions for this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: "83.3%" }}
                  title="Pass"
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: "12.5%" }}
                  title="Fail"
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: "4.2%" }}
                  title="Blocked"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> 20
                  Passed (83.3%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> 3 Failed
                  (12.5%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> 1
                  Blocked (4.2%)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: Test Suites */}
      {activeTab === "suites" && (
        <div className="space-y-4 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Hierarchical Test Suites</h2>
            <Button size="sm" variant="outline" className="text-xs">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Suite
            </Button>
          </div>

          <div className="space-y-3">
            <Card className="border shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-600" />
                    <span className="font-bold text-sm">
                      Authentication & Security
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      8 Tests
                    </Badge>
                  </div>
                </div>
                <div className="pl-6 space-y-2 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── Login & MFA</span>
                    <span className="text-slate-500">4 Tests</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── Password Reset & Recovery</span>
                    <span className="text-slate-500">2 Tests</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── Session Renewal</span>
                    <span className="text-slate-500">2 Tests</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-purple-600" />
                    <span className="font-bold text-sm">
                      Shopping & Checkout
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      10 Tests
                    </Badge>
                  </div>
                </div>
                <div className="pl-6 space-y-2 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── Cart Calculations & Discounts</span>
                    <span className="text-slate-500">6 Tests</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── One-Page Checkout Form</span>
                    <span className="text-slate-500">4 Tests</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-600" />
                    <span className="font-bold text-sm">Payment Gateways</span>
                    <Badge variant="secondary" className="text-[10px]">
                      6 Tests
                    </Badge>
                  </div>
                </div>
                <div className="pl-6 space-y-2 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── Telebirr Mobile Wallet</span>
                    <span className="text-slate-500">2 Tests</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs flex justify-between">
                    <span>└── Credit Card Processing</span>
                    <span className="text-slate-500">4 Tests</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Test Cases */}
      {activeTab === "test-cases" && (
        <div className="space-y-4 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Test Cases in this Project
            </h2>
            <TestCaseEditorDialog projectId={project.id} />
          </div>

          <div className="space-y-2">
            {[
              {
                id: "tc1",
                key: "TC-AUTH-001",
                title: "Login with valid email and password",
                priority: "CRITICAL",
                type: "SMOKE",
                suite: "Authentication > Login & MFA",
              },
              {
                id: "tc2",
                key: "TC-AUTH-002",
                title: "MFA code verification timeout",
                priority: "HIGH",
                type: "SECURITY",
                suite: "Authentication > Login & MFA",
              },
              {
                id: "tc3",
                key: "TC-PAY-021",
                title: "Payment transaction via Telebirr gateway",
                priority: "CRITICAL",
                type: "E2E",
                suite: "Payment Gateways > Telebirr",
              },
              {
                id: "tc4",
                key: "TC-CHK-014",
                title: "Prevent checkout button action on empty cart",
                priority: "MEDIUM",
                type: "FUNCTIONAL",
                suite: "Shopping & Checkout",
              },
            ].map((tc) => (
              <Card
                key={tc.id}
                className="border shadow-sm hover:border-blue-500/40"
              >
                <CardContent className="p-3.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-blue-600">
                        {tc.key}
                      </span>
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                        {tc.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {tc.suite}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {tc.type}
                    </Badge>
                    <Badge
                      variant={
                        tc.priority === "CRITICAL" ? "destructive" : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {tc.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Test Runs */}
      {activeTab === "test-runs" && (
        <div className="space-y-4 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Test Execution Sessions</h2>
            <CreateRunDialog projectId={project.id} />
          </div>

          <Card className="border shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    RUN #24
                  </Badge>
                  <span className="font-bold text-sm">
                    Sprint 42 - Regression Test Run
                  </span>
                  <Badge variant="pass" className="text-[10px]">
                    COMPLETED
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Executed on Chrome 128 (Staging) by Sarah Jenkins
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="pass" className="text-xs">
                  20 Pass
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  3 Fail
                </Badge>
                <Link href="/test-runs/run-24">
                  <Button size="sm" variant="outline" className="text-xs">
                    View Results
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: Bugs */}
      {activeTab === "bugs" && (
        <div className="space-y-4 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Active Defect Tickets</h2>
            <CreateBugDialog projectId={project.id} />
          </div>

          <Card className="border shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-rose-600">
                    BUG-104
                  </span>
                  <span className="font-semibold text-sm">
                    Telebirr webhook drops callback when transaction exceeds
                    10,000 ETB
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 text-blue-600 font-mono">
                    <Link2 className="h-3 w-3" /> TC-PAY-021
                  </span>
                  <span>•</span>
                  <span>Assignee: Bonsa Tesfaye</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-[10px]">
                  BLOCKER
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  OPEN
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: Reports, Members, Settings */}
      {activeTab === "reports" && (
        <div className="space-y-4 animate-in fade-in-50">
          <Card className="border shadow-sm p-4">
            <h3 className="font-semibold text-sm mb-2">
              Project Quality Metrics
            </h3>
            <p className="text-xs text-slate-500">
              Pass rate trend: 83.3% across last 3 runs.
            </p>
          </Card>
        </div>
      )}

      {activeTab === "members" && (
        <div className="space-y-3 animate-in fade-in-50">
          {[
            {
              name: "Alex Vance",
              email: "admin@qaflow.dev",
              role: "PROJECT_ADMIN",
            },
            {
              name: "Sarah Jenkins",
              email: "manager@qaflow.dev",
              role: "QA_MANAGER",
            },
            {
              name: "Bonsa Tesfaye",
              email: "engineer@qaflow.dev",
              role: "QA_ENGINEER",
            },
          ].map((m) => (
            <Card
              key={m.email}
              className="border shadow-sm p-3 flex justify-between items-center text-xs"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {m.name}
                </p>
                <p className="text-slate-400">{m.email}</p>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {m.role}
              </Badge>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4 animate-in fade-in-50">
          <Card className="border shadow-sm p-4 space-y-3">
            <h3 className="font-semibold text-sm">Project Configuration</h3>
            <p className="text-xs text-slate-500">
              Archive or delete this project workspace.
            </p>
            <Button size="sm" variant="destructive" className="text-xs">
              Archive Project
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
