"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/actions/projects";
import { Plus, X, Loader2, FolderPlus } from "lucide-react";

export function CreateProjectDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [key, setKey] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  // Auto-generate key from name if not touched
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!key || key.length < 5) {
      const generated = val
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 4)
        .toUpperCase();
      setKey(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("key", key);
    formData.append("description", description);

    await createProject(null, formData);
    setIsPending(false);
    setIsOpen(false);
    setName("");
    setKey("");
    setDescription("");
  };

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)} className="text-xs">
        <Plus className="h-3.5 w-3.5 mr-1" />
        Create Project
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md rounded-xl border bg-white dark:bg-slate-900 shadow-2xl p-6 z-50 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                  <FolderPlus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Create New Project
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure a new testing workspace
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
                <Label htmlFor="proj-name">Project Name</Label>
                <Input
                  id="proj-name"
                  required
                  placeholder="e.g. Payments Gateway Microservice"
                  value={name}
                  onChange={handleNameChange}
                  disabled={isPending}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="proj-key">Project Key</Label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Used for TC-KEY-001 prefixes
                  </span>
                </div>
                <Input
                  id="proj-key"
                  required
                  maxLength={6}
                  placeholder="e.g. PAY"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  disabled={isPending}
                  className="font-mono uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-desc">Description (Optional)</Label>
                <textarea
                  id="proj-desc"
                  rows={3}
                  placeholder="Brief description of application scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isPending}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
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
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                      Creating...
                    </>
                  ) : (
                    "Create Workspace"
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
