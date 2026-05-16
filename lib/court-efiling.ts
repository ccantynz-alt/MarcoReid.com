export interface CourtFilingSystem {
  country: string;
  system: string;
  courts: string[];
  status: "integrated" | "coming-soon";
  url: string;
}

export const COURT_FILING_SYSTEMS: CourtFilingSystem[] = [
  { country: "US", system: "PACER / CM/ECF", courts: ["District Courts", "Courts of Appeals", "Bankruptcy Courts"], status: "coming-soon", url: "https://pacer.uscourts.gov" },
  { country: "US", system: "DAWSON (Tax Court)", courts: ["US Tax Court"], status: "coming-soon", url: "https://dawson.ustaxcourt.gov" },
  { country: "UK", system: "HMCTS CE-File", courts: ["Court of Appeal", "High Court", "County Court"], status: "coming-soon", url: "https://efile.cefile-app.com" },
  { country: "UK", system: "HMCTS Common Platform", courts: ["Crown Court", "Magistrates' Court"], status: "coming-soon", url: "https://common-platform.service.justice.gov.uk" },
  { country: "AU", system: "Commonwealth Courts Portal", courts: ["Federal Court", "Federal Circuit Court", "High Court"], status: "coming-soon", url: "https://www.comcourts.gov.au" },
  { country: "CA", system: "Federal Courts E-Filing", courts: ["Federal Court", "Federal Court of Appeal", "Tax Court"], status: "coming-soon", url: "https://www.fct-cf.gc.ca" },
  { country: "NZ", system: "Coming soon", courts: ["High Court", "District Court"], status: "coming-soon", url: "" },
];
