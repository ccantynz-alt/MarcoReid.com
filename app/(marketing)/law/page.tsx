import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import DashboardMockup from "@/app/components/marketing/DashboardMockup";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";
import MockupReveal from "@/app/components/effects/MockupReveal";


export const metadata: Metadata = {
  title: "AlecRae Legal \u2014 The Operating System for Your Legal Practice",
  description:
    "Full-stack legal practice management powered by AI. Case management, billing, trust accounting, document drafting, court-rules calendaring, and The Oracle legal research. One platform replaces everything.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AlecRae Legal",
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description: "The operating system for legal practice. Case management, billing, trust accounting, AI research, voice dictation, and client collaboration in one platform.",
  url: `${BRAND.url}/law`,
};

export default function LawPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            AlecRae Legal
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif text-forest-500 opacity-0">
            The operating system
            <br />
            for your legal practice.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Stop switching between seven different tools. AlecRae Legal replaces your
            case management, billing, trust accounting, document drafting, court calendaring,
            client communication, and legal research &mdash; with one login, one platform,
            and one bill.
          </p>
          <div className="mt-12 animate-fade-up-3 opacity-0">
            <Button href="/pricing" size="lg">See pricing</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Dashboard mockup */}
      <section className="py-20 sm:py-32" aria-label="Platform preview">
        <Container>
          <MockupReveal className="mx-auto max-w-4xl">
            <DashboardMockup />
          </MockupReveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The problem we solve */}
      <section className="py-32 sm:py-44" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Lawyers are drowning.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              The average attorney spends more time on admin than on actual legal work.
              Westlaw in one tab. Clio in another. Email in a third. Billing software somewhere else.
              Trust accounting in a spreadsheet. Client calls falling through the cracks.
              Court deadlines tracked on sticky notes.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              You didn&rsquo;t go to law school for this. You went to practise law.
              AlecRae gives you your profession back.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-20 sm:py-32" aria-label="Time savings">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={20} suffix="h" />
              </p>
              <p className="mt-2 text-sm text-navy-400">saved per week, per attorney</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                $<AnimatedCounter end={7000} />
              </p>
              <p className="mt-2 text-sm text-navy-400">billing capacity recovered weekly</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-amber-400">
                <AnimatedCounter end={1} />
              </p>
              <p className="mt-2 text-sm text-navy-400">platform replaces everything</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Feature stories — not a list, narratives */}
      <section className="py-32 sm:py-44" aria-label="How it works">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              How it works
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              A day on AlecRae Legal.
            </h2>
          </Reveal>

          {/* Morning briefing */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">8:00 AM &mdash; You open your dashboard</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Your morning briefing. No clicking required.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  What needs my attention today? Three deadlines. Five unread messages.
                  Two documents waiting for signature. Revenue this month: $47,200.
                  The Rodriguez H-1B filing is due today &mdash; it&rsquo;s already flagged urgent.
                  You know everything before your coffee is cold.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Oracle mid-document */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">9:30 AM &mdash; Drafting a contract</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Research without leaving your document.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  You&rsquo;re drafting a non-compete clause. Not sure about California&rsquo;s standard.
                  You hit &thinsp;<span className="rounded bg-navy-100 px-2 py-0.5 font-mono text-sm text-forest-600">&#8984;K</span>&thinsp;
                  &mdash; The Oracle slides in from the right. You type your question. Three verified
                  cases in under 3 seconds. You click &ldquo;Insert citation.&rdquo; It drops into your document
                  at the cursor, formatted correctly, verified. Total time: 25 seconds.
                  On Westlaw, that&rsquo;s 5 minutes and your flow is destroyed.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Voice billing */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">11:00 AM &mdash; Between meetings</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Bill by speaking. Ten seconds.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  &ldquo;Log four point five hours on the Rodriguez H-1B matter. Preparation and filing
                  of I-129. Today&rsquo;s date. Standard rate.&rdquo; Done. Time entry created, matter tagged,
                  date set, rate applied. No forms. No clicking. No typing. AlecRae Voice
                  understood every word.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Client portal */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">2:00 PM &mdash; Client wants an update</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Your client already has the answer.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Rodriguez wants to know his visa status. He doesn&rsquo;t call you. He doesn&rsquo;t email you.
                  He opens his client portal: &ldquo;Your visa application was filed on March 15. USCIS
                  processing time is currently 8&ndash;14 months.&rdquo; Documents filed. Invoice history.
                  Secure message thread. He has everything. You saved 30 minutes.
                  Multiply that by 10 clients a day.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cross-professional */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">3:30 PM &mdash; You need a CPA&rsquo;s input</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Lawyer meets accountant. Inside the platform.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  The Thornton acquisition needs a tax opinion. You open the matter, click
                  &ldquo;Involve accounting professional,&rdquo; find the CPA by name, and share
                  the relevant documents with a message. The CPA gets a professional notification,
                  views the shared matter, and responds. If they&rsquo;re already on AlecRae, this
                  takes 30 seconds. If they&rsquo;re not &mdash; the invitation is the hook that
                  brings them onto the platform. Every collaboration is a growth event.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Messaging */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">5:00 PM &mdash; End of day</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every conversation. Every document. One record.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Every message is threaded by matter, not by sender. Timestamped. Permanently archived.
                  End-to-end encrypted for attorney-client privilege. Any conversation can be exported
                  to a formatted email or PDF in one click. Read receipts so you know when clients have
                  seen important messages. File attachments inline. The complete record of every
                  interaction, searchable, auditable, and legally defensible.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Company incorporation */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border-2 border-forest-200 bg-forest-50/30 p-6 shadow-card">
                <p className="text-xs font-semibold tracking-wider text-forest-600">Company incorporation &mdash; multi-jurisdiction</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Your client wants to set up a company. You say the word.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  The client specifies where they&rsquo;ll operate and what the business does.
                  The Oracle &mdash; Legal and Accounting simultaneously &mdash; recommends the optimal
                  entity type per jurisdiction, analyses tax implications across all countries involved,
                  recommends an asset protection structure, identifies legal vulnerabilities,
                  generates all formation documents pre-populated with client data, routes them for
                  e-signature, and e-files with government agencies.
                </p>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Then it tracks every ongoing compliance requirement automatically &mdash; annual returns,
                  tax filings, regulatory reporting. The client stays on the platform permanently.
                  No other tool can do this because no other tool has both AI legal and AI accounting
                  research on the same platform.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Depositions */}
      <Reveal delay={0.1}>
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-xl border-2 border-plum-100 bg-plum-50/30 p-6 shadow-card sm:p-8">
            <p className="text-xs font-bold tracking-wider text-plum-600">Depositions</p>
            <h3 className="mt-4 font-serif text-headline text-navy-700">
              Pre-trial testimony. Reinvented.
            </h3>
            <p className="mt-4 leading-relaxed text-navy-400">
              Schedule depositions inside the platform. Record video built-in or via Zoom.
              AlecRae Voice transcribes the entire deposition in real time &mdash; legal vocabulary,
              speaker identification, timestamps. Pull up exhibits from the matter files instantly.
              Query The Oracle mid-deposition to check a citation the witness mentions.
              AI generates a structured summary with key testimony, objections, and action items.
              Every word searchable, linked to the matter, timestamped to the video.
              Opposing counsel gets access through the platform &mdash; another hook.
            </p>
            <p className="mt-4 text-sm font-medium text-plum-600">
              Replaces the $300&ndash;$500/day court reporter. Better accuracy. Instant delivery.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Courtroom technology */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-6 max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-xl border-2 border-navy-200 bg-navy-50/50 p-6 shadow-card sm:p-8">
            <p className="text-xs font-bold tracking-wider text-navy-500">Courtroom technology</p>
            <h3 className="mt-4 font-serif text-headline text-navy-700">
              The courtroom goes digital. And it runs on AlecRae.
            </h3>
            <p className="mt-4 leading-relaxed text-navy-400">
              Electronic filing with courts where APIs exist. Real-time courtroom transcription
              via AlecRae Voice. Digital exhibit management on iPad or laptop. Court-rules
              calendaring that auto-calculates every downstream deadline. Judge analytics showing
              ruling patterns, motion grant rates, and sentencing trends. And The Oracle
              available on your iPad mid-hearing &mdash; verify a citation opposing counsel just
              raised in 3 seconds. That is a superpower in a courtroom.
            </p>
            <p className="mt-4 text-sm font-medium text-navy-500">
              When a court uses AlecRae for filing, every attorney who appears in that court needs AlecRae. The court becomes the hook.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-16" />

      {/* Everything included */}
      <section className="py-32 sm:py-44" aria-label="Everything included">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Everything included
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              One platform. One login. One bill.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Case management", desc: "Full matter lifecycle, deadlines, tasks, documents" },
              { title: "Trust accounting", desc: "IOLTA-compliant client trust account management" },
              { title: "Court-rules calendaring", desc: "File once, every downstream deadline auto-calculated" },
              { title: "Document AI", desc: "Draft, review, and edit — replaces Word entirely" },
              { title: "Billing & time tracking", desc: "Hours, rates, invoices, Stripe payment collection" },
              { title: "E-signatures", desc: "Sign documents without leaving the platform" },
              { title: "Legal forms library", desc: "Every court form, AI pre-populated from matter data" },
              { title: "Client portal", desc: "Secure document sharing, messaging, and status updates" },
              { title: "Instant messaging", desc: "Matter-centric, encrypted, archived, exportable" },
              { title: "Email integration", desc: "Gmail and Outlook inside AlecRae with Oracle access" },
              { title: "Scheduling & meetings", desc: "Calendar sync, Zoom links, post-meeting AI summaries" },
              { title: "The Oracle", desc: "AI legal research with citation verification, inline everywhere" },
              { title: "Company incorporation", desc: "Automated entity formation — LLC, Ltd, C-Corp — with AI-populated documents and e-filing" },
              { title: "Conflict checking", desc: "Automated conflict of interest detection across all matters and parties" },
              { title: "Depositions", desc: "Video, real-time AI transcription, exhibit management, and AI summaries" },
              { title: "Courtroom e-filing", desc: "Electronic filing with courts where APIs are available" },
              { title: "Judge analytics", desc: "Ruling patterns, motion grant rates, sentencing trends by judge" },
              { title: "IP law (Oracle)", desc: "Patent search, trademark analysis, copyright, trade secrets via Oracle IP" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-semibold text-navy-700">{f.title}</p>
                  <p className="mt-2 text-sm text-navy-400">{f.desc}</p>
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
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              Your entire practice.
              <br />
              One platform.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From first client contact to final invoice. Nothing else required.
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
