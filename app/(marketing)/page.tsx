import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

const OracleMockup = dynamic(() => import("@/app/components/marketing/OracleMockup"));
const VoiceMockup = dynamic(() => import("@/app/components/marketing/VoiceMockup"));
const DashboardMockup = dynamic(() => import("@/app/components/marketing/DashboardMockup"));
const AnimatedCounter = dynamic(() => import("@/app/components/effects/AnimatedCounter"));
const MockupReveal = dynamic(() => import("@/app/components/effects/MockupReveal"));
const TypingDemo = dynamic(() => import("@/app/components/effects/TypingDemo"));

export const metadata: Metadata = {
  title: "Marco Reid \u2014 Professional Intelligence for Law and Accounting",
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
              Introducing Marco Reid &mdash; five products, one platform
            </p>
            <h1 className="mt-6 animate-fade-up-1 font-serif text-hero text-white opacity-0">
              You became a professional to practise your craft.
              Not to drown in software.
            </h1>
            <p className="mt-6 animate-fade-up-2 text-xl leading-relaxed text-navy-200 opacity-0">
              45% of legal professionals use 5&ndash;10 different tools that don&rsquo;t talk to each other.
              54% are exhausted by manual processes. 97% of CPA firms use technology inefficiently.
              You&rsquo;re paying for a dozen subscriptions and getting less done, not more.
            </p>
            <p className="mt-4 animate-fade-up-2 text-2xl font-serif text-white opacity-0">
              Marco Reid ends that. Today.
            </p>
            <p className="mt-4 animate-fade-up-2 text-lg text-navy-300 opacity-0">
              AI-powered legal practice. AI-powered accounting. Courtroom technology.
              The most intelligent research engine ever built. And a voice that understands
              your profession. Five products. One login. One bill. Nothing else required.
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
      {/* PRODUCT 1: Marco Reid Legal — MASSIVE showcase                   */}
      {/* ============================================================ */}
      <section id="law" className="py-24 sm:py-36 lg:py-44" aria-label="Marco Reid Legal">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          {/* Product header */}
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#9878;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  Marco Reid Legal
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Westlaw in one tab. Clio in another. Email in a third. Sound familiar?
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              The average attorney spends more time managing software than practising law.
              Case management in one tool. Research in another. Billing somewhere else.
              Trust accounting in a spreadsheet. Client calls falling through the cracks.
              You&rsquo;re paying $400/month for Westlaw, $100/month for Clio, $699 for Dragon,
              $15/month for DocuSign &mdash; and none of them talk to each other.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg font-medium text-navy-600">
              Marco Reid Legal replaces all of them. Case management. Billing. Trust accounting.
              Document AI. Court calendaring. E-signatures. Client portal. Secure messaging.
              The Oracle for research. Marco Reid Voice for dictation. One login. One bill.
              From $99/month.
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
              <Button href="/law">Learn more about Marco Reid Legal</Button>
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
                  You spend 4 hours researching what The Oracle answers in 25 seconds.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Open a new tab. Go to Westlaw. Log in. Search. Find the case. Copy the citation.
              Switch back to your document. Paste. Reformat. Five minutes. Flow destroyed.
              You do this 20 times a day. That&rsquo;s 100 minutes of your life &mdash; every single day &mdash;
              spent on a workflow that should take seconds.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg font-medium text-navy-600">
              Hit &#8984;K. The Oracle slides in without leaving your document. Type your question.
              Three verified cases in 3 seconds. Click &ldquo;Insert citation.&rdquo; Done. 25 seconds.
              And it works for both legal AND accounting research simultaneously &mdash;
              because nobody else owns both sides. Cross-domain queries that Westlaw, LexisNexis,
              and Harvey AI simply cannot answer.
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
                This is a category that did not exist before Marco Reid created it.
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
      {/* PRODUCT 3: Marco Reid Voice — MASSIVE showcase                   */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 lg:py-44" aria-label="Marco Reid Voice">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                <span className="text-xl">&#127908;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-navy-500">
                  Marco Reid Voice
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Dragon costs $699 and can&rsquo;t file a motion.
                  Marco Reid Voice can. By speaking.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Every dictation tool on the market is an island. Dragon can&rsquo;t log a billing entry.
              WisprFlow can&rsquo;t schedule a meeting tagged to a matter. Otter can&rsquo;t query a legal
              research database. They transcribe words. That&rsquo;s it. They sit outside your workflow.
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
                  <p className="text-sm font-bold text-forest-700">Marco Reid Voice &mdash; listening</p>
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
              <Button href="/dictation">Learn more about Marco Reid Voice</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ============================================================ */}
      {/* PRODUCT 4: Marco Reid Courtroom                                  */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 lg:py-44" aria-label="Marco Reid Courtroom">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-plum-50">
                <span className="text-xl">&#9878;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-plum-600">
                  Marco Reid Courtroom
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Court reporters cost $500/day.
                  Marco Reid Courtroom replaces them.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Depositions still run on court reporters at $300&ndash;500 per day.
              Evidence is managed in binders. E-filing is a nightmare of disconnected portals.
              And when opposing counsel cites a case you don&rsquo;t recognise mid-hearing,
              you have no way to verify it without leaving the courtroom.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg font-medium text-navy-600">
              Marco Reid Courtroom: AI transcription that replaces stenographers. Tamper-evident
              evidence with cryptographic chain of custody. Judge analytics that tell you
              ruling patterns before you walk in. And The Oracle on your iPad &mdash;
              verify any citation in 3 seconds, mid-hearing. Permission-based. Court-admissible.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "AI deposition transcription", desc: "Real-time transcription with legal vocabulary, speaker ID, and video sync. Replaces $500/day court reporters." },
                { title: "Courtroom e-filing", desc: "File electronically. Court-stamped confirmation. Deadlines auto-calculated." },
                { title: "Tamper-evident evidence", desc: "Cryptographic chain of custody. Immutable audit trails. Court-admissible." },
                { title: "Judge analytics", desc: "Ruling patterns, motion grant rates, sentencing trends. Know the judge." },
                { title: "Exhibit management", desc: "Numbered, tagged, annotated, presentable from iPad. Court-ready." },
                { title: "Oracle mid-hearing", desc: "Verify a citation opposing counsel raised. 3 seconds. On your iPad." },
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
              <Button href="/courtroom">Explore Marco Reid Courtroom</Button>
              <Button href="/pricing" variant="ghost">Pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* ============================================================ */}
      {/* PRODUCT 5: Marco Reid Accounting                                 */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 lg:py-44" aria-label="Marco Reid Accounting">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#9671;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  Marco Reid Accounting
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  QuickBooks just raised prices 400%.
                  And it still can&rsquo;t do tax research.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              97% of CPA firms say they use technology inefficiently. QuickBooks pages take
              10 seconds to load. Xero keeps removing features. Neither tool has AI research,
              voice input, or any connection to the legal side. Your clients&rsquo; lawyers use
              a completely different system. Nothing integrates. Everything is manual.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg font-medium text-navy-600">
              Marco Reid Accounting: bank feeds via Plaid that never miss a transaction. AI
              reconciliation that turns months into minutes. Tax compliance across 50 states.
              The Oracle for accounting &mdash; IRS code, revenue rulings, Treasury regs answered
              in 3 seconds. Voice journal entries. And direct collaboration with lawyers on
              shared matters. One platform for both professions.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "\u2193", title: "Bank feed integration", desc: "Direct Plaid connection. Auto-pull, auto-categorise, auto-match every transaction." },
              { icon: "\u26A1", title: "AI reconciliation", desc: "Months of manual work compressed into minutes. You review. You approve. Done." },
              { icon: "\u2713", title: "50-state tax compliance", desc: "US federal and state tax calculation. Always current. Never out of date." },
              { icon: "\uD83D\uDCF8", title: "Receipt scanning", desc: "Photo to auto-coded expense entry in under 3 seconds from your phone." },
              { icon: "\u25C8", title: "Oracle for accounting", desc: "Tax code research with verified citations. IRS rulings answered instantly." },
              { icon: "\uD83C\uDF99", title: "Voice journal entries", desc: "Dictate double-entry bookkeeping. Marco Reid Voice understands debits and credits." },
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
              Marco Reid replaces all of them.
            </p>
          </Reveal>

          {/* Industry statistics — devastating */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-serif text-3xl text-white">45%</p>
                <p className="mt-2 text-xs text-navy-300">of legal professionals use 5&ndash;10 different tools. 30% use more than 10.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-serif text-3xl text-white">54%</p>
                <p className="mt-2 text-xs text-navy-300">of lawyers report exhaustion from manual processes.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-serif text-3xl text-white">97%</p>
                <p className="mt-2 text-xs text-navy-300">of CPA firms say they use technology inefficiently.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-serif text-3xl text-white">76%</p>
                <p className="mt-2 text-xs text-navy-300">of legal staff cling to manual processes because the tools are worse.</p>
              </div>
            </Reveal>
          </div>

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
              "The Oracle (Accounting)", "Marco Reid Voice (9 languages)", "Bank feed integration",
              "AI reconciliation", "Tax compliance (50 states)", "Receipt scanning",
              "AI spreadsheets", "Firm analytics",
              "Company incorporation", "Conflict checking",
              "Depositions (AI transcription)", "Courtroom e-filing",
              "Judge analytics", "IP law (patents & trademarks)",
              "Immutable audit trails", "FIPS 140-3 encryption",
              "Chain of custody tracking", "Evidence viewer & redaction",
              "Deposition video sync", "Court-admissible digital signatures",
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
              300,000 accountants left the profession since 2020.
              Not because the work was hard. Because the tools were broken.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-200">
              Staff leave not because work is challenging &mdash; they leave because it feels
              mindless and the tools feel ancient. 76% of legal staff cling to manual processes
              because the software is worse than doing it by hand. That is not a technology problem.
              That is a failure of imagination. Marco Reid is what happens when someone finally imagines
              something better.
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
              <Button href="/law" size="lg">Explore Marco Reid Legal</Button>
              <Button href="/oracle" variant="secondary" size="lg">Explore The Oracle</Button>
              <Button href="/pricing" variant="ghost">View pricing &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
