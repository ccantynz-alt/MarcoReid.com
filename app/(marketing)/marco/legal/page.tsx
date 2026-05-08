import type { Metadata } from "next";
import MarcoCentrePage from "@/app/components/marketing/MarcoCentrePage";
import { sourcesForDomain } from "@/lib/marco/sources";

export const metadata: Metadata = {
  title: "Marco Legal — research with verified citations across NZ/AU/UK/US",
  description:
    "Marco's legal research centre. Citation verification across NZLII, AustLII, BAILII, CourtListener, Cornell LII, and the official statutes for NZ, AU, UK, and US. Verified / Unverified / Not Found — every reference labelled.",
};

export default function MarcoLegalPage() {
  return (
    <MarcoCentrePage
      domain="LEGAL"
      eyebrow="Marco / Legal research"
      title="Legal research with verified citations."
      intro="Ask Marco any legal question. Marco drafts the answer and verifies every citation against the authoritative source. Verified, Unverified, or Not Found — every reference labelled. The professional reviewing the answer accepts the verified citations and discards the rest."
      sources={sourcesForDomain("LEGAL")}
      defaultJurisdiction="NZ"
      exampleQueries={[
        "What's the standard of review on a judicial review of a Tenancy Tribunal decision?",
        "Does the Companies Act 1993 prevent a director from voting on a resolution where they have a personal interest?",
        "When does ACAS Early Conciliation pause the ET claim limitation clock?",
        "Under the FRCP, can a defendant remove a state-court action filed against an insurance carrier and the insured to federal court if there is no diversity between insured and insurer?",
      ]}
      verificationRules={[
        "Every citation surfaced in Marco's answer must match a source in this catalogue. No match = NOT_FOUND label = cannot appear in the answer body, only in the citation panel.",
        "VERIFIED status means Marco resolved the citation to a specific URL or document ID in an indexed source. The reviewing professional can click through to the underlying source from the citation panel.",
        "UNVERIFIED status means Marco produced the reference but could not match it programmatically. The professional must verify it manually before relying on it. UNVERIFIED references cannot be inserted into a signed document.",
        "Public domain only — no Westlaw, no LexisNexis, no LexisAdvance. Every source in the catalogue is freely accessible to the public so the professional reviewing the answer can verify without a paywall.",
        "Cross-jurisdictional queries (e.g. NZ vs AU comparative) draw from the catalogue subset matching both jurisdictions. The answer always discloses which sources it consulted.",
        "No Marco output is legal advice. The Sign-off Doctrine remains: every consumer-facing output passes through SignoffRequest and is approved by a credentialled professional in the relevant jurisdiction before release.",
      ]}
    />
  );
}
