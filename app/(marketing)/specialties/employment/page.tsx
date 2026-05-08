import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Employment law — agreements, disputes, restructures",
  description:
    "Employment law module across NZ, AU, UK, and US. ERA, Fair Work Act, Employment Rights Act, FLSA + state laws. Personal grievance drafting, redundancy procedure, restraint enforcement, with sign-off on every output.",
};

export default function EmploymentSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Employment"
      title="Employment law for both sides of the table."
      intro="Employee or employer, individual claim or restructure, restraint dispute or unjustified-dismissal application — Marco Reid drafts the right document under the right Act, with the right deadlines, and the lawyer signs every output before it leaves the firm."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "Employment Relations Act 2000 — personal grievances, mediation, ERA",
            "Holidays Act 2003 — annual leave, public holidays, sick leave",
            "Equal Pay Act 1972 + Pay Equity Amendment Act 2020",
            "Health and Safety at Work Act 2015 — duties, WorkSafe",
            "Wages Protection Act 1983 + Minimum Wage Act 1983",
            "Privacy Act 2020 — employee data, references",
          ],
          covers: [
            "Individual employment agreements (permanent, fixed-term, casual)",
            "Personal grievance — unjustified dismissal, disadvantage, discrimination",
            "Restructuring procedure — consultation, redeployment, redundancy",
            "Restraint of trade enforceability + reasonableness modelling",
            "Holiday Pay Act calculations + remediation",
            "90-day trial periods (now reinstated for all employers)",
            "Migrant exploitation + accredited employer compliance",
          ],
          matters: [
            "PG drafting",
            "Restructure",
            "Mediation",
            "ERA hearing",
            "Restraint",
            "Holiday Pay",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "Fair Work Act 2009 + Fair Work Regulations 2009",
            "Modern Awards (122+ industry-specific)",
            "National Employment Standards (NES)",
            "Fair Work Commission — unfair dismissal, general protections",
            "Work Health and Safety Act + state OHS Acts",
            "Sex Discrimination Act 1984 + Disability Discrimination Act 1992",
          ],
          covers: [
            "Unfair dismissal applications (s 394 within 21 days)",
            "General protections — adverse action, workplace rights",
            "Modern Award interpretation + Better Off Overall Test (BOOT)",
            "Enterprise agreements — bargaining, FWC approval",
            "Restructuring + genuine redundancy",
            "Restraint of trade (NSW Restraints of Trade Act vs other states)",
            "Casual conversion, sham contracting, contractor misclassification",
          ],
          matters: [
            "Unfair dismissal",
            "GP claims",
            "Award compliance",
            "EA bargaining",
            "Restraint",
            "Misclassification",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "Employment Rights Act 1996 — unfair dismissal, redundancy, family leave",
            "Equality Act 2010 — protected characteristics + reasonable adjustments",
            "Working Time Regulations 1998",
            "Trade Union and Labour Relations (Consolidation) Act 1992",
            "Employment Tribunal — claims within 3 months less 1 day",
            "ACAS Code of Practice on Disciplinary and Grievance",
          ],
          covers: [
            "Unfair dismissal claims (2-year qualifying service)",
            "Redundancy procedure + collective consultation (>20 employees)",
            "TUPE transfers + ETO reasons",
            "Discrimination claims — direct, indirect, harassment, victimisation",
            "Settlement Agreements + COT3 (ACAS conciliation)",
            "Restrictive covenants — Tillman v Egon Zehnder severance approach",
            "Whistleblowing under PIDA",
          ],
          matters: [
            "ET claims",
            "Redundancy",
            "TUPE",
            "Settlement Agreements",
            "Restrictive covenants",
            "Whistleblowing",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "Fair Labor Standards Act (FLSA) — minimum wage, overtime, exempt classification",
            "Title VII, ADA, ADEA, Equal Pay Act — federal discrimination",
            "FMLA — 12 weeks unpaid leave",
            "NLRA — concerted activity, union organising",
            "State equivalents (CA FEHA, NY HRL, etc.) often more protective",
            "WARN Act — 60-day notice for mass layoffs",
          ],
          covers: [
            "At-will employment + wrongful termination exceptions",
            "Discrimination claims — federal + state (right-to-sue letters)",
            "Wage + hour disputes (exempt vs non-exempt, off-the-clock work)",
            "Non-compete enforceability state-by-state (CA bans; FTC rule paused)",
            "Restrictive covenants + trade secret misappropriation (DTSA)",
            "Reduction-in-force + WARN notices",
            "Independent contractor classification (ABC test states vs IRS test)",
          ],
          matters: [
            "EEOC charges",
            "Wage + hour",
            "Non-competes",
            "RIFs",
            "FLSA misclassification",
            "FMLA interference",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Personal grievance + dismissal claim drafting",
          body:
            "PG (NZ) drafts with the eight-day clock tracked, F2 + ET1 (AU/UK), EEOC charge (US) — populated from intake, statute citations on every page, signed by the lawyer before filing.",
        },
        {
          title: "Restructure / redundancy procedure",
          body:
            "Step-by-step procedure templates per jurisdiction. Consultation letters, alternative-employment surveys, decision letters. Deadlines tracked. The procedural mistakes that lose every claim, prevented at the document level.",
        },
        {
          title: "Restraint of trade modelling",
          body:
            "Marco models enforceability against the relevant test (Wakeling v Atkin NZ, Petersen v Moloney AU, Tillman v Egon Zehnder UK, Reasonableness/Geographic-and-Temporal US). Shows the partner the weak points before the client signs.",
        },
        {
          title: "Wage + hour back-pay calculations",
          body:
            "Holiday Pay Act (NZ), Award + EA underpayment (AU), unlawful deductions (UK), FLSA exempt + overtime (US). Multi-year reconstructions with audit trail.",
        },
        {
          title: "Settlement agreement drafting",
          body:
            "Without-prejudice mediation outcomes (NZ), F1 deeds (AU), Settlement Agreements + COT3 (UK), severance agreements (US). Tax-treatment notes per jurisdiction. ACAS-compliant where required.",
        },
        {
          title: "Discrimination + harassment investigation",
          body:
            "Independent investigation drafting, witness interview prompts, finding templates, remediation plan templates. AML/conflict checks at intake against the firm's prior involvement.",
        },
      ]}
      cta={{
        heading: "Employment files run on procedure. We run the procedure.",
        body: "Eight-day clocks, 21-day clocks, three-month clocks. Marco Reid tracks every deadline, drafts every document, and asks the lawyer to sign before any output goes out.",
        primaryHref: "/for-attorneys",
      }}
    />
  );
}
