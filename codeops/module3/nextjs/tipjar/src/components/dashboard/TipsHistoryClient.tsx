"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  Download,
  CreditCard,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { processPaymentAction, syncPendingTransactionsAction } from "@/actions/tips";

import { useRouter } from "next/navigation";

interface TipTransaction {
  id: string;
  transactionRef: string;
  supporterName: string;
  supporterEmail: string | null;
  amount: number;
  currency: string;
  message: string | null;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export function TipsHistoryClient({
  tips,
  currency,
}: {
  tips: TipTransaction[];
  currency: string;
}) {
  const router = useRouter();
  const [tipsList, setTipsList] = React.useState<TipTransaction[]>(tips);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [sortBy, setSortBy] = React.useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [selectedTip, setSelectedTip] = React.useState<TipTransaction | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [syncMessage, setSyncMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setTipsList(tips);
  }, [tips]);

  const hasPending = React.useMemo(() => {
    return tipsList.some((t) => t.status.toUpperCase() === "PENDING");
  }, [tipsList]);

  // Fast automatic sync runner
  const runAutoSync = React.useCallback(async () => {
    try {
      const res = await syncPendingTransactionsAction();
      if (res.success && res.updatedRefs && res.updatedRefs.length > 0) {
        setTipsList((prev) =>
          prev.map((t) =>
            res.updatedRefs.includes(t.transactionRef)
              ? { ...t, status: "COMPLETED" }
              : t
          )
        );
        if (selectedTip && res.updatedRefs.includes(selectedTip.transactionRef)) {
          setSelectedTip((prev) => (prev ? { ...prev, status: "COMPLETED" } : null));
        }
        setSyncMessage(`⚡ Auto-confirmed ${res.updatedCount} transaction${res.updatedCount > 1 ? "s" : ""}!`);
        router.refresh();
      }
    } catch {
      // Silently ignore background polling errors
    }
  }, [router, selectedTip]);

  // Fast auto-sync triggers: on mount, on window focus, and periodic 4-second polling while pending
  React.useEffect(() => {
    if (hasPending) {
      // Immediate sync on load
      runAutoSync();

      const interval = setInterval(() => {
        runAutoSync();
      }, 4000);

      const handleFocus = () => runAutoSync();
      window.addEventListener("focus", handleFocus);
      document.addEventListener("visibilitychange", handleFocus);

      return () => {
        clearInterval(interval);
        window.removeEventListener("focus", handleFocus);
        document.removeEventListener("visibilitychange", handleFocus);
      };
    }
  }, [hasPending, runAutoSync]);

  const handleVerifyTip = async (transactionRef: string, forceSuccess: boolean = false) => {
    setIsVerifying(true);
    try {
      const res = await processPaymentAction({
        transactionReference: transactionRef,
        simulateOutcome: forceSuccess ? "SUCCESS" : undefined,
      });

      if (res.success && res.status === "COMPLETED") {
        setTipsList((prev) =>
          prev.map((t) =>
            t.transactionRef === transactionRef ? { ...t, status: "COMPLETED" } : t
          )
        );
        if (selectedTip && selectedTip.transactionRef === transactionRef) {
          setSelectedTip((prev) => (prev ? { ...prev, status: "COMPLETED" } : null));
        }
        router.refresh();
      } else {
        alert(res.message || "Payment has not been completed on Chapa yet.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await syncPendingTransactionsAction();
      if (res.success) {
        if (res.updatedRefs && res.updatedRefs.length > 0) {
          setTipsList((prev) =>
            prev.map((t) =>
              res.updatedRefs.includes(t.transactionRef)
                ? { ...t, status: "COMPLETED" }
                : t
            )
          );
          router.refresh();
        }
        setSyncMessage(res.message || "Synced successfully");
      } else {
        setSyncMessage(res.error || "Failed to sync transactions");
      }
    } catch {
      setSyncMessage("Error communicating with payment gateway");
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 5000);
    }
  };

  const filteredTips = React.useMemo(() => {
    return tipsList
      .filter((t) => {
        const matchesSearch =
          t.supporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.transactionRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (t.message && t.message.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
          statusFilter === "ALL" || t.status.toUpperCase() === statusFilter.toUpperCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === "highest") {
          return b.amount - a.amount;
        }
        if (sortBy === "lowest") {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [tipsList, searchTerm, statusFilter, sortBy]);

  const exportCSV = () => {
    const headers = ["Transaction ID,Supporter,Amount,Currency,Status,Payment Method,Message,Date"];
    const rows = filteredTips.map((t) =>
      [
        t.transactionRef,
        `"${t.supporterName.replace(/"/g, '""')}"`,
        t.amount,
        t.currency,
        t.status,
        t.paymentMethod,
        `"${(t.message || "").replace(/"/g, '""')}"`,
        new Date(t.createdAt).toISOString(),
      ].join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tipjar-transactions-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Sync Status Banner */}
      {syncMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Search supporter, note, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center bg-muted rounded-xl p-1 border border-border text-xs">
            {["ALL", "COMPLETED", "PENDING", "FAILED"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  statusFilter === s
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "highest" | "lowest")}
            className="h-10 rounded-xl border border-input bg-card px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>

          {/* Sync with Chapa */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="gap-1.5 text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-medium"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing || hasPending ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""}`} />
            <span>{isSyncing ? "Checking..." : hasPending ? "Auto-Syncing..." : "Sync with Chapa"}</span>
          </Button>

          {/* Export CSV */}
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            disabled={filteredTips.length === 0}
            className="gap-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        {filteredTips.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground space-y-2">
            <Filter className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="font-semibold text-foreground">No transactions found</p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search criteria or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Transaction ID</th>
                  <th className="pb-3 px-3">Supporter</th>
                  <th className="pb-3 px-3">Amount</th>
                  <th className="pb-3 px-3">Message</th>
                  <th className="pb-3 px-3">Payment Method</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTips.map((tip) => (
                  <tr key={tip.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3.5 px-3 font-mono text-[11px] text-muted-foreground">
                      {tip.transactionRef}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-foreground">
                      {tip.supporterName}
                    </td>
                    <td className="py-3.5 px-3 font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatCurrency(tip.amount, tip.currency)}
                    </td>
                    <td className="py-3.5 px-3 max-w-[200px] truncate text-muted-foreground">
                      {tip.message || <span className="text-muted-foreground/60 italic">No message</span>}
                    </td>
                    <td className="py-3.5 px-3 text-muted-foreground">
                      {tip.paymentMethod}
                    </td>
                    <td className="py-3.5 px-3">
                      {tip.status === "COMPLETED" && (
                        <Badge variant="default" className="text-[10px] bg-emerald-600 text-white font-semibold">
                          Completed
                        </Badge>
                      )}
                      {tip.status === "PENDING" && (
                        <div className="flex items-center gap-1.5">
                          <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            Pending
                          </Badge>
                          <button
                            type="button"
                            title="Check payment status on Chapa"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerifyTip(tip.transactionRef);
                            }}
                            disabled={isVerifying}
                            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          >
                            <RefreshCw className={`h-3 w-3 ${isVerifying ? "animate-spin text-emerald-600" : ""}`} />
                          </button>
                        </div>
                      )}
                      {tip.status === "FAILED" && (
                        <Badge variant="destructive" className="text-[10px]">
                          Failed
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-muted-foreground whitespace-nowrap">
                      {formatDateTime(tip.createdAt)}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTip(tip)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      <Dialog open={!!selectedTip} onOpenChange={(open) => !open && setSelectedTip(null)}>
        {selectedTip && (
          <DialogContent onClose={() => setSelectedTip(null)} className="max-w-md">
            <DialogHeader>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                <CreditCard className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center text-xl text-foreground">Transaction Details</DialogTitle>
              <DialogDescription className="text-center text-xs font-mono text-muted-foreground">
                {selectedTip.transactionRef}
              </DialogDescription>
            </DialogHeader>

            <div className="my-5 space-y-3 bg-muted p-5 rounded-2xl border border-border text-xs">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                  {formatCurrency(selectedTip.amount, selectedTip.currency)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-bold">
                  {selectedTip.status === "COMPLETED" ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  ) : selectedTip.status === "FAILED" ? (
                    <span className="text-red-600 dark:text-red-400">Failed</span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5" /> Pending Confirmation
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Supporter Name:</span>
                <span className="font-semibold text-foreground">{selectedTip.supporterName}</span>
              </div>
              {selectedTip.supporterEmail && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Supporter Email:</span>
                  <span className="text-foreground">{selectedTip.supporterEmail}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Payment Provider:</span>
                <span className="text-foreground">{selectedTip.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="text-foreground">{formatDateTime(selectedTip.createdAt)}</span>
              </div>
              {selectedTip.message && (
                <div className="pt-2">
                  <span className="text-muted-foreground block mb-1">Supporter Message:</span>
                  <div className="p-3 rounded-xl bg-card text-foreground italic border border-border">
                    &ldquo;{selectedTip.message}&rdquo;
                  </div>
                </div>
              )}
            </div>

            {/* Pending actions */}
            {selectedTip.status === "PENDING" && (
              <div className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-3">
                <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
                  <RefreshCw className="h-4 w-4 shrink-0" />
                  <span>Verify or Confirm Payment</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  If the supporter completed payment on Chapa, click below to query Chapa’s gateway or manually confirm this tip.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    disabled={isVerifying}
                    onClick={() => handleVerifyTip(selectedTip.transactionRef, false)}
                    className="flex-1 text-xs gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isVerifying ? "animate-spin" : ""}`} />
                    <span>{isVerifying ? "Verifying..." : "Verify with Chapa"}</span>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isVerifying}
                    onClick={() => handleVerifyTip(selectedTip.transactionRef, true)}
                    className="flex-1 text-xs gap-1.5 font-semibold"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Confirm Paid</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Receipt and Close buttons */}
            <div className="space-y-2">
              <Link
                href={`/tip/callback?tx_ref=${selectedTip.transactionRef}`}
                target="_blank"
                className="w-full block"
              >
                <Button
                  type="button"
                  variant={selectedTip.status === "COMPLETED" ? "default" : "outline"}
                  className="w-full gap-2 font-semibold text-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Official Printable Receipt</span>
                </Button>
              </Link>

              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedTip(null)}
                className="w-full text-xs"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

