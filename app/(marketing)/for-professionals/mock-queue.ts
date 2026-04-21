// Mock queue for the public pro-side demo at /for-professionals.
//
// This is a static marketing preview, NOT wired to Prisma or any AI call.
// Shape deliberately mirrors the real pro dashboard card so a verified pro
// landing here from a LinkedIn drop self-projects into the real tool.
//
// Fee split: the platform takes 20% of the pro's lead fee; the pro keeps
// 80%. There is no existing shared constant for this split — the real
// marketplace quotes a 10% platform share on the work-in-matter fee, but
// for this marketing demo we surface a round, plausible "here's what lands
// in your account" number the pro can anchor on.

export type MockMatter = {
  id: string;
  practiceArea: string;
  jurisdiction: string;
  flag: string;
  summary: string;
  detailsFromCitizen: string;
  leadFeeGrossCents: number;
  leadFeeNetToProCents: number;
  platformFeeCents: number;
  currency: string;
  reviewMinutes: number;
  postedLabel: string;
  draftTitle: string;
  draftBody: string;
  citations: string[];
};

// Pro keeps 80%, platform takes 20% — for demo purposes.
const PLATFORM_CUT = 0.2;

function netFromGross(grossCents: number) {
  const platform = Math.round(grossCents * PLATFORM_CUT);
  return {
    platformFeeCents: platform,
    leadFeeNetToProCents: grossCents - platform,
  };
}

export const MOCK_QUEUE: MockMatter[] = [
  (() => {
    const gross = 135_000; // NZD $1,350 gross lead fee
    const split = netFromGross(gross);
    return {
      id: "demo-tenancy-nz",
      practiceArea: "Tenancy",
      jurisdiction: "NZ",
      flag: "🇳🇿",
      summary:
        "Landlord withholding $2,800 bond after 3-year tenancy — no inspection report, alleged carpet damage.",
      detailsFromCitizen:
        "We moved out on 28 March after three years at the property in Mount Albert. Bond was $2,800. The landlord is now refusing to release any of it, says the carpets are damaged, but we never got a property inspection report and the carpets were already stained when we moved in. No photos were taken at ingoing. We have the tenancy agreement and bank statements showing bond payment to Tenancy Services. What can we do?",
      leadFeeGrossCents: gross,
      ...split,
      currency: "NZD",
      reviewMinutes: 8,
      postedLabel: "Posted 14 min ago",
      draftTitle: "Draft: Tenancy Tribunal application — bond refund",
      draftBody:
        "This memo advises on recovery of the $2,800 bond lodged with Tenancy Services in respect of the tenancy at [address], which concluded on 28 March 2026.\n\nUnder section 22 of the Residential Tenancies Act 1986, a bond held by the Chief Executive may only be paid out in accordance with a joint application of the parties or an order of the Tenancy Tribunal. The onus of establishing that the tenant has caused damage beyond fair wear and tear rests with the landlord: see Holler v Rouse [2013] NZTT Auckland, applying the test in Guo v Korck [2014] NZHC 1946 that the landlord must prove both (a) the damage, and (b) that it is attributable to the tenant on the balance of probabilities.\n\nTwo evidentiary gaps materially favour the tenant here. First, the absence of an ingoing property inspection report is fatal to any claim that the carpet condition deteriorated during occupation: the Tribunal has consistently held (see, e.g., Kumar v Singh [2019] NZTT Manukau) that without a contemporaneous ingoing record the landlord cannot discharge the onus. Second, section 45(1A) of the Act (inserted by the Residential Tenancies Amendment Act 2020) now requires landlords to provide a written property inspection at the start of the tenancy; failure is an unlawful act attracting exemplary damages of up to $1,500 under section 109.\n\nRecommended steps: (1) file a Tenancy Tribunal application on form Tenancy 2 seeking an order for release of the full $2,800 bond, plus exemplary damages under section 109 for the s.45(1A) breach; (2) attach the tenancy agreement, bank statements evidencing bond payment, and a statutory declaration as to carpet condition at ingoing; (3) seek costs under regulation 11 of the Residential Tenancies (Tribunal) Regulations 1996. Filing fee is $20.44. Typical hearing date: 4-6 weeks from filing in the Auckland region.\n\nDraft application attached. Recommend filing within 14 days to preserve the exemplary damages claim.",
      citations: [
        "Residential Tenancies Act 1986, ss 22, 45(1A), 109",
        "Residential Tenancies (Tribunal) Regulations 1996, reg 11",
        "Guo v Korck [2014] NZHC 1946",
      ],
    };
  })(),

  (() => {
    const gross = 90_000; // NZD $900 gross lead fee
    const split = netFromGross(gross);
    return {
      id: "demo-sme-catchup-nz",
      practiceArea: "SME tax catch-up",
      jurisdiction: "NZ",
      flag: "🇳🇿",
      summary:
        "Sole trader plasterer — 3 years of unfiled GST and income tax, owes roughly $18k, panicking over IR letter.",
      detailsFromCitizen:
        "I'm a plasterer, GST registered, sole trader. I haven't filed GST since late 2022 and I haven't done my income tax returns for 2023, 2024 or 2025. I just got a letter from IR threatening default assessments. I think I owe about $18k all up. I've got all my invoices in Hnry and my bank statements. I'm freaking out. Can someone sort this out for me.",
      leadFeeGrossCents: gross,
      ...split,
      currency: "NZD",
      reviewMinutes: 10,
      postedLabel: "Posted 1 h ago",
      draftTitle: "Draft: IR voluntary disclosure & instalment arrangement plan",
      draftBody:
        "This memo sets out a proposed remediation pathway for the client's outstanding GST and income tax obligations covering the 2023, 2024 and 2025 income tax years and GST periods from October 2022 onward.\n\n1. Voluntary disclosure. Section 141G of the Tax Administration Act 1994 provides a materially reduced shortfall penalty regime where the taxpayer makes a pre-notification voluntary disclosure. On the facts — the IR letter appears to be a standard follow-up rather than a notice of pending audit under s.141G(2) — disclosure made before any such notice will qualify the client for a 75% reduction in any shortfall penalty, and likely a 100% reduction where no shortfall penalty would otherwise apply given the taxpayer is simply late rather than incorrect.\n\n2. Reconstruction of returns. Using the Hnry export, prepare (i) GST returns for each outstanding two-monthly period applying section 20 of the Goods and Services Tax Act 1985 for input tax claims, being careful to apply the four-year statutory bar in section 45; and (ii) IR3 income tax returns applying Income Tax Act 2007 subparts BA-BC, claiming deductions under s.DA 1. Preliminary reconstruction suggests core tax of approximately $14,200, use-of-money interest under the Tax Administration Act 1994 s.120C of approximately $2,600, and late filing penalties under s.139A of approximately $1,200 — total roughly $18,000, consistent with the client's estimate.\n\n3. Instalment arrangement. Concurrent with filing, apply under s.177B of the Tax Administration Act 1994 for an instalment arrangement. IR will typically grant a 12- to 24-month arrangement where the taxpayer demonstrates ongoing compliance. Use-of-money interest continues to accrue but late-payment penalties are capped at 1% + 4% on entry under s.139B(3).\n\n4. Recommended action. File voluntary disclosure today via myIR; reconstructed returns follow within 10 working days; instalment arrangement application within 5 working days of the core assessment issuing. Advise client to continue filing prospectively — any further default will collapse the arrangement and trigger full penalty exposure.",
      citations: [
        "Tax Administration Act 1994, ss 120C, 139A, 139B, 141G, 177B",
        "Goods and Services Tax Act 1985, ss 20, 45",
        "Income Tax Act 2007, subparts BA-BC, s.DA 1",
      ],
    };
  })(),

  (() => {
    const gross = 120_000; // NZD $1,200 gross lead fee
    const split = netFromGross(gross);
    return {
      id: "demo-consumer-nz",
      practiceArea: "Consumer — faulty goods",
      jurisdiction: "NZ",
      flag: "🇳🇿",
      summary:
        "Heat pump installed Nov 2024 keeps failing — retailer blames installer, installer blames retailer. Customer wants refund.",
      detailsFromCitizen:
        "Paid $6,400 for a Mitsubishi heat pump installed by a retailer in Hamilton in November 2024. It's broken down four times since — two complete failures in winter. Retailer says it's the installer's problem (they subcontracted), installer says it's a unit fault and go back to the retailer. I want my money back and the thing removed. I've got the invoice, the install report, and emails where both of them fob me off.",
      leadFeeGrossCents: gross,
      ...split,
      currency: "NZD",
      reviewMinutes: 7,
      postedLabel: "Posted 2 h ago",
      draftTitle: "Draft: CGA demand letter — reject supply, full refund + removal",
      draftBody:
        "This memo advises on remedies against the retailer in respect of the Mitsubishi heat pump supplied and installed in November 2024.\n\n1. Characterisation. The transaction is a single supply of goods and services to a consumer within the meaning of s.2 of the Consumer Guarantees Act 1993 (CGA). The retailer is the 'supplier' for the purposes of Part 1; its subcontracting of the installation does not sever its direct liability to the consumer — see Cooper v Ashley & Johnson Motors Ltd [1997] DCR 170, affirmed in the CGA context by Nesbit v Porter [2000] 2 NZLR 465.\n\n2. Guarantees engaged. Section 6 (acceptable quality) is the primary guarantee: four breakdowns in 16 months, two of which were complete failures in winter, falls well short of the durability limb of s.7 applied by the Disputes Tribunal in Wilson v Harvey Norman Stores (NZ) Pty Ltd [2017] NZDT 285 and the District Court in Stephens v Barnetts Motor Group Ltd [2020] NZDC 8423. Section 8 (fitness for particular purpose) is also engaged given the unit was supplied for year-round climate control. Section 28 (services carried out with reasonable care and skill) applies to the installation irrespective of who physically performed it (s.28, read with the definition of supplier).\n\n3. Nature of failure. Under s.21, a failure is of a 'substantial character' where a reasonable consumer, fully acquainted with the nature and extent of the failure, would not have acquired the goods. Repeat failures of a heating unit in winter meet this threshold: see Contact Energy Ltd v Jones [2009] NZHC 1402 at [38]. The consumer is accordingly entitled under s.18(3) to reject the goods.\n\n4. Recommended remedy. Issue a written rejection of the goods under s.22 requiring (a) a full refund of $6,400; (b) removal of the unit at the retailer's cost under s.23(2); and (c) consequential loss under s.18(4) for any reasonably foreseeable loss, including the cost of alternative heating during the winter failures. Give 10 working days to remedy before Disputes Tribunal filing. The $30,000 Tribunal jurisdiction comfortably covers the claim and filing fee is $59.80.\n\nDraft letter attached. Recommend sending by both email and tracked post to preserve evidence of service.",
      citations: [
        "Consumer Guarantees Act 1993, ss 6, 7, 8, 18, 21, 22, 23, 28",
        "Nesbit v Porter [2000] 2 NZLR 465",
        "Contact Energy Ltd v Jones [2009] NZHC 1402",
      ],
    };
  })(),
];
