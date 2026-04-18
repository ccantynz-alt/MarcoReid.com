import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Trust accounts & IOLTA \u2014 Help centre",
  description:
    "How Marco Reid handles IOLTA compliance, trust account setup, three-way reconciliation, audit trails, and state-specific rules.",
};

const responsibilities = [
  {
    title: "What Marco Reid handles",
    items: [
      "Segregated ledger for every matter and client",
      "Three-way reconciliation engine with automated flagging",
      "Immutable, cryptographically signed audit trail",
      "Reporting packs formatted for bar examiners",
      "Alerts for commingling, negative balances, and stale funds",
    ],
  },
  {
    title: "What you handle at the bank",
    items: [
      "Opening the IOLTA or pooled trust account itself",
      "Registering the account with your state bar",
      "Ensuring interest remits to the correct legal aid foundation",
      "Signing cheques and authorising wires within bank rules",
      "Responding to any audit or disciplinary enquiry",
    ],
  },
];

const reconciliationSteps = [
  {
    label: "Bank statement",
    desc: "The ending balance reported by the bank on the statement date.",
  },
  {
    label: "Trust ledger",
    desc: "The sum of every transaction recorded in Marco Reid through the same date.",
  },
  {
    label: "Client ledgers",
    desc: "The sum of every individual client\u2019s sub-ledger on the same date.",
  },
];

const faqs = [
  {
    q: "Does Marco Reid connect to my trust bank account directly?",
    a: "Yes, via read-only bank feeds where your bank supports them. We never initiate transfers. Where feeds aren\u2019t available you can upload statements in CSV or OFX format and Marco reconciles from the file.",
  },
  {
    q: "What happens if reconciliation fails?",
    a: "Marco flags the specific discrepancy \u2014 a missing deposit, a cheque that cleared at a different amount, a duplicate entry \u2014 and holds the reconciliation open until you resolve it. Nothing is ever auto-corrected in the trust ledger.",
  },
  {
    q: "Can I have more than one trust account?",
    a: "Yes. Firms commonly run a pooled IOLTA for small client balances and one or more individual non-IOLTA trust accounts for larger balances that earn interest for the client. Marco Reid supports both, with separate reconciliation for each.",
  },
  {
    q: "How long are trust records retained?",
    a: "Indefinitely by default, because most state bars require retention for five to seven years after matter closure and many firms keep them longer. You can configure a retention policy per jurisdiction, but Marco will never let you purge records that violate the applicable rule.",
  },
  {
    q: "Is the audit trail really tamper-evident?",
    a: "Yes. Every entry is cryptographically signed and chained to the prior entry. If any record is modified outside the normal application flow \u2014 by a database administrator or a compromised system \u2014 the chain breaks and Marco flags it. Integrity is mathematically provable, not just policy-based.",
  },
  {
    q: "What if my state has unusual rules?",
    a: "Trust accounting rules vary significantly by jurisdiction. Marco Reid encodes the rules we have verified with a legal-tech attorney for each state; where a rule is unclear, Marco presents the conservative interpretation and links to the state bar\u2019s guidance. For jurisdictions we haven\u2019t finalised, see the state-specific rules section above.",
  },
  {
    q: "Can I give my bookkeeper access to trust accounts only?",
    a: "Yes. Seat roles are granular. A bookkeeper can be scoped to trust accounts, billing, and reconciliation without access to matter substance, client communications, or research.",
  },
  {
    q: "What if I discover a historical error?",
    a: "You cannot alter a historical entry \u2014 that would defeat the audit trail. Instead you record a correcting entry with a note explaining the correction. Marco produces a corrected reconciliation and preserves the original in the audit log. This is the behaviour bar examiners expect.",
  },
];

export default function TrustAccountsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Help centre &middot; Trust accounts
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Trust accounts &amp; IOLTA.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Record client funds, run three-way reconciliation, and keep an
            audit-ready trail for every cent.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="IOLTA overview">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              IOLTA compliance at a glance.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Marco Reid handles the ledger, the reconciliation, and the audit
              trail. Your bank and your bar handle the account itself.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {responsibilities.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <h3 className="font-serif text-xl text-navy-800">
                    {r.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {r.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-navy-500"
                      >
                        <span
                          aria-hidden
                          className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Creating a trust account">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Creating a trust account.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Open Settings &rarr; Trust accounts and click &ldquo;Add
                account.&rdquo; Choose the account type (IOLTA pooled or
                non-IOLTA individual), enter the bank name, the last four
                digits of the account number, and the statement day of month.
                Upload a voided cheque or bank letter to confirm the account.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Connect a bank feed if your institution supports it &mdash; we
                partner with Plaid and Akoya for US coverage, BankFeeds for
                Australia and New Zealand, and Open Banking for the UK. If no
                feed is available, statements can be uploaded monthly in CSV
                or OFX format.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                The first reconciliation establishes the opening balance.
                After that, every transaction must flow through Marco Reid to
                keep the ledger complete.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Deposits and withdrawals">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Recording deposits and withdrawals.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Every trust transaction is tied to a matter and a client. From
                the matter, click &ldquo;Record trust activity&rdquo; and
                choose deposit, withdrawal, or transfer. Marco enforces the
                client&rsquo;s available balance before the transaction is
                saved &mdash; you cannot disburse more than the client has on
                deposit.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Transfers between a trust account and the firm&rsquo;s
                operating account require an invoice reference. Marco links
                the invoice, the time entries, and the disbursement together
                so that earned-fee transfers are documented from matter to
                bank.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Cheques printed from Marco Reid include a traceable reference
                number that reappears on the bank statement and closes the
                loop during reconciliation.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Three-way reconciliation">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Three-way reconciliation.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Three balances must agree at every reconciliation date. If any
              two disagree, something is wrong.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {reconciliationSteps.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-plum-500">
                    Source {i + 1}
                  </p>
                  <h3 className="mt-4 font-serif text-xl text-navy-800">
                    {s.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <p className="text-lg leading-relaxed text-navy-500">
                Marco runs reconciliation automatically on your statement date
                and presents the three numbers side by side. If they match,
                you sign off and the reconciliation is sealed into the audit
                trail. If they don&rsquo;t, Marco lists every candidate
                discrepancy &mdash; missing deposits, unmatched cheques,
                amount mismatches &mdash; with suggested fixes. You resolve
                each one and re-run until all three numbers agree.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="State rules">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                State-specific rules.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Every state bar sets its own IOLTA rules: some require
                monthly reconciliation, some quarterly; some mandate a
                specific chart of accounts; some prohibit certain types of
                earned-fee transfers. Marco Reid encodes the rules we have
                verified with a legal-tech attorney for each state and
                applies them automatically when you choose that jurisdiction
                for a matter.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                The material on these pages is general guidance, not legal
                advice. For authoritative rules, consult your state bar and,
                where necessary, retain independent ethics counsel. Links to
                current state-bar trust accounting guidance are published in
                the app under Settings &rarr; Trust accounts &rarr;
                Jurisdiction rules.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Audit trail and reporting">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Audit trail and reporting.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Every action on a trust account &mdash; create, edit,
                reconcile, sign off &mdash; is written to an immutable,
                cryptographically signed audit log. The log captures the
                user, the timestamp, the IP address, and the device. Nothing
                can be deleted. Corrections are recorded as new entries with
                a reference to what they correct.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Standard reports include: monthly three-way reconciliation,
                client ledger statement, matter ledger statement, disbursement
                history, interest allocation (for non-pooled accounts), and a
                full audit-trail export in PDF or CSV. Reports are formatted
                to the conventions bar examiners expect and can be shared
                with a read-only link that expires.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="FAQ">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Frequently asked.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-10">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.03}>
                  <div>
                    <h3 className="font-serif text-xl text-navy-800">
                      {f.q}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-navy-500">
                      {f.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Not legal advice.
                </p>
                <p className="mt-2 text-navy-400">
                  This page is general guidance about how Marco Reid works.
                  It is not legal or ethics advice. For authoritative
                  trust-accounting rules in your jurisdiction, consult your
                  state bar or independent counsel. Questions about the
                  platform itself?{" "}
                  <a
                    href="mailto:support@marcoreid.com"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    support@marcoreid.com
                  </a>
                  {" "}or the{" "}
                  <Link
                    href="/help"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    help centre
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
