import { AI_DISCLAIMER } from "@/lib/constants";

export default function AiDisclaimer() {
  return (
    <div className="rounded-2xl bg-neutral-200 px-6 py-5 text-sm text-neutral-600">
      <p className="font-medium text-neutral-700">AI Disclaimer</p>
      <p className="mt-1 leading-relaxed">{AI_DISCLAIMER}</p>
    </div>
  );
}
