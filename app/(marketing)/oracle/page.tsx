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
      <section className="pb-24 pt-32 sm:pb-36 sm:pt-44">
        <Container className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            The Oracle
          </p>
          <h1 className="mt-6 text-display-xl font-serif text-neutral-950">
            {product.tagline}
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-neutral-600">
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
      <section className="bg-neutral-200 py-24 sm:py-36">
        <Container>
          <h2 className="text-center text-display font-serif text-neutral-950">
            Every citation verified.
          </h2>
          <p className="mt-6 text-center text-xl text-neutral-600">
            No hallucinated cases. No fabricated rulings. Every source linked.
          </p>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white px-8 py-10 text-center">
              <p className="font-serif text-4xl text-accent">&check;</p>
              <p className="mt-4 text-lg font-semibold text-neutral-950">
                Verified
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Confirmed in authoritative public domain source with direct link
              </p>
            </div>
            <div className="rounded-3xl bg-white px-8 py-10 text-center">
              <p className="font-serif text-4xl text-yellow-600">&minus;</p>
              <p className="mt-4 text-lg font-semibold text-neutral-950">
                Unverified
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Could not be confirmed. Do not rely without independent
                verification
              </p>
            </div>
            <div className="rounded-3xl bg-white px-8 py-10 text-center">
              <p className="font-serif text-4xl text-red-500">&times;</p>
              <p className="mt-4 text-lg font-semibold text-neutral-950">
                Not Found
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Does not appear to exist in any authoritative source. Do not use
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-domain */}
      <section className="py-24 sm:py-36">
        <Container narrow>
          <h2 className="text-display font-serif text-neutral-950">
            The product nobody else can build.
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-neutral-600">
            &ldquo;What are the immigration tax implications of this corporate
            structure for a Tier-1 visa applicant?&rdquo;
          </p>
          <p className="mt-6 text-xl leading-relaxed text-neutral-600">
            That query requires both law and accounting AI. Nobody else owns
            both sides. Only AlecRae can answer it.
          </p>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-neutral-100 py-24 sm:py-36">
        <Container>
          <h2 className="text-center text-display font-serif text-neutral-950">
            How it works.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl bg-neutral-200 px-8 py-6"
              >
                <p className="text-lg font-medium text-neutral-950">
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
