import type { Manifest } from "./schema";
import { SOURCE_FILE } from "./source";

export type SourceManifest = Manifest & {
  sourceLineCount: number;
};

export const sourceManifest: SourceManifest = {
  sourceFile: SOURCE_FILE,
  sourceSha256: "eb4d32cdf86b76a2504ba02cd92b68357b94b4bbd729548d85853a4742d56380",
  // 16,211 = the actual programmatic line count (`text.split('\n').length`).
  // The file has no trailing newline so `wc -l` reports 16,210 (it counts
  // newline characters, not lines). 16,211 is what rule 3 in the validator
  // checks against, so the manifest must match it.
  sourceLineCount: 16211,
  generatedAt: "2026-05-21T00:00:00.000Z",
  totals: {
    nodes: 0,
    perStage: {},
  },
};

export const manifest = sourceManifest;
