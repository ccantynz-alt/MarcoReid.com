import type { Metadata } from "next";
import MarcoCentrePage from "@/app/components/marketing/MarcoCentrePage";
import { sourcesForDomain } from "@/lib/marco/sources";

export const metadata: Metadata = {
  title: "Marco Forensic — fraud detection + forensic accounting research",
  description:
    "Marco's forensic research centre. Benford's Law, ghost vendor detection, ISA 240 fraud standards, ACFE Fraud Tree, ARITA Code, ASIC RG 16 + 217. Citation verification on every methodology reference.",
};

export default function MarcoForensicPage() {
  return (
    <MarcoCentrePage
      domain="FORENSIC"
      eyebrow="Marco / Forensic research"
      title="Forensic accounting + fraud-detection research."
      intro="Forensic work is unforgiving on methodology. Marco surfaces the standard, the test, and the precedent &mdash; against IAASB, AICPA, ACFE, ARITA, and ASIC sources &mdash; with every reference labelled. The forensic specialist signs the report; Marco does the source work."
      sources={sourcesForDomain("FORENSIC")}
      defaultJurisdiction="AU"
      exampleQueries={[
        "How does Benford's Law apply to a dataset of expense reimbursements where the reimbursement cap is $500?",
        "Under ISA 240, what specific procedures should an auditor perform when fraud risk is identified on revenue recognition?",
        "What is the ACFE Fraud Tree categorisation for billing schemes vs payroll schemes vs cash larceny?",
        "Under ARITA Code paragraphs 8.1–8.10, what conflict checks does an external administrator have to run before accepting an appointment?",
      ]}
      verificationRules={[
        "Forensic methodology references resolve to IAASB ISA standards, AICPA Statements on Standards for Forensic Services, ACFE Fraud Examiners Manual, ARITA Code of Professional Practice, and ASIC Regulatory Guides.",
        "Statistical fraud-detection methods (Benford's Law, regression on cycle counts, journal-entry skew analysis) cite the peer-reviewed primary literature where available.",
        "Insolvency-investigation references resolve to NZ Companies Act 1993, AU Corporations Act 2001 (Pt 5.4 + 5.4B), and UK Insolvency Act 1986 directly.",
        "Marco never provides expert testimony. The credentialled forensic specialist (CFE, ACA-qualified forensic accountant, CPA-FCPA, registered liquidator) signs the report through SignoffRequest.",
        "Forensic outputs are particularly sensitive to chain-of-custody. Marco's audit trail records every input source, every methodology applied, and every reference relied on — exportable as a signed bundle for the court.",
      ]}
    />
  );
}
