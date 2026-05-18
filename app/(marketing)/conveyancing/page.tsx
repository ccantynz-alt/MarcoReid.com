import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Conveyancing — purchase, sale, refinance",
  description:
    "Property conveyancing for NZ and AU practices. Title search, AML pre-cleared, conditions tracker, settlement statement, trust account flows — every settlement on rails.",
};

const stages = [
  {
    when: "Day 0 — instructions in",
    title: "Auto-create the matter",
    body: "Client signs the engagement letter electronically. AML/CFT customer due diligence kicks off in parallel. Matter created, conveyancing record attached, conditions skeleton seeded.",
  },
  {
    when: "Day 1 — title and LIM",
    title: "Title and LIM in one click",
    body: "Order CT, LIM, and rates record. Marco summarises the title — easements, covenants, encumbrances — and flags anything unusual for partner review.",
  },
  {
    when: "Pre-unconditional",
    title: "Conditions tracker",
    body: "Finance, LIM, building report, due diligence, and any custom conditions live in one tracker. Marco prompts for evidence as each is satisfied. Nothing falls between calendars.",
  },
  {
    when: "Settlement",
    title: "Statement and funds",
    body: "Settlement statement drafted from the agreed price, deposit, rates apportionment, and any adjustments. Trust account inflows and outflows reconciled. NZ Lawyers' Trust Account Regulations satisfied without spreadsheets.",
  },
  {
    when: "Post-settlement",
    title: "Files closed cleanly",
    body: "E-dealing lodged where supported. Final invoice generated from time entries plus fixed fees. Documents archived, will register updated if applicable, AML record updated for ongoing monitoring.",
  },
];

const built_in = [
  "NZ Lawyers' Trust Account Regulations 2008 — built into trust flows",
  "AU PEXA integration — rolling out alongside the AU launch",
  "AML/CFT customer due diligence — automatic, never duplicated",
  "Will register cross-link — the new homeowner's will attached if held",
  "GST treatment per the type of supply — drafted, not guessed",
  "LINZ e-dealing for NZ titles — supported on launch",
];

export default function ConveyancingPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Conveyancing
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Every settlement, on rails.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Conveyancing is high-volume, high-trust, and slim-margin work.
              Marco Reid runs the file from instructions through settlement
              and post-settlement housekeeping — title, LIM, conditions, AML,
              trust account, settlement statement, e-dealing — without the
              partner having to chase any of it.
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us about conveyancing &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              The full pipeline.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((s) => (
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
    </>
  );
}
