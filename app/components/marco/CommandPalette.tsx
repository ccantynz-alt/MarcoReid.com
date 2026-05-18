"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type {
  OracleDomain,
  OracleCitationResult,
  VerificationStatus,
} from "@/lib/oracle/types";
import { AI_DISCLAIMER } from "@/lib/constants";

/* ── Props ─────────────────────────────────────────────────────── */

interface CommandPaletteProps {
  onInsertCitation?: (citation: string) => void;
  className?: string;
}

/* ── Constants ─────────────────────────────────────────────────── */

const DOMAIN_OPTIONS: { value: OracleDomain; label: string }[] = [
  { value: "LEGAL", label: "Legal" },
  { value: "ACCOUNTING", label: "Accounting" },
  { value: "CROSS_DOMAIN", label: "Cross-Domain" },
  { value: "IP", label: "IP" },
];

interface QuickAction {
  label: string;
  query: string;
  domain: OracleDomain;
  icon: React.ReactNode;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Search case law...",
    query: "Search case law: ",
    domain: "LEGAL",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: "Look up IRC section...",
    query: "IRC Section ",
    domain: "ACCOUNTING",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Check trademark availability...",
    query: "Trademark search: ",
    domain: "IP",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Find accounting standard...",
    query: "Accounting standard: ",
    domain: "ACCOUNTING",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    label: "Voice input",
    query: "",
    domain: "CROSS_DOMAIN",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
];

const RECENT_QUERIES = [
  "California non-compete enforceability for tech employees",
  "Section 199A QBI deduction threshold 2026",
  "Immigration tax implications of H-1B LLC formation",
  "GAAP revenue recognition for SaaS contracts",
  "Trademark registration timeline and costs",
];

const VERIFICATION_BADGE: Record<
  VerificationStatus,
  { icon: string; label: string; classes: string }
> = {
  VERIFIED: {
    icon: "\u2713",
    label: "VERIFIED",
    classes:
      "bg-forest-50 text-forest-700 border-forest-200",
  },
  UNVERIFIED: {
    icon: "\u26A0",
    label: "UNVERIFIED",
    classes: "bg-amber-50 text-amber-600 border-amber-200",
  },
  NOT_FOUND: {
    icon: "\u2717",
    label: "NOT FOUND",
    classes: "bg-red-50 text-red-600 border-red-200",
  },
};

/* ── Mock results for demo until Oracle API integration ────────── */

const MOCK_RESULTS: OracleCitationResult[] = [
  {
    title: "Edwards v. Arthur Andersen LLP",
    citation: "44 Cal.4th 937 (2008)",
    sourceUrl: "https://www.courtlistener.com/opinion/edwards-v-arthur-andersen",
    sourceDb: "CourtListener",
    status: "VERIFIED",
    excerpt:
      "California Business and Professions Code section 16600 voids any contract that restrains anyone from engaging in a lawful profession, trade, or business. Non-compete agreements are generally unenforceable in California.",
    jurisdiction: "California",
    dateDecided: "2008-08-07",
  },
  {
    title: "The Retirement Group v. Galante",
    citation: "176 Cal.App.4th 1226 (2009)",
    sourceUrl: "https://www.courtlistener.com/opinion/retirement-group-v-galante",
    sourceDb: "CourtListener",
    status: "VERIFIED",
    excerpt:
      "The court reinforced that California public policy strongly favours open competition and employee mobility, invalidating broad non-solicitation provisions that function as de facto non-competes.",
    jurisdiction: "California",
    dateDecided: "2009-08-17",
  },
  {
    title: "Brown v. TechCorp Inc.",
    citation: "No. 2:23-cv-04821 (C.D. Cal. 2024)",
    sourceUrl: null,
    sourceDb: "None",
    status: "UNVERIFIED",
    excerpt:
      "Recent district court ruling applying Edwards to remote workers who signed non-compete agreements in other states but performed work primarily in California.",
    jurisdiction: "California",
    dateDecided: "2024-03-15",
  },
];

/* ── Component ─────────────────────────────────────────────────── */

export default function CommandPalette({
  onInsertCitation,
  className = "",
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] =
    useState<OracleDomain>("CROSS_DOMAIN");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OracleCitationResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* ── Keyboard shortcut: Cmd+K / Ctrl+K ──────────────────────── */

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ── Focus input when opening ────────────────────────────────── */

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow the animation to start before focusing
      const timeout = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timeout);
    }
    // Reset state when closing
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  }, [isOpen]);

  /* ── Focus trap within the palette ──────────────────────────── */

  useEffect(() => {
    if (!isOpen) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  /* ── Close handlers ──────────────────────────────────────────── */

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, close]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) close();
  }

  /* ── Search handler (mock until Oracle API) ──────────────────── */

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setHasSearched(true);
    setResults([]);

    // Simulate Oracle API latency (sub-3-second target)
    await new Promise((resolve) => setTimeout(resolve, 1400));

    setResults(MOCK_RESULTS);
    setIsLoading(false);
  }

  /* ── Insert citation ─────────────────────────────────────────── */

  function handleInsertCitation(citation: OracleCitationResult) {
    const formatted = `${citation.title}, ${citation.citation}`;
    onInsertCitation?.(formatted);
    close();
  }

  /* ── Quick action click ──────────────────────────────────────── */

  function handleQuickAction(action: QuickAction) {
    if (action.label === "Voice input") {
      // Voice input will be handled by Marco Reid Voice integration
      return;
    }
    setQuery(action.query);
    setSelectedDomain(action.domain);
    inputRef.current?.focus();
  }

  /* ── Recent query click ──────────────────────────────────────── */

  function handleRecentQuery(q: string) {
    setQuery(q);
    inputRef.current?.focus();
  }

  /* ── Render ──────────────────────────────────────────────────── */

  if (!isOpen) return null;

  const showEmptyState = !query.trim() && !hasSearched;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-start justify-center pt-[12vh] ${className}`}
      onClick={handleOverlayClick}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette — Ask Marco anything"
        className="relative z-10 w-full max-w-2xl animate-[fadeUp_0.2s_ease-out] rounded-2xl border border-white/10 bg-white/95 shadow-mockup backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(245,246,248,0.97) 100%)",
        }}
      >
        {/* ── Header / Search ─────────────────────────────────── */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center border-b border-navy-100 px-5">
            {/* Search icon */}
            <svg
              className="mr-3 h-5 w-5 shrink-0 text-navy-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Marco anything..."
              className="min-h-touch flex-1 bg-transparent py-4 text-base text-navy-700 placeholder:text-navy-300 focus:outline-none"
              autoComplete="off"
              spellCheck={false}
              aria-label="Search query"
            />

            {/* Keyboard shortcut badge */}
            <kbd className="ml-3 hidden shrink-0 rounded-md border border-navy-200 bg-navy-50 px-2 py-1 font-sans text-[11px] font-medium text-navy-400 sm:inline-block">
              esc
            </kbd>
          </div>
        </form>

        {/* ── Domain selector pills ───────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-navy-100 px-5 py-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-navy-400">
            Domain
          </span>
          <div className="flex gap-1.5" role="radiogroup" aria-label="Search domain">
            {DOMAIN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selectedDomain === opt.value}
                onClick={() => setSelectedDomain(opt.value)}
                className={`min-h-touch rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  selectedDomain === opt.value
                    ? "bg-navy-500 text-white shadow-sm"
                    : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <div
          className="overflow-y-auto px-5 py-4"
          style={{ maxHeight: "50vh" }}
        >
          {/* Empty state — recent queries + quick actions */}
          {showEmptyState && (
            <div className="space-y-6">
              {/* Recent queries */}
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-navy-400">
                  Recent queries
                </h3>
                <ul className="space-y-1">
                  {RECENT_QUERIES.map((rq) => (
                    <li key={rq}>
                      <button
                        type="button"
                        onClick={() => handleRecentQuery(rq)}
                        className="flex min-h-touch w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-navy-600 transition-colors hover:bg-navy-50"
                      >
                        <svg
                          className="h-4 w-4 shrink-0 text-navy-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="truncate">{rq}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick actions */}
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-navy-400">
                  Quick actions
                </h3>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => handleQuickAction(action)}
                      className="flex min-h-touch items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 text-left text-sm text-navy-600 shadow-card transition-all duration-150 hover:border-navy-200 hover:bg-navy-50 hover:shadow-card-hover"
                    >
                      <span className="shrink-0 text-navy-400">
                        {action.icon}
                      </span>
                      <span className="font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-navy-400" />
                </div>
                <span className="text-sm text-navy-500">
                  Marco is researching
                  <span className="typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-navy-500" />
                </span>
              </div>
              <p className="mt-3 text-xs text-navy-400">
                Searching authoritative public domain sources...
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading && hasSearched && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
                  {results.length} citation{results.length === 1 ? "" : "s"}{" "}
                  found
                </h3>
                <span className="rounded-full bg-plum-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-plum-600">
                  {DOMAIN_OPTIONS.find((d) => d.value === selectedDomain)?.label}
                </span>
              </div>

              <ul className="space-y-3">
                {results.map((result, idx) => {
                  const badge = VERIFICATION_BADGE[result.status];
                  return (
                    <li
                      key={`${result.citation}-${idx}`}
                      className="group rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-all duration-150 hover:border-navy-200 hover:shadow-card-hover"
                    >
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-navy-700">
                            {result.title}
                          </p>
                          <p className="mt-0.5 text-xs text-navy-400">
                            {result.citation}
                            {result.sourceDb && result.sourceDb !== "None"
                              ? ` \u00b7 ${result.sourceDb}`
                              : ""}
                            {result.jurisdiction
                              ? ` \u00b7 ${result.jurisdiction}`
                              : ""}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badge.classes}`}
                        >
                          {badge.icon} {badge.label}
                        </span>
                      </div>

                      {/* Excerpt */}
                      <p className="mt-2.5 text-sm leading-relaxed text-navy-600">
                        {result.excerpt}
                      </p>

                      {/* Action row */}
                      <div className="mt-3 flex items-center gap-3">
                        {result.sourceUrl && (
                          <a
                            href={result.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-touch inline-flex items-center rounded-lg px-3 py-2 text-xs font-semibold text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-700"
                          >
                            View source &rarr;
                          </a>
                        )}
                        {onInsertCitation && (
                          <button
                            type="button"
                            onClick={() => handleInsertCitation(result)}
                            disabled={result.status === "NOT_FOUND"}
                            className="ml-auto min-h-touch rounded-lg bg-forest-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-forest-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Insert Citation
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Hallucination warning */}
              <p className="text-[10px] italic leading-relaxed text-navy-300">
                Always verify every case citation before relying on it in any
                court filing or legal document. Marco Reid&apos;s citation
                verification system reduces hallucination risk but does not
                eliminate it. The professional responsibility for verifying
                citations rests with the attorney of record.
              </p>
            </div>
          )}

          {/* No results state */}
          {!isLoading && hasSearched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="font-serif text-lg text-navy-700">
                No citations found
              </p>
              <p className="mt-1 max-w-sm text-sm text-navy-400">
                Try refining your query or selecting a different domain. Marco
                searches authoritative public domain sources only.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-navy-100 px-5 py-3">
          <p className="max-w-md text-[10px] italic leading-relaxed text-navy-300">
            {AI_DISCLAIMER.slice(0, 120)}...
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-[10px] text-navy-400 sm:inline">
              <kbd className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-sans text-[10px]">
                Enter
              </kbd>{" "}
              to search
            </span>
            <span className="hidden text-[10px] text-navy-400 sm:inline">
              <kbd className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-sans text-[10px]">
                Esc
              </kbd>{" "}
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
