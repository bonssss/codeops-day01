"use client";

import { etb } from "@/lib/format";

export default function RevenueBarChart({ dailyData = [], currency = "ETB" }) {
  if (!dailyData || dailyData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 mb-2">Daily Revenue Overview</h3>
        <div className="h-64 flex flex-col items-center justify-center text-stone-400 border border-dashed border-stone-200 rounded-xl">
          <span className="text-2xl mb-1">📉</span>
          <p className="text-sm font-medium">No revenue data available for this range</p>
        </div>
      </div>
    );
  }

  // Calculate scales
  const maxRevenue = Math.max(...dailyData.map((d) => d.revenue), 1000);
  // Round up to nice thousand step
  const tickStep = Math.ceil(maxRevenue / 4 / 500) * 500;
  const yTicks = [0, tickStep, tickStep * 2, tickStep * 3, tickStep * 4];
  const chartMax = tickStep * 4;

  const chartHeight = 220;
  const chartWidth = 580;
  const paddingLeft = 75; // Space for ETB tick labels
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const barWidth = Math.max(12, Math.min(36, Math.floor(plotWidth / dailyData.length) - 10));

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-stone-900">Daily Revenue Bar Chart</h3>
          <p className="text-xs text-stone-500">Gross revenue generated per day formatted in Ethiopian Birr ({currency})</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Fixed Height · {currency} Formatted
        </span>
      </div>

      {/* Fixed-height container (Requirement 2) */}
      <div
        className="w-full relative h-72 overflow-hidden flex items-center justify-center"
        style={{ height: "288px" }}
        data-testid="revenue-bar-chart-container"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full select-none"
          role="img"
          aria-label={`Revenue Bar Chart showing daily sales from ${dailyData[0]?.label} to ${dailyData[dailyData.length - 1]?.label}`}
        >
          {/* Y-axis Grid Lines & ETB Tick Formatting */}
          {yTicks.map((tickVal) => {
            const yPos = chartHeight - paddingBottom - (tickVal / chartMax) * plotHeight;
            return (
              <g key={`tick-${tickVal}`} className="transition-opacity">
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={chartWidth - paddingRight}
                  y2={yPos}
                  stroke="#E7E5E4"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                {/* ETB tick text formatting */}
                <text
                  x={paddingLeft - 8}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="#78716C"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {etb(tickVal)}
                </text>
              </g>
            );
          })}

          {/* X and Y Axis Base Lines */}
          <line
            x1={paddingLeft}
            y1={chartHeight - paddingBottom}
            x2={chartWidth - paddingRight}
            y2={chartHeight - paddingBottom}
            stroke="#A8A29E"
            strokeWidth="1.5"
          />

          {/* Daily Bars */}
          {dailyData.map((item, index) => {
            const slotWidth = plotWidth / dailyData.length;
            const xCenter = paddingLeft + index * slotWidth + slotWidth / 2;
            const barX = xCenter - barWidth / 2;
            const barH = Math.max(3, (item.revenue / chartMax) * plotHeight);
            const barY = chartHeight - paddingBottom - barH;

            return (
              <g
                key={item.date}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${item.label}: ${etb(item.revenue)}`}
                className="group cursor-pointer focus:outline-hidden"
              >
                {/* Bar */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barH}
                  rx="4"
                  fill="url(#orangeGradient)"
                  className="transition-all duration-200 hover:brightness-110 group-focus-visible:stroke-2 group-focus-visible:stroke-orange-600"
                />
                {/* Value label - visible on hover AND on keyboard focus */}
                <text
                  x={xCenter}
                  y={barY - 5}
                  textAnchor="middle"
                  fill="#EA580C"
                  fontSize="9"
                  fontWeight="700"
                  className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                >
                  {etb(item.revenue)}
                </text>
                {/* X-axis Day label */}
                <text
                  x={xCenter}
                  y={chartHeight - paddingBottom + 16}
                  textAnchor="middle"
                  fill="#78716C"
                  fontSize="9.5"
                  fontWeight="500"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Gradients */}
          <defs>
            <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
