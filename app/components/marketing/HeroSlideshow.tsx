"use client";

import { useState, useEffect, useCallback } from "react";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Sparkles from "@/app/components/effects/Sparkles";

interface Slide {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  features: string[];
  cta: { label: string; href: string };
  glowColor: string;
  glowColor2?: string;
  accentColor: string;
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

  // Auto-advance
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
    <section className="relative flex min-h-screen items-center overflow-hidden" aria-label="Product showcase">
      {/* Background glows — change per slide */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-1000">
        <div
          className="absolute left-1/2 top-1/3 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] animate-glow-pulse transition-colors duration-1000"
          style={{ backgroundColor: slide.glowColor }}
        />
        {slide.glowColor2 && (
          <div
            className="absolute bottom-1/4 right-1/4 h-[400px] w-[500px] rounded-full blur-[140px] animate-glow-pulse transition-colors duration-1000"
            style={{ backgroundColor: slide.glowColor2, animationDelay: "2s" }}
          />
        )}
      </div>

      <Sparkles />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Slide content */}
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text content */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(30px)" : "translateY(0)",
            }}
          >
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: slide.accentColor + "50",
                backgroundColor: slide.accentColor + "10",
                color: slide.accentColor,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: slide.accentColor }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: slide.accentColor }}
                />
              </span>
              {slide.eyebrow}
            </span>

            {/* Title */}
            <h1 className="mt-6 text-display-xl font-serif leading-[0.95]">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              {slide.subtitle}
            </p>

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {slide.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-surface-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* CTA */}
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
                ? "perspective(1200px) rotateY(-10deg) scale(0.9)"
                : "perspective(1200px) rotateY(0deg) scale(1)",
            }}
          >
            {slide.mockup}
          </div>
        </div>

        {/* Slide indicators + nav */}
        <div className="mt-16 flex items-center gap-6 lg:mt-20">
          {/* Progress dots */}
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative min-h-touch min-w-touch flex items-center justify-center"
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
              >
                <div className="h-1.5 w-8 overflow-hidden rounded-full bg-surface-border">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "100%" : "0%",
                      backgroundColor: i === current ? slide.accentColor : "transparent",
                      transition: i === current ? `width ${SLIDE_DURATION}ms linear` : "width 300ms",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Slide labels */}
          <div className="hidden items-center gap-6 sm:flex">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`min-h-touch text-xs font-medium uppercase tracking-wider transition-colors ${
                  i === current ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {s.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
