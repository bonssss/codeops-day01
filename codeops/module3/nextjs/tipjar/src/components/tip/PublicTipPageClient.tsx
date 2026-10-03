"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Heart,
  Globe,
  MapPin,
  Share2,
  QrCode as QrIcon,
  ShieldCheck,
  Zap,
  Coffee,
  Sparkles,
  ArrowRight,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createTipAction, processPaymentAction } from "@/actions/tips";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { QRCodeDialog } from "@/components/shared/qr-code-dialog";
import { CopyButton } from "@/components/shared/copy-button";

interface SocialLinkData {
  id: string;
  platform: string;
  url: string;
  label: string | null;
}

interface GoalData {
  id: string;
  title: string;
  description: string | null;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  imageUrl: string | null;
  deadline: string | null;
  status: string;
}

interface SupporterData {
  id: string;
  supporterName: string | null;
  amount: number;
  currency: string;
  message: string | null;
  isAnonymous: boolean;
  createdAt: string;
}

interface CreatorData {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  customTipMessage: string | null;
  currency: string;
  suggestedAmounts: number[];
  allowAnonymous: boolean;
  showSupporterWall: boolean;
  socialLinks: SocialLinkData[];
  activeGoal: GoalData | null;
  recentTips: SupporterData[];
}

export function PublicTipPageClient({ creator }: { creator: CreatorData }) {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // URL query parameter ?amount=XXX
  const initialAmountParam = searchParams.get("amount");
  const parsedParamAmount = initialAmountParam ? parseFloat(initialAmountParam) : null;

  const defaultSuggested = creator.suggestedAmounts?.length
    ? creator.suggestedAmounts
    : [50, 100, 200, 500];

  const initialAmount =
    parsedParamAmount && !isNaN(parsedParamAmount)
      ? parsedParamAmount
      : defaultSuggested[1] || 100;

  const [selectedAmount, setSelectedAmount] = React.useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = React.useState<string>(
    defaultSuggested.includes(initialAmount) ? "" : initialAmount.toString()
  );
  const [isCustom, setIsCustom] = React.useState<boolean>(
    !defaultSuggested.includes(initialAmount)
  );

  const [supporterName, setSupporterName] = React.useState("");
  const [supporterEmail, setSupporterEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("Telebirr");

  // Dialog and processing states
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
  const [activeTxRef, setActiveTxRef] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [successModalOpen, setSuccessModalOpen] = React.useState(false);
  const [successData, setSuccessData] = React.useState<{
    amount: number;
    currency: string;
    transactionReference: string;
    paidAt: string;
  } | null>(null);

  const [qrModalOpen, setQrModalOpen] = React.useState(false);

  const currentTipAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleSelectPredefined = (amount: number) => {
    setIsCustom(false);
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
  };

  // Step 1: Initiate Tip & Open Mock Payment Dialog
  const handleInitiateTip = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentTipAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter or select a valid tip amount",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createTipAction({
        recipientUsername: creator.username,
        amount: currentTipAmount,
        currency: creator.currency,
        supporterName: isAnonymous ? "Anonymous" : supporterName,
        supporterEmail,
        message,
        isAnonymous,
        goalId: creator.activeGoal?.id,
        paymentMethod,
      });

      if (!res.success || !res.transactionReference) {
        toast({
          title: "Error",
          description: res.error || "Failed to initiate tip",
          type: "error",
        });
        return;
      }

      setActiveTxRef(res.transactionReference);
      setPaymentModalOpen(true);
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Complete Simulated Payment
  const handleCompletePayment = async (outcome: "SUCCESS" | "FAILED" = "SUCCESS") => {
    if (!activeTxRef) return;
    setIsVerifying(true);

    try {
      const result = await processPaymentAction({
        transactionReference: activeTxRef,
        simulateOutcome: outcome,
      });

      setPaymentModalOpen(false);

      if (result.success && result.status === "COMPLETED") {
        setSuccessData({
          amount: result.amount,
          currency: result.currency,
          transactionReference: result.transactionReference,
          paidAt: result.paidAt,
        });
        setSuccessModalOpen(true);

        // Trigger confetti celebration!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#10b981", "#38bdf8", "#ec4899"],
        });

        // Reset inputs
        setMessage("");
        setSupporterName("");
        setSupporterEmail("");
      } else {
        toast({
          title: "Payment Declined",
          description: result.message || "Simulated payment failed as requested.",
          type: "error",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not verify payment",
        type: "error",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://tipjar.io/tip/${creator.username}`;

  return (
    <div className="min-h-screen bg-[#07090e] text-neutral-100 pb-20">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-white/5 bg-neutral-950/40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white font-bold text-lg hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20">
              <Coffee className="h-4 w-4" />
            </div>
            <span>TipJar</span>
          </a>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQrModalOpen(true)}
              className="gap-1.5"
            >
              <QrIcon className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">QR Code</span>
            </Button>
            <CopyButton text={shareUrl} label="Share" variant="outline" size="sm" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Creator Profile, Goals, Supporter Wall */}
          <div className="lg:col-span-7 space-y-6">
            {/* Profile Hero Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Avatar
                  src={creator.avatarUrl}
                  name={creator.displayName}
                  size="xl"
                  className="ring-4 ring-amber-500/20 shadow-2xl h-24 w-24 sm:h-28 sm:w-28 text-2xl"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {creator.displayName}
                    </h1>
                    <Badge variant="default" className="text-xs">
                      Creator
                    </Badge>
                  </div>
                  <div className="text-sm text-neutral-400 font-mono">@{creator.username}</div>

                  {creator.location && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      <span>{creator.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {creator.bio && (
                <p className="mt-6 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {creator.bio}
                </p>
              )}

              {/* Custom Creator Note */}
              {creator.customTipMessage && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-sm flex gap-3 items-start">
                  <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">{creator.customTipMessage}</p>
                </div>
              )}

              {/* Social Links */}
              {creator.socialLinks && creator.socialLinks.length > 0 && (
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  {creator.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-colors"
                    >
                      <Globe className="h-3 w-3 text-neutral-400" />
                      <span>{link.label || link.platform}</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                    </a>
                  ))}
                  {creator.website && !creator.socialLinks.some((l) => l.url === creator.website) && (
                    <a
                      href={creator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-colors"
                    >
                      <Globe className="h-3 w-3 text-amber-400" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Active Goal Card */}
            {creator.activeGoal && (
              <div className="glass-card rounded-3xl p-6 relative overflow-hidden border-amber-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      {creator.activeGoal.title}
                    </h3>
                  </div>
                  <Badge variant="warning" className="text-[11px]">
                    Active Goal
                  </Badge>
                </div>

                {creator.activeGoal.description && (
                  <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed">
                    {creator.activeGoal.description}
                  </p>
                )}

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-amber-400">
                      {formatCurrency(creator.activeGoal.currentAmount, creator.activeGoal.currency)}
                    </span>
                    <span className="text-neutral-400">
                      Target: {formatCurrency(creator.activeGoal.targetAmount, creator.activeGoal.currency)}
                    </span>
                  </div>
                  <Progress
                    value={creator.activeGoal.currentAmount}
                    max={creator.activeGoal.targetAmount}
                    className="h-3"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 pt-1">
                    <span>
                      {Math.min(
                        100,
                        Math.round(
                          (creator.activeGoal.currentAmount / creator.activeGoal.targetAmount) * 100
                        )
                      )}
                      % achieved
                    </span>
                    {creator.activeGoal.deadline && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Deadline: {new Date(creator.activeGoal.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Supporter Wall */}
            {creator.showSupporterWall && (
              <div className="glass-card rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-400 fill-rose-400/20" />
                    <h3 className="font-bold text-white text-lg">Supporter Wall</h3>
                  </div>
                  <span className="text-xs text-neutral-400">
                    {creator.recentTips.length} supporters
                  </span>
                </div>

                {creator.recentTips.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-sm">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-neutral-600" />
                    Be the first supporter to leave a tip!
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {creator.recentTips.map((tip) => (
                      <div
                        key={tip.id}
                        className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-start gap-3.5 transition-all hover:border-white/10"
                      >
                        <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 font-bold text-sm">
                          💛
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-white text-sm truncate">
                              {tip.isAnonymous ? "Anonymous Supporter" : tip.supporterName || "Supporter"}
                            </span>
                            <span className="text-xs font-bold text-amber-400 shrink-0">
                              {formatCurrency(tip.amount, tip.currency)}
                            </span>
                          </div>
                          {tip.message && (
                            <p className="mt-1 text-xs text-neutral-300 italic leading-relaxed">
                              &ldquo;{tip.message}&rdquo;
                            </p>
                          )}
                          <div className="mt-1.5 text-[10px] text-neutral-500">
                            {formatRelativeTime(tip.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Interactive Tipping Form */}
          <div className="lg:col-span-5 sticky top-6">
            <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-2xl border-amber-500/20 relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    ☕
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Send a Tip</h2>
                    <p className="text-xs text-neutral-400">Support {creator.displayName}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  {creator.currency}
                </Badge>
              </div>

              <form onSubmit={handleInitiateTip} className="space-y-5">
                {/* Predefined Amounts */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-300">
                    Select Tip Amount ({creator.currency})
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {defaultSuggested.map((amt) => {
                      const isSelected = !isCustom && selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleSelectPredefined(amt)}
                          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                            isSelected
                              ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 scale-[1.02]"
                              : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/5"
                          }`}
                        >
                          {amt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Field */}
                  <div className="mt-2">
                    <Input
                      type="number"
                      min="1"
                      step="any"
                      placeholder="Or enter custom amount..."
                      value={customAmount}
                      onChange={handleCustomChange}
                      icon={<span className="text-xs font-bold text-amber-400 font-mono">{creator.currency}</span>}
                      className={isCustom ? "border-amber-500/60 ring-2 ring-amber-500/20" : ""}
                    />
                  </div>
                </div>

                {/* Supporter Name & Anonymous Switch */}
                <div className="space-y-3 pt-1">
                  {!isAnonymous && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-300">Your Name (Optional)</label>
                      <Input
                        type="text"
                        placeholder="e.g. Dawit Alemayehu"
                        value={supporterName}
                        onChange={(e) => setSupporterName(e.target.value)}
                        icon={<User className="h-4 w-4" />}
                      />
                    </div>
                  )}

                  {creator.allowAnonymous && (
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300 py-1">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-white/20 bg-neutral-900 text-amber-500 focus:ring-amber-500/30 h-4 w-4"
                      />
                      <span>Make this tip anonymous</span>
                    </label>
                  )}
                </div>

                {/* Supporter Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Message / Encouragement (Optional)
                  </label>
                  <Textarea
                    placeholder="Say something nice or ask a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-300">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Telebirr", name: "Telebirr", icon: "📱" },
                      { id: "CBE Birr", name: "CBE Birr", icon: "🏦" },
                      { id: "Chapa", name: "Chapa / Card", icon: "💳" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                          paymentMethod === m.id
                            ? "border-amber-500 bg-amber-500/10 text-white font-semibold"
                            : "border-white/5 bg-neutral-900/60 text-neutral-400 hover:border-white/10"
                        }`}
                      >
                        <span className="text-base">{m.icon}</span>
                        <span>{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total & Submit Button */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Total Contribution:</span>
                    <span className="text-xl font-black text-amber-400">
                      {formatCurrency(currentTipAmount, creator.currency)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    disabled={isSubmitting || currentTipAmount <= 0}
                    className="w-full text-base font-bold gap-2"
                  >
                    {isSubmitting ? (
                      "Initiating Tip..."
                    ) : (
                      <>
                        <span>Support {creator.displayName.split(" ")[0]}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Simulated instant checkout &bull; 100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: Mock Payment Flow Simulation */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent onClose={() => setPaymentModalOpen(false)} className="max-w-md">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-2">
              <Zap className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-xl">
              Mock Payment Gateway
            </DialogTitle>
            <DialogDescription className="text-center text-xs">
              Simulating payment provider: <strong className="text-white">{paymentMethod}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="my-5 space-y-3 bg-neutral-950/60 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Reference:</span>
              <span className="font-mono text-neutral-200">{activeTxRef}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Recipient:</span>
              <span className="font-semibold text-white">{creator.displayName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Amount:</span>
              <span className="font-black text-amber-400 text-sm">
                {formatCurrency(currentTipAmount, creator.currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Status:</span>
              <Badge variant="warning" className="text-[10px]">
                PENDING CONFIRMATION
              </Badge>
            </div>
          </div>

          <div className="space-y-2.5">
            <Button
              type="button"
              variant="emerald"
              size="lg"
              disabled={isVerifying}
              onClick={() => handleCompletePayment("SUCCESS")}
              className="w-full gap-2 font-bold"
            >
              {isVerifying ? (
                "Verifying Transaction..."
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Simulate Successful Payment</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="default"
              disabled={isVerifying}
              onClick={() => handleCompletePayment("FAILED")}
              className="w-full gap-2 text-xs"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Simulate Failed Payment</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Tipping Success Modal with Receipt */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent onClose={() => setSuccessModalOpen(false)} className="max-w-md text-center">
          <DialogHeader className="text-center items-center">
            <div className="h-16 w-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-2xl font-black text-white">
              Thank You for Supporting!
            </DialogTitle>
            <DialogDescription className="text-sm">
              Your tip to <strong className="text-white">{creator.displayName}</strong> has been received successfully.
            </DialogDescription>
          </DialogHeader>

          {successData && (
            <div className="my-5 p-5 rounded-2xl bg-neutral-950/80 border border-emerald-500/20 text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Amount Sent:</span>
                <span className="font-extrabold text-emerald-400 text-base">
                  {formatCurrency(successData.amount, successData.currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Transaction ID:</span>
                <span className="font-mono text-neutral-300 text-[11px]">{successData.transactionReference}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Date:</span>
                <span className="text-neutral-300">{new Date(successData.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="default"
              onClick={() => setSuccessModalOpen(false)}
              className="flex-1"
            >
              Done
            </Button>
            <CopyButton text={shareUrl} label="Share Creator Page" className="flex-1" />
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <QRCodeDialog
        open={qrModalOpen}
        onOpenChange={setQrModalOpen}
        url={shareUrl}
        creatorName={creator.displayName}
        username={creator.username}
      />
    </div>
  );
}
