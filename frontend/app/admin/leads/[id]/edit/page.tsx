"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import LeadForm from "@/components/admin/lead/LeadForm";

import { getLead } from "@/services/leadApi";

export default function EditLeadPage() {
  const { id } = useParams();

  const [lead, setLead] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await getLead(id as string);

        setLead(res.lead);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLead();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Lead
        </h1>

        <p className="text-gray-500">
          Update lead details
        </p>

      </div>

      <LeadForm
        initialData={lead}
        isEdit
      />

    </div>
  );
}