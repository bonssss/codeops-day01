import {
  CreditCard,
  Target,
  QrCode,
  BarChart3,
  HeartHandshake,
  Sliders,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function FeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Pluggable Payment Engine",
      description:
        "Built with an extensible payment provider abstraction. Easily test in mock mode or plug into Telebirr, CBE Birr, Chapa, and Stripe.",
    },
    {
      icon: <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Interactive Creator Goals",
      description:
        "Set milestone goals with visual progress bars. Whether funding new podcast equipment or software tools, supporters see real impact.",
    },
    {
      icon: <QrCode className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Dynamic QR Code Generator",
      description:
        "Download crisp PNG QR codes customized for your tipping URL. Perfect for live streams, event presentations, and merchandise.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Real-time Analytics & Charts",
      description:
        "Track monthly trends, average tip sizes, supporter breakdown, and transaction status distributions with built-in Recharts visualizations.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Live Supporter Wall",
      description:
        "Publicly display kind messages and badges from your community. Flexible privacy options allow donors to tip anonymously.",
    },
    {
      icon: <Sliders className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Full Brand Customization",
      description:
        "Configure custom suggested amounts, custom thank-you messages, multi-currency display (ETB, USD, EUR), and social media links.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-24 relative border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Everything Included</h2>
            <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Built for Serious Creators & Developers
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Everything you need to accept support seamlessly with zero setup headaches.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <ScrollReveal key={f.title} delay={idx * 100} direction="up">
              <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-sm transition-all">
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
