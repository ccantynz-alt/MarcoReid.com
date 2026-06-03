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
    "Track the progress of your document through professional review. See exactly where your application is in the pipeline.",
};

const FAQ_ITEMS = [
  {
    q: "How long does professional review take?",
    a: "Most documents are reviewed within 1–3 business days. Immigration and corporate documents can take up to 5 business days depending on complexity. You will receive an email notification at every stage change.",
  },
  {
    q: "What happens if the professional requests amendments?",
    a: "You will receive an email with the professional's marked-up version and their notes. You can accept the changes, provide clarifications, or upload additional information. The document is then re-reviewed and signed.",
  },
  {
    q: "Is my document and personal information secure?",
    a: "Yes. All documents are encrypted at rest (AES-256) and in transit (TLS 1.3). Only the assigned professional and authorised Marco Reid staff can view your document. We do not share your information with third parties. See our Privacy Policy and Trust Center for full details.",
  },
  {
    q: "Can I change my document after submitting?",
    a: "Once submitted for review, the document is locked to preserve the version the professional is reviewing. If changes are needed, the professional can request amendments or you can start a new draft. Contact support if you have an urgent correction.",
  },
];

export default function TrackPage({
  params,
}: {
  params: Promise<{ draftId: string }>;
}) {
  void params;

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Minimal header */}
      <header className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl text-navy-600 hover:text-navy-800 transition-colors"
          >
            <span className="text-gold-500 text-2xl" aria-hidden="true">
              &diams;
            </span>
            Marco Reid
          </Link>
          <Link
            href="/generate"
            className="text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
          >
            &larr; Generate another document
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            Application Status
          </p>
          <h1 className="mt-3 font-serif text-3xl text-navy-800 sm:text-4xl">
            Track your document
          </h1>
          <p className="mt-3 text-navy-500">
            See exactly where your application is in the professional review
            pipeline.
          </p>
        </div>

        {/* Tracker */}
        <ApplicationTracker
          status="PENDING"
          jurisdiction="New Zealand"
          documentType="Tenancy Agreement"
          lastUpdated={new Date().toISOString()}
        />

        {/* FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <h2 className="font-serif text-2xl text-navy-800">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group px-6 py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-navy-700 hover:text-navy-900">
                  {item.q}
                  <svg
                    className="h-4 w-4 shrink-0 text-navy-400 transition-transform group-open:rotate-180"
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
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* AI disclaimer */}
        <div className="mt-10 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4 text-xs leading-relaxed text-gold-800">
          <span className="font-bold">AI disclaimer — </span>
          This content is generated by AI for research and informational
          purposes only. It does not constitute legal advice, tax advice, or
          professional advice of any kind. It does not create an
          attorney-client or accountant-client relationship. Always verify
          AI-generated content with a qualified professional before reliance.
          Marco Reid is a tool for professionals, not a substitute for
          professional judgment.
        </div>

        {/* Trust footnote */}
        <p className="mt-6 text-center text-xs text-navy-400">
          All documents are encrypted at rest and in transit &middot;{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-navy-600 transition-colors"
          >
            Privacy Policy
          </Link>{" "}
          &middot;{" "}
          <Link
            href="/trust-center"
            className="underline underline-offset-2 hover:text-navy-600 transition-colors"
          >
            Trust Center
          </Link>
        </p>
      </main>
    </div>
  );
}
