import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Link from "next/link";

export const revalidate = 60;

function DishListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto my-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-48 bg-stone-100/80 border border-stone-200/60 rounded-3xl p-6 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-200 rounded-2xl" />
              <div className="space-y-2">
                <div className="w-16 h-3 bg-stone-200 rounded-full" />
                <div className="w-32 h-5 bg-stone-200 rounded-lg" />
              </div>
            </div>
            <div className="w-14 h-7 bg-stone-200 rounded-xl" />
          </div>
          <div className="w-full h-10 bg-stone-200/70 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function Menu() {
  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold mb-3 shadow-2xs">
          <span>🍽️ Fresh Ingredients</span>
          <span>•</span>
          <span>Made to Order Daily</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 mb-3">
          Our Authentic Menu
        </h1>
        <p className="text-stone-600 text-base">
          Choose from our selection of traditional Ethiopian stews, sizzling tibs, and vegetarian delights.
        </p>
      </div>

      {/* Category Filter Pills */}
      <Suspense fallback={<div className="h-10 my-6" />}>
        <CategoryBar />
      </Suspense>

      {/* Dishes Grid wrapped in Suspense (Exercise 7) */}
      <Suspense fallback={<DishListSkeleton />}>
        <DishList />
      </Suspense>

      {/* Quick Navigation Footer */}
      <div className="flex justify-center items-center gap-6 mt-8 pt-6 border-t border-stone-200/80">
        <Link
          href="/"
          className="text-sm font-semibold text-stone-600 hover:text-orange-600 transition flex items-center gap-1"
        >
          &larr; Return Home
        </Link>
        <span className="text-stone-300">•</span>
        <Link
          href="/cart"
          className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1"
        >
          View Shopping Cart &rarr;
        </Link>
      </div>
    </div>
  );
}
