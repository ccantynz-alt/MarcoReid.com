"use client";

import { useState } from "react";
import SchemaMarkup from "./SchemaMarkup";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  heading?: string;
  subheading?: string;
}

export default function FAQ({
  items,
  heading = "Frequently asked questions.",
  subheading,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-24 sm:py-36" aria-label="Frequently asked questions">
      <SchemaMarkup schema={faqSchema} />
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <h2 className="font-serif text-display text-navy-800">{heading}</h2>
        {subheading && (
          <p className="mt-4 text-lg text-navy-400">{subheading}</p>
        )}

        <div className="mt-12 divide-y divide-navy-100">
          {items.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 text-left min-h-touch"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 text-base font-semibold text-navy-700">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 text-navy-400 transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i
                    ? "max-h-96 pb-5 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm leading-relaxed text-navy-400">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
