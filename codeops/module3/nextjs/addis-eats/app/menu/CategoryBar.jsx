"use client";

import { useState } from "react";

export default function CategoryBar() {
  const [selected, setSelected] = useState("All");

  const categories = [
    { name: "All", icon: "🍽️" },
    { name: "Traditional", icon: "🍲" },
    { name: "Vegetarian", icon: "🌱" },
    { name: "Sautéed / Tibs", icon: "🥩" },
    { name: "Fast Food", icon: "🍔" },
    { name: "Beverages", icon: "☕" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-3 justify-start sm:justify-center min-w-max px-2">
        {categories.map((cat) => {
          const isActive = selected === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelected(cat.name)}
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
