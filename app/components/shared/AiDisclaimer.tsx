import { AI_DISCLAIMER } from "@/lib/constants";

export default function AiDisclaimer() {
  return (
    <div className="rounded-xl border border-navy-100 bg-navy-50 px-6 py-5 text-sm">
      <p className="font-semibold text-navy-600">AI Disclaimer</p>
      <p className="mt-1 leading-relaxed text-navy-400">{AI_DISCLAIMER}</p>
    </div>
  );
}
