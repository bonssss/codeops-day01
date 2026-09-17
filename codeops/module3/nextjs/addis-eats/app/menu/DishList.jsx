"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    price: 15.0,
    formattedPrice: "$15.00",
    category: "Traditional",
    spice: "🌶️🌶️🌶️",
    time: "30 min",
    emoji: "🍗",
    description: "Slow-cooked tender chicken drumsticks in rich, spiced berbere sauce served with hard-boiled eggs and fresh injera.",
  },
  {
    id: 2,
    name: "Shiro Wat",
    price: 11.0,
    formattedPrice: "$11.00",
    category: "Vegetarian",
    spice: "🌶️",
    time: "20 min",
    emoji: "🍲",
    description: "Velvety spiced ground chickpea stew simmered with garlic, onions, and herbal butter, served bubbling hot with injera.",
  },
  {
    id: 3,
    name: "Special Beef Tibs",
    price: 16.5,
    formattedPrice: "$16.50",
    category: "Sautéed",
    spice: "🌶️🌶️",
    time: "25 min",
    emoji: "🥩",
    description: "Tender cubed beef sautéed to perfection with rosemary, caramelized onions, tomatoes, and spicy green peppers.",
  },
  {
    id: 4,
    name: "Gored Gored / Kitfo",
    price: 17.0,
    formattedPrice: "$17.00",
    category: "Traditional",
    spice: "🌶️🌶️🌶️",
    time: "15 min",
    emoji: "🥘",
    description: "Prime lean beef minced and infused with spiced clarified butter (niter kibbeh) and aromatic mitmita chili powder.",
  },
];

export default function DishList() {
  const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState({});

  const handleQuickAdd = (dish) => {
    addToCart(dish, 1);
    setAddedMap((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto my-6">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="group flex flex-col justify-between bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 rounded-2xl">
                  {dish.emoji}
                </span>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {dish.category}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-1 group-hover:text-amber-600 transition">
                    {dish.name}
                  </h3>
                </div>
              </div>
              <span className="text-lg font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/70 px-3 py-1 rounded-xl">
                {dish.formattedPrice}
              </span>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              {dish.description}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span>{dish.spice}</span>
              <span>•</span>
              <span>⏱️ {dish.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuickAdd(dish)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                  addedMap[dish.id]
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900"
                }`}
              >
                {addedMap[dish.id] ? "✓ Added" : "+ Add"}
              </button>
              <Link
                href={`/menu/${dish.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition"
              >
                Details &rarr;
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
