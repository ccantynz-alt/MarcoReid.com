"use client";

import { useInView } from "./useInView";

interface MockupRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function MockupReveal({
  children,
  className = "",
}: MockupRevealProps) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: isInView
            ? "perspective(1200px) rotateX(0deg) scale(1)"
            : "perspective(1200px) rotateX(6deg) scale(0.95)",
          opacity: isInView ? 1 : 0,
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
