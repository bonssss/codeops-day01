"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CheckoutButton from "./CheckoutButton";
import { etb } from "@/lib/format";
import { PROMO_CODES } from "@/lib/data";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItemsCount } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const defaultDeliveryFee = cart.length > 0 ? 50 : 0; // 50 ETB standard local delivery

  // Calculate discount if promo applied
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === "fixed") {
      discountAmount = Math.min(subtotal, appliedPromo.amount);
    } else if (appliedPromo.discountType === "percent") {
      discountAmount = Math.round((subtotal * appliedPromo.amount) / 100);
    }
  }

  const total = Math.max(0, subtotal - discountAmount + defaultDeliveryFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    const promo = PROMO_CODES[clean];
    if (!promo) {
      setPromoError("Invalid promo code. Try ADDIS2026 or HABESHA10");
      return;
    }

    if (subtotal < promo.minOrder) {
      setPromoError(`Minimum order of ${etb(promo.minOrder)} required for this code.`);
      return;
    }

    setAppliedPromo({ code: clean, ...promo });
    setPromoInput("");
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh] p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-black text-stone-900 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Looks like you haven&apos;t added any delicious Ethiopian dishes yet.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3.5 min-h-[44px] inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition cursor-pointer"
        >
          Explore Menu & Add Dishes 🍲
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">
            Shopping Cart ({totalItemsCount} {totalItemsCount === 1 ? "dish" : "dishes"})
          </h1>
          <p className="text-sm text-stone-500 mt-1">Review your authentic Ethiopian order before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer min-h-[44px] px-3 flex items-center justify-center"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => {
            const numericPrice = typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white border border-stone-200/80 rounded-3xl shadow-xs gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="text-3xl p-2.5 sm:p-3 bg-orange-50 border border-orange-100 rounded-2xl shrink-0">
                    {item.emoji || "🍲"}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    {item.amharicName && (
                      <span className="text-xs text-stone-400 font-medium block">
                        {item.amharicName}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-black text-orange-600 block mt-0.5">
                      {etb(numericPrice)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-stone-700 hover:bg-white rounded-lg transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-extrabold text-xs text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-stone-700 hover:bg-white rounded-lg transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-extrabold text-sm text-stone-900 min-w-18 text-right hidden sm:inline">
                    {etb(numericPrice * item.quantity)}
                  </span>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-400 hover:text-red-500 p-2 text-sm transition cursor-pointer rounded-lg hover:bg-stone-50"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          {/* Kitchen / Delivery Special Notes */}
          <div className="p-4 bg-white border border-stone-200/80 rounded-3xl shadow-xs">
            <label className="block text-xs font-bold text-stone-700 mb-2 flex items-center gap-1.5">
              <span>📝</span> Kitchen & Packaging Instructions
            </label>
            <input
              type="text"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Extra teff injera rolls, separate awaze container, no disposable plastic"
              className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-stone-900"
            />
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-md flex flex-col justify-between h-fit space-y-6">
          <div>
            <h2 className="text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Addis Ababa Delivery
              </span>
            </h2>

            <div className="space-y-3 text-sm text-stone-600 mb-6">
              <div className="flex justify-between">
                <span>Dishes Subtotal</span>
                <span className="font-bold text-stone-900">{etb(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Delivery (Addis Ababa)</span>
                <span className="font-bold text-stone-900">{etb(defaultDeliveryFee)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promo ({appliedPromo.code})</span>
                  <span>-{etb(discountAmount)}</span>
                </div>
              )}
              <div className="border-t border-stone-200 pt-3 flex justify-between font-black text-xl text-stone-900">
                <span>Total Amount:</span>
                <span className="text-orange-600">{etb(total)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="mb-4">
              <label className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase tracking-wider">
                Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="ADDIS2026 or HABESHA10"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl uppercase font-mono tracking-wider focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 min-h-[44px] bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium mt-1.5">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1.5">
                  ✓ {appliedPromo.description}
                </p>
              )}
            </form>
          </div>

          <div className="space-y-3">
            <CheckoutButton />
            <Link
              href="/menu"
              className="block text-center text-xs font-bold text-stone-500 hover:text-stone-800 transition py-1"
            >
              &larr; Continue Exploring Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
