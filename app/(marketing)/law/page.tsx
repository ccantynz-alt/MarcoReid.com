import type { Metadata } from "next";
import { PRODUCTS, BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import DashboardMockup from "@/app/components/marketing/DashboardMockup";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";
import Sparkles from "@/app/components/effects/Sparkles";

export const metadata: Metadata = {
  title: "AlecRae Law \u2014 The Operating System for Your Legal Practice",
  description:
    "Full-stack legal practice management powered by AI. Case management, billing, trust accounting, document drafting, court-rules calendaring, and The Oracle legal research.",
};

const product = PRODUCTS.law;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description: product.description,
  url: `${BRAND.url}/law`,
};

export default function LawPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Sparkles />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[150px] animate-glow-pulse" />
        <Container className="relative text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-widest text-accent opacity-0">
            AlecRae Law
          </p>
          <h1 className="mt-8 animate-fade-in-up-delay text-display-2xl font-serif text-gradient opacity-0">
            The operating system
            <br />
            for your legal practice.
          </h1>
          <p className="mx-auto mt-8 max-w-xl animate-fade-in-up-delay-2 text-xl leading-relaxed text-text-secondary opacity-0">
            {product.description}
          </p>
          <div className="mt-12 animate-fade-in-up-delay-3 opacity-0">
            <Button href="/pricing" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Dashboard mockup */}
      <section className="py-20 sm:py-32">
        <Container>
          <Reveal>
            <DashboardMockup />
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
                <AnimatedCounter end={20} suffix="h" />
              </p>
              <p className="mt-2 text-sm text-text-secondary">saved per week, per attorney</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display-xl text-accent">
                $<AnimatedCounter end={7000} />
              </p>
              <p className="mt-2 text-sm text-text-secondary">billing capacity recovered weekly</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display-xl text-amber-400">
                <AnimatedCounter end={8} />
              </p>
              <p className="mt-2 text-sm text-text-secondary">integrated modules, one platform</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
              Capabilities
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-text-primary">
              Everything. Nothing else.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature, i) => (
              <Reveal key={feature} delay={0.1 + i * 0.05}>
                <div className="card-glow">
                  <p className="text-lg font-medium text-text-primary">
                    {feature}
                  </p>
                </div>
              </Reveal>
            ))}
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
            <h2 className="text-display-xl font-serif text-gradient">
              Your entire practice.
              <br />
              One platform.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-text-secondary">
              From first client contact to final invoice.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/oracle" variant="secondary" size="lg">Explore The Oracle</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
