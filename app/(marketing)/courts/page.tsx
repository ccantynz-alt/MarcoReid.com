import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Courts \u2014 AI Infrastructure for Every Courtroom on Earth",
  description:
    "Real-time transcription, docket management, e-filing, judicial research, and public transparency. The complete AI platform for courts. Built for every jurisdiction.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Courts",
  applicationCategory: "GovernmentApplication",
  operatingSystem: "Web",
  description:
    "Five-product AI suite for courts: real-time transcription, docket management, e-filing, judicial research and opinion drafting, and public transparency.",
  url: `${BRAND.url}/courts`,
};

const products = [
  {
    href: "/courts/reporter",
    name: "Marco Reid Reporter",
    tag: "Real-time transcription",
    headline: "End the court reporter shortage.",
    body: "Real-time AI transcription with speaker diarisation, legal terminology, and certified output. Every word, every hearing, every language.",
  },
  {
    href: "/courts/docket",
    name: "Marco Reid Docket",
    tag: "Scheduling & calendaring",
    headline: "The docket runs itself.",
    body: "Judicial calendars, conflict detection, jury management, interpreter coordination, and continuance tracking. Whiteboards retired.",
  },
  {
    href: "/courts/filings",
    name: "Marco Reid Filings",
    tag: "E-filing reimagined",
    headline: "Filings that don't make people cry.",
    body: "A sane wrapper over PACER, CM/ECF, CE-File and friends. AI form-filling for self-represented litigants. Fewer rejections, faster processing.",
  },
  {
    href: "/courts/bench",
    name: "Marco Reid Bench",
    tag: "Marco for judges",
    headline: "Research and draft from the bench.",
    body: "Verified case law, statute, and policy research. Opinion drafting assistance. Sentencing aids. Marco at the judge's elbow, never hallucinating.",
  },
  {
    href: "/courts/public",
    name: "Marco Reid Public",
    tag: "Transparency & access",
    headline: "Open justice, finally open.",
    body: "Livestreaming, searchable transcripts, opinion publication, public docket access. The transparency every constitution promises and few courts deliver.",
  },
];

export default function CourtsPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Courts
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">AI infrastructure</span>
            <br />
            <span className="text-navy-700">for every courtroom on earth.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Courts run on paper, fax, and software written before the iPhone. Court reporters
            are retiring faster than they&apos;re replaced. Pro se litigants drown the docket.
            Marco Reid Courts is the complete AI platform for the third branch of government &mdash;
            five products that turn the courtroom into the most advanced room in the building.
          </p>
          <div className="mt-12 animate-fade-up-3 flex justify-center gap-4 opacity-0">
            <Button href="/courts/pilot" size="lg">Request a pilot</Button>
            <Button href="#products" variant="secondary" size="lg">See the suite</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Stats */}
      <section className="py-32 sm:py-44" aria-label="Why now">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              Why now.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={70} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">civil cases with at least one pro se party</p>
              <p className="mt-1 text-xs text-navy-300">Courts cannot scale fast enough.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={11000} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-navy-400">stenographer shortage in the US alone</p>
              <p className="mt-1 text-xs text-navy-300">A profession in collapse.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={195} />
              </p>
              <p className="mt-2 text-sm text-navy-400">jurisdictions worldwide</p>
              <p className="mt-1 text-xs text-navy-300">Every one of them needs this.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The five products */}
      <section id="products" className="py-32 sm:py-44" aria-label="The five products">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Five products. One platform.
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Everything a courtroom needs.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-4xl space-y-4">
            {products.map((p, i) => (
              <Reveal key={p.href} delay={0.05 * i}>
                <Link
                  href={p.href}
                  className="block rounded-xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                      {p.tag}
                    </p>
                    <p className="text-xs font-medium text-navy-300">{p.name}</p>
                  </div>
                  <h3 className="mt-4 font-serif text-headline text-navy-700">
                    {p.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed text-navy-400">{p.body}</p>
                  <p className="mt-6 text-sm font-semibold text-forest-600">Learn more &rarr;</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      {/* The vision */}
      <section className="py-32 sm:py-44" aria-label="The vision">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The vision
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              The third branch of government deserves first-class technology.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Legislative chambers got laptops a decade ago. The executive runs on cloud
              dashboards. The judiciary still runs on paper, DVDs in evidence lockers, and
              software bought from one vendor in 2003 that nobody can afford to replace.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Courts is built for every court in every country &mdash; from a county
              traffic division in Ohio to a constitutional court in Nairobi. Modular. Sovereign.
              Compliant. Designed to be impossible to replace once it&rsquo;s in.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-32 sm:py-44" aria-label="Pilot">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              Run a pilot in your courtroom.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              Court procurement is relationship-driven. Tell us about your court and we&rsquo;ll
              put a working pilot in your hands within 30 days.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/courts/pilot" size="lg">Request a pilot</Button>
              <Button href="/contact" variant="secondary" size="lg">Talk to us</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
