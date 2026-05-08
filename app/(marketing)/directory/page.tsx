import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find a verified attorney or accountant — Marco Reid directory",
  description:
    "Browse verified attorneys, barristers, chartered accountants, and tax agents who use Marco Reid. Filter by specialty + jurisdiction. Every professional credential-verified before they appear here.",
};

const JURISDICTION_LABEL: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
};

export default async function DirectoryPage() {
  const pros = await prisma.professional.findMany({
    where: {
      publishedToDirectory: true,
      verifiedAt: { not: null },
    },
    include: {
      practiceAreas: {
        include: {
          practiceArea: true,
        },
      },
    },
    orderBy: [
      { acceptingNewMatters: "desc" },
      { verifiedAt: "desc" },
    ],
    take: 100,
  });

  const totalVerified = await prisma.professional.count({
    where: { verifiedAt: { not: null } },
  });

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Professional directory
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Find a verified professional.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Every attorney, barrister, chartered accountant, and tax agent
              listed below is credential-verified by Marco Reid. Filter by
              specialty and jurisdiction; engage them for a sign-off, a
              full retainer, or a one-off consultation.
            </p>
            <p className="mt-3 text-sm text-white/70">
              {totalVerified} verified professionals listed &middot; NZ + AU +
              UK + US
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {pros.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl border border-navy-100 bg-white p-10 text-center shadow-card sm:p-14">
                <p className="font-serif text-2xl text-navy-800">
                  The directory is in onboarding.
                </p>
                <p className="mt-4 leading-relaxed text-navy-500">
                  Marco Reid is in its founding-cohort phase. Verified
                  professionals are joining now and will appear here once
                  they opt in to public listing. If you&rsquo;re an attorney,
                  barrister, chartered accountant, or tax agent in NZ, AU,
                  UK, or US &mdash; this is the moment to claim your
                  founding-cohort listing.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button href="/for-attorneys" variant="gold" size="lg">
                    For attorneys &rarr;
                  </Button>
                  <Button href="/for-accountants" variant="secondary" size="lg">
                    For accountants &rarr;
                  </Button>
                </div>
                <p className="mt-8 text-xs text-navy-400">
                  Founding cohort members get named on the regulatory memo,
                  first pick of jurisdiction-lead positions, and
                  founding-cohort pricing locked for life.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pros.map((p) => {
                const profUrl = p.slug
                  ? `/directory/${p.slug}`
                  : `/directory/${p.id}`;
                return (
                  <Reveal key={p.id} delay={0.03}>
                    <Link
                      href={profUrl}
                      className="group block h-full rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-100 font-serif text-lg text-navy-700">
                          {p.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
                            {p.displayName}
                          </h3>
                          <p className="mt-0.5 text-xs text-navy-400">
                            {p.professionalBody} &middot;{" "}
                            {JURISDICTION_LABEL[p.admissionJurisdiction] ??
                              p.admissionJurisdiction}
                          </p>
                          {p.firmDisplayName && (
                            <p className="text-xs text-navy-500">
                              {p.firmDisplayName}
                            </p>
                          )}
                        </div>
                      </div>

                      {p.headline && (
                        <p className="mt-3 text-sm leading-relaxed text-navy-700">
                          {p.headline}
                        </p>
                      )}

                      {p.practiceAreas.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.practiceAreas.slice(0, 4).map((pa) => (
                            <span
                              key={pa.practiceAreaId}
                              className="rounded-md border border-navy-100 bg-navy-50/60 px-2 py-0.5 text-[10px] font-semibold text-navy-600"
                            >
                              {pa.practiceArea.name}
                            </span>
                          ))}
                          {p.practiceAreas.length > 4 && (
                            <span className="rounded-md border border-navy-100 bg-navy-50/60 px-2 py-0.5 text-[10px] font-semibold text-navy-500">
                              +{p.practiceAreas.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-2 text-[10px]">
                        {p.acceptingNewMatters ? (
                          <span className="rounded bg-forest-50 px-1.5 py-0.5 font-semibold text-forest-700">
                            Accepting new matters
                          </span>
                        ) : (
                          <span className="rounded bg-navy-50 px-1.5 py-0.5 font-semibold text-navy-500">
                            Not accepting matters
                          </span>
                        )}
                        {p.verifiedAt && (
                          <span className="rounded bg-gold-50 px-1.5 py-0.5 font-semibold text-gold-700">
                            Verified
                          </span>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              How verification works.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Anyone can claim a profile, but no one appears in the public
              directory until Marco Reid has verified the credential
              against the relevant professional body.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                Step 1 — Claim
              </p>
              <p className="mt-2 text-sm text-navy-600">
                The professional creates an account, enters their admission
                jurisdiction + admission number + professional body
                (NZLS / state law society / SRA / state bar / CA ANZ /
                CPA Australia / TPB / etc.).
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                Step 2 — Verify
              </p>
              <p className="mt-2 text-sm text-navy-600">
                Marco Reid checks the credential against the relevant
                public register. PII insurance details + good-standing
                confirmation logged in the AuditLog. verifiedAt timestamp
                stamped on the profile.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                Step 3 — Publish
              </p>
              <p className="mt-2 text-sm text-navy-600">
                The professional opts in to public listing. Headline, bio,
                specialties, languages, fees surface here. They can hide
                the listing at any time.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                Step 4 — Engage
              </p>
              <p className="mt-2 text-sm text-navy-600">
                Public users find the professional, request a sign-off or
                a full retainer. Two engagement letters: client with
                professional, professional with Marco Reid (Rule 5.4
                compliant — no fee splitting).
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
