"use client";

import { useUiString } from "../../hooks/useLocalized";

// Bypasses the persistent shell controls (chapter index, toggles,
// etc.) and lands focus directly inside the main reading flow. The
// link is `sr-only` until focused — at which point the visible styles
// kick in for keyboard navigators. Lives in the Shell folder so it
// ships alongside the rest of the persistent UI controls.
export const SkipLink = () => {
  const label = useUiString("shell.skip-to-main");
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-body-white focus:px-4 focus:py-2 focus:font-telemetry focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-space-black"
    >
      {label}
    </a>
  );
};
