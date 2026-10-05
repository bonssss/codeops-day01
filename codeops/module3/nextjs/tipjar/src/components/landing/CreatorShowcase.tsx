import Link from "next/link";
import { ArrowRight, Coffee } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

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
    <section id="creators" className="py-20 lg:py-28 relative border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Community in Action</h2>
              <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Featured Creators on TipJar
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
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
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((c, idx) => (
            <ScrollReveal key={c.handle} delay={idx * 150} direction="up">
              <div
                className="h-full rounded-3xl border border-border bg-card p-6 relative flex flex-col justify-between group hover:border-primary hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <Avatar src={c.avatar} name={c.name} size="lg" className="ring-2 ring-primary transition-transform duration-300 group-hover:scale-105" />
                    <div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground">@{c.handle}</p>
                      <Badge variant="outline" className="mt-1 text-[10px]">
                        {c.title}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {c.bio}
                  </p>

                  <div className="p-3 rounded-2xl bg-muted/60 border border-border space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium text-foreground truncate max-w-[170px]">{c.goal}</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{c.goalProgress}</span>
                    </div>
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: c.goalProgress }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Link href={`/tip/${c.handle}`} className="block">
                    <Button variant="default" size="sm" className="w-full gap-2 transition-transform duration-200 active:scale-95">
                      <Coffee className="h-4 w-4" />
                      <span>Send Tip to {c.name.split(" ")[0]}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
