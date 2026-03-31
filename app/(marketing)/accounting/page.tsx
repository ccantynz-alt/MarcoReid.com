import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
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
      <section className="pb-24 pt-32 sm:pb-36 sm:pt-44">
        <Container className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            AlecRae Accounting
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

      {/* Stat */}
      <section className="bg-neutral-200 py-20 sm:py-28">
        <Container className="text-center">
          <p className="text-display-xl font-serif text-neutral-950">
            12&ndash;18
          </p>
          <p className="mt-4 text-xl text-neutral-600">
            hours saved per week, per CPA
          </p>
          <p className="mt-2 text-neutral-500">
            Hours that can be billed to more clients, or simply given back to
            the people who matter.
          </p>
        </Container>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-36">
        <Container>
          <h2 className="text-center text-display font-serif text-neutral-950">
            Precision meets intelligence.
          </h2>
          <p className="mt-6 text-center text-xl text-neutral-600">
            Every accounting workflow, powered by AI.
          </p>
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
        </Container>
      </section>

      <CtaSection
        title={"Accounting automation\nthat CPAs trust."}
        subtitle="From bank feeds to tax filings. One platform."
      />
    </>
  );
}
