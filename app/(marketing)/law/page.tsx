import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SectionHeading from "@/app/components/shared/SectionHeading";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import CtaSection from "@/app/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "AlecRae Law \u2014 The Operating System for Your Legal Practice",
  description:
    "Full-stack legal practice management powered by AI. Case management, billing, trust accounting, document drafting, court-rules calendaring, and The Oracle legal research.",
};

const product = PRODUCTS.law;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description: product.description,
  url: `${BRAND.url}/law`,
};

export default function LawPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-4xl font-serif text-4xl text-navy-500 sm:text-5xl lg:text-7xl">
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

      {/* Time savings callout */}
      <section className="bg-navy-50 py-16">
        <Container className="text-center">
          <p className="font-serif text-5xl text-navy-500 sm:text-6xl">
            15{"\u2013"}20
          </p>
          <p className="mt-2 text-xl font-medium text-navy-400">
            hours saved per week for attorneys
          </p>
          <p className="mt-2 text-navy-300">
            At $350/hour, that is $5,250{"\u2013"}7,000 of additional billing
            capacity. Every week. Every year.
          </p>
        </Container>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Everything your firm needs"
            subtitle="One platform replaces a dozen tools"
          />
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
        </Container>
      </section>

      <CtaSection
        title="Ready to run your firm on AlecRae?"
        subtitle="Every tool your practice needs, from first client contact to final invoice."
      />
    </>
  );
}
