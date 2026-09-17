"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCheckout = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 400);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isNavigating}
      className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
    >
      <span>💳</span>
      <span>{isNavigating ? "Redirecting to Checkout..." : "Proceed to Checkout"}</span>
      <span>&rarr;</span>
    </button>
  );
}
