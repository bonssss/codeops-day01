"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { dishes as staticDishes } from "@/lib/data";
import { etb } from "@/lib/format";

const PAGE_SIZE = 6;

export default function DishList() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [addedMap, setAddedMap] = useState({});

  // Query string params
  const currentCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  // Search input state and debounce
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [debouncedTerm, setDebouncedTerm] = useState(urlSearch);

  // Sync internal searchTerm if URL search query changes externally (render-phase)
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  if (prevUrlSearch !== urlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchTerm(urlSearch);
    setDebouncedTerm(urlSearch);
  }

  // Debounce search input (350ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }
      if (searchTerm.trim() !== urlSearch.trim()) {
        params.delete("page");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm, pathname, router, searchParams, urlSearch]);

  const trimmedTerm = debouncedTerm.trim();
  const swrKey = trimmedTerm
    ? `/api/dishes?search=${encodeURIComponent(trimmedTerm)}&page=${currentPage}&limit=${PAGE_SIZE}`
    : null;

  const {
    data: swrResult,
    error,
    isLoading: isSwrLoading,
    isValidating: isSwrValidating
  } = useSWR(swrKey, fetcher, {
    keepPreviousData: true,
    dedupingInterval: 1000
  });

  // Calculate dishes and pagination based on whether SWR active or local static fallback
  let displayDishes = [];
  let totalItems = 0;
  let totalPages = 1;

  if (swrKey) {
    displayDishes = swrResult?.dishes || [];
    totalItems = swrResult?.total || 0;
    totalPages = swrResult?.totalPages || 1;
  } else {
    const normalize = (str) =>
      str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "";

    const categoryFiltered =
      currentCategory === "All" || !searchParams.get("category")
        ? staticDishes
        : staticDishes.filter(
            (dish) =>
              normalize(dish.category).includes(normalize(currentCategory)) ||
              normalize(currentCategory).includes(normalize(dish.category))
          );

    totalItems = categoryFiltered.length;
    totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    displayDishes = categoryFiltered.slice(startIndex, startIndex + PAGE_SIZE);
  }

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage > 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuickAdd = (dish) => {
    addToCart(dish, 1);
    setAddedMap((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      {/* Debounced Search Box & Live SWR Status Bar */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
            🔍
          </div>
          <input
            id="dish-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchTerm("");
                setDebouncedTerm("");
                const params = new URLSearchParams(searchParams.toString());
                params.delete("search");
                params.delete("page");
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
              }
            }}
            placeholder="Search Ethiopian dishes by name, Amharic, or ingredients (press Esc to clear)..."
            className="w-full pl-11 pr-24 py-3.5 min-h-[44px] bg-white border border-stone-200/90 rounded-2xl text-sm transition shadow-2xs text-stone-900 placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setDebouncedTerm("");
                const params = new URLSearchParams(searchParams.toString());
                params.delete("search");
                params.delete("page");
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
              }}
              className="absolute inset-y-0 right-2 my-auto min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition cursor-pointer"
              aria-label="Clear search input"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* SWR Network & State Diagnostic Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-stone-100/70 border border-stone-200/70 rounded-xl text-[11px] text-stone-600 font-mono">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                swrKey
                  ? isSwrValidating
                    ? "bg-amber-500 animate-ping"
                    : "bg-emerald-500"
                  : "bg-stone-400"
              }`}
            />
            <span>
              SWR Key:{" "}
              <strong className={swrKey ? "text-orange-700" : "text-stone-500"}>
                {swrKey ? `"${swrKey}"` : "null (Conditional fetching idle)"}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>keepPreviousData: <strong className="text-emerald-700">true</strong></span>
            {isSwrValidating && (
              <span className="text-orange-600 font-bold animate-pulse">
                Fetching in background...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {displayDishes.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-stone-200/80 text-center my-6">
          <span className="text-4xl mb-2">🍽️</span>
          <h3 className="text-lg font-bold text-stone-900">No dishes found</h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            {trimmedTerm
              ? `No dishes match search "${trimmedTerm}".`
              : `No items match category "${currentCategory}".`}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setDebouncedTerm("");
              const params = new URLSearchParams(searchParams.toString());
              params.delete("search");
              params.delete("page");
              params.delete("category");
              router.push("/menu");
            }}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition shadow-2xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Dishes Grid */}
      {displayDishes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {displayDishes.map((dish) => (
            <div
              key={dish.id}
              className="group flex flex-col justify-between bg-white border border-stone-200/80 rounded-3xl p-5 shadow-xs hover:shadow-lg hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Dish Visual */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-100">
                  <Image
                    src={dish.image || "/images/doro-wat.svg"}
                    alt={dish.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-2xl p-2 bg-white/90 backdrop-blur-xs rounded-xl shadow-xs">
                    {dish.emoji}
                  </span>
                  <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 shadow-xs">
                    {dish.category}
                  </span>
                  {dish.rating && (
                    <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-stone-900/80 backdrop-blur-xs text-white shadow-xs flex items-center gap-1">
                      ⭐ {dish.rating}
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition truncate">
                      {dish.name}
                    </h3>
                    {dish.amharicName && (
                      <span className="text-xs text-stone-500 font-semibold block">
                        {dish.amharicName}
                      </span>
                    )}
                  </div>
                  <span className="text-base font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-100 shrink-0">
                    {etb(dish.price)}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                  {dish.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-medium text-stone-500">
                  <span>{dish.spice}</span>
                  <span>⏱️ {dish.time}</span>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(dish)}
                    className={`flex-1 px-3 py-2.5 min-h-[44px] text-xs font-bold rounded-xl border transition cursor-pointer flex items-center justify-center gap-1 ${
                      addedMap[dish.id]
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                        : "bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100 hover:border-orange-300"
                    }`}
                  >
                    <span>{addedMap[dish.id] ? "✓ Added" : "+ Add"}</span>
                  </button>
                  <Link
                    href={`/menu/${dish.id}`}
                    className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 min-h-[44px] bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition shadow-xs"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-200/80">
          <div className="text-xs text-stone-500 font-medium">
            Showing Page <strong className="text-stone-900 font-bold">{currentPage}</strong> of{" "}
            <strong className="text-stone-900 font-bold">{totalPages}</strong> ({totalItems} total items)
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              &larr; Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => handlePageChange(p)}
                className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                  currentPage === p
                    ? "bg-orange-600 text-white shadow-sm"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
