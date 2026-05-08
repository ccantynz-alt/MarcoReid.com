import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import SpecialtyMatrix from "@/app/components/marketing/SpecialtyMatrix";
import { SPECIALTIES } from "@/lib/specialties";

export const metadata: Metadata = {
  title: "Practice specialties — every branch, NZ + AU + UK + US",
  description:
    "Marco Reid covers 50+ legal and accounting specialties across NZ, AU, UK, and US. Filter by profession + jurisdiction; jump straight into the deep module for your specialty.",
};

export default function SpecialtiesPage() {
  const lawCount = SPECIALTIES.filter((s) => s.profession === "LAW").length;
  const accCount = SPECIALTIES.filter(
    (s) => s.profession === "ACCOUNTING",
  ).length;

  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Practice specialties
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Every branch your firm practises. On one platform.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              {lawCount} legal specialties. {accCount} accounting
              specialties. Across New Zealand, Australia, the United Kingdom,
              and the United States. Filter by profession and jurisdiction;
              every specialty links to the deep module that handles it.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SpecialtyMatrix specialties={SPECIALTIES} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Don&rsquo;t see your specialty?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The matrix above is the headline list. We add specialties as
              firms onboard who practise them. Tell us what you need and
              we&rsquo;ll add it &mdash; with the same rigour every other
              specialty page carries.
            </p>
          </Reveal>
          <p className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-navy-200 bg-white px-6 py-3 text-sm font-semibold text-navy-700 shadow-sm transition-all hover:border-gold-300 hover:shadow-md"
            >
              Request a specialty &rarr;
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
