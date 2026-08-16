import { Navigation } from "@/components/bukwin/navigation";
import { Footer } from "@/components/bukwin/footer";
import { ScrollProgress } from "@/components/bukwin/shared/scroll-progress";
import { CookieConsent } from "@/components/bukwin/shared/cookie-consent";
import { HeroSection } from "@/components/bukwin/sections/hero";
import { ProblemSection } from "@/components/bukwin/sections/problem";
import { LiveDemoSection } from "@/components/bukwin/sections/live-demo";
import { FeaturesSection } from "@/components/bukwin/sections/features";
import { TestimonialsSection } from "@/components/bukwin/sections/testimonials";
import { PricingSection } from "@/components/bukwin/sections/pricing";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        {/* Concise homepage — 7 sections, full story in one scroll */}
        <HeroSection />
        <ProblemSection />
        <LiveDemoSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
