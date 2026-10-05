import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-stone-900 border border-amber-400/40 p-10 sm:p-16 text-center shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/10 border border-stone-900/20 text-stone-950 text-xs font-bold backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-stone-900 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Get Started In Seconds</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight">
                Ready to create your custom TipJar?
              </h2>

              <p className="text-stone-900/90 text-sm sm:text-base leading-relaxed font-medium">
                Join creators getting tipped, funded, and supported directly by their fans. No upfront fees.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button variant="default" size="lg" className="font-bold text-base px-8 h-13 gap-2 transition-transform duration-200 active:scale-95 bg-stone-900 text-white hover:bg-stone-800 shadow-lg">
                    <span>Claim Your TipJar Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 text-muted-foreground text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-foreground font-bold">
          <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-xs">
            TJ
          </div>
          <span>TipJar Platform</span>
        </div>

        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} TipJar. Clean, modern creator tipping platform.
        </p>

        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
          <Link href="/register" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">Get Started</Link>
        </div>
      </div>
    </footer>
  );
}
