import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import PostMatterForm from "@/app/components/citizen/PostMatterForm";

export const metadata = {
  title: "Edit draft matter — Marco Reid",
};

export const dynamic = "force-dynamic";

export default async function EditDraftMatterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return null;

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    include: { practiceArea: { select: { slug: true } } },
  });
  if (!matter || matter.citizenUserId !== userId) notFound();
  if (matter.status !== ProMatterStatus.DRAFT) notFound();

  const areas = await prisma.practiceArea.findMany({
    where: { active: true },
    orderBy: [{ priority: "desc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      domain: true,
      jurisdiction: true,
      summary: true,
      intakeCopy: true,
      leadFeeInCents: true,
      currency: true,
      ackVersion: true,
      ackBullets: true,
    },
  });

  const draft = {
    id: matter.id,
    jurisdiction: matter.jurisdiction,
    practiceAreaSlug: matter.practiceArea.slug,
    summary: matter.summary,
    details: matter.details,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-4 text-sm">
        <Link href={`/matter/${matter.id}`} className="text-navy-500 hover:text-navy-700">
          &larr; Back to matter
        </Link>
      </nav>
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Edit draft
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy-800">
          Continue your draft.
        </h1>
        <p className="mt-4 text-navy-500">
          Update your description or switch practice area. When you&rsquo;re ready, post the matter — the acknowledgment applies at post time, not now.
        </p>
      </div>

      <PostMatterForm areas={areas} draft={draft} />
    </div>
  );
}
