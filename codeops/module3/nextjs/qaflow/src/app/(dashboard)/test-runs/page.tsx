import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateRunDialog } from "@/components/test-runs/create-run-dialog";
import { PlaySquare, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function TestRunsPage() {
  const testRuns = [
    {
      id: "run-24",
      runNumber: 24,
      name: "Sprint 42 - Regression Test Run",
      project: "E-Commerce Platform (ECOM)",
      environment: "Staging",
      browser: "Chrome 128",
      passed: 98,
      failed: 17,
      blocked: 5,
      notRun: 4,
      status: "COMPLETED",
      executedBy: "Sarah Jenkins",
    },
    {
      id: "run-23",
      runNumber: 23,
      name: "Banking Core - Wire Transfer Smoke",
      project: "Banking Portal (BANK)",
      environment: "Production-Mirror",
      browser: "Firefox 129",
      passed: 16,
      failed: 0,
      blocked: 0,
      notRun: 0,
      status: "COMPLETED",
      executedBy: "Bonsa Tesfaye",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PlaySquare className="h-6 w-6 text-purple-600" />
            Test Execution Runs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track multi-environment test runs, pass/fail results, and execution
            sessions
          </p>
        </div>
        <CreateRunDialog />
      </div>

      <div className="space-y-4">
        {testRuns.map((r) => (
          <Card
            key={r.id}
            className="border shadow-sm hover:border-purple-500/40 transition-colors"
          >
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    RUN #{r.runNumber}
                  </Badge>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {r.name}
                  </h3>
                  <Badge variant="pass" className="text-[10px] uppercase">
                    {r.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>
                    Project: <b>{r.project}</b>
                  </span>
                  <span>•</span>
                  <span>Env: {r.environment}</span>
                  <span>•</span>
                  <span>Browser: {r.browser}</span>
                  <span>•</span>
                  <span>Tester: {r.executedBy}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="font-bold">{r.passed}</span> Pass
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-md border border-rose-200 dark:border-rose-800">
                  <XCircle className="h-3.5 w-3.5" />
                  <span className="font-bold">{r.failed}</span> Fail
                </div>
                {r.blocked > 0 && (
                  <div className="flex items-center gap-1.5 text-xs bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span className="font-bold">{r.blocked}</span> Blocked
                  </div>
                )}
                <Link href={`/test-runs/${r.id}`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    View Run
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
