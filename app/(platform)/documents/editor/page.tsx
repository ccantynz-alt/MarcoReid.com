import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { redirect } from "next/navigation";
import EditorPage from "./EditorPage";

interface PageProps {
  searchParams: Promise<{ documentId?: string }>;
}

export default async function DocumentEditorPage({ searchParams }: PageProps) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const sp = await searchParams;
  const documentId = sp.documentId;

  let initialTitle: string | undefined;
  let initialContent: string | undefined;

  if (documentId) {
    const doc = await prisma.document.findFirst({
      where: { id: documentId, userId },
    });

    if (doc) {
      initialTitle = doc.title;
      // If content is stored as a data URL in fileUrl, decode it
      if (doc.fileUrl.startsWith("data:text/html;base64,")) {
        try {
          const base64 = doc.fileUrl.replace("data:text/html;base64,", "");
          initialContent = decodeURIComponent(escape(atob(base64)));
        } catch {
          initialContent = "";
        }
      }
    }
  }

  return (
    <EditorPage
      documentId={documentId}
      initialTitle={initialTitle}
      initialContent={initialContent}
    />
  );
}
