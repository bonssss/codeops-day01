"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ dishName }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      router.push("/cart");
    }, 400);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-amber-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
    >
      <span>🛒</span>
      <span>{isAdding ? "Adding to Cart..." : `Add ${dishName || "Item"} to Cart`}</span>
      <span>&rarr;</span>
    </button>
  );
}
