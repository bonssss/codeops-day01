import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>The Next-Gen Tipping Platform for Creators</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Turn your creativity into a{" "}
              <span className="gradient-text">sustainable livelihood.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Create a personalized public tipping link in seconds. Let your fans, followers, and clients send tips, fund project milestones, and leave encouraging messages.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 font-bold text-base px-8 h-14">
                  <span>Create Your Free TipJar</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/tip/bonsa" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-14">
                  View Demo Page
                </Button>
              </Link>
            </div>

            {/* Value bullets */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-neutral-300">0% Platform Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-neutral-300">Instant Mock Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-neutral-300">QR Code Built-In</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Live Interactive Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Decorative background glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/30 to-rose-500/30 blur-2xl opacity-60 animate-pulse-subtle" />

              {/* Mockup Card */}
              <div className="relative glass-card rounded-3xl p-6 sm:p-7 border-amber-500/30 shadow-2xl space-y-5">
                {/* Mock Creator Header */}
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                    name="Bonsa Diriba"
                    size="lg"
                    className="ring-2 ring-amber-400"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">Bonsa Diriba</h3>
                      <Badge variant="default" className="text-[10px]">Verified</Badge>
                    </div>
                    <p className="text-xs text-neutral-400">tipjar.io/tip/bonsa</p>
                  </div>
                </div>

                {/* Mock Goal */}
                <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white">🎯 32GB M3 Workstation Goal</span>
                    <span className="text-amber-400 font-bold">73%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 w-[73%]" />
                  </div>
                  <div className="text-[10px] text-neutral-400 text-right">36,500 / 50,000 ETB</div>
                </div>

                {/* Mock Tip Selectors */}
                <div className="space-y-2">
                  <div className="text-xs text-neutral-300 font-medium">Select Amount:</div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                    <div className="py-2 rounded-xl bg-white/5 text-neutral-300 border border-white/5">50 ETB</div>
                    <div className="py-2 rounded-xl bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-black">100 ETB</div>
                    <div className="py-2 rounded-xl bg-white/5 text-neutral-300 border border-white/5">200 ETB</div>
                    <div className="py-2 rounded-xl bg-white/5 text-neutral-300 border border-white/5">500 ETB</div>
                  </div>
                </div>

                {/* Mock Supporter Feed Snapshot */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    💛
                  </div>
                  <div className="text-xs flex-1">
                    <div className="font-semibold text-white">Sara Bekele <span className="text-amber-400 font-bold ml-1">500 ETB</span></div>
                    <div className="text-neutral-400 text-[11px] truncate">&ldquo;Thanks for the amazing Next.js guide!&rdquo;</div>
                  </div>
                </div>

                <Link href="/tip/bonsa">
                  <Button variant="default" className="w-full font-bold shadow-lg shadow-amber-500/20">
                    Send 100 ETB Tip
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
