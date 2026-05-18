import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Intellectual property — patents, trademarks, copyright, trade secrets",
  description:
    "IP module across NZ, AU, UK, and US. IPONZ, IP Australia, USPTO, UKIPO. Patent prosecution, trademark filing, copyright registration, trade-secret protocols, licensing — sign-off on every output.",
};

export default function IntellectualPropertySpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Intellectual property"
      title="Protect what your client invented, made, named, or wrote."
      intro="Patents, trademarks, copyright, and trade secrets are the assets that fund modern businesses. Marco Reid drafts the application, tracks the response deadlines, and the IP attorney signs every filing &mdash; across IPONZ, IP Australia, USPTO, and UKIPO."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "Patents Act 2013 + Patents Regulations 2014 — IPONZ prosecution",
            "Trade Marks Act 2002 — IPONZ register, opposition + revocation",
            "Copyright Act 1994 — automatic protection, no register",
            "Designs Act 1953 — registered designs",
            "Geographical Indications (Wine and Spirits) Registration Act 2006",
            "Plant Variety Rights Act 1987",
          ],
          covers: [
            "Patent prosecution at IPONZ — examination, divisionals, oppositions",
            "Trade mark filings + opposition proceedings",
            "Copyright assignments + licensing",
            "Registered design applications",
            "PCT national-phase entry",
            "Madrid Protocol designations from NZ",
            "Confidential information + trade secret advice",
          ],
          matters: [
            "Patent filings",
            "TM oppositions",
            "Licensing",
            "PCT entry",
            "Madrid",
            "Trade secrets",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "Patents Act 1990 + Patents Regulations 1991 — IP Australia",
            "Trade Marks Act 1995 — opposition, removal, revocation",
            "Copyright Act 1968 — automatic + voluntary registration",
            "Designs Act 2003 — newness + distinctiveness threshold",
            "Plant Breeder's Rights Act 1994",
            "Federal Court of Australia IP list",
          ],
          covers: [
            "Standard + innovation patent prosecution at IP Australia",
            "Trade marks + opposition / revocation / non-use",
            "Copyright assignments + collective licensing (APRA AMCOS, PPCA)",
            "Designs registration + certification",
            "PCT national-phase entry",
            "Madrid Protocol designations from AU",
            "Federal Court IP enforcement + interlocutory injunctions",
          ],
          matters: [
            "Patent filings",
            "Innovation patents",
            "TM removal",
            "Designs",
            "PCT",
            "Federal Court IP",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "Patents Act 1977 + UKIPO prosecution",
            "Trade Marks Act 1994 — UKIPO register",
            "Copyright, Designs and Patents Act 1988",
            "Registered Designs Act 1949 + Community Design Regulation post-Brexit",
            "Intellectual Property Enterprise Court (IPEC)",
            "European Patent Convention (UK still party post-Brexit)",
          ],
          covers: [
            "UKIPO patent prosecution + EPO filings via UK chartered patent attorneys",
            "UKIPO trade marks + EU IPO post-Brexit comparable rights",
            "Copyright licensing + CPRR collective rights",
            "UK + Re-Registered Designs",
            "Unitary Patent + Unified Patent Court (where applicable)",
            "IPEC small-claims track + multi-track",
            "Confidentiality + trade secret protocols",
          ],
          matters: [
            "UKIPO",
            "EPO",
            "EU IPO",
            "IPEC",
            "UPC",
            "Designs",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "35 U.S.C. — patents (USPTO prosecution)",
            "15 U.S.C. — trademarks (Lanham Act + USPTO)",
            "17 U.S.C. — copyright (Copyright Office registration)",
            "Defend Trade Secrets Act 2016 (federal)",
            "America Invents Act 2011 — first-to-file, IPR, PGR",
            "PTAB — Inter Partes Review, Post Grant Review",
          ],
          covers: [
            "USPTO patent prosecution — utility, design, plant patents",
            "USPTO trade marks — Section 1(a), 1(b), 44(d), 44(e), 66(a)",
            "Copyright Office registrations + recordation",
            "DTSA + state UTSA trade secret protocols + injunctions",
            "PTAB IPR + PGR + Derivation proceedings",
            "DMCA Designated Agent registration ($6 with US Copyright Office)",
            "ITC § 337 investigations + Federal Circuit appeals",
          ],
          matters: [
            "USPTO patents",
            "USPTO TMs",
            "PTAB",
            "DMCA",
            "DTSA",
            "ITC",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Patent specification drafting",
          body:
            "Independent + dependent claims drafted from the inventor's disclosure. Prior-art search prompts. Specification + abstract + drawings prep. Patent attorney signs before filing.",
        },
        {
          title: "Trade mark search + clearance",
          body:
            "Multi-jurisdictional search across IPONZ, IP Australia, USPTO, UKIPO + EU IPO + Madrid Monitor. Identical + similar marks, classes, refusal grounds. Clearance opinion drafted, signed.",
        },
        {
          title: "Office action response drafting",
          body:
            "USPTO Section 2(d) refusals, IPONZ s 17 distinctiveness objections, examiner's reports. Marco drafts the response, cites the right test, surfaces the precedents. Partner signs.",
        },
        {
          title: "Licensing + assignment agreements",
          body:
            "Exclusive vs sole vs non-exclusive licences, royalty mechanics, sublicensing, audit rights, termination. Tax-treatment notes per jurisdiction (NZ withholding, US s 1235).",
        },
        {
          title: "Trade secret protocols",
          body:
            "Confidential-information procedures, employee + contractor IP assignments, NDA suite, access controls, departure interview templates. DTSA-compliant for US.",
        },
        {
          title: "DMCA Designated Agent + safe harbour",
          body:
            "Marco Reid files the Designated Agent registration ($6, US Copyright Office). Counter-notice procedure, repeat-infringer policy, takedown logging. Built into Marco Reid Launch flow.",
        },
      ]}
      cta={{
        heading: "Files preserved. Deadlines tracked. Filings signed.",
        body: "IP work is unforgiving on deadlines and unforgiving on documentation. Marco Reid is unforgiving on both, in a good way.",
        primaryHref: "/for-attorneys",
      }}
    />
  );
}
