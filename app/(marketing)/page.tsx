import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
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
  title: "AlecRae \u2014 Professional Intelligence for Law and Accounting",
  description:
    "The operating system for legal and accounting professionals. AI-powered practice management, research, voice dictation, and accounting \u2014 every tool your firm needs in one platform.",
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
        <span className="text-navy-800">Every tool your practice needs.</span>
        <br />
        <span className="text-forest-500">One platform.</span>
      </>
    ),
    subtitle:
      "Case management. Trust accounting. Court calendaring. Document AI. Billing. E-signatures. Client portal. Secure messaging. The Oracle for research. AlecRae Voice for dictation. One login. One bill.",
    features: ["Case management", "Trust accounting", "Court calendaring", "Document AI", "Billing", "E-signatures", "Client portal", "Messaging"],
    cta: { label: "Explore AlecRae Law", href: "/law" },
    accentClass: "text-forest-600",
    badgeBg: "bg-forest-50",
    badgeText: "text-forest-700",
    mockup: <DashboardMockup />,
  },
  {
    eyebrow: "The Oracle",
    title: (
      <>
        <span className="text-navy-800">The most intelligent</span>
        <br />
        <span className="text-plum-500">research engine on the planet.</span>
      </>
    ),
    subtitle:
      "Cross-domain legal and accounting AI research. Every citation verified against authoritative public sources. Ask questions that span both disciplines. The research engine nobody else can build.",
    features: ["Cross-domain AI", "Citation verification", "Zero hallucinations", "Inline everywhere", "\u2318K command palette", "Public domain sources"],
    cta: { label: "Explore The Oracle", href: "/oracle" },
    accentClass: "text-plum-600",
    badgeBg: "bg-plum-50",
    badgeText: "text-plum-700",
    mockup: <OracleMockup />,
  },
  {
    eyebrow: "AlecRae Voice",
    title: (
      <>
        <span className="text-navy-800">Speak.</span>
        {" "}
        <span className="text-forest-500">It is done.</span>
      </>
    ),
    subtitle:
      "Not a dictation tool. The platform\u2019s intelligence layer. Legal and accounting vocabulary in 9 languages. Voice commands that file motions, log billing, schedule meetings, and query The Oracle.",
    features: ["9 languages", "Legal vocabulary", "Accounting vocabulary", "Voice commands", "Every input field", "Context-aware grammar"],
    cta: { label: "Explore AlecRae Voice", href: "/dictation" },
    accentClass: "text-navy-600",
    badgeBg: "bg-navy-50",
    badgeText: "text-navy-700",
    mockup: <VoiceMockup />,
  },
  {
    eyebrow: "Accounting",
    title: (
      <>
        <span className="text-navy-800">AI-powered accounting</span>
        <br />
        <span className="text-forest-500">that CPAs trust.</span>
      </>
    ),
    subtitle:
      "Automated bookkeeping. Bank feeds via Plaid. Tax compliance across 50 states. Receipt scanning. AI reconciliation. The Oracle for tax research. Every accounting workflow, powered by intelligence.",
    features: ["Bank feeds", "AI reconciliation", "Tax compliance", "Receipt scanning", "AI spreadsheets", "E-signatures"],
    cta: { label: "Explore Accounting", href: "/accounting" },
    accentClass: "text-forest-600",
    badgeBg: "bg-forest-50",
    badgeText: "text-forest-700",
    mockup: <DashboardMockup />,
  },
];

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={softwareSchema} />

      <HeroSlideshow slides={heroSlides} />

      {/* ====== IMPACT NUMBERS ====== */}
      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Impact statistics">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-white">
                <AnimatedCounter end={20} suffix="h" />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-200">saved per week, per attorney</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-white">
                $<AnimatedCounter end={7000} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-200">billing capacity recovered weekly</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-white">
                <AnimatedCounter end={100} suffix="%" />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-200">of citations verified before display</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="font-serif text-display text-white">
                <AnimatedCounter end={9} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-200">languages with professional vocabulary</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== PRODUCT 1: LAW ====== */}
      <section className="py-24 sm:py-36" aria-label="AlecRae Law">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
              AlecRae Law
            </p>
            <h2 className="mt-4 text-display font-serif text-navy-800">
              Your entire practice. One platform.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Stop switching between seven different tools. AlecRae Law replaces your case
              management, billing, trust accounting, document drafting, court calendaring,
              client communication, and legal research.
            </p>
          </Reveal>

          <MockupReveal className="mt-12">
            <DashboardMockup />
          </MockupReveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-4">
              <Button href="/law">Learn more about AlecRae Law</Button>
              <Button href="/pricing" variant="ghost">See pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ====== PRODUCT 2: ORACLE ====== */}
      <section className="py-24 sm:py-36" aria-label="The Oracle">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-plum-600">
              The Oracle
            </p>
            <h2 className="mt-4 text-display font-serif text-navy-800">
              The research engine nobody else can build.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Cross-domain legal and accounting AI. Every citation verified before you see it.
              Hit &#8984;K from anywhere in the platform &mdash; research without ever leaving
              your document. 25 seconds instead of 5 minutes.
            </p>
          </Reveal>

          <MockupReveal className="mt-12">
            <OracleMockup />
          </MockupReveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-4">
              <Button href="/oracle">Learn more about The Oracle</Button>
              <Button href="/pricing" variant="ghost">See pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ====== PRODUCT 3: VOICE ====== */}
      <section className="py-24 sm:py-36" aria-label="AlecRae Voice">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-navy-500">
              AlecRae Voice
            </p>
            <h2 className="mt-4 text-display font-serif text-navy-800">
              Speak. It is done.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Not a dictation tool. The platform&rsquo;s intelligence layer. Every other voice
              product is an island &mdash; AlecRae Voice can file motions, log billing,
              schedule meetings, query The Oracle, and send matter-tagged messages. All by speaking.
            </p>
          </Reveal>

          {/* Live typing demo */}
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-2xl rounded-xl border border-forest-200 bg-forest-50 p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="pulse-ring absolute inset-0 rounded-full border-2 border-forest-400/50" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-500">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-forest-700">AlecRae Voice &mdash; listening</p>
                  <TypingDemo className="mt-1 text-sm text-navy-700" />
                </div>
              </div>
            </div>
          </Reveal>

          <MockupReveal className="mt-10">
            <VoiceMockup />
          </MockupReveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-4">
              <Button href="/dictation">Learn more about AlecRae Voice</Button>
              <Button href="/pricing" variant="ghost">See pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ====== PRODUCT 4: ACCOUNTING ====== */}
      <section className="py-24 sm:py-36" aria-label="AlecRae Accounting">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
              AlecRae Accounting
            </p>
            <h2 className="mt-4 text-display font-serif text-navy-800">
              AI-powered accounting that CPAs trust.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Bank feeds that never miss a transaction. AI reconciliation that turns months into minutes.
              Tax compliance across 50 states. Receipt scanning in seconds. And The Oracle for
              accounting &mdash; tax research answered instantly.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Bank feed integration", desc: "Direct Plaid connection. Auto-pull, auto-categorise, auto-match." },
                { title: "AI reconciliation", desc: "Months of manual work compressed into minutes. You review. You approve." },
                { title: "Tax compliance", desc: "US federal and 50-state tax calculation. Always current." },
                { title: "Receipt scanning", desc: "Photo to auto-coded expense entry in under 3 seconds." },
                { title: "Oracle for accounting", desc: "Tax code research with verified citations. IRS rulings answered instantly." },
                { title: "Voice journal entries", desc: "Dictate double-entry bookkeeping. AlecRae Voice understands debits and credits." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-semibold text-navy-700">{f.title}</p>
                  <p className="mt-2 text-sm text-navy-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-4">
              <Button href="/accounting">Learn more about Accounting</Button>
              <Button href="/pricing" variant="ghost">See pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== MANIFESTO ====== */}
      <section className="bg-navy-500 py-24 sm:py-36" aria-label="Philosophy">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-display font-serif text-white">
              Your profession back.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-200">
              Lawyers and accountants became professionals to practise their craft &mdash;
              not to spend their days on admin, research grunt work, and chasing clients
              for information. AlecRae handles the machine work. You handle the judgment work.
              Four products. One platform. No compromises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-24 sm:py-36" aria-label="Get started">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-display font-serif text-navy-800">
              The platform that replaces everything.
            </h2>
            <p className="mt-4 text-lg text-navy-400">Coming 2026.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/law" size="lg">Explore AlecRae Law</Button>
              <Button href="/oracle" variant="secondary" size="lg">Explore The Oracle</Button>
              <Button href="/dictation" variant="ghost">Explore Voice &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
