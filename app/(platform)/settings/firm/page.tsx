import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import FirmForm from "./FirmForm";

export const dynamic = "force-dynamic";

export default async function FirmSettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/firm");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { firmName: true },
  });

  return (
    <FirmForm
      initial={{
        firmName: user?.firmName ?? "",
        firmSize: "1",
        street: "",
        city: "",
        region: "",
        postalCode: "",
        country: "",
        website: "",
        phone: "",
        practiceAreas: [],
        defaultRateCents: 0,
      }}
    />
  );
}
