import type { Metadata } from "next";
import MarcoCentrePage from "@/app/components/marketing/MarcoCentrePage";
import { sourcesForDomain } from "@/lib/marco/sources";

export const metadata: Metadata = {
  title: "Marco Accounting — tax + accounting research across NZ/AU/UK/US/CA",
  description:
    "Marco's accounting research centre. Citation verification across IR (NZ), ATO (AU), HMRC (UK), IRS (US), CRA (CA). Public Rulings, TR/TD/GSTR, Revenue Rulings, Practice Statements — every reference labelled.",
};

export default function MarcoAccountingPage() {
  return (
    <MarcoCentrePage
      domain="ACCOUNTING"
      eyebrow="Marco / Accounting research"
      title="Tax + accounting research, citation by citation."
      intro="Tax positions live or die on the citation. Marco drafts the answer and verifies every reference to IR, ATO, HMRC, IRS, or CRA against the authoritative source. The accountant reviewing the position decides which references to use; the un-verified ones never make it into the working paper."
      sources={sourcesForDomain("ACCOUNTING")}
      defaultJurisdiction="NZ"
      exampleQueries={[
        "Is the sale of a personal residence held as a rental for two years deductible from the bright-line test under s CB 6A?",
        "Does an Australian SMSF acquiring a related-party residential property breach SISA s 66?",
        "Is the UK research and development expenditure credit (RDEC) available to an SME that has received a notified state aid?",
        "What is the IRS Notice 2014-21 position on the tax character of cryptocurrency mining receipts?",
      ]}
      verificationRules={[
        "Every citation must resolve to an authoritative source in the catalogue. IRD Public Rulings (BR Pub series), ATO Public Rulings (TR / TD / GSTR / PR / CR), IRS Revenue Rulings + Procedures, HMRC Manuals + Statements of Practice, CRA Folios + Interpretation Bulletins.",
        "Statute references resolve to legislation.govt.nz, Federal Register of Legislation (AU), legislation.gov.uk, US Code via Cornell LII, and Justice Laws Website (CA).",
        "Cross-border tax-treaty work draws from the OECD Model + the bilateral DTAs in force. Treaty positions are flagged where domestic law gives a less favourable outcome.",
        "Tax Practitioner Board (AU), Inland Revenue tax-agent listing (NZ), and IRS Enrolled Agent regimes are reflected in the scope of what Marco answers — out-of-scope queries flag a recommendation to escalate to a credentialled adviser.",
        "Marco does not provide tax advice. Every consumer-facing output passes through SignoffRequest and is signed by a Chartered Accountant, CPA, registered Tax Agent, or BAS Agent in the relevant jurisdiction.",
      ]}
    />
  );
}
