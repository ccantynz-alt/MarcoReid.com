"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";

interface DocumentActionsProps {
  documentId: string;
  fileUrl: string;
  fileName: string;
}

export default function DocumentActions({
  documentId,
  fileUrl,
  fileName,
}: DocumentActionsProps) {
  const router = useRouter();
  const toast = useToast();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/documents/${documentId}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Delete failed");
      }
      toast.success("Document deleted", `${fileName} has been removed.`);
      router.push("/documents");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      toast.error("Couldn't delete document", message);
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={fileUrl}
        download={fileName}
        className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
      >
        Download
      </a>

      {confirming ? (
        <span className="inline-flex items-center gap-2 rounded-lg border border-plum-200 bg-plum-50/60 px-3 py-1.5 text-sm text-plum-700">
          Delete this document?
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="rounded-md bg-plum-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-plum-700 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Confirm"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={deleting}
            className="rounded-md px-2 py-1 text-xs font-medium text-plum-700 hover:bg-plum-100"
          >
            Cancel
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex min-h-touch items-center justify-center rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50"
        >
          Delete
        </button>
      )}
    </div>
  );
}
