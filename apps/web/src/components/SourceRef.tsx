"use client";

import type { SourceRef as SourceRefType } from "@spcx/content";

import { useUIStore } from "../stores/uiStore";

interface SourceRefProps {
  source: SourceRefType | null;
}

export const SourceRef = ({ source }: SourceRefProps) => {
  const visible = useUIStore((state) => state.sourceVisible);

  if (!visible || !source) {
    return null;
  }

  return (
    <p className="mt-3 font-telemetry text-xs text-muted-white">
      {source.file}:{source.lineStart}-{source.lineEnd}
    </p>
  );
};
