import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Commercial / Corporate / M&A — drafting, deals, governance",
  description:
    "Commercial + corporate + M&A across NZ, AU, UK, and US. Companies Act 1993, Corporations Act 2001, Companies Act 2006, DGCL. Shareholder agreements, M&A drafting, due diligence, board governance — all with sign-off.",
};

export default function CommercialCorporateSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Commercial · Corporate · M&A"
      title="Deals, governance, and the documents in between."
      intro="From the first shareholder agreement to the eventual sale, every commercial document drafted, every step of due diligence run, every board paper logged &mdash; with the firm partner signing every output before it leaves the platform."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "Companies Act 1993 — directors' duties, solvency, schemes",
            "Financial Markets Conduct Act 2013 — disclosure, takeovers, AML",
            "Takeovers Code (NZX-listed companies)",
            "Commerce Act 1986 — merger clearance, restrictive trade practices",
            "Overseas Investment Act 2005 — sensitive land, forestry",
            "FMA + Commerce Commission regulator engagement",
          ],
          covers: [
            "Shareholders agreements with NZ-style drag-along + tag-along",
            "Company incorporations + amalgamations",
            "Sale + purchase of business / shares / assets",
            "Section 129 board approvals + solvency tests",
            "OIO consents for sensitive land / forestry / business",
            "Takeovers Code Part B / C compliance",
            "Commerce Commission merger clearances + authorisations",
          ],
          matters: [
            "SHAs",
            "M&A",
            "OIO consents",
            "Takeovers",
            "Schemes",
            "Solvency",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "Corporations Act 2001 (Cth) — directors' duties, schemes, takeovers",
            "ASIC Regulatory Guides (RG 60, RG 71, RG 169 etc.)",
            "Australian Consumer Law (ACL) within Competition and Consumer Act 2010",
            "FIRB regime (Foreign Acquisitions and Takeovers Act 1975)",
            "ASX Listing Rules + FATA national interest tests",
            "Personal Property Securities Act 2009",
          ],
          covers: [
            "Shareholders agreements + Constitutions",
            "Schemes of arrangement (s 411) + takeovers (s 644)",
            "Sale of business / shares / units (with stamp duty considerations)",
            "Directors' duties advice (CCV proceedings, s 588G insolvent trading)",
            "FIRB applications + national security test",
            "PPSR registrations + perfection",
            "ACCC merger clearances + authorisations",
          ],
          matters: [
            "Takeovers",
            "Schemes",
            "M&A",
            "FIRB",
            "PPSR",
            "Director duties",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "Companies Act 2006 — directors' duties, statements, schemes",
            "Takeover Code + Panel on Takeovers and Mergers",
            "FCA Listing Rules + Disclosure Guidance and Transparency Rules",
            "Enterprise Act 2002 — CMA merger control",
            "National Security and Investment Act 2021 — foreign-investor screening",
            "UK GDPR + DPA 2018 in deals",
          ],
          covers: [
            "Articles of Association + Shareholders Agreements",
            "Section 110 IA 1986 schemes + Part 26 / 26A schemes",
            "Public + private M&A — SPA, lock-out, locked-box vs completion accounts",
            "Directors' duties (s 171–177) + wrongful trading (s 214)",
            "NSI Act notifications + 17 sensitive sectors",
            "CMA merger clearance + Phase 1 / 2 reviews",
            "FCA-listed transactions + Class 1 announcements",
          ],
          matters: [
            "Schemes",
            "M&A",
            "NSI",
            "Listings",
            "Director duties",
            "CMA",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "Delaware General Corporation Law (DGCL) — most C-Corps",
            "Model Business Corporation Act (MBCA) — many states",
            "Securities Act 1933 + Securities Exchange Act 1934 — registration + reporting",
            "Hart-Scott-Rodino Antitrust Improvements Act — merger filings",
            "CFIUS regime — foreign-investor national security review",
            "State blue-sky laws — securities registration",
          ],
          covers: [
            "Stockholders agreements (DE-default vs MBCA states)",
            "Mergers + acquisitions — reverse triangular, asset, stock",
            "Founder paperwork (Marco Reid Launch ties in here)",
            "Fiduciary duty advice (Revlon / Unocal / Aronson tests)",
            "HSR filings + waiting period analysis",
            "CFIUS notifications (mandatory + voluntary triggers)",
            "Reg D + Rule 144A private placements + S-1 IPO support",
          ],
          matters: [
            "M&A",
            "HSR",
            "CFIUS",
            "Reg D",
            "Founder docs",
            "Schedule 14D-9",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Shareholders + stockholders agreements",
          body:
            "Drafted from a structured intake — capitalisation, vesting, drag-along, tag-along, ROFR, deadlock — keyed to the right jurisdiction's defaults. Variant clauses surfaced for the partner's choice; signed before issue.",
        },
        {
          title: "Sale + purchase agreements",
          body:
            "Asset, share, and unit-trust deals. Locked-box vs completion accounts, earn-outs, escrow, warranties + indemnities. Modelled disclosure schedule. Marco surfaces the deal points the partner needs to think about, doesn't pretend to make the call.",
        },
        {
          title: "Due diligence runner",
          body:
            "DD checklist generated from the deal type + sector. Documents requested, received, indexed, redacted. Findings drafted into the DD report. Partner signs the final report.",
        },
        {
          title: "Board pack + minute book",
          body:
            "Resolutions, written consents, meeting minutes, share registers — generated from the underlying corporate record. Annual returns + ASIC + Companies House + Companies Office filings produced from the same data.",
        },
        {
          title: "Foreign investment + merger control",
          body:
            "OIO (NZ), FIRB (AU), NSI (UK), CFIUS + HSR (US). Marco runs the threshold analysis, drafts the notification, tracks the clock. Partner reviews + signs.",
        },
        {
          title: "Founder documents (cross-border)",
          body:
            "When a NZ founder incorporates a Delaware C-Corp (Marco Reid Launch), the founder pack — bylaws, board consents, 83(b) elections, IP assignments — flows from the same engagement, signed by US co-counsel through the marketplace.",
        },
      ]}
      cta={{
        heading: "Deals on rails. Governance on autopilot.",
        body: "From the first SHA to the day-after-completion minute book, every commercial document lives on the platform with the audit trail your insurer + your regulator + your client expect.",
        primaryHref: "/for-attorneys",
      }}
    />
  );
}
