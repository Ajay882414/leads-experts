import LeadForm from "@/components/admin/lead/LeadForm";

export default function CreateLeadPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Create Lead
        </h1>

        <p className="text-gray-500">
          Add a new lead into your database
        </p>

      </div>

      <LeadForm />

    </div>
  );
}