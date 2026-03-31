import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SectionHeading from "@/app/components/shared/SectionHeading";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import CtaSection from "@/app/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "AlecRae Voice \u2014 Speak. It Is Done.",
  description:
    "The universal input layer for legal and accounting professionals. Dictate emails, documents, billing entries, and research queries with professional vocabulary intelligence in 9 languages.",
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
  {
    name: "Email composer",
    description: "Dictate entire emails with professional grammar and legal terminology preserved",
  },
  {
    name: "Document editor",
    description: "Draft contracts, motions, briefs, and financial reports by voice",
  },
  {
    name: "Oracle queries",
    description: "Speak your research question naturally. The Oracle searches precisely",
  },
  {
    name: "Billing entries",
    description: "\"Six point five hours, Rodriguez H-1B, I-129 filing\" \u2014 logged instantly",
  },
  {
    name: "Matter notes",
    description: "Dictate case updates and call notes. Billable time extracted automatically",
  },
  {
    name: "Calendar",
    description: "Schedule meetings by voice. Zoom link generated. Invite sent. Matter tagged",
  },
];

const languages = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Hindi",
  "Japanese",
  "French",
  "Arabic",
  "Portuguese",
  "Korean",
];

export default function DictationPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-4xl font-serif text-4xl text-navy-500 sm:text-5xl lg:text-7xl">
            Speak. It is done.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-400 sm:text-xl">
            {product.description}
          </p>
          <div className="mt-10">
            <Button href="/pricing" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      {/* Time savings callout */}
      <section className="bg-navy-50 py-16">
        <Container className="text-center">
          <p className="font-serif text-5xl text-navy-500 sm:text-6xl">
            3{"\u2013"}4
          </p>
          <p className="mt-2 text-xl font-medium text-navy-400">
            hours recovered every day by speaking instead of typing
          </p>
          <p className="mt-2 text-navy-300">
            At $350/hour, that is $1,050{"\u2013"}1,400 of additional billing
            capacity. From one feature.
          </p>
        </Container>
      </section>

      {/* Where Voice appears */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Everywhere you type, you can speak"
            subtitle="Not a standalone tool. The platform's intelligence layer."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((surface) => (
              <div
                key={surface.name}
                className="rounded-xl border border-navy-100 bg-white p-6"
              >
                <p className="font-semibold text-navy-500">{surface.name}</p>
                <p className="mt-2 text-sm text-navy-400">
                  {surface.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Languages */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="9 languages from day one"
            subtitle="Professional vocabulary intelligence in every language"
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-500"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-navy-300">
            Not just transcription. Legal and accounting vocabulary intelligence
            in each language. A Spanish-speaking immigration attorney dictating
            in Spanish gets the same professional language understanding as an
            English-speaking attorney.
          </p>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading title="Professional language intelligence" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-6"
              >
                <span className="mt-0.5 text-navy-500">{"\u2713"}</span>
                <p className="font-medium text-navy-500">{feature}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      <CtaSection
        title="Stop typing. Start speaking."
        subtitle="AlecRae Voice gives professionals back hours every day."
      />
    </>
  );
}
