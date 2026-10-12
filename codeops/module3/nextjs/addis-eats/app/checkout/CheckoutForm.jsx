"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { placeOrderAction } from "../actions/orders";
import OrderStatusScreen from "../order-status/OrderStatusScreen";
import { etb } from "@/lib/format";
import { DELIVERY_ZONES, PROMO_CODES } from "@/lib/data";

export default function CheckoutForm({ initialPromo, session }) {
  const { cart, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [deliveryZone, setDeliveryZone] = useState("bole");
  const [address, setAddress] = useState("Bole Sub-City, Near Edna Mall, Addis Ababa");
  const [phone, setPhone] = useState("+251 91 123 4567");
  const [name, setName] = useState("Abebe Kebede");
  const [notes, setNotes] = useState("");
  const [promoCode, setPromoCode] = useState(initialPromo || "");
  const [idempotencyKey] = useState(() => `idemp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`);

  // React 19 Server Action State
  const [formState, formAction, isPending] = useActionState(placeOrderAction, {
    success: false,
    error: null,
    fieldErrors: null,
    order: null
  });

  const selectedZoneObj = DELIVERY_ZONES.find((z) => z.id === deliveryZone) || DELIVERY_ZONES[0];
  const deliveryFee = cart.length > 0 ? selectedZoneObj.fee : 0;

  // Calculate discount if promo is valid
  let promoDiscount = 0;
  const activePromo = promoCode ? PROMO_CODES[promoCode.trim().toUpperCase()] : null;
  if (activePromo && subtotal >= activePromo.minOrder) {
    if (activePromo.discountType === "fixed") {
      promoDiscount = Math.min(subtotal, activePromo.amount);
    } else if (activePromo.discountType === "percent") {
      promoDiscount = Math.round((subtotal * activePromo.amount) / 100);
    }
  }

  const total = Math.max(0, subtotal - promoDiscount + deliveryFee);

  // Clear client cart once order has been successfully confirmed via Server Action
  useEffect(() => {
    if (formState?.success && formState?.order) {
      clearCart();
    }
  }, [formState?.success, formState?.order, clearCart]);

  // Order Confirmed Success Screen -> Rendered via SWR-powered OrderStatusScreen
  if (formState?.success && formState?.order) {
    return (
      <OrderStatusScreen
        orderId={formState.order.id}
        fallbackData={formState.order}
      />
    );
  }

  // If cart is empty on checkout
  if (cart.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh] p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🍽️</div>
        <h1 className="text-2xl font-black text-stone-900 mb-2">
          No dishes to checkout
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Please select some items from the menu before completing checkout.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition min-h-[44px] inline-flex items-center justify-center cursor-pointer"
        >
          Go to Menu 🍛
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-stone-900">
          Complete Your Order 🛵
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Fast doorstep delivery in Addis Ababa with local mobile payments
        </p>
        {session && (
          <p className="text-xs text-stone-400 mt-1">
            Session: <span className="font-mono text-stone-600">{session}</span>
          </p>
        )}
        {initialPromo && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span>🏷️ Applied Cookie Promo:</span>
            <span className="font-bold uppercase">{initialPromo}</span>
          </div>
        )}
      </div>

      {/* Global Form Validation / Error banner */}
      {formState?.error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-2">
          <span>⚠️</span>
          <span>{formState.error}</span>
        </div>
      )}

      {/* Server Action Form */}
      <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hidden inputs to pass cart items & metadata into Server Action */}
        <input type="hidden" name="items" value={JSON.stringify(cart)} />
        <input type="hidden" name="promoCode" value={promoCode || ""} />
        <input type="hidden" name="paymentMethod" value={paymentMethod} />
        <input type="hidden" name="deliveryZone" value={deliveryZone} />
        <input type="hidden" name="idempotencyKey" value={idempotencyKey} />

        {/* Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Address Details Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span>📍</span> Delivery Location in Addis Ababa
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Abebe Kebede"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                    formState?.fieldErrors?.name
                      ? "border-rose-400 bg-rose-50/40 focus:ring-rose-400"
                      : "border-stone-200 bg-stone-50 focus:ring-orange-500 text-stone-900"
                  }`}
                />
                {formState?.fieldErrors?.name && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formState.fieldErrors.name[0]}
                  </p>
                )}
              </div>

              {/* Delivery Sub-City / Zone Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Addis Ababa Sub-City / Zone
                </label>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm font-medium text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} — {etb(zone.fee)} (Est. {zone.estimatedMins} min)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Specific Street / Landmark / Building
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House No. 412, opposite Edna Mall, near Alem Cinema"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                    formState?.fieldErrors?.address
                      ? "border-rose-400 bg-rose-50/40 focus:ring-rose-400"
                      : "border-stone-200 bg-stone-50 focus:ring-orange-500 text-stone-900"
                  }`}
                />
                {formState?.fieldErrors?.address && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formState.fieldErrors.address[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Phone Number for Driver
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +251 91 123 4567 or 0911234567"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:bg-white focus:outline-hidden focus:ring-2 ${
                    formState?.fieldErrors?.phone
                      ? "border-rose-400 bg-rose-50/40 focus:ring-rose-400"
                      : "border-stone-200 bg-stone-50 focus:ring-orange-500 text-stone-900"
                  }`}
                />
                {formState?.fieldErrors?.phone && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formState.fieldErrors.phone[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">
                  Delivery Notes / Gate Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ring the brown bell at Gate 3, call upon arrival"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span>💳</span> Ethiopian Payment Options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("telebirr")}
                className={`p-4 rounded-2xl text-center cursor-pointer transition min-h-[44px] ${
                  paymentMethod === "telebirr"
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-900 shadow-xs font-bold"
                    : "border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-2xl block mb-1">📱</span>
                <span className="text-xs font-bold block">Telebirr</span>
                <span className="text-[10px] text-stone-500 block">USSD / SuperApp</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cbe_birr")}
                className={`p-4 rounded-2xl text-center cursor-pointer transition min-h-[44px] ${
                  paymentMethod === "cbe_birr" || paymentMethod === "cbe"
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-900 shadow-xs font-bold"
                    : "border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-2xl block mb-1">🏦</span>
                <span className="text-xs font-bold block">CBE Birr</span>
                <span className="text-[10px] text-stone-500 block">Mobile Banking *847#</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 rounded-2xl text-center cursor-pointer transition min-h-[44px] ${
                  paymentMethod === "cash"
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-900 shadow-xs font-bold"
                    : "border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-2xl block mb-1">💵</span>
                <span className="text-xs font-bold block">Cash on Delivery</span>
                <span className="text-[10px] text-stone-500 block">Pay Driver in Person</span>
              </button>
            </div>
            {formState?.fieldErrors?.paymentMethod && (
              <p className="text-xs text-rose-600 mt-2 font-medium">
                {formState.fieldErrors.paymentMethod[0]}
              </p>
            )}
          </div>
        </div>

        {/* Order Final Summary */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-md flex flex-col justify-between h-fit">
          <div>
            <h2 className="text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-mono font-bold text-orange-600">
                {selectedZoneObj.estimatedMins} min
              </span>
            </h2>

            <div className="space-y-2.5 text-sm mb-6">
              {cart.map((item) => {
                const numericPrice = typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
                return (
                  <div key={item.id} className="flex justify-between text-stone-600 text-xs">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-bold text-stone-800">
                      {etb(numericPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
              <div className="flex justify-between text-stone-600 text-xs">
                <span>Delivery ({selectedZoneObj.name.split(" ")[0]})</span>
                <span className="font-bold text-stone-800">{etb(deliveryFee)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 text-xs font-bold">
                  <span>Promo Discount ({activePromo?.description})</span>
                  <span>-{etb(promoDiscount)}</span>
                </div>
              )}
              <div className="border-t border-stone-200 pt-3 flex justify-between font-black text-xl text-stone-900">
                <span>Amount Due:</span>
                <span className="text-orange-600">{etb(total)}</span>
              </div>
              {formState?.fieldErrors?.items && (
                <p className="text-xs text-rose-600 pt-2 font-medium">
                  {formState.fieldErrors.items[0]}
                </p>
              )}
            </div>

            {/* Promo Code input in checkout */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold text-stone-500 mb-1 uppercase tracking-wider">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ADDIS2026"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 uppercase text-stone-900"
                />
              </div>
              {activePromo && subtotal >= activePromo.minOrder && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1">
                  ✓ {activePromo.description}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 px-6 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-center rounded-2xl shadow-md shadow-emerald-600/25 transition cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Order...</span>
                </>
              ) : (
                <span>Confirm & Place Order ({etb(total)}) 🚀</span>
              )}
            </button>
            <Link
              href="/cart"
              className="block text-center text-xs font-bold text-stone-500 hover:text-stone-800 transition py-1 min-h-[44px] flex items-center justify-center"
            >
              &larr; Return to Cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
