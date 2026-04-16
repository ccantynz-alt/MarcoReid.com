import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d);

const matterStatusStyles: Record<string, string> = {
  ACTIVE: "bg-forest-50 text-forest-600",
  ON_HOLD: "bg-navy-50 text-navy-500",
  CLOSED: "bg-plum-50 text-plum-600",
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const client = await prisma.client.findFirst({
    where: { id, userId },
    include: {
      matters: {
        orderBy: { updatedAt: "desc" },
        include: { _count: { select: { documents: true, timeEntries: true } } },
      },
      documents: { orderBy: { createdAt: "desc" }, take: 10 },
      trustAccounts: true,
    },
  });
  if (!client) notFound();

  // Compute metrics
  const activeMatters = client.matters.filter((m) => m.status === "ACTIVE").length;
  const totalMatters = client.matters.length;
  const matterIds = client.matters.map((m) => m.id);

  const [timeEntries, totalTrustBalance] = await Promise.all([
    prisma.timeEntry.findMany({
      where: { userId, matterId: { in: matterIds } },
      select: { minutes: true, rateInCents: true, billable: true, invoiced: true },
    }),
    client.trustAccounts.reduce((sum, a) => sum + a.balanceInCents, 0),
  ]);

  const totalMinutes = timeEntries.reduce((s, t) => s + t.minutes, 0);
  const billableCents = timeEntries
    .filter((t) => t.billable)
    .reduce((sum, t) => sum + Math.round((t.minutes / 60) * t.rateInCents), 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/clients"
        className="inline-flex items-center gap-1 text-sm text-navy-400 transition-colors hover:text-navy-700"
      >
        &larr; All clients
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-100 font-serif text-2xl text-navy-600">
            {client.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="font-serif text-display text-navy-800">
              {client.name}
            </h1>
            {client.companyName && (
              <p className="mt-1 text-lg text-navy-500">{client.companyName}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/clients/${client.id}/edit`}
            className="inline-flex items-center rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-400"
          >
            Edit
          </Link>
          <Link
            href={`/matters/new?clientId=${client.id}`}
            className="inline-flex items-center rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
          >
            New matter
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Matters
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {totalMatters}
          </p>
          <p className="mt-1 text-xs text-navy-400">{activeMatters} active</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Billable
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {money(billableCents)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {(totalMinutes / 60).toFixed(1)}h across all matters
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Trust balance
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {money(totalTrustBalance)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {client.trustAccounts.length}{" "}
            {client.trustAccounts.length === 1 ? "account" : "accounts"}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Documents
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {client.documents.length}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {client.documents.length === 0 ? "None yet" : "Linked to client"}
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Matters list */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">Matters</h2>
            <Link
              href={`/matters/new?clientId=${client.id}`}
              className="text-sm font-medium text-navy-500 hover:text-navy-700"
            >
              New matter &rarr;
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {client.matters.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="font-serif text-lg text-navy-700">
                  No matters yet
                </p>
                <p className="mt-1 text-sm text-navy-400">
                  Open the first matter for {client.name}.
                </p>
                <Link
                  href={`/matters/new?clientId=${client.id}`}
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-600"
                >
                  New matter
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-navy-50">
                {client.matters.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/matters/${m.id}`}
                      className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-navy-50/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-navy-700">
                          {m.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-navy-400">
                          {m.matterNumber ? `#${m.matterNumber} · ` : ""}
                          {m.practiceArea || "—"} · {m._count.documents} docs ·{" "}
                          {m._count.timeEntries} time entries
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-medium ${
                            matterStatusStyles[m.status] ?? "bg-navy-50 text-navy-500"
                          }`}
                        >
                          {m.status.replace("_", " ")}
                        </span>
                        <span className="text-navy-400">
                          {formatDate(m.openedAt)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Contact info */}
        <div>
          <h2 className="font-serif text-headline text-navy-800">Contact</h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Email
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${client.email}`}
                    className="text-navy-600 hover:text-navy-800"
                  >
                    {client.email}
                  </a>
                </dd>
              </div>
              {client.phone && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Phone
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={`tel:${client.phone}`}
                      className="text-navy-600 hover:text-navy-800"
                    >
                      {client.phone}
                    </a>
                  </dd>
                </div>
              )}
              {client.address && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Address
                  </dt>
                  <dd className="mt-0.5 whitespace-pre-line text-navy-600">
                    {client.address}
                  </dd>
                </div>
              )}
              {client.companyName && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Company
                  </dt>
                  <dd className="mt-0.5 text-navy-600">{client.companyName}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Client since
                </dt>
                <dd className="mt-0.5 text-navy-600">
                  {formatDate(client.createdAt)}
                </dd>
              </div>
            </dl>
          </div>

          {client.notes && (
            <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Notes
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-navy-600">
                {client.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent documents */}
      {client.documents.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">
              Recent documents
            </h2>
            <Link
              href={`/documents?clientId=${client.id}`}
              className="text-sm font-medium text-navy-500 hover:text-navy-700"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white shadow-card">
            <ul className="divide-y divide-navy-50">
              {client.documents.map((d) => (
                <li key={d.id} className="px-5 py-4">
                  <p className="font-medium text-navy-700">{d.title}</p>
                  <p className="mt-0.5 text-xs text-navy-400">
                    {d.kind.replace("_", " ")} · {d.fileName} ·{" "}
                    {Math.round(d.fileSize / 1024)} KB ·{" "}
                    {formatDate(d.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
