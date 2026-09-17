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
    }, 300);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isNavigating}
      className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-md shadow-emerald-600/25 hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
    >
      <span>💳</span>
      <span>{isNavigating ? "Redirecting..." : "Proceed to Checkout"}</span>
      <span>&rarr;</span>
    </button>
  );
}
