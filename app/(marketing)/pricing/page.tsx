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
      className={`flex flex-col rounded-2xl p-8 ${
        tier.highlighted
          ? "bg-white text-surface ring-1 ring-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          : "card-dark"
      }`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-widest ${
          tier.highlighted ? "text-surface/50" : "text-accent"
        }`}
      >
        {tier.name}
      </p>
      <div className="mt-4 flex items-baseline gap-1">
        <span
          className={`font-serif text-5xl ${
            tier.highlighted ? "text-surface" : "text-text-primary"
          }`}
        >
          {tier.price}
        </span>
        <span
          className={`text-sm ${
            tier.highlighted ? "text-surface/50" : "text-text-tertiary"
          }`}
        >
          {tier.period}
        </span>
      </div>
      <p
        className={`mt-3 text-sm ${
          tier.highlighted ? "text-surface/60" : "text-text-secondary"
        }`}
      >
        {tier.description}
      </p>
      <div
        className={`mt-6 h-px w-full ${
          tier.highlighted ? "bg-surface/10" : "bg-surface-border"
        }`}
      />
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-sm ${
              tier.highlighted ? "text-surface/70" : "text-text-secondary"
            }`}
          >
            <span
              className={`mt-0.5 ${
                tier.highlighted ? "text-surface" : "text-accent"
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
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-14">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
        <Container className="relative text-center">
          <h1 className="text-display-2xl font-serif text-gradient">
            Pricing
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl text-text-secondary">
            Plans for solo practitioners, small firms, and growing practices.
            Every plan includes AlecRae Voice.
          </p>
        </Container>
      </section>

      {/* Law */}
      <section className="py-24 sm:py-32">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            AlecRae Law
          </p>
          <h2 className="mt-4 text-center text-display font-serif text-text-primary">
            Legal practice management.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LAW_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-xs" />

      {/* Accounting */}
      <section className="py-24 sm:py-32">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            AlecRae Accounting
          </p>
          <h2 className="mt-4 text-center text-display font-serif text-text-primary">
            AI-powered accounting.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACCOUNTING_PRICING.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-xs" />

      {/* Oracle */}
      <section className="py-24 sm:py-32">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            The Oracle
          </p>
          <h2 className="mt-4 text-center text-display font-serif text-text-primary">
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
