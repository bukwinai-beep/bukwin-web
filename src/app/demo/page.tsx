import { PageShell } from "@/components/bukwin/shared/page-shell";
import { LiveDemoSection } from "@/components/bukwin/sections/live-demo";
import { HowItWorksSection } from "@/components/bukwin/sections/how-it-works";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Live Demo — Talk to Bukwin AI Right Now",
  description:
    "Experience the Bukwin AI receptionist yourself. No signup required. Try voice or chat with real LLM-powered conversation.",
  openGraph: {
    title: "Try Bukwin AI Live",
    description: "Talk to Bukwin AI right now. No signup required.",
    images: ["/api/og?title=Talk%20to%20Bukwin%20AI%20right%20now&subtitle=No%20signup%20required"],
  },
};

export default function DemoPage() {
  return (
    <PageShell noTopPadding>
      {/* The live demo section has its own padding */}
      <LiveDemoSection />
      <HowItWorksSection />
      <FinalCtaSection />
    </PageShell>
  );
}
