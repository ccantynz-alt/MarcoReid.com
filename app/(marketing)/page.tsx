import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Button from "@/app/components/shared/Button";
import HeroSlideshow from "@/app/components/marketing/HeroSlideshow";
import OracleMockup from "@/app/components/marketing/OracleMockup";
import VoiceMockup from "@/app/components/marketing/VoiceMockup";
import DashboardMockup from "@/app/components/marketing/DashboardMockup";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";
import MockupReveal from "@/app/components/effects/MockupReveal";
import TypingDemo from "@/app/components/effects/TypingDemo";

export const metadata: Metadata = {
  title: "AlecRae \u2014 The Most Advanced Professional Platform Ever Built",
  description:
    "AI-powered law, accounting, research, and voice intelligence. Four revolutionary products under one roof. The operating system for legal and accounting professionals.",
};

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

const heroSlides = [
  {
    eyebrow: "AlecRae Law",
    title: (
      <>
        <span className="text-gradient">The operating system</span>
        <br />
        <span className="text-text-primary">for your legal practice.</span>
      </>
    ),
    subtitle:
      "Case management. Trust accounting. Court-rules calendaring. Document AI. Billing. E-signatures. Client portal. Every tool a lawyer needs — in one platform, with one login.",
    features: [
      "Case management",
      "Trust accounting",
      "Court calendaring",
      "Document AI",
      "Billing",
      "E-signatures",
      "Client portal",
      "Legal forms",
    ],
    cta: { label: "Explore AlecRae Law", href: "/law" },
    glowColor: "rgba(16, 185, 129, 0.08)",
    glowColor2: "rgba(59, 130, 246, 0.04)",
    accentColor: "#10b981",
    mockup: <DashboardMockup />,
  },
  {
    eyebrow: "The Oracle",
    title: (
      <>
        <span className="text-gradient-oracle">Research that crosses</span>
        <br />
        <span className="text-text-primary">every boundary.</span>
      </>
    ),
    subtitle:
      "Cross-domain legal and accounting AI research. Every citation verified against authoritative public sources. The research engine nobody else can build — because nobody else owns both sides.",
    features: [
      "Cross-domain AI",
      "Citation verification",
      "Public domain sources",
      "Zero hallucinations",
      "Inline everywhere",
      "\u2318K command palette",
    ],
    cta: { label: "Explore The Oracle", href: "/oracle" },
    glowColor: "rgba(139, 92, 246, 0.08)",
    glowColor2: "rgba(99, 102, 241, 0.04)",
    accentColor: "#a78bfa",
    mockup: <OracleMockup />,
  },
  {
    eyebrow: "AlecRae Voice",
    title: (
      <>
        <span className="text-gradient-voice">Speak.</span>
        <br />
        <span className="text-text-primary">It is done.</span>
      </>
    ),
    subtitle:
      "Not a dictation tool. The platform\u2019s intelligence layer. Legal and accounting vocabulary in 9 languages. Voice commands that file, bill, schedule, and research — all without a keyboard.",
    features: [
      "9 languages",
      "Legal vocabulary",
      "Accounting vocabulary",
      "Voice commands",
      "Every input field",
      "Context-aware grammar",
    ],
    cta: { label: "Explore AlecRae Voice", href: "/dictation" },
    glowColor: "rgba(245, 158, 11, 0.08)",
    glowColor2: "rgba(16, 185, 129, 0.04)",
    accentColor: "#f59e0b",
    mockup: <VoiceMockup />,
  },
  {
    eyebrow: "AlecRae Accounting",
    title: (
      <>
        <span className="text-gradient">AI-powered accounting</span>
        <br />
        <span className="text-text-primary">for modern firms.</span>
      </>
    ),
    subtitle:
      "Automated bookkeeping. Bank feed integration. Tax compliance. Receipt scanning. AI spreadsheets. Every accounting workflow, powered by intelligence.",
    features: [
      "Bank feeds via Plaid",
      "AI reconciliation",
      "Tax compliance",
      "Receipt scanning",
      "AI spreadsheets",
      "E-signatures",
    ],
    cta: { label: "Explore Accounting", href: "/accounting" },
    glowColor: "rgba(59, 130, 246, 0.08)",
    glowColor2: "rgba(16, 185, 129, 0.04)",
    accentColor: "#3b82f6",
    mockup: <DashboardMockup />,
  },
];

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={softwareSchema} />

      {/* ============================================= */}
      {/* HERO SLIDESHOW — the grand entrance            */}
      {/* Each product gets its own full-screen moment   */}
      {/* ============================================= */}
      <HeroSlideshow slides={heroSlides} />

      {/* ============================================= */}
      {/* IMPACT NUMBERS                                 */}
      {/* ============================================= */}
      <section className="py-32 sm:py-44" aria-label="Platform impact statistics">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
              The impact
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-text-primary">
              Built to save you thousands of hours.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { end: 20, suffix: "", label: "hours saved", desc: "per attorney, per week", color: "from-emerald-500/10", textColor: "text-text-primary", labelColor: "text-accent" },
              { end: 7000, suffix: "", prefix: "$", label: "recovered weekly", desc: "in billing capacity", color: "from-amber-500/10", textColor: "text-amber-400", labelColor: "text-amber-400" },
              { end: 100, suffix: "%", label: "citations verified", desc: "zero hallucinations", color: "from-purple-500/10", textColor: "text-purple-400", labelColor: "text-purple-400" },
              { end: 9, suffix: "", label: "languages", desc: "with professional vocabulary", color: "from-blue-500/10", textColor: "text-blue-400", labelColor: "text-blue-400" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.1}>
                <div className={`group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-8 text-center transition-all duration-500 hover:border-surface-border-light hover:scale-[1.02]`}>
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${stat.color} to-transparent opacity-50 transition-opacity group-hover:opacity-100`} />
                  <p className={`relative font-serif text-display ${stat.textColor}`}>
                    <AnimatedCounter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className={`relative mt-1 text-sm font-semibold ${stat.labelColor}`}>
                    {stat.label}
                  </p>
                  <p className="relative mt-1 text-xs text-text-tertiary">
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="glow-line-gold mx-auto max-w-md" />

      {/* ============================================= */}
      {/* DEEP DIVES — for people who scroll              */}
      {/* ============================================= */}

      {/* AlecRae Law deep dive */}
      <section className="relative py-32 sm:py-44" aria-label="AlecRae Law details">
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
              Your entire practice.{" "}
              <span className="text-gradient">One platform.</span>
            </h2>
          </Reveal>

          <MockupReveal className="mx-auto mt-16 max-w-4xl" glowColor="rgba(16, 185, 129, 0.08)">
            <DashboardMockup />
          </MockupReveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/law">Explore AlecRae Law</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-md" />

      {/* The Oracle deep dive */}
      <section className="relative py-32 sm:py-44" aria-label="The Oracle details">
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
              The research engine{" "}
              <span className="text-gradient-oracle">nobody else can build.</span>
            </h2>
          </Reveal>

          <MockupReveal className="mx-auto mt-16 max-w-4xl" glowColor="rgba(139, 92, 246, 0.08)">
            <OracleMockup />
          </MockupReveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/oracle">Explore The Oracle</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-md" />

      {/* AlecRae Voice deep dive */}
      <section className="relative py-32 sm:py-44" aria-label="AlecRae Voice details">
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

          {/* Live typing demo */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-500/20 bg-surface-raised p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="pulse-ring absolute inset-0 rounded-full border-2 border-amber-400/40" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                    <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-amber-400">AlecRae Voice &mdash; listening</p>
                  <TypingDemo className="mt-1 text-sm" />
                </div>
              </div>
            </div>
          </Reveal>

          <MockupReveal className="mx-auto mt-12 max-w-4xl" glowColor="rgba(245, 158, 11, 0.08)">
            <VoiceMockup />
          </MockupReveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/dictation">Explore AlecRae Voice</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="glow-line mx-auto max-w-md" />

      {/* AlecRae Accounting deep dive */}
      <section className="relative py-32 sm:py-44" aria-label="AlecRae Accounting details">
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
              AI-powered accounting.{" "}
              <span className="text-gradient">Zero compromise.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                { label: "Bank feed integration", desc: "Auto-pull and categorise every transaction via Plaid", icon: "↓" },
                { label: "AI reconciliation", desc: "Months of manual work compressed into minutes", icon: "⚡" },
                { label: "Tax compliance", desc: "US federal and 50-state tax, always current", icon: "✓" },
                { label: "Receipt scanning", desc: "Photo to auto-coded expense in under 3 seconds", icon: "📸" },
                { label: "AI spreadsheets", desc: "Financial modelling with voice and AI assistance", icon: "◈" },
                { label: "E-signatures", desc: "Engagement letters signed without leaving the platform", icon: "✍" },
              ].map((f) => (
                <div key={f.label} className="group flex items-start gap-4 rounded-2xl border border-surface-border bg-surface-raised p-6 transition-all duration-500 hover:border-surface-border-light hover:scale-[1.02]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-lg text-blue-400 transition-transform group-hover:scale-110">
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
          <Reveal delay={0.2}>
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
      <section className="py-32 sm:py-44" aria-label="Our philosophy">
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
      {/* FINAL CTA                                     */}
      {/* ============================================= */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
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
