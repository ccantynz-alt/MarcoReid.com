"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/app/api/news/route";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "legal", label: "Legal" },
  { key: "accounting", label: "Accounting" },
  { key: "tax", label: "Tax" },
  { key: "ip", label: "IP" },
  { key: "court", label: "Courts" },
];

const categoryStyles: Record<string, string> = {
  legal: "bg-navy-50 text-navy-600 dark:bg-navy-800 dark:text-navy-300",
  accounting: "bg-forest-50 text-forest-600 dark:bg-forest-900 dark:text-forest-300",
  tax: "bg-plum-50 text-plum-600 dark:bg-plum-900 dark:text-plum-300",
  ip: "bg-gold-50 text-gold-700 dark:bg-gold-900 dark:text-gold-300",
  court: "bg-navy-50 text-navy-500 dark:bg-navy-800 dark:text-navy-400",
};

const sectionConfig: Record<string, { title: string; subtitle: string; accent: string }> = {
  legal: {
    title: "Legal Intelligence",
    subtitle: "ABA Journal · National Law Review · Reuters Legal · JD Supra · Courthouse News",
    accent: "text-navy-600 dark:text-navy-300",
  },
  accounting: {
    title: "Accounting & Tax Intelligence",
    subtitle: "Journal of Accountancy · Accounting Today · The Tax Adviser",
    accent: "text-forest-600 dark:text-forest-300",
  },
  ip: {
    title: "IP & Patent Intelligence",
    subtitle: "IPWatchdog",
    accent: "text-gold-600 dark:text-gold-400",
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
    new Date(dateStr),
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800 dark:hover:border-gold-600"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-navy-100 text-[9px] font-bold text-navy-600 dark:bg-navy-700 dark:text-navy-300">
          {item.sourceIcon}
        </span>
        <div className="flex items-center gap-2 text-xs text-navy-400">
          <span className="font-medium text-navy-500 dark:text-navy-300">
            {item.source}
          </span>
          <span>·</span>
          <span>{timeAgo(item.publishedAt)}</span>
        </div>
      </div>

      <h3 className="mt-3 font-serif text-base leading-snug text-navy-800 group-hover:text-navy-900 dark:text-navy-100 dark:group-hover:text-white">
        {item.title}
      </h3>

      {item.snippet && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-500 dark:text-navy-400">
          {item.snippet}
        </p>
      )}

      <p className="mt-3 text-xs font-medium text-gold-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gold-400">
        Read article &rarr;
      </p>
    </a>
  );
}

export default function NewsClient() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/news?limit=50")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load news");
        const data = await res.json();
        setItems(data.items || []);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Could not load news");
      })
      .finally(() => setLoading(false));
  }, []);

  // Group items by section
  const legalItems = items.filter((i) => i.category === "legal" || i.category === "court");
  const accountingItems = items.filter((i) => i.category === "accounting" || i.category === "tax");
  const ipItems = items.filter((i) => i.category === "ip");

  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((i) => {
          if (activeTab === "legal") return i.category === "legal" || i.category === "court";
          if (activeTab === "accounting") return i.category === "accounting" || i.category === "tax";
          return i.category === activeTab;
        });

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-navy-100 bg-white p-6 dark:border-navy-700 dark:bg-navy-800"
          >
            <div className="h-4 w-1/4 rounded bg-navy-100 dark:bg-navy-700" />
            <div className="mt-3 h-5 w-3/4 rounded bg-navy-100 dark:bg-navy-700" />
            <div className="mt-2 h-3 w-full rounded bg-navy-100 dark:bg-navy-700" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
        <p className="font-serif text-lg text-navy-700 dark:text-navy-200">
          Could not load news
        </p>
        <p className="mt-2 text-sm text-navy-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Tab switcher */}
      <div className="flex flex-wrap gap-1 border-b border-navy-100 dark:border-navy-700">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === cat.key
                ? "border-gold-400 text-navy-800 dark:text-white"
                : "border-transparent text-navy-400 hover:text-navy-700 dark:hover:text-navy-200"
            }`}
          >
            {cat.label}
            {cat.key !== "all" && (
              <span className="ml-1.5 rounded-full bg-navy-50 px-1.5 py-0.5 text-[10px] text-navy-400 dark:bg-navy-700">
                {cat.key === "legal"
                  ? legalItems.length
                  : cat.key === "accounting"
                    ? accountingItems.length
                    : cat.key === "ip"
                      ? ipItems.length
                      : filteredItems.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Sectioned view when "All" is selected */}
      {activeTab === "all" ? (
        <div className="mt-8 space-y-12">
          {/* Legal section */}
          {legalItems.length > 0 && (
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
                    {sectionConfig.legal.title}
                  </h2>
                  <p className="mt-1 text-xs text-navy-400">
                    {sectionConfig.legal.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("legal")}
                  className="text-xs font-medium text-gold-600 hover:text-gold-700 dark:text-gold-400"
                >
                  View all &rarr;
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {legalItems.slice(0, 6).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Accounting & Tax section */}
          {accountingItems.length > 0 && (
            <section>
              <div className="gold-divider mb-8" />
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
                    {sectionConfig.accounting.title}
                  </h2>
                  <p className="mt-1 text-xs text-navy-400">
                    {sectionConfig.accounting.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("accounting")}
                  className="text-xs font-medium text-gold-600 hover:text-gold-700 dark:text-gold-400"
                >
                  View all &rarr;
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {accountingItems.slice(0, 6).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* IP section */}
          {ipItems.length > 0 && (
            <section>
              <div className="gold-divider mb-8" />
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-navy-800 dark:text-white">
                    {sectionConfig.ip.title}
                  </h2>
                  <p className="mt-1 text-xs text-navy-400">
                    {sectionConfig.ip.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("ip")}
                  className="text-xs font-medium text-gold-600 hover:text-gold-700 dark:text-gold-400"
                >
                  View all &rarr;
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ipItems.slice(0, 3).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Filtered view when specific category selected */
        <div className="mt-6">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center dark:border-navy-700 dark:bg-navy-800">
              <p className="font-serif text-lg text-navy-700 dark:text-navy-200">
                No articles in this category right now
              </p>
              <p className="mt-2 text-sm text-navy-400">
                Feeds refresh every 30 minutes.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
