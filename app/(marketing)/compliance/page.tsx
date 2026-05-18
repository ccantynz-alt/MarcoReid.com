"use client";

import { useState } from "react";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";
import {
  COMPLIANCE_MATRIX,
  getComplianceScore,
  getCriticalBlockers,
  type ComplianceItem,
  type ComplianceStatus,
} from "@/lib/compliance";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Regulatory Compliance Matrix — Marco Reid",
  description:
    "How Marco Reid meets the legal, professional, and regulatory requirements in every jurisdiction we operate in.",
  url: `${BRAND.url}/compliance`,
};

const FLAGS: Record<string, string> = {
  NZ: "\u{1F1F3}\u{1F1FF}",
  AU: "\u{1F1E6}\u{1F1FA}",
  UK: "\u{1F1EC}\u{1F1E7}",
  US: "\u{1F1FA}\u{1F1F8}",
  CA: "\u{1F1E8}\u{1F1E6}",
};

const COUNTRY_ORDER = ["NZ", "AU", "UK", "US", "CA"];

const CATEGORY_LABELS: Record<string, { label: string; desc: string }> = {
  "data-privacy": { label: "Data Privacy", desc: "Privacy legislation, data residency, and cross-border transfer rules" },
  "professional-regulation": { label: "Professional Regulation", desc: "Law society, CPA body, and practitioner licensing requirements" },
  "financial-regulation": { label: "Financial Regulation", desc: "Financial services and banking regulations" },
  "ai-regulation": { label: "AI Regulation", desc: "Artificial intelligence governance and transparency requirements" },
  "consumer-protection": { label: "Consumer Protection", desc: "Consumer rights, auto-renewal, and unfair terms legislation" },
  "tax-authority": { label: "Tax Authority", desc: "Tax agent registration and revenue authority compliance" },
  "trust-accounting": { label: "Trust Accounting", desc: "Client trust money handling, reconciliation, and audit rules" },
  "aml-kyc": { label: "AML / KYC", desc: "Anti-money laundering, customer due diligence, and suspicious transaction reporting" },
};

function statusBadge(status: ComplianceStatus) {
  const map: Record<ComplianceStatus, { label: string; classes: string }> = {
    compliant: { label: "Compliant", classes: "bg-forest-50 text-forest-600" },
    "in-progress": { label: "In Progress", classes: "bg-amber-50 text-amber-700" },
    "not-started": { label: "Not Started", classes: "bg-red-50 text-red-600" },
    "not-applicable": { label: "N/A", classes: "bg-navy-50 text-navy-400" },
  };
  const s = map[status];
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${s.classes}`}>{s.label}</span>;
}

function riskBadge(risk: ComplianceItem["risk"]) {
  const map: Record<string, { classes: string }> = {
    critical: { classes: "bg-red-50 text-red-700" },
    high: { classes: "bg-orange-50 text-orange-700" },
    medium: { classes: "bg-amber-50 text-amber-700" },
    low: { classes: "bg-sky-50 text-sky-700" },
  };
  const r = map[risk];
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${r.classes}`}>{risk}</span>;
}

function scoreColor(pct: number) {
  if (pct > 60) return "border-forest-200 bg-forest-50";
  if (pct >= 30) return "border-amber-200 bg-amber-50";
  return "border-red-200 bg-red-50";
}

function scoreTextColor(pct: number) {
  if (pct > 60) return "text-forest-700";
  if (pct >= 30) return "text-amber-700";
  return "text-red-700";
}

/* ------------------------------------------------------------------ */
/*  Collapsible country section                                       */
/* ------------------------------------------------------------------ */
function CountrySection({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  const country = COMPLIANCE_MATRIX[code];
  if (!country) return null;
  const score = getComplianceScore(code);

  return (
    <div className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-navy-50"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{FLAGS[code]}</span>
          <h3 className="text-lg font-semibold text-navy-800">{country.name}</h3>
          <span className="text-sm text-navy-400">{country.items.length} requirements</span>
        </div>
        <svg
          className={`h-5 w-5 shrink-0 text-navy-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="overflow-x-auto border-t border-navy-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50">
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-400">Requirement</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-400">Category</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-400">Risk</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-400">Status</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {country.items.map((item) => (
                <tr key={item.requirement} className="border-b border-navy-50 last:border-0">
                  <td className="px-6 py-4 font-medium text-navy-700 max-w-xs">{item.requirement}</td>
                  <td className="px-6 py-4 text-navy-500 whitespace-nowrap">{CATEGORY_LABELS[item.category]?.label ?? item.category}</td>
                  <td className="px-6 py-4">{riskBadge(item.risk)}</td>
                  <td className="px-6 py-4">{statusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-navy-400 max-w-sm text-xs leading-relaxed">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Page                                                              */
/* ================================================================== */
export default function CompliancePage() {
  // Gather critical blockers grouped by country
  const blockers = COUNTRY_ORDER.map((code) => ({
    code,
    name: COMPLIANCE_MATRIX[code].name,
    items: getCriticalBlockers(code),
  })).filter((c) => c.items.length > 0);

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ---- Hero ---- */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">Compliance</p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Regulatory Compliance Matrix
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
            How Marco Reid meets the legal, professional, and regulatory requirements
            in every jurisdiction we operate in.
          </p>
        </Container>
      </section>

      {/* ---- Score cards ---- */}
      <section className="py-24 sm:py-36" aria-label="Compliance scores by country">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">Compliance at a glance.</h2>
            <p className="mt-4 text-lg text-navy-400">
              Current compliance posture across all five jurisdictions.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {COUNTRY_ORDER.map((code) => {
                const score = getComplianceScore(code);
                return (
                  <div
                    key={code}
                    className={`rounded-xl border p-6 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${scoreColor(score.percentage)}`}
                  >
                    <span className="text-3xl" aria-hidden="true">{FLAGS[code]}</span>
                    <p className="mt-2 font-semibold text-navy-800">{COMPLIANCE_MATRIX[code].name}</p>
                    <p className={`mt-3 text-3xl font-bold ${scoreTextColor(score.percentage)}`}>{score.percentage}%</p>
                    <p className="mt-1 text-sm text-navy-400">
                      {score.compliant} of {score.total} compliant
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ---- Critical blockers ---- */}
      {blockers.length > 0 && (
        <section className="bg-red-50 py-24 sm:py-36" aria-label="Critical blockers">
          <Container>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h2 className="font-serif text-display text-red-900">Critical blockers.</h2>
              </div>
              <p className="mt-4 max-w-2xl text-lg text-red-700">
                These critical-risk items must be resolved before launch in each jurisdiction.
              </p>
            </Reveal>

            <div className="mt-16 space-y-8">
              {blockers.map(({ code, name, items }) => (
                <Reveal key={code} delay={0.05}>
                  <div className="rounded-xl border border-red-200 bg-white p-6 shadow-card">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-navy-800">
                      <span aria-hidden="true">{FLAGS[code]}</span> {name}
                      <span className="ml-auto rounded-full bg-red-100 px-3 py-0.5 text-xs font-bold text-red-700">
                        {items.length} blocker{items.length !== 1 ? "s" : ""}
                      </span>
                    </h3>
                    <ul className="mt-4 divide-y divide-red-100">
                      {items.map((item) => (
                        <li key={item.requirement} className="py-4 first:pt-0 last:pb-0">
                          <p className="font-medium text-navy-700">{item.requirement}</p>
                          <p className="mt-1 text-sm text-navy-400">{item.description}</p>
                          <p className="mt-2 text-sm font-medium text-red-700">
                            Action: {item.action}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ---- Full matrix by country ---- */}
      <section className="py-24 sm:py-36" aria-label="Full compliance matrix">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">Full compliance matrix.</h2>
            <p className="mt-4 text-lg text-navy-400">
              Every regulatory requirement, organised by jurisdiction. Expand a country to review
              the complete list.
            </p>
          </Reveal>

          <div className="mt-16 space-y-4">
            {COUNTRY_ORDER.map((code) => (
              <Reveal key={code} delay={0.05}>
                <CountrySection code={code} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ---- Category legend ---- */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Category legend">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">Compliance categories.</h2>
            <p className="mt-4 text-lg text-navy-400">
              The eight domains we assess in every jurisdiction.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(CATEGORY_LABELS).map(([key, { label, desc }]) => (
                <div key={key} className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                  <p className="font-semibold text-navy-700">{label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---- CTA ---- */}
      <section className="py-24 sm:py-36" aria-label="Contact">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Questions about compliance?
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Contact our legal team for detailed compliance documentation or to discuss
              jurisdiction-specific requirements.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/contact" size="lg">Contact our legal team</Button>
              <Button href="/security" variant="secondary" size="lg">View security</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
