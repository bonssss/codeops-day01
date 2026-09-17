"use client";

import { useState } from "react";

export default function CategoryBar() {
  const [selected, setSelected] = useState("All");

  const categories = [
    { name: "All", icon: "🍽️" },
    { name: "Traditional", icon: "🍲" },
    { name: "Sautéed / Tibs", icon: "🥩" },
    { name: "Fast Food", icon: "🍔" },
    { name: "Beverages", icon: "☕" },
    { name: "Dessert", icon: "🍰" },
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-105"
                  : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-amber-400"
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
