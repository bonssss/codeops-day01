"use server";

import { db } from "@/lib/db";
import { CreateTipSchema, ProcessPaymentSchema } from "@/lib/validations/tip";
import { getPaymentProvider } from "@/lib/payments/provider";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createTipAction(data: unknown) {
  try {
    const validated = CreateTipSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid tip parameters",
      };
    }

    const {
      recipientUsername,
      amount,
      currency,
      supporterName,
      supporterEmail,
      message,
      isAnonymous,
      goalId,
      paymentMethod,
    } = validated.data;

    // Find recipient profile
    const recipientProfile = await db.profile.findUnique({
      where: { username: recipientUsername },
      include: { user: true },
    });

    if (!recipientProfile) {
      return { success: false, error: "Creator not found" };
    }

    // Check optional logged-in sender
    const session = await getSession();

    // Verify goal if provided
    let verifiedGoalId: string | null = null;
    if (goalId) {
      const goal = await db.goal.findUnique({
        where: { id: goalId },
      });
      if (goal && goal.userId === recipientProfile.userId) {
        verifiedGoalId = goal.id;
      }
    }

    // Create pending tip
    const tip = await db.tip.create({
      data: {
        recipientId: recipientProfile.userId,
        senderId: session ? session.id : null,
        supporterName: isAnonymous ? "Anonymous" : supporterName || (session ? session.name : "Supporter"),
        supporterEmail: supporterEmail || (session ? session.email : null),
        amount,
        currency,
        message: message?.trim() || null,
        isAnonymous,
        status: "PENDING",
        goalId: verifiedGoalId,
      },
    });

    // Initiate payment through payment abstraction
    const provider = getPaymentProvider("MOCK_PAY");
    const initiationResult = await provider.initiatePayment({
      tipId: tip.id,
      amount,
      currency,
      supporterName: tip.supporterName,
      supporterEmail: tip.supporterEmail,
      paymentMethod,
      metadata: {
        recipientUsername,
        recipientDisplayName: recipientProfile.displayName,
        goalId: verifiedGoalId,
      },
    });

    return {
      success: true,
      tipId: tip.id,
      transactionReference: initiationResult.transactionReference,
      amount,
      currency,
      creatorName: recipientProfile.displayName,
      creatorUsername: recipientProfile.username,
      paymentMethod,
    };
  } catch (err: unknown) {
    console.error("Create tip error:", err);
    return { success: false, error: "Failed to initiate tip payment" };
  }
}

export async function processPaymentAction(data: unknown) {
  try {
    const validated = ProcessPaymentSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid payment data",
      };
    }

    const { transactionReference, simulateOutcome } = validated.data;

    const provider = getPaymentProvider("MOCK_PAY");
    const result = await provider.verifyPayment({
      transactionReference,
      simulateOutcome,
    });

    // Fetch refreshed tip & creator details
    const payment = await db.payment.findUnique({
      where: { transactionReference },
      include: {
        tip: {
          include: {
            recipient: {
              include: { profile: true },
            },
            goal: true,
          },
        },
      },
    });

    if (payment?.tip.recipient.profile?.username) {
      revalidatePath(`/tip/${payment.tip.recipient.profile.username}`);
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/tips");
      revalidatePath("/dashboard/goals");
      revalidatePath("/dashboard/analytics");
    }

    return {
      success: result.success,
      status: result.status,
      transactionReference: result.transactionReference,
      amount: result.amount,
      currency: result.currency,
      creatorName: payment?.tip.recipient.profile?.displayName || "Creator",
      creatorUsername: payment?.tip.recipient.profile?.username,
      message: result.message,
      supporterName: payment?.tip.supporterName,
      tipMessage: payment?.tip.message,
      paidAt: result.paidAt ? result.paidAt.toISOString() : new Date().toISOString(),
    };
  } catch (err: unknown) {
    console.error("Process payment error:", err);
    return { success: false, error: "Payment verification failed" };
  }
}
