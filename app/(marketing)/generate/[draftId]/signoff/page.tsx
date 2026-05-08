import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import { prisma } from "@/lib/prisma";
import SignoffRequestForm from "@/app/components/marketing/SignoffRequestForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Send draft for professional sign-off",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ draftId: string }>;
}

const JURISDICTION_LABELS: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
};

export default async function SignoffRequestPage({ params }: PageProps) {
  const { draftId } = await params;

  const draft = await prisma.documentDraft.findUnique({
    where: { id: draftId },
    include: {
      signoffRequests: {
        orderBy: { requestedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!draft) notFound();

  // Already signed → bounce back to the draft view.
  if (draft.status === "SIGNED") {
    redirect(`/generate/${draftId}`);
  }

  const existingSignoff = draft.signoffRequests[0];
  const jurisdictionLabel =
    JURISDICTION_LABELS[draft.jurisdiction] ?? draft.jurisdiction;

  const extracted = draft.extracted as
    | { docTypeLabel?: string }
    | null;
  const docTypeLabel = extracted?.docTypeLabel ?? "Document";

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-16 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Sign-off request
            </p>
            <h1 className="mt-6 font-serif text-display text-white">
              Send your draft to a professional in {jurisdictionLabel}.
            </h1>
            <p className="mt-4 text-lg text-white/85">
              {docTypeLabel} &middot; Draft ref {draft.id.slice(0, 8)}
            </p>
            <p className="mt-6 text-sm text-white/70">
              The professional reviews the draft, requests amendments if
              needed, and signs it. Their bar number, CA designation, or
              registration number is stamped on every page of the released
              document.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container narrow>
          {existingSignoff && existingSignoff.status === "PENDING" && (
            <Reveal>
              <div className="mb-10 rounded-2xl border border-gold-300 bg-gold-50 p-6 text-sm text-navy-700">
                <p className="font-semibold text-navy-800">
                  A sign-off is already in progress for this draft.
                </p>
                <p className="mt-2">
                  Requested at{" "}
                  {new Date(existingSignoff.requestedAt).toLocaleString()}.
                  You&rsquo;ll see the signed document on the draft page once
                  the professional approves it.
                </p>
                <p className="mt-3 text-xs text-navy-500">
                  You can still send another sign-off request below if you
                  need to update the notes.
                </p>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-serif text-2xl text-navy-800">
                A few details for the reviewer.
              </h2>
              <p className="mt-2 text-sm text-navy-500">
                Anything they should know? A deadline, a counterparty, a
                specific clause you&rsquo;re unsure about. Leaving it blank is
                fine &mdash; the professional will read the draft and reach
                out if they need more.
              </p>

              <div className="mt-6">
                <SignoffRequestForm
                  draftId={draft.id}
                  defaultEmail={draft.contactEmail ?? ""}
                  jurisdictionLabel={jurisdictionLabel}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                  What happens next
                </p>
                <p className="mt-3 text-sm text-navy-600">
                  Your draft + your notes go to a verified professional in{" "}
                  {jurisdictionLabel}. They review within 1&ndash;3 business
                  days.
                </p>
              </div>
              <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                  If they amend
                </p>
                <p className="mt-3 text-sm text-navy-600">
                  Sometimes a clause needs to change. They&rsquo;ll send back
                  a marked-up version with their reasons. You approve the
                  changes; they sign.
                </p>
              </div>
              <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                  When signed
                </p>
                <p className="mt-3 text-sm text-navy-600">
                  Watermark removed. Cover page carries their name,
                  credential, registration, jurisdiction, and date. The
                  draft becomes a document.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
