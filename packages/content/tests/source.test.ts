import { describe, expect, it } from "vitest";

import { sourceManifest } from "../src/manifest";
import { loadSource } from "../src/source";

describe("S-1 source snapshot", () => {
  it("exists, hashes, and has the expected line count", () => {
    const source = loadSource();

    expect(source.lines).toHaveLength(sourceManifest.sourceLineCount);
    expect(source.sha256).toBe(sourceManifest.sourceSha256);
  });
});
