import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { JURISDICTIONS } from "@/lib/jurisdictions";
import { getServicesByCountry, SERVICE_CATEGORIES } from "@/lib/services";
import { BRAND } from "@/lib/constants";

// NZ Privacy Amendment Act — IPP 3A (effective 1 May 2026)
// Discloses AI processing pipeline to NZ users as required.
// This banner is shown ONLY on the /nz country page.
function NzIpp3ABanner() {
  return (
    <section className="border-b border-amber-200 bg-amber-50 py-5">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
          <span className="shrink-0 text-amber-600" aria-hidden="true">🔒</span>
          <p className="text-sm leading-relaxed text-amber-900">
            <strong>AI processing disclosure — NZ Privacy Amendment Act IPP 3A (effective 1 May 2026):</strong>{" "}
            When you use Marco research tools on this platform, your query text is transmitted to
            Anthropic (Claude API) for AI processing. Anthropic operates servers in the United States.
            All data transfers are protected by a contractual Data Processing Agreement. Your data is
            never used to train AI models. This disclosure is provided as required under Information
            Privacy Principle 3A of the New Zealand Privacy Amendment Act 2025.{" "}
            <Link href="/privacy#ipp3a" className="font-semibold underline hover:text-amber-700">
              Read our full privacy policy →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

const VALID_COUNTRIES = ["nz", "au", "uk", "us", "ca", "ie", "sg"] as const;
type CountrySlug = (typeof VALID_COUNTRIES)[number];

const COUNTRY_MAP: Record<CountrySlug, string> = {
  nz: "NZ",
  au: "AU",
  uk: "UK",
  us: "US",
  ca: "CA",
  ie: "IE",
  sg: "SG",
};

function isValidCountry(slug: string): slug is CountrySlug {
  return VALID_COUNTRIES.includes(slug as CountrySlug);
}

const CATEGORY_ICONS: Record<string, string> = {
  personal: "\u{1F464}",
  property: "\u{1F3E0}",
  business: "\u{1F4BC}",
  immigration: "\u{1F30D}",
  tax: "\u{1F4CA}",
  accounting: "\u{1F4C8}",
  legal: "⚖️",
  court: "\u{1F3DB}️",
};

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return VALID_COUNTRIES.map((country) => ({ country }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  if (!isValidCountry(country)) {
    return { title: "Country not found" };
  }
  const code = COUNTRY_MAP[country];
  const jurisdiction = JURISDICTIONS[code];
  return {
    title: `Legal & Accounting Services in ${jurisdiction.name} ${jurisdiction.flag} — ${BRAND.name}`,
    description: `Explore ${BRAND.name}'s full range of legal, accounting, tax, immigration, and business services available in ${jurisdiction.name}. Professional and self-serve options.`,
  };
}

export default async function CountryHomePage({ params }: PageProps) {
  const { country } = await params;
  if (!isValidCountry(country)) notFound();

  const code = COUNTRY_MAP[country];
  const jurisdiction = JURISDICTIONS[code];
  const services = getServicesByCountry(code);
  const publicServices = services.filter((s) => s.publicAccess);
  const professionalServices = services.filter((s) => s.professionalRequired);
  const totalForms = services.reduce((sum, s) => sum + (s.forms?.length ?? 0), 0);

  const categoryCounts = SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    count: services.filter((s) => s.category === cat.slug).length,
  })).filter((cat) => cat.count > 0);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND.name, item: BRAND.url },
      {
        "@type": "ListItem",
        position: 2,
        name: jurisdiction.name,
        item: `${BRAND.url}/${country}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Legal & Accounting Services in ${jurisdiction.name}`,
    description: `${services.length} professional services available in ${jurisdiction.name} through ${BRAND.name}.`,
    provider: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.url,
    },
  };

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={serviceSchema} />

      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-gold-500/10 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[420px] w-[420px] rounded-full bg-forest-500/8 blur-[120px]" />
        </div>

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-6xl">{jurisdiction.flag}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              {BRAND.name} &mdash; {jurisdiction.name}
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Legal and accounting services in {jurisdiction.name}.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-100">
              {services.length} services across {categoryCounts.length} categories.
              Self-serve what you can. Get a verified professional for everything else.
              All compliant with {jurisdiction.name} law and professional standards.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={`/${country}/services`} size="lg" variant="gold">
                Browse all services
              </Button>
              <Button href="/directory" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                Find a professional &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* NZ IPP 3A disclosure — rendered only for /nz */}
      {country === "nz" && <NzIpp3ABanner />}

      {/* ============================================================ */}
      {/* QUICK STATS                                                   */}
      {/* ============================================================ */}
      <section className="border-b border-navy-100 bg-white py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Reveal delay={0.05}>
              <div className="text-center">
                <p className="font-serif text-3xl text-navy-800 sm:text-4xl">{services.length}</p>
                <p className="mt-1 text-xs font-medium text-navy-400">services available</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-center">
                <p className="font-serif text-3xl text-forest-600 sm:text-4xl">{totalForms}</p>
                <p className="mt-1 text-xs font-medium text-navy-400">forms &amp; documents</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="text-center">
                <p className="font-serif text-3xl text-navy-800 sm:text-4xl">{publicServices.length}</p>
                <p className="mt-1 text-xs font-medium text-navy-400">self-serve services</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center">
                <p className="font-serif text-3xl text-forest-600 sm:text-4xl">{professionalServices.length}</p>
                <p className="mt-1 text-xs font-medium text-navy-400">professional services</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SERVICE CATEGORIES — clickable cards                          */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Service categories
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              What do you need help with?
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              Every service below is available in {jurisdiction.name}, priced in{" "}
              {jurisdiction.currency.code} ({jurisdiction.currency.symbol}), and delivered
              by professionals registered with the relevant {jurisdiction.name} authority.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCounts.map((cat) => (
              <Reveal key={cat.slug} delay={0.05}>
                <Link
                  href={`/${country}/services?category=${cat.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-gold-300"
                >
                  <div>
                    <span className="text-2xl">{CATEGORY_ICONS[cat.slug] ?? "•"}</span>
                    <h3 className="mt-3 font-serif text-lg text-navy-800 group-hover:text-navy-900">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-400">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-navy-400 group-hover:text-gold-600">
                      {cat.count} {cat.count === 1 ? "service" : "services"} &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* JURISDICTION DETAILS                                          */}
      {/* ============================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              {jurisdiction.name} at a glance.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Legal system</p>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">{jurisdiction.legalSystem}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Tax authority</p>
                <p className="mt-3 text-sm font-semibold text-navy-700">
                  {jurisdiction.taxAuthority.name} ({jurisdiction.taxAuthority.abbreviation})
                </p>
                <p className="mt-1 text-xs text-navy-400">{jurisdiction.taxAuthority.url}</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Currency</p>
                <p className="mt-3 text-sm font-semibold text-navy-700">
                  {jurisdiction.currency.code} ({jurisdiction.currency.symbol})
                </p>
                <p className="mt-1 text-xs text-navy-400">All services priced in local currency</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Privacy law</p>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">{jurisdiction.privacyLaw}</p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Professional bodies</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {jurisdiction.professionalBodies.map((body) => (
                    <span
                      key={body.abbreviation}
                      className="rounded-md border border-navy-100 bg-navy-50/60 px-2.5 py-1 text-xs font-medium text-navy-700"
                    >
                      {body.abbreviation}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting standards</p>
                <div className="mt-3 space-y-1">
                  {jurisdiction.accountingStandards.map((std) => (
                    <p key={std} className="text-xs text-navy-600">{std}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* CTAs                                                          */}
      {/* ============================================================ */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  For the public
                </p>
                <h3 className="mt-4 font-serif text-2xl text-white">
                  Need a legal or accounting service?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Browse {publicServices.length} self-serve services or connect with a
                  verified professional in {jurisdiction.name}. Draft documents, file returns,
                  register companies, and more.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`/${country}/services`} variant="gold" size="md">
                    Browse services
                  </Button>
                  <Button href="/directory" variant="ghost" className="text-white hover:text-gold-300">
                    Find a professional &rarr;
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-500/10 to-transparent p-8 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  For professionals
                </p>
                <h3 className="mt-4 font-serif text-2xl text-white">
                  Join the Marco Reid network.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  List your practice in the {jurisdiction.name} directory. Receive
                  sign-off requests from AI-drafted documents. Grow your client base
                  without marketing spend.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact" variant="secondary" size="md">
                    Join Marco Reid
                  </Button>
                  <Button href="/for-attorneys" variant="ghost" className="text-white hover:text-gold-300">
                    Learn more &rarr;
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* COMPLIANCE NOTE                                               */}
      {/* ============================================================ */}
      <section className="py-12">
        <Container narrow>
          <p className="text-center text-xs text-navy-400">
            Marco Reid is a tooling vendor, not a law firm or accounting practice.
            All professional services in {jurisdiction.name} are delivered by
            independently licensed professionals registered with the relevant
            {jurisdiction.name === "Singapore" ? " Singaporean" : ` ${jurisdiction.name}`} regulatory body.
            Consumer-facing outputs are reviewed and approved by a credentialled
            professional before release.
          </p>
        </Container>
      </section>
    </>
  );
}
