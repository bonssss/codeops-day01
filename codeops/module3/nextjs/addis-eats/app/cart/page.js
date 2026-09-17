import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const items = [
    { id: 1, name: "Doro Wat", price: 15.0, qty: 1, emoji: "🍗", extras: "Extra spicy + 2 Injera" },
    { id: 2, name: "Shiro Wat", price: 11.0, qty: 1, emoji: "🍲", extras: "Mild butter + 2 Injera" },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 2.5;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-stone-100">
            Shopping Cart
          </h1>
          <p className="text-sm text-stone-500 mt-1">Review your selected dishes before checkout</p>
        </div>
        <Link
          href="/menu"
          className="text-sm font-semibold text-amber-600 hover:underline flex items-center gap-1"
        >
          + Add more items
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl">
                  {item.emoji}
                </span>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-500">{item.extras}</p>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-1 block">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                  Qty: {item.qty}
                </span>
              </div>
            </div>
          ))}

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 rounded-2xl flex items-center gap-3 text-xs text-amber-900 dark:text-amber-300">
            <span>🎁</span>
            <span>Free delivery promo automatically applied for orders in Addis Ababa!</span>
          </div>
        </div>

        {/* Order Summary Receipt */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-md flex flex-col justify-between h-fit">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Subtotal (2 items)</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Standard Delivery</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-800 pt-3 flex justify-between font-black text-lg text-stone-900 dark:text-white">
              <span>Total:</span>
              <span className="text-amber-600 dark:text-amber-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <CheckoutButton />
            <Link
              href="/menu"
              className="block text-center text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition py-1"
            >
              &larr; Continue Ordering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
