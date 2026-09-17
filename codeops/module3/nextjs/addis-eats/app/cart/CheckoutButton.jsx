"use client";

import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
    >
      Proceed to Checkout (useRouter) &rarr;
    </button>
  );
}
