import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Addis Eats | Authentic Ethiopian Food Delivery",
  description:
    "Experience the rich and authentic flavors of Ethiopian cuisine delivered right to your door in Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#faf8f5]" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-800 antialiased selection:bg-orange-500 selection:text-white"
        suppressHydrationWarning
      >
        <CartProvider>
          {/* Responsive Header */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Footer */}
          <footer className="border-t border-stone-200/80 bg-white py-8 mt-12 transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="text-base">🇪🇹</span>
                <span className="font-medium">
                  © 2026 Addis Eats. Freshly prepared with love in Addis Ababa.
                </span>
              </div>
              <div className="flex gap-6 font-semibold">
                <Link href="/" className="hover:text-orange-600 transition">
                  Home
                </Link>
                <Link href="/menu" className="hover:text-orange-600 transition">
                  Our Menu
                </Link>
                <Link href="/order-status" className="hover:text-orange-600 transition">
                  Track Order
                </Link>
                <Link href="/cart" className="hover:text-orange-600 transition">
                  Cart
                </Link>
                <Link href="/checkout" className="hover:text-orange-600 transition">
                  Checkout
                </Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
