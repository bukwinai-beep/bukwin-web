import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { CaseStudiesSection } from "@/components/bukwin/sections/case-studies";
import { TestimonialsSection } from "@/components/bukwin/sections/testimonials";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Case Studies — Real Businesses. Real Numbers.",
  description:
    "Bright Smile Dental (+142 patients/mo), Meridian Realty (11s response), Tavolo Restaurant Group (-46% no-shows). Outcome reports, not testimonials.",
  openGraph: {
    title: "Case Studies — Bukwin AI",
    description: "Real businesses. Real numbers.",
    images: ["/api/og?title=Real%20businesses.%20Real%20numbers.&subtitle=Not%20testimonials.%20Outcome%20reports."],
  },
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Case Studies"
        title="Real businesses. Real numbers."
        subtitle="Not testimonials. Outcome reports — pulled straight from the dashboard, with the receipts to back them up."
      />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </PageShell>
  );
}
