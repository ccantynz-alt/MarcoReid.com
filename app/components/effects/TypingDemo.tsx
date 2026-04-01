"use client";

import { useState, useEffect } from "react";

const phrases = [
  "Schedule a call with Patricia Thornton, Thursday at two pm.",
  "Log four point five hours on the Rodriguez H-1B matter.",
  "Ask the Oracle — California non-compete enforceability.",
  "Draft a response to Marcus regarding the filing deadline.",
  "Send the engagement letter to Chen for e-signature.",
  "What are the tax implications of this corporate structure?",
];

export default function TypingDemo({ className = "" }: { className?: string }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), 40 + Math.random() * 30);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      const timer = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => setCharIndex((c) => c - 1), 20);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
    }
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className={className}>
      <span className="text-navy-700">
        {phrases[phraseIndex].substring(0, charIndex)}
      </span>
      <span className="typing-cursor ml-0.5 inline-block h-5 w-0.5 bg-forest-500" />
    </div>
  );
}
