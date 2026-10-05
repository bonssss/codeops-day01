import { User, Link2, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function HowItWorks() {
  const steps = [
    {
      icon: <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "1. Create",
      description: "Set up your profile and add your payment details.",
    },
    {
      icon: <Link2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "2. Share",
      description: "Share your link or username with your audience.",
    },
    {
      icon: <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "3. Receive",
      description: "Get tips directly to your account and keep doing what you love.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-24 relative border-t border-border/70 bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              How it works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Tipping is simple. Just three easy steps.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.title} delay={idx * 150} direction="up">
              <div className="flex flex-col items-center space-y-4 p-4">
                
                {/* Circular Icon Container */}
                <div className="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center transition-transform duration-200 hover:scale-105">
                  {step.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
