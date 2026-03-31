export interface Product {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface TimeSaving {
  task: string;
  without: string;
  with: string;
  saved: string;
}
