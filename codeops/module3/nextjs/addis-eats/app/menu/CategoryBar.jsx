"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") || "All";

  const categories = [
    { name: "All", value: "All", icon: "🍽️" },
    { name: "Traditional", value: "Traditional", icon: "🍲" },
    { name: "Vegetarian", value: "Vegetarian", icon: "🌱" },
    { name: "Sautéed / Tibs", value: "Sautéed", icon: "🥩" },
  ];

  const handleSelect = (val) => {
    if (val === "All") {
      router.push("/menu");
    } else {
      router.push(`/menu?category=${encodeURIComponent(val)}`);
    }
  };

  const normalize = (str) => (str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "");

  return (
    <div className="w-full max-w-4xl mx-auto my-6 overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-3 justify-start sm:justify-center min-w-max px-2">
        {categories.map((cat) => {
          const isActive =
            cat.value === "All"
              ? selected === "All" || !searchParams.get("category")
              : normalize(selected) === normalize(cat.value);

          return (
            <button
              key={cat.name}
              onClick={() => handleSelect(cat.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/25 scale-105"
                  : "bg-white text-stone-700 border border-stone-200/80 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 shadow-2xs"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
