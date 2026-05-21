import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BRAND } from "@/lib/constants";
import {
  ACCOUNTING_INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  getIntegrationsByCategory,
  getReplacedProducts,
  calculateSavings,
} from "@/lib/accounting-integrations";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import FAQ from "@/app/components/shared/FAQ";
import Reveal from "@/app/components/effects/Reveal";

const AnimatedCounter = dynamic(
  () => import("@/app/components/effects/AnimatedCounter"),
);

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

const replacedProducts = getReplacedProducts();
const savings = calculateSavings();

export const metadata: Metadata = {
  title: `Marco Reid Accounting — One Platform Replaces ${replacedProducts.length}+ Tools`,
  description: `Stop paying for ${replacedProducts.length} separate accounting tools. Marco Reid includes general ledger, tax filing, payroll, bank feeds, receipt capture, practice management, client portal, time tracking, reporting, compliance, and payments — all for $149/month.`,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Accounting Integrations",
  applicationCategory: "Accounting",
  operatingSystem: "Web",
  description: `One accounting platform that replaces ${replacedProducts.length}+ separate tools. General ledger, tax filing, payroll, bank feeds, receipt capture, practice management, and more — built in, not bolted on.`,
  url: `${BRAND.url}/accounting/integrations`,
};

/* ------------------------------------------------------------------ */
/*  Country flag map                                                   */
/* ------------------------------------------------------------------ */

const COUNTRY_FLAGS: Record<string, string> = {
  NZ: "🇳🇿",
  AU: "🇦🇺",
  UK: "🇬🇧",
  US: "🇺🇸",
  CA: "🇨🇦",
  IE: "🇮🇪",
  SG: "🇸🇬",
};

/* ------------------------------------------------------------------ */
/*  Category icon map                                                  */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS: Record<string, string> = {
  "accounting-software": "📚",
  "tax-filing": "📄",
  payroll: "💰",
  "bank-feeds": "🏦",
  "receipt-capture": "📷",
  "practice-management": "📋",
  "client-portal": "🔒",
  "time-tracking": "⏱️",
  reporting: "📈",
  compliance: "🛡️",
  payments: "💳",
};

/* ------------------------------------------------------------------ */
/*  Status badge component                                             */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "built-in":
      "bg-forest-100 text-forest-700 border-forest-200",
    integrates:
      "bg-blue-50 text-blue-700 border-blue-200",
    replaces:
      "bg-amber-50 text-amber-700 border-amber-200",
    "coming-soon":
      "bg-navy-50 text-navy-400 border-navy-200",
  };

  const labels: Record<string, string> = {
    "built-in": "Built-in",
    integrates: "Integrates",
    replaces: "Replaces",
    "coming-soon": "Coming Soon",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] || styles["built-in"]}`}
    >
      {labels[status] || status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccountingIntegrationsPage() {
  const builtInCount = ACCOUNTING_INTEGRATIONS.filter(
    (i) => i.status === "built-in",
  ).length;

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-500">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-forest-500/25 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-400/15 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-widest text-gold-400 opacity-0">
            Marco Reid Accounting
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif text-white opacity-0">
            One platform. One bill.
            <br />
            <span className="text-gold-300">
              Replaces {replacedProducts.length}+ tools.
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl animate-fade-up-2 text-xl leading-relaxed text-navy-200 opacity-0">
            The average accounting firm pays $500&ndash;$2,000 per month for
            separate subscriptions to Xero, Dext, Karbon, TaxDome, Ignition,
            iPayroll, Fathom, and more. Marco Reid includes{" "}
            <em>every single one</em> of those capabilities &mdash; built in,
            not bolted on &mdash; for $149/month.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 animate-fade-up-3 opacity-0 sm:flex-row">
            <Button href="/pricing" size="lg">
              Stop paying for {replacedProducts.length} tools
            </Button>
            <Button
              href="/accounting"
              size="lg"
              variant="ghost"
              className="text-white hover:text-navy-200"
            >
              Explore the platform &rarr;
            </Button>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/*  Savings calculator                                          */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32" aria-label="Savings calculator">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              The maths is simple
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              One bill instead of ten.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 text-center sm:grid-cols-4">
            <Reveal delay={0.05}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={replacedProducts.length} />
                <span className="text-gold-400">+</span>
              </p>
              <p className="mt-2 text-sm font-medium text-navy-400">
                products replaced
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-300 line-through decoration-red-400/60 decoration-2">
                $<AnimatedCounter end={2000} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-400">
                typical monthly spend
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-serif text-display text-forest-600">
                $<AnimatedCounter end={149} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-400">
                Marco Reid per month
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-gold-500">
                $<AnimatedCounter end={1851} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-400">
                saved every month
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="mx-auto mt-12 max-w-2xl rounded-xl border-2 border-gold-200 bg-gold-50/50 p-6 text-center shadow-card sm:p-8">
              <p className="font-serif text-headline text-navy-700">
                That is over $22,000 per year
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-400">
                back in your pocket. No feature gating. No per-user upcharges on
                most modules. No surprise invoices from six different vendors.
                One subscription. Everything included.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="gold-divider" />
      </div>

      {/* ============================================================ */}
      {/*  Integration grid by category                                */}
      {/* ============================================================ */}
      <section
        className="py-24 sm:py-32"
        aria-label="Integrations by category"
      >
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Every capability. Built in.
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              {builtInCount} modules. Zero extra subscriptions.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Every category below is a tool your firm currently pays for
              separately. On Marco Reid, it is all included.
            </p>
          </Reveal>

          <div className="mt-20 space-y-20">
            {INTEGRATION_CATEGORIES.map((cat) => {
              const integrations = getIntegrationsByCategory(
                cat.slug as Parameters<typeof getIntegrationsByCategory>[0],
              );
              if (integrations.length === 0) return null;
              return (
                <div key={cat.slug}>
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-2xl"
                        aria-hidden="true"
                      >
                        {CATEGORY_ICONS[cat.slug] || "🔧"}
                      </span>
                      <div>
                        <h3 className="font-serif text-headline text-navy-700">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-navy-400">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {integrations.map((integration) => (
                      <Reveal key={integration.slug} delay={0.05}>
                        <div className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                          {/* Header row */}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-navy-700">
                              {integration.name}
                            </h4>
                            <StatusBadge status={integration.status} />
                          </div>

                          {/* Description */}
                          <p className="mt-3 text-sm leading-relaxed text-navy-400">
                            {integration.description}
                          </p>

                          {/* Competitors replaced */}
                          {integration.competitors.length > 0 &&
                            integration.competitors[0] !== "Nobody has this" &&
                            integration.competitors[0] !==
                              "Manual spreadsheets" && (
                              <div className="mt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                                  Replaces
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {integration.competitors.map((c) => (
                                    <span
                                      key={c}
                                      className="inline-flex items-center rounded-md border border-navy-100 bg-navy-50 px-2 py-0.5 text-xs text-navy-400 line-through decoration-red-400/50"
                                    >
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Competitor pricing */}
                          {integration.monthlyPrice && (
                            <p className="mt-3 text-xs text-navy-300">
                              Competitors charge:{" "}
                              <span className="font-medium text-red-400 line-through">
                                {integration.monthlyPrice}
                              </span>
                            </p>
                          )}

                          {/* Footer: countries + included badge */}
                          <div className="mt-auto flex items-end justify-between pt-4">
                            <div
                              className="flex gap-0.5 text-sm"
                              aria-label={`Available in ${integration.countries.join(", ")}`}
                            >
                              {integration.countries.map((code) => (
                                <span
                                  key={code}
                                  title={code}
                                  aria-hidden="true"
                                >
                                  {COUNTRY_FLAGS[code] || code}
                                </span>
                              ))}
                            </div>
                            {integration.marcoReidIncluded && (
                              <span className="inline-flex items-center rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-bold text-forest-700">
                                Included
                              </span>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="gold-divider" />
      </div>

      {/* ============================================================ */}
      {/*  What we replace — scrolling product wall                    */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32" aria-label="Products replaced">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              The graveyard of subscriptions
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              {replacedProducts.length} products. One replacement.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Every product below is something accounting firms currently pay
              for separately. Marco Reid replaces or includes all of them.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-5xl">
              <div className="flex flex-wrap justify-center gap-2">
                {replacedProducts.map((product) => (
                  <span
                    key={product}
                    className="inline-flex items-center rounded-lg border border-navy-100 bg-white px-4 py-2 text-sm font-medium text-navy-400 shadow-card line-through decoration-red-400/50 decoration-1 transition-all duration-200 hover:bg-navy-50"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 text-center">
              <p className="font-serif text-headline text-navy-700">
                All replaced by{" "}
                <span className="text-forest-600">one platform</span>.
              </p>
              <p className="mt-2 text-sm text-navy-400">
                Starting at $149/month. No hidden fees. No per-user traps.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="gold-divider" />
      </div>

      {/* ============================================================ */}
      {/*  Country availability matrix                                 */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32" aria-label="Country availability">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Global from day one
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              Seven jurisdictions. Full coverage.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Marco Reid Accounting is not a US-only product with a flag bolted
              on for other countries. Every module is built jurisdiction-aware
              from the ground up.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-5xl overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-navy-200">
                    <th className="pb-4 pr-4 font-semibold text-navy-700">
                      Module
                    </th>
                    {Object.entries(COUNTRY_FLAGS).map(([code, flag]) => (
                      <th
                        key={code}
                        className="pb-4 text-center font-semibold text-navy-700"
                      >
                        <span className="block text-lg" aria-hidden="true">
                          {flag}
                        </span>
                        <span className="text-xs text-navy-400">{code}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-50">
                  {ACCOUNTING_INTEGRATIONS.map((integration) => (
                    <tr
                      key={integration.slug}
                      className="transition-colors hover:bg-navy-50/50"
                    >
                      <td className="py-3 pr-4 font-medium text-navy-600">
                        {integration.name}
                      </td>
                      {Object.keys(COUNTRY_FLAGS).map((code) => (
                        <td key={code} className="py-3 text-center">
                          {integration.countries.includes(code) ? (
                            <span
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-forest-100 text-xs font-bold text-forest-700"
                              aria-label={`Available in ${code}`}
                            >
                              &#10003;
                            </span>
                          ) : (
                            <span
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-xs text-navy-300"
                              aria-label={`Not available in ${code}`}
                            >
                              &mdash;
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="gold-divider" />
      </div>

      {/* ============================================================ */}
      {/*  Side-by-side comparison                                     */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32" aria-label="Comparison">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              The difference
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              Before Marco Reid vs. after.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
            {/* Before */}
            <Reveal delay={0.05}>
              <div className="rounded-xl border-2 border-red-100 bg-red-50/30 p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Before Marco Reid
                </p>
                <ul className="mt-6 space-y-3 text-sm text-navy-500">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    Xero or QuickBooks for accounting &mdash; $25&ndash;75/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    Dext or Hubdoc for receipts &mdash; $20&ndash;60/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    Karbon or Canopy for practice management &mdash;
                    $30&ndash;70/mo/user
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    Ignition for engagement letters &mdash; $60&ndash;120/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    iPayroll or Gusto for payroll &mdash; $40&ndash;200/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    Fathom for reporting &mdash; $30&ndash;80/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    TaxDome for client portal &mdash; $30&ndash;80/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    Lacerte or TaxCalc for tax prep &mdash; $50&ndash;500/mo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-400" aria-hidden="true">
                      &times;
                    </span>
                    First AML for compliance &mdash; $50&ndash;200/mo
                  </li>
                </ul>
                <div className="mt-6 border-t border-red-200 pt-4">
                  <p className="text-sm font-semibold text-red-600">
                    Total: $500&ndash;$2,000+/month
                  </p>
                  <p className="mt-1 text-xs text-navy-400">
                    9+ logins. 9+ invoices. 9+ support teams.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* After */}
            <Reveal delay={0.1}>
              <div className="rounded-xl border-2 border-forest-200 bg-forest-50/30 p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                  After Marco Reid
                </p>
                <ul className="mt-6 space-y-3 text-sm text-navy-500">
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    Full double-entry accounting with chart of accounts
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    AI receipt capture and expense management
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    Client CRM, workflows, and engagement letters
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    Multi-jurisdiction payroll with direct filing
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    Financial dashboards and management reporting
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    Secure client portal with document sharing
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    GST/VAT, income tax, and provisional tax filing
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    AML/KYC compliance with immutable audit trail
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-forest-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    Time tracking, billing, and online payments
                  </li>
                </ul>
                <div className="mt-6 border-t border-forest-200 pt-4">
                  <p className="text-sm font-semibold text-forest-700">
                    Total: $149/month
                  </p>
                  <p className="mt-1 text-xs text-navy-400">
                    1 login. 1 invoice. 1 support team.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="gold-divider" />
      </div>

      {/* ============================================================ */}
      {/*  Why built-in beats integrations                             */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32" aria-label="Why built-in wins">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
              The philosophy
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-700">
              Built-in beats bolted-on. Every time.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-6">
            {[
              {
                title: "One source of truth",
                body: "When your ledger, tax engine, payroll, and client portal share the same database, there are no sync errors. No reconciliation nightmares. No data lost between systems. Every number is authoritative because there is only one number.",
              },
              {
                title: "No integration tax",
                body: "Accounting firms spend 5 to 10 hours per month troubleshooting integrations between Xero and Dext, Karbon and QuickBooks, TaxDome and Ignition. On Marco Reid, there is nothing to integrate. It is one system.",
              },
              {
                title: "Security without the sprawl",
                body: "Every additional SaaS vendor is another attack surface, another privacy policy, another data processor under GDPR and the NZ Privacy Act. One platform means one security perimeter, one audit trail, and one place to manage access.",
              },
              {
                title: "Upgrades ship to everyone",
                body: "When we improve the tax engine, every module that touches tax numbers benefits instantly. When we add a new jurisdiction to payroll, it appears across the entire platform. There are no version conflicts between vendors.",
              },
            ].map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover sm:p-8">
                  <h3 className="font-serif text-headline text-navy-700">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-navy-400">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/*  Final CTA                                                   */}
      {/* ============================================================ */}
      <section
        className="relative bg-navy-500 py-24 sm:py-32"
        aria-label="Get started"
      >
        <div className="gold-divider" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Stop paying for {replacedProducts.length} tools.
              <br />
              <span className="text-gold-300">Start with Marco Reid.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
              One platform. One bill. One login. Everything your accounting firm
              needs &mdash; from bank feeds to tax filings to client
              communication &mdash; included from day one.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm text-navy-300">
              Professional tier: $149/month &mdash; everything included
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/pricing" size="lg">
                See pricing
              </Button>
              <Button
                href="/accounting"
                size="lg"
                variant="ghost"
                className="text-white hover:text-navy-200"
              >
                Explore the platform &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================================================ */}
      {/*  Testimonial                                                 */}
      {/* ============================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28" aria-label="Testimonial">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <p className="text-4xl text-gold-400">&ldquo;</p>
            <p className="mt-2 font-serif text-xl italic leading-relaxed text-navy-600">
              We were paying $1,400 a month across Xero, Dext, Karbon, Ignition,
              iPayroll, and Fathom. Marco Reid replaced all six on day one. The
              savings alone paid for the entire team subscription.
            </p>
            <p className="mt-6 text-sm font-semibold text-navy-700">
              Sarah Chen, CA
            </p>
            <p className="text-xs text-navy-400">
              Director, Chen & Partners Chartered Accountants
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <FAQ
        items={[
          {
            question: "Do I really get all of these features for $149/month?",
            answer:
              "Yes. The Professional tier at $149/month includes every built-in module listed on this page: general ledger, AR/AP, bank reconciliation, tax filing, payroll, receipt capture, practice management, client portal, time tracking, financial reporting, management reporting, AML compliance, and audit trail. There are no per-module upcharges.",
          },
          {
            question: "What happens to my data from Xero or QuickBooks?",
            answer:
              "We provide a full data migration path from Xero, QuickBooks, MYOB, and Sage. Your chart of accounts, transaction history, client records, and outstanding invoices are imported automatically. Most firms complete migration in under a week.",
          },
          {
            question: "Is Marco Reid a certified Xero or QuickBooks replacement?",
            answer:
              "Marco Reid is a standalone, full-featured accounting platform. It does not depend on Xero or QuickBooks as a backend. It is a complete replacement with its own general ledger, tax engine, payroll processor, and bank feed infrastructure.",
          },
          {
            question: "Can I still use specific tools alongside Marco Reid?",
            answer:
              "Yes. For payment processing, we integrate with Stripe, GoCardless, Pinch Payments, and Square rather than replacing them. If you have a tool you prefer for a specific workflow, Marco Reid's open API allows data exchange. But the goal is to eliminate the need for separate tools entirely.",
          },
          {
            question: "Which countries are supported?",
            answer:
              "Marco Reid Accounting supports New Zealand, Australia, United Kingdom, United States, Canada, Ireland, and Singapore — with jurisdiction-specific tax calculations, payroll processing, and direct e-filing to the relevant tax authorities in each country.",
          },
          {
            question: "How does the immutable audit trail work?",
            answer:
              "Every action on the platform is recorded in a SHA-256 hash-chained audit log. Each entry references the hash of the previous entry, making it mathematically impossible to alter historical records without detection. This audit trail is court-admissible and satisfies regulatory requirements across all supported jurisdictions.",
          },
          {
            question: "What if I only need some of these features?",
            answer:
              "The Starter tier at $79/month includes core accounting, bank feeds, receipt scanning, and client management. You still get far more than any single competing product at that price point. As your firm grows, every additional capability is already there waiting — no new vendor to evaluate, no new integration to build.",
          },
        ]}
      />
    </>
  );
}
