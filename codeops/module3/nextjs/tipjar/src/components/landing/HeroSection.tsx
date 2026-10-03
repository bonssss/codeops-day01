import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Direct Tipping Platform for Creators</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Turn your creativity into a{" "}
                <span className="text-amber-600 dark:text-amber-400">sustainable livelihood.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Create a personalized public tipping link in seconds. Let your supporters send tips, fund project milestones, and leave encouraging messages.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button variant="default" size="lg" className="w-full sm:w-auto gap-2 font-bold text-base px-8 h-13 transition-transform duration-200 active:scale-95">
                    <span>Create Your Free TipJar</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/tip/bonsa" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-13 transition-transform duration-200 hover:-translate-y-0.5">
                    View Demo Page
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Value bullets */}
            <ScrollReveal direction="up" delay={400}>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">0% Platform Fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">Instant Mock Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">QR Code Built-In</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Right Visual: Live Preview Card */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={250}>
              <div className="relative mx-auto max-w-md">
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xl space-y-5 transition-all duration-300 hover:shadow-2xl">
                  {/* Creator Header */}
                  <div className="flex items-center gap-4">
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                      name="Bonsa Diriba"
                      size="lg"
                      className="ring-2 ring-amber-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">Bonsa Diriba</h3>
                        <Badge variant="default" className="text-[10px]">Verified</Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">tipjar.io/tip/bonsa</p>
                    </div>
                  </div>

                  {/* Goal Preview */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">🎯 32GB M3 Workstation Goal</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">73%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-600 dark:bg-amber-500 w-[73%] transition-all duration-1000 ease-out" />
                    </div>
                    <div className="text-[10px] text-slate-500 text-right">36,500 / 50,000 ETB</div>
                  </div>

                  {/* Amount Selectors */}
                  <div className="space-y-2">
                    <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">Select Amount:</div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                      <div className="py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-transform duration-150 hover:scale-105 cursor-pointer">50 ETB</div>
                      <div className="py-2 rounded-xl bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-black transition-transform duration-150 scale-105 shadow-sm">100 ETB</div>
                      <div className="py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-transform duration-150 hover:scale-105 cursor-pointer">200 ETB</div>
                      <div className="py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-transform duration-150 hover:scale-105 cursor-pointer">500 ETB</div>
                    </div>
                  </div>

                  {/* Supporter Feed Snapshot */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                      💛
                    </div>
                    <div className="text-xs flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white">Sara Bekele <span className="text-amber-600 dark:text-amber-400 font-bold ml-1">500 ETB</span></div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate">&ldquo;Thanks for the amazing Next.js guide!&rdquo;</div>
                    </div>
                  </div>

                  <Link href="/tip/bonsa" className="block">
                    <Button variant="default" className="w-full font-bold transition-transform duration-200 active:scale-95">
                      Send 100 ETB Tip
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
