"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  { name: "All Dishes", amharic: "ሁሉም", icon: "🍽️", value: "All", href: "/menu" },
  { name: "Traditional Stews", amharic: "ወጥ", icon: "🍗", value: "Traditional", href: "/menu?category=Traditional" },
  { name: "Sautéed / Tibs", amharic: "ጥብስ", icon: "🥩", value: "Sautéed", href: "/menu?category=Sautéed" },
  { name: "Delicacies & Kitfo", amharic: "ክትፎ", icon: "🥘", value: "Delicacies", href: "/menu?category=Delicacies" },
  { name: "Vegetarian / Fasting", amharic: "የጾም", icon: "🌱", value: "Vegetarian", href: "/menu?category=Vegetarian" },
  { name: "Breakfast Specials", amharic: "ቁርስ", icon: "🥞", value: "Breakfast", href: "/menu?category=Breakfast" },
  { name: "Drinks & Ceremony", amharic: "መጠጥ", icon: "☕", value: "Beverages", href: "/menu?category=Beverages" },
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
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-base shrink-0">{cat.icon}</span>
              <span className="truncate">{cat.name}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>
              {cat.amharic}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
