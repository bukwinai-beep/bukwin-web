import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { IndustriesSection } from "@/components/bukwin/sections/industries";
import { IntegrationsSection } from "@/components/bukwin/sections/integrations";
import { CaseStudiesSection } from "@/components/bukwin/sections/case-studies";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Industries — Tuned for Your Business, Not a Generic Bot",
  description:
    "Healthcare, real estate, legal, restaurants, salons, automotive, home services, hospitality, retail, consulting — each with native integrations and tuned scripts.",
  openGraph: {
    title: "Industries — Bukwin AI",
    description: "Trained for your business, not a generic bot.",
    images: ["/api/og?title=Tuned%20per%20industry&subtitle=Not%20a%20generic%20bot"],
  },
};

export default function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Industries"
        title="Not a generic bot. Trained for your business."
        subtitle="Each industry has its own script, qualifying questions, and native integrations. Click any industry to see the problem, solution, and the outcomes other businesses like yours are seeing."
      />
      <IndustriesSection />
      <IntegrationsSection />
      <CaseStudiesSection />
      <FinalCtaSection />
    </PageShell>
  );
}
