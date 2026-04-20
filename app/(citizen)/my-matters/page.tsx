import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { formatFee } from "@/lib/marketplace/format";
import { MATTER_STATUS_PRESENTATION } from "@/lib/marketplace/matter-status";

export const metadata = {
  title: "My matters — Marco Reid",
};

export const dynamic = "force-dynamic";

export default async function MyMattersPage() {
  const userId = await getUserId();
  if (!userId) return null;

  const matters = await prisma.proMatter.findMany({
    where: { citizenUserId: userId },
    include: {
      practiceArea: { select: { slug: true, name: true, jurisdiction: true } },
      acceptedBy: { select: { displayName: true, professionalBody: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            My matters
          </p>
          <h1 className="mt-3 font-serif text-4xl text-navy-800">
            Your posted matters.
          </h1>
          <p className="mt-3 text-navy-500">
            Everything you&rsquo;ve posted, drafted, or had signed off.
          </p>
        </div>
        <Link
          href="/post-matter"
          className="inline-flex items-center rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-600"
        >
          + New matter
        </Link>
      </div>

      {matters.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
          <p className="font-serif text-xl text-navy-700">No matters yet.</p>
          <p className="mt-2 text-sm text-navy-500">
            Post your first matter and a licensed professional will pick it up.
          </p>
          <Link
            href="/post-matter"
            className="mt-6 inline-flex items-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
          >
            Post a matter
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {matters.map((m) => {
            const status = MATTER_STATUS_PRESENTATION[m.status];
            return (
              <li key={m.id}>
                <Link
                  href={`/matter/${m.id}`}
                  className="block rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-400">
                        {m.practiceArea.name} &middot; {m.practiceArea.jurisdiction}
                      </p>
                      <p className="mt-2 font-serif text-lg text-navy-800">
                        {m.summary}
                      </p>
                      <p className="mt-1 text-xs text-navy-400">
                        Posted {m.postedAt ? new Date(m.postedAt).toLocaleDateString() : "— draft"}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  {m.acceptedBy && (
                    <p className="mt-4 rounded-lg bg-navy-50 p-3 text-sm text-navy-600">
                      Accepted by{" "}
                      <strong className="text-navy-800">{m.acceptedBy.displayName}</strong> ·{" "}
                      {m.acceptedBy.professionalBody}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-navy-400">
                      Lead fee: {formatFee(m.leadFeeInCents, m.currency)}
                    </span>
                    <span className="font-semibold text-navy-600">Open &rarr;</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
