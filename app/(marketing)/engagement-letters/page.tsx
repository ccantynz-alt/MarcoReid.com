import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Engagement letter generator",
  description:
    "Generate compliant engagement letters in seconds. NZLS Rule 3.4 client-care information, AML/CFT clauses, fee scope, complaints procedure — drafted from matter context, ready for e-signature.",
};

const features = [
  {
    title: "Drafted from matter context",
    body: "Marco reads the matter intake — practice area, scope, parties, jurisdiction — and drafts the engagement letter. You review and sign, you do not start from a blank document.",
  },
  {
    title: "NZLS Rule 3.4 client-care information",
    body: "Required client-care content (information about the lawyer, the relationship, fees, complaints procedure) is included automatically per NZLS Rules of Conduct and Client Care.",
  },
  {
    title: "AML/CFT and conflict-check clauses",
    body: "Standard AML/CFT verification clauses, conflict-of-interest declarations, and source-of-funds wording included where required.",
  },
  {
    title: "Fee scope you can defend",
    body: "Fixed fees, hourly with cap, contingency where permitted — the letter quantifies the scope so a Cost Revision Application has nothing to chew on.",
  },
  {
    title: "E-signature, audit trail",
    body: "Sent for signature inside the platform. Signature event tied to the matter, the AML record, and the trust account opening if relevant. One ceremony.",
  },
  {
    title: "Templates the firm controls",
    body: "Each firm's engagement-letter template lives under the firm settings. Edit it once; every new matter inherits the change. Versioned so the engagement letter sent five years ago is still reproducible.",
  },
];

const audiences = [
  { title: "NZ lawyers", body: "NZLS Rules of Conduct and Client Care 2008 (Rule 3.4) — client-care information mandatory." },
  { title: "AU lawyers", body: "Costs disclosure under the Legal Profession Uniform Law (NSW + VIC) and equivalent state regimes." },
  { title: "Chartered accountants", body: "CA ANZ and APES 305 engagement-letter requirements covered for assurance and non-assurance work." },
];

export default function EngagementLettersPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Engagement letters
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Engagement letters that draft themselves.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              The hour each new matter loses to engagement-letter drafting and
              chasing signatures is not work. Marco Reid reads the matter,
              drafts the letter, includes the required client-care content,
              sends it for e-signature, and ties everything back to the AML,
              the trust account, and the file.
            </p>
            <div className="mt-10">
              <Button href="/trial" variant="gold" size="lg">
                Try it on the trial &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What the generator does.
            </h2>
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
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Compliant for whom.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {audiences.map((a) => (
              <Reveal key={a.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
