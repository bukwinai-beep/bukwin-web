import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Contact — Let's Talk About Your Phone",
  description:
    "Book a free 15-minute consultation. No pitch deck, no pressure. We'll ask what your phone does on a busy day, then show you Bukwin handling it.",
  openGraph: {
    title: "Contact Bukwin AI",
    description: "Let's talk about your phone.",
    images: ["/api/og?title=Let%27s%20talk%20about%20your%20phone&subtitle=15%20minutes%2C%20no%20pitch%20deck"],
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your phone."
        subtitle="Fifteen minutes, no pitch deck. We'll ask what your phone does on a busy day, then show you Bukwin handling it. Response time: under 2 business hours."
      />
      <FinalCtaSection />
    </PageShell>
  );
}
