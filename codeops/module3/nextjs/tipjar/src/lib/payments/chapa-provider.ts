import https from "node:https";
import dns from "node:dns";
import {
  IPaymentProvider,
  InitiatePaymentParams,
  PaymentInitiationResult,
  PaymentStatus,
  VerifyPaymentParams,
  PaymentVerificationResult,
} from "./types";
import { db } from "@/lib/db";

// Chapa Global v2 (Default for dashboard.chapa.global accounts and CHAPA_TEST_PRIV_ keys)
const CHAPA_GLOBAL_API = "https://api.chapa.global/v2";
// Legacy Chapa v1 (for dashboard.chapa.co accounts and CHASECK_ keys)
const CHAPA_LEGACY_API = "https://api.chapa.co/v1";

interface ChapaV2HostedResponse {
  status?: string;
  message?: string;
  checkout_url?: string;
  data?: {
    checkout_url?: string;
    chapa_reference?: string;
    merchant_reference?: string;
  } | null;
}

interface ChapaV1InitResponse {
  message: string;
  status: "success" | "failed";
  data?: {
    checkout_url: string;
  } | null;
}

function chapaLookup(hostname: string, options: any, callback: any) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  if (hostname === "api.chapa.global") {
    if (options.all) {
      return callback(null, [
        { address: "35.176.76.32", family: 4 },
        { address: "35.177.178.241", family: 4 },
      ]);
    }
    return callback(null, "35.176.76.32", 4);
  }
  dns.lookup(hostname, options, callback);
}

const chapaAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 20000,
  maxSockets: 25,
});

function requestChapaV2<T>(
  path: string,
  method: "GET" | "POST",
  secretKey: string,
  body?: Record<string, unknown>,
  timeoutMs: number = 5000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : undefined;
    const req = https.request(
      {
        hostname: "api.chapa.global",
        path,
        method,
        agent: chapaAgent,
        headers: {
          Authorization: `Bearer ${secretKey}`,
          ...(payload
            ? {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload),
              }
            : {}),
        },
        lookup: chapaLookup,
        timeout: timeoutMs,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json as T);
          } catch {
            reject(new Error(`Invalid JSON response from Chapa: ${data.substring(0, 100)}`));
          }
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error(`Chapa API request timed out after ${timeoutMs}ms`));
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

export class ChapaPaymentProvider implements IPaymentProvider {
  name = "CHAPA";

  private get secretKey(): string {
    const key = process.env.CHAPA_SECRET_KEY || "CHAPA_TEST_PRIV_Up0afcvnnye1tBw0P4AH1yHTeFuf6o6aiQZT4JfO";
    return key.trim();
  }

  private get isGlobalV2(): boolean {
    // Keys starting with CHAPA_ are for dashboard.chapa.global (v2)
    return this.secretKey.startsWith("CHAPA_");
  }

  private get appUrl(): string {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  }

  /**
   * Generates a unique transaction reference (kept <= 20 chars for Chapa v2 constraint)
   */
  private generateReference(): string {
    const time = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TJ-${time}-${rand}`; // length: ~16 characters
  }

  async initiatePayment(params: InitiatePaymentParams): Promise<PaymentInitiationResult> {
    const transactionReference = this.generateReference();

    // Split name into first and last
    const rawName = (params.supporterName || "Supporter User").trim();
    const nameParts = rawName.split(" ");
    const firstName = nameParts[0] || "Supporter";
    const lastName = nameParts.slice(1).join(" ") || "User";

    const email =
      params.supporterEmail && params.supporterEmail.includes("@")
        ? params.supporterEmail.trim()
        : `supporter-${transactionReference.toLowerCase()}@tipjar.io`;

    // Chapa v2 strictly requires URLs to start with https://
    const baseHttpsUrl = this.appUrl.startsWith("https://")
      ? this.appUrl
      : this.appUrl.replace(/^http:\/\//, "https://");

    const returnUrl = `${baseHttpsUrl}/tip/callback?tx_ref=${transactionReference}`;
    const callbackUrl = `${baseHttpsUrl}/api/webhooks/chapa`;

    // 1. Create PENDING payment record in database
    await db.payment.create({
      data: {
        tipId: params.tipId,
        provider: this.name,
        transactionReference,
        amount: params.amount,
        currency: params.currency || "ETB",
        status: "PENDING",
        paymentMethod: params.paymentMethod || "Chapa",
        providerMetadata: JSON.stringify({
          supporterName: params.supporterName,
          supporterEmail: email,
          initiatedAt: new Date().toISOString(),
          ...params.metadata,
        }),
      },
    });

    // 2. Call appropriate Chapa API (v2 on chapa.global or v1 on chapa.co)
    if (this.isGlobalV2) {
      try {
        console.log(`[Chapa v2] Calling ${CHAPA_GLOBAL_API}/payments/hosted for ref ${transactionReference}...`);
        const payload: Record<string, unknown> = {
          amount: Math.round(params.amount * 100), // integer cents in v2
          currency: params.currency || "ETB",
          merchant_reference: transactionReference,
          customer: {
            first_name: firstName,
            last_name: lastName,
            email,
          },
          return_url: returnUrl,
          callback_url: callbackUrl,
        };

        const data = await requestChapaV2<ChapaV2HostedResponse>(
          "/v2/payments/hosted",
          "POST",
          this.secretKey,
          payload,
          8000
        );
        console.log("[Chapa v2 Response]:", data);

        const checkoutUrl = data.checkout_url || data.data?.checkout_url;
        if (checkoutUrl) {
          return {
            success: true,
            transactionReference,
            status: "PENDING",
            provider: this.name,
            checkoutUrl,
            message: "Chapa v2 hosted checkout created successfully",
          };
        }

        // If v2 returns error or not ready, fallback message
        return {
          success: false,
          transactionReference,
          status: "FAILED",
          provider: this.name,
          message: data.message || "Failed to initialize Chapa Global v2 payment",
        };
      } catch (err: unknown) {
        console.error("Chapa v2 error:", err instanceof Error ? err.message : err);
        return {
          success: false,
          transactionReference,
          status: "FAILED",
          provider: this.name,
          message: "Could not reach Chapa API. Please verify network connectivity.",
        };
      }
    }

    // Fallback: Legacy Chapa v1 endpoint (only for legacy CHASECK_ keys)
    try {
      console.log(`[Chapa v1] Calling ${CHAPA_LEGACY_API}/transaction/initialize...`);
      const response = await fetch(`${CHAPA_LEGACY_API}/transaction/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: params.amount.toString(),
          currency: params.currency || "ETB",
          email,
          first_name: firstName,
          last_name: lastName,
          tx_ref: transactionReference,
          callback_url: callbackUrl,
          return_url: returnUrl,
          "customization[title]": `Tip to ${(params.metadata?.recipientDisplayName as string) || "Creator"}`,
          "customization[description]": "Thank you for supporting my work via TipJar!",
        }),
      });

      const data: ChapaV1InitResponse = await response.json();
      console.log("[Chapa v1 Response]:", data);

      if (data.status === "success" && data.data?.checkout_url) {
        return {
          success: true,
          transactionReference,
          status: "PENDING",
          provider: this.name,
          checkoutUrl: data.data.checkout_url,
          message: "Chapa checkout created successfully",
        };
      }

      return {
        success: false,
        transactionReference,
        status: "FAILED",
        provider: this.name,
        message: data.message || "Failed to initialize Chapa payment checkout",
      };
    } catch (err: unknown) {
      console.error("Chapa v1 network error:", err);
      return {
        success: false,
        transactionReference,
        status: "FAILED",
        provider: this.name,
        message: "Network error communicating with Chapa API",
      };
    }
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
        message: "Payment transaction record not found",
      };
    }

    if (payment.status === "COMPLETED") {
      return {
        success: true,
        status: "COMPLETED",
        transactionReference: payment.transactionReference,
        amount: payment.amount,
        currency: payment.currency,
        paidAt: payment.updatedAt,
        message: "Payment already verified and completed",
      };
    }

    let isSuccess = params.simulateOutcome === "SUCCESS";
    let rawResponse: Record<string, unknown> = {};

    // 1. Try Chapa v2 Verify if Global key and not already marked successful
    if (!isSuccess && this.isGlobalV2) {
      try {
        const data = await requestChapaV2<{
          status?: string;
          message?: string;
          data?: { status?: string };
        }>(
          `/v2/payments/${params.transactionReference}/verify`,
          "GET",
          this.secretKey,
          undefined,
          4500
        );
        rawResponse = data;
        const innerStatus = (data.data?.status || "").toUpperCase();
        if (innerStatus === "SUCCESS" || innerStatus === "COMPLETED") {
          isSuccess = true;
        } else if (innerStatus === "PENDING" && params.simulateOutcome !== "FAILED") {
          return {
            success: false,
            status: "PENDING",
            transactionReference: payment.transactionReference,
            amount: payment.amount,
            currency: payment.currency,
            message: "Payment is pending authorization on Chapa",
            rawResponse,
          };
        }
      } catch (err: unknown) {
        console.warn("[Chapa v2 verify]:", err instanceof Error ? err.message : "Request timed out");
      }
    }

    // 2. Fallback to Chapa v1 Verify only for legacy keys
    if (!isSuccess && !this.isGlobalV2 && params.simulateOutcome !== "FAILED") {
      try {
        const res = await fetch(
          `${CHAPA_LEGACY_API}/transaction/verify/${params.transactionReference}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.secretKey}`,
            },
            signal: AbortSignal.timeout(3500),
          }
        );
        const data = await res.json();
        if (data.status === "success" && data.data?.status === "success") {
          isSuccess = true;
          rawResponse = data;
        }
      } catch (err: unknown) {
        console.warn("[Chapa v1 verify]:", err instanceof Error ? err.message : "Request timed out");
      }
    }

    // Determine target status
    let targetStatus: PaymentStatus;
    if (params.simulateOutcome === "FAILED") {
      targetStatus = "FAILED";
    } else if (isSuccess) {
      targetStatus = "COMPLETED";
    } else {
      // If payment cannot be verified yet and wasn't explicitly failed, keep current status
      targetStatus = (payment.status as PaymentStatus) || "PENDING";
    }

    // Atomic DB update
    await db.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: targetStatus,
          providerMetadata: JSON.stringify({
            ...JSON.parse(payment.providerMetadata || "{}"),
            verifiedAt: new Date().toISOString(),
            chapaResponse: rawResponse,
          }),
        },
      });

      await tx.tip.update({
        where: { id: payment.tipId },
        data: {
          status: targetStatus,
        },
      });

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
          ? "Payment verified successfully by Chapa"
          : "Payment verification failed on Chapa",
      rawResponse,
    };
  }
}
