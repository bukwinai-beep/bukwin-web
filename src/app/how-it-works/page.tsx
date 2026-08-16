import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { HowItWorksSection } from "@/components/bukwin/sections/how-it-works";
import { DashboardPreviewSection } from "@/components/bukwin/sections/dashboard-preview";
import { FaqSection } from "@/components/bukwin/sections/faq";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "How It Works — Live in 48 Hours",
  description:
    "From discovery call to go-live in 48 hours. We learn your business, connect your tools, route your number, and tune the agent continuously.",
  openGraph: {
    title: "How Bukwin AI Works",
    description: "Live in 48 hours. Here's exactly how.",
    images: ["/api/og?title=Live%20in%2048%20hours&subtitle=Setup%20in%20days%2C%20not%20months"],
  },
};

export default function HowItWorksPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="How It Works"
        title="Live in 48 hours. Here's exactly how."
        subtitle="Most businesses go live within 48 hours. Complex integrations take a few days longer — and we'll tell you honestly on the first call."
      />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <FaqSection />
      <FinalCtaSection />
    </PageShell>
  );
}
