import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NewsClient from "./NewsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Industry News",
  description:
    "Legal, accounting, tax, and IP news from leading publications — aggregated for your daily reading.",
};

export default async function NewsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          Industry Intelligence
        </p>
        <h1 className="mt-2 font-serif text-display text-navy-800 dark:text-white">
          News &amp; Insights
        </h1>
        <p className="mt-2 text-lg text-navy-400">
          The latest from ABA Journal, National Law Review, Journal of Accountancy,
          Reuters Legal, and more — curated for professionals.
        </p>
      </div>

      <NewsClient />
    </div>
  );
}
