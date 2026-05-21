import type { ContentNode } from "../schema";
import { sourceRef, textFromSource } from "../source";
import { authoredNode, slugify, sourceNode } from "./utils";

interface GlossaryRange {
  term: string;
  lineStart: number;
  lineEnd: number;
}

const glossaryRanges = (): GlossaryRange[] => {
  const ranges: GlossaryRange[] = [];
  let current: GlossaryRange | undefined;

  for (let line = 280; line <= 565; line += 1) {
    const source = sourceRef(line);
    const text = textFromSource(source).trim();
    const match = /^-\s+“\s?([^”]+)”/.exec(text);

    if (match) {
      if (current) {
        ranges.push(current);
      }

      current = {
        term: match[1].trim(),
        lineStart: line,
        lineEnd: line,
      };
      continue;
    }

    if (!current) {
      continue;
    }

    if (/^(v|vi|vii|viii|ix|x)$/.test(text) || text === "Our Satellite Names") {
      ranges.push(current);
      current = undefined;
      continue;
    }

    if (text.length === 0) {
      current.lineEnd = line - 1;
      ranges.push(current);
      current = undefined;
      continue;
    }

    current.lineEnd = line;
  }

  if (current) {
    ranges.push(current);
  }

  return ranges;
};

const glossaryNodes = (): ContentNode[] =>
  glossaryRanges().map(({ term, lineStart, lineEnd }) =>
    sourceNode({
      id: `stage10.glossary.${slugify(term)}`,
      stage: 10,
      kind: "glossary",
      lineStart,
      lineEnd,
      sectionTitle: "Glossary",
      glossary: { term },
    }),
  );

export const stage10Nodes = [
  authoredNode(
    "stage10.credits.authorship",
    10,
    "SpaceX S-1 Interactive is a fan-made project by Kros Dai.",
  ),
  authoredNode(
    "stage10.credits.license",
    10,
    "Code is released under the MIT License. The S-1 source is a public SEC filing.",
  ),
  authoredNode("stage10.credits.github", 10, "Source: https://github.com/xdanger/spcx-s1.com", [
    "github",
  ]),
  authoredNode("stage10.credits.contact", 10, "Contact: y@dai.co", ["contact"]),
  sourceNode({
    id: "stage10.caveat.forward-looking-statements",
    stage: 10,
    kind: "caveat",
    lineStart: 3502,
    lineEnd: 3573,
    sectionTitle: "Cautionary Statement Regarding Forward-Looking Statements",
    tags: ["verbatim-required"],
  }),
  ...glossaryNodes(),
];
