import AboutHero from "@/components/about/AboutHero";
import AboutOriginStory from "@/components/about/AboutOriginStory";
import AboutValuePillars from "@/components/about/AboutValuePillars";
import AboutMilestones from "@/components/about/AboutMilestones";
import AboutCTA from "@/components/about/AboutCTA";
import Header from "@/components/common/Header";
import ContactAndFooter from "@/components/ui/ContactAndFooter";

export const metadata = {
  title: "About Us | LeadsVero",
  description: "Learn about the mission, data integrity benchmarks, and technology powering LeadsVero lead marketplace.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafcfb]">
      <Header/>
      {/* Section 1: Hero */}
      <AboutHero />

      {/* Section 2: Origin Story */}
      <AboutOriginStory />

      {/* Section 3: Core Quality Pillars */}
      <AboutValuePillars />

      {/* Section 4: Milestones & Traction */}
      <AboutMilestones />

      {/* Section 5: Direct Marketplace CTA */}
      <AboutCTA />

      <ContactAndFooter/>
    </main>
  );
}