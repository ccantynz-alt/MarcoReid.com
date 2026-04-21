import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { formatFee, jurisdictionName } from "@/lib/marketplace/format";

export async function generateStaticParams() {
  const areas = await prisma.practiceArea.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await prisma.practiceArea.findUnique({
    where: { slug },
    select: { name: true, summary: true, jurisdiction: true, domain: true },
  });
  if (!area) return { title: "Practice area not found" };

  const domainLabel = area.domain === "LAW" ? "legal" : "accounting";

  return {
    title: `${area.name} — ${jurisdictionName(area.jurisdiction)} ${domainLabel} help, AI-drafted, professionally signed off`,
    description: area.summary,
    alternates: { canonical: `${BRAND.url}/practice/${slug}` },
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await prisma.practiceArea.findUnique({
    where: { slug },
  });
  if (!area || !area.active) notFound();

  const jurisdictionLabel = jurisdictionName(area.jurisdiction);
  const domainLabel = area.domain === "LAW" ? "Lawyer" : "Chartered Accountant";
  const isCompanyFormation = area.slug === "nz-company-formation" || area.slug === "au-company-formation";
  const ctaHref = isCompanyFormation ? "/setup-company" : "/post-matter";
  const ctaLabel = isCompanyFormation ? "Set up a company" : "Post a matter";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: area.name,
    name: `${area.name} — Marco Reid`,
    description: area.summary,
    provider: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.url,
    },
    areaServed: area.jurisdiction,
    url: `${BRAND.url}/practice/${area.slug}`,
    offers: {
      "@type": "Offer",
      price: (area.leadFeeInCents / 100).toFixed(2),
      priceCurrency: area.currency,
      description: "Flat lead fee — the professional fee is separate and is paid directly to the lawyer or accountant who takes your matter.",
    },
  };

  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="relative overflow-hidden bg-navy-500 pt-36 pb-24 sm:pt-44 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-forest-500/15 blur-[100px]" />
        </div>
        <Container className="relative">
          <p className="text-sm font-semibold tracking-wider text-gold-400">
            {jurisdictionLabel} &middot; {area.domain === "LAW" ? "Legal" : "Accounting"}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-hero text-white">
            {area.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-navy-100">{area.summary}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={ctaHref}>{ctaLabel}</Button>
            <Link
              href="/for-citizens"
              className="inline-flex min-h-touch items-center text-sm font-medium text-white/90 underline hover:text-white"
            >
              How it works &rarr;
            </Link>
          </div>
          <p className="mt-6 text-sm text-navy-200">
            Flat lead fee: <strong>{formatFee(area.leadFeeInCents, area.currency)}</strong>. The
            professional fee is separate and is paid directly to the {domainLabel.toLowerCase()} who takes your matter.
          </p>
        </Container>
      </section>

      <section className="border-b border-navy-100 bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              What happens when you post
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              AI drafts the paperwork. A qualified {domainLabel.toLowerCase()} signs it off.
            </h2>
            <div className="mt-8 rounded-2xl border border-navy-100 bg-navy-50 p-6 text-sm text-navy-700">
              <p className="whitespace-pre-wrap">{area.intakeCopy}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              Before you post
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              Read these carefully — they are part of the deal.
            </h2>
            <p className="mt-3 text-navy-500">
              When you post this matter we record that you&rsquo;ve read
              these points, along with the version, the time, and your IP
              address. It&rsquo;s how we keep everyone honest.
            </p>
            <ul className="mt-8 space-y-3">
              {area.ackBullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 rounded-xl border border-navy-100 bg-white p-5"
                >
                  <span
                    className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-navy-700">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-navy-500 py-16">
        <Container className="text-center">
          <h2 className="font-serif text-headline text-white">
            {isCompanyFormation
              ? `Design your ${jurisdictionLabel} company structure.`
              : `Post your ${area.name.toLowerCase()} matter.`}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100">
            {isCompanyFormation
              ? `Tell us about founders, markets, and how protected you want to be. Marco drafts a multi-jurisdiction structure and a verified ${domainLabel.toLowerCase()} admitted in ${jurisdictionLabel} signs it off.`
              : `Four short steps. We'll match you with a verified ${domainLabel.toLowerCase()} admitted in ${jurisdictionLabel}.`}
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
