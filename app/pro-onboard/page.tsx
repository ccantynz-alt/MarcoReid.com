import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import ProOnboardForm from "@/app/components/pro/ProOnboardForm";

export const metadata = {
  title: "Join the marketplace — Marco Reid",
  description:
    "Professional onboarding for verified NZ and AU lawyers and chartered accountants.",
};

export const dynamic = "force-dynamic";

export default async function ProOnboardPage() {
  const userId = await getUserId();
  if (!userId) {
    redirect("/login?callbackUrl=/pro-onboard");
  }

  const existing = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, verifiedAt: true },
  });
  if (existing) {
    redirect("/pro-dashboard");
  }

  const areas = await prisma.practiceArea.findMany({
    where: { active: true },
    orderBy: [{ priority: "desc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      jurisdiction: true,
      domain: true,
      summary: true,
    },
  });

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="border-b border-navy-100 bg-white">
        <div className="gold-divider" />
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl text-navy-500">
            <span className="text-gold-500">&diams;</span>
            Marco Reid
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Professional onboarding
          </p>
          <h1 className="mt-3 font-serif text-4xl text-navy-800">
            Apply to join the marketplace.
          </h1>
          <p className="mt-4 text-navy-500">
            After you submit, a Marco Reid admin checks your admission with
            your professional body and confirms your PI insurance is
            current. We&rsquo;ll email you when your account is approved —
            usually within three working days.
          </p>
        </div>

        <ProOnboardForm areas={areas} />
      </main>
    </div>
  );
}
