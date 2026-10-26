"use client";

import * as React from "react";
import Link from "next/link";
import {
  Printer,
  Copy,
  Check,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

export interface TipReceiptData {
  transactionReference: string;
  chapaReference?: string;
  amount: number;
  charge?: number;
  currency: string;
  status: string;
  paidAt: string;
  creatorName: string;
  creatorUsername?: string;
  creatorAvatarUrl?: string | null;
  supporterName?: string;
  supporterPhone?: string | null;
  supporterEmail?: string | null;
  tipMessage?: string | null;
  paymentMethod?: string;
  provider?: string;
  goalTitle?: string | null;
  merchantName?: string;
  merchantTin?: string;
  merchantPhone?: string;
  merchantAddress?: string;
}

export function TipReceiptCard({ receipt }: { receipt: TipReceiptData }) {
  const [copied, setCopied] = React.useState(false);

  const chapaRef =
    receipt.chapaReference ||
    `HC${receipt.transactionReference.replace(/[^A-Za-z0-9]/g, "").slice(-10)}`;

  const chargeAmount =
    typeof receipt.charge === "number"
      ? receipt.charge
      : +(receipt.amount * 0.0288).toFixed(2);

  const totalAmount = +(receipt.amount + chargeAmount).toFixed(2);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(chapaRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Official Chapa Receipt Container */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0">
        {/* Subtle decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 print:hidden" />

        {/* Top Header: Brand & RECEIPT */}
        <div className="text-center space-y-3 pt-2">
          {/* Chapa Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              c
            </div>
            <span className="font-black text-2xl tracking-tight text-foreground">
              chapa<span className="text-emerald-500">.</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-foreground uppercase">
            RECEIPT
          </h1>

          {/* Test Mode Banner */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            Test Mode
          </div>

          <p className="text-xs text-muted-foreground italic max-w-md mx-auto leading-relaxed">
            No actual money is used in the test mode. Only our test cards and bank accounts can be used.
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-border" />

        {/* Two-Column Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Left: Receipt From */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-muted/40 border border-border/70">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Receipt From
            </span>
            <p className="font-extrabold text-foreground text-sm">
              {receipt.merchantName || "Bons DEv"}
            </p>
            <p className="text-muted-foreground font-mono">
              <span className="text-muted-foreground/70">TIN:</span> {receipt.merchantTin || "1234567890"}
            </p>
            <p className="text-muted-foreground font-mono">
              <span className="text-muted-foreground/70">Phone No.:</span> {receipt.merchantPhone || "251938756685"}
            </p>
            <p className="text-muted-foreground">
              <span className="text-muted-foreground/70">Address:</span> {receipt.merchantAddress || "Test Address"}
            </p>
          </div>

          {/* Right: Chapa Financial Technologies */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-muted/40 border border-border/70">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Payment Processor
            </span>
            <p className="font-extrabold text-foreground text-sm">
              Chapa Financial Technologies S.C
            </p>
            <p className="text-muted-foreground font-mono">
              <span className="text-muted-foreground/70">TIN:</span> 0071406415
            </p>
            <p className="text-muted-foreground font-mono">
              <span className="text-muted-foreground/70">VAT Reg.:</span> 18595770010
            </p>
            <p className="text-muted-foreground font-mono">
              <span className="text-muted-foreground/70">Phone No.:</span> +251-960724272
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="text-muted-foreground/70">Website:</span> chapa.co
            </p>
          </div>
        </div>

        {/* PAYMENT DETAILS Section Header */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <span className="text-xs font-black tracking-widest text-muted-foreground uppercase">
              PAYMENT DETAILS
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold bg-muted px-2.5 py-1 rounded-lg border border-border">
              <span className="text-emerald-600 dark:text-emerald-400">{chapaRef}</span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="text-muted-foreground hover:text-foreground transition-colors print:hidden"
                title="Copy Reference"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Key-Value Details with Bilingual Amharic Labels */}
        <div className="space-y-3 text-xs">
          {/* Payer Name */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Payer Name / <span className="text-[11px]">የከፋይ ስም</span>
            </span>
            <span className="font-bold text-foreground">
              {receipt.supporterName && receipt.supporterName !== "Anonymous"
                ? receipt.supporterName
                : "N/A"}
            </span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Phone Number / <span className="text-[11px]">ስልክ ቁጥር</span>
            </span>
            <span className="font-mono text-foreground">
              {receipt.supporterPhone || "251922222222"}
            </span>
          </div>

          {/* Email Address */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Email Address / <span className="text-[11px]">ኢሜል አድራሻ</span>
            </span>
            <span className="text-foreground font-medium">
              {receipt.supporterEmail && receipt.supporterEmail.includes("@")
                ? receipt.supporterEmail
                : "N/A"}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Payment Method / <span className="text-[11px]">የክፍያ መንገድ</span>
            </span>
            <span className="font-semibold text-foreground capitalize">
              {receipt.paymentMethod || "test"}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Status / <span className="text-[11px]">ሁኔታ</span>
            </span>
            <Badge variant="default" className="bg-emerald-600 text-white font-bold text-xs gap-1 px-2.5 py-0.5">
              <CheckCircle2 className="h-3 w-3" />
              <span>Success</span>
            </Badge>
          </div>

          {/* Payment Date */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Payment Date / <span className="text-[11px]">የክፍያ ቀን</span>
            </span>
            <span className="text-foreground font-medium">
              {formatDateTime(receipt.paidAt)}
            </span>
          </div>

          {/* Payment Reason */}
          <div className="flex items-center justify-between py-1.5 border-b border-border/60">
            <span className="text-muted-foreground font-medium">
              Payment Reason / <span className="text-[11px]">የክፍያ ምክንያት</span>
            </span>
            <span className="font-semibold text-foreground">
              Online Payments
            </span>
          </div>
        </div>

        {/* Chapa Official Stamp & References Section */}
        <div className="my-6 p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* References */}
          <div className="space-y-1 text-xs text-left w-full sm:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              References
            </span>
            <p className="font-mono text-muted-foreground">
              <span className="font-semibold text-foreground">Chapa:</span> {chapaRef}
            </p>
            <p className="font-mono text-muted-foreground">
              <span className="font-semibold text-foreground">Bank:</span>{" "}
              {receipt.transactionReference || "N/A"}
            </p>
          </div>

          {/* Official Chapa Rubber Stamp */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 rounded-full border-2 border-dashed border-emerald-600/80 dark:border-emerald-400/80 p-1.5 flex items-center justify-center rotate-[-8deg] bg-emerald-500/5 select-none shadow-xs">
              <div className="h-full w-full rounded-full border border-emerald-600/70 dark:border-emerald-400/70 flex flex-col items-center justify-center p-2 text-center text-emerald-700 dark:text-emerald-400">
                <span className="text-[8px] font-black uppercase tracking-tighter leading-tight">
                  ★ CHAPA S.C ★
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider border-y border-emerald-600/40 my-0.5 py-0.5 text-emerald-800 dark:text-emerald-300">
                  VERIFIED
                </span>
                <span className="text-[7px] font-bold text-emerald-600 dark:text-emerald-400">
                  PAID & APPROVED
                </span>
              </div>
            </div>
            <span className="block text-center text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mt-1">
              Chapa Stamp
            </span>
          </div>
        </div>

        {/* Financial Breakdown (Sub Total, Charge, Total) */}
        <div className="rounded-2xl bg-muted/60 border border-border p-5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Sub Total</span>
            <span className="font-mono font-bold text-foreground text-sm">
              {receipt.amount.toFixed(2)} {receipt.currency}
            </span>
          </div>

          <div className="flex justify-between items-center text-muted-foreground">
            <span>Charge</span>
            <span className="font-mono font-medium text-foreground">
              {chargeAmount.toFixed(2)} {receipt.currency}
            </span>
          </div>

          <div className="border-t border-border pt-2.5 flex justify-between items-center">
            <span className="font-black text-sm uppercase tracking-wider text-foreground">Total</span>
            <span className="font-black font-mono text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">
              {totalAmount.toFixed(2)} {receipt.currency}
            </span>
          </div>
        </div>

        {/* Official Footer */}
        <div className="mt-8 pt-4 border-t border-border text-center space-y-1.5 text-xs text-muted-foreground">
          <p className="font-mono font-medium text-foreground">
            +251-960724272 &bull; info@chapa.co
          </p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400 tracking-wide text-sm">
            Thank You For Using Chapa
          </p>
        </div>
      </div>

      {/* Action Buttons (Excluded during window.print()) */}
      <div className="flex flex-col sm:flex-row gap-3 print:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrint}
          className="flex-1 gap-2 font-semibold text-xs h-11"
        >
          <Printer className="h-4 w-4" />
          <span>Print or Save PDF</span>
        </Button>

        {receipt.creatorUsername ? (
          <Link href={`/tip/${receipt.creatorUsername}`} className="flex-1">
            <Button
              type="button"
              variant="default"
              className="w-full gap-2 font-semibold text-xs h-11 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Creator Page</span>
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard" className="flex-1">
            <Button type="button" variant="default" className="w-full gap-2 font-semibold text-xs h-11">
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
