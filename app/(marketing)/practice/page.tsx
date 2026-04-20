import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import { formatFee, jurisdictionName } from "@/lib/marketplace/format";

export const metadata: Metadata = {
  title: "Practice areas — Marco Reid",
  description:
    "Every practice area currently live on the Marco Reid marketplace across New Zealand and Australia. AI drafts the paperwork; a licensed professional signs off.",
  alternates: { canonical: `${BRAND.url}/practice` },
};

export const dynamic = "force-dynamic";

export default async function PracticeIndexPage() {
  const areas = await prisma.practiceArea.findMany({
    where: { active: true },
    orderBy: [{ jurisdiction: "asc" }, { domain: "asc" }, { priority: "desc" }, { name: "asc" }],
  });

  const byJurisdiction = areas.reduce<Record<string, typeof areas>>((acc, a) => {
    (acc[a.jurisdiction] ??= []).push(a);
    return acc;
  }, {});

  return (
    <>
      <section className="relative overflow-hidden bg-navy-500 pt-36 pb-20 sm:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
        </div>
        <Container className="relative">
          <p className="text-sm font-semibold tracking-wider text-gold-400">
            Marketplace &middot; Practice areas
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-hero text-white">
            Where we&rsquo;re live today.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-100">
            Marco Reid is soft-launching in New Zealand and Australia. New
            areas are added every fortnight. If you don&rsquo;t see your
            problem, post a general enquiry and we&rsquo;ll route it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/post-matter">Post a matter</Button>
            <Link
              href="/for-citizens"
              className="inline-flex min-h-touch items-center text-sm font-medium text-white/90 underline hover:text-white"
            >
              How it works &rarr;
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          {Object.keys(byJurisdiction).length === 0 && (
            <p className="text-center text-navy-500">
              No practice areas are currently live. Check back soon.
            </p>
          )}
          {Object.entries(byJurisdiction).map(([j, list]) => (
            <div key={j} className="mb-16 last:mb-0">
              <h2 className="font-serif text-3xl text-navy-800">
                {jurisdictionName(j)}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {list.map((a) => (
                  <Link
                    key={a.id}
                    href={`/practice/${a.slug}`}
                    className="group block rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-plum-500">
                          {a.domain === "LAW" ? "Legal" : "Accounting"}
                        </p>
                        <p className="mt-2 font-serif text-xl text-navy-800">
                          {a.name}
                        </p>
                        <p className="mt-2 text-sm text-navy-500">{a.summary}</p>
                      </div>
                      <span className="flex-shrink-0 rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
                        {formatFee(a.leadFeeInCents, a.currency)}
                      </span>
                    </div>
                    <p className="mt-5 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
                      Learn more &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
