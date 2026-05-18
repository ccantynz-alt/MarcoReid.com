export interface BankFeedProvider {
  id: string;
  name: string;
  countries: string[];
  description: string;
  status: "coming-soon";
  logoPlaceholder: string;
}

export const BANK_FEED_PROVIDERS: BankFeedProvider[] = [
  { id: "plaid", name: "Plaid", countries: ["US", "CA", "UK"], description: "Connect to 12,000+ financial institutions", status: "coming-soon", logoPlaceholder: "P" },
  { id: "akahu", name: "Akahu", countries: ["NZ"], description: "NZ's open finance platform — all major NZ banks", status: "coming-soon", logoPlaceholder: "A" },
  { id: "basiq", name: "Basiq", countries: ["AU"], description: "Australia's leading data platform — 200+ institutions", status: "coming-soon", logoPlaceholder: "B" },
  { id: "truelayer", name: "TrueLayer", countries: ["UK"], description: "Open banking across UK and EU banks", status: "coming-soon", logoPlaceholder: "T" },
];
