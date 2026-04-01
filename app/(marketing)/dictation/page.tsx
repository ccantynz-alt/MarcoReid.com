import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import VoiceMockup from "@/app/components/marketing/VoiceMockup";
import Reveal from "@/app/components/effects/Reveal";
import MockupReveal from "@/app/components/effects/MockupReveal";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import TypingDemo from "@/app/components/effects/TypingDemo";


export const metadata: Metadata = {
  title: "AlecRae Voice \u2014 The Most Advanced Professional Voice Platform Ever Built",
  description:
    "Not a dictation tool. The platform\u2019s intelligence layer. Legal and accounting vocabulary in 9 languages. Voice commands that file, bill, schedule, and research.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AlecRae Voice",
  applicationCategory: "Productivity",
  operatingSystem: "Web",
  description: "Universal voice input layer for legal and accounting professionals. 9 languages with professional vocabulary intelligence. Voice commands across the entire platform.",
  url: `${BRAND.url}/dictation`,
};

const languages = [
  "English", "Spanish", "Mandarin", "Hindi", "Japanese",
  "French", "Arabic", "Portuguese", "Korean",
];

export default function DictationPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-widest text-navy-500 opacity-0">
            AlecRae Voice
          </p>
          <h1 className="mt-8 animate-fade-in-up-delay text-hero font-serif opacity-0">
            <span className="text-forest-500">Speak.</span>
            {" "}
            <span className="text-navy-700">It is done.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-in-up-delay-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Every other dictation tool on the market is an island. It sits outside your workflow.
            AlecRae Voice is different. It IS the platform&rsquo;s input layer. Everywhere you can type,
            you can speak. And it doesn&rsquo;t just transcribe &mdash; it understands your profession,
            your vocabulary, and your commands.
          </p>
          <div className="mt-12 animate-fade-in-up-delay-3 opacity-0">
            <Button href="/pricing" size="lg">See pricing</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Live typing demo */}
      <section className="py-16" aria-label="Voice demo">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-forest-200 bg-navy-50 p-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="pulse-ring absolute inset-0 rounded-full border-2 border-amber-400/40" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                    <svg className="h-5 w-5 text-navy-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-navy-500">AlecRae Voice &mdash; listening</p>
                  <TypingDemo className="mt-1 text-lg" />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Voice mockup */}
      <section className="py-16 sm:py-24" aria-label="Voice interface preview">
        <Container>
          <MockupReveal className="mx-auto max-w-4xl">
            <VoiceMockup />
          </MockupReveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Why this is different */}
      <section className="py-32 sm:py-44" aria-label="Why Voice is different">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-navy-500">
              Why this is different
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Not a dictation tool.
              <br />
              <span className="text-forest-500">The platform&rsquo;s intelligence layer.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              WisprFlow can inject text into any app. Dragon Legal understands legal vocabulary.
              Otter transcribes meetings. But none of them can create a billing entry, query a
              legal research database, schedule a meeting, attach a document from a matter file,
              or send a matter-tagged message.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Those actions require platform access. AlecRae Voice has platform access because it
              IS the platform. That&rsquo;s the difference. That&rsquo;s why nobody can replicate it.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Voice commands that actually DO things */}
      <section className="py-32 sm:py-44" aria-label="Voice commands">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-navy-500">
              Voice commands
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Commands that no other voice tool can execute.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            {[
              {
                context: "Inside email composer",
                command: "\"Send this to Marcus Rodriguez, subject H-1B update, mark urgent, attach the I-129 receipt notice from the matter.\"",
                result: "Recipient filled. Subject filled. Priority flag set. Document attached from matter files. One voice command.",
              },
              {
                context: "Inside document editor",
                command: "\"Ask the Oracle — what is the California standard for adverse possession, insert the controlling case as a citation.\"",
                result: "Oracle queried. Top verified case returned. Citation inserted at cursor. Attorney never stopped dictating.",
              },
              {
                context: "Inside billing",
                command: "\"Log four point five hours on the Rodriguez H-1B matter, preparation and filing of I-129, today's date, standard rate.\"",
                result: "Time entry created. Matter tagged. Date set. Rate applied. Billing admin by voice in ten seconds.",
              },
              {
                context: "Inside calendar",
                command: "\"Schedule a call with Patricia Thornton, Thursday at two pm, thirty minutes, tag it to the Thornton acquisition matter, send her a Zoom link.\"",
                result: "Meeting created. Matter tagged. Zoom generated. Calendar invite sent. Done.",
              },
            ].map((cmd) => (
              <Reveal key={cmd.context} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">{cmd.context}</p>
                  <p className="mt-4 text-lg italic leading-relaxed text-navy-700">{cmd.command}</p>
                  <p className="mt-4 text-sm text-forest-600">&rarr; {cmd.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Stats */}
      <section className="py-32 sm:py-44" aria-label="Time savings">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={4} suffix="h" />
              </p>
              <p className="mt-2 text-sm text-navy-400">recovered every single day</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                $<AnimatedCounter end={1400} />
              </p>
              <p className="mt-2 text-sm text-navy-400">daily billing capacity from one feature</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-navy-500">
                <AnimatedCounter end={9} />
              </p>
              <p className="mt-2 text-sm text-navy-400">languages with professional vocabulary</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Languages */}
      <section className="relative py-32 sm:py-44" aria-label="Languages">
        <Container className="relative text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-navy-500">
              Global from day one
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              9 languages. Professional vocabulary in every one.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-navy-400">
              Not just transcription. A Spanish-speaking immigration attorney dictating in
              Spanish gets the same professional language understanding as an English-speaking
              attorney. &ldquo;Demandante&rdquo; is not corrected to &ldquo;plaintiff.&rdquo;
              The intelligence is language-aware.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {languages.map((lang) => (
                <span key={lang} className="rounded-full border border-navy-100 bg-navy-50 px-5 py-2.5 text-sm font-medium text-navy-400 transition-colors hover:border-forest-300 hover:text-navy-700">
                  {lang}
                </span>
              ))}
            </div>
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

      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              Stop typing. Start speaking.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              Every professional who uses AlecRae Voice for one week and then has to go back
              to typing feels the loss immediately. That experience is irreversible.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Law</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
