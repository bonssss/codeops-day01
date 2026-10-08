"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { cancelOrderAction } from "@/app/actions/orders";
import { useState } from "react";

const STATUS_STEPS = [
  { key: "confirmed", label: "Confirmed", icon: "🍳" },
  { key: "preparing", label: "Preparing", icon: "📦" },
  { key: "out_for_delivery", label: "On the Way", icon: "🛵" },
  { key: "delivered", label: "Delivered", icon: "😋" },
];

export default function OrderStatusScreen({ orderId, fallbackData }) {
  // SWR handles all data fetching, caching, and background polling.
  // No useEffect and no useState for the order data!
  const {
    data: order,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR(
    orderId ? `/api/orders/${orderId}` : null,
    fetcher,
    {
      fallbackData,
      refreshInterval: 3000, // 3-second polling interval (verify in Network tab)
      revalidateOnFocus: true,
      dedupingInterval: 1000,
    }
  );

  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState(null);

  const handleCancel = async (id) => {
    setIsCancelling(true);
    try {
      const res = await cancelOrderAction(id);
      if (res.success) {
        setCancelMessage(res.message || "Order successfully cancelled.");
        // Optimistically update SWR cache
        mutate({ ...order, status: "cancelled" }, false);
      } else {
        setCancelMessage(res.error || "Failed to cancel order.");
      }
    } catch (err) {
      setCancelMessage(err.message || "Error cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-3xl mb-4">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Order Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">
          Could not retrieve details for order <code className="font-mono text-stone-800">{orderId}</code>.
        </p>
        <Link
          href="/menu"
          className="px-5 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs hover:bg-orange-700 transition"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  if (isLoading && !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center max-w-md mx-auto">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent mb-4" />
        <p className="text-sm font-medium text-stone-600">Loading order status...</p>
      </div>
    );
  }

  if (!order) return null;

  const isCancelled = order.status === "cancelled";
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[65vh] px-4 py-10 max-w-xl mx-auto w-full">
      {/* Network Polling Live Status Badge */}
      <div className="w-full flex items-center justify-between mb-4 px-1 text-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-medium">
          <span className={`w-2 h-2 rounded-full ${isValidating ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
          <span>Polling: <strong>3s refreshInterval</strong></span>
        </div>
        <span className="text-[11px] text-stone-400 font-mono">
          {isValidating ? "Refreshing..." : "Synced with server"}
        </span>
      </div>

      {/* Main Status Header Card */}
      <div className="w-full bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-sm text-center mb-6">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 border ${
            isCancelled
              ? "bg-rose-50 border-rose-200 text-rose-600"
              : order.status === "delivered"
              ? "bg-emerald-50 border-emerald-200"
              : "bg-orange-50 border-orange-200 animate-pulse"
          }`}
        >
          {isCancelled ? "❌" : order.status === "delivered" ? "😋" : "🍲"}
        </div>

        <span
          className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 inline-block border ${
            isCancelled
              ? "text-rose-700 bg-rose-50 border-rose-200"
              : order.status === "delivered"
              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
              : "text-orange-700 bg-orange-50 border-orange-200"
          }`}
        >
          {isCancelled
            ? "Order Cancelled"
            : order.status === "delivered"
            ? "Order Delivered"
            : "Simmering & In Progress"}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">
          {isCancelled
            ? "Order Cancelled"
            : `Order #${order.id}`}
        </h1>

        <p className="text-sm text-stone-600 mb-6">
          {isCancelled ? (
            <span>Your order <strong className="font-mono text-stone-800">{order.id}</strong> has been cancelled.</span>
          ) : (
            <span>
              Customer: <strong className="text-stone-900">{order.name}</strong> • Status updates live via SWR
            </span>
          )}
        </p>

        {/* Status Stepper Timeline */}
        {!isCancelled && (
          <div className="relative my-6 px-2">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-stone-100 border border-stone-200">
              <div
                style={{
                  width: `${
                    currentStepIndex >= 0
                      ? ((currentStepIndex + 1) / STATUS_STEPS.length) * 100
                      : 25
                  }%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-600 transition-all duration-700"
              />
            </div>
            <div className="grid grid-cols-4 gap-0.5 sm:gap-1 text-center">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;
                return (
                  <div key={step.key} className="flex flex-col items-center px-0.5">
                    <span className="text-base sm:text-lg mb-1">{step.icon}</span>
                    <span
                      className={`text-[9px] sm:text-xs font-bold leading-tight break-words ${
                        isCurrent
                          ? "text-orange-600 font-black"
                          : isPassed
                          ? "text-stone-800"
                          : "text-stone-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cancellation Message Banner */}
        {cancelMessage && (
          <div className="p-3 mb-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            ℹ️ {cancelMessage}
          </div>
        )}

        {/* Order Details Breakdown */}
        <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-3 mt-6">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200/80">
            <span className="text-stone-500 font-medium">Order Status:</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                isCancelled
                  ? "bg-rose-100 text-rose-700"
                  : order.status === "delivered"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Estimated Delivery:</span>
            <span className="font-bold text-stone-900">
              {isCancelled ? "N/A" : order.status === "delivered" ? "Delivered" : "20 - 30 Mins"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Delivery Address:</span>
            <span className="font-bold text-stone-900 text-right max-w-[160px] sm:max-w-[240px] truncate">
              {order.address}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Payment Method:</span>
            <span className="font-bold text-stone-900 uppercase">{order.paymentMethod}</span>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="pt-2 border-t border-stone-200/80">
              <span className="text-stone-500 font-medium block mb-1.5">Items:</span>
              <ul className="space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-stone-700">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between pt-2 border-t border-stone-200/80">
            <span className="text-stone-700 font-bold">Total Amount:</span>
            <span className="font-black text-orange-600 text-sm">
              ${order.total ? order.total.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          {!isCancelled && order.status !== "delivered" && (
            <button
              onClick={() => handleCancel(order.id)}
              disabled={isCancelling}
              className="px-5 py-3 bg-stone-100 hover:bg-rose-50 text-rose-700 border border-stone-200 hover:border-rose-200 font-bold rounded-2xl transition cursor-pointer text-xs disabled:opacity-50"
            >
              {isCancelling ? "Cancelling..." : "Cancel Order 🚫"}
            </button>
          )}

          <Link
            href="/menu"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition text-center text-xs flex items-center justify-center gap-1.5"
          >
            Explore Menu 🍲
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-stone-100 text-stone-800 font-bold rounded-2xl hover:bg-stone-200 transition text-center text-xs flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
