import Link from "next/link";

export default function OrderTable({
  orders = [],
  sortBy = "createdAt",
  sortOrder = "desc",
  currentPage = 1,
  forceState = null,
}) {
  // Helper to build sort URL keeping searchParams intact
  const getSortHref = (col) => {
    const nextOrder = sortBy === col && sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams();
    params.set("sort", col);
    params.set("order", nextOrder);
    params.set("page", "1"); // reset to page 1 on sort change
    if (forceState) {
      params.set("forceState", forceState);
    }
    return `?${params.toString()}`;
  };

  // Helper to get aria-sort attribute
  const getAriaSort = (col) => {
    if (sortBy !== col) return "none";
    return sortOrder === "asc" ? "ascending" : "descending";
  };

  const getSortIndicator = (col) => {
    if (sortBy !== col) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-stone-900">Order Management & Invoices</h3>
          <p className="text-xs text-stone-500">
            Interactive table with server-side sorting, pagination, and real semantic markup.
          </p>
        </div>
        <div className="text-xs text-stone-500 flex items-center gap-1.5">
          <span>Active Sort:</span>
          <span className="font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            {sortBy} ({sortOrder})
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200">
        {/* Requirement 5: Real markup, right-aligned totals and a caption */}
        <table
          className="w-full text-left text-sm text-stone-700 divide-y divide-stone-200"
          aria-label="Customer Orders Table"
        >
          {/* Requirement 5: Caption */}
          <caption className="text-xs text-left p-3 text-stone-500 bg-stone-50 font-medium border-b border-stone-200">
            Addis Eats Customer Orders & Payment Summaries (Sorted by {sortBy} in {sortOrder}ending order)
          </caption>

          <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-600">
            <tr>
              {/* Requirement 6: aria-sort on active column header, searchParams links */}
              <th
                scope="col"
                aria-sort={getAriaSort("id")}
                className="px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                <Link
                  href={getSortHref("id")}
                  className="flex items-center gap-1.5 text-stone-700 hover:text-orange-600 focus:outline-hidden"
                  title="Sort by Order ID"
                >
                  <span>Order ID</span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {getSortIndicator("id")}
                  </span>
                </Link>
              </th>

              <th
                scope="col"
                aria-sort={getAriaSort("name")}
                className="px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                <Link
                  href={getSortHref("name")}
                  className="flex items-center gap-1.5 text-stone-700 hover:text-orange-600 focus:outline-hidden"
                  title="Sort by Customer Name"
                >
                  <span>Customer</span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {getSortIndicator("name")}
                  </span>
                </Link>
              </th>

              <th
                scope="col"
                aria-sort={getAriaSort("createdAt")}
                className="px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                <Link
                  href={getSortHref("createdAt")}
                  className="flex items-center gap-1.5 text-stone-700 hover:text-orange-600 focus:outline-hidden"
                  title="Sort by Order Date"
                >
                  <span>Date & Time</span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {getSortIndicator("createdAt")}
                  </span>
                </Link>
              </th>

              <th scope="col" className="px-4 py-3">
                Items Summary
              </th>

              <th
                scope="col"
                aria-sort={getAriaSort("status")}
                className="px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                <Link
                  href={getSortHref("status")}
                  className="flex items-center gap-1.5 text-stone-700 hover:text-orange-600 focus:outline-hidden"
                  title="Sort by Status"
                >
                  <span>Status</span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {getSortIndicator("status")}
                  </span>
                </Link>
              </th>

              {/* Requirement 5: Right-aligned totals header with aria-sort */}
              <th
                scope="col"
                aria-sort={getAriaSort("total")}
                className="px-4 py-3 text-right hover:bg-stone-100 transition-colors"
                style={{ textAlign: "right" }}
              >
                <Link
                  href={getSortHref("total")}
                  className="inline-flex items-center justify-end gap-1.5 text-stone-700 hover:text-orange-600 focus:outline-hidden"
                  title="Sort by Total Amount"
                >
                  <span>Total (ETB)</span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {getSortIndicator("total")}
                  </span>
                </Link>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 bg-white">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-stone-500 font-medium bg-stone-50/50"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl">📭</span>
                    <p className="text-stone-700 font-semibold">No orders found</p>
                    <p className="text-xs text-stone-500">
                      Empty table state active. Change filters or reset the view to see orders.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const dateStr = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Oct 11, 2026";

                const itemsLabel =
                  order.items && order.items.length > 0
                    ? order.items.map((it) => `${it.quantity}x ${it.name}`).join(", ")
                    : "1x Doro Wat";

                const statusColor =
                  order.status === "delivered"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : order.status === "out_for_delivery"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : order.status === "preparing"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-stone-100 text-stone-700 border-stone-200";

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50/80 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-stone-900 text-xs">
                      <Link
                        href={`/order-status?id=${order.id}`}
                        className="text-orange-600 hover:underline"
                      >
                        {order.id}
                      </Link>
                    </td>

                    <td className="px-4 py-3 font-medium text-stone-800">
                      <div>{order.name}</div>
                      <div className="text-[11px] text-stone-400 font-normal">
                        {order.phone || order.address}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs text-stone-500 whitespace-nowrap">
                      {dateStr}
                    </td>

                    <td className="px-4 py-3 text-xs text-stone-600 max-w-xs truncate" title={itemsLabel}>
                      {itemsLabel}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${statusColor}`}
                      >
                        {order.status?.replace("_", " ") || "confirmed"}
                      </span>
                    </td>

                    {/* Requirement 5: Right-aligned totals */}
                    <td
                      className="px-4 py-3 text-right font-mono font-bold text-stone-900 whitespace-nowrap"
                      style={{ textAlign: "right" }}
                    >
                      {Number(order.total).toLocaleString()} ETB
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
