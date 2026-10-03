import {
  CreditCard,
  Target,
  QrCode,
  BarChart3,
  HeartHandshake,
  Sliders,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: "Pluggable Payment Engine",
      description:
        "Built with an extensible payment provider abstraction. Easily test in mock mode or plug into Telebirr, CBE Birr, Chapa, and Stripe.",
    },
    {
      icon: <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
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
      icon: <BarChart3 className="h-6 w-6 text-slate-700 dark:text-slate-300" />,
      title: "Real-time Analytics & Charts",
      description:
        "Track monthly trends, average tip sizes, supporter breakdown, and transaction status distributions with built-in Recharts visualizations.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
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
    <section id="features" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Everything Included</h2>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for Serious Creators & Developers
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            A production-ready platform with clean code, secure sessions, database persistence, and frictionless user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 relative transition-all duration-200 hover:border-amber-500"
            >
              <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-5">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
