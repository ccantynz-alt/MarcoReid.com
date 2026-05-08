import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "SMSF — self-managed super fund accountancy + audit",
  description:
    "Self-managed super fund (SMSF) module for the AU market. ~600,000 SMSFs. SISA + SISR compliance, ATO lodgement, contribution caps, audit, pensions, in-specie transfers — sign-off on every return.",
};

export default function SmsfSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / SMSF (AU)"
      title="The Australian-specific market that nobody outside Australia takes seriously."
      intro="Australia has roughly 600,000 self-managed super funds. They&rsquo;re heavily regulated, time-consuming to administer, and a recurring revenue stream most accountants don&rsquo;t scale because the tooling is awful. Marco Reid runs SMSFs end-to-end &mdash; from establishment to wind-up &mdash; with the registered SMSF auditor signing every return."
      jurisdictions={[
        {
          code: "AU",
          label: "Australia (only)",
          authorities: [
            "Superannuation Industry (Supervision) Act 1993 (SISA)",
            "Superannuation Industry (Supervision) Regulations 1994 (SISR)",
            "Income Tax Assessment Act 1997 — Division 295 + concessional / non-concessional contribution caps",
            "ATO SMSF supervision — registration, lodgement, audits",
            "Sole Purpose Test (SISA s 62)",
            "ATO regulations on related-party transactions, in-house assets, LRBAs",
            "Auditor independence requirements (APES 110 + APES GN 41)",
          ],
          covers: [
            "SMSF establishment — trust deed, member registers, trustee declarations",
            "Annual returns (NAT 71226) including audit + supervisory levy",
            "Contribution cap monitoring (concessional, non-concessional, bring-forward, transfer balance)",
            "In-specie contributions + transfers + market valuations",
            "Pension commencement (account-based, transition-to-retirement)",
            "Limited Recourse Borrowing Arrangements (LRBA) compliance",
            "Related-party transactions + in-house asset 5% rule",
            "SMSF audit by registered SMSF auditor (APES 320 quality control)",
            "Wind-up + member rollovers",
          ],
          matters: [
            "Establishment",
            "Annual lodgement",
            "Audit",
            "Pension start",
            "LRBA",
            "Wind-up",
            "Excess contributions",
            "TBAR reporting",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Establishment automation",
          body:
            "Trust deed generation, ABN + TFN registration with the ATO, electing to be a regulated fund, trustee identification, signed engagement letter — all in one workflow. Sign-off by the registered tax agent before lodgement.",
        },
        {
          title: "Annual return + audit on rails",
          body:
            "NAT 71226 drafted from the bookkeeping data, member balances reconciled, contributions classified, capital gains computed. Then the registered SMSF auditor signs off through SignoffRequest before lodgement to the ATO.",
        },
        {
          title: "Contribution cap monitoring",
          body:
            "Marco tracks every contribution against concessional + non-concessional caps including bring-forward + work test + downsizer. Flags excess contributions before lodgement so the partner can advise reshape.",
        },
        {
          title: "Pension commencement + TBAR",
          body:
            "Account-based pension docs, minimum pension calculations, Transfer Balance Account Reporting — drafted, lodged, audited.",
        },
        {
          title: "LRBA compliance",
          body:
            "Limited Recourse Borrowing Arrangement structures modelled, related-party loan terms benchmarked against safe-harbour rates, single acquirable asset rule enforced. Marco surfaces breaches before they happen.",
        },
        {
          title: "Forensic intelligence on SMSF data",
          body:
            "Benford's Law on transactions, related-party transaction screening, in-house asset 5% threshold monitoring — all the auditor's pain points automated. The forensic moat from /specialties/forensic-accounting reused here.",
        },
      ]}
      cta={{
        heading: "Run 50 SMSFs in the time most firms run 5.",
        body: "The tooling that scales SMSF practices. Establishment to wind-up, every step on rails, audit-ready, ATO-compliant, signed.",
        primaryHref: "/for-accountants",
      }}
    />
  );
}
