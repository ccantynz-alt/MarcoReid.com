import type { Metadata } from "next";
import {
  LAW_PRICING,
  ACCOUNTING_PRICING,
  ORACLE_PRICING,
  BRAND,
} from "@/lib/constants";
import { PricingTier } from "@/lib/types";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

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
      className={`flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        tier.highlighted
          ? "bg-navy-500 text-white shadow-mockup"
          : "border border-navy-100 bg-white shadow-card hover:shadow-card-hover"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-wider ${
          tier.highlighted ? "text-navy-200" : "text-navy-400"
        }`}
      >
        {tier.name}
      </p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className={`font-serif text-5xl ${tier.highlighted ? "text-white" : "text-navy-700"}`}>
          {tier.price}
        </span>
        <span className={`text-sm ${tier.highlighted ? "text-navy-300" : "text-navy-400"}`}>
          {tier.period}
        </span>
      </div>
      <p className={`mt-3 text-sm ${tier.highlighted ? "text-navy-200" : "text-navy-400"}`}>
        {tier.description}
      </p>
      <div className={`mt-6 h-px w-full ${tier.highlighted ? "bg-navy-400" : "bg-navy-100"}`} />
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-sm ${
              tier.highlighted ? "text-navy-100" : "text-navy-500"
            }`}
          >
            <span className={`mt-0.5 ${tier.highlighted ? "text-white" : "text-forest-500"}`}>
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
      <section className="bg-gradient-to-b from-navy-50/50 to-white pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6 text-center sm:px-8 lg:px-12">
          <h1 className="text-hero font-serif text-navy-800">
            Simple, transparent pricing.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-400">
            Plans for solo practitioners, small firms, and growing practices.
            Every plan includes AlecRae Voice.
          </p>
        </div>
      </section>

      {/* Law */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-wider text-forest-600">
              AlecRae Law
            </p>
            <h2 className="mt-3 text-center text-display font-serif text-navy-800">
              Legal practice management.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LAW_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Accounting */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-wider text-forest-600">
              AlecRae Accounting
            </p>
            <h2 className="mt-3 text-center text-display font-serif text-navy-800">
              AI-powered accounting.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACCOUNTING_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Oracle */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-wider text-plum-600">
              The Oracle
            </p>
            <h2 className="mt-3 text-center text-display font-serif text-navy-800">
              Cross-domain intelligence.
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {ORACLE_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
