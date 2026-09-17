import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats | Authentic Ethiopian Food Delivery",
  description: "Experience the rich and authentic flavors of Ethiopian cuisine delivered right to your door in Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-900 dark:bg-[#0c0a09] dark:text-stone-100 antialiased selection:bg-amber-500 selection:text-white" suppressHydrationWarning><header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-stone-950/80 border-b border-stone-200 dark:border-stone-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="text-2xl transform group-hover:scale-110 transition-transform">🍲</span>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Addis Eats
                </span>
                <span className="text-[10px] font-semibold text-stone-500 -mt-1 tracking-wider uppercase">
                  Taste of Ethiopia
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-1 sm:gap-4">
              <Link
                href="/"
                className="px-3 py-1.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="px-3 py-1.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              >
                Menu
              </Link>
              <Link
                href="/cart"
                className="relative px-3.5 py-1.5 text-sm font-semibold text-stone-800 dark:text-stone-200 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/60 transition flex items-center gap-1.5"
              >
                <span>🛒</span> Cart
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-600 rounded-full">
                  2
                </span>
              </Link>
            </nav>
          </div>
        </header><main className="flex-1 flex flex-col">{children}</main><footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/50 py-8 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="text-base">🇪🇹</span>
              <span>© 2026 Addis Eats. Built with Next.js App Router.</span>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-amber-600 transition">Home</Link>
              <Link href="/menu" className="hover:text-amber-600 transition">Our Menu</Link>
              <Link href="/cart" className="hover:text-amber-600 transition">Cart</Link>
              <Link href="/checkout" className="hover:text-amber-600 transition">Checkout</Link>
            </div>
          </div>
        </footer></body>
    </html>
  );
}
