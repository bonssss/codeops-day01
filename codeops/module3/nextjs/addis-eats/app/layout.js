import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.com"
  ),
  title: {
    default: "Addis Eats | Authentic Ethiopian Food Delivery",
    template: "%s | Addis Eats",
  },
  description:
    "Experience the rich and authentic flavors of Ethiopian cuisine delivered right to your door in Addis Ababa.",
  openGraph: {
    title: "Addis Eats | Authentic Ethiopian Food Delivery",
    description:
      "Experience the rich and authentic flavors of Ethiopian cuisine delivered right to your door in Addis Ababa.",
    siteName: "Addis Eats",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full bg-[#faf8f5] ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-screen flex flex-col bg-[#faf8f5] text-stone-800 antialiased font-sans selection:bg-orange-500 selection:text-white`}
        suppressHydrationWarning
      >
        <CartProvider>
          {/* Skip to Main Content Link for Keyboard Accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Responsive Header */}
          <Navbar />

          {/* Main Content */}
          <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-hidden">
            {children}
          </main>

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

        {/* Third-party Analytics / Telemetry loaded via next/script with lazy strategy */}
        <Script
          id="addis-analytics-telemetry"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-ADDIS12345"
        />
        <Script id="addis-analytics-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ADDIS12345', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>

  );
}
