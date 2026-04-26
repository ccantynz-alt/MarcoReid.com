import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "CPD / CLE tracking — compliant by default",
  description:
    "Track Continuing Professional Development hours against NZLS, CA ANZ, AU and UK requirements. Auto-claim CPD when you attend a CLE on the platform, capture reflection, generate the annual return.",
};

const regimes = [
  { body: "NZLS — 10 hours / year, with reflection and a CPD plan", name: "New Zealand lawyers" },
  { body: "CA ANZ — 20 hours / year, balanced across structured and unstructured", name: "Chartered accountants (NZ + AU)" },
  { body: "Law Society NSW / VIC / QLD — 10 MCLE units / year", name: "Australian lawyers" },
  { body: "SRA — 16 hours / year, plus reflective declaration", name: "England & Wales solicitors" },
  { body: "CPA Australia — 20 hours / year (40 hours / triennium)", name: "CPA Australia members" },
];

const features = [
  { title: "Auto-claim from in-platform learning", body: "Watch a Marco Reid masterclass or attend a partner-hosted briefing inside the platform — the CPD record drafts itself with title, provider, hours, and a reflection prompt." },
  { title: "External activity capture in 30 seconds", body: "Title, provider, hours, category, attach the certificate. Reflection is a single text box with prompts so the entry is compliant on submission." },
  { title: "Reflection prompts that satisfy NZLS", body: "NZ lawyers must record a reflection per activity. Marco prompts you for what you learned, what you'll change, and the link to your CPD plan. The plan itself lives in the dashboard." },
  { title: "Year-end return generated, not assembled", body: "At the end of the practice year, your CPD return drafts itself. Submit to NZLS, CA ANZ, or your home regulator with one click." },
  { title: "Multi-jurisdiction tracking", body: "Practising in NZ and AU? Marco maps each entry to the regimes it satisfies — many activities count for both." },
  { title: "Audit-ready evidence vault", body: "Certificates, reflections, dates, hours, all stored against your professional record. Ready in minutes if your regulator audits you." },
];

export default function CpdPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              CPD / CLE tracker
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Stop chasing hours every March.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Continuing Professional Development logged automatically when you
              learn on the platform, captured in thirty seconds when you learn
              elsewhere, and generated as a finished annual return when the
              year ends. NZLS, CA ANZ, Law Society of NSW, SRA, CPA Australia.
            </p>
            <div className="mt-10">
              <Button href="/trial" variant="gold" size="lg">
                Start tracking on the trial &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Regimes supported on launch.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regimes.map((r) => (
              <Reveal key={r.name} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    {r.name}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{r.body}</p>
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
              How it works.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}
