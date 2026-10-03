import { UserPlus, Share2, DollarSign, Target, QrCode, Heart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <UserPlus className="h-6 w-6 text-amber-400" />,
      title: "Claim Your Username",
      description: "Sign up in 30 seconds, pick your custom @handle, set your bio, avatar, and preferred currency.",
    },
    {
      number: "02",
      icon: <Share2 className="h-6 w-6 text-amber-400" />,
      title: "Share Link & QR Code",
      description: "Embed your link in your social bios, stream overlays, GitHub READMEs, or print high-res QR codes.",
    },
    {
      number: "03",
      icon: <DollarSign className="h-6 w-6 text-emerald-400" />,
      title: "Get Tipped & Hit Goals",
      description: "Supporters tip directly with instant confirmation, leave encouraging notes, and fund your project goals.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative border-t border-white/5 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">Simple 3-Step Process</h2>
          <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How TipJar Powers Your Creator Journey
          </p>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Everything you need to monetize your content and accept support from anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="absolute top-6 right-6 font-mono text-4xl font-black text-white/5 group-hover:text-amber-500/10 transition-colors">
                {step.number}
              </div>

              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
