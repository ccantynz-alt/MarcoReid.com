"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Citation {
  title: string;
  citation: string;
  status: "VERIFIED" | "UNVERIFIED" | "NOT_FOUND";
  source: string;
  excerpt: string;
}

interface CommandPaletteProps {
  onInsertCitation?: (citation: string) => void;
  className?: string;
}

type Domain = "LEGAL" | "ACCOUNTING" | "CROSS_DOMAIN" | "IP";

const domains: { key: Domain; label: string }[] = [
  { key: "LEGAL", label: "Legal" },
  { key: "ACCOUNTING", label: "Accounting" },
  { key: "CROSS_DOMAIN", label: "Cross-Domain" },
  { key: "IP", label: "IP" },
];

const quickActions = [
  { icon: "⚖️", label: "Search case law...", query: "Find cases about " },
  { icon: "📋", label: "Look up IRC section...", query: "IRC § " },
  { icon: "™️", label: "Check trademark availability...", query: "Trademark search for " },
  { icon: "📊", label: "Find accounting standard...", query: "GAAP standard for " },
  { icon: "🔍", label: "Research regulation...", query: "Regulation regarding " },
];

const recentQueries = [
  "California non-compete enforceability after AB 1076",
  "IRC § 199A qualified business income deduction",
  "Patent claim construction standards post-Markman",
  "GAAP revenue recognition ASC 606",
];

const mockResults: Citation[] = [
  {
    title: "Edwards v. Arthur Andersen LLP",
    citation: "44 Cal.4th 937 (2008)",
    status: "VERIFIED",
    source: "CourtListener",
    excerpt:
      "California Business and Professions Code section 16600 voids any agreement that restrains anyone from engaging in a lawful profession, trade, or business.",
  },
  {
    title: "The Retirement Group v. Galante",
    citation: "176 Cal.App.4th 1226 (2009)",
    status: "VERIFIED",
    source: "CourtListener",
    excerpt:
      "Non-solicitation agreements are subject to the same prohibition as non-compete agreements under section 16600.",
  },
  {
    title: "Brown v. TGS-NOPEC Geophysical Co.",
    citation: "459 F.3d 1084 (2006)",
    status: "UNVERIFIED",
    source: "Pending verification",
    excerpt:
      "Trade secret misappropriation claims may survive even where non-compete agreements are unenforceable.",
  },
];

export default function CommandPalette({
  onInsertCitation,
  className = "",
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<Domain>("LEGAL");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Citation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  }, []);

  /* ⌘K / Ctrl+K toggle */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open, close]);

  /* Auto-focus input on open */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  /* Simulate a search */
  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;
      setIsLoading(true);
      setHasSearched(true);
      setResults([]);

      const timer = setTimeout(() => {
        setResults(mockResults);
        setIsLoading(false);
      }, 1200);

      return () => clearTimeout(timer);
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleInsert = (citation: Citation) => {
    onInsertCitation?.(
      `${citation.title}, ${citation.citation}`,
    );
    close();
  };

  const handleQuickAction = (actionQuery: string) => {
    setQuery(actionQuery);
    inputRef.current?.focus();
  };

  const handleRecent = (recentQuery: string) => {
    setQuery(recentQuery);
    handleSearch(recentQuery);
  };

  const statusBadge = (status: Citation["status"]) => {
    switch (status) {
      case "VERIFIED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold text-forest-600">
            ✓ Verified
          </span>
        );
      case "UNVERIFIED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
            ⚠ Unverified
          </span>
        );
      case "NOT_FOUND":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
            ✗ Not found
          </span>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-[15vh] ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Marco command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl animate-fade-up rounded-2xl border border-navy-200/60 bg-white shadow-2xl"
      >
        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex items-center border-b border-navy-100 px-5">
          <svg
            className="h-5 w-5 shrink-0 text-navy-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Marco anything..."
            className="flex-1 border-0 bg-transparent px-4 py-4 text-lg text-navy-700 placeholder-navy-300 outline-none"
          />
          <kbd className="hidden rounded border border-navy-200 bg-navy-50 px-2 py-0.5 text-xs text-navy-400 sm:inline-block">
            esc
          </kbd>
        </form>

        {/* Domain selector */}
        <div className="flex gap-1.5 border-b border-navy-100 px-5 py-2.5">
          {domains.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setSelectedDomain(d.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedDomain === d.key
                  ? "bg-navy-500 text-white"
                  : "text-navy-400 hover:bg-navy-50 hover:text-navy-600"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center gap-3 py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-navy-200 border-t-forest-500" />
              <p className="text-sm text-navy-400">
                Marco is researching<span className="typing-cursor">|</span>
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                {results.length} results
              </p>
              {results.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-100 bg-navy-50/50 p-4 transition-colors hover:border-forest-200 hover:bg-forest-50/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {statusBadge(r.status)}
                        <span className="text-xs text-navy-400">
                          {r.source}
                        </span>
                      </div>
                      <p className="mt-2 font-semibold text-navy-700">
                        {r.title}
                      </p>
                      <p className="text-sm text-navy-500">{r.citation}</p>
                      <p className="mt-2 text-sm leading-relaxed text-navy-400">
                        {r.excerpt}
                      </p>
                    </div>
                    {r.status === "VERIFIED" && (
                      <button
                        type="button"
                        onClick={() => handleInsert(r)}
                        className="shrink-0 rounded-lg bg-forest-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-forest-600"
                      >
                        Insert
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state — no search yet */}
          {!isLoading && !hasSearched && (
            <>
              {/* Quick actions */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Quick actions
                </p>
                <div className="mt-2 space-y-1">
                  {quickActions.map((a) => (
                    <button
                      key={a.label}
                      type="button"
                      onClick={() => handleQuickAction(a.query)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-navy-600 transition-colors hover:bg-navy-50"
                    >
                      <span className="text-base" aria-hidden="true">
                        {a.icon}
                      </span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent queries */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Recent
                </p>
                <div className="mt-2 space-y-1">
                  {recentQueries.map((rq) => (
                    <button
                      key={rq}
                      type="button"
                      onClick={() => handleRecent(rq)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-700"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-navy-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="truncate">{rq}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* No results */}
          {!isLoading && hasSearched && results.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-navy-400">
                No results found. Try a different query.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-navy-100 px-5 py-3">
          <p className="text-xs text-navy-300">
            Marco — AI research engine
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-navy-300">
              <kbd className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 text-[10px]">
                ↵
              </kbd>{" "}
              Search
            </span>
            <span className="text-xs text-navy-300">
              <kbd className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 text-[10px]">
                esc
              </kbd>{" "}
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
