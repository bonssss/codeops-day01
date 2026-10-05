import Link from "next/link";
import { Sparkles, CheckCircle, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { HeroPreviewCard } from "@/components/landing/HeroPreviewCard";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Soft Ambient Background Mesh */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
                Support the people <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-400 bg-clip-text text-transparent">
                  you appreciate.
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={200}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Tiply is a clean, minimal platform where supporters send tips, fund project milestones, and leave encouraging notes with zero friction.
              </p>
            </ScrollReveal>

            {/* Highlights Grid */}
            <ScrollReveal direction="up" delay={300}>
              <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">


                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs text-muted-foreground font-medium">QR Codes Built-In</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs text-muted-foreground font-medium">Supporter Wall</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Hero Right Visual: Clean Interactive Showcase */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <ScrollReveal direction="left" delay={250}>
              <HeroPreviewCard />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
