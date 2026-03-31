"use client";

export default function VoiceMockup() {
  return (
    <div className="mockup-window mx-auto w-full">
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-[#ff5f57]" />
        <div className="mockup-dot bg-[#febc2e]" />
        <div className="mockup-dot bg-[#28c840]" />
        <div className="ml-4 flex-1">
          <div className="mx-auto w-48 rounded-md bg-navy-100 px-3 py-1 text-center text-xs text-navy-400">
            AlecRae &mdash; Email Composer
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Email header */}
        <div className="space-y-3 border-b border-navy-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-14 text-xs font-medium text-navy-400">To:</span>
            <span className="text-sm text-navy-700">Marcus Rodriguez &lt;m.rodriguez@email.com&gt;</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-14 text-xs font-medium text-navy-400">Subject:</span>
            <span className="text-sm font-medium text-navy-700">H-1B Status Update &mdash; I-129 Filing Confirmation</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-14 text-xs font-medium text-navy-400">Matter:</span>
            <span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-500">Rodriguez &mdash; H-1B Petition</span>
          </div>
        </div>

        {/* Email body */}
        <div className="mt-4 min-h-[140px] text-sm leading-relaxed text-navy-600">
          <p>Dear Mr. Rodriguez,</p>
          <p className="mt-3">
            I am writing to confirm that your Form I-129, Petition for
            Nonimmigrant Worker, was filed with USCIS on March 28, 2026.
            The current processing time for H-1B petitions at the Texas
            Service Center is approximately 8&ndash;14 months.
          </p>
          <p className="mt-3">
            We have requested premium processing under 8 CFR 214.2(h)(2)(i)(H),
            which will reduce the adjudication period to 15 calendar days.
            You should expect an initial response by
            <span className="typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-navy-500" />
          </p>
        </div>

        {/* Voice recording bar */}
        <div className="mt-6 flex items-center gap-4 rounded-xl border border-forest-200 bg-forest-50 px-5 py-4">
          <div className="flex h-8 items-end gap-[3px]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="waveform-bar w-[3px] rounded-full bg-forest-500"
                style={{
                  height: "100%",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-forest-700">
              AlecRae Voice &mdash; Recording
            </p>
            <p className="mt-0.5 text-xs text-forest-500">
              Legal vocabulary &middot; English &middot; Professional email mode
            </p>
          </div>
          <div className="relative h-10 w-10">
            <div className="pulse-ring absolute inset-0 rounded-full border-2 border-forest-400/50" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-500">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
