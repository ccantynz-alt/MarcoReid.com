"use client";
import { useState, useEffect } from "react";

const COUNTRY_MAP: Record<string, { name: string; flag: string; currency: string; code: string }> = {
  nz: { name: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}", currency: "NZD", code: "NZ" },
  au: { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", currency: "AUD", code: "AU" },
  uk: { name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", currency: "GBP", code: "UK" },
  us: { name: "United States", flag: "\u{1F1FA}\u{1F1F8}", currency: "USD", code: "US" },
  ca: { name: "Canada", flag: "\u{1F1E8}\u{1F1E6}", currency: "CAD", code: "CA" },
  ie: { name: "Ireland", flag: "\u{1F1EE}\u{1F1EA}", currency: "EUR", code: "IE" },
  sg: { name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}", currency: "SGD", code: "SG" },
  in: { name: "India", flag: "\u{1F1EE}\u{1F1F3}", currency: "INR", code: "IN" },
};

export function useCountry() {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mr:country");
    if (stored && COUNTRY_MAP[stored]) setCountry(stored);
  }, []);

  function selectCountry(code: string) {
    localStorage.setItem("mr:country", code);
    setCountry(code);
  }

  return {
    country,
    countryData: country ? COUNTRY_MAP[country] : null,
    selectCountry,
    countries: COUNTRY_MAP,
  };
}
