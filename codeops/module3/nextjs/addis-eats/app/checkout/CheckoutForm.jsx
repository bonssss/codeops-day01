"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { placeOrderAction } from "../actions/orders";
import OrderStatusScreen from "../order-status/OrderStatusScreen";

export default function CheckoutForm({ initialPromo, session }) {
  const { cart, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [address, setAddress] = useState("Bole Sub-City, Near Edna Mall, Addis Ababa");
  const [phone, setPhone] = useState("+251 91 123 4567");
  const [name, setName] = useState("Abebe Kebede");

  // React 19 Server Action State
  const [formState, formAction, isPending] = useActionState(placeOrderAction, {
    success: false,
    error: null,
    fieldErrors: null,
    order: null
  });

  const deliveryFee = cart.length > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

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
          className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition"
        >
          Go to Menu 🍛
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-stone-900">
          Complete Your Order 🛵
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Enter your delivery location and payment option (Powered by Next.js Server Actions)
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

      {/* Server Action Form (Exercises 5 & 6) */}
      <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hidden inputs to pass cart items & promo into Server Action */}
        <input type="hidden" name="items" value={JSON.stringify(cart)} />
        <input type="hidden" name="promoCode" value={initialPromo || ""} />
        <input type="hidden" name="paymentMethod" value={paymentMethod} />

        {/* Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Address Details Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span>📍</span> Delivery Information
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
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                    formState?.fieldErrors?.name
                      ? "border-rose-400 bg-rose-50/40 focus:ring-rose-400"
                      : "border-stone-200 bg-stone-50 focus:ring-orange-500"
                  }`}
                />
                {formState?.fieldErrors?.name && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formState.fieldErrors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Delivery Address in Addis</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                    formState?.fieldErrors?.address
                      ? "border-rose-400 bg-rose-50/40 focus:ring-rose-400"
                      : "border-stone-200 bg-stone-50 focus:ring-orange-500"
                  }`}
                />
                {formState?.fieldErrors?.address && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formState.fieldErrors.address[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Phone Number for Driver</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                    formState?.fieldErrors?.phone
                      ? "border-rose-400 bg-rose-50/40 focus:ring-rose-400"
                      : "border-stone-200 bg-stone-50 focus:ring-orange-500"
                  }`}
                />
                {formState?.fieldErrors?.phone && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formState.fieldErrors.phone[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span>💳</span> Payment Option
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("telebirr")}
                className={`p-4 rounded-2xl text-center cursor-pointer transition ${
                  paymentMethod === "telebirr"
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-900 shadow-xs"
                    : "border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-2xl block mb-1">📱</span>
                <span className="text-xs font-bold block">Telebirr</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cbe")}
                className={`p-4 rounded-2xl text-center cursor-pointer transition ${
                  paymentMethod === "cbe"
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-900 shadow-xs"
                    : "border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-2xl block mb-1">🏦</span>
                <span className="text-xs font-bold block">CBE Birr</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 rounded-2xl text-center cursor-pointer transition ${
                  paymentMethod === "cash"
                    ? "border-2 border-orange-500 bg-orange-50 text-orange-900 shadow-xs"
                    : "border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className="text-2xl block mb-1">💵</span>
                <span className="text-xs font-bold block">Cash on Delivery</span>
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
          <h2 className="text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100">
            Order Total
          </h2>

          <div className="space-y-2.5 text-sm mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-stone-600 text-xs">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-bold text-stone-800">
                  ${((typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-stone-600 text-xs">
              <span>Delivery Fee</span>
              <span className="font-bold text-stone-800">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between font-black text-xl text-stone-900">
              <span>Amount Due:</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>
            {formState?.fieldErrors?.items && (
              <p className="text-xs text-rose-600 pt-2 font-medium">
                {formState.fieldErrors.items[0]}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-center rounded-2xl shadow-md shadow-emerald-600/25 transition cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Order...</span>
                </>
              ) : (
                <span>Confirm & Place Order 🚀</span>
              )}
            </button>
            <Link
              href="/cart"
              className="block text-center text-xs font-bold text-stone-500 hover:text-stone-800 transition py-1"
            >
              &larr; Return to Cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
