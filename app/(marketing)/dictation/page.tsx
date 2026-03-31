import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import CtaSection from "@/app/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "AlecRae Voice \u2014 Speak. It Is Done.",
  description:
    "The universal input layer for legal and accounting professionals. Dictate with professional vocabulary intelligence in 9 languages.",
};

const product = PRODUCTS.voice;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "Productivity",
  operatingSystem: "Web",
  description: product.description,
  url: `${BRAND.url}/dictation`,
};

const surfaces = [
  { name: "Email", detail: "Dictate entire emails. Legal terminology preserved." },
  { name: "Documents", detail: "Draft contracts, motions, briefs, reports by voice." },
  { name: "Research", detail: "Speak your Oracle query. Search precisely." },
  { name: "Billing", detail: "Log time entries and expenses in seconds." },
  { name: "Notes", detail: "Dictate case updates. Billable time extracted." },
  { name: "Calendar", detail: "Schedule meetings by voice. Invites sent instantly." },
];

const languages = [
  "English", "Spanish", "Mandarin", "Hindi", "Japanese",
  "French", "Arabic", "Portuguese", "Korean",
];

export default function DictationPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="pb-24 pt-32 sm:pb-36 sm:pt-44">
        <Container className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            AlecRae Voice
          </p>
          <h1 className="mt-6 text-display-xl font-serif text-neutral-950">
            Speak. It is done.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-neutral-600">
            {product.description}
          </p>
          <div className="mt-12">
            <Button href="/pricing" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      {/* Stat */}
      <section className="bg-neutral-200 py-20 sm:py-28">
        <Container className="text-center">
          <p className="text-display-xl font-serif text-neutral-950">
            3&ndash;4
          </p>
          <p className="mt-4 text-xl text-neutral-600">
            hours recovered every day by speaking instead of typing
          </p>
          <p className="mt-2 text-neutral-500">
            At $350/hour, that is $1,050&ndash;1,400 of additional billing
            capacity. From one feature.
          </p>
        </Container>
      </section>

      {/* Surfaces */}
      <section className="py-24 sm:py-36">
        <Container>
          <h2 className="text-center text-display font-serif text-neutral-950">
            Everywhere you type, you can speak.
          </h2>
          <p className="mt-6 text-center text-xl text-neutral-600">
            Not a standalone tool. The platform&rsquo;s intelligence layer.
          </p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((s) => (
              <div key={s.name} className="rounded-2xl bg-neutral-200 px-8 py-6">
                <p className="text-lg font-semibold text-neutral-950">
                  {s.name}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{s.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Languages */}
      <section className="bg-neutral-100 py-24 sm:py-36">
        <Container className="text-center">
          <h2 className="text-display font-serif text-neutral-950">
            9 languages. Day one.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-neutral-600">
            Professional vocabulary intelligence in every language. Not just
            transcription.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700"
              >
                {lang}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Capability list */}
      <section className="py-24 sm:py-36">
        <Container>
          <h2 className="text-center text-display font-serif text-neutral-950">
            Professional language intelligence.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl bg-neutral-200 px-8 py-6"
              >
                <p className="text-lg font-medium text-neutral-950">
                  {feature}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      <CtaSection
        title={"Stop typing.\nStart speaking."}
        subtitle="AlecRae Voice gives professionals back hours every day."
      />
    </>
  );
}
