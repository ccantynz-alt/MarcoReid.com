import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How real firms use Marco Reid to recover thousands of billable hours, cut research costs, and win harder cases. Three in-depth case studies from immigration, tax, and trial practice.",
};

const studies = [
  {
    slug: "immigration-firm",
    firm: "Chen & Associates Immigration Law",
    practice: "Immigration",
    headline: "1,530 hours recovered annually across 340 monthly matters",
    summary:
      "A 14-lawyer immigration firm cut visa research from 4.5 hours to 25 seconds per matter by moving Marco into their intake workflow.",
  },
  {
    slug: "tax-practice",
    firm: "Harper Tax Advisory LLC",
    practice: "Tax & Accounting",
    headline: "$312,000 in annual research costs eliminated",
    summary:
      "A mid-sized US tax advisory replaced three third-party research subscriptions with Marco and redirected senior associate time to advisory work.",
  },
  {
    slug: "solo-litigator",
    firm: "Katherine O\u2019Brien Trial Law",
    practice: "Litigation",
    headline: "From solo practitioner to peer of five-partner firms",
    summary:
      "A sole litigator competing against AmLaw 200 firms used Marco and Courtroom mode to outprepare larger teams &mdash; and won three consecutive jury verdicts.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Case Studies
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            What firms do with
            <br />
            their new time.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Three firms. Three practice areas. One pattern: the work that used to
            take days now takes minutes &mdash; and the practice looks different on
            the other side.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {studies.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <Link
                  href={`/case-studies/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <span className="inline-flex w-fit rounded-full bg-plum-50 px-3 py-1 text-xs font-bold text-plum-600">
                    {s.practice}
                  </span>
                  <h2 className="mt-6 font-serif text-2xl leading-tight text-navy-800">
                    {s.firm}
                  </h2>
                  <p className="mt-4 font-serif text-lg text-forest-600">
                    {s.headline}
                  </p>
                  <p className="mt-4 flex-1 text-navy-400">{s.summary}</p>
                  <p className="mt-8 text-sm font-semibold text-navy-700 transition-colors group-hover:text-forest-600">
                    Read the case study &rarr;
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready to write the next one?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              We onboard new firms every week. Tell us about your practice and
              we&rsquo;ll show you what Marco looks like on your matters.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Book a demo
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                View pricing
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
