import Link from "next/link";

export default function PaginationControls({
  currentPage = 1,
  totalPages = 1,
  totalOrders = 0,
  pageSize = 5,
  sortBy = "createdAt",
  sortOrder = "desc",
  forceState = null,
}) {
  // Determine current active pagination state
  let calculatedState = "normal";
  if (totalOrders === 0 || totalPages === 0 || forceState === "empty") {
    calculatedState = "empty";
  } else if (totalPages === 1 || forceState === "single") {
    calculatedState = "single";
  } else if (currentPage === 1 || forceState === "first") {
    calculatedState = "first";
  } else if (currentPage === totalPages || forceState === "last") {
    calculatedState = "last";
  } else {
    calculatedState = "middle";
  }

  const buildUrl = (targetPage, forcedStateOverride = undefined) => {
    const params = new URLSearchParams();
    if (targetPage) params.set("page", String(targetPage));
    if (sortBy) params.set("sort", sortBy);
    if (sortOrder) params.set("order", sortOrder);

    const fState = forcedStateOverride !== undefined ? forcedStateOverride : forceState;
    if (fState) params.set("forceState", fState);

    return `?${params.toString()}`;
  };

  const hasPrev = calculatedState !== "empty" && calculatedState !== "single" && currentPage > 1;
  const hasNext = calculatedState !== "empty" && calculatedState !== "single" && currentPage < totalPages;

  return (
    <div
      data-testid="pagination-controls-container"
      className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs mt-4 space-y-4"
    >
      {/* State Switcher Bar: Force each of the four states (Requirement 7) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/70">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Forced State Switcher:
          </span>
          <span
            data-testid="active-state-badge"
            className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200"
          >
            Active: {forceState || calculatedState}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Link
            href={buildUrl(1, "empty")}
            className={`px-3 py-2 min-h-[44px] inline-flex items-center text-xs font-semibold rounded-lg border transition ${
              forceState === "empty"
                ? "bg-orange-600 text-white border-orange-600 shadow-2xs"
                : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
            }`}
          >
            1. Force Empty
          </Link>
          <Link
            href={buildUrl(1, "single")}
            className={`px-3 py-2 min-h-[44px] inline-flex items-center text-xs font-semibold rounded-lg border transition ${
              forceState === "single"
                ? "bg-orange-600 text-white border-orange-600 shadow-2xs"
                : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
            }`}
          >
            2. Force Single
          </Link>
          <Link
            href={buildUrl(1, "first")}
            className={`px-3 py-2 min-h-[44px] inline-flex items-center text-xs font-semibold rounded-lg border transition ${
              forceState === "first"
                ? "bg-orange-600 text-white border-orange-600 shadow-2xs"
                : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
            }`}
          >
            3. Force First
          </Link>
          <Link
            href={buildUrl(totalPages || 4, "last")}
            className={`px-3 py-2 min-h-[44px] inline-flex items-center text-xs font-semibold rounded-lg border transition ${
              forceState === "last"
                ? "bg-orange-600 text-white border-orange-600 shadow-2xs"
                : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
            }`}
          >
            4. Force Last
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-2 min-h-[44px] inline-flex items-center text-xs font-medium rounded-lg border border-dashed border-stone-300 text-stone-500 hover:text-stone-800 hover:bg-stone-100"
          >
            Reset
          </Link>
        </div>
      </div>

      {/* Main Pagination Navigation with Link Elements */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Record Summary text */}
        <div className="text-xs text-stone-500">
          {calculatedState === "empty" ? (
            <span>Showing 0 of 0 orders (Empty State)</span>
          ) : (
            <span>
              Showing{" "}
              <strong className="text-stone-800">
                {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalOrders)}
              </strong>{" "}
              of <strong className="text-stone-800">{totalOrders}</strong> orders (Page{" "}
              <strong>{currentPage}</strong> of <strong>{totalPages}</strong>)
            </span>
          )}
        </div>

        {/* Links for Previous / Pages / Next */}
        <nav aria-label="Orders pagination" className="flex items-center gap-1.5">
          {/* Previous Link */}
          {hasPrev ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="px-3.5 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs font-semibold rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-orange-600 transition"
              aria-label="Go to previous page"
            >
              ← Previous
            </Link>
          ) : (
            <span
              className="px-3.5 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs font-medium rounded-lg border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              ← Previous
            </span>
          )}

          {/* Numbered page links */}
          {calculatedState !== "empty" &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === currentPage;
              return isActive ? (
                <span
                  key={p}
                  aria-current="page"
                  className="px-3 py-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-xs font-bold rounded-lg bg-orange-600 text-white shadow-2xs select-none"
                >
                  {p}
                </span>
              ) : (
                <Link
                  key={p}
                  href={buildUrl(p)}
                  className="px-3 py-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-xs font-medium rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-orange-600 transition"
                  aria-label={`Go to page ${p}`}
                >
                  {p}
                </Link>
              );
            })}

          {/* Next Link */}
          {hasNext ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="px-3.5 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs font-semibold rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-orange-600 transition"
              aria-label="Go to next page"
            >
              Next →
            </Link>
          ) : (
            <span
              className="px-3.5 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs font-medium rounded-lg border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              Next →
            </span>
          )}
        </nav>
      </div>
    </div>
  );
}
