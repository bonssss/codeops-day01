import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-3">
          <span>🍽️ Fresh Ingredients</span>
          <span>•</span>
          <span>Made to Order</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 dark:text-stone-100 mb-3">
          Our Special Menu
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-base">
          Choose from our selection of traditional Ethiopian stews, sizzling tibs, and vegan specials.
        </p>
      </div>

      {/* Category Filter Pills */}
      <CategoryBar />

      {/* Dishes Grid */}
      <DishList />

      {/* Quick Navigation Footer */}
      <div className="flex justify-center items-center gap-6 mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
        <Link
          href="/"
          className="text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 transition flex items-center gap-1"
        >
          &larr; Return Home
        </Link>
        <span className="text-stone-300 dark:text-stone-700">•</span>
        <Link
          href="/cart"
          className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          View Shopping Cart &rarr;
        </Link>
      </div>
    </div>
  );
}
