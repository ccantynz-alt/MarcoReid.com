import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Button from "@/app/components/shared/Button";
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

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={softwareSchema} />

      {/* ============================================================ */}
      {/* HERO — The grand entrance                                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-forest-500/20 blur-[120px]" />
          <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-plum-500/15 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-up text-sm font-semibold tracking-wider text-forest-300 opacity-0">
              Introducing AlecRae
            </p>
            <h1 className="mt-6 animate-fade-up-1 font-serif text-hero text-white opacity-0">
              The professional intelligence platform that replaces everything.
            </h1>
            <p className="mt-6 animate-fade-up-2 text-xl leading-relaxed text-navy-200 opacity-0">
              Four products. One login. Every tool a legal or accounting professional needs
              to run their entire practice &mdash; case management, billing, trust accounting,
              AI research, voice dictation, client portal, secure messaging, and more.
              Built for the professionals who refuse to compromise.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-up-3 opacity-0 sm:flex-row">
              <Button href="#law" size="lg" variant="primary">
                See what we built
              </Button>
              <Button href="/pricing" size="lg" variant="ghost" className="text-white hover:text-navy-200">
                View pricing &rarr;
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:grid-cols-4 animate-fade-up-3 opacity-0">
            <div className="text-center">
              <p className="font-serif text-3xl text-white sm:text-4xl">
                <AnimatedCounter end={20} suffix="h" />
              </p>
              <p className="mt-1 text-xs text-navy-300">saved per attorney per week</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl text-forest-300 sm:text-4xl">
                $<AnimatedCounter end={7000} />
              </p>
              <p className="mt-1 text-xs text-navy-300">billing capacity recovered weekly</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl text-white sm:text-4xl">
                <AnimatedCounter end={100} suffix="%" />
              </p>
              <p className="mt-1 text-xs text-navy-300">citations verified before display</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl text-forest-300 sm:text-4xl">
                <AnimatedCounter end={9} />
              </p>
              <p className="mt-1 text-xs text-navy-300">languages from day one</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRODUCT 1: AlecRae Legal — MASSIVE showcase                   */}
      {/* ============================================================ */}
      <section id="law" className="py-24 sm:py-36 lg:py-44" aria-label="AlecRae Legal">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          {/* Product header */}
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#9878;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  AlecRae Legal
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Your entire practice. One platform.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Stop switching between seven different tools. AlecRae Legal replaces your case
              management, billing, trust accounting, document drafting, court calendaring,
              client communication, and legal research &mdash; with one login, one bill,
              and one platform that was built from the ground up for how lawyers actually work.
            </p>
          </Reveal>

          {/* MASSIVE full-width dashboard mockup */}
          <MockupReveal className="mt-16">
            <DashboardMockup />
          </MockupReveal>

          {/* Day-in-the-life scenarios */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <p className="text-2xl">&#9778;</p>
                <h3 className="mt-3 font-serif text-lg text-navy-700">Morning dashboard</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">
                  Three deadlines. Five unread messages. Revenue this month: $47,200.
                  Rodriguez H-1B filing flagged urgent. You know everything before your coffee is cold.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <p className="text-2xl">&#8984;</p>
                <h3 className="mt-3 font-serif text-lg text-navy-700">Research mid-document</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">
                  Hit &#8984;K. The Oracle slides in. &ldquo;California non-compete standard.&rdquo;
                  Three verified cases in 3 seconds. Insert citation at cursor. 25 seconds total.
                  Westlaw takes 5 minutes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <p className="text-2xl">&#127908;</p>
                <h3 className="mt-3 font-serif text-lg text-navy-700">Bill by speaking</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">
                  &ldquo;Log four point five hours, Rodriguez H-1B, I-129 filing, standard rate.&rdquo;
                  Done. Time entry created. Matter tagged. Ten seconds. Zero typing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <p className="text-2xl">&#128100;</p>
                <h3 className="mt-3 font-serif text-lg text-navy-700">Client self-serve portal</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">
                  Your client sees their visa status, documents, invoices, and can message you securely.
                  No phone call needed. Save 30 minutes per client, per week.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <p className="text-2xl">&#9741;</p>
                <h3 className="mt-3 font-serif text-lg text-navy-700">Cross-professional bridge</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">
                  Need a CPA&rsquo;s input? Click &ldquo;Involve accounting professional.&rdquo;
                  Share the matter. Get a response in minutes. Every collaboration is a growth event.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <p className="text-2xl">&#128274;</p>
                <h3 className="mt-3 font-serif text-lg text-navy-700">Encrypted messaging</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">
                  Every message threaded by matter. End-to-end encrypted. Permanently archived.
                  Export any thread to email or PDF in one click. Legally defensible.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex gap-4">
              <Button href="/law">Learn more about AlecRae Legal</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-width divider */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ============================================================ */}
      {/* PRODUCT 2: The Oracle — MASSIVE showcase                      */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 lg:py-44" aria-label="The Oracle">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-plum-50">
                <span className="text-xl">&#9673;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-plum-600">
                  The Oracle
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  The most intelligent research engine on the planet.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Cross-domain legal and accounting AI research. Every citation verified
              against authoritative public sources before you see it. Ask questions
              that span both disciplines simultaneously. This is the product nobody
              else can build &mdash; because nobody else owns both sides.
            </p>
          </Reveal>

          {/* MASSIVE Oracle mockup */}
          <MockupReveal className="mt-16">
            <OracleMockup />
          </MockupReveal>

          {/* Two Oracle products side by side */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-plum-100 bg-plum-50/30 p-8">
                <p className="text-xs font-bold tracking-wider text-plum-600">Oracle &mdash; Legal</p>
                <h3 className="mt-4 text-xl font-serif text-navy-700">
                  Case law. Statutes. Court opinions.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-400">
                  Every US federal and state court decision. Every statute. Every regulation.
                  All public domain. All verified. Hit &#8984;K from any document, email, or message.
                  Three verified cases in 3 seconds. Citation inserted at your cursor.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-forest-200 bg-forest-50/30 p-8">
                <p className="text-xs font-bold tracking-wider text-forest-600">Oracle &mdash; Accounting</p>
                <h3 className="mt-4 text-xl font-serif text-navy-700">
                  Tax codes. IRS rulings. GAAP standards.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-400">
                  Every IRS code section, revenue ruling, and Treasury regulation. 50-state tax codes.
                  GAAP and IFRS standards. All verified against official sources. The CPA who used
                  to call a taxation agent now has the answer in 3 seconds.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Cross-domain moat */}
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-xl bg-navy-500 p-8 sm:p-10">
              <p className="text-xs font-bold tracking-wider text-navy-300">
                The cross-domain moat &mdash; legal + accounting in one query
              </p>
              <p className="mt-4 font-serif text-headline text-white">
                &ldquo;What are the immigration tax implications of this corporate
                structure for a Tier-1 visa applicant?&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-200">
                That query requires both legal research and tax intelligence simultaneously.
                Westlaw can&rsquo;t answer it. QuickBooks can&rsquo;t answer it. Nobody else owns both sides.
                This is a category that did not exist before AlecRae created it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex gap-4">
              <Button href="/oracle">Learn more about The Oracle</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ============================================================ */}
      {/* PRODUCT 3: AlecRae Voice — MASSIVE showcase                   */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 lg:py-44" aria-label="AlecRae Voice">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                <span className="text-xl">&#127908;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-navy-500">
                  AlecRae Voice
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Speak. It is done.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Every other dictation tool on the market is an island. It sits outside your workflow.
              AlecRae Voice is different &mdash; it IS the platform&rsquo;s input layer. It doesn&rsquo;t just
              transcribe. It files motions, logs billing, schedules meetings, queries The Oracle,
              and sends matter-tagged messages. All by speaking. In 9 languages.
            </p>
          </Reveal>

          {/* Live typing demo — large and prominent */}
          <Reveal delay={0.15}>
            <div className="mt-12 rounded-xl border-2 border-forest-200 bg-forest-50 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="pulse-ring absolute inset-0 rounded-full border-2 border-forest-400/50" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-500">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-forest-700">AlecRae Voice &mdash; listening</p>
                  <TypingDemo className="mt-1 text-lg" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* MASSIVE Voice mockup */}
          <MockupReveal className="mt-12">
            <VoiceMockup />
          </MockupReveal>

          {/* Voice command examples */}
          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            {[
              {
                context: "Inside email",
                command: "\"Send this to Marcus Rodriguez, subject H-1B update, mark urgent, attach the I-129 receipt notice from the matter.\"",
                result: "Recipient, subject, priority, and attachment \u2014 all set by voice.",
              },
              {
                context: "Inside billing",
                command: "\"Log four point five hours on Rodriguez H-1B, I-129 filing, today\u2019s date, standard rate.\"",
                result: "Time entry created. Matter tagged. Rate applied. Ten seconds.",
              },
              {
                context: "Inside documents",
                command: "\"Ask the Oracle \u2014 California adverse possession standard, insert the controlling case.\"",
                result: "Oracle queried. Citation inserted at cursor. Never stopped dictating.",
              },
              {
                context: "Inside calendar",
                command: "\"Schedule a call with Patricia Thornton, Thursday at two pm, tag to Thornton acquisition, send Zoom link.\"",
                result: "Meeting created. Matter tagged. Zoom generated. Invite sent.",
              },
            ].map((cmd) => (
              <Reveal key={cmd.context} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="text-xs font-bold tracking-wider text-navy-400">{cmd.context}</p>
                  <p className="mt-3 font-serif text-sm italic leading-relaxed text-navy-700">{cmd.command}</p>
                  <p className="mt-3 text-sm font-medium text-forest-600">&rarr; {cmd.result}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex gap-4">
              <Button href="/dictation">Learn more about AlecRae Voice</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ============================================================ */}
      {/* PRODUCT 4: AlecRae Accounting                                 */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 lg:py-44" aria-label="AlecRae Accounting">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#9671;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  AlecRae Accounting
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  AI-powered accounting that CPAs trust.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Bank feeds that never miss a transaction. AI reconciliation that turns months into minutes.
              Tax compliance across 50 states. Receipt scanning in seconds. And The Oracle for
              accounting &mdash; tax research that answers instantly what used to take hours.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "\u2193", title: "Bank feed integration", desc: "Direct Plaid connection. Auto-pull, auto-categorise, auto-match every transaction." },
              { icon: "\u26A1", title: "AI reconciliation", desc: "Months of manual work compressed into minutes. You review. You approve. Done." },
              { icon: "\u2713", title: "50-state tax compliance", desc: "US federal and state tax calculation. Always current. Never out of date." },
              { icon: "\uD83D\uDCF8", title: "Receipt scanning", desc: "Photo to auto-coded expense entry in under 3 seconds from your phone." },
              { icon: "\u25C8", title: "Oracle for accounting", desc: "Tax code research with verified citations. IRS rulings answered instantly." },
              { icon: "\uD83C\uDF99", title: "Voice journal entries", desc: "Dictate double-entry bookkeeping. AlecRae Voice understands debits and credits." },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-50 text-lg text-forest-600">
                    {f.icon}
                  </span>
                  <h3 className="mt-4 font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex gap-4">
              <Button href="/accounting">Learn more about Accounting</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY PROFESSIONALS SWITCH — the pain killer                    */}
      {/* ============================================================ */}
      <section className="bg-navy-500 py-24 sm:py-36" aria-label="Why professionals switch">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-sm font-semibold tracking-wider text-forest-300">
              Why professionals switch
            </p>
            <h2 className="mt-6 font-serif text-display text-white">
              The tools you use today are holding you back.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-200">
              Seven different subscriptions. None of them talk to each other. Hours lost
              every day switching between tools that were never designed to work together.
              AlecRae replaces all of them.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              { from: "Westlaw / LexisNexis", pain: "Research that costs $400+/mo, trapped in a separate tab, with no connection to your cases or documents", link: "/compare/westlaw" },
              { from: "Clio", pain: "Good case management, but no research AI, no voice dictation, no accounting, no document AI. You still need 4 other tools", link: "/compare/clio" },
              { from: "QuickBooks / Xero", pain: "Basic bookkeeping with no AI, no tax research, no voice input, and zero integration with the legal side", link: "/compare/quickbooks" },
              { from: "Dragon Legal", pain: "$699 standalone dictation that can\u2019t file a motion, log a time entry, or query a research database. An island", link: "/compare/westlaw" },
            ].map((item) => (
              <Reveal key={item.from} delay={0.05}>
                <a
                  href={item.link}
                  className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
                >
                  <p className="text-xs font-bold tracking-wider text-navy-300">Replacing {item.from}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100">{item.pain}</p>
                  <p className="mt-4 text-xs font-semibold text-forest-300">See comparison &rarr;</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EVERYTHING INCLUDED — the full picture                        */}
      {/* ============================================================ */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Everything included">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Everything. One platform. One login.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-navy-400">
              This is what replaces Westlaw, Clio, QuickBooks, DocuSign,
              Dragon, and everything in between.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Case management", "Trust accounting (IOLTA)", "Court-rules calendaring",
              "Document AI & editor", "Billing & time tracking", "E-signatures",
              "Legal forms library", "Client portal", "Secure messaging",
              "Email integration", "Calendar & meetings", "The Oracle (Legal)",
              "The Oracle (Accounting)", "AlecRae Voice (9 languages)", "Bank feed integration",
              "AI reconciliation", "Tax compliance (50 states)", "Receipt scanning",
              "AI spreadsheets", "Firm analytics",
            ].map((feature) => (
              <Reveal key={feature} delay={0.02}>
                <div className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 text-sm shadow-card">
                  <span className="text-forest-500">&#10003;</span>
                  <span className="text-navy-600">{feature}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MANIFESTO                                                     */}
      {/* ============================================================ */}
      <section className="bg-navy-500 py-24 sm:py-36" aria-label="Philosophy">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Your profession back.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-200">
              Lawyers and accountants became professionals to practise their craft &mdash;
              not to spend their days on admin, research grunt work, and chasing clients
              for information. AlecRae handles the machine work. You handle the judgment work.
              That is the only division of labour that has ever made sense.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg text-navy-300">
              Four products. One platform. No compromises.
              The most advanced professional intelligence system ever created.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA                                                           */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36" aria-label="Get started">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The platform that replaces everything.
            </h2>
            <p className="mt-4 text-lg text-navy-400">Coming 2026.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/law" size="lg">Explore AlecRae Legal</Button>
              <Button href="/oracle" variant="secondary" size="lg">Explore The Oracle</Button>
              <Button href="/pricing" variant="ghost">View pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
