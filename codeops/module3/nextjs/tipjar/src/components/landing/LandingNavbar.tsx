"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { TiplyLogo } from "@/components/shared/tiply-logo";

export function LandingNavbar({
  user,
}: {
  user?: { name: string; username?: string | null } | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? "border-border bg-background/95 backdrop-blur-md shadow-xs"
          : "border-transparent bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <TiplyLogo size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, "how-it-works")}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            How it works
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "features")}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#creators"
            onClick={(e) => handleNavClick(e, "creators")}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Creators
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm" className="rounded-lg font-medium px-4 h-9">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-lg font-medium text-foreground hover:bg-muted px-4 h-9">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-4 h-9 shadow-xs">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="h-9 w-9"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/98 backdrop-blur-xl px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "how-it-works")}
              className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#creators"
              onClick={(e) => handleNavClick(e, "creators")}
              className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              Creators
            </a>
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full justify-center">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
