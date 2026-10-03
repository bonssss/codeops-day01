import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-500/20 via-neutral-900 to-neutral-950 border border-amber-500/30 p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get Started In Seconds</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to create your custom TipJar?
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Join hundreds of creators getting tipped, funded, and supported directly by their fans. No upfront fees.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="glow" size="lg" className="font-bold text-base px-8 h-13 gap-2">
                  <span>Claim Your TipJar Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05060a] py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-bold">
          <div className="h-7 w-7 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-xs">
            TJ
          </div>
          <span>TipJar Platform</span>
        </div>

        <p className="text-neutral-500">
          &copy; {new Date().getFullYear()} TipJar. Built for modern creators with Next.js & PostgreSQL.
        </p>

        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          <Link href="/register" className="text-amber-400 hover:text-amber-300 transition-colors">Get Started</Link>
        </div>
      </div>
    </footer>
  );
}
