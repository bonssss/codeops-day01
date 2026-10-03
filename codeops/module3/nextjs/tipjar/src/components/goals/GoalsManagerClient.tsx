"use client";

import * as React from "react";
import { Plus, Target, Calendar, CheckCircle, Trash2, Edit2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createGoalAction, updateGoalAction, deleteGoalAction } from "@/actions/goals";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

interface GoalItem {
  id: string;
  title: string;
  description: string | null;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  deadline: string | null;
  imageUrl: string | null;
  status: string;
  createdAt: string;
}

export function GoalsManagerClient({
  goals,
  currency,
}: {
  goals: GoalItem[];
  currency: string;
}) {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingGoal, setEditingGoal] = React.useState<GoalItem | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Form State
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [targetAmount, setTargetAmount] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [status, setStatus] = React.useState("ACTIVE");

  const openCreateModal = () => {
    setEditingGoal(null);
    setTitle("");
    setDescription("");
    setTargetAmount("");
    setDeadline("");
    setImageUrl("");
    setStatus("ACTIVE");
    setModalOpen(true);
  };

  const openEditModal = (goal: GoalItem) => {
    setEditingGoal(goal);
    setTitle(goal.title);
    setDescription(goal.description || "");
    setTargetAmount(goal.targetAmount.toString());
    setDeadline(goal.deadline ? goal.deadline.split("T")[0] : "");
    setImageUrl(goal.imageUrl || "");
    setStatus(goal.status);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetAmount) {
      toast({ title: "Validation Error", description: "Title and target amount are required", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        description,
        targetAmount: parseFloat(targetAmount),
        currency,
        deadline: deadline || null,
        imageUrl: imageUrl || null,
        status: status as "ACTIVE" | "COMPLETED" | "PAUSED" | "CANCELLED",
      };

      if (editingGoal) {
        const res = await updateGoalAction(editingGoal.id, payload);
        if (res.success) {
          toast({ title: "Goal Updated", description: "Goal details saved successfully", type: "success" });
          setModalOpen(false);
        } else {
          toast({ title: "Error", description: res.error || "Failed to update goal", type: "error" });
        }
      } else {
        const res = await createGoalAction(payload);
        if (res.success) {
          toast({ title: "Goal Created", description: "Your new goal is live on your tipping page", type: "success" });
          setModalOpen(false);
        } else {
          toast({ title: "Error", description: res.error || "Failed to create goal", type: "error" });
        }
      }
    } catch {
      toast({ title: "Error", description: "An unexpected error occurred", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this goal?")) return;
    try {
      const res = await deleteGoalAction(id);
      if (res.success) {
        toast({ title: "Goal Deleted", description: "The goal has been removed", type: "success" });
      } else {
        toast({ title: "Error", description: res.error || "Failed to delete goal", type: "error" });
      }
    } catch {
      toast({ title: "Error", description: "Could not delete goal", type: "error" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Your Creator Milestones</h2>
          <p className="text-xs text-neutral-400">
            Set ambitious targets for equipment, software, courses, or creative projects
          </p>
        </div>
        <Button onClick={openCreateModal} variant="default" size="sm" className="gap-2 font-semibold">
          <Plus className="h-4 w-4" />
          <span>New Goal</span>
        </Button>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4">
          <div className="h-16 w-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl">
            🎯
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No goals created yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Setting up a clear support goal gives your audience a concrete reason to tip and be part of your success.
            </p>
          </div>
          <Button onClick={openCreateModal} variant="default" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Create First Goal</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const percentage = Math.min(
              100,
              Math.round((goal.currentAmount / goal.targetAmount) * 100)
            );
            const isCompleted = goal.status === "COMPLETED" || percentage >= 100;

            return (
              <div
                key={goal.id}
                className="glass-card rounded-3xl p-6 relative flex flex-col justify-between border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base leading-tight">
                          {goal.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        {isCompleted ? (
                          <Badge variant="success" className="text-[10px]">
                            Completed 🎉
                          </Badge>
                        ) : goal.status === "ACTIVE" ? (
                          <Badge variant="default" className="text-[10px]">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">
                            {goal.status}
                          </Badge>
                        )}
                        {goal.deadline && (
                          <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-amber-400" />
                            {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(goal)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Edit Goal"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(goal.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        title="Delete Goal"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {goal.description && (
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {goal.description}
                    </p>
                  )}

                  {/* Progress info */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-amber-400">
                        {formatCurrency(goal.currentAmount, goal.currency)}
                      </span>
                      <span className="text-neutral-400">
                        Target: {formatCurrency(goal.targetAmount, goal.currency)}
                      </span>
                    </div>
                    <Progress value={goal.currentAmount} max={goal.targetAmount} className="h-3" />
                    <div className="text-right text-[11px] font-bold text-neutral-400">
                      {percentage}% achieved
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Goal Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent onClose={() => setModalOpen(false)} className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingGoal ? "Edit Goal" : "Create New Goal"}</DialogTitle>
            <DialogDescription>
              Supporters can contribute toward this goal when tipping on your page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Goal Title *</label>
              <Input
                required
                placeholder="e.g. 🎯 New M3 MacBook Pro for Coding"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Description</label>
              <Textarea
                placeholder="Why is this goal important? How will it help your work?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Target Amount ({currency}) *
                </label>
                <Input
                  type="number"
                  required
                  min="1"
                  step="any"
                  placeholder="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Target Deadline</label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="ACTIVE">Active (Shown on Tip Page)</option>
                <option value="COMPLETED">Completed</option>
                <option value="PAUSED">Paused</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="w-1/2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="w-1/2 font-bold"
              >
                {loading ? "Saving..." : editingGoal ? "Update Goal" : "Create Goal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
