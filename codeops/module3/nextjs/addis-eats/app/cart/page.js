"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItemsCount } = useCart();

  const deliveryFee = cart.length > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

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
          className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition"
        >
          Explore Menu & Add Dishes 🍲
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">
            Shopping Cart ({totalItemsCount} {totalItemsCount === 1 ? "item" : "items"})
          </h1>
          <p className="text-sm text-stone-500 mt-1">Review your dishes and adjust quantities</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-5 bg-white border border-stone-200/80 rounded-3xl shadow-xs"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl p-3 bg-orange-50 border border-orange-100 rounded-2xl">
                  {item.emoji || "🍲"}
                </span>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {item.name}
                  </h3>
                  <span className="text-sm font-black text-orange-600 block mt-0.5">
                    ${(typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-0.5">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-stone-700 hover:bg-white rounded-lg transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-extrabold text-xs text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-stone-700 hover:bg-white rounded-lg transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-400 hover:text-red-500 p-1.5 text-sm transition cursor-pointer"
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-3 text-xs text-orange-900">
            <span>🎁</span>
            <span className="font-medium">Free delivery promotion applied for central Addis Ababa locations!</span>
          </div>
        </div>

        {/* Order Summary Receipt */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-md flex flex-col justify-between h-fit">
          <h2 className="text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal ({totalItemsCount} items)</span>
              <span className="font-bold text-stone-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-stone-800">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between font-black text-xl text-stone-900">
              <span>Total:</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <CheckoutButton />
            <Link
              href="/menu"
              className="block text-center text-xs font-bold text-stone-500 hover:text-stone-800 transition py-1"
            >
              + Add More Dishes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
