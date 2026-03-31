import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import CtaSection from "@/app/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "The Oracle \u2014 Cross-Domain Legal and Accounting AI Research",
  description:
    "Ask questions that span law and accounting simultaneously. Every citation verified against authoritative public domain sources.",
};

const product = PRODUCTS.oracle;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "Research",
  operatingSystem: "Web",
  description: product.description,
  url: `${BRAND.url}/oracle`,
};

export default function OraclePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />
        <Container className="relative text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            The Oracle
          </p>
          <h1 className="mt-6 text-display-2xl font-serif text-gradient">
            {product.tagline}
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-text-secondary">
            {product.description}
          </p>
          <div className="mt-12">
            <Button href="/pricing" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      {/* Citation verification */}
      <div className="glow-line mx-auto max-w-xs" />
      <section className="py-32 sm:py-44">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            Verification system
          </p>
          <h2 className="mt-6 text-center text-display font-serif text-text-primary">
            Every citation verified.
          </h2>
          <p className="mt-6 text-center text-xl text-text-secondary">
            No hallucinated cases. No fabricated rulings. Every source linked and checked.
          </p>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <div className="card-dark text-center">
              <p className="font-serif text-5xl text-accent">&check;</p>
              <p className="mt-4 text-lg font-semibold text-text-primary">
                Verified
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Confirmed in authoritative public domain source with direct link
              </p>
            </div>
            <div className="card-dark text-center">
              <p className="font-serif text-5xl text-yellow-500">&minus;</p>
              <p className="mt-4 text-lg font-semibold text-text-primary">
                Unverified
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Could not be confirmed. Do not rely without independent verification
              </p>
            </div>
            <div className="card-dark text-center">
              <p className="font-serif text-5xl text-red-400">&times;</p>
              <p className="mt-4 text-lg font-semibold text-text-primary">
                Not Found
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Does not appear to exist in any authoritative source. Do not use
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-domain */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <Container narrow className="relative">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            The moat
          </p>
          <h2 className="mt-6 text-display font-serif text-text-primary">
            The product nobody else can build.
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-text-secondary">
            &ldquo;What are the immigration tax implications of this corporate
            structure for a Tier-1 visa applicant?&rdquo;
          </p>
          <p className="mt-6 text-xl leading-relaxed text-text-secondary">
            That query requires both law and accounting AI. Nobody else owns
            both sides. Only AlecRae can answer it.
          </p>
        </Container>
      </section>

      {/* Features */}
      <section className="py-32 sm:py-44">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            Capabilities
          </p>
          <h2 className="mt-6 text-center text-display font-serif text-text-primary">
            How it works.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature} className="card-dark">
                <p className="text-lg font-medium text-text-primary">
                  {feature}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      <CtaSection
        title={"Research without\nboundaries."}
        subtitle="Legal and accounting intelligence in one search."
      />
    </>
  );
}
