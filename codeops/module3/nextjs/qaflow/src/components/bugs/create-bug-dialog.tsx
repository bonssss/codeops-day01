"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBug } from "@/actions/bugs";
import { Bug, X, Loader2, Plus } from "lucide-react";

interface CreateBugDialogProps {
  projectId?: string;
  defaultTestCaseKey?: string;
  defaultTestRunId?: string;
  defaultFailureReason?: string;
  defaultActualResult?: string;
}

export function CreateBugDialog({
  projectId = "p-ecom",
  defaultTestCaseKey,
  defaultTestRunId,
  defaultFailureReason,
  defaultActualResult,
}: CreateBugDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState(defaultFailureReason || "");
  const [key, setKey] = React.useState("BUG-105");
  const [stepsToReproduce, setStepsToReproduce] = React.useState("");
  const [expectedResult, setExpectedResult] = React.useState("");
  const [actualResult, setActualResult] = React.useState(
    defaultActualResult || "",
  );
  const [severity, setSeverity] = React.useState<
    "TRIVIAL" | "MINOR" | "MAJOR" | "CRITICAL" | "BLOCKER"
  >("MAJOR");
  const [priority, setPriority] = React.useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >("HIGH");
  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    await createBug({
      projectId,
      key,
      title,
      stepsToReproduce,
      expectedResult,
      actualResult,
      severity,
      priority,
      linkedTestRunId: defaultTestRunId,
    });

    setIsPending(false);
    setIsOpen(false);
    setTitle("");
  };

  return (
    <>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => setIsOpen(true)}
        className="text-xs"
      >
        <Plus className="h-3.5 w-3.5 mr-1" />
        Report Bug
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border bg-white dark:bg-slate-900 shadow-2xl p-6 z-50 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 sticky -top-6 bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                  <Bug className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    File Defect Ticket
                  </h3>
                  <p className="text-xs text-slate-500">
                    {defaultTestCaseKey
                      ? `Linked to ${defaultTestCaseKey}`
                      : "Document reproduction steps and failure logs"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="bug-title">Bug Summary</Label>
                  <Input
                    id="bug-title"
                    required
                    placeholder="e.g. Telebirr gateway timeout on cart total > 10,000"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bug-key">Ticket Key</Label>
                  <Input
                    id="bug-key"
                    required
                    value={key}
                    onChange={(e) => setKey(e.target.value.toUpperCase())}
                    disabled={isPending}
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="bug-sev">Severity</Label>
                  <select
                    id="bug-sev"
                    value={severity}
                    onChange={(e) =>
                      setSeverity(
                        e.target.value as
                          | "TRIVIAL"
                          | "MINOR"
                          | "MAJOR"
                          | "CRITICAL"
                          | "BLOCKER",
                      )
                    }
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="BLOCKER">BLOCKER</option>
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="MAJOR">MAJOR</option>
                    <option value="MINOR">MINOR</option>
                    <option value="TRIVIAL">TRIVIAL</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bug-pri">Priority</Label>
                  <select
                    id="bug-pri"
                    value={priority}
                    onChange={(e) =>
                      setPriority(
                        e.target.value as
                          "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
                      )
                    }
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bug-steps">Steps to Reproduce</Label>
                <textarea
                  id="bug-steps"
                  rows={3}
                  placeholder="1. Navigate to checkout...&#10;2. Select payment method...&#10;3. Click confirm button..."
                  value={stepsToReproduce}
                  onChange={(e) => setStepsToReproduce(e.target.value)}
                  disabled={isPending}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="bug-exp">Expected Result</Label>
                  <textarea
                    id="bug-exp"
                    rows={2}
                    placeholder="System completes order and shows receipt"
                    value={expectedResult}
                    onChange={(e) => setExpectedResult(e.target.value)}
                    disabled={isPending}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bug-act">Actual Result</Label>
                  <textarea
                    id="bug-act"
                    rows={2}
                    placeholder="Gateway timed out with 504 error"
                    value={actualResult}
                    onChange={(e) => setActualResult(e.target.value)}
                    disabled={isPending}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                      Filing Ticket...
                    </>
                  ) : (
                    "Submit Bug Ticket"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
