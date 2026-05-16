"use client";

import { useState } from "react";
import Link from "next/link";
import { BANK_FEED_PROVIDERS, type BankFeedProvider } from "@/lib/bank-feeds";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COUNTRY_FLAGS: Record<string, string> = {
  US: "\u{1F1FA}\u{1F1F8}",
  UK: "\u{1F1EC}\u{1F1E7}",
  AU: "\u{1F1E6}\u{1F1FA}",
  CA: "\u{1F1E8}\u{1F1E6}",
  NZ: "\u{1F1F3}\u{1F1FF}",
  EU: "\u{1F1EA}\u{1F1FA}",
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function ProviderCard({ provider }: { provider: BankFeedProvider }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 font-serif text-xl font-semibold text-navy-600 dark:bg-navy-700 dark:text-navy-300">
          {provider.logoPlaceholder}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-navy-700 dark:text-navy-200">
              {provider.name}
            </p>
            <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500 dark:bg-navy-700 dark:text-navy-400">
              Coming Soon
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {provider.countries.map((country) => (
              <span
                key={country}
                className="inline-flex items-center gap-1 rounded bg-navy-50 px-1.5 py-0.5 text-xs text-navy-500 dark:bg-navy-700 dark:text-navy-400"
              >
                <span role="img" aria-label={country}>
                  {COUNTRY_FLAGS[country] ?? country}
                </span>
                {country}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-navy-500 dark:text-navy-400">
            {provider.description}
          </p>
        </div>
      </div>

      <button
        disabled
        className="mt-5 w-full rounded-lg border border-navy-200 bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-400 dark:border-navy-600 dark:bg-navy-700 dark:text-navy-500"
      >
        Coming Soon
      </button>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 font-serif text-lg font-semibold text-white dark:bg-navy-400 dark:text-navy-950">
        {step}
      </div>
      <p className="mt-4 font-semibold text-navy-700 dark:text-navy-200">
        {title}
      </p>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
        {description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BankFeedsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Bank Feed Connections
          </h1>
          <p className="mt-2 text-navy-400 dark:text-navy-500">
            Connect your bank accounts for automatic transaction import and
            trust account reconciliation.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600 dark:hover:text-navy-300"
        >
          &larr; Dashboard
        </Link>
      </div>

      {/* Provider cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {BANK_FEED_PROVIDERS.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      {/* Connected Accounts */}
      <div className="mt-12">
        <h2 className="font-serif text-headline text-navy-800 dark:text-white">
          Connected Accounts
        </h2>
        <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            No bank accounts connected yet
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Connect a bank feed provider above to link your accounts.
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-12">
        <h2 className="font-serif text-headline text-navy-800 dark:text-white">
          Recent Transactions
        </h2>
        <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            Transactions will appear here once a bank is connected
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Imported transactions can be matched to matters and trust accounts
            for automatic reconciliation.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-12">
        <h2 className="font-serif text-headline text-navy-800 dark:text-white">
          How It Works
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StepCard
            step="1"
            title="Connect"
            description="Link your bank account securely through one of our trusted open banking providers. Your credentials are never stored on our servers."
          />
          <StepCard
            step="2"
            title="Sync"
            description="Transactions are imported automatically throughout the day. New deposits, withdrawals, and transfers appear in your feed within minutes."
          />
          <StepCard
            step="3"
            title="Reconcile"
            description="Match imported transactions to matters and trust accounts. Complete three-way trust reconciliation with a single click."
          />
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 rounded-2xl border border-plum-200 bg-plum-50/50 p-6 dark:border-plum-800 dark:bg-plum-950/30">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-plum-500 text-white">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path
                d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 7v4M10 13h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <p className="font-serif text-lg text-navy-700 dark:text-navy-200">
              Integrations in progress
            </p>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              Bank feed integrations are being finalised. Your accounts will sync
              automatically once connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
