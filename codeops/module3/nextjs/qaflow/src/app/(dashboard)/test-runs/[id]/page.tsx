"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Link2,
} from "lucide-react";

export default function TestRunDetailPage() {
  const params = useParams();
  const runId = (params?.id as string) || "run-24";

  const run = {
    id: runId,
    runNumber: 24,
    name: "Sprint 42 - Regression Test Run",
    project: "E-Commerce Platform (ECOM)",
    environment: "Staging",
    browser: "Chrome 128 (Desktop)",
    status: "COMPLETED",
    executedBy: "Sarah Jenkins",
    total: 4,
    passed: 3,
    failed: 1,
    blocked: 0,
    cases: [
      {
        id: "tc-1",
        key: "TC-AUTH-001",
        title: "Login with valid email and password",
        status: "PASS" as const,
        tester: "Bonsa Tesfaye",
        actualResult: "User authenticated in 180ms.",
      },
      {
        id: "tc-2",
        key: "TC-AUTH-002",
        title: "MFA code verification timeout",
        status: "PASS" as const,
        tester: "Bonsa Tesfaye",
        actualResult: "401 Unauthorized warning rendered correctly.",
      },
      {
        id: "tc-3",
        key: "TC-PAY-021",
        title: "Payment transaction via Telebirr gateway",
        status: "FAIL" as const,
        tester: "Bonsa Tesfaye",
        failureReason:
          "Gateway webhook timeout HTTP 504 on large volume transactions.",
        linkedBug: "BUG-104",
      },
      {
        id: "tc-4",
        key: "TC-CHK-014",
        title: "Prevent checkout button action on empty cart",
        status: "PASS" as const,
        tester: "John Doe",
        actualResult: "Checkout button correctly disabled.",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/test-runs"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Test Runs
        </Link>
        <Badge variant="pass" className="text-xs uppercase">
          {run.status}
        </Badge>
      </div>

      {/* Run Summary Card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  RUN #{run.runNumber}
                </Badge>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {run.name}
                </CardTitle>
              </div>
              <CardDescription className="text-xs mt-1">
                {run.project} • {run.environment} • {run.browser}
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/test-runs/${run.id}/execute/tc-1`}>
                <Button size="sm" className="text-xs">
                  <Play className="h-3.5 w-3.5 mr-1 fill-white" />
                  Execute Tests
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: "75%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "25%" }} />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> {run.passed} Passed
              </span>
              <span className="flex items-center gap-1 font-semibold text-rose-600">
                <XCircle className="h-3.5 w-3.5" /> {run.failed} Failed
              </span>
              <span className="text-slate-400">
                {run.total} Tests Total (75% Pass Rate)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Execution List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Executed Test Cases ({run.cases.length})
        </h2>

        <div className="space-y-2.5">
          {run.cases.map((c) => (
            <Card
              key={c.id}
              className={`border shadow-sm transition-all ${
                c.status === "FAIL"
                  ? "border-rose-300 dark:border-rose-900 bg-rose-50/20"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                      {c.key}
                    </span>
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {c.title}
                    </span>
                  </div>

                  {c.status === "FAIL" ? (
                    <div className="text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                      <span>Reason: {c.failureReason}</span>
                      {c.linkedBug && (
                        <Link
                          href={`/bugs`}
                          className="font-mono font-bold text-rose-600 underline flex items-center gap-1"
                        >
                          <Link2 className="h-3 w-3" /> {c.linkedBug}
                        </Link>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">{c.actualResult}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={c.status === "PASS" ? "pass" : "fail"}
                    className="text-xs"
                  >
                    {c.status}
                  </Badge>

                  <Link href={`/test-runs/${run.id}/execute/${c.id}`}>
                    <Button size="sm" variant="outline" className="text-xs h-8">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Re-run
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
