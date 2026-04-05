import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Courtroom \u2014 The Most Advanced Courtroom Technology Ever Built",
  description:
    "Depositions with AI transcription. Courtroom e-filing. Evidence management with chain of custody. Real-time Oracle research mid-hearing. Judge analytics. The courtroom goes digital.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Courtroom",
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description: "Courtroom technology platform: depositions, e-filing, evidence management, real-time AI transcription, and judge analytics.",
  url: `${BRAND.url}/courtroom`,
};

export default function CourtroomPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid Courtroom
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            The courtroom goes digital.
            <br />
            And it runs on Marco Reid.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
            Depositions with real-time AI transcription. Electronic filing with courts.
            Evidence management with cryptographic chain of custody. Judge analytics.
            And The Oracle available on your iPad mid-hearing. This is courtroom
            technology that didn&rsquo;t exist until now.
          </p>
          <div className="mt-10">
            <Button href="/pricing" size="lg" variant="primary">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-24 sm:py-32" aria-label="Impact">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                $<AnimatedCounter end={500} />
              </p>
              <p className="mt-2 text-sm text-navy-400">per day saved on court reporters</p>
              <p className="mt-1 text-xs text-navy-300">AI transcription replaces $300&ndash;500/day stenographers</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={3} />s
              </p>
              <p className="mt-2 text-sm text-navy-400">to verify a citation mid-hearing</p>
              <p className="mt-1 text-xs text-navy-300">The Oracle on your iPad. In the courtroom.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={100} />%
              </p>
              <p className="mt-2 text-sm text-navy-400">tamper-evident evidence chain</p>
              <p className="mt-1 text-xs text-navy-300">Cryptographically signed. Courtroom-admissible.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* Depositions */}
      <section className="py-24 sm:py-36" aria-label="Depositions">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-plum-50">
                <span className="text-xl">&#127909;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-plum-600">
                  Depositions
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Pre-trial testimony. Reinvented.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Schedule depositions inside the platform. Record video built-in or via Zoom.
              Marco Reid Voice transcribes the entire proceeding in real time with legal vocabulary
              intelligence, speaker identification, and timestamps. No court reporter needed.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Real-time AI transcription", desc: "Marco Reid Voice transcribes with legal vocabulary, speaker ID, and timestamps. Replaces $300\u2013500/day court reporters." },
              { title: "Video + transcript sync", desc: "Click any line in the transcript \u2014 video jumps to that moment. Click any video moment \u2014 transcript highlights. Frame-by-frame." },
              { title: "Exhibit management", desc: "Pull up any exhibit from the matter files instantly during deposition. Tag exhibits as they\u2019re referenced." },
              { title: "Oracle mid-deposition", desc: "Check a citation or statute the witness mentions in real time. The attorney never loses the thread." },
              { title: "AI summary generation", desc: "After the session: structured summary with key testimony, objections, exhibits referenced, and action items." },
              { title: "Opposing counsel access", desc: "The other side gets transcript and exhibit access through the platform. Another hook that brings new users." },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* E-Filing */}
      <section className="py-24 sm:py-36" aria-label="E-Filing">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#128196;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  Electronic filing
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  File with the court. From your desk.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Electronic filing with courts where APIs are available. The attorney files from
              inside Marco Reid, the court receives it electronically, and the filing is automatically
              logged in the matter with court-stamped confirmation. Court-rules calendaring
              auto-calculates every downstream deadline the moment the filing is confirmed.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-xl bg-navy-500 p-8 sm:p-10">
              <p className="text-xs font-bold tracking-wider text-navy-300">
                The institutional hook
              </p>
              <p className="mt-4 font-serif text-headline text-white">
                When a court adopts Marco Reid Courtroom for e-filing and document management,
                every attorney who appears in that court needs Marco Reid to file.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-200">
                That is not a sales conversation. It is a requirement. The court becomes the
                distribution channel. This is the most aggressive growth strategy in the
                entire platform.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* Evidence Management */}
      <section className="py-24 sm:py-36" aria-label="Evidence management">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                <span className="text-xl">&#128274;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-navy-500">
                  Evidence management
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Courtroom-admissible. Tamper-evident. Immutable.
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Chain of custody", desc: "Every document tracks who created it, who accessed it, who modified it, when, and from where. Complete, unbroken, legally defensible." },
              { title: "Tamper-evident architecture", desc: "Cryptographic signatures on every record. If anything is modified outside normal flow, the system flags it immediately. Integrity is mathematically provable." },
              { title: "FIPS 140-3 encryption", desc: "Federal court standard encryption for all courtroom data at rest and in transit. No exceptions. No compromises." },
              { title: "Immutable audit trails", desc: "Every action logged in a cryptographically signed, append-only audit trail. No record can be modified or deleted. Court-admissible evidence chain." },
              { title: "Evidence viewer + annotation", desc: "View any document, image, or recording as evidence. Annotate, highlight, redact. Every annotation timestamped and attributed." },
              { title: "Permanent redaction", desc: "Redact sensitive information permanently and irreversibly. Underlying text destroyed, not hidden. Metadata scrubbed. Federal Rules compliant." },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* Judge Analytics */}
      <section className="py-24 sm:py-36" aria-label="Judge analytics">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50">
                <span className="text-xl">&#128200;</span>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  Judge analytics
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Know the judge before you walk in.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Ruling patterns. Motion grant rates. Sentencing trends. Win/loss ratios by case type.
              Average time to decision. Preference for oral argument vs. written submissions.
              All sourced from public domain court records. The attorney who knows the judge
              wins more often.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      {/* Permission model */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Access model">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Permission-based access.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Courtroom features require explicit authorisation. Not every Marco Reid Legal user
              gets Courtroom access. Court administrators control who can file, who can access
              evidence, and who can view courtroom data.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Firm-level permission", desc: "Firm administrators grant Courtroom access to specific attorneys within their practice." },
                { title: "Court-level access", desc: "Court administrators can grant and revoke e-filing access for attorneys appearing in their jurisdiction." },
                { title: "Stricter security tier", desc: "All courtroom data subject to FIPS 140-3, chain of custody, and immutable audit trails. Higher than standard platform security." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Integration with Legal */}
      <section className="py-24 sm:py-36" aria-label="Integration">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Deeply integrated with Marco Reid Legal.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Matters from Marco Reid Legal link directly to Courtroom proceedings.
              Documents flow into exhibit management. Deposition transcripts flow back
              into the matter record. Billing for courtroom time automatically logged.
              The Oracle available for real-time research. Marco Reid Voice available for
              transcription. Two products, seamlessly connected.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Disclaimer + CTA */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The courtroom. Reinvented.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Depositions. E-filing. Evidence management. Judge analytics.
              All in one platform.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Marco Reid Legal</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
