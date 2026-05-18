import type { Metadata } from "next";
import {
  LAW_PRICING,
  ACCOUNTING_PRICING,
  ORACLE_PRICING,
  BRAND,
} from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import CurrencySelector from "./CurrencySelector";

type PricingCategory = "legal" | "accounting" | "oracle";

function priceIdFor(category: PricingCategory, tierName: string): string | undefined {
  const key = tierName.toUpperCase().replace(/[^A-Z]/g, "_");
  if (category === "legal") {
    if (key.includes("STARTER")) return process.env.STRIPE_PRICE_LEGAL_STARTER;
    if (key.includes("PROFESSIONAL")) return process.env.STRIPE_PRICE_LEGAL_PROFESSIONAL;
    if (key.includes("FIRM")) return process.env.STRIPE_PRICE_LEGAL_FIRM;
  }
  if (category === "accounting") {
    if (key.includes("STARTER")) return process.env.STRIPE_PRICE_ACCOUNTING_STARTER;
    if (key.includes("PROFESSIONAL")) return process.env.STRIPE_PRICE_ACCOUNTING_PROFESSIONAL;
    if (key.includes("FIRM")) return process.env.STRIPE_PRICE_ACCOUNTING_FIRM;
  }
  if (category === "oracle") {
    if (key.includes("CROSS")) return process.env.STRIPE_PRICE_MARCO_CROSSDOMAIN;
    if (key.includes("ENTERPRISE")) return process.env.STRIPE_PRICE_MARCO_ENTERPRISE;
  }
  return undefined;
}

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for Marco Reid Legal, Marco Reid Accounting, and Marco. Plans for solo practitioners to growing firms.",
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
      name: `Marco Reid Legal ${t.name}`,
      price: t.price.replace("$", ""),
      priceCurrency: "USD",
    })),
    ...ACCOUNTING_PRICING.map((t) => ({
      "@type": "Offer",
      name: `Marco Reid Accounting ${t.name}`,
      price: t.price.replace("$", ""),
      priceCurrency: "USD",
    })),
  ],
};

export default function PricingPage() {
  const priceIds = {
    legal: LAW_PRICING.map((t) => priceIdFor("legal", t.name)),
    accounting: ACCOUNTING_PRICING.map((t) => priceIdFor("accounting", t.name)),
    oracle: ORACLE_PRICING.map((t) => priceIdFor("oracle", t.name)),
  };

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-linear-to-b from-navy-50/50 to-white pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6 text-center sm:px-8 lg:px-12">
          <h1 className="text-hero font-serif text-navy-800">
            Simple, transparent pricing.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-400">
            Plans for solo practitioners, small firms, and growing practices.
            Every plan includes Marco Reid Voice.
          </p>
        </div>
      </section>

      <CurrencySelector
        lawTiers={LAW_PRICING}
        accountingTiers={ACCOUNTING_PRICING}
        oracleTiers={ORACLE_PRICING}
        priceIds={priceIds}
      />
    </>
  );
}
