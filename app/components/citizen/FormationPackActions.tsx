"use client";

import { useState } from "react";

interface Props {
  filename: string;
  pack: string;
  sha256: string;
  proposedName?: string | null;
  jurisdiction: string;
  professionalName?: string | null;
}

export default function FormationPackActions({
  filename,
  pack,
  sha256,
  proposedName,
  jurisdiction,
  professionalName,
}: Props) {
  const [copied, setCopied] = useState(false);

  function download() {
    const blob = new Blob([pack], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copy() {
    await navigator.clipboard.writeText(pack);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const emailSubject = encodeURIComponent(
    `Formation pack for ${proposedName || "NewCo"} — ${jurisdiction} sign-off requested`,
  );
  const emailBody = encodeURIComponent(
    [
      professionalName ? `Hi ${professionalName},` : "Hi,",
      "",
      `Please find attached the draft formation pack for ${proposedName || "my new company"}.`,
      "It has been reviewed and released through Marco Reid. The sha256 fingerprint below is tamper-evidence — if the document is altered after release, the hash will not match.",
      "",
      `sha256: ${sha256}`,
      "",
      "I'd appreciate your review and any local filings that need to be executed.",
      "",
      "Thanks,",
    ].join("\n"),
  );
  const mailto = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={download}
        className="rounded-lg bg-navy-700 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-800"
      >
        Download pack (.md)
      </button>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-xs font-semibold text-navy-700 hover:bg-navy-50"
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
      <a
        href={mailto}
        className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-xs font-semibold text-navy-700 hover:bg-navy-50"
      >
        Email to attorney &rarr;
      </a>
    </div>
  );
}
