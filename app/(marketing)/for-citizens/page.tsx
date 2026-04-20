import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { PLATFORM_ACK_BULLETS } from "@/lib/consent";

export const metadata: Metadata = {
  title: "For Citizens — Describe your problem. A qualified professional takes it.",
  description:
    "Tenancy disputes, years of unfiled tax, and more. Marco Reid drafts the paperwork with AI. A licensed lawyer or accountant reviews and signs off before anything is filed or sent. Flat lead fee. No surprises.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Professional services marketplace",
  name: "Marco Reid for Citizens",
  description:
    "AI-drafted legal and accounting work, reviewed and signed off by a licensed professional before release.",
  provider: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
  },
  url: `${BRAND.url}/for-citizens`,
  areaServed: ["NZ", "AU"],
};

const beachheadAreas = [
  {
    slug: "nz-tenancy-dispute",
    flag: "\uD83C\uDDF3\uD83C\uDDFF",
    name: "Tenancy dispute",
    jurisdiction: "New Zealand",
    summary:
      "Bond, rent arrears, repairs, 14-day notices, Tenancy Tribunal applications.",
    fee: "NZD $49 lead fee",
  },
  {
    slug: "nz-sme-catch-up",
    flag: "\uD83C\uDDF3\uD83C\uDDFF",
    name: "SME tax catch-up",
    jurisdiction: "New Zealand",
    summary:
      "Years of unfiled GST, income tax, and provisional tax reconstructed and filed with IR.",
    fee: "NZD $149 lead fee",
  },
  {
    slug: "au-tenancy-dispute",
    flag: "\uD83C\uDDE6\uD83C\uDDFA",
    name: "Residential tenancy dispute",
    jurisdiction: "Australia",
    summary:
      "NCAT, VCAT, QCAT and state equivalents — bond, rent arrears, repairs, termination.",
    fee: "AUD $49 lead fee",
  },
  {
    slug: "au-sme-catch-up",
    flag: "\uD83C\uDDE6\uD83C\uDDFA",
    name: "SME tax catch-up",
    jurisdiction: "Australia",
    summary:
      "Years of unfiled BAS, income tax, and PAYG reconstructed and lodged with the ATO.",
    fee: "AUD $149 lead fee",
  },
];

const steps = [
  {
    n: "01",
    title: "Describe your problem in plain English.",
    body: "No legal jargon required. Tell Marco what's happened in your own words. You can type it or dictate it.",
  },
  {
    n: "02",
    title: "Marco drafts the paperwork.",
    body: "Applications, letters, returns, responses — drafted in minutes using the actual rules and forms for your jurisdiction. Nothing is filed yet.",
  },
  {
    n: "03",
    title: "A licensed professional reviews and signs off.",
    body: "Every matter is reviewed by a qualified lawyer or chartered accountant admitted in your jurisdiction. They can approve, amend, or reject. Nothing reaches a court, tribunal, or tax authority without their sign-off.",
  },
  {
    n: "04",
    title: "You see everything before it is sent.",
    body: "The signed-off version is delivered to you. You approve it, we file it or send it. Real-time status. Fixed, disclosed fees.",
  },
];

export default function ForCitizensPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-52">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-forest-500/15 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="text-sm font-semibold tracking-wider text-gold-400">
            For citizens &middot; NZ &amp; AU
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            You describe the problem.
            <br />
            <span className="text-gold-300">
              A qualified professional takes it on.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-100">
            Tenancy disputes. Years of unfiled tax. Divorce. Wills. Catch-up
            filings. Marco drafts the paperwork with AI; a licensed lawyer or
            chartered accountant reviews and signs off before anything is
            filed or sent on your behalf.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/register">Post a matter</Button>
            <Button href="#how-it-works" variant="secondary">
              How it works
            </Button>
          </div>
          <p className="mt-6 text-sm text-navy-200">
            Flat lead fees. No percentage of the lawyer&rsquo;s or
            accountant&rsquo;s fee. Your outcome stays between you and the pro.
          </p>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-navy-100 bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              How it works
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              Four steps, one signed-off outcome.
            </h2>
          </div>
          <div className="mx-auto mt-14 max-w-4xl space-y-10">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div className="flex gap-6 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <div className="flex-shrink-0">
                    <span className="font-serif text-4xl text-gold-500">
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-navy-800">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-navy-500">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Beachhead practice areas */}
      <section className="bg-navy-50 py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              What you can post today
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              We&rsquo;re starting with NZ and Australia.
            </h2>
            <p className="mt-4 text-navy-500">
              More practice areas and more jurisdictions are being added every
              week. Pick the closest match and we&rsquo;ll help you from there.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {beachheadAreas.map((a) => (
              <Reveal key={a.slug}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {a.flag}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      {a.jurisdiction}
                    </p>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-navy-800">
                    {a.name}
                  </h3>
                  <p className="mt-3 text-sm text-navy-500">{a.summary}</p>
                  <p className="mt-4 text-sm font-semibold text-gold-600">
                    {a.fee}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Platform statement */}
      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              Platform statement
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              Read this before you post a matter.
            </h2>
            <p className="mt-4 text-navy-500">
              Plain language, five points. We want you to understand exactly
              what Marco Reid is and how it protects you. You&rsquo;ll
              acknowledge these at signup and again for each practice area you
              start a matter in.
            </p>
            <ul className="mt-8 space-y-4">
              {PLATFORM_ACK_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 rounded-xl border border-navy-100 bg-navy-50 p-5"
                >
                  <span
                    className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-navy-700">{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-20">
        <Container className="text-center">
          <h2 className="font-serif text-headline text-white">
            Ready to post your matter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100">
            Create your account, pick the closest practice area, and walk
            through the intake. A qualified professional takes it from there.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/register">Create account</Button>
            <Link
              href="/contact"
              className="inline-flex min-h-touch items-center text-sm font-medium text-white/90 underline hover:text-white"
            >
              Talk to someone first &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
