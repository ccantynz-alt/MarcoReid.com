import type { Metadata } from "next";
import {
  LAW_PRICING,
  ACCOUNTING_PRICING,
  ORACLE_PRICING,
  BRAND,
} from "@/lib/constants";
import { PricingTier } from "@/lib/types";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AlecRae Law, AlecRae Accounting, and The Oracle.",
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
      className={`flex flex-col rounded-3xl px-8 py-10 ${
        tier.highlighted
          ? "bg-neutral-950 text-white"
          : "bg-neutral-200 text-neutral-950"
      }`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-widest ${
          tier.highlighted ? "text-neutral-400" : "text-neutral-500"
        }`}
      >
        {tier.name}
      </p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-serif text-5xl">{tier.price}</span>
        <span
          className={`text-sm ${
            tier.highlighted ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          {tier.period}
        </span>
      </div>
      <p
        className={`mt-3 text-sm ${
          tier.highlighted ? "text-neutral-300" : "text-neutral-600"
        }`}
      >
        {tier.description}
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-sm ${
              tier.highlighted ? "text-neutral-200" : "text-neutral-700"
            }`}
          >
            <span
              className={`mt-0.5 ${
                tier.highlighted ? "text-white" : "text-accent"
              }`}
            >
              &check;
            </span>
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

      {/* Hero */}
      <section className="pb-24 pt-32 sm:pb-36 sm:pt-44">
        <Container className="text-center">
          <h1 className="text-display-xl font-serif text-neutral-950">
            Pricing
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl text-neutral-600">
            Plans for solo practitioners, small firms, and growing practices.
            Every plan includes AlecRae Voice.
          </p>
        </Container>
      </section>

      {/* Law */}
      <section className="bg-neutral-100 py-24 sm:py-36">
        <Container>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-neutral-500">
            AlecRae Law
          </p>
          <h2 className="mt-4 text-center text-display font-serif text-neutral-950">
            Legal practice management.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LAW_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      {/* Accounting */}
      <section className="py-24 sm:py-36">
        <Container>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-neutral-500">
            AlecRae Accounting
          </p>
          <h2 className="mt-4 text-center text-display font-serif text-neutral-950">
            AI-powered accounting.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACCOUNTING_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      {/* Oracle */}
      <section className="bg-neutral-100 py-24 sm:py-36">
        <Container>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-neutral-500">
            The Oracle
          </p>
          <h2 className="mt-4 text-center text-display font-serif text-neutral-950">
            Cross-domain intelligence.
          </h2>
          <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
            {ORACLE_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
