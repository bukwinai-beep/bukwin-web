import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { ComplianceSection } from "@/components/bukwin/sections/compliance";
import { TrustSignalsSection } from "@/components/bukwin/sections/trust-signals";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Security & Compliance — HIPAA, GDPR, SOC 2",
  description:
    "HIPAA-aligned (US), GDPR-compliant (EU/UK), Privacy Act (Australia), SOC 2 Type II in progress. AES-256 encryption, per-tenant isolation, audit logs.",
  openGraph: {
    title: "Security & Compliance — Bukwin AI",
    description: "Built for industries that take privacy seriously.",
    images: ["/api/og?title=Built%20for%20regulated%20industries&subtitle=HIPAA%20%C2%B7%20GDPR%20%C2%B7%20SOC%202"],
  },
};

export default function SecurityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Security & Compliance"
        title="Built for industries that take privacy seriously."
        subtitle="Healthcare, legal, financial — if your business is regulated, Bukwin is built to live inside that fence. Not bolted on later."
      />
      <ComplianceSection />
      <TrustSignalsSection />
      <FinalCtaSection />
    </PageShell>
  );
}
