import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white border border-emerald-500/40 p-10 sm:p-16 text-center shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-200 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Get Started In Seconds</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Ready to start receiving tips?
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal">
                Join creators, freelancers, and professionals getting supported directly by their fans and clients. No upfront fees.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button variant="default" size="lg" className="font-bold text-base px-8 h-12 gap-2 transition-transform duration-200 active:scale-95 bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg">
                    <span>Create Your Tiply Link</span>
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
