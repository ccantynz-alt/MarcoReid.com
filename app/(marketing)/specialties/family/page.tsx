import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Family law — divorce, parenting, relationship property",
  description:
    "Family law module across NZ, AU, UK, and US. Care of Children Act 2004, Family Law Act 1975, Children Act 1989, state family codes. Sign-off-gated drafts, Family Court applications, child support modelling.",
};

export default function FamilySpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Family law"
      title="Family law that respects the people in it."
      intro="Family matters are emotional, procedural, and time-sensitive in equal measure. Marco Reid drafts the application, models the support, surfaces the deadlines &mdash; while the lawyer signs every output before it touches the client."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "Care of Children Act 2004 — parenting orders, day-to-day care, contact",
            "Property (Relationships) Act 1976 — equal sharing presumption, separation agreements",
            "Family Court of New Zealand — applications, mediation, hearings",
            "Family Violence Act 2018 — protection orders, safety orders",
            "Child Support Act 1991 — formula assessment, administrative reviews",
            "Adoption Act 1955 + Hague Convention adoption",
          ],
          covers: [
            "Parenting orders (with-care, contact, guardianship, relocation)",
            "Relationship property division — bach, business, super, debt",
            "Section 21 contracting-out agreements (pre-nups + post-separation)",
            "Protection orders + temporary occupation / ancillary orders",
            "Child support formula recalculation + departure orders",
            "Spousal maintenance + interim maintenance",
            "Hague Convention abductions + return applications",
          ],
          matters: [
            "Without-notice protection",
            "Day-to-day care",
            "Property division",
            "Maintenance",
            "Adoption",
            "Surrogacy advice",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "Family Law Act 1975 (Cth) — parenting + property + maintenance",
            "Federal Circuit and Family Court of Australia (FCFCOA)",
            "Child Support (Assessment) Act 1989 + (Registration and Collection) Act 1988",
            "Family Violence Protection Act (Vic) + state equivalents",
            "Hague Convention on International Child Abduction",
          ],
          covers: [
            "Parenting orders (live-with, spend-time-with, equal shared parental responsibility)",
            "Property settlement — four-step process, contributions + future needs",
            "Binding Financial Agreements (BFAs) — pre-nup + post-separation",
            "Family violence orders (state-by-state intersect with FLA)",
            "Child Support Agency assessments + departure applications",
            "Spousal maintenance + de facto maintenance",
            "Hague Convention abductions",
          ],
          matters: [
            "Consent orders",
            "Property division",
            "Parenting plans",
            "BFAs",
            "Relocation",
            "International parenting",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "Children Act 1989 — child arrangements orders, prohibited steps, specific issue",
            "Matrimonial Causes Act 1973 — divorce, financial remedies",
            "Family Law Act 1996 — non-molestation + occupation orders",
            "Civil Partnership Act 2004 + same-sex marriage equivalents",
            "Child Maintenance Service (CMS) regime",
            "Hague Convention on International Child Abduction",
          ],
          covers: [
            "Child arrangements orders + parental responsibility",
            "Divorce + financial remedies (lump sum, pension sharing, periodical payments)",
            "Pre-nuptial + post-nuptial agreements (Radmacher v Granatino)",
            "Non-molestation + occupation orders",
            "CMS calculations + variation applications",
            "Schedule 1 Children Act applications (unmarried parent finance)",
            "Hague Convention abductions",
          ],
          matters: [
            "Divorce",
            "Child arrangements",
            "Pre-nups",
            "Occupation orders",
            "Financial remedies",
            "Schedule 1",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "State family codes (each state has its own — California, Texas, NY etc.)",
            "Uniform Child Custody Jurisdiction and Enforcement Act (UCCJEA)",
            "Uniform Interstate Family Support Act (UIFSA)",
            "Indian Child Welfare Act 1978 (where applicable)",
            "Hague Convention on International Child Abduction",
            "VAWA (Violence Against Women Act) immigration relief",
          ],
          covers: [
            "Custody (legal + physical) + visitation",
            "Equitable distribution + community property states (CA, TX, AZ, NV, NM, ID, WI, LA, WA)",
            "Pre-marital + post-marital agreements (UPAA jurisdictions)",
            "Restraining orders + civil protection orders",
            "Child support guideline calculations + deviation",
            "Spousal support / alimony (rehabilitative, durational, permanent)",
            "Hague Convention abductions + UCCJEA inter-state enforcement",
          ],
          matters: [
            "Custody",
            "Equitable distribution",
            "Pre-nups",
            "Restraining orders",
            "Alimony",
            "Inter-state enforcement",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Application drafting",
          body:
            "Court application drafts populated from the matter intake — without-notice protection (NZ), interim parenting (AU), Form C100 (UK), petition + summons (US). Statutory references on every page. Lawyer signs before filing.",
        },
        {
          title: "Property + financial modelling",
          body:
            "Relationship property (NZ), four-step + future needs (AU), financial remedies (UK), equitable distribution (US). Marco models the split with full documentation and asks for the missing data points the lawyer needs.",
        },
        {
          title: "Child support recalculation",
          body:
            "NZ formula assessments, AU CSA assessments, UK CMS calculations, US guideline + deviation. Run scenarios with shared care percentages, income changes, additional children.",
        },
        {
          title: "BFAs / pre-nups / Section 21s",
          body:
            "Drafted from a structured intake, every clause keyed to the test the relevant Court applies (Stanford-style enforceability AU, Radmacher-style fairness UK, unconscionability NZ).",
        },
        {
          title: "Protection + family-violence orders",
          body:
            "Without-notice and on-notice templates, supporting affidavit prompts, evidence chain-of-custody for digital messages, ouster + custody add-ons.",
        },
        {
          title: "Conflict + AML on intake",
          body:
            "Family files routinely have one party who has consulted the firm before. Marco runs the conflict ledger + AML at intake automatically, flags before instructions accepted.",
        },
      ]}
      cta={{
        heading: "Run a family practice without losing the human in it.",
        body: "The drafts, the deadlines, the modelling — automated. The conversations with the family — yours. Marco Reid handles the file so you can handle the people.",
        primaryHref: "/for-attorneys",
      }}
    />
  );
}
