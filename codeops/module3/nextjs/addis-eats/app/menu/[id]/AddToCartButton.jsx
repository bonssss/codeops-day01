"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function AddToCartButton({ dish }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleAddAndCheckout = () => {
    addToCart(dish, quantity);
    router.push("/cart");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
      {/* Quantity Selector */}
      <div className="flex items-center border border-stone-200 rounded-2xl bg-stone-50 p-1">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="w-10 h-10 flex items-center justify-center font-bold text-stone-700 hover:bg-white rounded-xl transition cursor-pointer"
        >
          -
        </button>
        <span className="w-10 text-center font-extrabold text-sm text-stone-900">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-10 h-10 flex items-center justify-center font-bold text-stone-700 hover:bg-white rounded-xl transition cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Add To Cart */}
      <button
        onClick={handleAddToCart}
        className={`px-6 py-3.5 font-bold rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
          added
            ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
            : "bg-white border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 shadow-2xs"
        }`}
      >
        <span>{added ? "✓" : "🛒"}</span>
        <span>{added ? "Added to Cart!" : "Add to Cart"}</span>
      </button>

      {/* Buy Now & View Cart */}
      <button
        onClick={handleAddAndCheckout}
        className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 hover:shadow-orange-600/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2"
      >
        <span>Order & View Cart</span>
        <span>&rarr;</span>
      </button>
    </div>
  );
}
