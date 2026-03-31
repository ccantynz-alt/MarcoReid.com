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
  { name: "Email", detail: "Dictate entire emails. Legal terminology preserved exactly as spoken." },
  { name: "Documents", detail: "Draft contracts, motions, briefs, financial reports. All by voice." },
  { name: "Oracle", detail: "Speak your research question naturally. Get verified results instantly." },
  { name: "Billing", detail: "\"Six point five hours, Rodriguez H-1B, I-129 filing\" \u2014 done." },
  { name: "Notes", detail: "Dictate case updates. Billable time extracted automatically." },
  { name: "Calendar", detail: "Schedule meetings by voice. Zoom link generated. Invite sent." },
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
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <Container className="relative text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            AlecRae Voice
          </p>
          <h1 className="mt-6 text-display-2xl font-serif text-gradient">
            Speak. It is done.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-text-secondary">
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
      <div className="glow-line mx-auto max-w-xs" />
      <section className="py-32 sm:py-44">
        <Container className="text-center">
          <p className="text-display-2xl font-serif text-text-primary">
            3&ndash;4<span className="text-accent">h</span>
          </p>
          <p className="mt-6 text-xl text-text-secondary">
            recovered every day by speaking instead of typing
          </p>
          <p className="mt-3 text-text-tertiary">
            At $350/hour &mdash; $1,050&ndash;1,400 of additional billing
            capacity. From one feature.
          </p>
        </Container>
      </section>

      {/* Surfaces */}
      <section className="py-32 sm:py-44">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            Everywhere
          </p>
          <h2 className="mt-6 text-center text-display font-serif text-text-primary">
            Everywhere you type, you can speak.
          </h2>
          <p className="mt-6 text-center text-xl text-text-secondary">
            Not a standalone tool. The platform&rsquo;s intelligence layer.
          </p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((s) => (
              <div key={s.name} className="card-dark">
                <p className="text-lg font-semibold text-text-primary">
                  {s.name}
                </p>
                <p className="mt-2 text-sm text-text-secondary">{s.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Languages */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Global
          </p>
          <h2 className="mt-6 text-display font-serif text-text-primary">
            9 languages. Day one.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-text-secondary">
            Professional vocabulary intelligence in every language.
            Not just transcription.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-surface-border bg-surface-raised px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
              >
                {lang}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-32 sm:py-44">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
            Intelligence
          </p>
          <h2 className="mt-6 text-center text-display font-serif text-text-primary">
            Professional language intelligence.
          </h2>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature} className="card-dark">
                <p className="text-lg font-medium text-text-primary">
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
