export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
