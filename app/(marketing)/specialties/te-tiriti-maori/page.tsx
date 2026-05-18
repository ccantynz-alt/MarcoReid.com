import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Te Tiriti o Waitangi + Māori legal services",
  description:
    "Te Tiriti o Waitangi work, Te Ture Whenua Māori 1993, Waitangi Tribunal claims, iwi commercial work, post-settlement governance. The Māori legal practice every NZ-credible platform must take seriously. Sign-off on every output.",
};

export default function TeTiritiMaoriSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Te Tiriti · Māori legal"
      title="Te Tiriti work that takes Māori legal practice seriously."
      intro="Te Tiriti o Waitangi, Te Ture Whenua Māori 1993, the Waitangi Tribunal, iwi commercial work, post-settlement governance, taonga and tikanga &mdash; the legal practice every NZ-credible platform must support, and the one most legal-tech vendors quietly skip. Marco Reid builds it in. Drafts referenced to Te Tiriti, signed off by lawyers who actually practise this work."
      jurisdictions={[
        {
          code: "NZ",
          label: "Aotearoa New Zealand",
          authorities: [
            "Te Tiriti o Waitangi 1840 (both texts) + Treaty of Waitangi 1840 (English)",
            "Treaty of Waitangi Act 1975 — establishes the Waitangi Tribunal",
            "Te Ture Whenua Māori Act 1993 — Māori land Acts + Māori Land Court",
            "Te Pire Whakatupua mō Te Kāhui Tupua / Te Urewera Act 2014 (legal personhood)",
            "Marine and Coastal Area (Takutai Moana) Act 2011",
            "Ngāi Tahu Claims Settlement Act 1998 + 60+ other settlement Acts",
            "Conservation Act 1987 s 4 (Te Tiriti principles obligation)",
            "Resource Management Act 1991 + Fast-track Approvals Act 2024 (Treaty principles)",
            "Sentencing Act 2002 s 27 + Oranga Tamariki Act 1989 (cultural reports)",
          ],
          covers: [
            "Waitangi Tribunal claims — historical (Wai 11 + Wai 1040 + others) and contemporary",
            "Treaty settlement negotiations + Crown engagement strategy",
            "Post-settlement governance entity (PSGE) drafting + iwi corporate structure",
            "Te Ture Whenua Māori — partition, succession, occupation, lease, vesting, kaitiaki",
            "Māori Land Court applications + Māori Appellate Court appeals",
            "Iwi commercial — fisheries, forestry, geothermal, aquaculture, tourism JVs",
            "Resource Management — section 6(e) + s 7(a) Treaty consideration submissions",
            "Cultural reports under Sentencing Act 2002 s 27 (formerly s 27 Sentencing Act)",
            "Whānau Ora + iwi-led service contracts with the Crown",
            "Te reo Māori naming conventions, mana whenua attestations, mātauranga Māori IP",
            "Hapū identity recognition + recognised iwi register applications",
          ],
          matters: [
            "WAI claim",
            "Settlement deed",
            "PSGE constitution",
            "Whenua succession",
            "Partition",
            "RMA Treaty submission",
            "S 27 cultural report",
            "Iwi JV",
            "Mātauranga IP",
            "Foreshore & seabed",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Tikanga-aware drafting",
          body:
            "Drafts open with mihi where appropriate. Karakia, whakapapa, and pepeha placeholders surface as variables. Te reo Māori naming used correctly (macrons, hapū before iwi where applicable). Reviewer must be admitted in NZ + ideally have Māori legal practice experience.",
        },
        {
          title: "Te Tiriti principles applied",
          body:
            "Where the matter intersects with the Crown (RMA, Conservation Act, fisheries, freshwater, settlement claims), Marco surfaces the Treaty principles (partnership, active protection, redress, equity, options) and asks the practitioner to confirm which apply.",
        },
        {
          title: "Te Ture Whenua applications",
          body:
            "Drafts for Māori Land Court applications — partition orders, succession orders, occupation orders, vesting orders, recognised kaitiaki — with the right form, the right schedule, the right s 38–s 40 considerations.",
        },
        {
          title: "Settlement-deed workflow",
          body:
            "Crown / iwi negotiation drafts: agreed historical account, Crown apology, redress instruments, cultural redress, financial redress, governance entity establishment. Long-form documents handled at scale through DocumentVersion + SignoffRequest.",
        },
        {
          title: "Cultural report (s 27) drafting",
          body:
            "Sentencing Act s 27 reports drafted from a structured intake (whakapapa, upbringing, systemic factors, tikanga response). Reviewer must be NZ-admitted + experienced in cultural reporting.",
        },
        {
          title: "Iwi commercial governance",
          body:
            "PSGE constitutions, mandated iwi authority delegations, marae and rūnanga charters. Fishing quota allocations under the Māori Fisheries Act 2004. Treaty-settled commercial portfolios.",
        },
      ]}
      cta={{
        heading: "Te Tiriti work, on a tikanga-respecting platform.",
        body: "Marco Reid builds Māori legal practice in as core, not as 'multicultural compliance'. Reviewers credentialled in NZ + experienced in Māori legal work. Tikanga, te reo, and Te Tiriti principles encoded into the draft layer; the practitioner of record signs every output.",
        primaryHref: "/for-attorneys",
      }}
    />
  );
}
