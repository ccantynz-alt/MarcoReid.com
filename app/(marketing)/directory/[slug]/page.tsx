import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const JURISDICTION_LABEL: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
};

async function findProfessional(slugOrId: string) {
  // Try slug first, then fall back to id (so the directory grid links work
  // even before slugs are populated).
  const bySlug = await prisma.professional.findUnique({
    where: { slug: slugOrId },
    include: {
      practiceAreas: { include: { practiceArea: true } },
    },
  });
  if (bySlug) return bySlug;
  return prisma.professional.findUnique({
    where: { id: slugOrId },
    include: {
      practiceAreas: { include: { practiceArea: true } },
    },
  });
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const pro = await findProfessional(slug);
  if (!pro) {
    return { title: "Professional not found" };
  }
  return {
    title: `${pro.displayName} — ${pro.professionalBody}, ${
      JURISDICTION_LABEL[pro.admissionJurisdiction ?? ""] ?? pro.admissionJurisdiction
    } · Marco Reid directory`,
    description:
      pro.headline ||
      `Verified ${pro.professionalBody} in ${
        JURISDICTION_LABEL[pro.admissionJurisdiction ?? ""] ??
        pro.admissionJurisdiction
      }, listed in the Marco Reid professional directory.`,
  };
}

function fmtCurrency(cents: number, currency?: string | null): string {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(cents / 100);
}

export default async function DirectoryProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const pro = await findProfessional(slug);
  if (!pro) notFound();
  if (!pro.publishedToDirectory || !pro.verifiedAt) notFound();

  const jurisdictionLabel =
    JURISDICTION_LABEL[pro.admissionJurisdiction ?? ""] ?? pro.admissionJurisdiction;

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-16 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Directory
            </p>
            <div className="mt-6 flex flex-wrap items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 font-serif text-3xl text-white">
                {pro.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-serif text-display text-white">
                  {pro.displayName}
                </h1>
                <p className="mt-2 text-sm text-white/80">
                  {pro.professionalBody} &middot; {jurisdictionLabel} &middot;{" "}
                  Admitted{" "}
                  {pro.admissionYear ?? "year on file"}
                </p>
                {pro.firmDisplayName && (
                  <p className="text-sm text-white/70">{pro.firmDisplayName}</p>
                )}
                {pro.headline && (
                  <p className="mt-4 text-lg leading-relaxed text-white/90">
                    {pro.headline}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded bg-gold-50/20 px-2 py-0.5 font-semibold text-gold-300">
                    Credential verified
                  </span>
                  {pro.acceptingNewMatters ? (
                    <span className="rounded bg-forest-50/20 px-2 py-0.5 font-semibold text-forest-300">
                      Accepting new matters
                    </span>
                  ) : (
                    <span className="rounded bg-white/10 px-2 py-0.5 font-semibold text-white/80">
                      Not currently accepting matters
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container narrow>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              {pro.bio && (
                <Reveal>
                  <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                    <h2 className="font-serif text-2xl text-navy-800">About</h2>
                    <p className="mt-4 whitespace-pre-wrap leading-relaxed text-navy-600">
                      {pro.bio}
                    </p>
                  </div>
                </Reveal>
              )}

              {pro.practiceAreas.length > 0 && (
                <Reveal delay={0.05}>
                  <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                    <h2 className="font-serif text-2xl text-navy-800">
                      Practice areas
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pro.practiceAreas.map((pa) => (
                        <span
                          key={pa.practiceAreaId}
                          className="rounded-md border border-navy-100 bg-navy-50/60 px-3 py-1 text-sm text-navy-700"
                        >
                          {pa.practiceArea.name}
                          <span className="ml-1.5 text-xs text-navy-400">
                            ({pa.practiceArea.jurisdiction})
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {pro.languages.length > 0 && (
                <Reveal delay={0.05}>
                  <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                    <h2 className="font-serif text-xl text-navy-800">
                      Languages
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pro.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded-md bg-forest-50 px-3 py-0.5 text-sm font-semibold text-forest-700"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            <aside className="space-y-4">
              <Reveal>
                <div className="rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white p-6 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                    Engage
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    Send a draft for sign-off, request a consultation, or
                    open a full retainer. Two engagement letters apply
                    (client + professional, professional + Marco Reid) so
                    the engagement is Rule 5.4 / Lawyers and Conveyancers
                    Act compliant.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button href="/generate" variant="gold" size="md">
                      Send a draft for sign-off &rarr;
                    </Button>
                    <Button href="/contact" variant="secondary" size="md">
                      Request a consultation
                    </Button>
                  </div>
                </div>
              </Reveal>

              {(pro.hourlyRateCents || pro.flatSignoffCents) && (
                <Reveal delay={0.05}>
                  <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                      Indicative fees
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-navy-700">
                      {pro.hourlyRateCents && (
                        <li className="flex items-center justify-between">
                          <span>Hourly</span>
                          <span className="font-semibold">
                            {fmtCurrency(
                              pro.hourlyRateCents,
                              pro.hourlyRateCurrency,
                            )}
                          </span>
                        </li>
                      )}
                      {pro.flatSignoffCents && (
                        <li className="flex items-center justify-between">
                          <span>Flat sign-off</span>
                          <span className="font-semibold">
                            {fmtCurrency(
                              pro.flatSignoffCents,
                              pro.flatSignoffCurrency,
                            )}
                          </span>
                        </li>
                      )}
                    </ul>
                    <p className="mt-3 text-[10px] text-navy-400">
                      Indicative only. Engagement letter sets the binding
                      fee.
                    </p>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                    Credential
                  </p>
                  <p className="mt-2 font-mono text-sm text-navy-700">
                    {pro.professionalBody}
                  </p>
                  <p className="font-mono text-xs text-navy-500">
                    Reg #{pro.admissionNumber}
                  </p>
                  <p className="font-mono text-xs text-navy-500">
                    {jurisdictionLabel}
                  </p>
                  {pro.piInsurerName && (
                    <p className="mt-3 text-[10px] text-navy-400">
                      PII: {pro.piInsurerName}
                    </p>
                  )}
                  {pro.verifiedAt && (
                    <p className="mt-1 text-[10px] text-navy-400">
                      Verified{" "}
                      {new Date(pro.verifiedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
