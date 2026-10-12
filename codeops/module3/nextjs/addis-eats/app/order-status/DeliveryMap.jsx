"use client";

import { useMemo } from "react";

/**
 * Addis Ababa neighborhood coordinates (approximate local projection for SVG mapping)
 * Meskel Square center: ~ (9.010, 38.761)
 */
const NEIGHBORHOOD_COORDS = {
  "bole": { x: 280, y: 190, name: "Bole" },
  "kazanchis": { x: 210, y: 120, name: "Kazanchis" },
  "sarbet": { x: 130, y: 180, name: "Sarbet" },
  "piazza": { x: 150, y: 70, name: "Piazza" },
  "arat kilo": { x: 180, y: 60, name: "Arat Kilo" },
  "megenagna": { x: 310, y: 100, name: "Megenagna" },
  "gerji": { x: 340, y: 170, name: "Gerji" },
  "cmc": { x: 380, y: 130, name: "CMC" },
  "gotera": { x: 190, y: 220, name: "Gotera" },
  "lideta": { x: 120, y: 130, name: "Lideta" },
  "mexico": { x: 160, y: 160, name: "Mexico Square" },
  "old airport": { x: 110, y: 220, name: "Old Airport" },
  "bisrate gabriel": { x: 100, y: 200, name: "Bisrate Gabriel" },
  "piassa": { x: 150, y: 70, name: "Piassa" },
  "ayat": { x: 410, y: 110, name: "Ayat" },
  "summit": { x: 430, y: 140, name: "Summit" },
  "default": { x: 250, y: 160, name: "Bole Sub-City" },
};

export default function DeliveryMap({
  orderStatus = "out_for_delivery",
  customerAddress = "Bole Atlas, Desalegn Hotel",
  courierName = "Kidus",
  courierPhone = "+251 91 234 5678",
}) {
  // Determine delivery destination coordinates based on address text
  const destCoords = useMemo(() => {
    const lower = (customerAddress || "").toLowerCase();
    for (const [key, coords] of Object.entries(NEIGHBORHOOD_COORDS)) {
      if (lower.includes(key)) return coords;
    }
    return NEIGHBORHOOD_COORDS["default"];
  }, [customerAddress]);

  // Courier moves based on status
  const courierCoords = useMemo(() => {
    if (orderStatus === "delivered") {
      // Courier has reached destination
      return { x: destCoords.x, y: destCoords.y, label: "Arrived at Destination" };
    }
    if (orderStatus === "out_for_delivery") {
      // En route from kitchen hub (Meskel/Kazanchis) toward destination
      return {
        x: Math.round(destCoords.x * 0.65 + 170 * 0.35),
        y: Math.round(destCoords.y * 0.65 + 110 * 0.35),
        label: "En Route to Customer",
      };
    }
    // Kitchen prep stage
    return { x: 170, y: 110, label: "At Addis Eats Kitchen (Meskel Sq)" };
  }, [orderStatus, destCoords]);

  // Requirement 2: Fit view to both markers with dynamic bounding box calculation
  const { viewBox, distanceKm } = useMemo(() => {
    const minX = Math.min(courierCoords.x, destCoords.x);
    const maxX = Math.max(courierCoords.x, destCoords.x);
    const minY = Math.min(courierCoords.y, destCoords.y);
    const maxY = Math.max(courierCoords.y, destCoords.y);

    const padding = 55;
    const boxX = Math.max(0, minX - padding);
    const boxY = Math.max(0, minY - padding);
    const boxW = Math.max(160, maxX - minX + padding * 2);
    const boxH = Math.max(140, maxY - minY + padding * 2);

    const dx = courierCoords.x - destCoords.x;
    const dy = courierCoords.y - destCoords.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const km = orderStatus === "delivered" ? 0 : Math.max(0.4, Number((dist * 0.025).toFixed(1)));

    return {
      viewBox: `${boxX} ${boxY} ${boxW} ${boxH}`,
      distanceKm: km,
    };
  }, [courierCoords, destCoords, orderStatus]);

  // Midpoint for route line label
  const midX = (courierCoords.x + destCoords.x) / 2;
  const midY = (courierCoords.y + destCoords.y) / 2;

  return (
    <div
      data-testid="delivery-map-container"
      className="w-full bg-stone-900 rounded-3xl p-5 sm:p-6 border border-stone-800 shadow-md text-white my-6"
    >
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-stone-800 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-lg">
            🗺️
          </span>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Live Courier Tracking Map
            </h3>
            <p className="text-xs text-stone-400">
              Addis Ababa Metropolitan Delivery Grid · Auto-fitted bounds
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {orderStatus === "delivered" ? "Delivered" : `${distanceKm} km away`}
          </span>
          <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-stone-800 text-stone-300 border border-stone-700">
            View Fitted
          </span>
        </div>
      </div>

      {/* Sized Vector Map Canvas with dynamic viewBox fitting both markers */}
      <div
        className="w-full relative h-72 sm:h-80 rounded-2xl bg-stone-950/80 border border-stone-800/80 overflow-hidden flex items-center justify-center"
        style={{ height: "300px" }}
        data-testid="fitted-map-view"
      >
        <svg
          viewBox={viewBox}
          className="w-full h-full select-none"
          role="img"
          aria-label={`Map showing courier at ${courierCoords.label} and delivery destination at ${customerAddress}`}
        >
          <defs>
            {/* Grid pattern */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#292524" strokeWidth="0.7" />
            </pattern>
            {/* Route glow */}
            <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* City Grid */}
          <rect width="500" height="350" fill="url(#grid)" />

          {/* Background Street lines */}
          <path
            d="M 80 180 Q 200 160 380 140 M 150 50 L 220 280 M 100 240 L 360 80"
            stroke="#44403C"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Route path between courier and destination */}
          {orderStatus !== "delivered" && (
            <g>
              <line
                x1={courierCoords.x}
                y1={courierCoords.y}
                x2={destCoords.x}
                y2={destCoords.y}
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                className="animate-pulse"
              />
              {/* Distance pill on line */}
              <rect
                x={midX - 25}
                y={midY - 11}
                width="50"
                height="22"
                rx="11"
                fill="#1C1917"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <text
                x={midX}
                y={midY + 4}
                textAnchor="middle"
                fill="#F97316"
                fontSize="10"
                fontWeight="700"
                fontFamily="sans-serif"
              >
                {distanceKm} km
              </text>
            </g>
          )}

          {/* Courier Marker (🛵) */}
          <g transform={`translate(${courierCoords.x}, ${courierCoords.y})`}>
            {/* Pulse ripple */}
            <circle r="18" fill="#F97316" fillOpacity="0.25" className="animate-ping" />
            <circle r="12" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">
              🛵
            </text>
            {/* Courier Label */}
            <g transform="translate(0, -18)">
              <rect
                x="-40"
                y="-15"
                width="80"
                height="18"
                rx="9"
                fill="#0C0A09"
                stroke="#EA580C"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-3"
                textAnchor="middle"
                fill="#FDBA74"
                fontSize="9"
                fontWeight="700"
              >
                Courier: {courierName}
              </text>
            </g>
          </g>

          {/* Delivery Marker (📍) */}
          <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
            <circle r="14" fill="#10B981" fillOpacity="0.3" />
            <circle r="10" fill="#059669" stroke="#FFFFFF" strokeWidth="2.5" />
            <text x="0" y="3.5" textAnchor="middle" fontSize="10">
              📍
            </text>
            {/* Destination Label */}
            <g transform="translate(0, 24)">
              <rect
                x="-45"
                y="-13"
                width="90"
                height="18"
                rx="9"
                fill="#0C0A09"
                stroke="#10B981"
                strokeWidth="1"
              />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#6EE7B7"
                fontSize="8.5"
                fontWeight="700"
              >
                Destination ({destCoords.name})
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Requirement 2: Repeat both markers and fit in accessible text */}
      <div
        data-testid="map-markers-text-summary"
        className="mt-4 p-3.5 rounded-xl bg-stone-800/70 border border-stone-700/60 text-xs space-y-1.5"
      >
        <div className="flex items-start gap-2">
          <span className="font-bold text-orange-400">🛵 Courier Marker:</span>
          <span className="text-stone-300">
            {courierName} ({courierPhone}) — {courierCoords.label}.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-bold text-emerald-400">📍 Delivery Marker:</span>
          <span className="text-stone-300">
            Destination: {customerAddress} ({destCoords.name}).
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-stone-700/60 text-[11px] text-stone-400">
          <span className="font-semibold text-stone-300">Viewport Framing:</span>
          <span>
            Camera bounds dynamically fitted to enclose both the courier and delivery markers ({distanceKm} km transit span).
          </span>
        </div>
      </div>
    </div>
  );
}
