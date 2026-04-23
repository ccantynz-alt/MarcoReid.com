"use client";

export default function OracleMockup() {
  return (
    <div className="mockup-window mx-auto w-full">
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-[#ff5f57]" />
        <div className="mockup-dot bg-[#febc2e]" />
        <div className="mockup-dot bg-[#28c840]" />
        <div className="ml-4 flex-1">
          <div className="mx-auto w-48 rounded-md bg-navy-100 px-3 py-1 text-center text-xs text-navy-400">
            Marco &mdash; Research
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Search bar */}
        <div className="flex items-center gap-3 rounded-xl border border-navy-200 bg-navy-50 px-4 py-3.5">
          <svg className="h-5 w-5 text-navy-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-sm text-navy-600">
            California non-compete enforceability for tech employees earning over $200,000
          </span>
          <span className="typing-cursor ml-0.5 inline-block h-5 w-0.5 bg-navy-500" />
          <span className="ml-auto rounded-md bg-navy-100 px-2 py-0.5 text-xs text-navy-400">&#8984;K</span>
        </div>

        {/* Results label */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            3 results &middot; 1.2 seconds
          </p>
          <div className="flex gap-2">
            <span className="rounded-md bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-500">All</span>
            <span className="rounded-md px-2.5 py-1 text-xs text-navy-400">Cases</span>
            <span className="rounded-md px-2.5 py-1 text-xs text-navy-400">Statutes</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-4 space-y-3">
          {/* Result 1 */}
          <div className="rounded-xl border border-navy-100 bg-white p-4 transition-colors hover:bg-navy-50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold text-navy-700">
                  Edwards v. Arthur Andersen LLP (2008)
                </p>
                <p className="mt-1 text-xs text-navy-400">
                  44 Cal.4th 937 &middot; Supreme Court of California
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-600">
                <span className="h-2 w-2 rounded-full bg-forest-500" />
                Source extracted
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">
              California Business and Professions Code section 16600 prohibits
              non-compete agreements except in narrow statutory exceptions.
              Non-competition agreements are void and unenforceable regardless
              of reasonableness, reflecting California&rsquo;s strong public
              policy favoring employee mobility and open competition.
            </p>
            <div className="mt-4 flex gap-4">
              <span className="text-xs font-semibold text-navy-500 hover:text-navy-700">
                Insert citation
              </span>
              <span className="text-xs font-semibold text-navy-500 hover:text-navy-700">
                Insert summary
              </span>
              <span className="text-xs text-navy-400 hover:text-navy-500">
                View full text &rarr;
              </span>
            </div>
          </div>

          {/* Result 2 */}
          <div className="rounded-xl border border-navy-100 bg-white p-4 transition-colors hover:bg-navy-50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold text-navy-700">
                  The Retirement Group v. Galante (2009)
                </p>
                <p className="mt-1 text-xs text-navy-400">
                  176 Cal.App.4th 1226 &middot; Court of Appeal, Fourth District
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-600">
                <span className="h-2 w-2 rounded-full bg-forest-500" />
                Source extracted
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">
              Reaffirmed Edwards: section 16600 represents a strong public
              policy of California in favour of open competition and employee
              mobility. Non-solicitation agreements are also unenforceable
              as de facto non-compete agreements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
