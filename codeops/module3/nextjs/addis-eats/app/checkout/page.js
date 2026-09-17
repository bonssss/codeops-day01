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
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mb-4 border border-emerald-200 animate-bounce">
          🎉
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3">
          Order Placed Successfully!
        </span>
        <h1 className="text-3xl font-black text-stone-900 mb-2">
          Thank You, {name.split(" ")[0]}!
        </h1>
        <p className="text-sm text-stone-600 mb-6">
          Your order <strong className="text-orange-600 font-mono">{orderId}</strong> is received and currently simmering in our kitchen.
        </p>

        <div className="w-full bg-white border border-stone-200/80 rounded-3xl p-6 mb-8 text-left text-xs space-y-3 shadow-xs">
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Estimated Delivery:</span>
            <span className="font-bold text-stone-900">25 - 35 Mins</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Delivery Address:</span>
            <span className="font-bold text-stone-900 text-right max-w-[220px] truncate">{address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Payment Method:</span>
            <span className="font-bold text-stone-900 uppercase">{paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/menu"
            className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition text-center"
          >
            Order More Dishes 🍲
          </Link>
          <Link
            href="/"
            className="px-6 py-3.5 bg-stone-100 text-stone-800 font-bold rounded-2xl hover:bg-stone-200 transition text-center"
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
        <p className="text-sm text-stone-500 mt-1">Enter your delivery location and payment option</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Delivery Address in Addis</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Phone Number for Driver</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span>💳</span> Payment Option
            </h2>
            <div className="grid grid-cols-3 gap-3">
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
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-center rounded-2xl shadow-md shadow-emerald-600/25 transition cursor-pointer disabled:opacity-75"
            >
              {isPlacing ? "Confirming Order..." : "Confirm & Place Order 🚀"}
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
