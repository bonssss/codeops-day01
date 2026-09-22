import { Suspense } from "react";
import CategorySidebar from "./CategorySidebar";
import MenuCounter from "./MenuCounter";

export default function MenuLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Category Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 bg-white border border-stone-200/80 rounded-3xl p-5 shadow-xs sticky top-20">
          <div className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-400">
              Menu Categories
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">Filter Addis Ababa flavors</p>
          </div>

          {/* Dynamic Sidebar Links */}
          <Suspense fallback={<div className="h-40 bg-stone-100/60 rounded-2xl animate-pulse" />}>
            <CategorySidebar />
          </Suspense>

          {/* Persistent Counter in Layout (Exercise 3) */}
          <div className="pt-4 border-t border-stone-100">
            <MenuCounter />
          </div>
        </aside>

        {/* Nested Page Content (Menu page or Dish detail page) */}
        <main className="flex-1 w-full min-w-0">{children}</main>
      </div>
    </div>
  );
}
