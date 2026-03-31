"use client";

import { useInView } from "./useInView";

interface MockupRevealProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function MockupReveal({
  children,
  className = "",
  glowColor = "rgba(16, 185, 129, 0.08)",
}: MockupRevealProps) {
  const { ref, isInView } = useInView(0.15);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Glow halo */}
      <div
        className="pointer-events-none absolute -inset-12 rounded-3xl blur-3xl transition-opacity duration-1000"
        style={{
          backgroundColor: glowColor,
          opacity: isInView ? 1 : 0,
        }}
      />
      {/* Mockup with 3D perspective entrance */}
      <div
        className="relative"
        style={{
          transform: isInView
            ? "perspective(1200px) rotateX(0deg) scale(1)"
            : "perspective(1200px) rotateX(8deg) scale(0.92)",
          opacity: isInView ? 1 : 0,
          transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
