import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Help Centre",
  description:
    "Guides, answers, and walkthroughs for the Marco Reid platform \u2014 research, matters, trust accounts, billing, and more.",
};

const categories = [
  {
    letter: "G",
    title: "Getting started",
    description:
      "Set up your firm, invite your team, and run your first Marco query in under ten minutes.",
    articles: 8,
    href: "/help/getting-started",
  },
  {
    letter: "M",
    title: "Marco research",
    description:
      "Write better queries, understand citation verification, and use the \u2318K command palette.",
    articles: 14,
    href: "/help/marco-research",
  },
  {
    letter: "C",
    title: "Matters & clients",
    description:
      "Open matters, manage client records, and keep every document, note, and deadline in one place.",
    articles: 11,
    href: "/help/getting-started",
  },
  {
    letter: "T",
    title: "Trust accounts & IOLTA",
    description:
      "Record deposits, run three-way reconciliation, and keep an audit-ready trail for every cent.",
    articles: 9,
    href: "/help/trust-accounts",
  },
  {
    letter: "B",
    title: "Billing & subscriptions",
    description:
      "Upgrade, add seats, manage invoices, and understand how the Stripe billing portal works.",
    articles: 7,
    href: "/help/billing",
  },
  {
    letter: "V",
    title: "Voice dictation",
    description:
      "Dictate notes, draft matter memos, and work hands-free with Marco Reid Voice.",
    articles: 6,
    href: "/help/getting-started",
  },
];

const popular = [
  {
    title: "How Marco verifies every citation before returning a result",
    href: "/help/marco-research",
  },
  {
    title: "Setting up your first trust account and recording a deposit",
    href: "/help/trust-accounts",
  },
  {
    title: "Adding a team member and choosing the right seat role",
    href: "/help/billing",
  },
  {
    title: "Using the \u2318K command palette from anywhere in the app",
    href: "/help/marco-research",
  },
  {
    title: "What to do when Marco returns an UNVERIFIED citation",
    href: "/help/marco-research",
  },
];

export default function HelpCentrePage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            How can we help?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Guides, walkthroughs, and answers for every corner of the platform.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <div className="flex items-center gap-3 rounded-full border border-navy-400 bg-navy-600 px-6 py-4 text-left shadow-card">
              <span aria-hidden className="text-navy-200">&#x1F50D;</span>
              <span className="text-navy-200">
                Search the help centre&hellip;
              </span>
              <span className="ml-auto rounded-md border border-navy-400 px-2 py-0.5 text-xs font-semibold text-navy-200">
                /
              </span>
            </div>
            <p className="mt-3 text-sm text-navy-200">
              Search is coming soon. In the meantime, browse by category below.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Help categories">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Browse by topic.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Start with the area you need. Every guide is written by the team
              that built the feature.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <Link
                  href={c.href}
                  className="group block h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-500 font-serif text-xl text-white">
                    {c.letter}
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-navy-800">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {c.description}
                  </p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-forest-600">
                    {c.articles} articles &rarr;
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Popular articles">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Popular right now.
              </h2>
              <p className="mt-4 text-lg text-navy-400">
                The five articles new firms read most often in their first week.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-12 divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
                {popular.map((a, i) => (
                  <li key={a.title}>
                    <Link
                      href={a.href}
                      className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-navy-50"
                    >
                      <span className="font-serif text-lg text-plum-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-navy-700 group-hover:text-navy-800">
                        {a.title}
                      </span>
                      <span
                        aria-hidden
                        className="text-navy-400 transition-transform group-hover:translate-x-0.5"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Contact support">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Can&rsquo;t find what you need?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              Our support team is based in Auckland and answers every email.
              Average response time is under four hours during business days.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 inline-flex flex-col items-center gap-3 rounded-2xl border border-navy-100 bg-navy-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-navy-400">
                Email support
              </p>
              <a
                href="mailto:support@marcoreid.com"
                className="font-serif text-2xl text-navy-800 underline-offset-4 hover:underline"
              >
                support@marcoreid.com
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
