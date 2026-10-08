"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { dishes as staticDishes } from "@/lib/data";

const PAGE_SIZE = 3;

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
      // Synchronize search query into URL query string without reloading page
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }
      // Reset to page 1 on new search term change
      if (searchTerm.trim() !== urlSearch.trim()) {
        params.delete("page");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm, pathname, router, searchParams, urlSearch]);

  /**
   * Exercise Step 5 & 6:
   * SWR Key is NULL when debouncedTerm is empty string.
   * This is SWR's Conditional Fetching mechanism.
   * keepPreviousData: true ensures the previous results stay mounted
   * and prevents UI flashing while new searches or pages are in-flight.
   */
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
    keepPreviousData: true, // Step 6: Keeps previous data to prevent flashing between searches
    dedupingInterval: 1000
  });

  // Calculate dishes and pagination based on whether SWR active or local static fallback
  let displayDishes = [];
  let totalItems = 0;
  let totalPages = 1;

  if (swrKey) {
    // SWR Search is active
    displayDishes = swrResult?.dishes || [];
    totalItems = swrResult?.total || 0;
    totalPages = swrResult?.totalPages || 1;
  } else {
    // Default menu (swrKey is null) - filter static dishes by category and paginate
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

  // Handle Page navigation by updating page number in the query string
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
    <div className="w-full max-w-4xl mx-auto my-6">
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
            placeholder="Search dishes by name or ingredients (debounced SWR)..."
            className="w-full pl-11 pr-24 py-3.5 bg-white border border-stone-200/90 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition shadow-2xs text-stone-900 placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setDebouncedTerm("");
                const params = new URLSearchParams(searchParams.toString());
                params.delete("search");
                params.delete("page");
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
              }}
              className="absolute inset-y-0 right-3 my-auto h-7 px-2.5 text-xs text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {displayDishes.map((dish) => (
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

              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium text-stone-500">
                  <span>{dish.spice}</span>
                  <span>•</span>
                  <span>⏱️ {dish.time}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleQuickAdd(dish)}
                    className={`flex-1 sm:flex-initial px-3.5 py-2 text-xs font-bold rounded-xl border transition cursor-pointer flex items-center justify-center gap-1 ${
                      addedMap[dish.id]
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                        : "bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100 hover:border-orange-300"
                    }`}
                  >
                    <span>{addedMap[dish.id] ? "✓ Added" : "+ Add to Cart"}</span>
                  </button>
                  <Link
                    href={`/menu/${dish.id}`}
                    className="inline-flex items-center justify-center gap-1 px-3.5 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition shadow-xs"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar (Query String Powered: ?page=...) */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-200/80">
          <div className="text-xs text-stone-500 font-medium">
            Showing Page <strong className="text-stone-900 font-bold">{currentPage}</strong> of{" "}
            <strong className="text-stone-900 font-bold">{totalPages}</strong> ({totalItems} total items)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              &larr; Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                  currentPage === p
                    ? "bg-orange-600 text-white shadow-sm"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
