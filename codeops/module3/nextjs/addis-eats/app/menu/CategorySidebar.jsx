"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  { name: "All Dishes", icon: "🍽️", value: "All", href: "/menu" },
  { name: "Traditional Stews", icon: "🍗", value: "Traditional", href: "/menu?category=Traditional" },
  { name: "Vegetarian Delights", icon: "🌱", value: "Vegetarian", href: "/menu?category=Vegetarian" },
  { name: "Sautéed Specialties", icon: "🥩", value: "Sautéed", href: "/menu?category=Sautéed" },
];

export default function CategorySidebar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const normalize = (str) => (str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "");

  return (
    <nav className="flex flex-col gap-1.5 mb-6">
      {categories.map((cat) => {
        const isActive =
          cat.value === "All"
            ? currentCategory === "All" || !searchParams.get("category")
            : normalize(currentCategory) === normalize(cat.value);

        return (
          <Link
            key={cat.name}
            href={cat.href}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
              isActive
                ? "bg-orange-600 text-white font-bold shadow-xs scale-[1.02]"
                : "text-stone-700 hover:bg-orange-50 hover:text-orange-700 border border-transparent hover:border-orange-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
            {isActive && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Active</span>}
          </Link>
        );
      })}
    </nav>
  );
}
