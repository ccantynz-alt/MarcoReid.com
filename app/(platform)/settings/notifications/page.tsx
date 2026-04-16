import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotificationsForm from "./NotificationsForm";

export const dynamic = "force-dynamic";

export default async function NotificationsSettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/notifications");
  }

  // Defaults — once the NotificationPreferences model exists, hydrate from DB.
  return <NotificationsForm />;
}
