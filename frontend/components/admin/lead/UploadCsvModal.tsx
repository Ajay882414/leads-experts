"use client";

import {
  X,
} from "lucide-react";

import UploadLeadForm from "./UploadLeadForm";

interface Props {
  open: boolean;

  onClose: () => void;
}

export default function UploadCsvModal({
  open,
  onClose,
}: Props) {

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* =====================================
          BACKDROP
      ===================================== */}

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* =====================================
          MODAL
      ===================================== */}

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* ===================================
            HEADER
        =================================== */}

        <div className="sticky top-0 z-10 bg-white flex items-center justify-between border-b p-5">

          <div>
            <h2 className="text-xl font-bold">
              Upload Leads
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Upload leads in bulk
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={22} />
          </button>

        </div>

        {/* ===================================
            FORM
        =================================== */}

        <div className="p-5">

          <UploadLeadForm />

        </div>

      </div>

    </div>
  );
}