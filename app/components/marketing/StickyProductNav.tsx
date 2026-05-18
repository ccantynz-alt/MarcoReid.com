"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  accent: "navy" | "forest" | "plum" | "gold";
}

const ITEMS: NavItem[] = [
  { id: "law", label: "Legal", accent: "forest" },
  { id: "marco", label: "Marco", accent: "plum" },
  { id: "voice", label: "Voice", accent: "navy" },
  { id: "courtroom", label: "Courtroom", accent: "plum" },
  { id: "accounting", label: "Accounting", accent: "forest" },
];

const accentClasses = {
  navy: { dot: "bg-navy-500", ring: "ring-navy-500" },
  forest: { dot: "bg-forest-500", ring: "ring-forest-500" },
  plum: { dot: "bg-plum-500", ring: "ring-plum-500" },
  gold: { dot: "bg-gold-400", ring: "ring-gold-400" },
};

/**
 * Sticky vertical navigator pinned to the right of the home page.
 * Tracks the currently visible product section and lets the reader
 * jump between them. Hidden on small screens because there is no
 * useful place to put it without crowding the content.
 */
export default function StickyProductNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Product sections"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          const a = accentClasses[item.accent];
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group relative flex items-center justify-end gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-navy-800/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 ${
                    isActive ? "opacity-100" : ""
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    isActive ? `${a.dot} scale-150 ring-2 ring-offset-2 ${a.ring}` : "bg-navy-300"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
