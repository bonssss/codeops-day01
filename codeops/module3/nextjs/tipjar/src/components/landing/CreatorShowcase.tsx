import Link from "next/link";
import { ArrowRight, Coffee, Heart, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CreatorShowcase() {
  const creators = [
    {
      name: "Bonsa Diriba",
      handle: "bonsa",
      title: "Full Stack Engineer & Tech Educator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      bio: "Building open source Next.js developer tools & tutorials in Addis Ababa.",
      goal: "🚀 Upgrade High-Performance Dev Setup",
      goalProgress: "73%",
      currency: "ETB",
    },
    {
      name: "Sara Bekele",
      handle: "sarab",
      title: "Digital Illustrator & UI Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      bio: "Creating free UI kits and Ethiopian cultural digital art.",
      goal: "🎨 Wacom Cintiq Pro Drawing Tablet",
      goalProgress: "64%",
      currency: "ETB",
    },
    {
      name: "Abel Tadesse",
      handle: "abelt",
      title: "Indie Musician & Sound Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "Creating Ethio-Jazz lo-fi beats, sample packs, and music guides.",
      goal: "🎹 Studio Monitor Speakers",
      goalProgress: "38%",
      currency: "ETB",
    },
  ];

  return (
    <section id="creators" className="py-20 lg:py-28 relative border-t border-white/5 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">Community in Action</h2>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Creators on TipJar
            </p>
            <p className="text-neutral-400 text-sm sm:text-base">
              Explore live creator pages, send a test tip, or get inspired for your own profile.
            </p>
          </div>
          <Link href="/register">
            <Button variant="outline" className="gap-2">
              <span>Join as a Creator</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((c) => (
            <div
              key={c.handle}
              className="glass-card rounded-3xl p-6 relative flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <Avatar src={c.avatar} name={c.name} size="lg" className="ring-2 ring-amber-500/20" />
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">@{c.handle}</p>
                    <Badge variant="outline" className="mt-1 text-[10px]">
                      {c.title}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {c.bio}
                </p>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-white truncate max-w-[170px]">{c.goal}</span>
                    <span className="font-bold text-amber-400">{c.goalProgress}</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      style={{ width: c.goalProgress }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <Link href={`/tip/${c.handle}`} className="block">
                  <Button variant="default" size="sm" className="w-full gap-2">
                    <Coffee className="h-4 w-4" />
                    <span>Send Tip to {c.name.split(" ")[0]}</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
