import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CreatorShowcase() {
  const creators = [
    {
      name: "Sara Ahmed",
      handle: "sara",
      title: "Content Creator & Writer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      bio: "Creating content, sharing ideas, and building a kinder internet. 💚",
      goal: "🎯 New Studio Microphone & Camera",
      goalProgress: "73%",
      currency: "ETB",
    },
    {
      name: "Bonsa Diriba",
      handle: "bonsa",
      title: "Full Stack Engineer & Educator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "Building open source Next.js developer tools & tutorials.",
      goal: "🚀 Upgrade High-Performance Dev Setup",
      goalProgress: "64%",
      currency: "ETB",
    },
    {
      name: "Mina Tadesse",
      handle: "mina",
      title: "Digital Artist & Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      bio: "Creating free UI kits and African digital art assets.",
      goal: "🎨 Wacom Cintiq Drawing Tablet",
      goalProgress: "48%",
      currency: "ETB",
    },
  ];

  return (
    <section id="creators" className="py-20 lg:py-24 relative border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Community in Action</h2>
              <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Featured Creators on Tiply
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                Explore live creator pages, send a tip, or get inspired for your own profile.
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
                className="h-full rounded-2xl border border-border bg-card p-6 relative flex flex-col justify-between group hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <Avatar src={c.avatar} name={c.name} size="lg" className="ring-2 ring-emerald-500/30" />
                    <div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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

                  <div className="p-3 rounded-xl bg-muted/60 border border-border space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium text-foreground truncate max-w-[170px]">{c.goal}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{c.goalProgress}</span>
                    </div>
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: c.goalProgress }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Direct Tipping</span>
                  <Link href={`/tip/${c.handle}`}>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 p-0 h-auto hover:bg-transparent">
                      <span>Send a Tip</span>
                      <ArrowRight className="h-3 w-3" />
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
