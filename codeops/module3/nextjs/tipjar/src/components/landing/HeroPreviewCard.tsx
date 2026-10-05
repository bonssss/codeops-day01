"use client";

import { Zap, ShieldCheck, QrCode, Sparkles, Check } from "lucide-react";

export function HeroPreviewCard() {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[440px] flex items-center justify-center select-none">
      
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Kinetic Composition */}
      <div className="relative w-full max-w-sm flex flex-col items-center">
        
        {/* Layer 1: Floating Minimalist Scan-to-Tip Visual (Hero Visual Artifact) */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-b from-card/80 via-card/40 to-card/10 dark:from-card/60 dark:via-card/30 dark:to-card/5 backdrop-blur-2xl border border-emerald-500/30 p-6 flex flex-col items-center justify-between shadow-2xl shadow-emerald-950/10">
          
          {/* Top Bar of the Plate */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Tiply
              </span>
            </div>
         
          </div>

          {/* Central QR Hologram with Scanning Ray */}
          <div className="relative p-5 rounded-2xl bg-muted/60 dark:bg-muted/30 border border-border/80 flex items-center justify-center">
            {/* Corner Targeting Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-500 rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-500 rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-500 rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-500 rounded-br-sm" />

            {/* Glowing Laser Scan Line */}
            <div 
              className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-sm shadow-emerald-400 animate-float-slow pointer-events-none"
            />

            {/* Stylized Minimal QR Icon */}
            <QrCode className="h-20 w-20 text-foreground/80 dark:text-foreground/90 stroke-[1.5]" />
          </div>

          {/* Live Audio/Tip Waveform Pulse */}
          <div className="w-full flex items-center justify-between px-2">
            <div className="flex items-end gap-1 h-5">
              <span className="w-1 bg-emerald-500 rounded-full h-2 animate-pulse" />
              <span className="w-1 bg-emerald-500 rounded-full h-4 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-1 bg-emerald-500 rounded-full h-3 animate-pulse" style={{ animationDelay: "0.4s" }} />
              <span className="w-1 bg-emerald-500 rounded-full h-5 animate-pulse" style={{ animationDelay: "0.1s" }} />
              <span className="w-1 bg-emerald-500 rounded-full h-2 animate-pulse" style={{ animationDelay: "0.3s" }} />
            </div>
            <span className="text-[11px] font-mono font-medium text-muted-foreground">
              Direct P2P Link
            </span>
          </div>

        </div>

        {/* Layer 2: Floating Pill Accent Top Right */}
        <div className="absolute -top-4 -right-4 sm:-right-8 z-20 animate-float-slow">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/95 dark:bg-card/90 backdrop-blur-xl border border-emerald-500/40 text-xs font-bold shadow-xl shadow-black/5 text-foreground">
            <div className="h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
              <Check className="h-2.5 w-2.5 stroke-[3]" />
            </div>
            <span>Instant Tipping</span>
          </div>
        </div>

        {/* Layer 3: Floating Value Token Bottom Left */}
        <div 
          className="absolute -bottom-5 -left-4 sm:-left-8 z-20 animate-float-reverse"
          style={{ animationDelay: "1s" }}
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-600/30">
            <Zap className="h-4 w-4 fill-current text-emerald-200" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-100">Direct Tipping</span>
            </div>
          </div>
        </div>

        {/* Layer 4: Minimalist Currency Badges Floating in Periphery */}
        <div className="absolute top-1/2 -left-8 sm:-left-12 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-2">
          <div className="px-2.5 py-1 rounded-xl bg-card/80 backdrop-blur-md border border-border text-[11px] font-bold text-muted-foreground shadow-sm">
            ETB
          </div>
          <div className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
            USD
          </div>
        </div>

        <div className="absolute top-1/2 -right-8 sm:-right-12 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-2">
          <div className="p-2 rounded-xl bg-card/80 backdrop-blur-md border border-border text-muted-foreground shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="p-2 rounded-xl bg-card/80 backdrop-blur-md border border-border text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-500" />
          </div>
        </div>

      </div>
    </div>
  );
}
