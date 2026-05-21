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
});
