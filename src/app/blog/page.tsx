import { PageShell, PageHero } from "@/components/bukwin/shared/page-shell";
import { BlogSection } from "@/components/bukwin/sections/blog";
import { FinalCtaSection } from "@/components/bukwin/sections/final-cta";

export const metadata = {
  title: "Insights — Field Notes from the Front Desk",
  description:
    "Practical research on missed calls, conversion, and the economics of being reachable — written by the team building Bukwin AI.",
  openGraph: {
    title: "Insights — Bukwin AI",
    description: "Field notes from the front desk.",
    images: ["/api/og?title=Field%20notes%20from%20the%20front%20desk&subtitle=Practical%20research%20on%20missed%20calls"],
  },
};

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title="Field notes from the front desk."
        subtitle="Practical research on missed calls, conversion, and the economics of being reachable — written by the team building Bukwin."
      />
      <BlogSection />
      <FinalCtaSection />
    </PageShell>
  );
}
