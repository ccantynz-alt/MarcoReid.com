import { prisma } from "@/lib/prisma";
import PostMatterForm from "@/app/components/citizen/PostMatterForm";

export const metadata = {
  title: "Post a matter — Marco Reid",
  description:
    "Describe your problem. Marco drafts the paperwork. A licensed lawyer or chartered accountant signs it off before it goes anywhere.",
};

export const dynamic = "force-dynamic";

export default async function PostMatterPage() {
  const areas = await prisma.practiceArea.findMany({
    where: { active: true },
    orderBy: [{ priority: "desc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      domain: true,
      jurisdiction: true,
      summary: true,
      intakeCopy: true,
      leadFeeInCents: true,
      currency: true,
      ackVersion: true,
      ackBullets: true,
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Post a matter
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy-800">
          Tell us what you need help with.
        </h1>
        <p className="mt-4 text-navy-500">
          Three short steps. You describe the problem, we tell you the flat
          lead fee and what a licensed professional will do, and you confirm.
          Nothing is filed or sent on your behalf until a human pro has
          reviewed and signed off.
        </p>
      </div>

      <PostMatterForm areas={areas} />
    </div>
  );
}
