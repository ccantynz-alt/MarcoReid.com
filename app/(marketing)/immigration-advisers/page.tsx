import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Immigration advisers — IAA & OMARA workspace",
  description:
    "For NZ Licensed Immigration Advisers (IAA) and AU Registered Migration Agents (OMARA). Written services agreement, statement of services, file notes, deadlines, INZ and Home Affairs filings — built to the IAA Code of Conduct 2014 and the OMARA Code of Conduct 2021.",
};

const surfaces = [
  {
    when: "Engagement",
    title: "Written services agreement",
    body:
      "IAA Code Standard 18 / 19 (NZ) and OMARA Code 5.2 (AU) require a written agreement before work starts. Marco generates it from a structured intake — services in scope, fees, refund terms, complaints process — and captures the client signature electronically.",
  },
  {
    when: "Intake",
    title: "Statement of services and file notes",
    body:
      "IAA Standards 26–28 require contemporaneous file notes for every interaction. Marco transcribes the intake meeting (with consent), drafts the statement of services, and seeds the file note ledger that runs for the life of the matter.",
  },
  {
    when: "Application drafting",
    title: "INZ + Home Affairs forms, populated from one record",
    body:
      "Resident, partnership, work, student, visitor, and skilled migrant categories for INZ. Subclass 482, 186, 189, 190, 491, 500, 600, 820/801, and 887 for Home Affairs. One client record drives every form. Edition checks happen in real time. PDF outputs match the regulator specification exactly.",
  },
  {
    when: "Submission",
    title: "Lodgement and tracking",
    body:
      "ImmiAccount integration for AU lodgement. INZ Online lodgement workflow with receipt-number capture. Status pulls update automatically; deadlines for further information requests, health checks, and biometrics seed the calendar the moment INZ or Home Affairs raise them.",
  },
  {
    when: "Throughout",
    title: "Trust account and fees",
    body:
      "IAA Standard 23 trust-account compliance for advance fees. OMARA s313 client-monies regime for Australian agents. Receipts, withdrawals against work performed, and refund-on-cessation calculations all reconciled against the engagement agreement automatically.",
  },
  {
    when: "Closure",
    title: "File closure and retention",
    body:
      "Seven-year file retention required by both regimes. Marco closes the file with a structured closure note, archives every document and file note, and sets the retention timer. The next IAA audit or OMARA review pulls the file in seconds.",
  },
];

const built_in = [
  "Immigration Advisers Licensing Act 2007 (NZ) — full Code of Conduct 2014 mapped",
  "Migration Act 1958 (AU) s276–s311 — registered-agent obligations and Code 2021 mapped",
  "INZ Operational Manual — sections cited in every assessment Marco drafts",
  "Home Affairs PAM3 / LIN guidance — surfaced where the regulation is being applied",
  "IAA Standards 23 and 25 — client funds in trust, receipt for every payment",
  "OMARA Code of Conduct 2021 — Pt 2 client agreement, Pt 3 client funds, Pt 6 records",
  "Seven-year file retention — automatic, with regulator-audit export in one click",
  "Sanctions screening on every named client (UN, OFAC, NZ MFAT, AU DFAT)",
];

const distinctions = [
  {
    title: "Licensed Immigration Adviser (NZ)",
    body:
      "Regulated by the Immigration Advisers Authority. Full, provisional, and limited licences scoped per the licensing schedule. Marco recognises the licence class and prevents an out-of-scope assessment from being drafted.",
  },
  {
    title: "Registered Migration Agent (AU)",
    body:
      "Registered with OMARA under the Migration Act 1958. Full registration vs restricted registration handled in scope. Continuing professional development hours logged from the platform's research and drafting time.",
  },
  {
    title: "Lawyer providing immigration services",
    body:
      "NZ lawyers are exempt from IAA licensing for immigration work but remain subject to the Lawyers and Conveyancers Act. Australian lawyers no longer dual-register with OMARA but still report movement-of-persons activity. Marco keeps the right rule set active per practitioner.",
  },
];

export default function ImmigrationAdvisersPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Immigration advisers
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The IAA and OMARA file, built right the first time.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Immigration advice is high-trust, high-stakes, and tightly
              regulated. Marco Reid wires the written services agreement, the
              file notes, the trust account, and the seven-year retention
              clock into one workspace — so the next IAA audit or OMARA
              review takes minutes, not weeks.
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us about immigration advisory &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Engagement to closure.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six surfaces. Each one keyed to the standard or section that
              authorises it. Compliance becomes the by-product of doing the
              work — not an extra job at year end.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((s) => (
              <Reveal key={s.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    {s.when}
                  </p>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">Built in, not bolted on.</h2>
            <p className="mt-4 text-lg text-navy-400">
              The Acts, codes, and operational manuals that define a
              compliant adviser practice — wired into the spine of every
              workflow.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-3">
            {built_in.map((line) => (
              <Reveal key={line} delay={0.03}>
                <li className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5 text-sm text-navy-600 shadow-card">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>{line}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Three practitioner classes. One platform.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy-400">
              The platform knows the difference between an LIA, an RMA, and a
              lawyer — and runs the right rule set for each.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {distinctions.map((d) => (
              <Reveal key={d.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-navy-400">
            Marco Reid is a workspace for licensed immigration advisers and
            registered migration agents. It is not itself an immigration
            adviser. Every assessment, application, and statement of services
            is reviewed and signed by the licensed practitioner of record
            before release.
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              Run the practice. Pass the audit.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              The IAA reviews. The OMARA reviews. Insurers ask. Clients ask.
              When the question comes, the answer is one export away.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Book a walkthrough &rarr;
              </Button>
              <Button href="/pricing" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                See pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
