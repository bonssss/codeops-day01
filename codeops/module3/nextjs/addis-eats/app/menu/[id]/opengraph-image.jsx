import { ImageResponse } from "next/og";
import { getDishById } from "@/lib/data";

export const alt = "Addis Eats Dish Details";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = getDishById(id) || {
    name: "Ethiopian Specialty Dish",
    category: "Traditional",
    formattedPrice: "$15.00",
    emoji: "🍲",
    description: "Authentic Ethiopian cuisine freshly prepared with injera.",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #431407 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "36px" }}>🍲</span>
            <span style={{ fontSize: "28px", fontWeight: "900", color: "#ea580c" }}>
              Addis Eats
            </span>
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(234, 88, 12, 0.25)",
              color: "#fb923c",
              border: "1px solid rgba(234, 88, 12, 0.4)",
            }}
          >
            {dish.category}
          </div>
        </div>

        {/* Center Dish Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "70px" }}>{dish.emoji}</span>
            <span style={{ fontSize: "56px", fontWeight: "900", color: "#fef3c7" }}>
              {dish.name}
            </span>
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#d6d3d1",
              maxWidth: "960px",
              lineHeight: 1.4,
            }}
          >
            {dish.description}
          </div>
        </div>

        {/* Footer with Price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ fontSize: "20px", color: "#a8a29e" }}>
            Freshly prepared with love in Addis Ababa 🇪🇹
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "900",
              color: "#ea580c",
              background: "#ffffff",
              padding: "8px 24px",
              borderRadius: "20px",
            }}
          >
            {dish.formattedPrice}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
