import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "TipJar - Empowering Creators with Direct Tips & Supporter Goals",
  description:
    "A modern full-stack tipping platform allowing developers, artists, freelancers, and content creators to receive instant tips and achieve project goals.",
  keywords: ["tipping", "creator economy", "donations", "fintech", "nextjs", "ethiopia", "telebirr"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#07090e] text-neutral-100 min-h-screen selection:bg-amber-500 selection:text-neutral-950">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
