import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
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
      <section className="pb-24 pt-32 sm:pb-36 sm:pt-44">
        <Container className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            AlecRae Law
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
            15&ndash;20
          </p>
          <p className="mt-4 text-xl text-neutral-600">
            hours saved per week, per attorney
          </p>
          <p className="mt-2 text-neutral-500">
            At $350/hour, that is $5,250&ndash;7,000 of additional billing
            capacity. Every single week.
          </p>
        </Container>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-36">
        <Container>
          <h2 className="text-center text-display font-serif text-neutral-950">
            Everything your firm needs.
          </h2>
          <p className="mt-6 text-center text-xl text-neutral-600">
            One platform replaces a dozen tools.
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
        title={"Run your entire practice\non one platform."}
        subtitle="From first client contact to final invoice."
      />
    </>
  );
}
