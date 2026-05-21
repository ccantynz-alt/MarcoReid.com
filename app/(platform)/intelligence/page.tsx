"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  generateProactiveAlerts,
  type ProactiveAlert,
} from "@/lib/proactive-intelligence";
import LegalDisclaimer from "@/app/components/shared/LegalDisclaimer";

// ---------------------------------------------------------------------------
// Severity configuration
// ---------------------------------------------------------------------------

const SEVERITY_CONFIG: Record<
  ProactiveAlert["severity"],
  { label: string; badgeClass: string; borderClass: string; order: number }
> = {
  critical: {
    label: "Critical",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    borderClass: "border-l-4 border-l-red-500",
    order: 0,
  },
  warning: {
    label: "Warning",
    badgeClass:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    borderClass: "border-l-4 border-l-amber-500",
    order: 1,
  },
  info: {
    label: "Info",
    badgeClass:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    borderClass: "border-l-4 border-l-blue-500",
    order: 2,
  },
  opportunity: {
    label: "Opportunity",
    badgeClass:
      "bg-forest-50 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300",
    borderClass: "border-l-4 border-l-forest-500",
    order: 3,
  },
};

// ---------------------------------------------------------------------------
// Alert Card
// ---------------------------------------------------------------------------

function AlertCard({
  alert,
  onDismiss,
}: {
  alert: ProactiveAlert;
  onDismiss: (id: string) => void;
}) {
  const config = SEVERITY_CONFIG[alert.severity];

  return (
    <div
      className={`rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800 ${config.borderClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.badgeClass}`}
            >
              {config.label}
            </span>
            {alert.severity === "opportunity" && (
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-forest-500"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-2 11.66V16a2 2 0 002 2h0a2 2 0 002-2v-2.34A6 6 0 0010 2zm0 2a4 4 0 011.53 7.7.75.75 0 00-.53.72V14H9v-1.58a.75.75 0 00-.53-.72A4 4 0 0110 4z" />
              </svg>
            )}
          </div>
          <h3 className="mt-2 font-semibold text-navy-700 dark:text-navy-100">
            {alert.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-navy-500 dark:text-navy-400">
            {alert.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Link
          href={alert.actionUrl}
          className="inline-flex min-h-touch items-center gap-2 rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-navy-600 dark:bg-navy-400 dark:text-navy-950 dark:hover:bg-navy-300"
        >
          {alert.action}
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
            <path
              d="M7 5l6 5-6 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {alert.dismissible && (
          <button
            onClick={() => onDismiss(alert.id)}
            className="inline-flex min-h-touch items-center gap-1.5 rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-500 transition-all hover:border-navy-400 hover:text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-400 dark:hover:border-navy-500 dark:hover:text-navy-200"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path
                d="M6 6l8 8M14 6l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function IntelligencePage() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Generate alerts (simulated — in production this would come from an API)
  const allAlerts = useMemo(
    () =>
      generateProactiveAlerts({
        userId: "current-user",
        jurisdiction: "US",
        activeMatters: 7,
        upcomingDeadlines: 3,
        trustBalance: 34250,
        overdueInvoices: 2,
      }),
    [],
  );

  const visibleAlerts = useMemo(
    () => allAlerts.filter((a) => !dismissed.has(a.id)),
    [allAlerts, dismissed],
  );

  const sortedAlerts = useMemo(
    () =>
      [...visibleAlerts].sort(
        (a, b) =>
          SEVERITY_CONFIG[a.severity].order - SEVERITY_CONFIG[b.severity].order,
      ),
    [visibleAlerts],
  );

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
  };

  // Stats
  const criticalCount = visibleAlerts.filter(
    (a) => a.severity === "critical",
  ).length;
  const warningCount = visibleAlerts.filter(
    (a) => a.severity === "warning",
  ).length;
  const opportunityCount = visibleAlerts.filter(
    (a) => a.severity === "opportunity",
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Proactive Intelligence
          </h1>
          <p className="mt-2 text-lg text-navy-400 dark:text-navy-500">
            Marco monitors your practice and alerts you before problems arise.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600 dark:hover:text-navy-300"
        >
          &larr; Dashboard
        </Link>
      </div>

      {/* Stats bar */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-red-600 dark:text-red-400"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Critical
              </p>
              <p className="font-serif text-2xl text-red-600 dark:text-red-400">
                {criticalCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-amber-600 dark:text-amber-400"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 002 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Warnings
              </p>
              <p className="font-serif text-2xl text-amber-600 dark:text-amber-400">
                {warningCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-50 dark:bg-forest-900/40">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-forest-600 dark:text-forest-400"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-2 11.66V16a2 2 0 002 2h0a2 2 0 002-2v-2.34A6 6 0 0010 2zm0 2a4 4 0 011.53 7.7.75.75 0 00-.53.72V14H9v-1.58a.75.75 0 00-.53-.72A4 4 0 0110 4z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Opportunities
              </p>
              <p className="font-serif text-2xl text-forest-600 dark:text-forest-400">
                {opportunityCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts list */}
      <div className="mt-8 space-y-4">
        {sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onDismiss={handleDismiss} />
          ))
        ) : (
          <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
            <p className="font-serif text-lg text-navy-700 dark:text-navy-200">
              All clear.
            </p>
            <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
              No active alerts. Marco is monitoring your practice in the
              background.
            </p>
          </div>
        )}
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-navy-400 dark:text-navy-500">
        Proactive alerts are generated by monitoring your matters, deadlines,
        trust accounts, and regulatory feeds. In production, these run as
        background jobs with real-time data. Alerts do not constitute legal or
        professional advice.
      </p>
      <LegalDisclaimer type="REGULATORY_ALERTS" variant="footer" />
    </div>
  );
}
