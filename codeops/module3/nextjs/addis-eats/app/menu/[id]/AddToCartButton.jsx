"use client";

import { useRouter } from "next/navigation";

export default function AddToCartButton({ dishName }) {
  const router = useRouter();

  const handleAddToCart = () => {
    // Navigate to cart
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow hover:bg-amber-700 transition"
    >
      Add {dishName || "Item"} to Cart & View Cart (useRouter) &rarr;
    </button>
  );
}
