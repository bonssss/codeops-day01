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
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
      {/* Quantity Selector */}
      <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 p-1">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="w-9 h-9 flex items-center justify-center font-bold text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 rounded-lg transition"
        >
          -
        </button>
        <span className="w-10 text-center font-bold text-sm text-stone-900 dark:text-stone-100">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-9 h-9 flex items-center justify-center font-bold text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 rounded-lg transition"
        >
          +
        </button>
      </div>

      {/* Add To Cart */}
      <button
        onClick={handleAddToCart}
        className={`px-6 py-3 font-bold rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
          added
            ? "bg-green-600 border-green-600 text-white"
            : "bg-white dark:bg-stone-800 border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700"
        }`}
      >
        <span>{added ? "✓" : "🛒"}</span>
        <span>{added ? "Added to Cart!" : "Add to Cart"}</span>
      </button>

      {/* Buy Now & View Cart (useRouter) */}
      <button
        onClick={handleAddAndCheckout}
        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-md shadow-amber-600/30 hover:shadow-amber-600/40 transition-all duration-200 cursor-pointer flex items-center gap-2"
      >
        <span>Order & View Cart</span>
        <span>&rarr;</span>
      </button>
    </div>
  );
}
