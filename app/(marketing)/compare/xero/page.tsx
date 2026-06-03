import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs Xero — Accounting Intelligence That Does More",
  description:
    "Why accounting professionals are switching from Xero to Marco Reid. Everything Xero does — bank feeds, STP, MTD, payroll — plus AI research, voice dictation, and legal integration.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/xero`,
};

const painPoints = [
  {
    pain: "Xero is accounting only. Your legal clients need a completely separate platform for their practice management",
    solution: "Marco Reid Accounting and Marco Reid Legal share one platform. CPAs and their lawyer clients collaborate on shared matters inside one login",
  },
  {
    pain: "Xero has no AI research engine. Answering a client tax query means manual lookups across multiple sources",
    solution: "Marco — the Oracle — answers tax, regulatory, and accounting queries with verified citations to IRS, ATO, IRD, and HMRC source documents",
  },
  {
    pain: "Xero has no voice dictation. Every note, memo, and engagement letter is typed from scratch",
    solution: "Marco Reid Voice is built into every input. Dictate client notes, engagement letters, and tax memos with accounting vocabulary that actually understands the terminology",
  },
  {
    pain: "Xero has no professional directory. You cannot refer clients to lawyers or receive referrals from law firms inside the platform",
    solution: "Marco Reid connects CPAs and lawyers in a shared professional network. Cross-professional referrals and shared client matters are built in",
  },
  {
    pain: "Xero has no trust accounting for CPA firms managing client funds. You need a separate tool",
    solution: "Marco Reid includes compliant trust and client fund management with full audit logging — every transaction timestamped and cryptographically signed",
  },
  {
    pain: "Xero pricing scales up fast. Payroll, expenses, projects, and analytics all require higher tiers",
    solution: "Marco Reid gives you AI research, voice, legal collaboration, and accounting in one plan. No stacking tiers for capabilities that should be standard",
  },
];

export default function CompareXeroPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs Xero
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Xero does your accounts.
            <br />
            Marco Reid runs your practice.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Xero is excellent accounting software. Marco Reid is the complete professional intelligence
            platform &mdash; everything Xero does, plus AI research, voice dictation, legal collaboration,
            and a professional network that Xero will never build.
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
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.pain}</p>
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
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Xero</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">Marco Reid</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { feature: "Bank feeds and reconciliation", xero: true, marcoreid: true },
                    { feature: "STP payroll (AU) / RTI (UK)", xero: true, marcoreid: true },
                    { feature: "MTD for VAT (UK)", xero: true, marcoreid: true },
                    { feature: "KiwiSaver auto-calculation (NZ)", xero: true, marcoreid: true },
                    { feature: "AI tax and regulatory research", xero: false, marcoreid: "Marco — the Oracle" },
                    { feature: "Voice dictation", xero: false, marcoreid: "Built-in, 9 languages" },
                    { feature: "Legal practice management", xero: false, marcoreid: true },
                    { feature: "Cross-professional client collaboration", xero: false, marcoreid: true },
                    { feature: "Client trust and fund management", xero: false, marcoreid: true },
                    { feature: "Document AI drafting", xero: false, marcoreid: true },
                    { feature: "US market", xero: true, marcoreid: true },
                    { feature: "AU / NZ market", xero: true, marcoreid: true },
                    { feature: "UK market", xero: true, marcoreid: true },
                    { feature: "Starting price (NZD)", xero: "NZ$32/mo (accounting only)", marcoreid: "NZ$79/mo (full platform)" },
                  ] as const).map((row, i) => (
                    <tr key={row.feature} className={`border-b border-navy-50 ${i % 2 === 1 ? "bg-navy-50/50" : ""}`}>
                      <td className="px-6 py-3 font-medium text-navy-700">{row.feature}</td>
                      <td className="px-6 py-3 text-navy-400">
                        {typeof row.xero === "boolean"
                          ? row.xero ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : row.xero}
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
              Xero&rsquo;s base price looks low until you add payroll, expenses, and analytics.
              Marco Reid gives you everything from the first plan.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold text-navy-400">Xero</p>
                <p className="mt-4 font-serif text-3xl text-navy-800">From NZ$32/mo</p>
                <ul className="mt-6 space-y-3 text-sm text-navy-600">
                  <li>&#10003; Bank feeds and reconciliation</li>
                  <li>&#10003; Invoicing and bills</li>
                  <li>&#10003; STP payroll (higher tier)</li>
                  <li>&#10007; AI research</li>
                  <li>&#10007; Voice dictation</li>
                  <li>&#10007; Legal integration</li>
                  <li>&#10007; Cross-professional collaboration</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-forest-400 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold text-forest-600">Marco Reid Accounting</p>
                <p className="mt-4 font-serif text-3xl text-navy-800">From NZ$79/mo</p>
                <ul className="mt-6 space-y-3 text-sm text-navy-600">
                  <li>&#10003; Everything Xero does</li>
                  <li>&#10003; Marco — AI tax and regulatory research</li>
                  <li>&#10003; Voice dictation (9 languages)</li>
                  <li>&#10003; Legal collaboration and cross-professional bridge</li>
                  <li>&#10003; Document AI drafting</li>
                  <li>&#10003; Client trust and fund management</li>
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
              Marco Reid does not provide tax advice. It provides tax research assistance for qualified CPAs and accountants.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready for the complete accounting intelligence platform?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/trial" size="lg">Start your free trial &rarr;</Button>
              <Button href="/accounting" variant="secondary" size="lg">Explore Marco Reid Accounting</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
