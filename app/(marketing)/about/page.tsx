import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "About Marco Reid \u2014 Professional Intelligence for Law and Accounting",
  description:
    "Marco Reid is building the most advanced professional intelligence platform ever created. Four products. One platform. Built in Auckland, New Zealand for the world.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Built by professionals.
            <br />
            For professionals.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Marco Reid is building the operating system for legal and accounting
            professionals. Four revolutionary products under one roof.
            Built in Auckland, New Zealand for the world.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="The story">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The story.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Lawyers and accountants are drowning. Not in clients &mdash; in software.
              The average attorney uses 7&ndash;10 different tools that don&rsquo;t talk to each other.
              Research in one tab. Case management in another. Billing somewhere else.
              Trust accounting in a spreadsheet. Client calls falling through the cracks.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid was built to end that. One platform that handles everything &mdash;
              case management, billing, trust accounting, AI-powered legal and accounting research,
              voice dictation in 9 languages, document drafting, client portals, secure messaging,
              depositions, courtroom technology, and company incorporation.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              The platform handles the machine work. The professional handles the judgment work.
              That is the only division of labour that has ever made sense.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      <section className="py-24 sm:py-36" aria-label="The products">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Four products. One platform.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {[
              { name: "Marco Reid Legal", desc: "Full-stack legal practice management. Case management, billing, trust accounting, court calendaring, document AI, e-signatures, client portal, depositions, courtroom technology.", href: "/law" },
              { name: "Marco Reid Accounting", desc: "AI-powered accounting. Bank feeds, automated reconciliation, tax compliance across 50 states, receipt scanning, AI spreadsheets, financial reporting.", href: "/accounting" },
              { name: "The Oracle", desc: "Cross-domain legal and accounting AI research. Every citation verified. Legal, accounting, IP, and cross-domain queries. The research engine nobody else can build.", href: "/oracle" },
              { name: "Marco Reid Voice", desc: "The platform\u2019s intelligence layer. Speak anywhere you can type. Legal and accounting vocabulary. 9 languages. Voice commands that file, bill, schedule, and research.", href: "/dictation" },
            ].map((p) => (
              <Reveal key={p.name} delay={0.05}>
                <a href={p.href} className="block rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-xl text-navy-700">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{p.desc}</p>
                  <p className="mt-4 text-sm font-semibold text-forest-600">Learn more &rarr;</p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-36" aria-label="Mission">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Your profession back.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl text-navy-200">
              Lawyers and accountants became professionals to practise their craft.
              Marco Reid gives them back the hours that software took away.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Button href="/pricing" size="lg">View pricing</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
