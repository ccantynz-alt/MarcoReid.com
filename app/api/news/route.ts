import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const revalidate = 1800; // Cache for 30 minutes

interface FeedSource {
  name: string;
  url: string;
  category: "legal" | "accounting" | "tax" | "ip" | "court";
  icon: string;
}

const FEEDS: FeedSource[] = [
  // Legal
  { name: "ABA Journal", url: "https://www.abajournal.com/feed", category: "legal", icon: "ABA" },
  { name: "National Law Review", url: "https://www.natlawreview.com/recent-contributions/feed", category: "legal", icon: "NLR" },
  { name: "JD Supra", url: "https://www.jdsupra.com/resources/syndication/docsRSSfeed.aspx?&cm=All&st=0&c=0", category: "legal", icon: "JDS" },
  { name: "Reuters Legal", url: "https://www.reuters.com/legal/rss", category: "legal", icon: "REU" },
  { name: "Courthouse News", url: "https://www.courthousenews.com/feed/", category: "court", icon: "CNS" },

  // Accounting & Tax
  { name: "Journal of Accountancy", url: "https://www.journalofaccountancy.com/rss/all-news.xml", category: "accounting", icon: "JoA" },
  { name: "Accounting Today", url: "https://www.accountingtoday.com/feed", category: "accounting", icon: "AT" },
  { name: "The Tax Adviser", url: "https://www.thetaxadviser.com/rss/all-content.xml", category: "tax", icon: "TTA" },

  // IP
  { name: "IPWatchdog", url: "https://ipwatchdog.com/feed/", category: "ip", icon: "IPW" },
];

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  sourceIcon: string;
  category: string;
  publishedAt: string;
  snippet: string;
}

// Simple XML tag extraction — avoids needing a full XML parser dependency
function extractTag(xml: string, tag: string): string {
  const open = xml.indexOf(`<${tag}`);
  if (open === -1) return "";
  const contentStart = xml.indexOf(">", open) + 1;
  const close = xml.indexOf(`</${tag}>`, contentStart);
  if (close === -1) return "";
  let content = xml.slice(contentStart, close).trim();
  // Handle CDATA
  if (content.startsWith("<![CDATA[")) {
    content = content.slice(9, content.length - 3);
  }
  return content;
}

function extractItems(xml: string): Array<{ title: string; link: string; pubDate: string; description: string }> {
  const items: Array<{ title: string; link: string; pubDate: string; description: string }> = [];
  let pos = 0;
  while (true) {
    const itemStart = xml.indexOf("<item", pos);
    if (itemStart === -1) break;
    const itemEnd = xml.indexOf("</item>", itemStart);
    if (itemEnd === -1) break;
    const itemXml = xml.slice(itemStart, itemEnd);
    items.push({
      title: extractTag(itemXml, "title"),
      link: extractTag(itemXml, "link"),
      pubDate: extractTag(itemXml, "pubDate") || extractTag(itemXml, "dc:date"),
      description: extractTag(itemXml, "description"),
    });
    pos = itemEnd + 7;
  }
  return items;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

// In-memory cache
let cachedNews: NewsItem[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

async function fetchAllFeeds(): Promise<NewsItem[]> {
  if (cachedNews && Date.now() - cacheTime < CACHE_TTL) {
    return cachedNews;
  }

  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      try {
        const res = await fetch(feed.url, {
          headers: { "User-Agent": "MarcoReid/1.0 (+https://marcoreid.com)" },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return [];
        const xml = await res.text();
        const items = extractItems(xml);
        return items.slice(0, 5).map((item, i) => ({
          id: `${feed.name.toLowerCase().replace(/\s+/g, "-")}-${i}-${Date.now()}`,
          title: stripHtml(item.title),
          link: item.link,
          source: feed.name,
          sourceIcon: feed.icon,
          category: feed.category,
          publishedAt: item.pubDate
            ? new Date(item.pubDate).toISOString()
            : new Date().toISOString(),
          snippet: stripHtml(item.description).slice(0, 200),
        }));
      } catch {
        return [];
      }
    }),
  );

  const allItems: NewsItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Sort by date, newest first
  allItems.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  cachedNews = allItems;
  cacheTime = Date.now();
  return allItems;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const limit = parseInt(url.searchParams.get("limit") || "30", 10);

  try {
    let items = await fetchAllFeeds();

    if (category && category !== "all") {
      items = items.filter((i) => i.category === category);
    }

    items = items.slice(0, Math.min(limit, 50));

    return NextResponse.json({
      items,
      sources: FEEDS.map((f) => ({ name: f.name, category: f.category })),
      cachedAt: new Date(cacheTime).toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch news." },
      { status: 500 },
    );
  }
}
