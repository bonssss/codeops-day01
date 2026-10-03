"use client";

import * as React from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Download,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency, formatDateTime } from "@/lib/utils";

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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [sortBy, setSortBy] = React.useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [selectedTip, setSelectedTip] = React.useState<TipTransaction | null>(null);

  const filteredTips = React.useMemo(() => {
    return tips
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
  }, [tips, searchTerm, statusFilter, sortBy]);

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
      {/* Search & Filter Controls */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Search supporter, note, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center bg-neutral-900 rounded-xl p-1 border border-white/5 text-xs">
            {["ALL", "COMPLETED", "PENDING", "FAILED"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  statusFilter === s
                    ? "bg-amber-500 text-neutral-950 shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as unknown as "newest" | "oldest" | "highest" | "lowest")}
            className="h-10 rounded-xl border border-white/10 bg-neutral-900 px-3 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>

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
      <div className="glass-card rounded-3xl p-6">
        {filteredTips.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 space-y-2">
            <Filter className="h-8 w-8 mx-auto text-neutral-600 mb-2" />
            <p className="font-semibold text-white">No transactions found</p>
            <p className="text-xs text-neutral-500">
              Try adjusting your search criteria or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
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
              <tbody className="divide-y divide-white/5">
                {filteredTips.map((tip) => (
                  <tr key={tip.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-3 font-mono text-[11px] text-neutral-400">
                      {tip.transactionRef}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-white">
                      {tip.supporterName}
                    </td>
                    <td className="py-3.5 px-3 font-black text-amber-400 text-sm">
                      {formatCurrency(tip.amount, tip.currency)}
                    </td>
                    <td className="py-3.5 px-3 max-w-[200px] truncate text-neutral-300">
                      {tip.message || <span className="text-neutral-600 italic">No message</span>}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-400">
                      {tip.paymentMethod}
                    </td>
                    <td className="py-3.5 px-3">
                      {tip.status === "COMPLETED" && (
                        <Badge variant="success" className="text-[10px]">
                          Completed
                        </Badge>
                      )}
                      {tip.status === "PENDING" && (
                        <Badge variant="warning" className="text-[10px]">
                          Pending
                        </Badge>
                      )}
                      {tip.status === "FAILED" && (
                        <Badge variant="destructive" className="text-[10px]">
                          Failed
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-400 whitespace-nowrap">
                      {formatDateTime(tip.createdAt)}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTip(tip)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4 text-neutral-400 hover:text-white" />
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
              <div className="h-12 w-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-2">
                <CreditCard className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center text-xl">Transaction Details</DialogTitle>
              <DialogDescription className="text-center text-xs font-mono">
                {selectedTip.transactionRef}
              </DialogDescription>
            </DialogHeader>

            <div className="my-5 space-y-3 bg-neutral-950/80 p-5 rounded-2xl border border-white/5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Amount:</span>
                <span className="font-black text-amber-400 text-base">
                  {formatCurrency(selectedTip.amount, selectedTip.currency)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Status:</span>
                <span className="font-bold">
                  {selectedTip.status === "COMPLETED" ? (
                    <span className="text-emerald-400">Completed</span>
                  ) : selectedTip.status === "FAILED" ? (
                    <span className="text-rose-400">Failed</span>
                  ) : (
                    <span className="text-amber-400">Pending</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Supporter Name:</span>
                <span className="font-semibold text-white">{selectedTip.supporterName}</span>
              </div>
              {selectedTip.supporterEmail && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Supporter Email:</span>
                  <span className="text-neutral-300">{selectedTip.supporterEmail}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Payment Provider:</span>
                <span className="text-neutral-300">{selectedTip.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Timestamp:</span>
                <span className="text-neutral-300">{formatDateTime(selectedTip.createdAt)}</span>
              </div>
              {selectedTip.message && (
                <div className="pt-2">
                  <span className="text-neutral-400 block mb-1">Supporter Message:</span>
                  <div className="p-3 rounded-xl bg-white/[0.03] text-neutral-200 italic border border-white/5">
                    &ldquo;{selectedTip.message}&rdquo;
                  </div>
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedTip(null)}
              className="w-full"
            >
              Close
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
