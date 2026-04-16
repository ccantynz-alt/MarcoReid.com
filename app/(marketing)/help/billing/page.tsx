import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Billing & subscriptions \u2014 Help centre",
  description:
    "Understand Marco Reid subscription tiers, manage payment methods through the Stripe portal, add seats, download invoices, and cancel.",
};

const tiers = [
  {
    name: "Solo",
    audience: "Independent attorneys and CPAs",
    desc: "Everything one practitioner needs: Marco research, matters, clients, one trust account, and voice dictation.",
    seats: "1 seat",
  },
  {
    name: "Firm",
    audience: "Small firms from two to twenty-five seats",
    desc: "Multi-seat pricing with role-based access, unlimited trust accounts, shared research, and conflict checking.",
    seats: "Per seat",
  },
  {
    name: "Scale",
    audience: "Mid-sized firms and multi-office practices",
    desc: "Everything in Firm plus SSO, advanced audit exports, custom retention policies, and a named success manager.",
    seats: "Per seat",
  },
];

const faqs = [
  {
    q: "How does per-seat pricing work?",
    a: "Each user with sign-in access to your firm workspace counts as one seat. Read-only external collaborators \u2014 for example, a client reviewing a document \u2014 are free. You add and remove seats at any time; the next invoice prorates for changes.",
  },
  {
    q: "Can I switch between monthly and annual billing?",
    a: "Yes. Annual billing is discounted roughly 15% compared with monthly. Switch either way from the Stripe billing portal; the change takes effect on your next renewal.",
  },
  {
    q: "What happens if my card is declined?",
    a: "Stripe retries the charge on a schedule. We email the billing contact after each failed attempt. Your access continues for 14 days from the first failure, after which the workspace is read-only until billing is resolved. Data is never deleted during this grace period.",
  },
  {
    q: "Do you issue refunds?",
    a: "New subscriptions are fully refundable within the first 14 days, no questions asked. Beyond that, we refund pro-rata for unused time when a firm cancels because of a material platform failure we can\u2019t resolve. Full details are on the refund policy page.",
  },
  {
    q: "Where do I download invoices?",
    a: "From Settings \u2192 Billing, click \u201cManage billing.\u201d The Stripe portal opens in a new tab with every invoice since your firm signed up, available as PDF or CSV. Tax receipts for eligible jurisdictions are attached automatically.",
  },
  {
    q: "Can I change the billing contact?",
    a: "Yes. A firm administrator can change the billing contact from Settings \u2192 Billing. Invoices and payment notifications go to that address. The billing contact does not need to be a seat-holder.",
  },
];

export default function BillingPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Help centre &middot; Billing
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Billing &amp; subscriptions.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Upgrade, add seats, manage payment methods, and understand how
            invoicing works.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Tiers">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Subscription tiers.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Three tiers cover independent practitioners through multi-office
              firms. You can move between them at any time.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    {t.seats}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-navy-800">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-navy-500">
                    {t.audience}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-navy-400">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-navy-400">
              Current prices are on the{" "}
              <Link
                href="/pricing"
                className="text-navy-600 underline-offset-4 hover:underline"
              >
                pricing page
              </Link>
              . Enterprise firms with more than fifty seats should contact us
              for custom terms.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Upgrade and downgrade">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Upgrading and downgrading.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Any firm administrator can change the subscription tier from
                Settings &rarr; Billing. Upgrades take effect immediately and
                new features unlock straight away. Your next invoice is
                prorated: we charge for the remainder of the current billing
                period at the new rate.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Downgrades take effect at the end of the current billing
                period, so you keep the features you paid for until renewal.
                If the lower tier doesn&rsquo;t support a feature you&rsquo;re
                actively using &mdash; for example, the number of trust
                accounts open &mdash; Marco warns you and gives you a chance
                to archive or consolidate before the downgrade completes.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Payment methods">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Managing payment methods.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Marco Reid uses Stripe for all billing. From Settings &rarr;
                Billing, click &ldquo;Manage billing&rdquo; to open the Stripe
                customer portal in a secure window. There you can add or
                remove cards, switch the default payment method, update the
                billing address, and download prior receipts.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                We accept major credit cards in every supported currency, and
                direct debit for firms on annual billing in the US, UK,
                Australia, and New Zealand. We do not store any card data on
                Marco Reid servers &mdash; Stripe holds the payment method and
                we only see a tokenised reference.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Invoices and receipts">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Invoices and receipts.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Every charge produces a PDF invoice emailed to the billing
                contact and archived in the Stripe portal. Invoices include
                your firm details, the seat count, the period billed, and any
                applicable tax. Tax receipts for GST (Australia and New
                Zealand), VAT (UK and EU), and US state sales tax are
                included automatically where required.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                If you need a custom invoice format, a purchase order
                reference, or a specific billing entity on the invoice,
                contact billing@marcoreid.com and we&rsquo;ll configure it
                for your workspace.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Refund policy">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Refund policy summary.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                New subscriptions are fully refundable within 14 days of
                initial purchase &mdash; no questions, no paperwork, just an
                email. After that, we refund pro-rata for unused time when a
                firm cancels because of a material platform issue we can&rsquo;t
                resolve. We do not refund for change of mind after the 14-day
                window, but we never lock anyone in: you can cancel at any
                time and keep access until the end of the billing period.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Full terms are on the{" "}
                <Link
                  href="/refunds"
                  className="text-navy-600 underline-offset-4 hover:underline"
                >
                  refund policy page
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Team seats">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Team seats and adding users.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Administrators add users from Settings &rarr; Team. Enter the
                person&rsquo;s email, choose a role (administrator, attorney,
                accountant, paralegal, bookkeeper, or custom), and send the
                invitation. The new seat appears on your next invoice,
                prorated from the day it was added.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Roles control what each seat can see and do. A paralegal
                might have full access to matters but no billing rights; a
                bookkeeper might have full access to billing and trust
                reconciliation but no matter substance. Custom roles let you
                define the exact permission set your firm needs.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Removing a user is immediate. Their session is terminated,
                their sign-in revoked, and the seat is released at the end of
                the billing period or reassignable straight away if you
                prefer.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Cancelling">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Cancelling your subscription.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Any administrator can cancel from Settings &rarr; Billing.
                Cancellation takes effect at the end of the current billing
                period; no final charge is issued. You retain full access
                until the period ends.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                After cancellation, your data enters a 30-day export window.
                You can download everything &mdash; matters, documents,
                research, trust records, audit logs &mdash; as a structured
                archive. After 30 days the workspace is permanently deleted,
                in line with our privacy commitments.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="FAQ">
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
              <div className="mt-16 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="font-serif text-xl text-navy-700">
                  Billing questions?
                </p>
                <p className="mt-2 text-navy-400">
                  Email{" "}
                  <a
                    href="mailto:billing@marcoreid.com"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    billing@marcoreid.com
                  </a>
                  {" "}or browse the rest of the{" "}
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
