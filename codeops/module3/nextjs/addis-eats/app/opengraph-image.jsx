import { ImageResponse } from "next/og";

export const alt = "Addis Eats | Authentic Ethiopian Food Delivery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #431407 0%, #1c1917 50%, #0c0a09 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            marginBottom: "20px",
          }}
        >
          🍲
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "900",
            letterSpacing: "-1px",
            color: "#ea580c",
            marginBottom: "16px",
          }}
        >
          Addis Eats
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#fef3c7",
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          Authentic Ethiopian Food Delivery in Addis Ababa
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "36px",
            fontSize: "20px",
            color: "#fdba74",
            background: "rgba(234, 88, 12, 0.2)",
            padding: "10px 24px",
            borderRadius: "999px",
            border: "1px solid rgba(234, 88, 12, 0.4)",
          }}
        >
          ✨ Handcrafted Recipes • Fast Delivery Across the City
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
