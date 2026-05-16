import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import SignaturesClient from "./SignaturesClient";

export const dynamic = "force-dynamic";

export default async function SignaturesPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const [signatureRequests, documents, matters] = await Promise.all([
    prisma.signatureRequest.findMany({
      where: { userId },
      include: {
        document: { select: { id: true, title: true } },
        matter: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.document.findMany({
      where: { userId },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.matter.findMany({
      where: { userId },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const serialized = signatureRequests.map((sr) => ({
    id: sr.id,
    title: sr.title,
    status: sr.status,
    signerName: sr.signerName,
    signerEmail: sr.signerEmail,
    message: sr.message,
    document: sr.document,
    matter: sr.matter,
    sentAt: sr.sentAt?.toISOString() ?? null,
    viewedAt: sr.viewedAt?.toISOString() ?? null,
    signedAt: sr.signedAt?.toISOString() ?? null,
    declinedAt: sr.declinedAt?.toISOString() ?? null,
    expiresAt: sr.expiresAt?.toISOString() ?? null,
    createdAt: sr.createdAt.toISOString(),
  }));

  const documentOptions = documents.map((d) => ({ id: d.id, title: d.title }));
  const matterOptions = matters.map((m) => ({ id: m.id, title: m.title }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">E-Signatures</h1>
          <p className="mt-2 text-navy-400">
            Track and manage signature requests for your documents.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600"
        >
          &larr; Dashboard
        </Link>
      </div>

      <div className="mt-8">
        <SignaturesClient
          signatureRequests={serialized}
          documents={documentOptions}
          matters={matterOptions}
        />
      </div>
    </div>
  );
}
