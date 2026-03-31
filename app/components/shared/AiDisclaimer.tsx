import { AI_DISCLAIMER } from "@/lib/constants";

export default function AiDisclaimer() {
  return (
    <div className="rounded-lg border border-navy-100 bg-navy-50 p-4 text-sm text-navy-400">
      <p className="font-semibold text-navy-500">AI Disclaimer</p>
      <p className="mt-1">{AI_DISCLAIMER}</p>
    </div>
  );
}
