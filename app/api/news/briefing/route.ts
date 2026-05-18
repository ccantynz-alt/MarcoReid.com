import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { NewsItem } from "../route";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get user's practice area for personalisation
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { practiceArea: true, jurisdiction: true, name: true },
    });

    // Fetch today's news
    const newsRes = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/news?limit=20`,
      {
        headers: {
          cookie: `next-auth.session-token=${userId}`,
        },
      },
    ).catch(() => null);

    let headlines: NewsItem[] = [];
    if (newsRes?.ok) {
      const data = await newsRes.json();
      headlines = data.items || [];
    }

    // Build the briefing text
    const firstName = user?.name?.split(" ")[0] || "there";
    const now = new Date();
    const timeOfDay =
      now.getHours() < 12 ? "morning" : now.getHours() < 17 ? "afternoon" : "evening";
    const dateStr = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(now);

    // Separate by category
    const legalHeadlines = headlines
      .filter((h) => h.category === "legal" || h.category === "court")
      .slice(0, 4);
    const accountingHeadlines = headlines
      .filter((h) => h.category === "accounting" || h.category === "tax")
      .slice(0, 3);
    const ipHeadlines = headlines
      .filter((h) => h.category === "ip")
      .slice(0, 2);

    // Build structured briefing
    const sections: Array<{
      title: string;
      items: Array<{ headline: string; source: string; link: string }>;
    }> = [];

    if (legalHeadlines.length > 0) {
      sections.push({
        title: "In legal news",
        items: legalHeadlines.map((h) => ({
          headline: h.title,
          source: h.source,
          link: h.link,
        })),
      });
    }

    if (accountingHeadlines.length > 0) {
      sections.push({
        title: "In accounting and tax",
        items: accountingHeadlines.map((h) => ({
          headline: h.title,
          source: h.source,
          link: h.link,
        })),
      });
    }

    if (ipHeadlines.length > 0) {
      sections.push({
        title: "In intellectual property",
        items: ipHeadlines.map((h) => ({
          headline: h.title,
          source: h.source,
          link: h.link,
        })),
      });
    }

    // Generate the spoken briefing script
    let script = `Good ${timeOfDay}, ${firstName}. It's ${dateStr}. Here's your Marco Reid morning briefing.\n\n`;

    for (const section of sections) {
      script += `${section.title}.\n`;
      section.items.forEach((item, i) => {
        script += `${i + 1}. ${item.headline}. From ${item.source}.\n`;
      });
      script += "\n";
    }

    if (sections.length === 0) {
      script +=
        "No new articles this morning. I'll check again in 30 minutes. In the meantime, is there anything you'd like to research?\n";
    } else {
      script +=
        "That's your briefing. Would you like me to go deeper on any of these stories? Just say the number, or ask me anything.\n";
    }

    // Return both structured data and the spoken script
    return NextResponse.json({
      greeting: `Good ${timeOfDay}, ${firstName}.`,
      date: dateStr,
      sections,
      script,
      practiceArea: user?.practiceArea || null,
      jurisdiction: user?.jurisdiction || null,
      headlineCount: headlines.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not generate briefing." },
      { status: 500 },
    );
  }
}
