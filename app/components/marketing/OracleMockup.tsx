"use client";

export default function OracleMockup() {
  return (
    <div className="mockup-window mx-auto w-full">
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-red-500/80" />
        <div className="mockup-dot bg-yellow-500/80" />
        <div className="mockup-dot bg-green-500/80" />
        <span className="ml-3 text-xs text-text-tertiary">
          The Oracle &mdash; Research
        </span>
      </div>

      <div className="p-6">
        {/* Search bar */}
        <div className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface-subtle px-4 py-3">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-sm text-text-primary">
            California non-compete enforceability for tech employees
          </span>
          <span className="typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-accent" />
        </div>

        {/* Results */}
        <div className="mt-5 space-y-4">
          {/* Result 1 - Verified */}
          <div className="rounded-lg border border-surface-border bg-surface-raised p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  Edwards v. Arthur Andersen LLP (2008)
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  44 Cal.4th 937 &middot; Supreme Court of California
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Verified
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">
              California Business and Professions Code section 16600 prohibits
              non-compete agreements except in narrow statutory exceptions.
              Non-competition agreements are void regardless of reasonableness...
            </p>
            <div className="mt-3 flex gap-3">
              <span className="text-xs font-medium text-accent">
                Insert citation
              </span>
              <span className="text-xs font-medium text-text-tertiary">
                View full text
              </span>
            </div>
          </div>

          {/* Result 2 - Verified */}
          <div className="rounded-lg border border-surface-border bg-surface-raised p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  The Retirement Group v. Galante (2009)
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  176 Cal.App.4th 1226 &middot; Court of Appeal
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Verified
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">
              Reaffirmed Edwards: section 16600 represents a strong public
              policy of California in favor of open competition and employee
              mobility...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
