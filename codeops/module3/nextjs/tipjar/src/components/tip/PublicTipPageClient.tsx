"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Heart,
  Globe,
  MapPin,
  QrCode as QrIcon,
  ShieldCheck,
  Zap,
  Coffee,
  Sparkles,
  ArrowRight,
  User,
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
import { ThemeToggle } from "@/components/shared/theme-toggle";

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

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#FBBF24", "#1C1917"],
        });

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
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-foreground font-bold text-lg hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <Coffee className="h-4 w-4" />
            </div>
            <span>TipJar</span>
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQrModalOpen(true)}
              className="gap-1.5"
            >
              <QrIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">QR Code</span>
            </Button>
            <CopyButton text={shareUrl} label="Share" variant="outline" size="sm" />
          </div>
        </div>
      </header>

      {/* Live Activity Ticker Banner */}
      {creator.recentTips && creator.recentTips.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
          <div className="rounded-2xl bg-muted border border-border px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 truncate">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-semibold text-foreground shrink-0">Recent Support:</span>
              <span className="truncate">
                <strong className="text-foreground">{creator.recentTips[0].isAnonymous ? "A generous supporter" : creator.recentTips[0].supporterName}</strong> tipped <strong className="text-amber-600 dark:text-amber-400">{formatCurrency(creator.recentTips[0].amount, creator.recentTips[0].currency)}</strong> {formatRelativeTime(creator.recentTips[0].createdAt)}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium hidden sm:inline shrink-0 pl-2">{creator.recentTips.length} total tips</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Creator Profile, Goals, Supporter Wall */}
          <div className="lg:col-span-7 space-y-6">
            {/* Profile Card */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Avatar
                  src={creator.avatarUrl}
                  name={creator.displayName}
                  size="xl"
                  className="ring-4 ring-primary/20 shadow-md h-24 w-24 sm:h-28 sm:w-28 text-2xl"
                />

                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {creator.displayName}
                    </h1>
                    <Badge variant="default" className="text-xs">
                      Creator
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">@{creator.username}</div>

                  {creator.location && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span>{creator.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {creator.bio && (
                <p className="mt-6 text-foreground text-sm sm:text-base leading-relaxed">
                  {creator.bio}
                </p>
              )}

              {/* Custom Creator Note */}
              {creator.customTipMessage && (
                <div className="mt-5 p-4 rounded-2xl bg-muted border border-border text-foreground text-sm flex gap-3 items-start">
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">{creator.customTipMessage}</p>
                </div>
              )}

              {/* Social Links */}
              {creator.socialLinks && creator.socialLinks.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-2">
                  {creator.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-foreground hover:text-amber-600 dark:hover:text-white border border-border transition-colors"
                    >
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <span>{link.label || link.platform}</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                    </a>
                  ))}
                  {creator.website && !creator.socialLinks.some((l) => l.url === creator.website) && (
                    <a
                      href={creator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-foreground hover:text-amber-600 dark:hover:text-white border border-border transition-colors"
                    >
                      <Globe className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Active Goal Card */}
            {creator.activeGoal && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <h3 className="font-bold text-foreground text-base sm:text-lg">
                      {creator.activeGoal.title}
                    </h3>
                  </div>
                  <Badge variant="default" className="text-[11px]">
                    Active Goal
                  </Badge>
                </div>

                {creator.activeGoal.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                    {creator.activeGoal.description}
                  </p>
                )}

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {formatCurrency(creator.activeGoal.currentAmount, creator.activeGoal.currency)}
                    </span>
                    <span className="text-muted-foreground">
                      Target: {formatCurrency(creator.activeGoal.targetAmount, creator.activeGoal.currency)}
                    </span>
                  </div>
                  <Progress
                    value={creator.activeGoal.currentAmount}
                    max={creator.activeGoal.targetAmount}
                    className="h-2.5"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
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
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-bold text-foreground text-lg">Supporter Wall</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {creator.recentTips.length} supporters
                  </span>
                </div>

                {creator.recentTips.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    Be the first supporter to leave a tip!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {creator.recentTips.map((tip) => (
                      <div
                        key={tip.id}
                        className="p-4 rounded-2xl bg-muted border border-border flex items-start gap-3.5 transition-colors"
                      >
                        <div className="h-9 w-9 rounded-xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center font-bold text-sm shrink-0">
                          ☕
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-foreground text-sm truncate">
                              {tip.isAnonymous ? "Anonymous Supporter" : tip.supporterName || "Supporter"}
                            </span>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                              {formatCurrency(tip.amount, tip.currency)}
                            </span>
                          </div>
                          {tip.message && (
                            <p className="mt-1 text-xs text-muted-foreground italic leading-relaxed">
                              &ldquo;{tip.message}&rdquo;
                            </p>
                          )}
                          <div className="mt-1.5 text-[10px] text-muted-foreground">
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
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center font-bold text-sm">
                    ☕
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Send a Tip</h2>
                    <p className="text-xs text-muted-foreground">Support {creator.displayName}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  {creator.currency}
                </Badge>
              </div>

              <form onSubmit={handleInitiateTip} className="space-y-5">
                {/* Predefined Amounts */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">
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
                          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                            isSelected
                              ? "bg-primary text-primary-foreground font-black shadow-sm"
                              : "bg-muted text-foreground hover:bg-border border border-border"
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
                      icon={<span className="text-xs font-bold text-amber-700 dark:text-amber-300 font-mono">{creator.currency}</span>}
                    />
                  </div>
                </div>

                {/* Supporter Name & Anonymous Switch */}
                <div className="space-y-3 pt-1">
                  {!isAnonymous && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Your Name (Optional)</label>
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
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-foreground py-1">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-input bg-card text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Make this tip anonymous</span>
                    </label>
                  )}
                </div>

                {/* Supporter Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Message / Note (Optional)
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
                  <label className="text-xs font-medium text-foreground">Payment Method</label>
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
                        className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-colors ${
                          paymentMethod === m.id
                            ? "border-primary bg-primary/10 text-amber-800 dark:text-amber-200 font-bold"
                            : "border-border bg-muted text-muted-foreground hover:border-muted-foreground"
                        }`}
                      >
                        <span className="text-base">{m.icon}</span>
                        <span>{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total & Submit Button */}
                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Contribution:</span>
                    <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                      {formatCurrency(currentTipAmount, creator.currency)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={isSubmitting || currentTipAmount <= 0}
                    className="w-full text-base font-bold gap-2 h-12"
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

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
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
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center mx-auto mb-2">
              <Zap className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-xl">
              Mock Payment Gateway
            </DialogTitle>
            <DialogDescription className="text-center text-xs">
              Simulating payment provider: <strong className="text-foreground">{paymentMethod}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="my-5 space-y-3 bg-muted p-4 rounded-2xl border border-border text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reference:</span>
              <span className="font-mono text-foreground">{activeTxRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipient:</span>
              <span className="font-semibold text-foreground">{creator.displayName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-black text-amber-600 dark:text-amber-400 text-sm">
                {formatCurrency(currentTipAmount, creator.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="default" className="text-[10px]">
                PENDING CONFIRMATION
              </Badge>
            </div>
          </div>

          <div className="space-y-2.5">
            <Button
              type="button"
              variant="default"
              size="lg"
              disabled={isVerifying}
              onClick={() => handleCompletePayment("SUCCESS")}
              className="w-full gap-2 font-bold h-12"
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
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-amber-700 dark:text-amber-300 border border-primary/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogTitle className="text-2xl font-black text-foreground">
              Thank You for Supporting!
            </DialogTitle>
            <DialogDescription className="text-sm">
              Your tip to <strong className="text-foreground">{creator.displayName}</strong> has been received.
            </DialogDescription>
          </DialogHeader>

          {successData && (
            <div className="my-5 p-5 rounded-2xl bg-muted border border-border text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Amount Sent:</span>
                <span className="font-extrabold text-amber-600 dark:text-amber-400 text-base">
                  {formatCurrency(successData.amount, successData.currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-foreground text-[11px]">{successData.transactionReference}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground">{new Date(successData.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="default"
              onClick={() => setSuccessModalOpen(false)}
              className="flex-1 font-semibold"
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
