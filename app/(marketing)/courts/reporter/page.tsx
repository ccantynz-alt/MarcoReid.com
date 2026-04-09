import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";

export const metadata: Metadata = {
  title: "Marco Reid Reporter — Real-Time AI Court Transcription",
  description:
    "End the court reporter shortage. Real-time AI transcription with speaker diarisation, legal terminology engine, certified court-admissible output, and 100+ language support for every hearing.",
  keywords: [
    "court transcription AI",
    "real-time court reporting",
    "legal transcription",
    "AI court reporter",
    "court stenographer replacement",
    "real-time transcription courtroom",
    "legal transcription software",
    "court reporter shortage solution",
    "AI deposition transcription",
    "certified court transcript",
    "speaker diarization legal",
    "courtroom transcription technology",
  ],
  openGraph: {
    title: "Marco Reid Reporter — Real-Time AI Court Transcription",
    description:
      "The US is short 11,000+ stenographers. Marco Reid Reporter is the answer: real-time AI transcription trained on legal vocabulary, with speaker diarisation, certified output, and 100+ languages.",
    url: `${BRAND.url}/courts/reporter`,
    siteName: BRAND.name,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Reporter",
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description:
    "Real-time AI court transcription with speaker diarisation, legal terminology engine, certified court-admissible output, and 100+ language support. Built to solve the court reporter shortage.",
  url: `${BRAND.url}/courts/reporter`,
  offers: {
    "@type": "Offer",
    category: "Courtroom Technology",
  },
  featureList: [
    "Real-time transcript display with sub-second latency",
    "Speaker diarization for judge, counsel, witness, interpreter",
    "Legal terminology engine trained on case law and statutes",
    "Certified court-admissible PDF output",
    "100+ language support with live translation",
    "Keyword and timestamp search",
    "PII redaction tools for sealed proceedings",
    "Offline transcription mode",
    "Witness video synchronization",
    "Real-time attorney annotations",
    "Deposition and arbitration integration",
    "Instant rough draft delivery",
  ],
};

const crisisStats = [
  {
    figure: "11,000+",
    label: "stenographer shortfall in the United States",
    detail:
      "The National Court Reporters Association has documented a critical and growing shortage with no sign of reversal.",
  },
  {
    figure: "55+",
    label: "average age of working court reporters",
    detail:
      "The profession is ageing out. Fewer than 300 students graduate from court reporting programmes annually.",
  },
  {
    figure: "46%",
    label: "of courts report difficulty finding reporters",
    detail:
      "Hearings are delayed. Proceedings go unrecorded. Due process is compromised when no reporter is available.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Speak",
    description:
      "Audio is captured through existing courtroom microphone infrastructure. No new hardware required. Standard courtroom audio systems feed directly into Marco Reid Reporter.",
  },
  {
    step: "02",
    title: "Transcribe",
    description:
      "OpenAI Whisper processes the audio stream with a custom legal vocabulary layer trained on case law, statutes, Latin terms, court formalities, and proper nouns. Speaker diarisation identifies every voice.",
  },
  {
    step: "03",
    title: "Certify",
    description:
      "The transcript is output as a court-admissible PDF with cryptographic signatures, chain of custody metadata, tamper-evident architecture, and timestamp alignment to the audio and video record.",
  },
];

const coreFeatures = [
  {
    icon: "\u{1F4FA}",
    title: "Real-time transcript display",
    description:
      "Sub-second latency from spoken word to displayed text. Transcript streams live to the bench monitor, counsel screens, and public gallery displays. Every participant follows every word as it is spoken.",
    accent: "forest",
  },
  {
    icon: "\u{1F465}",
    title: "Speaker diarisation",
    description:
      "Judge, lead counsel, co-counsel, witness, interpreter, and gallery participants are automatically identified and labelled. No manual attribution. No post-hearing cleanup. The transcript knows who said what.",
    accent: "plum",
  },
  {
    icon: "\u{1F4DA}",
    title: "Legal terminology engine",
    description:
      "Trained on millions of court opinions, federal and state statutes, Latin legal phrases, court formalities, jurisdiction-specific terminology, and proper nouns from case records. \"Res judicata\" is never transcribed as \"rez judiciary.\"",
    accent: "navy",
  },
  {
    icon: "\u{1F512}",
    title: "Certified output",
    description:
      "Court-admissible PDF with full chain of custody, cryptographic signatures, and tamper-evident architecture. Every transcript meets Federal Rules of Evidence ESI requirements. Mathematically provable integrity.",
    accent: "forest",
  },
  {
    icon: "\u{1F30D}",
    title: "100+ language support",
    description:
      "Live translation for interpreter coverage and multilingual proceedings. A witness testifying in Spanish is transcribed in Spanish with an English parallel transcript. No interpreter lag. No missed nuance.",
    accent: "plum",
  },
  {
    icon: "\u{1F50D}",
    title: "Search and timestamps",
    description:
      "Jump to any utterance by keyword, speaker name, or timestamp. Find every mention of an exhibit, every objection, every sidebar. Full-text search across the entire proceeding in milliseconds.",
    accent: "navy",
  },
];

const advancedFeatures = [
  {
    title: "Redaction tools",
    description:
      "Auto-flag personally identifiable information for sealed proceedings. Juror names, minor identification, social security numbers, and other protected data identified and redacted before the transcript is distributed. Permanent, irreversible redaction.",
  },
  {
    title: "Offline mode",
    description:
      "Records and transcribes without internet connectivity for secure, classified, or SCIF-level proceedings. The entire transcription engine runs locally. Audio never leaves the courtroom until the court administrator authorises upload.",
  },
  {
    title: "Witness video sync",
    description:
      "Timestamp-aligned video recording of witness testimony. Click any line in the transcript and the video jumps to that exact moment. Click any moment in the video and the transcript highlights. Frame-by-frame accuracy.",
  },
  {
    title: "Real-time annotations",
    description:
      "Attorneys can bookmark, highlight, and annotate the live transcript during proceedings. Mark a critical admission. Flag an objection to revisit. Add a private note to a line. All annotations are timestamped and attributed.",
  },
  {
    title: "Deposition integration",
    description:
      "The same engine that powers courtroom transcription works identically for depositions, arbitrations, mediations, and administrative hearings. One tool. Every proceeding type. Consistent quality everywhere.",
  },
  {
    title: "Rough draft delivery",
    description:
      "Instant rough drafts available within minutes of the proceeding ending. Final certified transcripts delivered within 24 hours. No more waiting weeks for a court reporter to clear their backlog.",
  },
];

const accentBorder: Record<string, string> = {
  forest: "border-l-forest-500",
  plum: "border-l-plum-500",
  navy: "border-l-navy-500",
};

const accentBg: Record<string, string> = {
  forest: "bg-forest-50",
  plum: "bg-plum-50",
  navy: "bg-navy-50",
};

export default function ReporterPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ——— Hero ——— */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-wider text-forest-300">
              Marco Reid Reporter
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-hero text-white">
              Real-time transcription.
              <br />
              Every word, every hearing.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-navy-200">
              The United States is short more than 11,000 stenographers and the
              gap widens every year. Hearings go unrecorded. Cases stall. Due
              process is compromised. Marco Reid Reporter is the answer:
              real-time AI transcription trained on legal vocabulary, with
              speaker diarisation, certified output, and support for 100+
              languages.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/courts/pilot" size="lg" variant="secondary">
                Request a pilot
              </Button>
              <Button href="/courts" size="lg" variant="ghost">
                <span className="text-navy-200 hover:text-white">
                  &larr; Back to Courts
                </span>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ——— The Crisis ——— */}
      <section className="py-24 sm:py-36" aria-label="The court reporter crisis">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-plum-600">
              The crisis
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              The court reporter shortage is real.
              <br />
              <span className="text-plum-600">
                And it is getting worse.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Court reporters are retiring faster than new ones enter the
              profession. Training programmes are closing. The average
              stenographer is over 55. Fewer than 300 new court reporters
              graduate each year in the entire country. The maths is
              unforgiving: there are not enough humans to record every
              proceeding in every courtroom in America.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {crisisStats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 text-center shadow-card">
                  <p className="font-serif text-display text-navy-700">
                    {stat.figure}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-navy-600">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {stat.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ——— How It Works ——— */}
      <section className="py-24 sm:py-36" aria-label="How it works">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-forest-600">
              How it works
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Three steps. Zero stenographers.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={0.1 + i * 0.1}>
                <div className="relative rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="font-serif text-display text-forest-500/20">
                    {step.step}
                  </p>
                  <h3 className="mt-2 font-serif text-headline text-navy-800">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ——— Core Features ——— */}
      <section className="py-24 sm:py-36" aria-label="Core features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-navy-500">
              Core capabilities
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Every feature a courtroom demands.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Marco Reid Reporter is not a general-purpose transcription tool
              adapted for legal. It was built from the ground up for the
              courtroom.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {coreFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={0.05 + i * 0.05}>
                <div
                  className={`rounded-xl border border-navy-100 border-l-4 ${accentBorder[feature.accent]} bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentBg[feature.accent]}`}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-headline text-navy-800">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-navy-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ——— Advanced Features ——— */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Advanced features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-navy-500">
              Beyond transcription
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Every tool the proceedings require.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
            {advancedFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={0.05 + i * 0.04}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ——— Accuracy ——— */}
      <section className="py-24 sm:py-36" aria-label="Accuracy">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl bg-navy-500 p-10 text-center sm:p-14">
              <p className="text-xs font-bold uppercase tracking-widest text-navy-300">
                Accuracy
              </p>
              <p className="mt-6 font-serif text-hero text-white">99.2%</p>
              <p className="mt-4 text-xl font-medium text-forest-300">
                accuracy on legal terminology
              </p>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-navy-200">
                Powered by OpenAI Whisper with a custom legal vocabulary layer
                trained on millions of court opinions, statutes, and regulatory
                documents. Legal Latin, case names, statutory references, court
                formalities, and jurisdiction-specific terminology are recognised
                natively. Not after correction. Not after training. Immediately.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ——— Why Courts Choose Marco Reid ——— */}
      <section className="py-24 sm:py-36" aria-label="Why courts choose this">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-forest-600">
              The bigger picture
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-800">
              This is not about replacing court reporters.
              <br />
              <span className="text-forest-600">
                It is about ensuring every hearing is recorded.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              When a hearing goes unrecorded because no stenographer is
              available, the record of that proceeding is lost. Appeals become
              impossible. Due process is compromised. Justice is incomplete.
              Marco Reid Reporter ensures that every word in every courtroom is
              captured, transcribed, and preserved with court-admissible
              integrity.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              In courtrooms where stenographers are available, Marco Reid
              Reporter serves as a real-time backup and provides features that
              human transcription cannot: instant search, live annotations,
              automatic speaker identification, and 100+ language translation.
              The two systems are complementary. The goal is the same: a
              complete, accurate, and immutable record of every proceeding.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ——— Integration ——— */}
      <section className="py-24 sm:py-36" aria-label="Platform integration">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-plum-600">
              Platform integration
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Part of the Marco Reid Courtroom suite.
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                title: "Courtroom e-filing",
                desc: "Transcripts flow directly into the court filing system. No manual upload. No format conversion. File the record with one click.",
              },
              {
                title: "Docket management",
                desc: "Transcripts are automatically linked to the docket entry for the proceeding. The record is connected to the case from the moment it is created.",
              },
              {
                title: "Marco Reid Legal",
                desc: "Attorneys using Marco Reid Legal receive transcripts directly in their matter files. Deposition transcripts, hearing records, and trial proceedings all in one place.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-navy-700">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ——— AI Disclaimer ——— */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      {/* ——— CTA ——— */}
      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Every word. Every hearing.
              <br />
              <span className="text-forest-600">Recorded.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              Real-time AI transcription built for the courtroom. Pilot
              programmes are open for state and federal courts.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/courts/pilot" size="lg">
                Request a pilot
              </Button>
              <Button href="/courts" variant="secondary" size="lg">
                Back to Courts
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
