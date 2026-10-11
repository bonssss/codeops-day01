"use client";

export default function OrdersLineChart({
  ordersPerDay = [],
  dateRange = "Oct 1 – Oct 11, 2026",
  unit = "Orders / Day",
}) {
  if (!ordersPerDay || ordersPerDay.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 mb-2">
          Daily Orders Volume ({dateRange}) — Unit: {unit}
        </h3>
        <div className="h-64 flex flex-col items-center justify-center text-stone-400 border border-dashed border-stone-200 rounded-xl">
          <span className="text-2xl mb-1">📉</span>
          <p className="text-sm font-medium">No order volume recorded for this time range</p>
        </div>
      </div>
    );
  }

  const maxOrders = Math.max(...ordersPerDay.map((d) => d.count), 4);
  const chartMax = Math.ceil(maxOrders / 4) * 4 || 4;
  const yTicks = [0, chartMax * 0.25, chartMax * 0.5, chartMax * 0.75, chartMax];

  const chartHeight = 220;
  const chartWidth = 580;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 35;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate coordinates
  const points = ordersPerDay.map((item, index) => {
    const x = paddingLeft + (index / (ordersPerDay.length - 1 || 1)) * plotWidth;
    const y = chartHeight - paddingBottom - (item.count / chartMax) * plotHeight;
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
      {/* Requirement 3: Heading naming the range and the unit */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
        <div>
          <h3 className="text-base font-bold text-stone-900" data-testid="orders-chart-heading">
            Daily Orders Volume ({dateRange}) — Unit: {unit}
          </h3>
          <p className="text-xs text-stone-500">
            Total count of orders completed per day over the selected date range ({dateRange})
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Unit: {unit}
        </span>
      </div>

      {/* Line Chart SVG */}
      <div
        className="w-full relative h-72 overflow-hidden flex items-center justify-center"
        style={{ height: "288px" }}
        data-testid="orders-line-chart-container"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full select-none"
          role="img"
          aria-label={`Orders per day line chart from ${dateRange} measured in ${unit}`}
        >
          <defs>
            <linearGradient id="blueAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Y-axis Ticks & Grid */}
          {yTicks.map((tickVal) => {
            const yPos = chartHeight - paddingBottom - (tickVal / chartMax) * plotHeight;
            return (
              <g key={`y-${tickVal}`}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={chartWidth - paddingRight}
                  y2={yPos}
                  stroke="#E7E5E4"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="#78716C"
                  fontSize="10"
                  fontWeight="600"
                >
                  {tickVal}
                </text>
              </g>
            );
          })}

          {/* Base Axis line */}
          <line
            x1={paddingLeft}
            y1={chartHeight - paddingBottom}
            x2={chartWidth - paddingRight}
            y2={chartHeight - paddingBottom}
            stroke="#A8A29E"
            strokeWidth="1.5"
          />

          {/* Area Fill */}
          <path d={areaD} fill="url(#blueAreaGradient)" />

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and X labels */}
          {points.map((pt) => (
            <g key={pt.date} className="group cursor-pointer">
              {/* Highlight Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#2563EB"
                strokeWidth="2.5"
                className="transition-transform duration-200 group-hover:scale-125"
              />
              {/* Hover Value */}
              <text
                x={pt.x}
                y={pt.y - 8}
                textAnchor="middle"
                fill="#1D4ED8"
                fontSize="9.5"
                fontWeight="700"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {pt.count} orders
              </text>
              {/* X label */}
              <text
                x={pt.x}
                y={chartHeight - paddingBottom + 16}
                textAnchor="middle"
                fill="#78716C"
                fontSize="9"
                fontWeight="500"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
