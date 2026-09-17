"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function NavbarCartBadge() {
  const { totalItemsCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative px-4 py-2 text-sm font-bold text-orange-950 bg-orange-50 border border-orange-200/90 rounded-full hover:bg-orange-100 hover:border-orange-300 transition shadow-xs flex items-center gap-1.5"
    >
      <span>🛒</span>
      <span>Cart</span>
      {totalItemsCount > 0 && (
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-black text-white bg-orange-600 rounded-full shadow-xs">
          {totalItemsCount}
        </span>
      )}
    </Link>
  );
}
