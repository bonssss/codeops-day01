export default function ChartDataTable({
  dailyData = [],
  currency = "ETB",
  unit = "Orders / Day",
  dateRange = "Oct 1 – Oct 11, 2026",
}) {
  if (!dailyData || dailyData.length === 0) {
    return null;
  }

  const totalOrders = dailyData.reduce((acc, d) => acc + (d.count || 0), 0);
  const totalRevenue = dailyData.reduce((acc, d) => acc + (d.revenue || 0), 0);

  return (
    <div
      data-testid="accessible-chart-table-section"
      className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs mt-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div>
          <h4 className="text-sm font-bold text-stone-900">
            Accessible Chart Data Table ({dateRange})
          </h4>
          <p className="text-xs text-stone-500">
            Tabular representation of the SVG bar and line charts above for screen readers and high-contrast readability.
          </p>
        </div>
        <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
          WCAG 2.1 AA Compliant Alternative
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table
          className="w-full text-left text-sm text-stone-700 divide-y divide-stone-200"
          aria-label="Accessible table of daily orders and revenue"
        >
          {/* Caption for accessibility */}
          <caption className="text-xs text-left p-3 text-stone-500 bg-stone-50 font-medium border-b border-stone-200">
            Summary Table: Daily order volume ({unit}) and daily revenue ({currency}) from {dateRange}.
          </caption>
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-stone-600">
            <tr>
              <th scope="col" className="px-4 py-3">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Orders Volume ({unit})
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Daily Revenue ({currency})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white">
            {dailyData.map((row) => (
              <tr key={row.date} className="hover:bg-stone-50/70 transition-colors">
                <th scope="row" className="px-4 py-2.5 font-medium text-stone-900">
                  {row.label} ({row.date})
                </th>
                <td className="px-4 py-2.5 text-right font-mono text-stone-700">
                  {row.count}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold text-stone-900">
                  {row.revenue.toLocaleString()} {currency}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-stone-50 font-bold text-stone-900 border-t-2 border-stone-200">
            <tr>
              <th scope="row" className="px-4 py-3 text-stone-900">
                Period Total ({dailyData.length} Days)
              </th>
              <td className="px-4 py-3 text-right font-mono text-blue-700">
                {totalOrders}
              </td>
              <td className="px-4 py-3 text-right font-mono text-orange-600">
                {totalRevenue.toLocaleString()} {currency}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
