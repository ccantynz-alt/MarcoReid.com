"use client";

import { useRouter } from "next/navigation";
import DocumentUploadModal from "./DocumentUploadModal";

interface UploadDeepLinkProps {
  defaultMatterId?: string;
  defaultClientId?: string;
}

/**
 * Inline wrapper around DocumentUploadModal for the standalone /documents/upload page.
 * On success we navigate to the new document's detail view.
 */
export default function UploadDeepLink({
  defaultMatterId,
  defaultClientId,
}: UploadDeepLinkProps) {
  const router = useRouter();
  return (
    <DocumentUploadModal
      open
      inline
      onClose={() => router.push("/documents")}
      onSuccess={(doc) => router.push(`/documents/${doc.id}`)}
      defaultMatterId={defaultMatterId}
      defaultClientId={defaultClientId}
    />
  );
}
