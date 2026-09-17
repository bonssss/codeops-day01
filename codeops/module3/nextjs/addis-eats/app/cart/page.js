import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-zinc-50 font-sans dark:bg-black min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md max-w-md w-full mb-6">
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">1x Doro Wat - $15.00</p>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">1x Shiro Wat - $11.00</p>
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 font-bold text-lg flex justify-between">
          <span>Total:</span>
          <span>$26.00</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <CheckoutButton />
        <Link href="/menu" className="text-sm text-blue-500 hover:underline">
          &larr; Continue Shopping (Menu)
        </Link>
      </div>
    </div>
  );
}
