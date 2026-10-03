"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTestCase } from "@/actions/test-cases";
import { Plus, Trash2, X, Loader2, FilePlus } from "lucide-react";

interface StepItem {
  id: string;
  stepNumber: number;
  action: string;
  expectedResult: string;
}

interface TestCaseEditorDialogProps {
  projectId?: string;
  suiteId?: string;
}

export function TestCaseEditorDialog({
  projectId = "p-ecom",
  suiteId,
}: TestCaseEditorDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [key, setKey] = React.useState("TC-AUTH-003");
  const [description, setDescription] = React.useState("");
  const [preconditions, setPreconditions] = React.useState("");
  const [expectedResult, setExpectedResult] = React.useState("");
  const [priority, setPriority] = React.useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >("MEDIUM");
  const [type, setType] = React.useState<
    | "FUNCTIONAL"
    | "REGRESSION"
    | "SMOKE"
    | "SANITY"
    | "INTEGRATION"
    | "E2E"
    | "PERFORMANCE"
    | "SECURITY"
  >("FUNCTIONAL");
  const [status, setStatus] = React.useState<
    "DRAFT" | "READY" | "ACTIVE" | "DEPRECATED"
  >("ACTIVE");
  const [isPending, setIsPending] = React.useState(false);

  const [steps, setSteps] = React.useState<StepItem[]>([
    {
      id: "s1",
      stepNumber: 1,
      action: "Navigate to page",
      expectedResult: "Page loads within 200ms",
    },
    {
      id: "s2",
      stepNumber: 2,
      action: "Submit input data",
      expectedResult: "Confirmation banner is shown",
    },
  ]);

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        id: `s-${Date.now()}`,
        stepNumber: prev.length + 1,
        action: "",
        expectedResult: "",
      },
    ]);
  };

  const removeStep = (index: number) => {
    setSteps((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      return filtered.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    });
  };

  const updateStep = (
    index: number,
    field: "action" | "expectedResult",
    value: string,
  ) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    await createTestCase({
      projectId,
      suiteId,
      key,
      title,
      description,
      preconditions,
      expectedResult,
      priority,
      type,
      status,
      steps: steps.map((s) => ({
        stepNumber: s.stepNumber,
        action: s.action,
        expectedResult: s.expectedResult,
      })),
    });

    setIsPending(false);
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setPreconditions("");
    setExpectedResult("");
  };

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)} className="text-xs">
        <Plus className="h-3.5 w-3.5 mr-1" />
        New Test Case
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border bg-white dark:bg-slate-900 shadow-2xl p-6 z-50 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 sticky -top-6 bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                  <FilePlus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Create Test Case
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define test steps, preconditions, and verification criteria
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
                  <Label htmlFor="tc-title">Title</Label>
                  <Input
                    id="tc-title"
                    required
                    placeholder="e.g. Verify password reset token expiration"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tc-key">Case Key</Label>
                  <Input
                    id="tc-key"
                    required
                    value={key}
                    onChange={(e) => setKey(e.target.value.toUpperCase())}
                    disabled={isPending}
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="tc-priority">Priority</Label>
                  <select
                    id="tc-priority"
                    value={priority}
                    onChange={(e) =>
                      setPriority(
                        e.target.value as
                          "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
                      )
                    }
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tc-type">Test Type</Label>
                  <select
                    id="tc-type"
                    value={type}
                    onChange={(e) =>
                      setType(
                        e.target.value as
                          | "FUNCTIONAL"
                          | "REGRESSION"
                          | "SMOKE"
                          | "SANITY"
                          | "INTEGRATION"
                          | "E2E"
                          | "PERFORMANCE"
                          | "SECURITY",
                      )
                    }
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="FUNCTIONAL">FUNCTIONAL</option>
                    <option value="REGRESSION">REGRESSION</option>
                    <option value="SMOKE">SMOKE</option>
                    <option value="SANITY">SANITY</option>
                    <option value="INTEGRATION">INTEGRATION</option>
                    <option value="E2E">E2E</option>
                    <option value="PERFORMANCE">PERFORMANCE</option>
                    <option value="SECURITY">SECURITY</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tc-status">Status</Label>
                  <select
                    id="tc-status"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as
                          "DRAFT" | "READY" | "ACTIVE" | "DEPRECATED",
                      )
                    }
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="READY">READY</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DEPRECATED">DEPRECATED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tc-precond">Preconditions</Label>
                <Input
                  id="tc-precond"
                  placeholder="e.g. User has an active account with 2FA enabled"
                  value={preconditions}
                  onChange={(e) => setPreconditions(e.target.value)}
                  disabled={isPending}
                />
              </div>

              {/* Dynamic Steps List */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold text-xs">
                    Test Execution Steps
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStep}
                    className="text-[11px] h-7"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-2.5 rounded-lg border bg-slate-50/70 dark:bg-slate-900/60 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold font-mono text-[11px] text-blue-600 dark:text-blue-400">
                          Step #{step.stepNumber}
                        </span>
                        {steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStep(idx)}
                            className="text-slate-400 hover:text-rose-600 p-0.5"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Action: e.g. Click login button"
                          value={step.action}
                          onChange={(e) =>
                            updateStep(idx, "action", e.target.value)
                          }
                          className="w-full rounded border border-input bg-white dark:bg-slate-950 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                        <input
                          type="text"
                          placeholder="Expected Result: e.g. User redirected"
                          value={step.expectedResult}
                          onChange={(e) =>
                            updateStep(idx, "expectedResult", e.target.value)
                          }
                          className="w-full rounded border border-input bg-white dark:bg-slate-950 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tc-expected">Overall Expected Result</Label>
                <textarea
                  id="tc-expected"
                  rows={2}
                  placeholder="e.g. Dashboard displays with active session token"
                  value={expectedResult}
                  onChange={(e) => setExpectedResult(e.target.value)}
                  disabled={isPending}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                      Saving...
                    </>
                  ) : (
                    "Save Test Case"
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
