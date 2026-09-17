"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [address, setAddress] = useState("Bole Sub-City, Near Edna Mall, Addis Ababa");
  const [phone, setPhone] = useState("+251 91 123 4567");
  const [name, setName] = useState("Abebe Kebede");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const deliveryFee = cart.length > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsPlacing(true);
    const newOrderId = `AE-${Math.floor(10000 + Math.random() * 90000)}`;
    
    setTimeout(() => {
      setOrderId(newOrderId);
      setIsPlacing(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1000);
  };

  // Order Confirmed Success Screen
  if (orderConfirmed) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[65vh] px-4 py-12 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-950/60 rounded-full flex items-center justify-center text-4xl mb-4 border border-green-300 dark:border-green-800 animate-bounce">
          🎉
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-3 py-1 rounded-full mb-3">
          Order Placed Successfully!
        </span>
        <h1 className="text-3xl font-black text-stone-900 dark:text-white mb-2">
          Thank You, {name.split(" ")[0]}!
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          Your order <strong className="text-amber-600 font-mono">{orderId}</strong> has been received and is being freshly prepared in our kitchen.
        </p>

        <div className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 mb-8 text-left text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-stone-500">Estimated Delivery:</span>
            <span className="font-bold text-stone-900 dark:text-stone-100">30 - 40 Mins</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Delivery Address:</span>
            <span className="font-bold text-stone-900 dark:text-stone-100 text-right max-w-[200px] truncate">{address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Payment:</span>
            <span className="font-bold text-stone-900 dark:text-stone-100 uppercase">{paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/menu"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md transition text-center"
          >
            Order More Dishes 🍲
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold rounded-xl hover:bg-stone-300 dark:hover:bg-stone-700 transition text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty on checkout
  if (cart.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh] p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">🍽️</div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-2">
          No items to checkout
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Please add some dishes from the menu before proceeding to checkout.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md shadow-amber-600/30 transition"
        >
          Go to Menu 🍛
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-stone-900 dark:text-stone-100">
          Complete Your Order 🛵
        </h1>
        <p className="text-sm text-stone-500 mt-1">Enter your delivery details and choose your payment method</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Address Details Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <span>📍</span> Delivery & Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Delivery Address in Addis</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Phone Number for Driver</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <span>💳</span> Payment Method
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("telebirr")}
                className={`p-3.5 rounded-xl text-center cursor-pointer transition ${
                  paymentMethod === "telebirr"
                    ? "border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300"
                    : "border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400"
                }`}
              >
                <span className="text-2xl block mb-1">📱</span>
                <span className="text-xs font-bold block">Telebirr</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cbe")}
                className={`p-3.5 rounded-xl text-center cursor-pointer transition ${
                  paymentMethod === "cbe"
                    ? "border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300"
                    : "border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400"
                }`}
              >
                <span className="text-2xl block mb-1">🏦</span>
                <span className="text-xs font-bold block">CBE Birr</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`p-3.5 rounded-xl text-center cursor-pointer transition ${
                  paymentMethod === "cash"
                    ? "border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300"
                    : "border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400"
                }`}
              >
                <span className="text-2xl block mb-1">💵</span>
                <span className="text-xs font-bold block">Cash on Delivery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Final Summary */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-md flex flex-col justify-between h-fit">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
            Order Total
          </h2>

          <div className="space-y-2.5 text-sm mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-stone-600 dark:text-stone-400 text-xs">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  ${((typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-stone-600 dark:text-stone-400 text-xs">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-800 pt-3 flex justify-between font-black text-xl text-stone-900 dark:text-white">
              <span>Amount Due:</span>
              <span className="text-amber-600 dark:text-amber-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-center rounded-xl shadow-lg shadow-green-600/30 hover:shadow-green-600/40 transition cursor-pointer disabled:opacity-75"
            >
              {isPlacing ? "Processing Order..." : "Confirm & Place Order 🚀"}
            </button>
            <Link
              href="/cart"
              className="block text-center text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition py-1"
            >
              &larr; Return to Cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
