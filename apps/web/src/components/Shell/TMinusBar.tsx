"use client";

import { useEffect } from "react";

import { useUIStore } from "../../stores/uiStore";

const START_SECONDS = 11 * 60;

const formatCountdown = (seconds: number): string => {
  const bounded = Math.max(0, Math.round(seconds));
  const hours = Math.floor(bounded / 3600);
  const minutes = Math.floor((bounded % 3600) / 60);
  const remainingSeconds = bounded % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
};

export const TMinusBar = () => {
  const progress = useUIStore((state) => state.scrollProgress);
  const setScrollProgress = useUIStore((state) => state.setScrollProgress);
  const countdown = formatCountdown(START_SECONDS * (1 - progress));

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [setScrollProgress]);

  return (
    <div className="fixed left-0 right-0 top-0 z-40 h-7 bg-space-black/95">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px bg-accent-teal"
        style={{ width: `${String(progress * 100)}%` }}
      />
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 font-telemetry text-[11px] uppercase tracking-[0.18em] text-muted-white">
        <span>SpaceX S-1</span>
        <span aria-label={`T minus ${countdown}`}>T - {countdown}</span>
      </div>
    </div>
  );
};
