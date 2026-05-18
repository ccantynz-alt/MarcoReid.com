import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import CourtRulesCalculator from "@/app/components/marketing/CourtRulesCalculator";
import { COURT_RULES } from "@/lib/court-rules";

export const metadata: Metadata = {
  title: "Court-rules deadline calculator — NZ + AU + UK + US",
  description:
    "Pick a triggering event in any NZ, AU, UK, or US court or tribunal. Marco Reid calculates every downstream deadline against the rule that authorises it. Watermarked output, professional sign-off required for reliance.",
};

export default function CourtRulesPage() {
  const counts = {
    NZ: COURT_RULES.filter((r) => r.jurisdiction === "NZ").length,
    AU: COURT_RULES.filter((r) => r.jurisdiction === "AU").length,
    UK: COURT_RULES.filter((r) => r.jurisdiction === "UK").length,
    US: COURT_RULES.filter((r) => r.jurisdiction === "US").length,
  };

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Tools / Court-rules engine
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Every deadline. Cited to the rule.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Pick the triggering event, set the date, and Marco Reid walks
              the deadline against the rule that authorises it. NZ, AU, UK,
              US courts and tribunals.
            </p>
            <p className="mt-3 text-sm text-white/70">
              {counts.NZ + counts.AU + counts.UK + counts.US} rules indexed
              today &middot; NZ {counts.NZ} &middot; AU {counts.AU} &middot;
              UK {counts.UK} &middot; US {counts.US}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <CourtRulesCalculator rules={COURT_RULES} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20">
        <Container narrow>
          <Reveal>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-serif text-2xl text-navy-800">
                Important caveats.
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-navy-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>
                    <strong>This is a tooling output, not legal advice.</strong>{" "}
                    Always verify the deadline against the live court rule
                    before relying on it. Marco Reid is a tooling vendor;
                    the credentialled professional carries the regulatory
                    authority for advice.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>
                    <strong>Public holidays not yet handled.</strong>{" "}
                    Business-day math currently skips Saturdays + Sundays.
                    Wave 2 wires the four public-holiday calendars
                    (NZ / AU state-by-state / UK England-Wales / US federal +
                    state) so deadlines that fall on a non-court-day roll to
                    the next available day automatically.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>
                    <strong>Rule subset.</strong> The catalogue is the
                    high-volume rules across the four jurisdictions. Specialty
                    pages link to the rules they care about; the catalogue
                    grows as firms onboard who practise more areas. Don&rsquo;t
                    see your court? Tell us.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>
                    <strong>Service-of-process variations.</strong> Many rules
                    extend if the document is served outside the jurisdiction
                    or by post. Verify per-rule before counting.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
