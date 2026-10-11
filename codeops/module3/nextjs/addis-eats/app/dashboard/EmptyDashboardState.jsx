import Link from "next/link";

export default function EmptyDashboardState({ title = "No Orders Recorded Yet", message = "There is currently no order data available to aggregate. Once orders are placed, live analytics and charts will populate here." }) {
  return (
    <div
      data-testid="empty-dashboard-state"
      className="p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/70 my-6 transition-all"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center text-3xl shadow-xs">
        📊
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
        {message}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-xl hover:bg-orange-700 shadow-xs transition"
        >
          Reset to Live Dataset
        </Link>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-100 shadow-2xs transition"
        >
          Browse Ethiopian Menu
        </Link>
      </div>
    </div>
  );
}
