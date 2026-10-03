import {
  IPaymentProvider,
  InitiatePaymentParams,
  PaymentInitiationResult,
  PaymentStatus,
  VerifyPaymentParams,
  PaymentVerificationResult,
} from "./types";
import { db } from "@/lib/db";

export class MockPaymentProvider implements IPaymentProvider {
  name = "MOCK_PAY";

  /**
   * Generates a unique, standardized transaction reference
   */
  private generateReference(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `TJ-MOCK-${timestamp}-${random}`;
  }

  async initiatePayment(params: InitiatePaymentParams): Promise<PaymentInitiationResult> {
    const transactionReference = this.generateReference();

    // Create payment record in database with PENDING state
    await db.payment.create({
      data: {
        tipId: params.tipId,
        provider: this.name,
        transactionReference,
        amount: params.amount,
        currency: params.currency,
        status: "PENDING",
        paymentMethod: params.paymentMethod || "Telebirr",
        providerMetadata: JSON.stringify({
          supporterName: params.supporterName,
          supporterEmail: params.supporterEmail,
          initiatedAt: new Date().toISOString(),
          ...params.metadata,
        }),
      },
    });

    return {
      success: true,
      transactionReference,
      status: "PENDING",
      provider: this.name,
      checkoutUrl: `/tip/checkout/${transactionReference}`,
      message: "Payment initiated successfully in mock sandbox",
    };
  }

  async getPaymentStatus(transactionReference: string): Promise<PaymentStatus> {
    const payment = await db.payment.findUnique({
      where: { transactionReference },
      select: { status: true },
    });

    return (payment?.status as PaymentStatus) || "FAILED";
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult> {
    const payment = await db.payment.findUnique({
      where: { transactionReference: params.transactionReference },
      include: { tip: true },
    });

    if (!payment) {
      return {
        success: false,
        status: "FAILED",
        transactionReference: params.transactionReference,
        amount: 0,
        currency: "ETB",
        message: "Transaction not found",
      };
    }

    // Determine target status (allow simulated test failure or success)
    const targetStatus: PaymentStatus =
      params.simulateOutcome === "FAILED" ? "FAILED" : "COMPLETED";

    // Update payment and tip atomically
    await db.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: targetStatus,
          providerMetadata: JSON.stringify({
            ...JSON.parse(payment.providerMetadata || "{}"),
            verifiedAt: new Date().toISOString(),
            simulatedOutcome: params.simulateOutcome,
          }),
        },
      });

      await tx.tip.update({
        where: { id: payment.tipId },
        data: {
          status: targetStatus,
        },
      });

      // If completed and tied to a goal, increment goal currentAmount
      if (targetStatus === "COMPLETED" && payment.tip.goalId) {
        const goal = await tx.goal.findUnique({
          where: { id: payment.tip.goalId },
        });

        if (goal) {
          const newAmount = goal.currentAmount + payment.amount;
          const isCompleted = newAmount >= goal.targetAmount;

          await tx.goal.update({
            where: { id: goal.id },
            data: {
              currentAmount: newAmount,
              status: isCompleted ? "COMPLETED" : goal.status,
            },
          });
        }
      }
    });

    return {
      success: targetStatus === "COMPLETED",
      status: targetStatus,
      transactionReference: payment.transactionReference,
      amount: payment.amount,
      currency: payment.currency,
      paidAt: new Date(),
      message:
        targetStatus === "COMPLETED"
          ? "Payment verified successfully"
          : "Payment was declined/failed during verification",
    };
  }
}
