"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/app/components/shared/Button";

interface Slide {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  features: string[];
  cta: { label: string; href: string };
  accentClass: string;
  badgeBg: string;
  badgeText: string;
  mockup: React.ReactNode;
}

const SLIDE_DURATION = 7000;

export default function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 400);
    },
    [current, isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 400);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen pt-28 pb-20 sm:pt-36 lg:pt-40" aria-label="Product showcase">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-50/50 to-white" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(20px)" : "translateY(0)",
            }}
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider ${slide.badgeBg} ${slide.badgeText}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {slide.eyebrow}
            </span>

            <h1 className="mt-6 text-hero font-serif text-navy-800">
              {slide.title}
            </h1>

            <p className="mt-6 max-w-md text-subhead text-navy-400">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {slide.features.map((f) => (
                <span
                  key={f}
                  className="rounded-lg border border-navy-100 bg-white px-3 py-1.5 text-xs font-medium text-navy-500 shadow-card"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Button href={slide.cta.href} size="lg">
                {slide.cta.label}
              </Button>
            </div>
          </div>

          {/* Right: mockup */}
          <div
            className="hidden lg:block transition-all duration-700"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning
                ? "translateX(40px) scale(0.96)"
                : "translateX(0) scale(1)",
            }}
          >
            {slide.mockup}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex items-center gap-6 lg:mt-20">
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative min-h-touch min-w-touch flex items-center justify-center"
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
              >
                <div className="h-1.5 w-10 overflow-hidden rounded-full bg-navy-100">
                  <div
                    className="h-full rounded-full bg-navy-500 transition-all"
                    style={{
                      width: i === current ? "100%" : "0%",
                      transition: i === current ? `width ${SLIDE_DURATION}ms linear` : "width 300ms",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`min-h-touch text-xs font-semibold tracking-wider transition-colors ${
                  i === current ? "text-navy-700" : "text-navy-300 hover:text-navy-500"
                }`}
              >
                {s.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
