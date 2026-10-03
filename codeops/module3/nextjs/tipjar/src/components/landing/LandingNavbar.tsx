import Link from "next/link";
import { Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar({ user }: { user?: { name: string; username?: string | null } | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Coffee className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Tip<span className="gradient-text">Jar</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-amber-400 transition-colors">
            Features
          </a>
          <a href="#creators" className="hover:text-amber-400 transition-colors">
            Featured Creators
          </a>
          <Link href="/tip/bonsa" className="text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1">
            <span>Demo Page</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full">Live</span>
          </Link>
        </nav>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
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
                <Button variant="default" size="sm" className="gap-1.5 shadow-amber-500/20">
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
