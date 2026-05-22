// Tax Module Registry
// Central index for all per-country tax modules.
// Each country module is completely isolated — no cross-imports between countries.

import * as nz from "./nz";
import * as au from "./au";
import * as uk from "./uk";
import * as us from "./us";
import * as ca from "./ca";

export const TAX_MODULES = { nz, au, uk, us, ca } as const;

export type CountryCode = keyof typeof TAX_MODULES;

/**
 * Get the tax module for a specific country.
 * Returns undefined if the country code is not supported.
 */
export function getCountryTax(code: string) {
  return TAX_MODULES[code.toLowerCase() as keyof typeof TAX_MODULES];
}

/**
 * All supported country codes.
 */
export const SUPPORTED_COUNTRIES: CountryCode[] = ["nz", "au", "uk", "us", "ca"];

/**
 * Country display metadata for UI rendering.
 */
export const COUNTRY_INFO: Record<CountryCode, { name: string; currency: string; symbol: string; taxLabel: string }> = {
  nz: { name: "New Zealand", currency: "NZD", symbol: "$", taxLabel: "GST" },
  au: { name: "Australia", currency: "AUD", symbol: "$", taxLabel: "GST" },
  uk: { name: "United Kingdom", currency: "GBP", symbol: "£", taxLabel: "VAT" },
  us: { name: "United States", currency: "USD", symbol: "$", taxLabel: "Sales Tax" },
  ca: { name: "Canada", currency: "CAD", symbol: "$", taxLabel: "GST/HST" },
};

// Re-export individual modules for direct access
export { nz, au, uk, us, ca };
