"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") || "All";

  const categories = [
    { name: "All", amharic: "ሁሉም", value: "All", icon: "🍽️" },
    { name: "Traditional", amharic: "ወጥ", value: "Traditional", icon: "🍲" },
    { name: "Sautéed / Tibs", amharic: "ጥብስ", value: "Sautéed", icon: "🥩" },
    { name: "Delicacies", amharic: "ክትፎ", value: "Delicacies", icon: "🥘" },
    { name: "Vegetarian / Yetsom", amharic: "የጾም", value: "Vegetarian", icon: "🌱" },
    { name: "Breakfast", amharic: "ቁርስ", value: "Breakfast", icon: "🥞" },
    { name: "Beverages", amharic: "መጠጥ", value: "Beverages", icon: "☕" },
  ];

  const handleSelect = (val) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset page when category changes
    if (val === "All") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    const query = params.toString();
    router.push(query ? `/menu?${query}` : "/menu");
  };

  const normalize = (str) => (str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "");

  return (
    <div className="w-full max-w-5xl mx-auto my-6 overflow-x-auto pb-2 scrollbar-none">
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
              className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/25 scale-105"
                  : "bg-white text-stone-700 border border-stone-200/80 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 shadow-2xs"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>
                {cat.amharic}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
