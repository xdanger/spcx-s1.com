"use client";

import { useStageEyebrow, useUiString } from "../hooks/useLocalized";
import { stageTitleId, type StageWithTitle } from "../lib/uiStrings";

interface StagePlaceholderProps {
  id: StageWithTitle;
  phase: string;
}

export const StagePlaceholder = ({ id, phase }: StagePlaceholderProps) => {
  const title = useUiString(stageTitleId(id));
  const eyebrow = useStageEyebrow(id);
  return (
    <section
      id={`stage-${String(id)}`}
      aria-labelledby={`stage-${String(id)}-title`}
      className="flex min-h-screen items-center px-6 py-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-teal">
          {eyebrow}
        </p>
        <h2 id={`stage-${String(id)}-title`} className="mt-4 text-4xl font-semibold">
          {title}
        </h2>
        <p className="mt-4 max-w-prose text-muted-white">Coming in {phase}</p>
      </div>
    </section>
  );
};
