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
    </>
  );
}
