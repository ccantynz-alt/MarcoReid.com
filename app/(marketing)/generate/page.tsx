import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import GenerateIntakeForm from "@/app/components/marketing/GenerateIntakeForm";

export const metadata: Metadata = {
  title: "Generate a legal or tax document — drafted, reviewed, signed",
  description:
    "Describe your situation in plain English. Marco Reid's AI drafts the document. A verified attorney or accountant in your jurisdiction reviews and signs it before release. NZ + AU + UK + US.",
};

const docTypes = [
  { name: "Tenancy notice / dispute", who: "Landlords + tenants", who2: "Tribunal-ready" },
  { name: "Employment agreement", who: "Employers + contractors", who2: "Standards-compliant" },
  { name: "Will + testamentary trust", who: "Anyone with assets", who2: "Witness pack included" },
  { name: "Shareholders agreement", who: "Co-founders", who2: "Vesting + pre-emptive rights" },
  { name: "NDA (mutual + one-way)", who: "Anyone sharing IP", who2: "Multi-jurisdictional" },
  { name: "Sale of goods contract", who: "SMEs + traders", who2: "CGA / ACL respected" },
  { name: "Lease (residential + commercial)", who: "Landlords", who2: "ADLS / REINZ standards" },
  { name: "Property deed", who: "Buyers + sellers", who2: "LINZ / Land Registry ready" },
  { name: "Voluntary tax disclosure", who: "Years-behind filers", who2: "IRD / ATO templates" },
  { name: "Director's resolution", who: "Companies", who2: "Filed-or-minute-book ready" },
  { name: "Power of attorney", who: "Anyone", who2: "Enduring + ordinary" },
  { name: "Statutory demand", who: "Creditors", who2: "Companies Act compliant" },
];

const steps = [
  {
    n: "01",
    title: "Describe your situation",
    body:
      "Plain English, in the box below. The AI extracts what you actually need — jurisdiction, document type, parties, key terms — and asks a few targeted follow-up questions. Two minutes, not two hours.",
  },
  {
    n: "02",
    title: "AI drafts your document",
    body:
      "Marco Reid drafts the document against the right jurisdiction's rules. NZ Companies Act 1993, AU Corporations Act 2001, UK Companies Act 2006, Delaware General Corporation Law — whichever applies. The draft is yours instantly, free.",
  },
  {
    n: "03",
    title: "Free draft, watermarked",
    body:
      "Your draft is ready to read, share with your team, mark up, and refine. Every page carries a watermark — \"DRAFT — Not legal/tax advice. Pending professional review.\" — until a verified professional signs it.",
  },
  {
    n: "04",
    title: "Pay for professional sign-off",
    body:
      "When you're ready, a verified attorney or accountant in your jurisdiction reviews the draft, requests amendments if needed, and signs it. Their bar number / CA designation / TPB registration on every page. Now it's a legally weighted document.",
  },
];

export default function GeneratePage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Document generator
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Describe your situation. We draft. A professional signs.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Tell us in plain English what you need. Marco Reid drafts the
              document against the right jurisdiction&rsquo;s rules. The draft
              is free. A verified attorney or accountant in NZ, AU, UK, or
              US signs it before it&rsquo;s released &mdash; their name, their
              bar number, on every page.
            </p>
            <p className="mt-4 text-sm text-white/70">
              No Marco Reid output is legally binding until a licensed
              professional signs it.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Tell us what you need.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Plain English. Two minutes. The AI does the structured intake
              from there.
            </p>
          </Reveal>
          <div className="mt-12">
            <GenerateIntakeForm />
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Four steps. One outcome.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The same flow whether you&rsquo;re drafting a tenancy notice in
              Auckland or a Delaware C-corp shareholders agreement.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <Reveal key={s.n} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="font-serif text-3xl text-gold-500">{s.n}</p>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {s.body}
                  </p>
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
              What you can draft.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The headlines. Hundreds more drafts available once you describe
              what you need.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docTypes.map((d) => (
              <Reveal key={d.name} delay={0.03}>
                <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{d.name}</h3>
                  <p className="mt-2 text-xs text-navy-400">{d.who}</p>
                  <p className="text-xs font-semibold text-forest-600">
                    {d.who2}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Why the sign-off matters.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              An AI-drafted document without professional review is a starting
              point, not a finished one. Marco Reid&rsquo;s sign-off is what
              turns a draft into a document a court, bank, regulator, or
              counterparty will accept.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <h3 className="font-serif text-lg text-navy-800">
                Drafts are watermarked until signed
              </h3>
              <p className="mt-2 text-sm text-navy-500">
                Every page of every unsigned draft carries the watermark
                &ldquo;DRAFT &mdash; Not legal/tax advice. Pending professional
                review.&rdquo; You can share it, mark it up, refine it. You
                can&rsquo;t use it as a binding instrument.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <h3 className="font-serif text-lg text-navy-800">
                Signed documents carry the professional&rsquo;s credentials
              </h3>
              <p className="mt-2 text-sm text-navy-500">
                Once signed: &ldquo;Reviewed and signed by [Name],
                [Bar No. / CA designation / TPB registration], [Jurisdiction],
                [Date].&rdquo; Stamped on every page. Audit-trailed in our
                hash-chained ledger.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <h3 className="font-serif text-lg text-navy-800">
                Marco Reid is the platform, not the professional
              </h3>
              <p className="mt-2 text-sm text-navy-500">
                We are a tooling vendor. The named professional on the signed
                document is the one who carries the professional liability
                and the regulatory authority for the advice. Two engagements
                &mdash; you with us for tooling, you with the professional
                for the legal/tax service.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
