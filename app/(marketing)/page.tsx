import { BRAND } from "@/lib/constants";
import Hero from "@/app/components/marketing/Hero";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Button from "@/app/components/shared/Button";
import OracleMockup from "@/app/components/marketing/OracleMockup";
import VoiceMockup from "@/app/components/marketing/VoiceMockup";
import DashboardMockup from "@/app/components/marketing/DashboardMockup";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: BRAND.url,
  description: BRAND.description,
  slogan: BRAND.tagline,
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: BRAND.description,
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={softwareSchema} />

      <Hero />

      {/* ============================================= */}
      {/* IMPACT NUMBERS — massive, undeniable            */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
              The impact
            </p>
          </Reveal>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
                <p className="relative font-serif text-display text-text-primary">
                  <AnimatedCounter end={20} />
                </p>
                <p className="relative mt-1 text-sm font-semibold text-accent">
                  hours saved
                </p>
                <p className="relative mt-1 text-xs text-text-tertiary">
                  per attorney, per week
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
                <p className="relative font-serif text-display text-amber-400">
                  $<AnimatedCounter end={7000} />
                </p>
                <p className="relative mt-1 text-sm font-semibold text-amber-400">
                  recovered weekly
                </p>
                <p className="relative mt-1 text-xs text-text-tertiary">
                  in billing capacity
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
                <p className="relative font-serif text-display text-purple-400">
                  <AnimatedCounter end={100} />%
                </p>
                <p className="relative mt-1 text-sm font-semibold text-purple-400">
                  citations verified
                </p>
                <p className="relative mt-1 text-xs text-text-tertiary">
                  zero hallucinations
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-8 text-center">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
                <p className="relative font-serif text-display text-blue-400">
                  <AnimatedCounter end={9} />
                </p>
                <p className="relative mt-1 text-sm font-semibold text-blue-400">
                  languages
                </p>
                <p className="relative mt-1 text-xs text-text-tertiary">
                  with professional vocabulary
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============================================= */}
      {/* PRODUCT 1: AlecRae Law                        */}
      {/* ============================================= */}
      <section id="products" className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[800px] rounded-full bg-accent/5 blur-[180px]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30" />
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                01 &mdash; AlecRae Law
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/30" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 text-center text-display-xl font-serif text-text-primary">
              The operating system for
              <br />
              <span className="text-gradient">your legal practice.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-text-secondary">
              Case management. Trust accounting. Court-rules calendaring. Document AI.
              Billing. E-signatures. Client portal. Everything. One login.
            </p>
          </Reveal>

          {/* MASSIVE mockup — the centrepiece */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-16 max-w-4xl">
              {/* Glow halo behind mockup */}
              <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-accent/5 blur-3xl" />
              <div className="relative">
                <DashboardMockup />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/law">Explore AlecRae Law</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line-gold mx-auto max-w-md" />

      {/* ============================================= */}
      {/* PRODUCT 2: The Oracle                         */}
      {/* ============================================= */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[800px] rounded-full bg-purple-500/5 blur-[180px]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                02 &mdash; The Oracle
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 text-center text-display-xl font-serif text-text-primary">
              Research that crosses
              <br />
              <span className="text-gradient-oracle">every boundary.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-text-secondary">
              Cross-domain legal and accounting AI. Every citation verified.
              The research engine nobody else can build &mdash;
              because nobody else owns both sides.
            </p>
          </Reveal>

          {/* MASSIVE Oracle mockup */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-16 max-w-4xl">
              <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-purple-500/5 blur-3xl" />
              <div className="relative">
                <OracleMockup />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/oracle">Explore The Oracle</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-md" />

      {/* ============================================= */}
      {/* PRODUCT 3: AlecRae Voice                      */}
      {/* ============================================= */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[800px] rounded-full bg-accent/5 blur-[180px]" />
          <div className="absolute h-[300px] w-[400px] translate-x-1/4 rounded-full bg-amber-500/5 blur-[120px]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30" />
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                03 &mdash; AlecRae Voice
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 text-center text-display-xl font-serif text-text-primary">
              <span className="text-gradient-voice">Speak. It is done.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-text-secondary">
              Not a dictation tool. The platform&rsquo;s intelligence layer.
              Legal and accounting vocabulary. Nine languages. Voice commands
              that file, bill, schedule, and research &mdash; all by speaking.
            </p>
          </Reveal>

          {/* MASSIVE Voice mockup */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-16 max-w-4xl">
              <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-amber-500/5 blur-3xl" />
              <div className="relative">
                <VoiceMockup />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/dictation">Explore AlecRae Voice</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-md" />

      {/* ============================================= */}
      {/* PRODUCT 4: Accounting                         */}
      {/* ============================================= */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[700px] rounded-full bg-blue-500/5 blur-[150px]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/30" />
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                04 &mdash; AlecRae Accounting
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/30" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 text-center text-display-xl font-serif text-text-primary">
              AI-powered accounting
              <br />
              <span className="text-gradient">for modern firms.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-text-secondary">
              Automated bookkeeping. Bank feeds. Tax compliance. Receipt scanning.
              Financial reporting. Everything your firm needs to serve clients
              faster and bill more hours.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                { label: "Bank feed integration", desc: "Auto-pull and categorise every transaction via Plaid", icon: "↓" },
                { label: "AI reconciliation", desc: "Months of manual work compressed into minutes", icon: "⚡" },
                { label: "Tax compliance", desc: "US federal and 50-state tax, always current", icon: "✓" },
                { label: "Receipt scanning", desc: "Photo to auto-coded expense in under 3 seconds", icon: "📸" },
                { label: "AI spreadsheets", desc: "Financial modelling with voice and AI assistance", icon: "◈" },
                { label: "E-signatures", desc: "Engagement letters signed without leaving the platform", icon: "✍" },
              ].map((f) => (
                <div key={f.label} className="card-glow flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-lg text-blue-400">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-text-primary">{f.label}</p>
                    <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/accounting">Explore Accounting</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line-gold mx-auto max-w-md" />

      {/* ============================================= */}
      {/* MANIFESTO                                     */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
              The philosophy
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-display font-serif text-text-primary">
              We didn&rsquo;t build a tool.
              <br />
              <span className="text-gradient-gold">We built the future.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-xl leading-relaxed text-text-secondary">
              Lawyers and accountants became professionals to practise their
              craft &mdash; not to drown in admin. AlecRae handles the machine
              work. You handle the judgment work. Four products. One platform.
              The most advanced professional intelligence system ever created.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ============================================= */}
      {/* FINAL CTA — the close                         */}
      {/* ============================================= */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[180px]" />
          <div className="absolute left-1/3 top-1/3 h-[300px] w-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute right-1/3 bottom-1/3 h-[300px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display-2xl font-serif text-gradient-gold">
              This is it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-display font-serif text-text-secondary">
              The platform that replaces everything.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/law" size="lg">
                Explore AlecRae Law
              </Button>
              <Button href="/oracle" variant="secondary" size="lg">
                Explore The Oracle
              </Button>
              <Button href="/dictation" variant="secondary" size="lg">
                Explore Voice
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
