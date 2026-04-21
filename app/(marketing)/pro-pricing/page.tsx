import type { Metadata } from "next";
import { PRO_PLANS } from "@/lib/marketplace/pro-plans";
import { formatFee } from "@/lib/marketplace/format";
import ProSubscribeButton from "@/app/components/pro/ProSubscribeButton";

export const metadata: Metadata = {
  title: "Pro pricing",
  description:
    "Marketplace subscription tiers for verified lawyers and chartered accountants. Pick the plan that fits your practice.",
};

export default function ProPricingPage() {
  return (
    <>
      <section className="bg-linear-to-b from-navy-50/50 to-white pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
            For verified professionals
          </p>
          <h1 className="mt-3 text-hero font-serif text-navy-800">
            Choose your marketplace plan.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-400">
            A monthly subscription unlocks the marketplace. Citizens pay a
            per-matter lead fee up front; you keep the work-in-matter fee
            on sign-off, minus our 10% platform share.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRO_PLANS.map((plan) => {
              const highlighted = plan.tier === "pro";
              return (
                <div
                  key={plan.tier}
                  className={`flex flex-col rounded-2xl p-8 transition-all ${
                    highlighted
                      ? "bg-navy-500 text-white shadow-mockup"
                      : "border border-navy-100 bg-white shadow-card"
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                      highlighted ? "text-navy-200" : "text-navy-400"
                    }`}
                  >
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span
                      className={`font-serif text-5xl ${
                        highlighted ? "text-white" : "text-navy-700"
                      }`}
                    >
                      {formatFee(plan.priceMonthlyCents, plan.currency)}
                    </span>
                    <span
                      className={`text-sm ${
                        highlighted ? "text-navy-300" : "text-navy-400"
                      }`}
                    >
                      /month
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm ${
                      highlighted ? "text-navy-200" : "text-navy-400"
                    }`}
                  >
                    {plan.tagline}
                  </p>
                  <div
                    className={`mt-6 h-px w-full ${
                      highlighted ? "bg-navy-400" : "bg-navy-100"
                    }`}
                  />
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-3 text-sm ${
                          highlighted ? "text-navy-100" : "text-navy-500"
                        }`}
                      >
                        <span
                          className={`mt-0.5 ${
                            highlighted ? "text-white" : "text-forest-500"
                          }`}
                        >
                          &check;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <ProSubscribeButton tier={plan.tier} highlighted={highlighted} />
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-navy-400">
            You&rsquo;ll need a verified professional profile before you can
            subscribe. Cancel any time from the Stripe billing portal —
            access continues through the end of your current billing period.
          </p>
        </div>
      </section>
    </>
  );
}
