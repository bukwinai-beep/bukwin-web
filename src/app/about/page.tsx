import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { FounderSection } from "@/components/bukwin/sections/founder";
import { TrustSignalsSection } from "@/components/bukwin/sections/trust-signals";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "About Bukwin AI — Built by People Who Hate Missed Calls Too",
  description:
    "The founder story, mission, and principles behind Bukwin AI — a premium AI receptionist built for small-to-medium service businesses.",
  openGraph: {
    title: "About Bukwin AI",
    description: "Built by people who hate missed calls too.",
    images: ["/api/og?title=Built%20by%20people%20who%20hate%20missed%20calls&subtitle=Founder%20story%20%26%20principles"],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Built by people who hate missed calls too."
        subtitle="Bukwin AI started with one missed dental patient and a $14,000 lesson. Now it answers calls for 200+ businesses — and it gets smarter every day."
      />
      <FounderSection />
      <TrustSignalsSection />
      <FinalCtaSection />
    </PageShell>
  );
}
