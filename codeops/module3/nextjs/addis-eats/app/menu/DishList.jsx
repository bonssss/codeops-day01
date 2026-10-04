"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { dishes } from "@/lib/data";

export default function DishList() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const [addedMap, setAddedMap] = useState({});

  const currentCategory = searchParams.get("category") || "All";

  const normalize = (str) =>
    str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  const filteredDishes =
    currentCategory === "All" || !searchParams.get("category")
      ? dishes
      : dishes.filter(
          (dish) =>
            normalize(dish.category).includes(normalize(currentCategory)) ||
            normalize(currentCategory).includes(normalize(dish.category))
        );

  const handleQuickAdd = (dish) => {
    addToCart(dish, 1);
    setAddedMap((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  if (filteredDishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-stone-200/80 text-center my-6">
        <span className="text-4xl mb-2">🍽️</span>
        <h3 className="text-lg font-bold text-stone-900">No dishes found</h3>
        <p className="text-xs text-stone-500 mt-1 mb-4">
          No items match category &quot;{currentCategory}&quot;.
        </p>
        <Link
          href="/menu"
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition shadow-2xs"
        >
          View All Dishes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto my-6">
      {filteredDishes.map((dish) => (
        <div
          key={dish.id}
          className="group flex flex-col justify-between bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 bg-orange-50 border border-orange-100 rounded-2xl">
                  {dish.emoji}
                </span>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {dish.category}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-1 group-hover:text-orange-600 transition">
                    {dish.name}
                  </h3>
                </div>
              </div>
              <span className="text-lg font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-2xl border border-orange-100">
                {dish.formattedPrice}
              </span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed mb-4">
              {dish.description}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-medium text-stone-500">
              <span>{dish.spice}</span>
              <span>•</span>
              <span>⏱️ {dish.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuickAdd(dish)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition cursor-pointer flex items-center gap-1 ${
                  addedMap[dish.id]
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                    : "bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100 hover:border-orange-300"
                }`}
              >
                <span>{addedMap[dish.id] ? "✓ Added" : "+ Add to Cart"}</span>
              </button>
              <Link
                href={`/menu/${dish.id}`}
                className="inline-flex items-center gap-1 px-3.5 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition shadow-xs"
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
