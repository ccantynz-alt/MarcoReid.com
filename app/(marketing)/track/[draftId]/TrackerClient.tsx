"use client";

import dynamic from "next/dynamic";
import type { ApplicationTrackerProps } from "@/app/components/marketing/ApplicationTracker";

const ApplicationTracker = dynamic(
  () => import("@/app/components/marketing/ApplicationTracker"),
  { ssr: false },
);

export default function TrackerClient(props: ApplicationTrackerProps) {
  return <ApplicationTracker {...props} />;
}
