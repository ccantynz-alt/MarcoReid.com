import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Gradient orb background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-gold mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse" />
          Coming Soon — Join the Waitlist
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Professional intelligence
          <br />
          <span className="text-gold">for law & accounting</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate max-w-2xl mx-auto leading-relaxed">
          AI-powered dictation, legal research, and practice management —
          unified under one roof. Built for professionals who demand precision.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#waitlist"
            className="rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-navy hover:bg-gold-light transition-colors"
          >
            Join the Waitlist
          </Link>
          <Link
            href="#features"
            className="rounded-lg border border-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/5 transition-colors"
          >
            See What&apos;s Coming
          </Link>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "AI Dictation",
    description:
      "Speak naturally. AlecRae transcribes with legal and accounting vocabulary baked in — not bolted on.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "The Oracle",
    description:
      "Cross-domain legal and accounting AI. Research case law, verify citations, and surface regulatory insights in seconds.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Case Management",
    description:
      "Matters, tasks, deadlines, and documents — all in one place. No more juggling three different tools.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Billing & Time Tracking",
    description:
      "Track time from dictation, generate invoices, and get paid — without ever leaving AlecRae.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Trust Accounting",
    description:
      "IOLTA-compliant trust accounting built to satisfy bar association requirements from day one.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: "Unified Dashboard",
    description:
      "One login. One command centre. Whether you practise law, accounting, or both — everything lives here.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything a modern practice needs
          </h2>
          <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">
            AlecRae replaces the patchwork of tools you&apos;re duct-taping together.
            One platform. One subscription. Zero compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/5 bg-navy-light/50 p-6 hover:border-gold/20 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 text-gold mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DictationSection() {
  return (
    <section id="dictation" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-gold mb-6">
              Phase 1 — First to Launch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              AI Dictation that speaks
              <span className="text-gold"> your language</span>
            </h2>
            <p className="mt-4 text-lg text-slate leading-relaxed">
              Every lawyer dictates. AlecRae Dictation is tuned specifically for
              legal and accounting vocabulary — case names, statute references,
              financial terms — transcribed with precision, not guesswork.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Legal & accounting vocabulary built in",
                "Auto-formats pleadings, memos, and letters",
                "Time entries captured from dictation automatically",
                "Works on desktop, tablet, and mobile",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate">
                  <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dictation mock UI */}
          <div className="rounded-2xl border border-white/10 bg-navy-light/80 p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="space-y-4 font-mono text-sm">
              <p className="text-slate">
                <span className="text-gold">Recording...</span>
              </p>
              <p className="text-white/90">
                &ldquo;Pursuant to Section 12(b) of the Securities Exchange Act,
                the respondent filed a motion to dismiss on the grounds that...&rdquo;
              </p>
              <div className="border-t border-white/5 pt-4">
                <p className="text-xs text-slate">Confidence: <span className="text-green-400">98.7%</span></p>
                <p className="text-xs text-slate">Legal terms detected: <span className="text-gold">4</span></p>
                <p className="text-xs text-slate">Time entry: <span className="text-white">0.3 hrs — Research memo</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OracleSection() {
  return (
    <section id="oracle" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-gold mb-6">
          Premium Tier
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Meet <span className="text-gold">The Oracle</span>
        </h2>
        <p className="mt-4 text-lg text-slate max-w-2xl mx-auto leading-relaxed">
          Cross-domain AI that understands both law and accounting.
          Research case law, verify citations, surface regulatory insights,
          and find the intersection between legal and financial compliance.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Legal Research",
              description: "Search case law, statutes, and regulations. The Oracle verifies every citation so you never cite a bad case.",
            },
            {
              title: "Accounting Intelligence",
              description: "Tax codes, GAAP standards, and regulatory requirements — researched and cross-referenced in seconds.",
            },
            {
              title: "Cross-Domain Insights",
              description: "The Oracle connects legal and accounting dots that siloed tools miss. Tax implications of legal structures, compliance overlaps, and more.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/5 bg-navy-light/50 p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section id="waitlist" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Be the first to know
        </h2>
        <p className="mt-4 text-lg text-slate">
          AlecRae is in active development. Join the waitlist and we&apos;ll
          notify you the moment we launch.
        </p>

        <WaitlistForm />

        <p className="mt-4 text-xs text-slate">
          No spam. No sharing your email. Just a launch notification.
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DictationSection />
      <OracleSection />
      <WaitlistSection />
    </>
  );
}
