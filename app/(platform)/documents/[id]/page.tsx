import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import DocumentIcon from "@/app/components/platform/DocumentIcon";
import DocumentActions from "@/app/components/platform/DocumentActions";
import {
  KIND_BADGE,
  KIND_LABEL,
  formatDateTime,
  formatFileSize,
} from "@/app/components/platform/documentFormat";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DocumentDetailPage({ params }: PageProps) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const document = await prisma.document.findFirst({
    where: { id, userId },
    include: { matter: true, client: true },
  });
  if (!document) notFound();

  const isImage = document.mimeType.startsWith("image/");
  const isPdf =
    document.mimeType === "application/pdf" ||
    document.fileName.toLowerCase().endsWith(".pdf");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/documents"
        className="text-sm text-navy-400 transition-colors hover:text-navy-600"
      >
        &larr; All documents
      </Link>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <DocumentIcon kind={document.kind} className="h-12 w-12" />
          <div>
            <h1 className="font-serif text-display text-navy-800">{document.title}</h1>
            <p className="mt-1 text-sm text-navy-400">
              {document.fileName} • {formatFileSize(document.fileSize)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${KIND_BADGE[document.kind]}`}
              >
                {KIND_LABEL[document.kind]}
              </span>
              <span className="text-xs text-navy-400">
                Uploaded {formatDateTime(document.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <DocumentActions
          documentId={document.id}
          fileUrl={document.fileUrl}
          fileName={document.fileName}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            <div className="border-b border-navy-100 px-5 py-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                Preview
              </h2>
            </div>
            <div className="bg-navy-50/40 p-4">
              {isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={document.fileUrl}
                  alt={document.title}
                  className="mx-auto max-h-[640px] w-full rounded-lg bg-white object-contain shadow-sm"
                />
              ) : isPdf ? (
                <iframe
                  src={document.fileUrl}
                  title={document.title}
                  className="h-[640px] w-full rounded-lg border border-navy-100 bg-white"
                />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
                  <DocumentIcon kind={document.kind} className="h-14 w-14" />
                  <p className="text-sm font-medium text-navy-700">
                    Preview not available
                  </p>
                  <p className="text-xs text-navy-400">
                    Download the file to view it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              Linked
            </h2>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-navy-400">Matter</dt>
                <dd className="mt-0.5">
                  {document.matter ? (
                    <Link
                      href={`/matters/${document.matter.id}`}
                      className="font-medium text-navy-700 underline-offset-2 hover:text-navy-900 hover:underline"
                    >
                      {document.matter.title}
                    </Link>
                  ) : (
                    <span className="text-navy-400">Not linked</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-navy-400">Client</dt>
                <dd className="mt-0.5">
                  {document.client ? (
                    <Link
                      href={`/clients`}
                      className="font-medium text-navy-700 underline-offset-2 hover:text-navy-900 hover:underline"
                    >
                      {document.client.name}
                    </Link>
                  ) : (
                    <span className="text-navy-400">Not linked</span>
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              Metadata
            </h2>
            <dl className="mt-3 space-y-3 text-sm">
              <Row label="Mime type" value={document.mimeType} mono />
              <Row label="File size" value={`${document.fileSize.toLocaleString()} bytes`} />
              <Row label="Created" value={formatDateTime(document.createdAt)} />
              <Row label="Updated" value={formatDateTime(document.updatedAt)} />
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-navy-400">{label}</dt>
      <dd
        className={`text-right text-navy-700 ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
