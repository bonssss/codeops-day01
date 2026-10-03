"use client";

import * as React from "react";
import Link from "next/link";
import { Coffee, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function LandingNavbar({
  user,
}: {
  user?: { name: string; username?: string | null } | null;
}) {
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["how-it-works", "features", "creators"];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
      setActiveSection(targetId);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? "border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm"
          : "border-slate-200/40 dark:border-slate-800/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white dark:text-slate-950 font-bold shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Coffee className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Tip<span className="text-amber-600 dark:text-amber-400">Jar</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, "how-it-works")}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              activeSection === "how-it-works"
                ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm"
                : "hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            }`}
          >
            How It Works
          </a>

          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "features")}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              activeSection === "features"
                ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm"
                : "hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            }`}
          >
            Features
          </a>

          <a
            href="#creators"
            onClick={(e) => handleNavClick(e, "creators")}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              activeSection === "creators"
                ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm"
                : "hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            }`}
          >
            Featured Creators
          </a>

          <Link
            href="/tip/bonsa"
            className="px-3 py-1.5 rounded-full text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <span>Live Demo</span>
            <span className="text-[9px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.2 rounded-full font-mono">
              @bonsa
            </span>
          </Link>
        </nav>

        {/* Action CTAs & ThemeToggle */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {user ? (
            <Link href="/dashboard" className="hidden sm:inline-flex">
              <Button variant="default" size="sm" className="gap-2 font-semibold">
                <span>Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="gap-1.5 font-semibold">
                  <span>Start Free</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "how-it-works")}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSection === "how-it-works"
                  ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSection === "features"
                  ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Features
            </a>
            <a
              href="#creators"
              onClick={(e) => handleNavClick(e, "creators")}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSection === "creators"
                  ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Featured Creators
            </a>
            <Link
              href="/tip/bonsa"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              View Live Demo (@bonsa)
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            {user ? (
              <Link href="/dashboard" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Get Started
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
