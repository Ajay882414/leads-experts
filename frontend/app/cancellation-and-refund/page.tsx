// app/cancellation-and-refund/page.tsx
import Header from "@/components/common/Header";
import ContactAndFooter from "@/components/ui/ContactAndFooter";
import CancellationAndRefundContent from "@/components/CancellationAndRefundPage";

export default function CancellationAndRefundPage() {
  return (
    <>
      <Header />
      <CancellationAndRefundContent />
      <ContactAndFooter />
    </>
  );
}