"use client";

import { useState, useEffect, useCallback } from "react";
import { REGULATORY_FEEDS, type RegulatoryFeed } from "@/lib/regulatory-feeds";
import { JURISDICTIONS } from "@/lib/jurisdictions";

type FeedType = "all" | "legislation" | "tax" | "regulation" | "consultation";
type Country = "all" | "NZ" | "AU" | "UK" | "US" | "CA";

const COUNTRY_TABS: { value: Country; label: string }[] = [
  { value: "all", label: "All" },
  { value: "NZ", label: "New Zealand" },
  { value: "AU", label: "Australia" },
  { value: "UK", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
];

const TYPE_FILTERS: { value: FeedType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "legislation", label: "Legislation" },
  { value: "tax", label: "Tax" },
  { value: "regulation", label: "Regulation" },
  { value: "consultation", label: "Consultation" },
];

const TYPE_BADGE_STYLES: Record<string, string> = {
  legislation: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  tax: "bg-forest-50 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300",
  regulation: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  consultation: "bg-plum-50 text-plum-700 dark:bg-plum-900/40 dark:text-plum-300",
};

const STORAGE_KEY = "marco-reid-monitored-feeds";

function getMonitoredFeeds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {
    // ignore parse errors
  }
  return new Set();
}

function saveMonitoredFeeds(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore storage errors
  }
}

function FeedCard({
  feed,
  monitored,
  onToggle,
}: {
  feed: RegulatoryFeed;
  monitored: boolean;
  onToggle: (id: string) => void;
}) {
  const jurisdiction = JURISDICTIONS[feed.country];
  const flag = jurisdiction?.flag ?? feed.country;

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg" aria-label={jurisdiction?.name ?? feed.country}>
              {flag}
            </span>
            <h3 className="truncate font-semibold text-navy-700 dark:text-navy-100">
              {feed.source}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TYPE_BADGE_STYLES[feed.type]}`}
            >
              {feed.type}
            </span>
          </div>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
            {feed.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href={feed.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-plum-600 transition-colors hover:text-plum-700 dark:text-plum-400 dark:hover:text-plum-300"
        >
          View Source
          <span className="ml-1" aria-hidden="true">&rarr;</span>
        </a>

        <button
          onClick={() => onToggle(feed.id)}
          className={`inline-flex min-h-touch items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            monitored
              ? "border border-forest-300 bg-forest-50 text-forest-700 hover:bg-forest-100 dark:border-forest-600 dark:bg-forest-900/30 dark:text-forest-300 dark:hover:bg-forest-900/50"
              : "border border-navy-200 bg-white text-navy-500 hover:border-navy-400 hover:text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-400 dark:hover:border-navy-500 dark:hover:text-navy-200"
          }`}
          aria-pressed={monitored}
        >
          {monitored ? (
            <>
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M5 10l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Monitoring
            </>
          ) : (
            <>
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M10 3a1 1 0 011 1v2.07A7.003 7.003 0 0117 13v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1a7.003 7.003 0 016-6.93V4a1 1 0 011-1z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 17a2 2 0 004 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Monitor
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function AlertsClient() {
  const [country, setCountry] = useState<Country>("all");
  const [type, setType] = useState<FeedType>("all");
  const [monitored, setMonitored] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMonitored(getMonitoredFeeds());
  }, []);

  const handleToggle = useCallback((id: string) => {
    setMonitored((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveMonitoredFeeds(next);
      return next;
    });
  }, []);

  const filtered = REGULATORY_FEEDS.filter((feed) => {
    if (country !== "all" && feed.country !== country) return false;
    if (type !== "all" && feed.type !== type) return false;
    return true;
  });

  return (
    <>
      {/* Jurisdiction tabs */}
      <div className="flex flex-wrap gap-2">
        {COUNTRY_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCountry(tab.value)}
            className={`min-h-touch rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              country === tab.value
                ? "bg-navy-500 text-white shadow-sm dark:bg-navy-400 dark:text-navy-950"
                : "border border-navy-200 bg-white text-navy-500 hover:border-navy-400 hover:text-navy-700 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-400 dark:hover:border-navy-500 dark:hover:text-navy-200"
            }`}
          >
            {tab.value !== "all" && JURISDICTIONS[tab.value] && (
              <span className="mr-1.5">{JURISDICTIONS[tab.value].flag}</span>
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Type filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {TYPE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setType(filter.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              type === filter.value
                ? filter.value === "all"
                  ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                  : filter.value === "legislation"
                    ? "bg-blue-600 text-white"
                    : filter.value === "tax"
                      ? "bg-forest-600 text-white"
                      : filter.value === "regulation"
                        ? "bg-amber-600 text-white"
                        : "bg-plum-600 text-white"
                : "border border-navy-200 bg-white text-navy-500 hover:border-navy-400 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-400 dark:hover:border-navy-500"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Feed cards */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((feed) => (
            <FeedCard
              key={feed.id}
              feed={feed}
              monitored={monitored.has(feed.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-200">
            No feeds match your filters.
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Try selecting a different jurisdiction or feed type.
          </p>
        </div>
      )}

      {/* Footer note */}
      <p className="mt-8 text-xs text-navy-400 dark:text-navy-500">
        Live feed monitoring coming soon. When activated, Marco will analyse new
        publications and alert you when changes affect your practice areas and
        active matters.
      </p>
    </>
  );
}
