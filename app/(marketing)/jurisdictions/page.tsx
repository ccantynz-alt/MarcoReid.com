import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Jurisdictions — Built for Five Countries | Marco Reid",
  description:
    "Marco Reid is a multi-jurisdictional platform built from the ground up for New Zealand, Australia, the United Kingdom, the United States, and Canada. Country-specific tax, legal, and compliance features for every jurisdiction.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid Jurisdictions",
  description:
    "Country-specific features for New Zealand, Australia, the United Kingdom, the United States, and Canada.",
  url: `${BRAND.url}/jurisdictions`,
};

/* ------------------------------------------------------------------ */
/*  Jurisdiction data                                                  */
/* ------------------------------------------------------------------ */

const JURISDICTIONS = [
  {
    code: "NZ",
    flag: "🇳🇿",
    name: "New Zealand",
    currency: "NZD",
    taxAuthority: "Inland Revenue (IR)",
    taxFormsSupported: 42,
    legalResearch: "New Zealand Legislation",
    trustAccounting: "Lawyers and Conveyancers Act trust accounting rules",
    professionalBodies: [
      "New Zealand Law Society",
      "Chartered Accountants Australia and New Zealand (CA ANZ)",
    ],
    eFilingStatus: "Live" as const,
  },
  {
    code: "AU",
    flag: "🇦🇺",
    name: "Australia",
    currency: "AUD",
    taxAuthority: "Australian Taxation Office (ATO)",
    taxFormsSupported: 58,
    legalResearch: "Federal Register of Legislation",
    trustAccounting: "State-level trust account regulations",
    professionalBodies: [
      "Law Council of Australia",
      "CPA Australia",
      "Chartered Accountants Australia and New Zealand (CA ANZ)",
    ],
    eFilingStatus: "Live" as const,
  },
  {
    code: "UK",
    flag: "🇬🇧",
    name: "United Kingdom",
    currency: "GBP",
    taxAuthority: "HM Revenue & Customs (HMRC)",
    taxFormsSupported: 51,
    legalResearch: "The National Archives (legislation.gov.uk)",
    trustAccounting: "SRA Accounts Rules",
    professionalBodies: [
      "Solicitors Regulation Authority (SRA)",
      "Institute of Chartered Accountants in England and Wales (ICAEW)",
    ],
    eFilingStatus: "Live" as const,
  },
  {
    code: "US",
    flag: "🇺🇸",
    name: "United States",
    currency: "USD",
    taxAuthority: "Internal Revenue Service (IRS)",
    taxFormsSupported: 94,
    legalResearch: "Coming soon",
    trustAccounting: "IOLTA / state bar trust accounting rules",
    professionalBodies: [
      "American Bar Association (ABA)",
      "American Institute of CPAs (AICPA)",
    ],
    eFilingStatus: "Live" as const,
  },
  {
    code: "CA",
    flag: "🇨🇦",
    name: "Canada",
    currency: "CAD",
    taxAuthority: "Canada Revenue Agency (CRA)",
    taxFormsSupported: 47,
    legalResearch: "Coming soon",
    trustAccounting: "Law society trust accounting rules (by province)",
    professionalBodies: [
      "Federation of Law Societies of Canada",
      "Chartered Professional Accountants of Canada (CPA Canada)",
    ],
    eFilingStatus: "In progress" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Feature comparison matrix                                          */
/* ------------------------------------------------------------------ */

type FeatureStatus = "built" | "in-progress" | "not-built";

interface FeatureRow {
  feature: string;
  nz: FeatureStatus;
  au: FeatureStatus;
  uk: FeatureStatus;
  us: FeatureStatus;
  ca: FeatureStatus;
}

const FEATURES: FeatureRow[] = [
  { feature: "Tax e-filing",               nz: "built",       au: "built",       uk: "built",       us: "built",       ca: "in-progress" },
  { feature: "Legal research database",    nz: "built",       au: "built",       uk: "built",       us: "in-progress", ca: "in-progress" },
  { feature: "Court e-filing",             nz: "in-progress", au: "in-progress", uk: "not-built",   us: "in-progress", ca: "not-built"   },
  { feature: "Trust accounting",           nz: "built",       au: "built",       uk: "built",       us: "built",       ca: "built"       },
  { feature: "Payroll",                    nz: "built",       au: "built",       uk: "built",       us: "built",       ca: "built"       },
  { feature: "Retirement / pension",       nz: "built",       au: "built",       uk: "built",       us: "built",       ca: "in-progress" },
  { feature: "Immigration",               nz: "in-progress", au: "in-progress", uk: "in-progress", us: "in-progress", ca: "not-built"   },
  { feature: "Professional body compliance", nz: "built",     au: "built",       uk: "built",       us: "built",       ca: "in-progress" },
  { feature: "Privacy law compliance",     nz: "built",       au: "built",       uk: "built",       us: "built",       ca: "built"       },
  { feature: "Accounting standards",       nz: "built",       au: "built",       uk: "built",       us: "built",       ca: "built"       },
];

const COUNTRY_KEYS: (keyof Omit<FeatureRow, "feature">)[] = ["nz", "au", "uk", "us", "ca"];
const COUNTRY_LABELS: Record<string, string> = { nz: "NZ", au: "AU", uk: "UK", us: "US", ca: "CA" };

function StatusCell({ status }: { status: FeatureStatus }) {
  if (status === "built") {
    return (
      <span className="inline-flex items-center gap-1 text-forest-600 font-semibold">
        <span aria-hidden="true">✓</span>
        <span className="sr-only">Built</span>
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1 text-gold-600 font-medium text-xs">
        In progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-navy-300 font-medium">
      <span aria-hidden="true">&mdash;</span>
      <span className="sr-only">Not yet built</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function JurisdictionsPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Jurisdictions
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Built for five jurisdictions.
            <br />
            Not one.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
            Marco Reid is not a US product with international aspirations. It is
            a multi-jurisdictional platform built from the ground up for New
            Zealand, Australia, the United Kingdom, the United States, and
            Canada.
          </p>
        </Container>
      </section>

      {/* Country cards */}
      <section className="py-24 sm:py-36" aria-label="Country details">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Five countries. Native support.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Every jurisdiction gets first-class treatment &mdash; not a
              bolt-on localisation layer.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JURISDICTIONS.map((j) => (
              <Reveal key={j.code} delay={0.05}>
                <div className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {j.flag}
                    </span>
                    <div>
                      <h3 className="font-semibold text-navy-700">{j.name}</h3>
                      <p className="text-xs text-navy-400">{j.currency}</p>
                    </div>
                    <span
                      className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        j.eFilingStatus === "Live"
                          ? "bg-forest-50 text-forest-600"
                          : "bg-gold-50 text-gold-700"
                      }`}
                    >
                      E-filing: {j.eFilingStatus}
                    </span>
                  </div>

                  {/* Details */}
                  <dl className="mt-5 flex-1 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-navy-600">
                        Tax authority
                      </dt>
                      <dd className="text-navy-400">{j.taxAuthority}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-navy-600">
                        Tax forms supported
                      </dt>
                      <dd className="text-navy-400">{j.taxFormsSupported}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-navy-600">
                        Legal research source
                      </dt>
                      <dd
                        className={
                          j.legalResearch === "Coming soon"
                            ? "italic text-navy-300"
                            : "text-navy-400"
                        }
                      >
                        {j.legalResearch}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-navy-600">
                        Trust accounting standard
                      </dt>
                      <dd className="text-navy-400">{j.trustAccounting}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-navy-600">
                        Professional bodies
                      </dt>
                      <dd className="text-navy-400">
                        {j.professionalBodies.join(", ")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Feature comparison table */}
      <section className="py-24 sm:py-36" aria-label="Feature comparison">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Feature comparison.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Where each jurisdiction stands today.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Feature
                    </th>
                    {COUNTRY_KEYS.map((key) => (
                      <th
                        key={key}
                        className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-navy-400"
                      >
                        {COUNTRY_LABELS[key]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-navy-50"
                    >
                      <td className="px-6 py-4 font-medium text-navy-700">
                        {row.feature}
                      </td>
                      {COUNTRY_KEYS.map((key) => (
                        <td key={key} className="px-6 py-4 text-center">
                          <StatusCell status={row[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-6 text-xs text-navy-400">
            <span className="flex items-center gap-1.5">
              <span className="text-forest-600 font-semibold">✓</span> Built
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold-600 font-medium">In progress</span>{" "}
              Partially built
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-navy-300 font-medium">&mdash;</span> Not yet
              built
            </span>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Your jurisdiction. Your rules. One platform.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              See how Marco Reid works for your country.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/contact" size="lg">
                Book a demo
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                View pricing
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
