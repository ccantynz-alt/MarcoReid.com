import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ draftId: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { draftId } = await params;
  return {
    title: `Draft ${draftId.slice(0, 8)} — pending professional sign-off`,
    description:
      "Your AI-drafted document is ready to review. Marco Reid is a tooling vendor; this draft is not legally binding until a verified professional in your jurisdiction reviews and signs it.",
    robots: { index: false, follow: false },
  };
}

const JURISDICTION_LABELS: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
};

function jurisdictionPriceCents(jurisdiction: string): {
  amount: number;
  currency: string;
  formatted: string;
} {
  // Indicative sign-off pricing per jurisdiction. Real pricing wired in
  // Wave 2 once the marketplace routing layer is live.
  const map: Record<string, { amount: number; currency: string }> = {
    NZ: { amount: 19900, currency: "NZD" },
    AU: { amount: 19900, currency: "AUD" },
    UK: { amount: 14900, currency: "GBP" },
    US: { amount: 19900, currency: "USD" },
  };
  const m = map[jurisdiction] ?? map.NZ;
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: m.currency,
    minimumFractionDigits: 0,
  });
  return {
    amount: m.amount,
    currency: m.currency,
    formatted: formatter.format(m.amount / 100),
  };
}

export default async function DraftViewPage({ params }: PageProps) {
  const { draftId } = await params;

  const draft = await prisma.documentDraft.findUnique({
    where: { id: draftId },
  });

  if (!draft) notFound();

  const jurisdictionLabel =
    JURISDICTION_LABELS[draft.jurisdiction ?? ""] ?? draft.jurisdiction;
  const price = jurisdictionPriceCents(draft.jurisdiction ?? "NZ");
  const extracted = draft.extracted as
    | {
        docTypeLabel?: string;
        confidence?: "HIGH" | "MEDIUM" | "LOW";
      }
    | null;
  const docTypeLabel = extracted?.docTypeLabel ?? "Document";
  const isSigned = draft.status === "SIGNED";

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-16 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              {isSigned ? "Signed document" : "Draft document"}
            </p>
            <h1 className="mt-4 font-serif text-display text-white">
              {docTypeLabel}
            </h1>
            <p className="mt-3 text-sm text-white/70">
              Draft reference: {draft.id} &middot; Jurisdiction:{" "}
              {jurisdictionLabel}
            </p>
            {!isSigned && (
              <div className="mt-8 rounded-2xl border border-gold-300/40 bg-white/10 p-5 text-sm leading-relaxed text-white/90 backdrop-blur-sm">
                <p className="font-semibold text-gold-300">
                  This draft is not legally binding.
                </p>
                <p className="mt-2">
                  Every page is watermarked &ldquo;DRAFT &mdash; Not legal/tax
                  advice. Pending professional review.&rdquo; until a verified
                  attorney or accountant in {jurisdictionLabel} reviews and
                  signs it. Marco Reid is a tooling vendor; the named
                  professional carries the regulatory authority.
                </p>
              </div>
            )}
            {isSigned && draft.signedByUserId && (
              <div className="mt-8 rounded-2xl border border-forest-300/40 bg-white/10 p-5 text-sm leading-relaxed text-white/90 backdrop-blur-sm">
                <p className="font-semibold text-forest-300">
                  Signed and released.
                </p>
                <p className="mt-2">
                  Reviewed and signed by {draft.signedByCredential ?? "a verified professional"}{" "}
                  in {draft.signedByJurisdiction ?? jurisdictionLabel}
                  {draft.signedAt
                    ? ` on ${new Date(draft.signedAt).toLocaleDateString()}.`
                    : "."}
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container narrow>
          <Reveal>
            {/* Watermarked document body */}
            <div
              className={`relative overflow-hidden rounded-2xl border bg-white p-8 shadow-card sm:p-12 ${
                isSigned ? "border-forest-200" : "border-navy-200"
              }`}
            >
              {!isSigned && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <span className="rotate-[-30deg] select-none font-serif text-7xl font-bold uppercase tracking-widest text-navy-100/80 sm:text-8xl">
                    Draft
                  </span>
                </div>
              )}

              <div className="relative">
                <pre className="whitespace-pre-wrap break-words font-serif text-sm leading-relaxed text-navy-800 sm:text-base">
                  {draft.body}
                </pre>
              </div>
            </div>
          </Reveal>

          {!isSigned && (
            <Reveal delay={0.1}>
              <div className="mt-12 rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white p-8 shadow-card sm:p-10">
                <h2 className="font-serif text-2xl text-navy-800">
                  Get this signed by a verified professional in{" "}
                  {jurisdictionLabel}.
                </h2>
                <p className="mt-3 text-navy-500">
                  We route your draft to a verified attorney
                  {draft.jurisdiction === "NZ" || draft.jurisdiction === "AU"
                    ? " or chartered accountant"
                    : ""}{" "}
                  practising in {jurisdictionLabel}. They review the draft,
                  request amendments if needed, and sign it. You get a
                  PDF with their name, credential, and bar/registration
                  number on every page, plus an entry in our hash-chained
                  audit ledger.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <p className="font-serif text-3xl text-navy-800">
                    {price.formatted}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-navy-400">
                    Indicative sign-off fee &middot; {price.currency}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`/generate/${draftId}/signoff`} variant="gold" size="lg">
                    Send to professional &rarr;
                  </Button>
                  <Button
                    href="/generate"
                    variant="secondary"
                    size="lg"
                  >
                    Start a new draft
                  </Button>
                </div>
                <p className="mt-6 text-xs text-navy-400">
                  Two engagements: you with Marco Reid for tooling, you with
                  the professional for the legal/tax service. No fee-splitting,
                  no joint engagement &mdash; the model that survives every
                  bar&rsquo;s conduct review (Rule 5.4 / Lawyers and
                  Conveyancers Act).
                </p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <p className="mt-12 text-center text-xs text-navy-400">
              Draft created {new Date(draft.createdAt).toLocaleString()}.
              {draft.expiresAt
                ? ` Expires ${new Date(draft.expiresAt).toLocaleDateString()} unless claimed by an account.`
                : ""}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
