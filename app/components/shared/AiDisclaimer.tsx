import { AI_DISCLAIMER } from "@/lib/constants";

export default function AiDisclaimer() {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-raised px-6 py-5 text-sm">
      <p className="font-medium text-text-primary">AI Disclaimer</p>
      <p className="mt-1 leading-relaxed text-text-tertiary">
        {AI_DISCLAIMER}
      </p>
    </div>
  );
}
