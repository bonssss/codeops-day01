"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTestRun } from "@/actions/test-runs";
import { PlaySquare, X, Loader2, Plus, Check } from "lucide-react";

interface CreateRunDialogProps {
  projectId?: string;
}

const AVAILABLE_TESTS = [
  {
    id: "tc1",
    key: "TC-AUTH-001",
    title: "Login with valid email and password",
  },
  { id: "tc2", key: "TC-AUTH-002", title: "MFA code verification timeout" },
  {
    id: "tc3",
    key: "TC-PAY-021",
    title: "Payment transaction via Telebirr gateway",
  },
  {
    id: "tc4",
    key: "TC-CHK-014",
    title: "Prevent checkout button action on empty cart",
  },
];

export function CreateRunDialog({
  projectId = "p-ecom",
}: CreateRunDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("Sprint 43 - Regression Test Run");
  const [environment, setEnvironment] = React.useState("Staging");
  const [browser, setBrowser] = React.useState("Chrome 128");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([
    "tc1",
    "tc2",
    "tc3",
    "tc4",
  ]);
  const [isPending, setIsPending] = React.useState(false);

  const toggleTest = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    await createTestRun(projectId, name, environment, browser, selectedIds);
    setIsPending(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)} className="text-xs">
        <Plus className="h-3.5 w-3.5 mr-1" />
        Create Test Run
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-lg rounded-xl border bg-white dark:bg-slate-900 shadow-2xl p-6 z-50 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                  <PlaySquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Start Execution Session
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure environment and select test case scope
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
              <div className="space-y-1.5">
                <Label htmlFor="run-name">Run Name</Label>
                <Input
                  id="run-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="run-env">Target Environment</Label>
                  <select
                    id="run-env"
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="Staging">Staging</option>
                    <option value="Production-Mirror">Production-Mirror</option>
                    <option value="QA-Dev">QA-Dev</option>
                    <option value="UAT">UAT</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="run-browser">Browser / Device</Label>
                  <select
                    id="run-browser"
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="Chrome 128">Chrome 128</option>
                    <option value="Firefox 129">Firefox 129</option>
                    <option value="Safari 17">Safari 17</option>
                    <option value="Edge 128">Edge 128</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold text-xs">
                    Select Test Cases ({selectedIds.length}/
                    {AVAILABLE_TESTS.length})
                  </Label>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIds(
                        selectedIds.length === AVAILABLE_TESTS.length
                          ? []
                          : AVAILABLE_TESTS.map((t) => t.id),
                      )
                    }
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    {selectedIds.length === AVAILABLE_TESTS.length
                      ? "Deselect all"
                      : "Select all"}
                  </button>
                </div>

                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {AVAILABLE_TESTS.map((tc) => {
                    const isSelected = selectedIds.includes(tc.id);
                    return (
                      <div
                        key={tc.id}
                        onClick={() => toggleTest(tc.id)}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono font-bold text-[11px] text-blue-600">
                            {tc.key}
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 truncate">
                            {tc.title}
                          </span>
                        </div>
                        <div
                          className={`h-4 w-4 rounded flex items-center justify-center border ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      </div>
                    );
                  })}
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
                  size="sm"
                  disabled={isPending || selectedIds.length === 0}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                      Launching...
                    </>
                  ) : (
                    "Launch Test Run"
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
