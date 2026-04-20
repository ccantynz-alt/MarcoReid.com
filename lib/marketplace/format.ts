export function formatFee(cents: number, currency: string): string {
  return `${currency} $${(cents / 100).toFixed(0)}`;
}

export const JURISDICTION_NAMES: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  US: "United States",
  UK: "United Kingdom",
  CA: "Canada",
};

export function jurisdictionName(code: string): string {
  return JURISDICTION_NAMES[code] ?? code;
}
