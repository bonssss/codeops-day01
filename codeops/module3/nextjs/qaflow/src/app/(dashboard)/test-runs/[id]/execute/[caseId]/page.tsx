"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recordTestExecution } from "@/actions/test-runs";
import { createBug } from "@/actions/bugs";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bug,
  CheckSquare,
  Square,
  Loader2,
} from "lucide-react";

export default function TestExecutionRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const runId = (params?.id as string) || "run-24";
  const caseId = (params?.caseId as string) || "tc-1";

  const [checkedSteps, setCheckedSteps] = React.useState<
    Record<number, boolean>
  >({});
  const [actualResult, setActualResult] = React.useState("");
  const [failureReason, setFailureReason] = React.useState("");
  const [isFilingBug, setIsFilingBug] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Mock test case data
  const testCase = {
    id: caseId,
    key: "TC-PAY-021",
    title: "Payment transaction via Telebirr gateway",
    suite: "Payment Gateways > Telebirr",
    preconditions:
      "Cart has items totaling > 0 ETB. Valid test mobile number provided.",
    expectedResult: "Order is marked as PAID and invoice receipt is generated.",
    priority: "CRITICAL",
    type: "E2E",
    steps: [
      {
        stepNumber: 1,
        action: "Add 2 items to shopping cart and proceed to checkout",
        expectedResult: "Order summary displays correct total and taxes.",
      },
      {
        stepNumber: 2,
        action:
          "Select 'Telebirr' as payment provider and enter phone '+251911223344'",
        expectedResult: "Payment modal triggers USSD push request.",
      },
      {
        stepNumber: 3,
        action: "Confirm PIN on simulator and await server webhook response",
        expectedResult: "Webhook updates order status to COMPLETED.",
      },
    ],
  };

  const toggleStep = (stepNumber: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const handleRecordResult = async (status: "PASS" | "FAIL" | "BLOCKED") => {
    if (status === "FAIL") {
      setIsFilingBug(true);
      return;
    }

    setIsSubmitting(true);
    await recordTestExecution({
      executionId: `${runId}-${caseId}`,
      status,
      actualResult:
        status === "PASS"
          ? "Verified step by step without defects."
          : "Blocked by dependency.",
    });
    setIsSubmitting(false);
    router.push(`/test-runs/${runId}`);
  };

  const handleConfirmFailAndCreateBug = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await recordTestExecution({
      executionId: `${runId}-${caseId}`,
      status: "FAIL",
      actualResult,
      failureReason,
    });

    await createBug({
      projectId: "p-ecom",
      key: "BUG-105",
      title: `${testCase.key}: ${failureReason || "Test execution failed"}`,
      description: `Execution in ${runId} failed at step.`,
      stepsToReproduce: testCase.steps
        .map((s) => `${s.stepNumber}. ${s.action}`)
        .join("\n"),
      expectedResult: testCase.expectedResult,
      actualResult: actualResult,
      severity: "BLOCKER",
      priority: "CRITICAL",
      linkedTestCaseId: testCase.id,
      linkedTestRunId: runId,
    });

    setIsSubmitting(false);
    router.push(`/test-runs/${runId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href={`/test-runs/${runId}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Test Run
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {runId.toUpperCase()}
          </Badge>
          <span className="text-xs text-slate-400">Chrome 128 • Staging</span>
        </div>
      </div>

      {/* Main Execution Console */}
      <Card className="border shadow-lg">
        <CardHeader className="border-b pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                  {testCase.key}
                </span>
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-mono"
                >
                  {testCase.type}
                </Badge>
                <Badge variant="destructive" className="text-[10px] uppercase">
                  {testCase.priority}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {testCase.title}
              </CardTitle>
              <CardDescription className="text-xs">
                {testCase.suite}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Preconditions */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border text-xs space-y-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Preconditions:
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              {testCase.preconditions}
            </p>
          </div>

          {/* Step-by-Step Checklist */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Execution Steps (Check off as you verify):
            </h3>

            <div className="space-y-2.5">
              {testCase.steps.map((step) => {
                const isChecked = !!checkedSteps[step.stepNumber];
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                      isChecked
                        ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <p
                        className={`font-medium ${
                          isChecked
                            ? "text-emerald-900 dark:text-emerald-200 line-through opacity-80"
                            : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        <span className="font-bold mr-1.5 font-mono">
                          {step.stepNumber}.
                        </span>
                        {step.action}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        <b className="font-medium text-slate-600 dark:text-slate-400">
                          Expected:
                        </b>{" "}
                        {step.expectedResult}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
            <span className="font-semibold text-blue-900 dark:text-blue-300">
              Overall Expected Result:
            </span>
            <p className="text-blue-800 dark:text-blue-200">
              {testCase.expectedResult}
            </p>
          </div>

          {/* Execution Result Buttons */}
          <div className="pt-4 border-t space-y-4">
            <h3 className="text-sm font-bold text-center text-slate-900 dark:text-slate-100">
              Record Execution Outcome
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="pass"
                className="h-12 text-sm font-bold shadow-md"
                disabled={isSubmitting}
                onClick={() => handleRecordResult("PASS")}
              >
                <CheckCircle2 className="h-5 w-5 mr-1.5" />
                PASS
              </Button>

              <Button
                type="button"
                variant="fail"
                className="h-12 text-sm font-bold shadow-md"
                disabled={isSubmitting}
                onClick={() => handleRecordResult("FAIL")}
              >
                <XCircle className="h-5 w-5 mr-1.5" />
                FAIL
              </Button>

              <Button
                type="button"
                variant="blocked"
                className="h-12 text-sm font-bold shadow-md"
                disabled={isSubmitting}
                onClick={() => handleRecordResult("BLOCKED")}
              >
                <AlertTriangle className="h-5 w-5 mr-1.5" />
                BLOCKED
              </Button>
            </div>
          </div>

          {/* Failure & Bug Filing Modal / Drawer */}
          {isFilingBug && (
            <div className="p-5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 space-y-4 animate-in fade-in-50">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
                <Bug className="h-4 w-4" />
                <span>
                  Test Failed — Document Defect Details & Auto-Link Ticket
                </span>
              </div>

              <form
                onSubmit={handleConfirmFailAndCreateBug}
                className="space-y-3 text-xs"
              >
                <div className="space-y-1">
                  <Label
                    htmlFor="fail-reason"
                    className="text-rose-900 dark:text-rose-200 font-semibold"
                  >
                    Failure Reason / Error Summary
                  </Label>
                  <Input
                    id="fail-reason"
                    required
                    placeholder="e.g. Gateway webhook timed out with HTTP 504"
                    value={failureReason}
                    onChange={(e) => setFailureReason(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="act-res"
                    className="text-rose-900 dark:text-rose-200 font-semibold"
                  >
                    Actual Result Observed
                  </Label>
                  <textarea
                    id="act-res"
                    required
                    rows={2}
                    placeholder="Order remained stuck in PENDING status indefinitely"
                    value={actualResult}
                    onChange={(e) => setActualResult(e.target.value)}
                    className="w-full rounded-md border border-input bg-white dark:bg-slate-900 px-3 py-2 text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilingBug(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                        Recording & Linking Bug...
                      </>
                    ) : (
                      "Confirm FAIL & Create Linked Bug"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
