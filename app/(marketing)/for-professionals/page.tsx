import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import { formatFee } from "@/lib/marketplace/format";
import ProDemo from "./ProDemo";
import { MOCK_QUEUE } from "./mock-queue";

export const metadata: Metadata = {
  title: "For Professionals — AI drafts. You sign off. The billable hours you're not doing.",
  description:
    "A live pre-drafted matter queue for verified NZ & AU lawyers and accountants. Review in minutes, sign off, bank the fee. No client acquisition cost. No Saturdays.",
};

// Average net-to-pro from the mock queue — used in the payout maths section.
const avgNet = Math.round(
  MOCK_QUEUE.reduce((sum, m) => sum + m.leadFeeNetToProCents, 0) /
    MOCK_QUEUE.length,
);
const avgReview = Math.round(
  MOCK_QUEUE.reduce((sum, m) => sum + m.reviewMinutes, 0) / MOCK_QUEUE.length,
);

export default function ForProfessionalsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-forest-500/15 blur-[100px]" />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-wider text-gold-400">
              For verified professionals &middot; NZ &amp; AU
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The AI drafts.{" "}
              <span className="text-gold-300">You sign off.</span>
              <br />
              The billable hours you&rsquo;re not doing.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-100">
              A queue of pre-drafted matters — real citations, real
              jurisdiction, real clients who&rsquo;ve already paid. You review
              in minutes, approve or amend, and the fee lands in your account.
              Zero client acquisition cost. No admin. No Saturdays.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="#demo-queue">See the queue &rarr;</Button>
              <Button href="/pro-register" variant="secondary">
                Apply to join
              </Button>
            </div>
            <p className="mt-6 text-sm text-navy-200">
              Solo and small-firm lawyers and chartered accountants only.
              Verified admission, current PI, human sign-off on every matter.
            </p>
          </div>
        </Container>
      </section>

      {/* Positioning strip */}
      <section className="border-b border-navy-100 bg-white py-10">
        <Container>
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <p className="font-serif text-3xl text-navy-800">AI drafts</p>
              <p className="mt-1 text-sm text-navy-500">
                You don&rsquo;t — you review.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-navy-800">
                You sign off
              </p>
              <p className="mt-1 text-sm text-navy-500">
                Every matter. Tamper-evident hash. Your name on the advice.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-navy-800">
                We bring the clients
              </p>
              <p className="mt-1 text-sm text-navy-500">
                Already paid, already intake&rsquo;d, already screened.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Demo queue */}
      <section id="demo-queue" className="bg-navy-50 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              Live preview &middot; demo mode
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              This is what your queue looks like on Tuesday morning.
            </h2>
            <p className="mt-4 text-navy-500">
              Three matters, posted by NZ citizens in your practice area,
              already lead-fee paid, already AI-drafted with real statute
              citations. Click <strong>Review &rarr;</strong> on any card to
              see the full drafted output and the three actions you&rsquo;d
              take on a real matter.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <ProDemo />
          </div>
          <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-navy-400">
            Demo mode. No data is saved and nothing reaches a citizen.{" "}
            <Link
              href="/pro-register"
              className="font-semibold text-navy-600 underline hover:text-navy-800"
            >
              Join the verified pro network
            </Link>{" "}
            to do this for real.
          </p>
        </Container>
      </section>

      {/* Payout math */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              The maths
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              {avgReview} minutes of review.{" "}
              {formatFee(avgNet, "NZD")} in your account.
            </h2>
            <p className="mt-4 text-navy-500">
              No Google Ads. No partners&rsquo; meeting about the pipeline.
              No follow-up emails to leads who ghosted. Just a queue, a
              draft, and your sign-off.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-navy-100 bg-navy-50 shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-100/60 text-xs font-semibold uppercase tracking-wider text-navy-600">
                <tr>
                  <th className="px-5 py-3">Scenario</th>
                  <th className="px-5 py-3 text-right">Per matter</th>
                  <th className="px-5 py-3 text-right">Per week</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 text-navy-700">
                <tr>
                  <td className="px-5 py-4">
                    <p className="font-semibold">1 matter / day, 3 days/wk</p>
                    <p className="text-xs text-navy-400">
                      ~{avgReview} min review each &middot; ~{avgReview * 3}{" "}
                      min/wk
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right font-mono">
                    {formatFee(avgNet, "NZD")}
                  </td>
                  <td className="px-5 py-4 text-right font-mono">
                    {formatFee(avgNet * 3, "NZD")}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4">
                    <p className="font-semibold">2 matters / day, 5 days/wk</p>
                    <p className="text-xs text-navy-400">
                      ~{avgReview * 2} min review each &middot; ~
                      {avgReview * 10} min/wk
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right font-mono">
                    {formatFee(avgNet, "NZD")}
                  </td>
                  <td className="px-5 py-4 text-right font-mono">
                    {formatFee(avgNet * 10, "NZD")}
                  </td>
                </tr>
                <tr className="bg-gold-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-navy-800">
                      Full-desk: 3 matters / day, 5 days/wk
                    </p>
                    <p className="text-xs text-navy-500">
                      ~{avgReview * 3} min review/day &middot; ~
                      {Math.round((avgReview * 15) / 60)} hrs/wk total
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right font-mono">
                    {formatFee(avgNet, "NZD")}
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-gold-700">
                    {formatFee(avgNet * 15, "NZD")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-navy-400">
            Net to you after the 20% platform fee. Citizens pay the lead fee
            up front; your payout releases on sign-off. No chasing invoices.
          </p>
        </Container>
      </section>

      {/* Why this, why now */}
      <section className="bg-navy-50 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              The honest pitch
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              AI isn&rsquo;t replacing you. It&rsquo;s removing the 90% of
              your day you hate.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="font-serif text-lg text-navy-800">
                  No client acquisition cost
                </p>
                <p className="mt-2 text-sm text-navy-500">
                  We handle marketing, SEO, intake, and payment. You get a
                  queue of citizens who&rsquo;ve already paid the lead fee
                  and consented to AI-assisted drafting.
                </p>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="font-serif text-lg text-navy-800">
                  No admin tax
                </p>
                <p className="mt-2 text-sm text-navy-500">
                  No trust accounting for lead fees, no AML onboarding
                  forms, no scope-of-work negotiations. Just review, sign,
                  release.
                </p>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="font-serif text-lg text-navy-800">
                  Your name, your judgement
                </p>
                <p className="mt-2 text-sm text-navy-500">
                  Nothing goes to a tribunal, a court, or IR without your
                  sign-off. Tamper-evident hash on every release. You stay
                  the professional on the record.
                </p>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="font-serif text-lg text-navy-800">
                  Pause in one click
                </p>
                <p className="mt-2 text-sm text-navy-500">
                  Going on holiday? Court all day? Turn off new matters from
                  your dashboard. We route around you. No dropped balls, no
                  angry clients.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-20">
        <Container className="text-center">
          <h2 className="font-serif text-headline text-white">
            Ready to see what Tuesday looks like?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100">
            Apply to join the verified pro network. We check your admission,
            your PI, and your practice areas. If you&rsquo;re in, you see
            your first queue within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/pro-register">
              Apply to join the verified pro network &rarr;
            </Button>
            <Link
              href="/pro-pricing"
              className="inline-flex min-h-touch items-center text-sm font-medium text-white/90 underline hover:text-white"
            >
              See plans &amp; platform fees &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* Consumer cross-link */}
      <section className="border-t border-navy-100 bg-white py-10">
        <Container className="text-center">
          <p className="text-sm text-navy-500">
            Not a pro?{" "}
            <Link
              href="/try"
              className="font-semibold text-navy-700 underline hover:text-navy-900"
            >
              Need legal or accounting help? See the consumer side &rarr;
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
