import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const ApplicationTracker = dynamic(
  () => import("@/app/components/marketing/ApplicationTracker"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "Track Your Application | Marco Reid",
  description:
    "Track the progress of your document through the Marco Reid professional review pipeline. See real-time status updates from submission through to professional sign-off.",
};

const FAQ_ITEMS = [
  {
    q: "How long does professional review take?",
    a: "Most documents are reviewed within 1–3 business days. Immigration and corporate documents can take up to 5 business days depending on complexity. You will receive an email notification at every stage change — no need to refresh this page manually.",
  },
  {
    q: "What happens if the professional requests amendments?",
    a: "You will receive an email with the professional's marked-up version and their notes. You can accept the changes, provide clarifications, or upload additional information. The document returns to the professional for a final review once you resubmit.",
  },
  {
    q: "Is my document and personal information secure?",
    a: "Yes. All documents are encrypted at rest (AES-256) and in transit (TLS 1.3). Only the assigned professional and authorised Marco Reid staff can view your document. We do not share your information with third parties. See our Privacy Policy for full details.",
  },
  {
    q: "Can I change my document after submitting?",
    a: "Once submitted for review, the document is locked to preserve the exact version the professional is reviewing. If changes are needed before review begins, contact support immediately. Otherwise, the professional can request amendments as part of the standard review process.",
  },
];

export default async function TrackPage({
  params,
}: {
  params: Promise<{ draftId: string }>;
}) {
  const { draftId } = await params;

  return (
    <div className="min-h-screen bg-navy-50">
      {/* ── Minimal header ── */}
      <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900 transition-colors min-h-[44px]"
            aria-label="Marco Reid — return to homepage"
          >
            <span className="text-gold-500 text-lg leading-none" aria-hidden="true">
              ◆
            </span>
            Marco Reid
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50 hover:text-navy-700 transition-colors min-h-[44px]"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                clipRule="evenodd"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        {/* ── Page heading ── */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            Application Status
          </p>
          <h1 className="mt-3 font-serif text-4xl text-navy-800 sm:text-5xl">
            Track your document
          </h1>
          <p className="mt-3 text-lg text-navy-500 max-w-xl">
            Track the progress of your document through our professional review
            pipeline.
          </p>
          <p className="mt-2 text-sm text-navy-400">
            Reference:{" "}
            <span className="font-semibold text-navy-600 font-mono">{draftId}</span>
          </p>
        </div>

        {/* ── Tracker card ── */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-10 shadow-[var(--shadow-card)]">
          <ApplicationTracker
            status="PENDING"
            jurisdiction="New Zealand"
            documentType="Tenancy Agreement"
            lastUpdated={new Date().toISOString()}
          />
        </div>

        {/* ── FAQ ── */}
        <section className="mt-16" aria-label="Frequently asked questions about the review pipeline">
          <h2 className="font-serif text-2xl text-navy-800 sm:text-3xl">
            What happens at each stage?
          </h2>
          <p className="mt-2 text-navy-400">
            Everything you need to know about the Marco Reid document review
            pipeline.
          </p>

          <div className="mt-6 divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white overflow-hidden">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group px-6">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-navy-700 hover:text-navy-900">
                  <span>{item.q}</span>
                  <svg
                    className="h-4 w-4 shrink-0 text-navy-400 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-navy-500">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── AI disclaimer ── */}
        <div className="mt-10 rounded-xl border border-navy-100 bg-navy-50 px-5 py-4 text-xs leading-relaxed text-navy-500">
          <span className="font-semibold text-navy-600">AI disclaimer — </span>
          This content is generated by AI for research and informational
          purposes only. It does not constitute legal advice, tax advice, or
          professional advice of any kind. Always verify AI-generated content
          with a qualified professional before reliance. Marco Reid is a tool
          for professionals, not a substitute for professional judgment.
        </div>

        {/* ── Trust footnote ── */}
        <p className="mt-6 text-center text-xs text-navy-400">
          All documents are encrypted at rest and in transit &middot;{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-navy-600 transition-colors"
          >
            Privacy Policy
          </Link>
          {" "}&middot;{" "}
          <Link
            href="/security"
            className="underline underline-offset-2 hover:text-navy-600 transition-colors"
          >
            Security
          </Link>
        </p>
      </main>
    </div>
  );
}
