import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "About AlecRae \u2014 Professional Intelligence for Law and Accounting",
  description:
    "AlecRae is building the most advanced professional intelligence platform ever created. Four products. One platform. Built in Auckland, New Zealand for the world.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AlecRae",
  description: "Professional intelligence platform for law and accounting. Built in Auckland, New Zealand for the world.",
  url: "https://alecrae.com",
  foundingLocation: "Auckland, New Zealand",
};

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Built by professionals.
            <br />
            For professionals.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            AlecRae is building the operating system for legal and accounting
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
              AlecRae was built to end that. One platform that handles everything &mdash;
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
              { name: "AlecRae Legal", desc: "Full-stack legal practice management. Case management, billing, trust accounting, court calendaring, document AI, e-signatures, client portal, depositions, courtroom technology.", href: "/law" },
              { name: "AlecRae Accounting", desc: "AI-powered accounting. Bank feeds, automated reconciliation, tax compliance across 50 states, receipt scanning, AI spreadsheets, financial reporting.", href: "/accounting" },
              { name: "The Oracle", desc: "Cross-domain legal and accounting AI research. Every citation verified. Legal, accounting, IP, and cross-domain queries. The research engine nobody else can build.", href: "/oracle" },
              { name: "AlecRae Voice", desc: "The platform\u2019s intelligence layer. Speak anywhere you can type. Legal and accounting vocabulary. 9 languages. Voice commands that file, bill, schedule, and research.", href: "/dictation" },
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

      <section className="py-24 sm:py-36" aria-label="Why this matters">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Why this matters right now.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              The world is going through tough times. Globally. Professionals are
              burning out. Small businesses can&rsquo;t afford the legal protection they
              need. Entrepreneurs with brilliant ideas can&rsquo;t access the tools to
              make them real. A solo founder in Auckland who wants to sell to the
              US shouldn&rsquo;t need $50,000 in legal fees across three countries.
              A young lawyer fresh out of law school shouldn&rsquo;t burn out before 30
              because the tools waste half their day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              AlecRae is not just software. It&rsquo;s a response to a real problem.
              Every service on this platform creates work for professionals.
              Every company formed creates ongoing compliance work for attorneys
              and accountants. Every trademark filed creates renewal work.
              Every client who comes in generates income for the professionals
              on the platform who review and sign off.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              This platform doesn&rsquo;t replace professionals. It gives them
              superpowers and feeds them clients. More jobs. Better income.
              Time back with family. Hope.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-xl font-medium leading-relaxed text-navy-700">
              We need this. More than ever. And we&rsquo;re building it.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      <section className="py-24 sm:py-36" aria-label="Real impact">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Real impact. Real people.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Jobs created, not destroyed", desc: "Every AI-generated document needs a licensed professional to review and sign off. The AI does the drafting. The professional does the judgment. More clients per hour. Better income. More jobs." },
              { title: "Access for the underserved", desc: "A multi-jurisdiction corporate structure used to cost $20,000\u201350,000. AlecRae makes it accessible to solo founders, immigrant entrepreneurs, and small businesses who could never afford it." },
              { title: "9 languages from day one", desc: "Professional tools should never be an English-only club. A Spanish-speaking attorney in Miami and a Mandarin-speaking CPA in Sydney deserve the same tools as everyone else." },
              { title: "The next generation stays", desc: "300,000 accountants left the profession since 2020. Young lawyers burn out before 30. They didn\u2019t leave because the work was hard. They left because the tools were broken. We fix the tools. They stay." },
              { title: "Small business gets a chance", desc: "A sole trader who wants to protect their brand across four countries shouldn\u2019t need four lawyers and four accountants. One platform. One workflow. The barriers come down." },
              { title: "Time goes home", desc: "Lawyers and accountants work 60-hour weeks because broken software wastes half their day. AlecRae gives them back the hours. Those hours go home to their families." },
            ].map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{item.desc}</p>
                </div>
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
              <br />
              Your evenings back.
              <br />
              Your hope back.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl text-navy-200">
              Lawyers and accountants became professionals to practise their craft.
              AlecRae gives them back the hours that software took away &mdash;
              and creates opportunities for the next generation to thrive.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">View pricing</Button>
              <Button href="/services" variant="secondary" size="lg">Explore services</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
