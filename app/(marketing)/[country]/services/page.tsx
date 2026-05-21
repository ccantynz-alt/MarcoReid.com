"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState, useMemo } from "react";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import { JURISDICTIONS } from "@/lib/jurisdictions";
import { getServicesByCountry, SERVICE_CATEGORIES, type Service } from "@/lib/services";
import { BRAND } from "@/lib/constants";

const VALID_COUNTRIES = ["nz", "au", "uk", "us", "ca", "ie", "sg"] as const;
type CountrySlug = (typeof VALID_COUNTRIES)[number];

const COUNTRY_MAP: Record<CountrySlug, string> = {
  nz: "NZ",
  au: "AU",
  uk: "UK",
  us: "US",
  ca: "CA",
  ie: "IE",
  sg: "SG",
};

function isValidCountry(slug: string): slug is CountrySlug {
  return VALID_COUNTRIES.includes(slug as CountrySlug);
}

const CATEGORY_ICONS: Record<string, string> = {
  personal: "\u{1F464}",
  property: "\u{1F3E0}",
  business: "\u{1F4BC}",
  immigration: "\u{1F30D}",
  tax: "\u{1F4CA}",
  accounting: "\u{1F4C8}",
  legal: "⚖️",
  court: "\u{1F3DB}️",
};

interface PageProps {
  params: Promise<{ country: string }>;
}

function ServiceCard({ service, country }: { service: Service; country: string }) {
  return (
    <Link
      href={`/${country}/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-gold-300"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
          {service.name}
        </h3>
        {service.estimatedCost && (
          <span className="shrink-0 rounded-md bg-gold-50 px-2 py-0.5 text-xs font-semibold text-gold-700">
            {service.estimatedCost}
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-400">
        {service.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {service.publicAccess ? (
          <span className="rounded-md bg-forest-50 px-2 py-0.5 text-xs font-semibold text-forest-700">
            Self-serve
          </span>
        ) : (
          <span className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-500">
            Professional required
          </span>
        )}
        {service.forms && service.forms.length > 0 && (
          <span className="text-xs text-navy-400">
            {service.forms.length} {service.forms.length === 1 ? "form" : "forms"}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs font-semibold text-navy-400 group-hover:text-gold-600">
        View details &rarr;
      </p>
    </Link>
  );
}

export default function CountryServicesPage({ params }: PageProps) {
  const { country } = use(params);
  if (!isValidCountry(country)) notFound();

  const code = COUNTRY_MAP[country];
  const jurisdiction = JURISDICTIONS[code];
  const services = getServicesByCountry(code);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    let results = services;

    if (activeCategory !== "all") {
      results = results.filter((s) => s.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          (s.forms && s.forms.some((f) => f.toLowerCase().includes(query)))
      );
    }

    return results;
  }, [services, activeCategory, searchQuery]);

  const groupedServices = useMemo(() => {
    const groups: Record<string, Service[]> = {};
    for (const service of filteredServices) {
      if (!groups[service.category]) {
        groups[service.category] = [];
      }
      groups[service.category].push(service);
    }
    return groups;
  }, [filteredServices]);

  const availableCategories = SERVICE_CATEGORIES.filter((cat) =>
    services.some((s) => s.category === cat.slug)
  );

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="bg-navy-500 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-4xl">{jurisdiction.flag}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              {BRAND.name} &mdash; {jurisdiction.name}
            </p>
            <h1 className="mt-4 font-serif text-hero text-white">
              All services in {jurisdiction.name}.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-100">
              {services.length} services available. Browse by category or search for
              what you need. Every service is delivered in compliance with{" "}
              {jurisdiction.name} law and priced in {jurisdiction.currency.code}.
            </p>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SEARCH + FILTER BAR                                           */}
      {/* ============================================================ */}
      <section className="sticky top-0 z-30 border-b border-navy-100 bg-white/95 py-4 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-sm">
              <input
                type="text"
                placeholder="Search services, forms, documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 pl-10 text-sm text-navy-700 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
              />
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`min-h-touch rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-navy-500 text-white"
                    : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                }`}
              >
                All ({services.length})
              </button>
              {availableCategories.map((cat) => {
                const count = services.filter((s) => s.category === cat.slug).length;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() =>
                      setActiveCategory(activeCategory === cat.slug ? "all" : cat.slug)
                    }
                    className={`min-h-touch rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      activeCategory === cat.slug
                        ? "bg-navy-500 text-white"
                        : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SERVICE LISTING                                               */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20">
        <Container>
          {filteredServices.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-navy-600">No services found.</p>
              <p className="mt-2 text-sm text-navy-400">
                Try a different search term or clear the category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 text-sm font-semibold text-gold-600 hover:text-gold-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {SERVICE_CATEGORIES.filter((cat) => groupedServices[cat.slug]).map((cat) => (
                <div key={cat.slug}>
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{CATEGORY_ICONS[cat.slug] ?? "•"}</span>
                      <div>
                        <h2 className="font-serif text-2xl text-navy-800">{cat.name}</h2>
                        <p className="text-sm text-navy-400">{cat.description}</p>
                      </div>
                    </div>
                  </Reveal>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {groupedServices[cat.slug].map((service) => (
                      <Reveal key={service.slug} delay={0.05}>
                        <ServiceCard service={service} country={country} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ============================================================ */}
      {/* BOTTOM CTA                                                    */}
      {/* ============================================================ */}
      <section className="bg-navy-500 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-serif text-display text-white">
                Can&rsquo;t find what you need?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Connect with a verified professional in {jurisdiction.name} who can
                help with your specific situation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/directory" variant="gold" size="lg">
                  Find a professional
                </Button>
                <Button href="/contact" variant="ghost" className="text-white hover:text-gold-300">
                  Contact us &rarr;
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* COMPLIANCE NOTE                                               */}
      {/* ============================================================ */}
      <section className="py-10">
        <Container narrow>
          <p className="text-center text-xs text-navy-400">
            {BRAND.name} is a tooling vendor. Services marked &ldquo;Self-serve&rdquo;
            allow you to initiate the process yourself; a licensed professional
            reviews and approves all legal or regulatory outputs before they take
            effect. Services marked &ldquo;Professional required&rdquo; are delivered
            entirely by an independently licensed {jurisdiction.name} professional.
          </p>
        </Container>
      </section>
    </>
  );
}
