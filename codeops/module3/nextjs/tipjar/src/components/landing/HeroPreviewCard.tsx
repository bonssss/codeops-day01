"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Heart, Edit3, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const PRESET_AMOUNTS = [1, 5, 10];

export function HeroPreviewCard() {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>("25");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const activeAmount = isCustom ? Number(customValue) || 1 : selectedAmount;

  const handleSimulateTip = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="relative mx-auto max-w-sm w-full">
      {/* Background Soft Shadow / Glow */}
      <div
        className="absolute -inset-2 sm:-inset-4 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-3xl blur-xl -z-10 opacity-70"
        aria-hidden="true"
      />

      {/* Main Tiply Profile Card */}
      <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6">
        
        {/* Creator Header */}
        <div className="flex items-start gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
            name="Sara Ahmed"
            size="lg"
            className="h-14 w-14 rounded-full ring-2 ring-emerald-500/20"
          />
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-base leading-tight">Sara Ahmed</h3>
            <p className="text-xs text-muted-foreground font-mono">@sara</p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              Creating content, sharing ideas, and building a kinder internet. 💚
            </p>
          </div>
        </div>

        {/* Amount Selector Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-3 gap-2.5">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = !isCustom && selectedAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setIsCustom(false);
                    setSelectedAmount(amt);
                  }}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer text-center ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-600"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  ${amt}
                </button>
              );
            })}
          </div>

          {isCustom ? (
            <div className="flex items-center gap-2 p-1.5 border border-emerald-600 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/20">
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 pl-2">$</span>
              <input
                type="number"
                min="1"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-transparent text-sm font-bold text-foreground focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsCustom(false)}
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className="w-full py-2 px-3 rounded-lg text-xs font-medium border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Custom amount</span>
            </button>
          )}
        </div>

        {/* Action Button & Confirmation */}
        <div className="pt-1">
          {isSuccess ? (
            <div className="py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-center text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in duration-200">
              <Check className="h-4 w-4 stroke-[2.5]" />
              <span>Tip of ${activeAmount} simulated! Thank you!</span>
            </div>
          ) : (
            <Link href={`/tip/sara`}>
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm h-10 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send ${activeAmount} Tip</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
