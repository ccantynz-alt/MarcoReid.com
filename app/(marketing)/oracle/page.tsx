import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import OracleMockup from "@/app/components/marketing/OracleMockup";
import Reveal from "@/app/components/effects/Reveal";
import MockupReveal from "@/app/components/effects/MockupReveal";
import Sparkles from "@/app/components/effects/Sparkles";

export const metadata: Metadata = {
  title: "The Oracle \u2014 Cross-Domain Legal and Accounting AI Research",
  description:
    "Ask questions that span law and accounting simultaneously. Every citation verified against authoritative public domain sources.",
};

const product = PRODUCTS.oracle;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "Research",
  operatingSystem: "Web",
  description: product.description,
  url: `${BRAND.url}/oracle`,
};

export default function OraclePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Sparkles />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/8 blur-[150px] animate-glow-pulse" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <Container className="relative text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-widest text-purple-400 opacity-0">
            The Oracle
          </p>
          <h1 className="mt-8 animate-fade-in-up-delay text-display-2xl font-serif text-gradient-oracle opacity-0">
            Research that crosses
            <br />
            every boundary.
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

      {/* Oracle mockup */}
      <section className="py-20 sm:py-32">
        <Container>
          <MockupReveal className="mx-auto max-w-4xl" glowColor="rgba(139, 92, 246, 0.08)">
            <OracleMockup />
          </MockupReveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-sm" />

      {/* Citation verification */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-purple-400">
              Verification system
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-text-primary">
              Zero hallucinations. Zero fabricated citations.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="card-dark text-center">
                <p className="font-serif text-5xl text-accent">&check;</p>
                <p className="mt-4 text-lg font-semibold text-text-primary">Verified</p>
                <p className="mt-2 text-sm text-text-secondary">
                  Confirmed in authoritative public domain source with direct link
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card-dark text-center">
                <p className="font-serif text-5xl text-yellow-500">&minus;</p>
                <p className="mt-4 text-lg font-semibold text-text-primary">Unverified</p>
                <p className="mt-2 text-sm text-text-secondary">
                  Could not be confirmed. Flagged for manual verification
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="card-dark text-center">
                <p className="font-serif text-5xl text-red-400">&times;</p>
                <p className="mt-4 text-lg font-semibold text-text-primary">Not Found</p>
                <p className="mt-2 text-sm text-text-secondary">
                  Does not exist in any authoritative source. Blocked from use
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cross-domain moat */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>
        <Container narrow className="relative">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-purple-400">
              The moat
            </p>
            <h2 className="mt-6 text-display font-serif text-text-primary">
              The product nobody else can build.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-xl italic leading-relaxed text-text-secondary">
              &ldquo;What are the immigration tax implications of this corporate
              structure for a Tier-1 visa applicant?&rdquo;
            </p>
            <p className="mt-6 text-xl leading-relaxed text-text-secondary">
              That query requires both law and accounting AI. Nobody else owns
              both sides. Only AlecRae can answer it.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Features */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-text-primary">
              Capabilities.
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
          <div className="h-[400px] w-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display-xl font-serif text-gradient-oracle">
              Research without boundaries.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-text-secondary">
              Legal and accounting intelligence in one search.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/dictation" variant="secondary" size="lg">Explore Voice</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
