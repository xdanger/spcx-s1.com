"use client";

import { useUiString } from "../../hooks/useLocalized";

// Stage 0's anchor section. Renders below the modal so the persistent
// chapter index has a scroll target and screen readers reach the same
// content from the document outline. Title + intro are sourced from the
// UI-string registry so locale toggling updates them in place.
export const Stage0Stub = () => {
  const title = useUiString("stage0.title");
  const intro = useUiString("stage0.intro");

  return (
    <section
      id="stage-0"
      aria-labelledby="stage-0-title"
      className="flex min-h-screen items-center px-6 py-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-teal">
          Stage 00
        </p>
        <h1 id="stage-0-title" className="mt-4 text-5xl font-semibold">
          {title}
        </h1>
        <p className="mt-6 max-w-prose text-muted-white">{intro}</p>
      </div>
    </section>
  );
};
