import Link from "next/link";

export default function Checkout() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-zinc-50 font-sans dark:bg-black min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md max-w-md w-full mb-6 text-left">
        <h2 className="font-semibold mb-2">Delivery Information</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Address: Bole Medhanealem, Addis Ababa</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Payment: Telebirr / Cash on Delivery</p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/cart"
          className="px-6 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          &larr; Back to Cart
        </Link>
        <Link
          href="/"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Place Order & Home
        </Link>
      </div>
    </div>
  );
}
