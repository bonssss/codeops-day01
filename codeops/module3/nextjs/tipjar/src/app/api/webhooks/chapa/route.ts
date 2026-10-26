import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/provider";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const tx_ref = body.tx_ref || body.trx_ref || req.nextUrl.searchParams.get("tx_ref");

    if (!tx_ref) {
      return NextResponse.json(
        { error: "Transaction reference missing" },
        { status: 400 }
      );
    }

    const provider = getPaymentProvider("CHAPA");
    const result = await provider.verifyPayment({
      transactionReference: tx_ref,
    });

    return NextResponse.json({
      success: result.success,
      status: result.status,
      transactionReference: tx_ref,
    });
  } catch (err: unknown) {
    console.error("Chapa webhook error:", err);
    return NextResponse.json(
      { error: "Internal webhook processing error" },
      { status: 500 }
    );
  }
}
