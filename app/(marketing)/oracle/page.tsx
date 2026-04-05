import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import Reveal from "@/app/components/effects/Reveal";

const OracleMockup = dynamic(() => import("@/app/components/marketing/OracleMockup"), { ssr: false });
const MockupReveal = dynamic(() => import("@/app/components/effects/MockupReveal"), { ssr: false });


export const metadata: Metadata = {
  title: "The Oracle \u2014 The Most Intelligent Legal and Accounting Research Engine Ever Built",
  description:
    "Cross-domain legal and accounting AI research. Every citation verified. Ask questions that span both disciplines. Tax codes, IRS rulings, case law, and regulations \u2014 the research engine nobody else can build.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Oracle",
  applicationCategory: "Research",
  operatingSystem: "Web",
  description: "Cross-domain legal and accounting AI research with mandatory citation verification. Public domain case law, statutes, tax codes, and regulations.",
  url: `${BRAND.url}/oracle`,
};

export default function OraclePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-plum-600 opacity-0">
            The Oracle
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-navy-700">The most intelligent</span>
            <br />
            <span className="text-plum-500">research engine on the planet.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Cross-domain legal and accounting AI. Every citation verified against
            authoritative public sources before you see it. Ask questions that span both
            disciplines simultaneously. The research engine nobody else can build &mdash;
            because nobody else owns both sides.
          </p>
          <div className="mt-12 animate-fade-up-3 opacity-0">
            <Button href="/pricing" size="lg">See pricing</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Oracle mockup */}
      <section className="py-20 sm:py-32" aria-label="Oracle preview">
        <Container>
          <MockupReveal className="mx-auto max-w-4xl">
            <OracleMockup />
          </MockupReveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The killer workflow — Oracle draw-down */}
      <section className="py-32 sm:py-44" aria-label="The Oracle draw-down">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-plum-600">
              The killer workflow
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Research without ever leaving your document.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50 p-8">
              <p className="text-xs font-semibold tracking-widest text-red-600">Without AlecRae</p>
              <p className="mt-4 leading-relaxed text-navy-400">
                You&rsquo;re drafting a contract clause about non-compete enforceability.
                Not sure about the California standard. Open a new tab. Go to Westlaw.
                Log in. Search. Find the case. Copy the citation. Switch back to your document.
                Paste it in. Reformat it. Five minutes. Your flow is destroyed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-4 rounded-2xl border border-purple-500/20 bg-plum-50 p-8">
              <p className="text-xs font-semibold tracking-widest text-plum-600">With The Oracle</p>
              <p className="mt-4 leading-relaxed text-navy-400">
                You&rsquo;re drafting. You hit &thinsp;<span className="rounded bg-navy-100 px-2 py-0.5 font-mono text-sm text-plum-600">&#8984;K</span>&thinsp;.
                The Oracle slides in from the right &mdash; you never leave the document.
                You type &ldquo;California non-compete enforceability standard.&rdquo;
                Three verified cases in under 3 seconds. You click &ldquo;Insert citation.&rdquo;
                It drops directly into your document at the cursor position, formatted correctly,
                citation verified with a &#10003; badge.{" "}
                <span className="font-semibold text-plum-600">Total time: 25 seconds. Flow never broken.</span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Available everywhere */}
      <section className="py-32 sm:py-44" aria-label="Available everywhere">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-plum-600">
              Everywhere
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              <span className="rounded bg-navy-100 px-3 py-1 font-mono text-forest-600">&#8984;K</span>
              {" "}from anywhere. Instantly.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { where: "Inside the Document Editor", what: "Research while drafting contracts, motions, and briefs" },
              { where: "Inside Email", what: "Cite a case while responding to a client question" },
              { where: "Inside Case Management", what: "Add research notes to any matter instantly" },
              { where: "Inside Tax Filing", what: "Check a regulation mid-entry without switching tools" },
              { where: "Inside Billing Notes", what: "Reference a precedent while logging time" },
              { where: "As a Global Command", what: "⌘K from literally anywhere in the platform" },
            ].map((item) => (
              <Reveal key={item.where} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-semibold text-navy-700">{item.where}</p>
                  <p className="mt-2 text-sm text-navy-400">{item.what}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Oracle for Accounting — the other half */}
      <section className="py-32 sm:py-44 bg-navy-50" aria-label="Oracle for Accounting">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#9671;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  The Oracle &mdash; Accounting
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Tax research answered in seconds, not hours.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Most accountants ring a taxation agent to verify what they&rsquo;re doing is correct.
              That call takes time. The answer takes longer. With The Oracle for Accounting,
              every IRS code section, every revenue ruling, every regulatory citation is verified
              against official sources and returned in seconds. The CPA never leaves their workflow.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "IRS Code sections", desc: "Every section of the Internal Revenue Code searchable and verified against IRS.gov" },
              { title: "Revenue rulings", desc: "IRS revenue rulings, procedures, and guidance documents with direct source links" },
              { title: "Treasury regulations", desc: "Full Code of Federal Regulations coverage for tax provisions" },
              { title: "State tax codes", desc: "50-state tax code coverage. State-specific rules returned alongside federal" },
              { title: "GAAP & IFRS standards", desc: "Accounting standards referenced and cited correctly in every research result" },
              { title: "Tax court decisions", desc: "US Tax Court opinions verified and linked to authoritative public sources" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-xl bg-forest-50 border border-forest-200 p-8">
              <p className="text-xs font-bold tracking-wider text-forest-600">Example query</p>
              <p className="mt-4 font-serif text-headline text-navy-700 italic">
                &ldquo;What is the Section 199A qualified business income deduction threshold
                for a married couple filing jointly in 2026?&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-400">
                The Oracle returns the exact threshold, the relevant IRC section, the applicable
                Treasury Regulation, and links to the official IRS source &mdash; all verified,
                all cited, all in under 3 seconds. The CPA who used to spend 20 minutes searching
                IRS.gov now has their answer before they finish their coffee.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Oracle for IP */}
      <section className="py-32 sm:py-44" aria-label="Oracle for IP">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                <span className="text-xl">&#9878;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-navy-500">
                  The Oracle &mdash; Intellectual Property
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Patents. Trademarks. Copyright. Trade secrets.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              IP attorneys bill $500&ndash;$800/hour and do enormous amounts of research.
              The Oracle for IP is a dedicated domain that understands patent claims,
              trademark likelihood of confusion, prior art analysis, and IP case law.
              And because IP work always has tax implications &mdash; licensing revenue,
              IP holding entity structures, R&amp;D credits &mdash; The Oracle spans
              both IP law and accounting in a single query.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "USPTO patent search", desc: "Search patent records, analyse claims, find prior art, track expiry and maintenance fees" },
              { title: "Trademark search (TESS)", desc: "Likelihood of confusion analysis, monitoring for conflicting new filings, registration status" },
              { title: "Copyright research", desc: "US Copyright Office records, fair use analysis grounded in case law, DMCA precedents" },
              { title: "Trade secret law", desc: "State-by-state analysis of Uniform Trade Secrets Act adoption, misappropriation cases" },
              { title: "IP case law", desc: "Infringement cases, licensing disputes, and trade secret misappropriation via CourtListener" },
              { title: "WIPO international", desc: "International patent and trademark records via Madrid Protocol for global IP strategy" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Citation verification — dramatic */}
      <section className="py-32 sm:py-44" aria-label="Citation verification">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-plum-600">
              Zero hallucinations
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Every citation verified before you see it.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              In 2023, a New York attorney was sanctioned for submitting AI-fabricated citations to a federal court.
              That will never happen on AlecRae. Every case, every statute, every ruling is checked against
              authoritative public domain sources before it reaches your screen.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-5xl text-forest-600">&check;</p>
                <p className="mt-4 text-lg font-semibold text-navy-700">Verified</p>
                <p className="mt-2 text-sm text-navy-400">
                  Confirmed in authoritative source. Direct link provided. Safe to cite.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-5xl text-yellow-600">&minus;</p>
                <p className="mt-4 text-lg font-semibold text-navy-700">Unverified</p>
                <p className="mt-2 text-sm text-navy-400">
                  Could not be confirmed. Flagged visibly. Do not rely without checking.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-5xl text-red-600">&times;</p>
                <p className="mt-4 text-lg font-semibold text-navy-700">Not Found</p>
                <p className="mt-2 text-sm text-navy-400">
                  Does not exist. Blocked from insertion into any document. Period.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The cross-domain moat */}
      <section className="relative py-32 sm:py-44" aria-label="Cross-domain research">
        <Container narrow className="relative">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-plum-600">
              The moat
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              The product nobody else can build.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl italic leading-relaxed text-navy-400">
              &ldquo;What are the immigration tax implications of this corporate
              structure for a Tier-1 visa applicant?&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              That query requires both legal research and tax intelligence simultaneously.
              Westlaw can&rsquo;t answer it. QuickBooks can&rsquo;t answer it. Nobody else owns both
              sides of the law-accounting boundary. Only AlecRae can answer it &mdash; because
              The Oracle spans both domains in a single search.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              This is not an incremental improvement. This is a category that did not exist
              before AlecRae created it.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Disclaimer + CTA */}
      <section className="py-16" aria-label="AI disclaimer">
        <Container>
          <div className="mx-auto max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-plum-500">
              Research without boundaries.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              Legal and accounting intelligence in one search. Every citation verified.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/dictation" variant="secondary" size="lg">Explore Voice</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
