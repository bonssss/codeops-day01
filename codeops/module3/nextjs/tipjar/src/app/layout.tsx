import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/shared/theme-provider";

export const metadata: Metadata = {
  title: "TipJar - Direct Creator Tips & Supporter Milestones",
  description:
    "A clean, modern tipping platform allowing creators, developers, freelancers, and artists to accept tips and hit funding goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950">
        <ThemeProvider defaultTheme="dark">
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
