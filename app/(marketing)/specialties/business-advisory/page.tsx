import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title:
    "Business advisory + virtual CFO — strategy, modelling, KPI dashboards",
  description:
    "Virtual CFO + business advisory across NZ, AU, UK, US. APES 220 / 305 compliance. 13-week cash flow, scenario modelling, KPI dashboards, exit-readiness, board reporting. Sign-off on every advisory output.",
};

export default function BusinessAdvisorySpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Business advisory · Virtual CFO"
      title="Advisory work, on the same audit-trail spine as the compliance work."
      intro="Compliance work is shrinking margin. Advisory is where chartered accountants grow. Marco Reid runs the cash-flow models, the KPI dashboards, the board reports, the exit-readiness checks &mdash; with the credentialled CA / CPA signing every output before it reaches the client. The compliance and the advisory live on the same ledger; the same audit trail covers both."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "APES 110 — Independence + ethics for advisory engagements",
            "APES 220 — Taxation services (where advisory has tax components)",
            "APES 305 — Terms of engagement",
            "CA ANZ Member Conduct Rules",
            "Companies Act 1993 — director-duty advice rails",
            "Te Tiriti o Waitangi considerations for iwi commercial advisory",
          ],
          covers: [
            "Virtual CFO retainers (monthly KPI, cash-flow, board reports)",
            "13-week rolling cash-flow forecast + scenario stress",
            "Pricing strategy + margin analysis for SMEs",
            "Exit-readiness review (10-year vendor-due-diligence prep)",
            "Capital-raising support (deck, model, VDD pack)",
            "Director governance + Companies Act compliance advisory",
            "Iwi commercial entity advisory (post-settlement)",
          ],
          matters: [
            "Virtual CFO",
            "Cash-flow",
            "Pricing",
            "Exit-readiness",
            "Capital raise",
            "Governance",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "APES 110 + 220 + 305 (CA ANZ + CPA Australia)",
            "Corporations Act 2001 — directors' duties advisory rails",
            "AFSL regime (where advisory crosses into financial advice)",
            "Tax Agent Services Act 2009 (where advisory has tax components)",
            "ASIC RG 175 — financial product advice (avoid crossing the line)",
          ],
          covers: [
            "Virtual CFO retainers (monthly KPI, cash-flow, board reports)",
            "ATO benchmarks + industry comparison advisory",
            "Capital structure + debt-vs-equity analysis",
            "Exit-readiness + business-valuation prep (Maintainable Earnings, DCF, Asset)",
            "Pre-IPO + capital-raise support",
            "Family-business succession planning",
            "Where-the-line-is advisory: avoiding incidental financial-product advice without an AFSL",
          ],
          matters: [
            "Virtual CFO",
            "ATO benchmarks",
            "Capital structure",
            "Valuation",
            "IPO prep",
            "Family succession",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "ICAEW Code of Ethics + Practice Assurance",
            "Companies Act 2006 — director-duty advisory",
            "FCA Conduct of Business sourcebook (where advisory crosses into regulated advice)",
            "ICAEW Practice Assurance Standards",
            "Insolvency Act 1986 — director-warning advisory",
          ],
          covers: [
            "Outsourced FD / Virtual CFO retainers",
            "Cash-flow + working-capital optimisation",
            "Restructuring + turnaround advisory",
            "Pre-pack administration + CVA support",
            "M&A target evaluation + integration planning",
            "Where-the-line-is advisory: avoiding regulated investment advice (FCA Authorisation)",
          ],
          matters: [
            "FD retainer",
            "Working capital",
            "Restructuring",
            "Pre-pack",
            "M&A integration",
            "Director warnings",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "AICPA Statements on Standards for Consulting Services (SSCS) No. 1",
            "AICPA Statements on Standards for Tax Services (SSTS)",
            "AICPA Code of Professional Conduct",
            "State CPA boards — independence + advisory rules",
            "SEC + state securities laws (where advisory crosses into investment advice)",
          ],
          covers: [
            "Outsourced CFO / Controller retainers",
            "13-week rolling cash-flow forecast + bank reporting",
            "M&A buy-side + sell-side advisory",
            "ESOP feasibility + valuation",
            "PE add-on integration",
            "Family office advisory",
            "Section 1202 QSBS planning + qualification reviews",
          ],
          matters: [
            "Outsourced CFO",
            "Cash-flow",
            "M&A",
            "ESOP",
            "PE integration",
            "QSBS",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "13-week rolling cash flow",
          body:
            "Drives off the bookkeeping ledger automatically. Updates daily as bank feeds reconcile. Variance-from-forecast surfaced at the partner level; client sees a clean weekly snapshot.",
        },
        {
          title: "KPI dashboards from real data",
          body:
            "Industry-standard KPIs per sector (gross margin, EBITDA margin, days-sales-outstanding, employee productivity, customer-acquisition-cost). Drawn from the live ledger, not from spreadsheets the client emails over.",
        },
        {
          title: "Scenario + stress modelling",
          body:
            "What if rates rise 200bps? What if customer churn is 5% higher? Marco runs the model in seconds; the partner reviews the assumptions and signs the output before it reaches the client.",
        },
        {
          title: "Board pack drafting",
          body:
            "Monthly + quarterly board pack assembled from the ledger + KPIs + cash-flow + commentary. Drafted in the firm's house style. Partner reviews + signs before delivery.",
        },
        {
          title: "Exit-readiness checklist",
          body:
            "10-year vendor-due-diligence checklist. Marco surfaces the gaps (incomplete contracts, undocumented related-party transactions, missing employment agreements, IP not properly assigned). Owner gets a remediation plan.",
        },
        {
          title: "Where-the-line-is checks",
          body:
            "Australia AFSL, US Investment Advisers Act, UK FCA — advisory work that crosses into regulated investment advice without authorisation is a regulatory breach. Marco flags client questions that risk crossing the line and escalates to the partner.",
        },
      ]}
      cta={{
        heading: "Move the practice up the value chain.",
        body: "Compliance is shrinking margin. Advisory is where chartered accountants grow. Marco Reid handles the data plumbing; you handle the judgement calls. Every advisory output signed before release.",
        primaryHref: "/for-accountants",
      }}
    />
  );
}
