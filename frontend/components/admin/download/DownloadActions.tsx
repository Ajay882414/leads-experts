"use client";

import { Download, Trash2 } from "lucide-react";

interface Props {
  onDownload: () => void;
  onDelete: () => void;
}

export default function DownloadActions({
  onDownload,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDownload}
        className="text-blue-600 hover:text-blue-800"
      >
        <Download size={18} />
      </button>

      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}