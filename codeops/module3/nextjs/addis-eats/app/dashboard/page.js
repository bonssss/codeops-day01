import { getOrdersSummary, getPaginatedOrders } from "@/lib/data";
import { etb } from "@/lib/format";
import RevenueBarChart from "./RevenueBarChart";
import OrdersLineChart from "./OrdersLineChart";
import ChartDataTable from "./ChartDataTable";
import OrderTable from "./OrderTable";
import PaginationControls from "./PaginationControls";
import EmptyDashboardState from "./EmptyDashboardState";

export const metadata = {
  title: "Order Analytics & Revenue Dashboard",
  description:
    "Real-time Ethiopian restaurant revenue analytics, orders-per-day volume charts, and paginated order tracking for Addis Eats.",
};

export default async function DashboardPage(props) {
  // Safe Next.js 15+ searchParams unwrapping
  const searchParams = props.searchParams ? await props.searchParams : {};

  const page = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sort || "createdAt";
  const sortOrder = searchParams?.order || "desc";
  const forceState = searchParams?.forceState || null;

  const isForceEmpty = forceState === "empty";

  // Requirement 1: Aggregate order data in a server component
  // Server-side calculation, passing ONLY the summary to the client
  const summary = getOrdersSummary({ forceEmpty: isForceEmpty });

  // Requirements 5, 6, 7: Server-side sorting & pagination
  const paginated = getPaginatedOrders({
    page,
    pageSize: 5,
    sortBy,
    sortOrder,
    forceState,
  });

  const isEmpty = summary.totalOrders === 0;

  return (
    <main className="min-h-screen bg-stone-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-2 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Business Analytics & Orders
              </h1>
            </div>
            <p className="text-sm text-stone-600 mt-1">
              Addis Eats central command: Daily revenue, order volume trends, and transaction logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
              Currency: {summary.currency}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Range: {summary.dateRange}
            </span>
          </div>
        </div>

        {/* State Switcher Notice Banner */}
        <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-stone-600">
              <strong>Server State:</strong> {forceState ? `Forced [${forceState}]` : "Live Dataset"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-stone-500">
            <span>Quick-test forced states:</span>
            <a
              href="?forceState=empty"
              className={`px-2 py-0.5 rounded border transition ${
                forceState === "empty"
                  ? "bg-orange-600 text-white border-orange-600 font-semibold"
                  : "bg-stone-50 border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
            >
              Empty
            </a>
            <a
              href="?forceState=single"
              className={`px-2 py-0.5 rounded border transition ${
                forceState === "single"
                  ? "bg-orange-600 text-white border-orange-600 font-semibold"
                  : "bg-stone-50 border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
            >
              Single
            </a>
            <a
              href="?forceState=first"
              className={`px-2 py-0.5 rounded border transition ${
                forceState === "first"
                  ? "bg-orange-600 text-white border-orange-600 font-semibold"
                  : "bg-stone-50 border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
            >
              First
            </a>
            <a
              href="?forceState=last"
              className={`px-2 py-0.5 rounded border transition ${
                forceState === "last"
                  ? "bg-orange-600 text-white border-orange-600 font-semibold"
                  : "bg-stone-50 border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
            >
              Last
            </a>
            {forceState && (
              <a
                href="/dashboard"
                className="px-2 py-0.5 rounded border border-dashed border-stone-300 text-stone-400 hover:text-stone-700"
              >
                Clear
              </a>
            )}
          </div>
        </div>

        {/* Empty state first: If there is no data, build & show the empty state first */}
        {isEmpty ? (
          <div className="space-y-6">
            <EmptyDashboardState
              title="Empty State Active: No Orders Available"
              message="There is currently no aggregated order data to display. Use the Forced State Switcher above or place orders to observe live metrics."
            />

            {/* In empty state, still render the empty order table & pagination to show all empty states */}
            <OrderTable
              orders={paginated.orders}
              sortBy={sortBy}
              sortOrder={sortOrder}
              currentPage={paginated.currentPage}
              forceState={forceState}
            />

            <PaginationControls
              currentPage={paginated.currentPage}
              totalPages={paginated.totalPages}
              totalOrders={paginated.totalOrders}
              pageSize={paginated.pageSize}
              sortBy={sortBy}
              sortOrder={sortOrder}
              forceState={forceState}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Total Gross Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 font-mono">
                  {etb(summary.totalRevenue)}
                </div>
                <div className="text-xs text-emerald-600 font-medium mt-1">
                  100% Ethiopian Birr (ETB)
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Total Orders Aggregated
                </span>
                <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1 font-mono">
                  {summary.totalOrders}
                </div>
                <div className="text-xs text-stone-500 font-medium mt-1">
                  Unit: {summary.unit}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Average Order Value
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 font-mono">
                  {etb(summary.averageOrderValue)}
                </div>
                <div className="text-xs text-stone-500 font-medium mt-1">
                  Per customer transaction
                </div>
              </div>
            </div>

            {/* Requirement 2 & 3: Visual Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Requirement 2: Revenue Bar Chart with fixed height and ETB ticks */}
              <RevenueBarChart
                dailyData={summary.dailyData}
                currency={summary.currency}
              />

              {/* Requirement 3: Orders-per-day line chart with heading naming range and unit */}
              <OrdersLineChart
                ordersPerDay={summary.ordersPerDay}
                dateRange={summary.dateRange}
                unit={summary.unit}
              />
            </div>

            {/* Requirement 4: Accessible Table beneath charts */}
            <ChartDataTable
              dailyData={summary.dailyData}
              currency={summary.currency}
              unit={summary.unit}
              dateRange={summary.dateRange}
            />

            {/* Requirement 5 & 6: Order Table with real markup, right-aligned totals, caption, aria-sort */}
            <OrderTable
              orders={paginated.orders}
              sortBy={sortBy}
              sortOrder={sortOrder}
              currentPage={paginated.currentPage}
              forceState={forceState}
            />

            {/* Requirement 7: Paging with Link elements & forced states */}
            <PaginationControls
              currentPage={paginated.currentPage}
              totalPages={paginated.totalPages}
              totalOrders={paginated.totalOrders}
              pageSize={paginated.pageSize}
              sortBy={sortBy}
              sortOrder={sortOrder}
              forceState={forceState}
            />
          </div>
        )}
      </div>
    </main>
  );
}
