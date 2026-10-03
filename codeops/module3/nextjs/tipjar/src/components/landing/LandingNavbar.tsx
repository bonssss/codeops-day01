import Link from "next/link";
import { Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function LandingNavbar({ user }: { user?: { name: string; username?: string | null } | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white dark:text-slate-950 font-bold shadow-sm">
            <Coffee className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Tip<span className="text-amber-600 dark:text-amber-400">Jar</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#how-it-works" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Features
          </a>
          <a href="#creators" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Featured Creators
          </a>
          <Link href="/tip/bonsa" className="text-amber-600 dark:text-amber-400 hover:opacity-80 transition-opacity flex items-center gap-1.5 font-semibold">
            <span>Demo Page</span>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-1.5 py-0.5 rounded-md">Live</span>
          </Link>
        </nav>

        {/* Action CTAs & ThemeToggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm" className="gap-2">
                <span>Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="gap-1.5 font-semibold">
                  <span>Start My TipJar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
