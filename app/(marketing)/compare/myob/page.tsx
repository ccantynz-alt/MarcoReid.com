import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs MYOB — Beyond AU/NZ Accounting to Global Professional Intelligence",
  description:
    "Why accounting professionals are moving from MYOB to Marco Reid. Everything MYOB does plus AI research, voice dictation, legal integration, and global market coverage across NZ, AU, US, UK, and Singapore.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/myob`,
};

const painPoints = [
  {
    pain: "MYOB is AU/NZ only. The moment a client has US, UK, or Singapore operations, you need a completely separate platform",
    solution: "Marco Reid Accounting covers NZ, AU, US, UK, and Singapore from day one. One platform, one login, every market your clients operate in",
  },
  {
    pain: "MYOB has no AI research engine. Answering a client tax query still means manual lookups across the IRD, ATO, IRS, and HMRC websites",
    solution: "Marco — the Oracle — delivers verified answers across NZ, AU, US, and UK tax codes, regulatory frameworks, and accounting standards. Cited to the official source every time",
  },
  {
    pain: "MYOB has no voice dictation. Client notes, engagement letters, and tax memos are typed manually or dictated into a separate expensive tool",
    solution: "Marco Reid Voice is built into every input field across the platform. Accounting vocabulary. 9 languages. Context-aware formatting that knows the difference between a tax memo and an engagement letter",
  },
  {
    pain: "MYOB has no legal integration. When a client has both accounting and legal needs, you and their lawyer are on completely separate platforms with no shared context",
    solution: "Marco Reid Accounting and Marco Reid Legal share one platform. CPAs and lawyers collaborate on shared client matters with one audit trail and one AI engine",
  },
  {
    pain: "MYOB&rsquo;s AI features are basic compared to what a modern accounting platform should deliver. Automated categorisation is table stakes, not a differentiator",
    solution: "Marco — the Oracle — goes far beyond categorisation. Multi-jurisdiction tax research, regulatory compliance analysis, and accounting guidance with verified citations to authoritative sources",
  },
  {
    pain: "MYOB pricing scales with complexity. NZ$100/mo before you add payroll, analytics, or multi-entity capabilities that growing firms need",
    solution: "Marco Reid gives you AI research, voice, legal collaboration, multi-jurisdiction coverage, and accounting in one plan. No stacking tiers for capabilities that should be standard",
  },
];

export default function CompareMYOBPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs MYOB
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            MYOB keeps your books.
            <br />
            Marco Reid runs your practice.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            MYOB is solid AU/NZ accounting. Marco Reid is the complete professional intelligence
            platform &mdash; everything MYOB does, plus AI research, voice dictation, legal
            collaboration, and global market coverage that MYOB cannot match.
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
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">MYOB</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">Marco Reid</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { feature: "Accounting and payroll", myob: true, marcoreid: true },
                    { feature: "Invoicing and AP/AR", myob: true, marcoreid: true },
                    { feature: "Bank feeds and reconciliation", myob: true, marcoreid: true },
                    { feature: "STP payroll (AU)", myob: true, marcoreid: true },
                    { feature: "AI tax and regulatory research", myob: false, marcoreid: "Marco — the Oracle" },
                    { feature: "Multi-jurisdiction coverage (US, UK, SG)", myob: false, marcoreid: true },
                    { feature: "Voice dictation", myob: false, marcoreid: "Built-in, 9 languages" },
                    { feature: "Legal practice management", myob: false, marcoreid: true },
                    { feature: "Cross-professional client collaboration", myob: false, marcoreid: true },
                    { feature: "Document AI drafting", myob: false, marcoreid: true },
                    { feature: "E-signatures", myob: false, marcoreid: "Built-in" },
                    { feature: "Client trust and fund management", myob: false, marcoreid: true },
                    { feature: "AU / NZ market", myob: true, marcoreid: true },
                    { feature: "US / UK / Singapore market", myob: false, marcoreid: true },
                    { feature: "Starting price (NZD)", myob: "NZ$22/mo (accounting only)", marcoreid: "NZ$79/mo (full platform)" },
                  ] as const).map((row, i) => (
                    <tr key={row.feature} className={`border-b border-navy-50 ${i % 2 === 1 ? "bg-navy-50/50" : ""}`}>
                      <td className="px-6 py-3 font-medium text-navy-700">{row.feature}</td>
                      <td className="px-6 py-3 text-navy-400">
                        {typeof row.myob === "boolean"
                          ? row.myob ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : row.myob}
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
              MYOB&rsquo;s entry price looks competitive until you add payroll, multi-currency,
              and the tools growing firms actually need. Marco Reid starts higher and delivers
              dramatically more from the first plan.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold text-navy-400">MYOB</p>
                <p className="mt-4 font-serif text-3xl text-navy-800">From NZ$22/mo</p>
                <ul className="mt-6 space-y-3 text-sm text-navy-600">
                  <li>&#10003; Accounting and invoicing</li>
                  <li>&#10003; AU/NZ payroll (STP)</li>
                  <li>&#10003; Bank feeds</li>
                  <li>&#10007; AI research</li>
                  <li>&#10007; Voice dictation</li>
                  <li>&#10007; Legal integration</li>
                  <li>&#10007; US, UK, or Singapore coverage</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-forest-400 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold text-forest-600">Marco Reid Accounting</p>
                <p className="mt-4 font-serif text-3xl text-navy-800">From NZ$79/mo</p>
                <ul className="mt-6 space-y-3 text-sm text-navy-600">
                  <li>&#10003; Everything MYOB does — plus more</li>
                  <li>&#10003; Marco — AI tax and regulatory research</li>
                  <li>&#10003; Voice dictation (9 languages)</li>
                  <li>&#10003; Legal collaboration and cross-professional bridge</li>
                  <li>&#10003; Document AI drafting and e-signatures</li>
                  <li>&#10003; NZ, AU, US, UK, and Singapore coverage</li>
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
              Marco Reid does not provide tax advice. It provides tax research assistance for
              qualified CPAs and accountants. Always verify regulatory citations before reliance
              in any client filing or professional communication.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready for a platform that grows beyond AU/NZ?
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
