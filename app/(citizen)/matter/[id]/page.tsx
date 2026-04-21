import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus, SignoffStatus } from "@prisma/client";
import CancelMatterButton from "@/app/components/citizen/CancelMatterButton";
import FormationPackActions from "@/app/components/citizen/FormationPackActions";
import { MATTER_STATUS_PRESENTATION } from "@/lib/marketplace/matter-status";

export const metadata = { title: "Matter — Marco Reid" };

export const dynamic = "force-dynamic";

export default async function CitizenMatterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return null;

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    include: {
      practiceArea: { select: { name: true, jurisdiction: true } },
      acceptedBy: { select: { displayName: true, professionalBody: true, admissionJurisdiction: true, admissionNumber: true } },
      companyFormation: { select: { proposedName: true, homeJurisdiction: true } },
      signoffRequests: {
        where: { status: { in: [SignoffStatus.APPROVED, SignoffStatus.AMENDED] } },
        orderBy: { releasedAt: "desc" },
      },
    },
  });

  if (!matter || matter.citizenUserId !== userId) {
    notFound();
  }

  const status = MATTER_STATUS_PRESENTATION[matter.status];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-4 text-sm">
        <Link href="/my-matters" className="text-navy-500 hover:text-navy-700">
          &larr; All matters
        </Link>
      </nav>

      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-plum-500">
              {matter.practiceArea.name} &middot; {matter.practiceArea.jurisdiction}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-navy-800">{matter.summary}</h1>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}
          >
            {status.label}
          </span>
        </div>
        <p className="mt-3 text-sm text-navy-500">{status.citizenMessage}</p>

        {matter.acceptedBy && (
          <div className="mt-5 rounded-lg border border-navy-100 bg-navy-50 p-4">
            <p className="text-xs uppercase tracking-wider text-navy-400">
              Your professional
            </p>
            <p className="mt-2 font-serif text-navy-800">
              {matter.acceptedBy.displayName}
            </p>
            <p className="text-xs text-navy-500">
              {matter.acceptedBy.professionalBody} · Admission #{matter.acceptedBy.admissionNumber} ·{" "}
              {matter.acceptedBy.admissionJurisdiction}
            </p>
          </div>
        )}
      </div>

      <section className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <h2 className="font-serif text-xl text-navy-800">Your description</h2>
        <p className="mt-4 whitespace-pre-wrap rounded-lg bg-navy-50 p-4 text-sm text-navy-700">
          {matter.details}
        </p>
      </section>

      {(matter.status === ProMatterStatus.DRAFT ||
        matter.status === ProMatterStatus.AWAITING_PRO) && (
        <section className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          {matter.status === ProMatterStatus.DRAFT && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-navy-50 p-4">
              <div>
                <p className="text-sm font-semibold text-navy-700">
                  This matter is still a draft.
                </p>
                <p className="mt-1 text-xs text-navy-500">
                  Nothing has been posted to the marketplace yet. Resume editing and post when you&rsquo;re ready.
                </p>
              </div>
              <Link
                href={`/post-matter/${matter.id}`}
                className="inline-flex items-center rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600"
              >
                Continue editing &rarr;
              </Link>
            </div>
          )}
          <CancelMatterButton matterId={matter.id} />
        </section>
      )}

      {matter.signoffRequests.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-2xl text-navy-800">Signed-off output</h2>
          <p className="mt-2 text-sm text-navy-500">
            The following has been reviewed and released by your
            professional. The hash below is a tamper-evidence fingerprint —
            you can verify the document has not been altered since release.
          </p>

          <ul className="mt-5 space-y-5">
            {matter.signoffRequests.map((s) => {
              const isAmended = s.status === SignoffStatus.AMENDED;
              const content = isAmended ? s.amendedOutput ?? s.aiOutput : s.aiOutput;
              const hash = isAmended ? s.amendedSha256 ?? s.outputSha256 : s.outputSha256;
              const isFormationPack = s.kind === "company-formation-pack";
              const title = isFormationPack ? "Formation pack" : s.kind;
              const filename = isFormationPack
                ? `formation-pack-${(matter.companyFormation?.proposedName ?? "company").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`
                : `${s.kind}.md`;
              return (
                <li
                  key={s.id}
                  className="rounded-2xl border border-gold-200 bg-white p-6 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-navy-700">{title}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isAmended ? "bg-plum-100 text-plum-800" : "bg-forest-100 text-forest-800"
                      }`}
                    >
                      {isAmended ? "Amended & released" : "Approved & released"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-navy-400">
                    Released {s.releasedAt ? new Date(s.releasedAt).toLocaleString() : ""}
                  </p>

                  {isFormationPack && (
                    <FormationPackActions
                      filename={filename}
                      pack={content}
                      sha256={hash}
                      proposedName={matter.companyFormation?.proposedName}
                      jurisdiction={matter.companyFormation?.homeJurisdiction ?? matter.practiceArea.jurisdiction}
                      professionalName={matter.acceptedBy?.displayName}
                    />
                  )}

                  <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-navy-100 bg-navy-50 p-5 font-mono text-sm text-navy-800">
                    {content}
                  </pre>

                  {s.reviewerNotes && (
                    <div className="mt-3 rounded-lg border border-navy-100 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                        Notes from your professional
                      </p>
                      <p className="mt-2 text-sm text-navy-700">{s.reviewerNotes}</p>
                    </div>
                  )}

                  <p className="mt-4 text-[11px] text-navy-400">
                    sha256 <code className="font-mono">{hash}</code>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
