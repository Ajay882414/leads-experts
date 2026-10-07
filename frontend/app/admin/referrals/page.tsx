import ClientReferralTracker from "@/components/admin/ClientReferralTracker";

export default function AdminReferralsPage() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Client Referral Tracking
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Monitor users who joined via client referral links and review their lead purchases.
        </p>
      </div>

      {/* Tracker Component */}
      <ClientReferralTracker />
    </div>
  );
}