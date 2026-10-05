import { getSession } from "@/lib/auth";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CreatorShowcase } from "@/components/landing/CreatorShowcase";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default async function HomePage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar user={session} />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <CreatorShowcase />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
