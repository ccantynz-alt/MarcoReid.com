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
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
        <Container className="relative text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            AlecRae Law
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

      {/* Stat */}
      <div className="glow-line mx-auto max-w-xs" />
      <section className="py-32 sm:py-44">
        <Container className="text-center">
          <p className="text-display-2xl font-serif text-text-primary">
            15&ndash;20<span className="text-accent">h</span>
          </p>
          <p className="mt-6 text-xl text-text-secondary">
            saved per week, per attorney
          </p>
          <p className="mt-3 text-text-tertiary">
            At $350/hour &mdash; $5,250&ndash;7,000 of additional billing
            capacity. Every single week.
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
            Everything your firm needs. Nothing else.
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
        </Container>
      </section>

      <CtaSection
        title={"Run your entire practice\non one platform."}
        subtitle="From first client contact to final invoice."
      />
    </>
  );
}
