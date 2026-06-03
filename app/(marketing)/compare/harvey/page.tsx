import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs Harvey AI — Beyond AI Research to Full Practice Management",
  description:
    "Harvey AI is excellent legal research. Marco Reid is the complete operating system — everything Harvey does plus practice management, billing, trust accounting, voice dictation, and accounting.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/harvey`,
};

const painPoints = [
  {
    pain: "Harvey does AI legal research and document analysis. That is where it stops. You still need Clio, Word, Xero, Dragon, and DocuSign",
    solution: "Marco Reid includes AI research, practice management, document AI, billing, trust accounting, voice dictation, accounting, e-signatures, and client portal — one login, one price",
  },
  {
    pain: "Harvey has no voice dictation. Lawyers still dictate into Dragon or type everything manually",
    solution: "Marco Reid Voice is built into every input field across the entire platform. Legal and accounting vocabulary. 9 languages. Context-aware formatting that knows the difference between a contract clause and a case note",
  },
  {
    pain: "Harvey has no billing or time capture. Every minute tracked in Harvey still has to be moved into a separate billing tool",
    solution: "Marco Reid captures time inline — while you research, while you draft, while you message a client. Billing is automatic. Stripe payment collection is built in",
  },
  {
    pain: "Harvey has no trust accounting. IOLTA compliance requires a separate platform regardless of how good Harvey&rsquo;s AI is",
    solution: "Marco Reid trust accounting is IOLTA-compliant from day one. Every transaction logged with immutable audit trails, three-way reconciliation, and full state bar compliance",
  },
  {
    pain: "Harvey is enterprise-only. Relationship-driven sales. No public pricing. Solo and small firm attorneys cannot get in the door",
    solution: "Marco Reid starts at $99/month. No sales call required. No minimum seat count. Solo attorneys get the same AI power as the Am Law 100",
  },
  {
    pain: "Harvey has no accounting integration. The lawyer and their CPA are on completely different platforms with no shared context",
    solution: "Marco Reid Accounting lives under the same roof as Marco Reid Legal. Lawyers and CPAs collaborate on shared client matters with one platform, one audit trail, one AI engine",
  },
];

export default function CompareHarveyPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs Harvey AI
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Harvey researches law.
            <br />
            Marco Reid practices it.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Harvey AI is a powerful legal research tool worth $11 billion. Marco Reid is the complete
            operating system for legal and accounting professionals &mdash; AI research is one feature
            of many. No separate tools. No separate logins. Everything in one platform.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Comparison">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The pain. The solution.
            </h2>
          </Reveal>

          <div className="mt-16 space-y-4">
            {painPoints.map((p, i) => (
              <Reveal key={i} delay={0.05}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                    <p className="text-xs font-bold tracking-wider text-red-600">The pain</p>
                    <p
                      className="mt-3 text-sm leading-relaxed text-navy-600"
                      dangerouslySetInnerHTML={{ __html: p.pain }}
                    />
                  </div>
                  <div className="rounded-xl border border-forest-200 bg-forest-50/50 p-6">
                    <p className="text-xs font-bold tracking-wider text-forest-600">Marco Reid</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Feature comparison">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Side by side.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Feature</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Harvey AI</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">Marco Reid</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { feature: "AI legal research", harvey: true, marcoreid: true },
                    { feature: "Document analysis and review", harvey: true, marcoreid: true },
                    { feature: "Citation verification", harvey: "Partial", marcoreid: "Full — CourtListener verified" },
                    { feature: "Practice management", harvey: false, marcoreid: true },
                    { feature: "Billing and time tracking", harvey: false, marcoreid: true },
                    { feature: "Trust accounting (IOLTA)", harvey: false, marcoreid: true },
                    { feature: "Voice dictation", harvey: false, marcoreid: "Built-in, 9 languages" },
                    { feature: "Document AI drafting", harvey: "Analysis only", marcoreid: "Full drafting and editing" },
                    { feature: "E-signatures", harvey: false, marcoreid: "Built-in" },
                    { feature: "Client portal", harvey: false, marcoreid: true },
                    { feature: "Court-rules calendaring", harvey: false, marcoreid: true },
                    { feature: "Accounting integration", harvey: false, marcoreid: true },
                    { feature: "Available to solo attorneys", harvey: false, marcoreid: true },
                    { feature: "Public pricing", harvey: "None — enterprise only", marcoreid: "From $99/mo" },
                  ] as const).map((row, i) => (
                    <tr key={row.feature} className={`border-b border-navy-50 ${i % 2 === 1 ? "bg-navy-50/50" : ""}`}>
                      <td className="px-6 py-3 font-medium text-navy-700">{row.feature}</td>
                      <td className="px-6 py-3 text-navy-400">
                        {typeof row.harvey === "boolean"
                          ? row.harvey ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : row.harvey}
                      </td>
                      <td className="px-6 py-3 font-medium text-navy-700">
                        {typeof row.marcoreid === "boolean"
                          ? row.marcoreid ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : <span className="text-forest-600">{row.marcoreid}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Pricing comparison">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Pricing comparison.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-navy-500">
              Harvey AI requires an enterprise relationship and a sales process. Marco Reid starts
              at $99/month. No call required. No minimum commitment.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold text-navy-400">Harvey AI</p>
                <p className="mt-4 font-serif text-3xl text-navy-800">Enterprise only</p>
                <ul className="mt-6 space-y-3 text-sm text-navy-600">
                  <li>&#10003; AI legal research</li>
                  <li>&#10003; Document analysis</li>
                  <li>&#10007; Practice management</li>
                  <li>&#10007; Billing and trust accounting</li>
                  <li>&#10007; Voice dictation</li>
                  <li>&#10007; Accounting integration</li>
                  <li>&#10007; Solo and small firm access</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-forest-400 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold text-forest-600">Marco Reid Legal</p>
                <p className="mt-4 font-serif text-3xl text-navy-800">From $99/mo</p>
                <ul className="mt-6 space-y-3 text-sm text-navy-600">
                  <li>&#10003; AI legal research with verified citations</li>
                  <li>&#10003; Document AI drafting and analysis</li>
                  <li>&#10003; Full practice management</li>
                  <li>&#10003; Billing, trust accounting, e-signatures</li>
                  <li>&#10003; Voice dictation (9 languages)</li>
                  <li>&#10003; Accounting integration</li>
                  <li>&#10003; Available to every attorney from day one</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-36" aria-label="AI disclaimer">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl text-sm text-navy-300">
              Marco is an AI research tool. All outputs must be verified by a qualified professional.
              Marco Reid does not provide legal advice. It provides legal research tools for qualified attorneys.
              Always verify every citation before reliance in any court filing or legal document.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready for the complete legal operating system?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/trial" size="lg">Start your free trial &rarr;</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Marco Reid Legal</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
