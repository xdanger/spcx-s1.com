import { describe, expect, it } from "vitest";

import { ContentNode } from "../src/schema";

describe("ContentNode schema", () => {
  it("accepts a known-good authored node", () => {
    const parsed = ContentNode.safeParse({
      id: "stage0.test.good",
      stage: 0,
      kind: "authored",
      text: { en: "A known-good node." },
      verbatim: false,
      source: null,
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects a known-bad node", () => {
    const parsed = ContentNode.safeParse({
      id: "bad",
      stage: 99,
      kind: "prose",
      text: { en: "" },
      verbatim: true,
      source: null,
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects a node whose stage disagrees with its id prefix", () => {
    const parsed = ContentNode.safeParse({
      id: "stage6.financials.use-of-proceeds",
      stage: 7,
      kind: "caveat",
      text: { en: "mismatched node" },
      verbatim: true,
      source: {
        file: "sources/20260520_SpaceX_S-1_SEC-Filing.md",
        lineStart: 3575,
        lineEnd: 3601,
      },
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.some((i) => i.path.includes("stage"))).toBe(true);
    }
  });
});
