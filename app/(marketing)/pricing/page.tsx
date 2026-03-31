import type { Metadata } from "next";
import {
  LAW_PRICING,
  ACCOUNTING_PRICING,
  ORACLE_PRICING,
  BRAND,
} from "@/lib/constants";
import { PricingTier } from "@/lib/types";
import Container from "@/app/components/shared/Container";
import SectionHeading from "@/app/components/shared/SectionHeading";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AlecRae Law, AlecRae Accounting, and The Oracle. Plans for solo practitioners to growing firms.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    ...LAW_PRICING.map((t) => ({
      "@type": "Offer",
      name: `AlecRae Law ${t.name}`,
      price: t.price.replace("$", ""),
      priceCurrency: "USD",
    })),
    ...ACCOUNTING_PRICING.map((t) => ({
      "@type": "Offer",
      name: `AlecRae Accounting ${t.name}`,
      price: t.price.replace("$", ""),
      priceCurrency: "USD",
    })),
  ],
};

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 sm:p-8 ${
        tier.highlighted
          ? "border-navy-500 bg-navy-50 ring-1 ring-navy-500"
          : "border-navy-100 bg-white"
      }`}
    >
      <h3 className="font-serif text-2xl text-navy-500">{tier.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-serif text-4xl text-navy-500">{tier.price}</span>
        <span className="text-sm text-navy-300">{tier.period}</span>
      </div>
      <p className="mt-2 text-sm text-navy-400">{tier.description}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-navy-400"
          >
            <span className="mt-0.5 text-forest-500">{"\u2713"}</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="font-serif text-4xl text-navy-500 sm:text-5xl lg:text-7xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-400">
            Plans for solo practitioners, small firms, and growing practices.
            Every plan includes AlecRae Voice.
          </p>
        </Container>
      </section>

      {/* Law pricing */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="AlecRae Law"
            subtitle="The operating system for your legal practice"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LAW_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      {/* Accounting pricing */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="AlecRae Accounting"
            subtitle="AI-powered accounting for modern firms"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACCOUNTING_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      {/* Oracle pricing */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="The Oracle"
            subtitle="Cross-domain legal and accounting research"
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {ORACLE_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
