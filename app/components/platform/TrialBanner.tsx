"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TrialStatus {
  isTrial: boolean;
  expired?: boolean;
  daysRemaining?: number;
}

export default function TrialBanner() {
  const [status, setStatus] = useState<TrialStatus | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed for this session
    const isDismissed =
      typeof document !== "undefined" &&
      document.cookie.includes("trial-banner-dismissed=1");
    if (isDismissed) {
      setDismissed(true);
      return;
    }

    fetch("/api/trial/status")
      .then((r) => r.json())
      .then((data: TrialStatus) => setStatus(data))
      .catch(() => {
        // Swallow — banner is non-critical
      });
  }, []);

  function dismiss() {
    // Set session cookie (no max-age = session lifetime)
    document.cookie =
      "trial-banner-dismissed=1; path=/; SameSite=Lax";
    setDismissed(true);
  }

  if (!status?.isTrial || dismissed) return null;

  // Expired trial — red banner, no dismiss
  if (status.expired) {
    return (
      <div
        role="alert"
        className="flex items-center justify-between gap-4 border-b border-red-300 bg-red-50 px-4 py-2.5 text-sm"
      >
        <span className="font-medium text-red-800">
          Your free trial has expired.
        </span>
        <Link
          href="/pricing"
          className="min-h-[44px] min-w-[44px] inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          Upgrade to continue &rarr;
        </Link>
      </div>
    );
  }

  // Active trial — gold banner with dismiss
  const days = status.daysRemaining ?? 0;
  const daysLabel =
    days === 1 ? "1 day remaining" : `${days} days remaining`;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2.5 text-sm">
      <span className="text-yellow-900">
        <span className="font-semibold">You are on a 14-day free trial</span>
        {" — "}
        <span>{daysLabel}</span>
      </span>
      <div className="flex items-center gap-2">
        <Link
          href="/pricing"
          className="min-h-[44px] inline-flex items-center rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2"
        >
          Upgrade now &rarr;
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss trial banner"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-yellow-700 transition-colors hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
