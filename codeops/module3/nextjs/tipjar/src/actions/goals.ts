"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { GoalSchema } from "@/lib/validations/goal";
import { revalidatePath } from "next/cache";

export async function createGoalAction(data: unknown) {
  try {
    const session = await requireAuth();
    const validated = GoalSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid goal data",
      };
    }

    const { title, description, targetAmount, currency, deadline, imageUrl, status } =
      validated.data;

    const goal = await db.goal.create({
      data: {
        userId: session.id,
        title,
        description: description || null,
        targetAmount,
        currency: currency || "ETB",
        deadline: deadline ? new Date(deadline) : null,
        imageUrl: imageUrl || null,
        status: status || "ACTIVE",
      },
    });

    revalidatePath("/dashboard/goals");
    revalidatePath("/dashboard");
    if (session.username) {
      revalidatePath(`/tip/${session.username}`);
    }

    return { success: true, goal };
  } catch (err: unknown) {
    console.error("Create goal error:", err);
    return { success: false, error: "Failed to create goal" };
  }
}

export async function updateGoalAction(goalId: string, data: unknown) {
  try {
    const session = await requireAuth();
    const validated = GoalSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid goal data",
      };
    }

    const existing = await db.goal.findUnique({
      where: { id: goalId },
    });

    if (!existing || existing.userId !== session.id) {
      return { success: false, error: "Goal not found or unauthorized" };
    }

    const { title, description, targetAmount, currency, deadline, imageUrl, status } =
      validated.data;

    const goal = await db.goal.update({
      where: { id: goalId },
      data: {
        title,
        description: description || null,
        targetAmount,
        currency: currency || "ETB",
        deadline: deadline ? new Date(deadline) : null,
        imageUrl: imageUrl || null,
        status,
      },
    });

    revalidatePath("/dashboard/goals");
    revalidatePath("/dashboard");
    if (session.username) {
      revalidatePath(`/tip/${session.username}`);
    }

    return { success: true, goal };
  } catch (err: unknown) {
    console.error("Update goal error:", err);
    return { success: false, error: "Failed to update goal" };
  }
}

export async function deleteGoalAction(goalId: string) {
  try {
    const session = await requireAuth();

    const existing = await db.goal.findUnique({
      where: { id: goalId },
    });

    if (!existing || existing.userId !== session.id) {
      return { success: false, error: "Goal not found or unauthorized" };
    }

    await db.goal.delete({
      where: { id: goalId },
    });

    revalidatePath("/dashboard/goals");
    revalidatePath("/dashboard");
    if (session.username) {
      revalidatePath(`/tip/${session.username}`);
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Delete goal error:", err);
    return { success: false, error: "Failed to delete goal" };
  }
}
