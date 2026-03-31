"use client";

export default function VoiceMockup() {
  return (
    <div className="mockup-window mx-auto max-w-2xl">
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-red-500/80" />
        <div className="mockup-dot bg-yellow-500/80" />
        <div className="mockup-dot bg-green-500/80" />
        <span className="ml-3 text-xs text-text-tertiary">
          AlecRae Voice &mdash; Email Composer
        </span>
      </div>

      <div className="p-6">
        {/* Email header */}
        <div className="space-y-3 border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <span className="w-12 text-xs text-text-tertiary">To:</span>
            <span className="text-sm text-text-primary">Marcus Rodriguez</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 text-xs text-text-tertiary">Subject:</span>
            <span className="text-sm text-text-primary">H-1B Status Update &mdash; I-129 Filing</span>
          </div>
        </div>

        {/* Email body being dictated */}
        <div className="mt-4 min-h-[120px] text-sm leading-relaxed text-text-secondary">
          <p>Dear Mr. Rodriguez,</p>
          <p className="mt-3">
            I am writing to confirm that your Form I-129, Petition for
            Nonimmigrant Worker, was filed with USCIS on March 28, 2026.
            The current processing time for H-1B petitions at the Texas
            Service Center is approximately 8&ndash;14 months.
          </p>
          <p className="mt-3 text-text-primary">
            We have requested premium processing under
            <span className="typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-accent" />
          </p>
        </div>

        {/* Voice recording indicator */}
        <div className="mt-6 flex items-center gap-4 rounded-xl border border-accent/30 bg-accent/5 px-5 py-4">
          {/* Animated waveform */}
          <div className="flex h-8 items-end gap-[3px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="waveform-bar w-[3px] rounded-full bg-accent"
                style={{
                  height: "100%",
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            ))}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-accent">
              Recording &mdash; AlecRae Voice
            </p>
            <p className="mt-0.5 text-xs text-text-tertiary">
              Legal vocabulary &middot; English &middot; Professional email mode
            </p>
          </div>
          <div className="relative h-10 w-10">
            <div className="pulse-ring absolute inset-0 rounded-full border-2 border-accent/50" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
