import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { processPaymentAction } from "@/actions/tips";
import { Button } from "@/components/ui/button";
import { CallbackConfetti } from "./CallbackConfetti";
import { TipReceiptCard } from "@/components/tip/TipReceiptCard";

export const metadata = {
  title: "Payment Receipt - TipJar",
};

interface CallbackPageProps {
  searchParams: Promise<{
    tx_ref?: string;
    trx_ref?: string;
    reference?: string;
    status?: string;
    transaction_id?: string;
  }>;
}

export default async function TipCallbackPage({ searchParams }: CallbackPageProps) {
  const params = await searchParams;
  const tx_ref = params.tx_ref || params.trx_ref || params.reference;

  if (!tx_ref) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-border bg-card p-8 text-center space-y-4 shadow-sm">
          <div className="h-14 w-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black text-foreground">Missing Transaction Reference</h1>
          <p className="text-sm text-muted-foreground">
            No transaction reference was provided by the payment gateway callback.
          </p>
          <div className="pt-4">
            <Link href="/">
              <Button variant="default" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Verify payment on server (if Chapa redirected with status=success, confirm success)
  const isChapaSuccessParam = params.status?.toLowerCase() === "success";
  const verification = await processPaymentAction({
    transactionReference: tx_ref,
    simulateOutcome: isChapaSuccessParam ? "SUCCESS" : undefined,
  });

  const isSuccess = verification.success && verification.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-12">
      {isSuccess && <CallbackConfetti />}

      {isSuccess ? (
        <TipReceiptCard
          receipt={{
            transactionReference: verification.transactionReference || tx_ref,
            chapaReference: verification.chapaReference,
            amount: verification.amount || 0,
            charge: verification.charge,
            currency: verification.currency || "ETB",
            status: verification.status || "COMPLETED",
            paidAt: verification.paidAt || new Date().toISOString(),
            creatorName: verification.creatorName || "Creator",
            creatorUsername: verification.creatorUsername,
            creatorAvatarUrl: verification.creatorAvatarUrl,
            supporterName: verification.supporterName,
            supporterPhone: verification.supporterPhone,
            supporterEmail: verification.supporterEmail,
            tipMessage: verification.tipMessage,
            paymentMethod: verification.paymentMethod,
            provider: verification.provider,
            goalTitle: verification.goalTitle,
            merchantName: verification.merchantName,
            merchantTin: verification.merchantTin,
            merchantPhone: verification.merchantPhone,
            merchantAddress: verification.merchantAddress,
          }}
        />
      ) : (
        <div className="max-w-md w-full rounded-3xl border border-border bg-card p-6 sm:p-8 text-center shadow-lg space-y-6">
          <div className="h-16 w-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
            <AlertCircle className="h-9 w-9" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-foreground">Payment Pending or Incomplete</h1>
            <p className="text-sm text-muted-foreground">
              {verification.message ||
                "Your payment could not be confirmed immediately or was declined."}
            </p>
          </div>

          <div className="rounded-2xl bg-muted border border-border p-4 text-xs font-mono text-muted-foreground break-all">
            Reference: {tx_ref}
          </div>

          <div className="space-y-2 pt-2">
            <Link href={`/tip/callback?tx_ref=${tx_ref}`} className="block">
              <Button variant="default" className="w-full font-semibold gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Re-check Verification</span>
              </Button>
            </Link>

            {verification.creatorUsername ? (
              <Link href={`/tip/${verification.creatorUsername}`} className="block">
                <Button variant="outline" className="w-full font-semibold gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to @{verification.creatorUsername}&apos;s Page</span>
                </Button>
              </Link>
            ) : (
              <Link href="/" className="block">
                <Button variant="outline" className="w-full font-semibold">
                  Return to Home
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
