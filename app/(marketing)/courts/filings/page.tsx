import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Filings \u2014 E-Filing Reimagined",
  description:
    "A sane wrapper over PACER, CM/ECF, CE-File and friends. AI form-filling for self-represented litigants. Fewer rejections, faster processing.",
};

export default function FilingsPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center">
        <Container className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
            Marco Reid Filings
          </p>
          <h1 className="mt-8 text-hero font-serif">
            <span className="text-forest-500">E-filing</span>
            <br />
            <span className="text-navy-700">that doesn&rsquo;t make people cry.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-400">
            More than 70% of civil cases have at least one self-represented litigant.
            PACER, CM/ECF, CE-File, eCourts &mdash; every system was built for lawyers and
            still defeats them. Marco Reid Filings is a clean wrapper with AI form-filling
            for pro se litigants and an API for everyone else.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Button href="/courts/pilot" size="lg">Request a pilot</Button>
            <Button href="/courts" variant="secondary" size="lg">Back to Courts</Button>
          </div>
        </Container>
      </section>

      {/* Problem narrative */}
      <section className="bg-navy-50 py-32" aria-label="The problem">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-navy-500">
              <h2 className="text-display font-serif text-navy-700">
                E-filing is broken for everyone.
              </h2>
              <p>
                E-filing should be the simplest part of the justice system. Instead, it is a
                nightmare of disconnected portals, incompatible formats, and instructions written
                for lawyers who already know the system. Pro se litigants &mdash; who now make
                up the majority of civil cases &mdash; cannot navigate PACER, CM/ECF, or any of
                the state-level systems without legal training. The result is a flood of rejected
                filings, missed deadlines, and cases that stall before they ever reach a judge.
              </p>
              <p>
                For clerks, the burden is just as heavy. Every rejected filing triggers a notice,
                a re-submission, and another round of manual review. Data entry and validation
                consume hours that should be spent on case processing. Filing errors waste
                everyone&rsquo;s time &mdash; the litigant who doesn&rsquo;t understand what went
                wrong, the lawyer who filled out the wrong form, and the clerk who has to explain
                the same mistake for the hundredth time that week.
              </p>
              <p>
                Marco Reid Filings replaces this dysfunction with a single intelligent layer that
                sits on top of existing court systems. It guides filers through the process in
                plain language, validates every submission before it reaches the clerk, and
                auto-calculates deadlines so nothing falls through the cracks.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-32" aria-label="How it works">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              How it works.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Fill forms with AI auto-complete",
                desc: "Litigants or lawyers answer plain-language questions. Marco determines which forms are needed, maps answers to the correct fields, and generates court-ready documents &mdash; in any of 100+ supported languages.",
              },
              {
                step: "2",
                title: "Validate before submission",
                desc: "Before a filing is submitted, Marco checks for missing signatures, incorrect case numbers, jurisdictional errors, and formatting issues. Errors are caught and explained in plain language &mdash; not rejected days later by a clerk.",
              },
              {
                step: "3",
                title: "Confirm with deadlines auto-calculated",
                desc: "Court-stamped confirmation is issued immediately. Response deadlines, service requirements, and next hearing dates are auto-calculated and delivered to all parties &mdash; no manual calendaring required.",
              },
            ].map((s) => (
              <Reveal key={s.step} delay={0.1}>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-500 text-lg font-bold text-white">
                    {s.step}
                  </div>
                  <p className="mt-4 text-lg font-semibold text-navy-700">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32" aria-label="Features">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              What it does.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "Pro se intake wizard", desc: "Plain-language guided filings in 100+ languages" },
              { title: "Existing system bridge", desc: "PACER, CM/ECF, CE-File, Tyler Odyssey, eCourts" },
              { title: "AI form auto-fill", desc: "From intake answers to court-ready PDFs" },
              { title: "Pre-submission validation", desc: "Catch errors before the clerk does" },
              { title: "Fee waiver flow", desc: "IFP applications drafted automatically" },
              { title: "Service of process", desc: "Track and certify delivery" },
              { title: "Document assembly", desc: "Exhibits, declarations, proposed orders" },
              { title: "Open API", desc: "For practice management vendors and clinics" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="font-semibold text-navy-700">{f.title}</p>
                  <p className="mt-2 text-sm text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-32" aria-label="Pro se litigants deserve better">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              Pro se litigants deserve better.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              70% of family court cases involve self-represented litigants. They navigate
              40-page instruction manuals, arcane form codes, and filing systems designed for
              lawyers. Most get it wrong &mdash; 60% of pro se filings contain errors that
              delay justice. Marco Reid Filings changes that.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                title: "Guided filing wizard",
                desc: "Instead of a 40-page instruction manual, litigants answer plain-language questions in their own language. Marco determines which forms are needed, fills them out, and explains each step. No legal jargon, no guesswork &mdash; just a clear path from problem to filed petition.",
              },
              {
                title: "AI form auto-fill",
                desc: "Litigants describe their situation in plain English (or any of 100+ supported languages). Marco extracts the relevant facts, maps them to the correct form fields, calculates deadlines, and generates court-ready PDFs &mdash; formatted to local rules, every time.",
              },
              {
                title: "Real-time validation",
                desc: "Before a filing is submitted, Marco checks for missing signatures, incorrect case numbers, jurisdictional errors, deadline violations, and formatting issues. Errors are caught and explained in plain language &mdash; not rejected days later by a clerk with a rubber stamp.",
              },
            ].map((card) => (
              <Reveal key={card.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-lg font-semibold text-navy-700">{card.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32" aria-label="Impact">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-2xl font-serif leading-snug text-navy-700 md:text-3xl">
              &ldquo;<span className="text-forest-500">70%</span> of family court cases involve
              pro se litigants. <span className="text-forest-500">60%</span> of filings contain
              errors. Marco Reid Filings reduces errors to near zero.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <Button href="/courts/pilot" size="lg">
                Start a pilot in your courthouse
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Pilot CTA */}
      <section className="bg-navy-50 py-32" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-display font-serif text-navy-700">
              Request a pilot for your court.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Marco Reid Filings wraps your existing e-filing infrastructure &mdash; PACER,
              CM/ECF, Tyler Odyssey, or any state system &mdash; with an intelligent layer that
              guides filers, validates submissions, and eliminates the rejection cycle. Deploy in
              a single division or court-wide. The pilot is free and takes less than a week.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/courts/pilot" size="lg">Request a pilot</Button>
              <Button href="/contact" variant="secondary" size="lg">Talk to our team</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
