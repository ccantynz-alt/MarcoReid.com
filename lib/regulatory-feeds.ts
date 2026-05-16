export interface RegulatoryFeed {
  id: string;
  country: string;
  source: string;
  type: "legislation" | "tax" | "regulation" | "consultation";
  url: string;
  description: string;
}

export const REGULATORY_FEEDS: RegulatoryFeed[] = [
  // New Zealand
  { id: "nz-legislation", country: "NZ", source: "NZ Legislation", type: "legislation", url: "https://legislation.govt.nz/subscribe", description: "New Zealand Acts, regulations, and legislative instruments" },
  { id: "nz-ir-updates", country: "NZ", source: "Inland Revenue", type: "tax", url: "https://ird.govt.nz/updates", description: "Tax policy changes, technical rulings, and operational statements" },
  { id: "nz-mbie", country: "NZ", source: "MBIE Consultations", type: "consultation", url: "https://mbie.govt.nz/have-your-say", description: "Ministry of Business, Innovation & Employment regulatory consultations" },

  // Australia
  { id: "au-legislation", country: "AU", source: "Federal Register of Legislation", type: "legislation", url: "https://legislation.gov.au", description: "Commonwealth Acts, regulations, and legislative instruments" },
  { id: "au-ato-rulings", country: "AU", source: "ATO Law Companion Rulings", type: "tax", url: "https://ato.gov.au/law", description: "Interpretive guidance, rulings, and determinations" },
  { id: "au-treasury", country: "AU", source: "Treasury Consultations", type: "consultation", url: "https://treasury.gov.au/consultation", description: "Federal Treasury policy consultations" },

  // United Kingdom
  { id: "uk-legislation", country: "UK", source: "UK Legislation", type: "legislation", url: "https://legislation.gov.uk/new", description: "UK Acts, statutory instruments, and measures" },
  { id: "uk-hmrc-briefs", country: "UK", source: "HMRC Revenue & Customs Briefs", type: "tax", url: "https://gov.uk/government/collections/revenue-and-customs-briefs", description: "HMRC policy updates, guidance changes, and tax information" },
  { id: "uk-law-commission", country: "UK", source: "Law Commission", type: "consultation", url: "https://lawcom.gov.uk/our-work", description: "Law reform recommendations and consultations" },
  { id: "uk-sra-updates", country: "UK", source: "SRA Updates", type: "regulation", url: "https://sra.org.uk/sra/news", description: "Solicitors Regulation Authority regulatory updates" },

  // United States
  { id: "us-congress", country: "US", source: "Congress.gov", type: "legislation", url: "https://congress.gov/rss", description: "Bills, resolutions, and congressional activity" },
  { id: "us-federal-register", country: "US", source: "Federal Register", type: "regulation", url: "https://federalregister.gov/api/v1", description: "Federal agency rules, proposed rules, and notices" },
  { id: "us-irb", country: "US", source: "IRS Internal Revenue Bulletins", type: "tax", url: "https://irs.gov/irb", description: "Revenue rulings, revenue procedures, and Treasury decisions" },
  { id: "us-aba", country: "US", source: "ABA Rule Changes", type: "regulation", url: "https://americanbar.org/groups/professional_responsibility", description: "Model Rules amendments and ethics opinions" },

  // Canada
  { id: "ca-gazette", country: "CA", source: "Canada Gazette", type: "legislation", url: "https://gazette.gc.ca", description: "Federal regulations, orders, and proposed regulations" },
  { id: "ca-justice", country: "CA", source: "Department of Justice", type: "legislation", url: "https://justice.gc.ca/eng/csj-sjc/pl/charter-charte", description: "Federal justice legislation and consultations" },
  { id: "ca-cra-updates", country: "CA", source: "CRA What's New", type: "tax", url: "https://canada.ca/en/revenue-agency/news", description: "Tax changes, filing requirements, and CRA guidance" },
  { id: "ca-finance", country: "CA", source: "Finance Canada", type: "consultation", url: "https://canada.ca/en/department-finance/services/consultations", description: "Federal budget measures and tax policy consultations" },
];
