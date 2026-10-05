"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link as LinkIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { HeroPreviewCard } from "@/components/landing/HeroPreviewCard";

export function HeroSection() {
  const [usernameInput, setUsernameInput] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = usernameInput.trim().replace(/^@/, "").replace(/.*\/tip\//, "");
    if (cleanUsername) {
      router.push(`/tip/${cleanUsername}`);
    } else {
      router.push("/tip/sara");
    }
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-18 lg:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag / Pill */}
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <span>Support creators, workers, and people you appreciate</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
                Support the people <br className="hidden sm:inline" />
                you appreciate.
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={200}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Tiply makes it easy to send and receive tips. Whether it&apos;s a creator, a freelancer, or someone who made your day — show your support with a tip.
              </p>
            </ScrollReveal>

            {/* Search / Tip Direct Input Form */}
            <ScrollReveal direction="up" delay={300}>
              <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto lg:mx-0 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-xl border border-border bg-card shadow-xs focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                  <div className="flex items-center gap-2.5 px-3 w-full sm:w-auto flex-1">
                    <LinkIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Enter a username or link"
                      className="w-full text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none text-foreground py-1.5"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 h-9 rounded-lg shadow-xs cursor-pointer shrink-0"
                  >
                    <span>Send a tip</span>
                  </Button>
                </div>
              </form>
            </ScrollReveal>

          </div>

          {/* Hero Right Visual: Tiply Profile Card */}
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
