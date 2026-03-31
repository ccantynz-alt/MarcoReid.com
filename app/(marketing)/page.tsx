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
      {/* THE NUMBERS — impact stats                    */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
              The impact
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-center text-display-xl font-serif text-gradient">
              Built to save you thousands of hours.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 sm:grid-cols-4">
            <Reveal delay={0.1}>
              <div className="text-center">
                <p className="font-serif text-display-xl text-text-primary">
                  <AnimatedCounter end={20} suffix="h" className="text-text-primary" />
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  saved per week for attorneys
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center">
                <p className="font-serif text-display-xl text-text-primary">
                  <AnimatedCounter end={18} suffix="h" className="text-text-primary" />
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  saved per week per CPA
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-center">
                <p className="font-serif text-display-xl text-accent">
                  <AnimatedCounter end={5250} prefix="$" className="text-accent" />
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  billing capacity recovered weekly
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="text-center">
                <p className="font-serif text-display-xl text-amber-400">
                  <AnimatedCounter end={9} className="text-amber-400" />
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  languages from day one
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="glow-line-gold mx-auto max-w-sm" />

      {/* ============================================= */}
      {/* PRODUCT 1: AlecRae Law — Grand Entrance       */}
      {/* ============================================= */}
      <section id="products" className="py-32 sm:py-44">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-widest text-accent">
                  Product One
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-display font-serif text-text-primary">
                  AlecRae Law.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-2 text-headline font-serif text-gradient">
                  The operating system for your legal practice.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  Case management. Trust accounting. Court-rules calendaring.
                  Document AI. Billing. E-signatures. Legal forms. Client
                  portal. Everything a lawyer needs from first client contact
                  to final invoice &mdash; in one platform, with one login.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 flex gap-4">
                  <Button href="/law">Learn more</Button>
                  <Button href="/pricing" variant="ghost">
                    See pricing &rarr;
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <DashboardMockup />
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-sm" />

      {/* ============================================= */}
      {/* PRODUCT 2: The Oracle — Grand Entrance        */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal delay={0.2} className="order-2 lg:order-1">
              <OracleMockup />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-widest text-purple-400">
                  Product Two
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-display font-serif text-text-primary">
                  The Oracle.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-2 text-headline font-serif text-gradient-oracle">
                  Research that crosses every boundary.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  Cross-domain legal and accounting AI research. Ask questions
                  that span both disciplines simultaneously. Every citation
                  verified against authoritative public domain sources.
                  Hallucination prevention built into the core. The research
                  tool nobody else can build &mdash; because nobody else owns
                  both sides.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 flex gap-4">
                  <Button href="/oracle">Learn more</Button>
                  <Button href="/pricing" variant="ghost">
                    See pricing &rarr;
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-sm" />

      {/* ============================================= */}
      {/* PRODUCT 3: AlecRae Voice — Grand Entrance     */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
                  Product Three
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 text-display font-serif text-text-primary">
                  AlecRae Voice.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-2 text-headline font-serif text-gradient-voice">
                  Speak. It is done.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  Not a dictation tool. The platform&rsquo;s intelligence
                  layer. Everywhere you can type, you can speak. Legal and
                  accounting vocabulary. Nine languages. Voice commands that
                  file motions, log billing entries, schedule meetings, and
                  query The Oracle &mdash; all without touching a keyboard.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 flex gap-4">
                  <Button href="/dictation">Learn more</Button>
                  <Button href="/pricing" variant="ghost">
                    See pricing &rarr;
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <VoiceMockup />
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-sm" />

      {/* ============================================= */}
      {/* PRODUCT 4: AlecRae Accounting                 */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-blue-400">
              Product Four
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-center text-display font-serif text-text-primary">
              AlecRae Accounting.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-2 max-w-md text-center text-headline font-serif text-gradient">
              AI-powered accounting for modern firms.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-text-secondary">
              Automated bookkeeping. Bank feed integration. Tax compliance.
              Receipt scanning. AI spreadsheets. Financial reporting.
              Everything your firm needs to serve clients faster and bill
              more hours.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Bank feeds", desc: "Auto-pull and categorise every transaction" },
                { label: "Tax compliance", desc: "US federal and state, always current" },
                { label: "AI reconciliation", desc: "Months of work compressed to minutes" },
                { label: "Receipt scanning", desc: "Photo to coded expense in seconds" },
              ].map((f) => (
                <div key={f.label} className="card-dark text-center">
                  <p className="text-sm font-semibold text-text-primary">
                    {f.label}
                  </p>
                  <p className="mt-2 text-xs text-text-secondary">{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/accounting">Learn more</Button>
              <Button href="/pricing" variant="ghost">
                See pricing &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line-gold mx-auto max-w-sm" />

      {/* ============================================= */}
      {/* MANIFESTO — The emotional close                */}
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
              craft &mdash; not to spend their days on admin, research grunt
              work, and chasing clients for information.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-xl leading-relaxed text-text-secondary">
              AlecRae handles the machine work. You handle the judgment work.
              Four products. One platform. No compromises. The most advanced
              professional intelligence system ever created.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ============================================= */}
      {/* FINAL CTA                                     */}
      {/* ============================================= */}
      <section className="relative py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[700px] rounded-full bg-accent/5 blur-[150px]" />
          <div className="absolute h-[300px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display-xl font-serif text-gradient-gold">
              This is it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-text-secondary">
              The platform that replaces everything. Coming 2026.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/law" size="lg">
                Explore AlecRae Law
              </Button>
              <Button href="/oracle" variant="secondary" size="lg">
                Explore The Oracle
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
