import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeamPanel from "./TeamPanel";

export const dynamic = "force-dynamic";

function planSeatLimit(priceId: string | null | undefined): {
  label: string;
  seats: number | "Unlimited";
} {
  if (!priceId) return { label: "No plan", seats: 1 };
  const id = priceId.toLowerCase();
  if (id.includes("starter")) return { label: "Starter", seats: 1 };
  if (id.includes("professional")) return { label: "Professional", seats: 3 };
  if (id.includes("firm") || id.includes("enterprise"))
    return { label: "Firm", seats: "Unlimited" };
  return { label: "Active plan", seats: 1 };
}

export default async function TeamSettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/team");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      stripePriceId: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const limit = planSeatLimit(user.stripePriceId);

  return (
    <TeamPanel
      planLabel={limit.label}
      seatsLabel={typeof limit.seats === "number" ? `${limit.seats}` : limit.seats}
      currentMember={{
        name: user.name ?? user.email,
        email: user.email,
        role: user.role,
        joined: user.createdAt.toISOString(),
      }}
    />
  );
}
