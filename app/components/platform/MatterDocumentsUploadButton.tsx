"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DocumentUploadModal from "./DocumentUploadModal";

interface MatterDocumentsUploadButtonProps {
  matterId: string;
  clientId?: string;
}

/**
 * Compact "Upload" trigger used inside the matter detail page's
 * documents card. Pre-fills the matter (and optionally client) link.
 */
export default function MatterDocumentsUploadButton({
  matterId,
  clientId,
}: MatterDocumentsUploadButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-touch items-center justify-center rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-600 transition-colors hover:bg-navy-50"
      >
        Upload
      </button>
      <DocumentUploadModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => router.refresh()}
        defaultMatterId={matterId}
        defaultClientId={clientId}
      />
    </>
  );
}
