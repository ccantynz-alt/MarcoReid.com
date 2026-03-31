import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SectionHeading from "@/app/components/shared/SectionHeading";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import CtaSection from "@/app/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "AlecRae Accounting \u2014 AI-Powered Accounting for Modern Firms",
  description:
    "Automated bookkeeping, bank feed integration, tax compliance, and financial reporting \u2014 built for CPAs who demand precision and speed.",
};

const product = PRODUCTS.accounting;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "Accounting",
  operatingSystem: "Web",
  description: product.description,
  url: `${BRAND.url}/accounting`,
};

export default function AccountingPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-4xl font-serif text-4xl text-forest-500 sm:text-5xl lg:text-7xl">
            {product.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-400 sm:text-xl">
            {product.description}
          </p>
          <div className="mt-10">
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      {/* Time savings callout */}
      <section className="bg-forest-50 py-16">
        <Container className="text-center">
          <p className="font-serif text-5xl text-forest-500 sm:text-6xl">
            12{"\u2013"}18
          </p>
          <p className="mt-2 text-xl font-medium text-navy-400">
            hours saved per week per CPA
          </p>
          <p className="mt-2 text-navy-300">
            Hours that can be billed to more clients, or simply given back to
            the people who matter.
          </p>
        </Container>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Precision meets intelligence"
            subtitle="Every accounting workflow, powered by AI"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-forest-100 bg-white p-6"
              >
                <p className="font-medium text-navy-500">{feature}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Ready to modernise your firm?"
        subtitle="Accounting automation that CPAs trust. From bank feeds to tax filings."
      />
    </>
  );
}
