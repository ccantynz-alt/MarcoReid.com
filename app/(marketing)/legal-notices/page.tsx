"use client";

import { useState } from "react";
import {
  DISCLAIMERS,
  LIABILITY_CAPS,
  GOVERNING_LAW,
  PROFESSIONAL_RESPONSIBILITY,
} from "@/lib/legal-disclaimers";
import Container from "@/app/components/shared/Container";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const JURISDICTIONS = ["NZ", "AU", "UK", "US", "CA"] as const;
type Jurisdiction = (typeof JURISDICTIONS)[number];

const JURISDICTION_LABELS: Record<Jurisdiction, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
  CA: "Canada",
};

// ---------------------------------------------------------------------------
// Tabs component
// ---------------------------------------------------------------------------

function JurisdictionTabs({
  active,
  onChange,
}: {
  active: Jurisdiction;
  onChange: (j: Jurisdiction) => void;
}) {
  return (
    <div className="flex rounded-lg border border-navy-200 dark:border-navy-600">
      {JURISDICTIONS.map((j) => (
        <button
          key={j}
          onClick={() => onChange(j)}
          className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
            active === j
              ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
              : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
          }`}
        >
          {j}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Disclaimer section
// ---------------------------------------------------------------------------

const DISCLAIMER_LABELS: Record<keyof typeof DISCLAIMERS, string> = {
  AI_RESEARCH: "AI Research Disclaimer",
  TRUST_ACCOUNTING: "Trust Accounting Disclaimer",
  ESIGNATURE: "E-Signature Disclaimer",
  TAX_FILING: "Tax Filing Disclaimer",
  PAYROLL: "Payroll Disclaimer",
  COURT_FILING: "Court E-Filing Disclaimer",
  CONFLICTS: "Conflict of Interest Disclaimer",
  REGULATORY_ALERTS: "Regulatory Alerts Disclaimer",
  PLATFORM: "General Platform Disclaimer",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LegalNoticesPage() {
  const [liabilityJurisdiction, setLiabilityJurisdiction] =
    useState<Jurisdiction>("NZ");
  const [responsibilityJurisdiction, setResponsibilityJurisdiction] =
    useState<Jurisdiction>("NZ");
  const [governingJurisdiction, setGoverningJurisdiction] =
    useState<Jurisdiction>("NZ");

  return (
    <Container narrow>
      <div className="py-16">
        {/* Header */}
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Legal Notices
          </h1>
          <p className="mt-3 text-lg text-navy-500 dark:text-navy-400">
            Marco Reid operates across New Zealand, Australia, the United
            Kingdom, the United States, and Canada, serving licensed legal and
            accounting professionals. This page consolidates all disclaimers,
            liability limitations, governing law provisions, and professional
            responsibility notices in one place.
          </p>
          <p className="mt-4 text-sm text-navy-400 dark:text-navy-500">
            Last updated: 16 May 2026
          </p>
        </div>

        {/* All Disclaimers */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
            Disclaimers
          </h2>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
            The following disclaimers apply to specific features and outputs of
            the Marco Reid platform.
          </p>

          <div className="mt-8 space-y-8">
            {(
              Object.entries(DISCLAIMERS) as [
                keyof typeof DISCLAIMERS,
                string,
              ][]
            ).map(([key, text]) => (
              <div
                key={key}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  {DISCLAIMER_LABELS[key]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Liability Limitations */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
            Liability Limitations
          </h2>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
            Jurisdiction-specific caps on aggregate liability. Select a
            jurisdiction to view the applicable clause.
          </p>

          <div className="mt-6">
            <JurisdictionTabs
              active={liabilityJurisdiction}
              onChange={setLiabilityJurisdiction}
            />
            <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                {JURISDICTION_LABELS[liabilityJurisdiction]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                {LIABILITY_CAPS[liabilityJurisdiction]}
              </p>
            </div>
          </div>
        </section>

        {/* Professional Responsibility */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
            Professional Responsibility Notices
          </h2>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
            Use of Marco Reid does not diminish or modify your professional
            obligations. Select a jurisdiction to view applicable professional
            conduct requirements.
          </p>

          <div className="mt-6">
            <JurisdictionTabs
              active={responsibilityJurisdiction}
              onChange={setResponsibilityJurisdiction}
            />
            <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                {JURISDICTION_LABELS[responsibilityJurisdiction]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                {PROFESSIONAL_RESPONSIBILITY[responsibilityJurisdiction]}
              </p>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
            Governing Law & Dispute Resolution
          </h2>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
            Applicable law and jurisdiction for dispute resolution based on your
            location.
          </p>

          <div className="mt-6">
            <JurisdictionTabs
              active={governingJurisdiction}
              onChange={setGoverningJurisdiction}
            />
            <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                {JURISDICTION_LABELS[governingJurisdiction]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                {GOVERNING_LAW[governingJurisdiction]}
              </p>
            </div>
          </div>
        </section>

        {/* General notice */}
        <section className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/40">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-900">
              !
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Important
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-300">
                This page is provided for transparency and informational purposes
                only. It does not constitute legal advice. For the complete and
                binding terms governing your use of Marco Reid, please refer to
                our{" "}
                <a
                  href="/terms"
                  className="font-medium underline hover:text-amber-900 dark:hover:text-amber-200"
                >
                  Terms of Service
                </a>
                ,{" "}
                <a
                  href="/privacy"
                  className="font-medium underline hover:text-amber-900 dark:hover:text-amber-200"
                >
                  Privacy Policy
                </a>
                , and{" "}
                <a
                  href="/acceptable-use"
                  className="font-medium underline hover:text-amber-900 dark:hover:text-amber-200"
                >
                  Acceptable Use Policy
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Footer spacer */}
        <div className="mt-16" />
      </div>
    </Container>
  );
}
