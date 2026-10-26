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
    const isMock = paymentMethod?.toLowerCase() === "mock";
    const providerName = isMock ? "MOCK_PAY" : "CHAPA";
    const provider = getPaymentProvider(providerName);
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

    if (!initiationResult.success && !initiationResult.checkoutUrl && providerName === "CHAPA") {
      return {
        success: false,
        error: initiationResult.message || "Failed to initialize payment with Chapa",
      };
    }

    return {
      success: true,
      tipId: tip.id,
      transactionReference: initiationResult.transactionReference,
      amount,
      currency,
      creatorName: recipientProfile.displayName,
      creatorUsername: recipientProfile.username,
      paymentMethod,
      provider: providerName,
      checkoutUrl: initiationResult.checkoutUrl,
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

    const { transactionReference, simulateOutcome, provider: requestedProvider } = validated.data;

    // Determine payment provider from DB or request
    const existingPayment = await db.payment.findUnique({
      where: { transactionReference },
      select: { provider: true },
    });

    const providerName = requestedProvider || existingPayment?.provider || "CHAPA";
    const provider = getPaymentProvider(providerName);
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
      try {
        revalidatePath(`/tip/${payment.tip.recipient.profile.username}`);
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tips");
        revalidatePath("/dashboard/goals");
        revalidatePath("/dashboard/analytics");
      } catch {
        // Safe to ignore if outside Next.js request context (e.g. CLI script or webhook test)
      }
    }

    let meta: Record<string, any> = {};
    try {
      meta = JSON.parse(payment?.providerMetadata || "{}");
    } catch {}

    const rawData = (result.rawResponse as any)?.data || meta.chapaResponse?.data;
    const chapaRef =
      rawData?.chapa_reference ||
      `HC${result.transactionReference.replace(/[^A-Za-z0-9]/g, "").slice(-10)}`;
    const phone = rawData?.customer?.phone_number || "251922222222";
    const amountVal = result.amount || payment?.amount || 100;
    const charge = rawData?.service_fee
      ? +(rawData.service_fee / 100).toFixed(2)
      : +(amountVal * 0.0288).toFixed(2);

    return {
      success: result.success,
      status: result.status,
      transactionReference: result.transactionReference,
      chapaReference: chapaRef,
      amount: amountVal,
      charge,
      currency: result.currency || payment?.currency || "ETB",
      creatorName: payment?.tip.recipient.profile?.displayName || "Creator",
      creatorUsername: payment?.tip.recipient.profile?.username,
      creatorAvatarUrl: payment?.tip.recipient.profile?.avatarUrl,
      paymentMethod: payment?.paymentMethod || "test",
      provider: payment?.provider || "CHAPA",
      message: result.message,
      supporterName: payment?.tip.supporterName || "N/A",
      supporterPhone: phone,
      supporterEmail: payment?.tip.supporterEmail || "N/A",
      tipMessage: payment?.tip.message,
      goalTitle: payment?.tip.goal?.title,
      paidAt: result.paidAt ? result.paidAt.toISOString() : (payment?.updatedAt?.toISOString() || new Date().toISOString()),
      merchantName: "Bons DEv",
      merchantTin: "1234567890",
      merchantPhone: "251938756685",
      merchantAddress: "Test Address",
    };
  } catch (err: unknown) {
    console.error("Process payment error:", err);
    return { success: false, error: "Payment verification failed" };
  }
}

export async function syncPendingTransactionsAction(): Promise<{
  success: boolean;
  error?: string;
  updatedCount: number;
  updatedRefs: string[];
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: "Unauthorized", updatedCount: 0, updatedRefs: [] };
    }

    const pendingPayments = await db.payment.findMany({
      where: {
        status: "PENDING",
        tip: { recipientId: session.id },
      },
      include: { tip: true },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    let updatedCount = 0;
    const updatedRefs: string[] = [];

    for (const payment of pendingPayments) {
      try {
        const provider = getPaymentProvider(payment.provider);
        const result = await provider.verifyPayment({
          transactionReference: payment.transactionReference,
        });

        if (result.success && result.status === "COMPLETED") {
          updatedCount++;
          updatedRefs.push(payment.transactionReference);
        }
      } catch (e) {
        console.warn(`Failed to verify ${payment.transactionReference}:`, e);
      }
    }

    if (updatedCount > 0) {
      try {
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/tips");
        revalidatePath("/dashboard/goals");
        revalidatePath("/dashboard/analytics");
      } catch {}
    }

    return {
      success: true,
      updatedCount,
      updatedRefs,
      message:
        updatedCount > 0
          ? `Successfully verified and confirmed ${updatedCount} transaction${updatedCount > 1 ? "s" : ""}!`
          : "All pending transactions were checked. No new confirmed payments found.",
    };
  } catch (err: unknown) {
    console.error("Sync pending transactions error:", err);
    return { success: false, error: "Failed to sync transactions", updatedCount: 0, updatedRefs: [] };
  }
}


