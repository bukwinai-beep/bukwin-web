import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { PricingSection } from "@/components/bukwin/sections/pricing";
import { RoiSection } from "@/components/bukwin/sections/roi";
import { ComparisonSection } from "@/components/bukwin/sections/comparison";
import { FaqSection } from "@/components/bukwin/sections/faq";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Pricing — Simple, Flat Pricing. No Hidden Fees.",
  description:
    "Starter $79/mo, Professional $199/mo, Enterprise custom. All plans include 24/7 answering, instant setup, call recording, and a 30-day money-back guarantee.",
  openGraph: {
    title: "Bukwin AI Pricing",
    description: "The cost of a full-time receptionist, without the salary.",
    images: ["/api/og?title=Simple%2C%20flat%20pricing&subtitle=No%20per-minute%20surprises"],
  },
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="The cost of a full-time receptionist, without the salary."
        subtitle="Flat monthly pricing based on call volume and integrations — no per-minute surprises. 30-day money-back guarantee. No questions asked."
      />
      <PricingSection />
      <RoiSection />
      <ComparisonSection />
      <FaqSection />
      <FinalCtaSection />
    </PageShell>
  );
}
