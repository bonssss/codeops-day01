"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function NavbarCartBadge() {
  const { totalItemsCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative px-3.5 py-1.5 text-sm font-semibold text-stone-800 dark:text-stone-200 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/60 transition flex items-center gap-1.5"
    >
      <span>🛒</span> Cart
      {totalItemsCount > 0 && (
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-amber-600 rounded-full">
          {totalItemsCount}
        </span>
      )}
    </Link>
  );
}
