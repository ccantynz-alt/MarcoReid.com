import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Immigration \u2014 AI-Powered Immigration Compliance",
  description:
    "Visa case management, RFE drafting, deadline tracking, USCIS form automation, and Marco for immigration. Built for immigration lawyers and compliance teams.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Immigration",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered immigration compliance platform with case management, USCIS form automation, RFE drafting, and verified regulatory research for immigration practitioners.",
  url: `${BRAND.url}/immigration`,
};

export default function ImmigrationPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Immigration
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">AI-powered immigration</span>
            <br />
            <span className="text-navy-700">compliance, end to end.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Case management, USCIS form automation, deadline tracking, RFE drafting, and Marco
            for immigration &mdash; verified research across the INA, 8 CFR, USCIS Policy Manual,
            and consular guidance. Built for the practitioners who can&rsquo;t afford to miss a deadline.
          </p>
          <div className="mt-12 animate-fade-up-3 opacity-0">
            <Button href="/pricing" size="lg">See pricing</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Stats */}
      <section className="py-32 sm:py-44" aria-label="Impact">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              The numbers speak for themselves.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={70} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">faster RFE responses</p>
              <p className="mt-1 text-xs text-navy-300">Drafted, cited, ready to review.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={0} />
              </p>
              <p className="mt-2 text-sm text-navy-400">missed deadlines</p>
              <p className="mt-1 text-xs text-navy-300">Automated tracking across every case.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={100} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-navy-400">USCIS forms supported</p>
              <p className="mt-1 text-xs text-navy-300">I-130, I-485, I-765, I-129, N-400, and more.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The problem */}
      <section className="py-32 sm:py-44" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Immigration practice runs on deadlines no one can afford to miss.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              An RFE deadline missed by a day can cost a client their status. A form filed on the
              wrong edition gets rejected and restarts the clock. Policy changes weekly. Case
              management software was built in 2008 and looks it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Immigration brings every workflow into one platform. Cases, forms,
              deadlines, RFEs, client intake, and verified research &mdash; connected, current,
              and intelligent.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Feature stories */}
      <section className="py-32 sm:py-44" aria-label="Features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Every workflow. One platform.
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              What Marco Reid Immigration does.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Case management</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every case. Every deadline. Every document.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Track I-130, I-485, I-129, I-765, N-400 and every other case type from intake
                  to approval. Automatic deadline calculation from receipt date. Document
                  checklists that update with policy changes. Client portals built in.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">RFE drafting</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Draft RFE responses in minutes.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Upload the RFE, the case file, and the supporting evidence. Marco produces a
                  cited draft response keyed to the exact INA sections, 8 CFR provisions, and
                  USCIS Policy Manual chapters the officer requested. You review. You file.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-purple-400">Marco for immigration</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Verified immigration research, instantly.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Every INA section, 8 CFR provision, USCIS Policy Manual chapter, AAO decision,
                  and consular guidance &mdash; verified against official sources. &ldquo;Public
                  charge ground of inadmissibility for an adjustment applicant&rdquo; &mdash;
                  answered instantly, cited correctly, never hallucinated.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Form automation</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  USCIS forms, auto-filled from the case file.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Intake answers populate every form in the case. Edition checks happen in real
                  time. PDF outputs match USCIS specifications exactly. No more retyping the same
                  beneficiary details across six different forms.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Everything included */}
      <section className="py-32 sm:py-44" aria-label="All features">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              Everything included.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "Case management", desc: "Family, employment, humanitarian, naturalization" },
              { title: "USCIS form automation", desc: "Auto-fill, edition checks, PDF output" },
              { title: "Deadline tracking", desc: "RFE, NOID, biometrics, master calendar" },
              { title: "RFE drafting", desc: "Cited responses keyed to officer requests" },
              { title: "Client intake portals", desc: "Branded, multilingual, mobile-first" },
              { title: "Document checklists", desc: "Updated automatically with policy changes" },
              { title: "Marco", desc: "INA, 8 CFR, Policy Manual, AAO research with citations" },
              { title: "Marco Reid Voice", desc: "Dictate intake notes and case updates" },
              { title: "E-signatures", desc: "G-28s and retainers signed inside the platform" },
              { title: "Billing & trust", desc: "Time tracking, IOLTA, marketplace payments" },
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
              Immigration compliance
              <br />
              you can stake your practice on.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From intake to approval. One platform. Zero missed deadlines.
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
