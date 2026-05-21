import type { Manifest } from "./schema";
import { SOURCE_FILE } from "./source";

export type SourceManifest = Manifest & {
  sourceLineCount: number;
};

export const sourceManifest: SourceManifest = {
  sourceFile: SOURCE_FILE,
  sourceSha256: "eb4d32cdf86b76a2504ba02cd92b68357b94b4bbd729548d85853a4742d56380",
  sourceLineCount: 16210,
  generatedAt: "2026-05-21T00:00:00.000Z",
  totals: {
    nodes: 0,
    perStage: {},
  },
};

export const manifest = sourceManifest;
