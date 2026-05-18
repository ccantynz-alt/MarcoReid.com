import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title:
    "Marco Reid Launch — Delaware C-Corp / LLC / NZ Ltd / AU Pty / UK Ltd, with sign-off",
  description:
    "From NZ Limited to globally-compliant SaaS in three weeks. Marco Reid bundles entity formation, cross-border tax structuring, full SaaS legal pack, EIN, US bank account, and registered agent — with a verified attorney + accountant signing every output. Stripe Atlas plus the layers Atlas can't do.",
};

const stages = [
  {
    n: "01",
    title: "Intake + structure design",
    when: "Day 1–2",
    body:
      "Plain-English intake. Founder details, intended customer base, jurisdictions, equity structure. Marco proposes the entity (DE C-Corp vs DE LLC vs NZ Ltd holdco) and the cross-border tax structure (Option A IP-in-US vs Option B IP-in-NZ). Accountant + attorney review the proposal through SignoffRequest.",
  },
  {
    n: "02",
    title: "Filing + registered agent",
    when: "Day 3–5",
    body:
      "Certificate of Incorporation filed with Delaware Division of Corporations (or Companies Office NZ / ASIC AU / Companies House UK). Registered agent appointed. Filing receipt + entity number returned. Logged in RegulatorFiling with hash-chained audit row.",
  },
  {
    n: "03",
    title: "EIN application",
    when: "Day 5–28",
    body:
      "Form SS-4 prepared and faxed to IRS specialty unit (the only path for non-US founders). 4–6 week wait is structural — Marco can't shortcut what the IRS requires, but every status check + follow-up is logged.",
  },
  {
    n: "04",
    title: "US business bank account",
    when: "Day 7–14 (parallel)",
    body:
      "Mercury / Wise Business / Relay account opened off the EIN + cert + ID verification. Account ref captured in EntityFormation. Stripe Atlas rail integrated for payments.",
  },
  {
    n: "05",
    title: "Founder document pack",
    when: "Day 7–10",
    body:
      "Bylaws, action of incorporator, initial board consent, stock issuance + share certificates, 83(b) election (CRITICAL — must be filed within 30 days of stock receipt), founder IP assignment, indemnification agreement, secretary's certificate. Each drafted by Marco; each signed off by the engaged attorney through SignoffRequest.",
  },
  {
    n: "06",
    title: "SaaS legal pack",
    when: "Day 10–14",
    body:
      "13-document SaaS pack: ToS, Privacy Policy, AUP, Cookie Policy, Refund Policy, DPA, AI Disclosure, AI Output Disclaimer, SLA, Sub-processor list, DMCA Policy, CCPA Disclosure, Trademark Notice. AI clauses (no-training, output non-warranty, DMCA whistleblower) baked in. Attorney signs every document.",
  },
  {
    n: "07",
    title: "Cross-border tax filings",
    when: "Day 14–18",
    body:
      "W-8BEN-E filed with Stripe + every US payee. NZ + AU GST registration. US sales-tax registration in nexus states (Stripe Tax integration). Transfer-pricing documentation drafted for the holdco/opco structure. Accountant signs.",
  },
  {
    n: "08",
    title: "Annual compliance autopilot",
    when: "Year 2 onwards",
    body:
      "Delaware franchise tax + annual report. NZ Companies Office annual return. ASIC annual review. Each filing drafted from the entity record, signed by the engaged accountant + attorney. Recurring revenue for the firm; never-miss for the founder.",
  },
];

const tiers = [
  {
    name: "Solo Founder",
    price: "$1,499",
    period: "+ $99/mo compliance autopilot",
    description: "Single-founder DE C-Corp or DE LLC, NZ Ltd, AU Pty, or UK Ltd",
    features: [
      "Entity formation + registered agent (year 1)",
      "EIN application (faxed, IRS-direct)",
      "US business bank account (Mercury / Wise / Relay)",
      "Founder document pack (bylaws, board consent, 83(b), IP assignment)",
      "13-document SaaS legal pack",
      "Stripe Atlas / Stripe Connect setup",
      "Attorney + accountant sign-off on every output",
      "Year 1 annual compliance included",
      "Audit trail + DocumentVersion + RegulatorFiling logged",
    ],
  },
  {
    name: "Funded Startup",
    price: "$3,499",
    period: "+ $199/mo compliance autopilot",
    description:
      "Multi-founder + early hires + cross-border holdco (NZ Ltd → DE C-Corp)",
    highlighted: true,
    features: [
      "Everything in Solo Founder",
      "Holdco/opco structure design + transfer-pricing doc",
      "Multi-founder cap table + vesting schedules",
      "First 3 employee offer letters + IP assignments",
      "Multi-jurisdiction tax registration (NZ GST + AU GST + US sales tax)",
      "ISO 27001 / SOC 2 Type II prep checklist",
      "DMCA Designated Agent registration",
      "USPTO trademark filing on company name",
      "Founding-cohort pricing locked",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "VC-backed + multi-entity + complex structures",
    features: [
      "Everything in Funded Startup",
      "Multiple entity formation (group structures)",
      "Customised governance + investor docs (SAFEs, term sheets)",
      "EU + UK GDPR compliance (DPA + ROPA + DPIA)",
      "AML/CFT registration in regulated jurisdictions",
      "Dedicated cross-border tax adviser",
      "Engagement letters from white-shoe firms via marketplace",
      "Annual on-site review",
    ],
  },
];

const vsAtlas = [
  {
    feature: "DE C-Corp / LLC formation",
    atlas: "✓",
    marco: "✓",
    note: "Same regulator submission. Same week-long timeline.",
  },
  {
    feature: "EIN application",
    atlas: "✓",
    marco: "✓",
    note: "Same IRS specialty-unit fax process for non-US founders.",
  },
  {
    feature: "US business bank account",
    atlas: "✓",
    marco: "✓",
    note: "Mercury / Stripe Treasury partner integration.",
  },
  {
    feature: "Generic founder document templates",
    atlas: "✓",
    marco: "✓",
    note: "Atlas: unreviewed templates. Marco Reid: reviewed + signed by an engaged attorney.",
  },
  {
    feature: "Attorney sign-off on every output",
    atlas: "✗",
    marco: "✓",
    note: "Atlas issues bylaws + 83(b) elections unreviewed. Marco Reid passes every output through SignoffRequest.",
  },
  {
    feature: "Cross-border tax structure design",
    atlas: "✗",
    marco: "✓",
    note: "Atlas: 'talk to your tax adviser'. Marco Reid IS the tax adviser, with the holdco/opco modelling.",
  },
  {
    feature: "Full 13-document SaaS legal pack",
    atlas: "✗ (Stripe ToS template only)",
    marco: "✓",
    note: "ToS / Privacy / AUP / DPA / DMCA / AI clauses / Sub-processor list, all attorney-signed.",
  },
  {
    feature: "Multi-jurisdiction support",
    atlas: "US-only",
    marco: "NZ + AU + UK + US + Singapore",
    note: "Atlas does Delaware. Marco Reid does the NZ Ltd holdco that owns the DE C-Corp.",
  },
  {
    feature: "Hash-chained audit trail",
    atlas: "✗",
    marco: "✓",
    note: "Every formation step in AuditLog; regulator export available.",
  },
  {
    feature: "Annual compliance autopilot",
    atlas: "Email reminders",
    marco: "Filing + sign-off",
    note: "Atlas reminds. Marco Reid runs the actual annual filing under your brand, signed.",
  },
];

export default function LaunchPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Marco Reid Launch
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              From NZ Limited to globally-compliant SaaS, in three weeks.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Stripe Atlas does the formation paperwork in seven days for $500.
              Marco Reid Launch does the formation, the cross-border tax
              structure, the full SaaS legal pack, the EIN, the US bank
              account, and the annual compliance autopilot &mdash; with a
              verified attorney and accountant signing every output. With
              your firm&rsquo;s name on the artefacts, not Marco Reid&rsquo;s.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Start your launch &rarr;
              </Button>
              <Button
                href="/for-attorneys"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                For attorneys
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/60">
              Pricing model is Rule 5.4 / Lawyers and Conveyancers Act
              compliant. Two engagement letters: founder ↔ professional, and
              professional ↔ Marco Reid. No fee-splitting.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Eight stages. Three weeks. Sign-off on every step.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The full pipeline from intake to year-2 compliance autopilot.
              The IRS-imposed 4–6 week EIN wait is structural; everything
              else runs in parallel.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s) => (
              <Reveal key={s.n} delay={0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-card sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-3xl text-gold-500">{s.n}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-navy-400">
                      {s.when}
                    </p>
                  </div>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Marco Reid Launch vs Stripe Atlas.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Atlas commoditised mechanical filing. Marco Reid restores the
              layer Atlas can&rsquo;t do: professional sign-off,
              cross-border structure, full legal pack, audit posture.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-xs uppercase tracking-wider text-navy-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Feature</th>
                  <th className="px-5 py-3 text-center font-semibold">
                    Stripe Atlas
                  </th>
                  <th className="px-5 py-3 text-center font-semibold">
                    Marco Reid Launch
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 text-navy-600">
                {vsAtlas.map((r) => (
                  <tr key={r.feature}>
                    <td className="px-5 py-4 font-medium text-navy-800">
                      {r.feature}
                      <p className="mt-1 text-[11px] font-normal text-navy-400">
                        {r.note}
                      </p>
                    </td>
                    <td
                      className={`px-5 py-4 text-center text-xs font-semibold ${
                        r.atlas === "✓"
                          ? "text-forest-700"
                          : r.atlas === "✗"
                            ? "text-plum-600"
                            : "text-navy-500"
                      }`}
                    >
                      {r.atlas}
                    </td>
                    <td className="px-5 py-4 text-center text-xs font-semibold text-forest-700">
                      {r.marco}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Pricing.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              SaaS subscription + flat-fee tooling per formation. The
              attorney + accountant on the engagement bill the founder
              directly under their own engagement letters.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {tiers.map((t) => (
              <Reveal key={t.name} delay={0.05}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 shadow-card ${
                    t.highlighted
                      ? "border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white ring-2 ring-gold-200"
                      : "border-navy-100 bg-white"
                  }`}
                >
                  <div>
                    <h3 className="font-serif text-2xl text-navy-800">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-sm text-navy-400">{t.description}</p>
                    <p className="mt-6">
                      <span className="font-serif text-4xl text-navy-800">
                        {t.price}
                      </span>
                    </p>
                    {t.period && (
                      <p className="mt-1 text-xs text-navy-400">{t.period}</p>
                    )}
                  </div>
                  <ul className="mt-8 flex-1 space-y-3 text-sm text-navy-600">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-0.5 text-forest-500">&#10003;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={t.highlighted ? "gold" : "secondary"}
                    className="mt-8 w-full justify-center"
                  >
                    {t.name === "Enterprise" ? "Talk to us" : "Start launch"}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              Atlas + Termly + Avalara + cross-border accountant + US attorney,
              in one workflow.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Each of those costs separately. None of them sign off on each
              other&rsquo;s work. Marco Reid Launch ships them as a single
              engagement &mdash; with the credentialled professional standing
              behind every artefact.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Start your launch &rarr;
              </Button>
              <Button
                href="/cross-border-admission"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                Cross-border admission
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
