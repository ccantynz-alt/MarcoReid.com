import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid for Barristers — case prep, research, and brief drafting for the Bar",
  description:
    "Marco Reid is the platform UK, AU, and NZ barristers use to prepare cases, draft briefs, verify citations, manage clerk instructions, and produce fee notes — with courtroom-grade research and your chambers' brand on every artefact. Built for independent barristers and chambers alike.",
};

const challenges = [
  {
    title: "Citation verification at brief-drafting speed",
    body:
      "A barrister's authority is their authorities. One fabricated citation in a skeleton argument or written submission is a professional conduct event. Marco Reid's citation verification engine checks every case reference against CourtListener, BAILII, Austlii, and NZLII before it appears in any document. Verified badge. Direct link. No exceptions.",
  },
  {
    title: "Brief preparation without the overnight grind",
    body:
      "Complex commercial or appellate briefs involve hundreds of authorities across multiple jurisdictions. Marco assembles the relevant authorities from the pleadings, flags conflicting decisions, and drafts the framework — leaving the advocate to do what only an advocate can do: argue. The drudgery is done. The thinking is yours.",
  },
  {
    title: "Court filing without the chase",
    body:
      "Correspondence with the court, service on opposing counsel, deadline tracking against court rules across UK, AU, and NZ jurisdictions — all inside the matter record. The Court-Rules Calendaring engine calculates every filing deadline from the cause of action date. Nothing is missed because nothing is manual.",
  },
  {
    title: "Fee notes that reflect the work",
    body:
      "Barristers bill by time and by complexity. Marco Reid captures every research session, every Voice dictation, every document drafting block as a timestamped activity. The fee note drafts itself from the activity log — accurate, detailed, and ready for brief fee assessment or taxation of costs.",
  },
];

const features = [
  {
    title: "Marco — case law research engine",
    body:
      "Six million+ US opinions, full BAILII coverage, Austlii, and NZLII indexed and searchable. Ask a question in plain language; receive verified authorities with citation treatment, jurisdiction flags, and a direct link to the source document. No subscription to Westlaw required.",
  },
  {
    title: "Brief and skeleton argument drafting",
    body:
      "Marco produces structured first drafts of skeleton arguments, written submissions, and opinion letters from the matter facts and the relevant authorities. Every authority cited is pre-verified. You revise and sign — the mechanical assembly is done.",
  },
  {
    title: "Evidence management",
    body:
      "Every exhibit, every expert report, every witness statement stored in the matter record with chain-of-custody metadata. Court-admissible metadata preservation per the Federal Rules of Evidence (US) and equivalent standards in UK, AU, and NZ. Defence or prosecution, the evidence is organised.",
  },
  {
    title: "Marco Reid Voice — dictation for the bar",
    body:
      "Legal vocabulary trained on the terminology barristers actually use: per incuriam, sub silentio, res judicata, ex parte, inter partes, obiter dicta, stare decisis. Dictate submissions on the way back from court. Voice formats them correctly, not like a consumer transcription app.",
  },
  {
    title: "Clerk and chambers workflow",
    body:
      "Brief instructions from instructing solicitors arrive in the matter record. Availability and return briefs managed inside the platform. Clerk notes, fee instructions, and return brief records all in one place — whether you are a junior in London or a silk in Auckland.",
  },
  {
    title: "Immutable audit trail",
    body:
      "Every action — every draft, every revision, every filing, every communication — logged in a cryptographically signed, append-only audit record. When a conduct complaint or taxation of costs arises, the platform's record is the answer.",
  },
];

const jurisdictions = [
  {
    name: "England and Wales",
    body:
      "Bar Standards Board (BSB) Code of Conduct compliance built in. BAILII case law indexed. HMCTS e-filing integration in roadmap. Chambers workflow supports the English Bar's direct access and instructed brief models.",
  },
  {
    name: "Australia",
    body:
      "New South Wales, Victorian, Queensland, WA, and SA Bars. Austlii indexed in full. Federal Court, FCA, and state court rules wired into the deadline engine. The etiquette of the Australian Bar — separate professional obligations from instructing solicitor — respected throughout.",
  },
  {
    name: "New Zealand",
    body:
      "New Zealand Bar Association compliance. NZLII indexed. District Court, High Court, Court of Appeal, and Supreme Court rules in the deadline engine. Independent bar and in-chambers models both supported.",
  },
];

const pricing = [
  {
    name: "Independent",
    price: "$199",
    period: "/month",
    description: "For independent barristers at the independent bar",
    features: [
      "Marco Reid Legal full platform",
      "Marco — Law research with citation verification",
      "Brief and skeleton argument drafting",
      "Evidence management module",
      "Marco Reid Voice — legal vocabulary",
      "Fee note generation from activity log",
      "Court-Rules Calendaring (UK, AU, NZ)",
      "Email support",
    ],
  },
  {
    name: "Chambers",
    price: "$399",
    period: "/seat/month",
    description: "For chambers with multiple members",
    highlighted: true,
    features: [
      "Everything in Independent",
      "Clerk workflow and brief management",
      "Chambers-level template library",
      "Multi-jurisdiction matter management",
      "Conflict checking across chambers",
      "Chambers branded artefacts",
      "Priority support",
      "Dedicated success manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large chambers, bar associations, and judicial chambers",
    features: [
      "Everything in Chambers",
      "Dedicated infrastructure",
      "Custom court system integrations",
      "On-premises audit export",
      "SLA + uptime guarantee",
      "Custom vocabulary training for Voice",
      "Annual on-site review",
    ],
  },
];

export default function ForBarristersPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              For barristers
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The brief is prepared. The authorities are verified. You argue.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Marco Reid is the platform UK, AU, and NZ barristers use to prepare
              cases at speed without sacrificing the rigour the court demands.
              Citation-verified research. Brief drafting from the pleadings. Evidence
              management with chain-of-custody. Your name on every artefact. The
              mechanics handled — the advocacy yours.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trial" variant="gold" size="lg">
                Start free trial &rarr;
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                Book a chambers walkthrough
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-800">
              The preparation burden compounds. The fee does not.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-500">
              A complex appeal or commercial trial requires hundreds of authorities
              across multiple jurisdictions, a skeleton argument that anticipates
              every counter-authority the other side will run, and an evidence bundle
              that survives challenge at trial. This is weeks of work — much of it
              mechanical.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              The advocates who can build the best argument in the shortest time
              win more than the brief. They win the relationship with instructing
              solicitors. They get the next brief, and the one after that.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              Marco Reid does the mechanical work. The brief assembly, the authority
              search, the citation verification, the deadline calculation, the fee
              note. You do what only an advocate can do.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Built for the way barristers actually work.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Not retrofitted from a generic law firm platform. Every module
              designed around the brief-led, court-focused, independently structured
              practice of a barrister.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {challenges.map((c) => (
              <Reveal key={c.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              Platform features
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Every tool a barrister needs. None they do not.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six modules that address the full lifecycle of a brief — from
              instructions received to fee note delivered.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-navy-100 bg-navy-50 p-6 text-sm leading-relaxed text-navy-500">
              <strong className="text-navy-700">Research disclaimer:</strong> Marco
              is an AI research tool. All outputs must be verified by a qualified
              professional before reliance. Citation verification reduces
              hallucination risk; it does not eliminate the advocate's professional
              obligation to verify every authority before filing.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Built for your jurisdiction.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The Bar operates differently in every jurisdiction. Marco Reid
              reflects each jurisdiction's professional rules, court systems,
              and practice conventions — not a generic legal platform with
              jurisdiction settings bolted on.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {jurisdictions.map((j) => (
              <Reveal key={j.name} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{j.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{j.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              From $199/month. No lock-in.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Monthly subscription. Cancel any time. No per-matter fee on top.
              No percentage of the brief fee. Your fee is yours — the platform
              is a cost, not a partner.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {pricing.map((p) => (
              <Reveal key={p.name} delay={0.05}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 shadow-card ${
                    p.highlighted
                      ? "border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white ring-2 ring-gold-200"
                      : "border-navy-100 bg-white"
                  }`}
                >
                  <div>
                    <h3 className="font-serif text-2xl text-navy-800">{p.name}</h3>
                    <p className="mt-2 text-sm text-navy-400">{p.description}</p>
                    <p className="mt-6">
                      <span className="font-serif text-4xl text-navy-800">{p.price}</span>
                      {p.period && <span className="text-navy-400">{p.period}</span>}
                    </p>
                  </div>
                  <ul className="mt-8 flex-1 space-y-3 text-sm text-navy-600">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-0.5 text-forest-500">&#10003;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={p.name === "Enterprise" ? "/contact" : "/trial"}
                    variant={p.highlighted ? "gold" : "secondary"}
                    className="mt-8 w-full justify-center"
                  >
                    {p.name === "Enterprise" ? "Talk to us" : "Start free trial"}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              The Bar was always about the argument. Now the preparation matches it.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Every barrister who joins the founding cohort gets first access to
              new court integrations, founding-cohort pricing locked for life, and
              direct input into the chambers workflow roadmap. The Bar shaped this
              platform. The Bar should lead it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trial" variant="gold" size="lg">
                Start free trial &rarr;
              </Button>
              <Button
                href="/for/solicitors"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                For solicitors &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
