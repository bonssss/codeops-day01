"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { etb, when, relative } from "@/lib/format";
import { cancelOrderAction } from "@/app/actions/orders";

// Requirement 1: Build the map as a dynamic client component with ssr:false and a sized placeholder
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      data-testid="map-sized-placeholder"
      className="w-full h-72 sm:h-80 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col items-center justify-center text-stone-400 animate-pulse my-6"
      style={{ height: "300px" }}
      aria-label="Loading delivery tracking map"
    >
      <span className="text-3xl mb-2">🗺️</span>
      <span className="text-sm font-semibold text-stone-200">Loading Live Delivery Map...</span>
      <span className="text-xs text-stone-500">Auto-fitting courier and delivery markers</span>
    </div>
  ),
});

const STATUS_STEPS = [
  { key: "confirmed", label: "Confirmed", icon: "🍳" },
  { key: "preparing", label: "Preparing", icon: "📦" },
  { key: "out_for_delivery", label: "On the Way", icon: "🛵" },
  { key: "delivered", label: "Delivered", icon: "😋" },
];

export default function OrderStatusScreen({ orderId, fallbackData }) {
  // Requirement 4: Seeded from the server (fallbackData)
  const [order, setOrder] = useState(fallbackData);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState(null);

  // Sync state if fallbackData updates from server
  useEffect(() => {
    if (fallbackData) {
      setOrder(fallbackData);
    }
  }, [fallbackData]);

  // Requirements 3, 4, 5: Consume SSE via EventSource, close on unmount, close on delivery
  useEffect(() => {
    if (!orderId) return;

    // If order is already delivered or cancelled, close stream deliberately
    if (order?.status === "delivered" || order?.status === "cancelled") {
      setConnectionStatus("delivered_closed");
      return;
    }

    setConnectionStatus("connecting");
    const eventSource = new EventSource(`/api/orders/${encodeURIComponent(orderId)}/stream`);

    eventSource.onopen = () => {
      setConnectionStatus("connected");
    };

    eventSource.addEventListener("order_update", (event) => {
      try {
        const data = JSON.parse(event.data);
        setOrder(data);
        if (data.status === "delivered" || data.status === "cancelled") {
          // Requirement 5: Close stream deliberately on delivery
          eventSource.close();
          setConnectionStatus("delivered_closed");
        }
      } catch (err) {
        console.error("Error parsing order_update SSE:", err);
      }
    });

    eventSource.addEventListener("delivered", (event) => {
      try {
        const data = JSON.parse(event.data);
        setOrder(data);
      } catch {}
      // Requirement 5: Deliberately close stream on delivery
      eventSource.close();
      setConnectionStatus("delivered_closed");
    });

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) {
        setConnectionStatus("closed");
      } else {
        setConnectionStatus("reconnecting");
      }
    };

    // Requirement 4: Closing it on unmount
    return () => {
      eventSource.close();
    };
  }, [orderId, order?.status]);

  const handleCancel = async (id) => {
    setIsCancelling(true);
    try {
      const res = await cancelOrderAction(id);
      if (res.success) {
        setCancelMessage(res.message || "Order successfully cancelled.");
        setOrder((prev) => (prev ? { ...prev, status: "cancelled" } : null));
        setConnectionStatus("delivered_closed");
      } else {
        setCancelMessage(res.error || "Failed to cancel order.");
      }
    } catch (err) {
      setCancelMessage(err.message || "Error cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (!order) {
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

  const isCancelled = order.status === "cancelled";
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[65vh] px-4 py-8 max-w-xl mx-auto w-full">
      {/* Requirement 5: Connection Indicator */}
      <div
        data-testid="sse-connection-bar"
        className="w-full flex items-center justify-between mb-4 px-1 text-xs"
      >
        <div
          data-testid="connection-indicator"
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-medium ${
            connectionStatus === "connected"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : connectionStatus === "delivered_closed"
              ? "bg-stone-100 border-stone-200 text-stone-600"
              : connectionStatus === "reconnecting"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              connectionStatus === "connected"
                ? "bg-emerald-500 animate-pulse"
                : connectionStatus === "delivered_closed"
                ? "bg-stone-400"
                : "bg-amber-500 animate-ping"
            }`}
          />
          <span className="font-semibold">
            {connectionStatus === "connected" && "SSE Stream Connected (Live)"}
            {connectionStatus === "connecting" && "SSE Connecting..."}
            {connectionStatus === "delivered_closed" && "Stream Closed on Delivery"}
            {connectionStatus === "reconnecting" && "SSE Reconnecting..."}
            {connectionStatus === "closed" && "SSE Stream Inactive"}
          </span>
        </div>

        <span className="text-[11px] text-stone-400 font-mono">
          Placed {relative(order.createdAt)}
        </span>
      </div>

      {/* Main Status Header Card */}
      <div className="w-full bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-xs text-center mb-6">
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
            ? "Delivered Successfully"
            : "Simmering & In Progress"}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">
          {isCancelled ? "Order Cancelled" : `Order #${order.id}`}
        </h1>

        <p className="text-sm text-stone-600 mb-4">
          Customer: <strong className="text-stone-900">{order.name}</strong> • Order time:{" "}
          <span className="font-medium text-stone-800">{when(order.createdAt)}</span>
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

        {/* Order Details Breakdown with format utilities */}
        <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-3 mt-4">
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
            <span className="text-stone-500 font-medium">Delivery Destination:</span>
            <span className="font-semibold text-stone-900 text-right max-w-[240px]">
              {order.address}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Timestamp:</span>
            <span className="font-medium text-stone-700">
              {when(order.createdAt)} ({relative(order.createdAt)})
            </span>
          </div>

          <div className="pt-2 border-t border-stone-200/80 flex justify-between items-center text-sm">
            <span className="font-bold text-stone-800">Total Charged:</span>
            {/* Requirement 6: Use etb formatter */}
            <span className="font-mono font-black text-orange-600 text-base">
              {etb(order.total)}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {!isCancelled && order.status !== "delivered" && (
            <button
              onClick={() => handleCancel(order.id)}
              disabled={isCancelling}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition disabled:opacity-50"
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 border border-stone-200 hover:bg-stone-200 transition"
          >
            View in Dashboard
          </Link>
        </div>
      </div>

      {/* Requirement 1 & 2: Dynamic Map with ssr:false and sized placeholder */}
      {!isCancelled && (
        <DeliveryMap
          orderStatus={order.status}
          customerAddress={order.address}
          courierName="Kidus"
          courierPhone="+251 91 234 5678"
        />
      )}
    </div>
  );
}
