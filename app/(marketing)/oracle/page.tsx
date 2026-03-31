import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SectionHeading from "@/app/components/shared/SectionHeading";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import CtaSection from "@/app/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "The Oracle \u2014 Cross-Domain Legal and Accounting AI Research",
  description:
    "Ask questions that span law and accounting simultaneously. Every citation verified against authoritative public domain sources. The research tool nobody else can build.",
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
      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-4xl font-serif text-4xl text-plum-500 sm:text-5xl lg:text-7xl">
            {product.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-400 sm:text-xl">
            {product.description}
          </p>
          <div className="mt-10">
            <Button href="/pricing" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      {/* Citation verification */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Every citation verified"
            subtitle="The hallucination prevention system that protects professionals"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-forest-200 bg-white p-6 text-center">
              <p className="text-3xl text-forest-500">{"\u2713"}</p>
              <p className="mt-2 font-semibold text-navy-500">Verified</p>
              <p className="mt-1 text-sm text-navy-400">
                Case confirmed in authoritative public domain source with direct
                link provided
              </p>
            </div>
            <div className="rounded-xl border border-yellow-200 bg-white p-6 text-center">
              <p className="text-3xl text-yellow-500">{"\u26A0"}</p>
              <p className="mt-2 font-semibold text-navy-500">Unverified</p>
              <p className="mt-1 text-sm text-navy-400">
                Case could not be confirmed. Do not rely on this citation
                without independent verification
              </p>
            </div>
            <div className="rounded-xl border border-red-200 bg-white p-6 text-center">
              <p className="text-3xl text-red-500">{"\u2717"}</p>
              <p className="mt-2 font-semibold text-navy-500">Not Found</p>
              <p className="mt-1 text-sm text-navy-400">
                Case does not appear to exist in any authoritative source. Do
                not use
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-domain section */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="The product nobody else can build"
            subtitle="Because nobody else owns both sides"
          />
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-lg text-navy-400">
              {"\u201C"}What are the immigration tax implications of this
              corporate structure for a Tier-1 visa applicant?{"\u201D"}
            </p>
            <p className="mt-4 text-navy-300">
              That query requires both law and accounting AI. Only AlecRae can
              answer it. The Oracle connects legal research with accounting and
              tax intelligence in a single search.
            </p>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <SectionHeading title="How it works" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-navy-100 bg-white p-6"
              >
                <p className="font-medium text-navy-500">{feature}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      <CtaSection
        title="Research without boundaries"
        subtitle="Legal and accounting intelligence in one search. Every citation verified."
      />
    </>
  );
}
