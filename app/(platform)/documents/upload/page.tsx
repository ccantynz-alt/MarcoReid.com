import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";
import UploadDeepLink from "@/app/components/platform/UploadDeepLink";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ matterId?: string; clientId?: string }>;
}

export default async function DocumentUploadPage({ searchParams }: PageProps) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const sp = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/documents"
        className="text-sm text-navy-400 transition-colors hover:text-navy-600"
      >
        &larr; All documents
      </Link>
      <h1 className="mt-3 font-serif text-display text-navy-800">Upload a document</h1>
      <p className="mt-1 text-sm text-navy-400">
        Drop a file, give it a title, and link it to the right matter or client.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        <UploadDeepLink
          defaultMatterId={sp.matterId}
          defaultClientId={sp.clientId}
        />
      </div>
    </div>
  );
}
