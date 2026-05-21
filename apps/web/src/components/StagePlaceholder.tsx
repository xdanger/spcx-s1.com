interface StagePlaceholderProps {
  id: number;
  title: string;
  phase: string;
}

export const StagePlaceholder = ({ id, title, phase }: StagePlaceholderProps) => (
  <section
    id={`stage-${String(id)}`}
    aria-labelledby={`stage-${String(id)}-title`}
    className="flex min-h-screen items-center px-6 py-28"
  >
    <div className="mx-auto w-full max-w-5xl">
      <p className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-teal">
        Stage {String(id).padStart(2, "0")}
      </p>
      <h2 id={`stage-${String(id)}-title`} className="mt-4 text-4xl font-semibold">
        {title}
      </h2>
      <p className="mt-4 max-w-prose text-muted-white">Coming in {phase}</p>
    </div>
  </section>
);
