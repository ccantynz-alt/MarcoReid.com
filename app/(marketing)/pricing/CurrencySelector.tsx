"use client";

import { useState } from "react";
import { CURRENCY_PRICING } from "@/lib/constants";
import { PricingTier } from "@/lib/types";
import SubscribeButton from "@/app/components/pricing/SubscribeButton";
import Reveal from "@/app/components/effects/Reveal";

const CURRENCIES = [
  { code: "USD", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "NZD", flag: "\u{1F1F3}\u{1F1FF}" },
  { code: "AUD", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "GBP", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "CAD", flag: "\u{1F1E8}\u{1F1E6}" },
] as const;

function applyPrice(tier: PricingTier, symbol: string, price: number): PricingTier {
  return { ...tier, price: `${symbol}${price}` };
}

function PricingCard({
  tier,
  priceId,
}: {
  tier: PricingTier;
  priceId?: string;
}) {
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
      <SubscribeButton
        priceId={priceId}
        highlighted={tier.highlighted}
      />
    </div>
  );
}

export default function CurrencySelector({
  lawTiers,
  accountingTiers,
  oracleTiers,
  priceIds,
}: {
  lawTiers: PricingTier[];
  accountingTiers: PricingTier[];
  oracleTiers: PricingTier[];
  priceIds: {
    legal: (string | undefined)[];
    accounting: (string | undefined)[];
    oracle: (string | undefined)[];
  };
}) {
  const [currency, setCurrency] = useState("USD");
  const cp = CURRENCY_PRICING[currency];

  const lawPriced = lawTiers.map((tier, i) => applyPrice(tier, cp.symbol, cp.law[i]));
  const accountingPriced = accountingTiers.map((tier, i) => applyPrice(tier, cp.symbol, cp.accounting[i]));
  const oraclePriced = oracleTiers.map((tier, i) => applyPrice(tier, cp.symbol, cp.oracle[i]));

  return (
    <>
      {/* Currency selector */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {CURRENCIES.map(({ code, flag }) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  currency === code
                    ? "bg-navy-500 text-white"
                    : "border border-navy-200 text-navy-600 hover:border-navy-400"
                }`}
              >
                {flag} {code}
              </button>
            ))}
          </div>
          <p className="text-sm text-navy-400">
            Prices shown in {currency}. All plans billed monthly.
          </p>
        </div>
      </div>

      {/* Law */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-wider text-forest-600">
              Marco Reid Legal
            </p>
            <h2 className="mt-3 text-center text-display font-serif text-navy-800">
              Legal practice management.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lawPriced.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} priceId={priceIds.legal[i]} />
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
              Marco Reid Accounting
            </p>
            <h2 className="mt-3 text-center text-display font-serif text-navy-800">
              AI-powered accounting.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accountingPriced.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} priceId={priceIds.accounting[i]} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Marco */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-wider text-plum-600">
              Marco
            </p>
            <h2 className="mt-3 text-center text-display font-serif text-navy-800">
              Cross-domain intelligence.
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {oraclePriced.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} priceId={priceIds.oracle[i]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
