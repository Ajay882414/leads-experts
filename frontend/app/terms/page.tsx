import Header from "@/components/common/Header";
import TermsAndConditionsContent from "@/components/terms/TermsAndConditionsContent";
import ContactAndFooter from "@/components/ui/ContactAndFooter";

export const metadata = {
  title: "Terms and Conditions | LeadsVero",
  description: "Terms of service, lead licensing policies, and data quality guarantees for LeadsVero platform.",
};

export default function TermsPage() {
  return (
    <main className="w-full min-h-screen bg-white">
        <Header/>
      <TermsAndConditionsContent />
      <ContactAndFooter/>
    </main>
  );
}