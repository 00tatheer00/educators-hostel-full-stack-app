"use client";

import React, { useEffect, useState } from "react";

export function GlobalMouseSpotlight() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!mousePos) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Primary High-Gloss Ambient Spotlight Follower */}
      <div
        className="absolute rounded-full blur-[120px] transition-transform duration-75 ease-out will-change-transform"
        style={{
          width: "600px",
          height: "600px",
          transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`,
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.14) 0%, rgba(99, 102, 241, 0.12) 35%, rgba(6, 182, 212, 0.06) 70%, transparent 100%)",
        }}
      />

      {/* Secondary Inner Core Sparkle Glow */}
      <div
        className="absolute rounded-full blur-[60px] transition-transform duration-100 ease-out will-change-transform"
        style={{
          width: "240px",
          height: "240px",
          transform: `translate3d(${mousePos.x - 120}px, ${mousePos.y - 120}px, 0)`,
          background:
            "radial-gradient(circle, rgba(244, 114, 182, 0.18) 0%, rgba(168, 85, 247, 0.12) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
