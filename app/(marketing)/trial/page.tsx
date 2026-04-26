import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Start a free trial",
  description:
    "Fourteen-day free trial of Marco Reid. Sandbox firm, demo client, sample matters — try Marco research, Voice, billing, trust accounting end-to-end before you talk to sales.",
};

const includes = [
  {
    title: "A pre-loaded sandbox firm",
    body: "We seed a demo client, a sample matter, a draft invoice, a trust account, and a CPD record so you have something to drive against from the first minute.",
  },
  {
    title: "Marco research — full access",
    body: "All citation databases. Cross-domain queries. Verified, Unverified, and Not-Found badges working as they will in production.",
  },
  {
    title: "Marco Reid Voice in nine languages",
    body: "Speak a billing entry, a calendar invite, a research query. The vocabulary layer for legal and accounting is enabled from day one.",
  },
  {
    title: "Trust accounting + IOLTA equivalent",
    body: "NZ Lawyers and Conveyancers trust account regs (or your jurisdiction's equivalent) wired in. Reconciliation report generates on demand.",
  },
  {
    title: "Catch-Up Centre intake",
    body: "Walk an imaginary client through years of unfiled returns and watch the AI reconstruction kick in. End-to-end.",
  },
  {
    title: "Real audit logs",
    body: "Every action you take is recorded the same way it would be for a paying firm. You can export the audit trail at the end.",
  },
];

const fairUse = [
  "No credit card required.",
  "Trial sandbox is wiped on day fifteen unless you convert.",
  "AI usage is rate-limited to 50 Marco queries / 30 voice minutes / day — generous for evaluation.",
  "Trial firms cannot send real client invoices, file returns to IRD/IRS/ATO, or interact with the marketplace.",
  "Convert at any time and your sandbox is preserved into your real account.",
];

export default function TrialPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Free trial
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Try Marco Reid for fourteen days. No card.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Skip the sales call. We seed your trial with a demo firm, a sample client, a sample
              matter, a draft invoice, a trust account, and a CPD record. You can start clicking,
              dictating, and asking Marco within thirty seconds of signing in.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/register?intent=trial" size="lg" variant="gold">
                Start your trial &rarr;
              </Button>
              <Button href="/contact" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                Prefer a guided demo?
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What is in the trial.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Everything that ships in the Professional tier, with a sandbox boundary so nothing
              you do can affect a real client, a real filing, or a real bank account.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">Fair-use boundaries.</h2>
            <p className="mt-4 text-lg text-navy-400">
              We are not playing games with the trial. Here is exactly what is and is not allowed.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {fairUse.map((line) => (
              <Reveal key={line} delay={0.03}>
                <li className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5 text-sm text-navy-600 shadow-card">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>{line}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl bg-navy-500 p-8 text-center">
            <p className="font-serif text-xl text-white">Ready?</p>
            <p className="mt-3 text-sm text-white/85">
              Start in under a minute. No card required. Convert when you are ready.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/register?intent=trial" variant="gold" size="lg">
                Start your trial
              </Button>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-gold-300 hover:text-gold-200"
              >
                See pricing &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
