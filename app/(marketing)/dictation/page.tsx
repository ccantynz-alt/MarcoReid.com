import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import VoiceMockup from "@/app/components/marketing/VoiceMockup";
import Reveal from "@/app/components/effects/Reveal";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Sparkles from "@/app/components/effects/Sparkles";

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
  { name: "Documents", detail: "Draft contracts, motions, briefs by voice." },
  { name: "Oracle", detail: "Speak your research question. Get verified results." },
  { name: "Billing", detail: "Log time entries and expenses in seconds." },
  { name: "Notes", detail: "Dictate case updates. Billable time extracted." },
  { name: "Calendar", detail: "Schedule meetings by voice. Invites sent." },
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
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Sparkles />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[150px] animate-glow-pulse" />
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-[300px] w-[400px] rounded-full bg-amber-500/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "3s" }} />
        <Container className="relative text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-widest text-amber-400 opacity-0">
            AlecRae Voice
          </p>
          <h1 className="mt-8 animate-fade-in-up-delay text-display-2xl font-serif text-gradient-voice opacity-0">
            Speak. It is done.
          </h1>
          <p className="mx-auto mt-8 max-w-xl animate-fade-in-up-delay-2 text-xl leading-relaxed text-text-secondary opacity-0">
            {product.description}
          </p>
          <div className="mt-12 animate-fade-in-up-delay-3 opacity-0">
            <Button href="/pricing" size="lg">See pricing</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Voice mockup */}
      <section className="py-20 sm:py-32">
        <Container>
          <Reveal>
            <VoiceMockup />
          </Reveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-sm" />

      {/* Stats */}
      <section className="py-32 sm:py-44">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display-xl text-text-primary">
                <AnimatedCounter end={4} suffix="h" />
              </p>
              <p className="mt-2 text-sm text-text-secondary">recovered every day</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display-xl text-accent">
                $<AnimatedCounter end={1400} />
              </p>
              <p className="mt-2 text-sm text-text-secondary">daily billing capacity from one feature</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display-xl text-amber-400">
                <AnimatedCounter end={9} />
              </p>
              <p className="mt-2 text-sm text-text-secondary">languages with professional vocabulary</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Surfaces */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
              Everywhere
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-text-primary">
              Everywhere you type, you can speak.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((s, i) => (
              <Reveal key={s.name} delay={0.1 + i * 0.05}>
                <div className="card-glow">
                  <p className="text-lg font-semibold text-text-primary">{s.name}</p>
                  <p className="mt-2 text-sm text-text-secondary">{s.detail}</p>
                </div>
              </Reveal>
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
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
              Global
            </p>
            <h2 className="mt-6 text-display font-serif text-text-primary">
              9 languages. Day one.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {languages.map((lang) => (
                <span key={lang} className="rounded-full border border-surface-border bg-surface-raised px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary">
                  {lang}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Features + Disclaimer */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-text-primary">
              Professional language intelligence.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature, i) => (
              <Reveal key={feature} delay={0.1 + i * 0.05}>
                <div className="card-glow">
                  <p className="text-lg font-medium text-text-primary">{feature}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display-xl font-serif text-gradient-voice">
              Stop typing. Start speaking.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Law</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
