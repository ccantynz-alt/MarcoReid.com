import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Litigation — civil disputes, court applications, evidence",
  description:
    "Litigation module across NZ, AU, UK, and US. District through to appellate. Court-rules engine, deadline calculator, evidence chain-of-custody, sign-off on every output.",
};

export default function LitigationSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Litigation"
      title="Civil disputes from intake to judgment, on rails."
      intro="Litigation runs on procedure. Marco Reid encodes the procedure &mdash; deadlines, service rules, pleadings, evidence, examinations &mdash; into a workflow the partner can trust. Drafts watermarked until signed; deadlines computed from the rules that authorise them."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "District Court Rules 2014",
            "High Court Rules 2016",
            "Court of Appeal (Civil) Rules 2005",
            "Senior Courts Act 2016",
            "Evidence Act 2006",
            "Limitation Act 2010",
          ],
          covers: [
            "Pleadings — statement of claim, statement of defence, reply",
            "Interlocutory applications (summary judgment, security for costs, strike-out)",
            "Discovery — standard, tailored, and electronic",
            "Briefs of evidence + cross-examination prep",
            "Appeals to the Court of Appeal + Supreme Court",
            "Costs orders + scale costs computation",
          ],
          matters: [
            "Civil claim",
            "Summary judgment",
            "Discovery",
            "Trial",
            "Appeal",
            "Costs",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "Federal Court Rules 2011",
            "State Supreme Court Rules (UCPR NSW, SCR Vic, etc.)",
            "Civil Procedure Acts (state-by-state)",
            "Evidence Act 1995 (Cth + harmonised states)",
            "Limitation of Actions Acts (state-by-state)",
          ],
          covers: [
            "Originating processes + defences (Federal Court + state courts)",
            "Mediation orders (s 53A FCA Act)",
            "Discovery + categorical orders",
            "Outline of submissions, expert evidence (FCA EM)",
            "Appeals to the Full Court + High Court special leave",
            "Class actions + representative proceedings",
          ],
          matters: [
            "Originating",
            "Defences",
            "Discovery",
            "Class actions",
            "Appeals",
            "High Court SLA",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "Civil Procedure Rules 1998 (CPR)",
            "Senior Courts Act 1981",
            "Limitation Act 1980",
            "Evidence Act 1995 + Civil Evidence Act 1995",
            "Contempt of Court Act 1981",
          ],
          covers: [
            "Particulars of claim + acknowledgement of service + defence (CPR)",
            "Disclosure (PD 31, Disclosure Pilot Scheme)",
            "Witness statements + Practice Direction 22 statements of truth",
            "Summary judgment (CPR 24) + strike-out (CPR 3.4)",
            "Appeals to Court of Appeal + Supreme Court",
            "Costs budgeting (Precedent H) + costs management",
          ],
          matters: [
            "POC",
            "AoS",
            "Defence",
            "Disclosure",
            "Costs budget",
            "Appeal",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "Federal Rules of Civil Procedure (FRCP)",
            "Federal Rules of Evidence (FRE)",
            "28 U.S.C. — judicial code",
            "State rules of civil procedure",
            "State statutes of limitation",
            "Federal Rules of Appellate Procedure (FRAP)",
          ],
          covers: [
            "Complaint + answer + Rule 12 motions",
            "Discovery — interrogatories, requests for admission, depositions, document production",
            "Summary judgment motions (Rule 56)",
            "Daubert motions + expert disclosures",
            "Appeals to Circuit Courts of Appeal + Supreme Court certiorari",
            "Class certification (Rule 23)",
          ],
          matters: [
            "Complaint",
            "Rule 12",
            "Discovery",
            "Daubert",
            "Rule 23",
            "Appeals",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Court-rules deadline calculator",
          body:
            "Pick the trigger event, set the date, get every downstream deadline cited to the rule. Live at /tools/court-rules. NZ District + High Court, AU Federal Court + state courts, UK CPR, US FRCP + FRAP.",
        },
        {
          title: "Pleadings drafting",
          body:
            "Statement of claim / particulars of claim / complaint drafted from a structured intake. Pleads facts, particulars, causes of action, relief. Partner reviews, signs through SignoffRequest before filing.",
        },
        {
          title: "Discovery + disclosure runner",
          body:
            "Discovery list / disclosure index / Rule 26(a) initial disclosures generated. Privilege log drafted automatically. Documents indexed, redacted, and bates-numbered.",
        },
        {
          title: "Witness brief preparation",
          body:
            "Briefs of evidence (NZ), witness statements (UK), witness outlines (AU), affidavits (US). Templated, populated, cross-referenced to the documents in evidence.",
        },
        {
          title: "Costs budgeting + scale costs",
          body:
            "NZ scale costs computed from the High Court Rules schedule, UK Precedent H budgets, US fee applications under Hensley v Eckerhart. Itemised, defensible, exportable.",
        },
        {
          title: "Audit trail for the regulator",
          body:
            "Every pleading version stored in DocumentVersion with content hash. Every action in AuditLog. Every regulator filing in RegulatorFiling. The PII insurer audit + bar audit + insurance claim takes minutes.",
        },
      ]}
      cta={{
        heading: "Procedure is the litigator's enemy. We make it the friend.",
        body: "Deadlines tracked. Pleadings drafted. Discovery automated. Briefs prepared. The partner makes the strategic calls; Marco Reid handles the procedural plumbing that loses cases when it slips.",
        primaryHref: "/tools/court-rules",
      }}
    />
  );
}
