import { describe, expect, it } from "vitest";

import { parseList } from "./textHelpers";
import { parseGroupedList } from "./groupedList";

describe("parseList — title split", () => {
  it("splits the en title from the body when a period + space separates them", () => {
    const text = "1. Leverage capability. Push throughput up across the board.";
    const items = parseList(text).items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      title: "Leverage capability",
      body: "Push throughput up across the board.",
    });
  });

  it("splits the zh title from the body when a full-width period separates them", () => {
    const text = "1. 杠杆能力。在所有领域提升产能。";
    const items = parseList(text).items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      title: "杠杆能力",
      body: "在所有领域提升产能。",
    });
  });

  it("keeps a single zh sentence terminated by 。 in the body slot (regression: PR #6)", () => {
    // Before the empty-rest bail, TITLE_SPLIT_ZH's `\s*` allowed the
    // whole sentence to match as the title with rest === "", which
    // Algorithm.tsx then rendered as `title. ` — a spurious ASCII
    // period + space appended only in the zh locale.
    const text = "7. 产生可观的现金流并再投资于未来。";
    const items = parseList(text).items;
    expect(items).toHaveLength(1);
    expect(items[0].title).toBeNull();
    expect(items[0].body).toBe("产生可观的现金流并再投资于未来。");
  });

  it("leaves a single en sentence terminated by `.` in the body slot", () => {
    // The en regex requires `\s+` so this case was already safe, but
    // pin it explicitly so a future refactor that loosens the regex
    // doesn't reintroduce the same shape on the en side.
    const text = "7. Generate significant cash flow and reinvest in the future.";
    const items = parseList(text).items;
    expect(items).toHaveLength(1);
    expect(items[0].title).toBeNull();
    expect(items[0].body).toBe("Generate significant cash flow and reinvest in the future.");
  });
});

describe("parseGroupedList — title split parity", () => {
  it("keeps a single zh sentence terminated by 。 in the body slot", () => {
    const text = ["未来市场", "1. 月球经济。", "2. 全行星出行。"].join("\n");
    const groups = parseGroupedList(text);
    expect(groups).toHaveLength(1);
    expect(groups[0].heading).toBe("未来市场");
    expect(groups[0].items.map((item) => item.title)).toEqual([null, null]);
    expect(groups[0].items.map((item) => item.body)).toEqual(["月球经济。", "全行星出行。"]);
  });
});
