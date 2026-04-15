import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every update, improvement, fix, and security patch shipped to the Marco Reid platform. Track what we are building for legal and accounting professionals.",
};

type Category = "Feature" | "Improvement" | "Fix" | "Security";

interface Entry {
  date: string;
  version: string;
  categories: Category[];
  title: string;
  description: string;
}

const entries: Entry[] = [
  {
    date: "April 12, 2026",
    version: "v2.4",
    categories: ["Feature"],
    title: "Marco cross-domain research for IP taxation",
    description:
      "You can now ask Marco legal and tax questions in a single query. Marco will reason across statutes, regulations, IRS revenue rulings, and case law simultaneously — and cite every source with pinpoint paragraph references. Available on Professional and Firm tiers.",
  },
  {
    date: "April 4, 2026",
    version: "v2.3.2",
    categories: ["Improvement"],
    title: "Faster trust ledger reconciliation",
    description:
      "Rebuilt the IOLTA reconciliation engine on a streaming diff. Month-end close on a 500-client ledger now runs in under 11 seconds, down from 3.4 minutes. Works across all 50 state trust rules.",
  },
  {
    date: "March 28, 2026",
    version: "v2.3.1",
    categories: ["Fix", "Security"],
    title: "Audit trail timestamp precision",
    description:
      "Increased audit trail timestamp resolution from millisecond to microsecond precision. Patched an edge case where two rapid edits in the same millisecond could share an identical signature. No data was at risk and no audit trails were affected in production.",
  },
  {
    date: "March 20, 2026",
    version: "v2.3",
    categories: ["Feature"],
    title: "Courtroom mode for iPad",
    description:
      "Courtroom mode now runs natively on iPad with on-device transcription and exhibit projection. Zero cloud round-trips during trial. Exhibits stream to the courtroom display over AirPlay with tamper-evident watermarking.",
  },
  {
    date: "March 11, 2026",
    version: "v2.2.4",
    categories: ["Improvement"],
    title: "Marco citations for NZ case law",
    description:
      "Marco now cites New Zealand case law with neutral citations and full parallel citation to NZLR, NZCA, and NZSC reports. Court of Appeal and Supreme Court judgments back to 2004 are indexed.",
  },
  {
    date: "March 3, 2026",
    version: "v2.2.3",
    categories: ["Security"],
    title: "FIDO2 passkey enrolment",
    description:
      "Passkeys are now supported as a primary authentication factor alongside hardware security keys. Device-bound credentials with biometric unlock on iOS, Android, macOS, and Windows. Recovery requires a second enrolled device or a signed recovery code.",
  },
  {
    date: "February 24, 2026",
    version: "v2.2.2",
    categories: ["Fix"],
    title: "Matter timer sync on reconnect",
    description:
      "Fixed a rare issue where matter timers running across a network drop could double-count the first 90 seconds after reconnect. Timers now reconcile against the server-authoritative ledger before resuming.",
  },
  {
    date: "February 17, 2026",
    version: "v2.2.1",
    categories: ["Improvement"],
    title: "Bulk conflict checks",
    description:
      "Conflict checks against imported client lists now run in parallel across 10,000 records per minute. Results surface in the matter intake flow in real time with relationship-graph context.",
  },
  {
    date: "February 10, 2026",
    version: "v2.2",
    categories: ["Feature"],
    title: "Voice dictation with speaker diarisation",
    description:
      "The dictation engine now separates speakers automatically for depositions, client interviews, and meetings up to eight participants. Each turn is attributed, timestamped, and cryptographically signed into the matter record.",
  },
  {
    date: "January 30, 2026",
    version: "v2.1.3",
    categories: ["Security", "Fix"],
    title: "Tightened session rotation on role change",
    description:
      "When a user's role or permissions change, all active sessions now rotate within 30 seconds rather than at next request. Closes a small window where a demoted user could complete an in-flight action under their previous permissions.",
  },
  {
    date: "January 22, 2026",
    version: "v2.1.2",
    categories: ["Improvement"],
    title: "Stripe invoice previews",
    description:
      "Client invoices now render a live Stripe preview inside the matter workspace before you send. WYSIWYG editing of line items, taxes, and trust application — with every change logged to the audit trail.",
  },
  {
    date: "January 14, 2026",
    version: "v2.1.1",
    categories: ["Fix"],
    title: "Calendar deadline calculation for federal holidays",
    description:
      "Court-rules calendaring now correctly shifts filing deadlines when the computed date falls on a federal holiday observed by the relevant court. Covers all US district courts and the nine circuit courts of appeal.",
  },
  {
    date: "January 8, 2026",
    version: "v2.1",
    categories: ["Feature"],
    title: "Marketplace for practice templates",
    description:
      "Firms can now publish and subscribe to practice templates — matter workflows, document libraries, and billing structures — curated by experienced practitioners. Every template ships with a verified provenance trail and opt-in revenue share.",
  },
  {
    date: "January 3, 2026",
    version: "v2.0.9",
    categories: ["Improvement"],
    title: "Faster document AI on long contracts",
    description:
      "Document AI now streams analysis on contracts over 200 pages with a first-paragraph response in under 2 seconds. Full clause extraction, redline summaries, and risk flags complete in under 25 seconds for a 500-page master services agreement.",
  },
];

const categoryStyles: Record<Category, string> = {
  Feature: "bg-forest-50 text-forest-600",
  Improvement: "bg-navy-50 text-navy-500",
  Fix: "bg-plum-50 text-plum-600",
  Security: "bg-gold/10 text-navy-700",
};

export default function ChangelogPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Changelog
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            What we shipped this week.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Every feature, improvement, fix, and security patch that reaches the
            Marco Reid platform &mdash; logged here the day it goes live.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm text-navy-400">
                Last updated: April 12, 2026
              </p>
            </Reveal>

            <div className="mt-16 space-y-16">
              {entries.map((entry, i) => (
                <Reveal key={entry.date + entry.version} delay={Math.min(i * 0.03, 0.3)}>
                  <article className="relative border-l-2 border-navy-100 pl-8 sm:pl-10">
                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-forest-500" />
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <time className="font-medium text-navy-700">{entry.date}</time>
                      <span className="text-navy-200">&middot;</span>
                      <span className="font-mono text-xs font-semibold text-navy-400">
                        {entry.version}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {entry.categories.map((c) => (
                          <span
                            key={c}
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${categoryStyles[c]}`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h2 className="mt-4 font-serif text-2xl leading-tight text-navy-800 sm:text-3xl">
                      {entry.title}
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-navy-500">
                      {entry.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-20 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Want changelog updates in your inbox?
                </p>
                <p className="mt-2 text-navy-400">
                  We send a concise monthly digest to firm administrators. Update your
                  notification preferences from your account settings, or email
                  hello@marcoreid.com to subscribe.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
