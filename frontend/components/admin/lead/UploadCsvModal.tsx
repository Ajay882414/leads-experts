"use client";

import UploadLeadForm from "./UploadLeadForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function UploadCsvModal({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Upload Leads
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕

          </button>

        </div>

        <div className="p-6">

          <UploadLeadForm />

        </div>

      </div>

    </div>
  );
}