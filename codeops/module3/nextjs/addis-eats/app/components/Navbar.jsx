"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarCartBadge from "./NavbarCartBadge";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever navigation occurs
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Track Order", href: "/order-status" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-stone-200/70 shadow-2xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-2xl transform group-hover:scale-110 transition-transform">
            🍲
          </span>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
              Addis Eats
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-stone-400 -mt-1 tracking-wider uppercase hidden xs:inline">
              Fresh Ethiopian Kitchen
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-sm font-semibold rounded-xl transition ${
                  isActive
                    ? "text-orange-600 bg-orange-50 font-bold"
                    : "text-stone-600 hover:text-orange-600 hover:bg-orange-50/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <NavbarCartBadge />
        </nav>

        {/* Mobile Header Actions: Cart Badge + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <NavbarCartBadge />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:text-orange-600 hover:bg-stone-100 transition focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-between transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-stone-700 hover:bg-stone-50 hover:text-orange-600"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-stone-400">&rarr;</span>
                </Link>
              );
            })}
            <Link
              href="/cart"
              className="px-4 py-3 rounded-2xl text-sm font-bold text-stone-700 hover:bg-stone-50 flex items-center justify-between transition"
            >
              <span>🛒 View Shopping Cart</span>
              <span className="text-xs text-stone-400">&rarr;</span>
            </Link>
            <Link
              href="/checkout"
              className="mt-2 text-center w-full py-3 bg-orange-600 text-white font-bold rounded-2xl shadow-sm text-sm hover:bg-orange-700 transition"
            >
              Checkout Now 🛵
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
