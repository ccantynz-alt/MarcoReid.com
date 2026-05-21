"use client";

import { useRouter } from "next/navigation";
import { useCountry } from "@/lib/useCountry";

export default function CountrySelector() {
  const router = useRouter();
  const { country, countryData, selectCountry, countries } = useCountry();

  function handleSelect(code: string) {
    selectCountry(code);
    router.push(`/${code}`);
  }

  /* If a country is already stored, show a compact pill with a change option */
  if (country && countryData) {
    return (
      <div className="inline-flex items-center gap-3 rounded-full border border-navy-200 bg-white px-5 py-2.5 shadow-sm dark:border-navy-600 dark:bg-navy-800">
        <span className="text-lg" aria-hidden="true">{countryData.flag}</span>
        <span className="text-sm font-medium text-navy-700 dark:text-navy-200">
          {countryData.name}
        </span>
        <span className="text-navy-300 dark:text-navy-500">|</span>
        <button
          onClick={() => {
            localStorage.removeItem("mr:country");
            /* Force re-render by clearing state through the hook */
            window.location.reload();
          }}
          className="text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300"
        >
          Change
        </button>
      </div>
    );
  }

  const entries = Object.entries(countries);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {entries.map(([code, data]) => (
        <button
          key={code}
          onClick={() => handleSelect(code)}
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-navy-100 bg-white px-4 py-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800 dark:hover:border-gold-400"
        >
          <span className="text-4xl" aria-hidden="true">{data.flag}</span>
          <span className="text-sm font-semibold text-navy-700 group-hover:text-navy-900 dark:text-navy-200 dark:group-hover:text-white">
            {data.name}
          </span>
          <span className="text-xs font-medium text-navy-400 dark:text-navy-500">
            {data.currency}
          </span>
        </button>
      ))}
    </div>
  );
}
