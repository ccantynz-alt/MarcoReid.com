"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-[slideUp_0.4s_ease-out]"
      style={{
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="bg-navy-800 text-white rounded-t-xl px-6 py-4 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          We use essential cookies to make Marco Reid work. We do not use
          tracking cookies or sell your data.
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/privacy"
            className="text-sm text-white underline underline-offset-2 hover:text-gray-300 transition-colors"
          >
            Learn more
          </Link>
          <button
            onClick={handleAccept}
            className="bg-white text-navy-800 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
