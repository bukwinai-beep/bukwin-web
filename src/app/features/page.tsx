import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { FeaturesSection } from "@/components/bukwin/sections/features";
import { ComparisonSection } from "@/components/bukwin/sections/comparison";
import { IntegrationsSection } from "@/components/bukwin/sections/integrations";
import { DashboardPreviewSection } from "@/components/bukwin/sections/dashboard-preview";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Features — Everything Your Front Desk Does, Automated",
  description:
    "24/7 voice answering, instant booking, 30+ languages, CRM sync, smart transfers, WhatsApp & chat, lead qualification, analytics, and no-show recovery.",
  openGraph: {
    title: "Bukwin AI Features",
    description: "Everything a great receptionist does — answered instantly.",
    images: ["/api/og?title=Everything%20your%20front%20desk%20does&subtitle=Automated%2C%20priced%20flat%2C%20running%2024%2F7"],
  },
};

export default function FeaturesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Features"
        title="Everything your front desk does. Automated."
        subtitle="24/7 voice answering, instant booking, multilingual conversation, CRM sync, smart transfers — all priced flat and running while you sleep."
      />
      <FeaturesSection />
      <ComparisonSection />
      <IntegrationsSection />
      <DashboardPreviewSection />
      <FinalCtaSection />
    </PageShell>
  );
}
