import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title:
    "Join the marketplace — qualified leads, pre-drafted work, flat fees.",
  description:
    "Lawyers and chartered accountants: citizens post matters, Marco drafts the paperwork, you review and sign off. Flat lead fees, never a percentage of your professional fee. NZ and AU soft launch.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Professional marketplace",
  name: "Marco Reid Marketplace",
  description:
    "Two-sided marketplace for licensed professionals and citizens, with AI intake and human sign-off.",
  provider: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
  },
  url: `${BRAND.url}/marketplace`,
  areaServed: ["NZ", "AU"],
};

const benefits = [
  {
    title: "Qualified leads, not cold enquiries.",
    body: "Every matter arrives with a structured AI-drafted intake, a summary, and a first-pass at the paperwork. You read the draft and decide in one click: accept, amend, or pass.",
  },
  {
    title: "Flat lead fees. No revenue share.",
    body: "Marco Reid charges the citizen a flat intake fee. Your professional fee is yours, paid to you. This structure respects ABA Model Rule 5.4 and the NZ Lawyers and Conveyancers Act — we never take a percentage of your work.",
  },
  {
    title: "Sign-off workflow built in.",
    body: "Every AI output destined for the citizen passes through your sign-off queue. Approve, amend with notes, or reject. Every decision is audit-trailed and hash-stamped so nothing can be altered after release.",
  },
  {
    title: "Your firm, your brand.",
    body: "Signed-off work goes out under your name and admission details, not Marco Reid&rsquo;s. The platform is infrastructure; you are the professional.",
  },
  {
    title: "Real tools, not just leads.",
    body: "Matter management, trust accounting, time tracking, document AI, Marco research, invoicing — all included in the subscription. If you only want leads and nothing else, the SaaS stack is already there.",
  },
  {
    title: "PI insurance validated.",
    body: "We verify your admission details and require proof of current professional indemnity insurance before you can accept matters. Expired PI blocks acceptance automatically.",
  },
];

const verification = [
  "Admission confirmed with the NZ Law Society, CA ANZ, NZICA, or Australian state roll",
  "Admission number, year of admission, and principal jurisdiction recorded",
  "Current professional indemnity insurance on file — expiry checked on every matter",
  "Practice-area tags matched to your qualification, not self-declared",
  "Verified badge only after a human admin review — no automatic approvals",
];

const foundingFirm = [
  {
    title: "Lifetime founding-firm pricing.",
    body: "First 20 firms in NZ and AU lock in founding pricing for the life of the account — even as list prices rise.",
  },
  {
    title: "Direct input into the roadmap.",
    body: "Monthly roundtable with Craig and the engineering team. Vote on what ships next. Your cases drive what gets automated first.",
  },
  {
    title: "Priority matter routing.",
    body: "Matters in your practice areas route to founding firms first. Higher accept rate, warmer leads, better outcomes.",
  },
];

export default function MarketplacePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-52">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-forest-500/15 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="text-sm font-semibold tracking-wider text-gold-400">
            For lawyers and accountants &middot; NZ &amp; AU
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Qualified leads.
            <br />
            <span className="text-gold-300">Pre-drafted paperwork.</span>
            <br />
            Flat fees.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-100">
            Citizens post matters. Marco drafts the paperwork with AI. You
            review, amend, or reject — and sign off. Your professional fee is
            yours. Marco Reid takes a flat lead fee, never a percentage of
            your work.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/pro-onboard">Apply to join</Button>
            <Button href="#how-it-works" variant="secondary">
              How it works
            </Button>
          </div>
          <p className="mt-6 text-sm text-navy-200">
            Founding pricing for the first 20 firms in NZ and AU.
          </p>
        </Container>
      </section>

      {/* Benefits */}
      <section id="how-it-works" className="border-b border-navy-100 bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              Why professionals join
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              Infrastructure for the firm you want to run.
            </h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <h3 className="font-serif text-2xl text-navy-800">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-navy-500">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Verification */}
      <section className="bg-navy-50 py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                Verification
              </p>
              <h2 className="mt-4 font-serif text-headline text-navy-800">
                Only verified professionals take matters.
              </h2>
              <p className="mt-4 text-navy-500">
                The marketplace is closed to unlicensed actors by design.
                Citizens know the work is signed off by a real, admitted
                professional with current insurance. Firms know their peers
                have been through the same check.
              </p>
            </div>
            <ul className="space-y-4">
              {verification.map((v) => (
                <li
                  key={v}
                  className="flex gap-3 rounded-xl border border-navy-100 bg-white p-5"
                >
                  <span
                    className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-forest-500"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-navy-700">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Founding firm programme */}
      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
              Founding firm programme
            </p>
            <h2 className="mt-4 font-serif text-headline text-navy-800">
              First twenty firms in NZ and AU.
            </h2>
            <p className="mt-4 text-navy-500">
              The soft launch is intentionally small. Twenty firms in each
              country, hand-picked, working with us to refine the model before
              we open broadly.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
            {foundingFirm.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-gold-200 bg-gold-50 p-8">
                  <h3 className="font-serif text-xl text-navy-800">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm text-navy-600">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-20">
        <Container className="text-center">
          <h2 className="font-serif text-headline text-white">
            Apply to join the marketplace.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100">
            We verify every firm before approval. Applications reviewed
            within three working days. Tell us about your practice and
            we&rsquo;ll be in touch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/pro-onboard">Apply now</Button>
            <Link
              href="/pricing"
              className="inline-flex min-h-touch items-center text-sm font-medium text-white/90 underline hover:text-white"
            >
              See pricing &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
