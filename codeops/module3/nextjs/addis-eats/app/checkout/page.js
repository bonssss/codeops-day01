import Link from "next/link";

export default function Checkout() {
  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-stone-900 dark:text-stone-100">
          Complete Your Order 🛵
        </h1>
        <p className="text-sm text-stone-500 mt-1">Enter your delivery details and choose your payment method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Details Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <span>📍</span> Delivery Address
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Sub-City & Area</label>
                <input
                  type="text"
                  defaultValue="Bole Sub-City, Near Edna Mall, Addis Ababa"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Phone Number for Courier</label>
                <input
                  type="text"
                  defaultValue="+251 91 123 4567"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <span>💳</span> Payment Method
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-center cursor-pointer">
                <span className="text-2xl block mb-1">📱</span>
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300">Telebirr</span>
              </div>
              <div className="p-3.5 border border-stone-200 dark:border-stone-700 hover:border-stone-400 rounded-xl text-center cursor-pointer">
                <span className="text-2xl block mb-1">🏦</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">CBE Birr</span>
              </div>
              <div className="p-3.5 border border-stone-200 dark:border-stone-700 hover:border-stone-400 rounded-xl text-center cursor-pointer">
                <span className="text-2xl block mb-1">💵</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Final Summary */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-md flex flex-col justify-between h-fit">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
            Order Total
          </h2>

          <div className="space-y-2.5 text-sm mb-6">
            <div className="flex justify-between text-stone-500 text-xs">
              <span>Doro Wat x1</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between text-stone-500 text-xs">
              <span>Shiro Wat x1</span>
              <span>$11.00</span>
            </div>
            <div className="flex justify-between text-stone-500 text-xs">
              <span>Delivery Fee</span>
              <span>$2.50</span>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-800 pt-3 flex justify-between font-black text-xl text-stone-900 dark:text-white">
              <span>Amount Due:</span>
              <span className="text-amber-600 dark:text-amber-400">$28.50</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-center rounded-xl shadow-lg shadow-green-600/30 hover:shadow-green-600/40 transition block"
            >
              Confirm & Place Order 🚀
            </Link>
            <Link
              href="/cart"
              className="block text-center text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition py-1"
            >
              &larr; Return to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
