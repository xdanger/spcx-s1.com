import { sourceNode } from "./utils";

export const stage6Nodes = [
  sourceNode({
    id: "stage6.financials.summary-data",
    stage: 6,
    kind: "table",
    lineStart: 1412,
    lineEnd: 1556,
    sectionTitle: "Summary Historical Consolidated Financial and Operating Data",
  }),
  sourceNode({
    id: "stage6.financials.mda-results",
    stage: 6,
    kind: "prose",
    lineStart: 4885,
    lineEnd: 5371,
    sectionTitle: "Management's Discussion and Analysis",
  }),
  sourceNode({
    id: "stage6.financials.capitalization",
    stage: 6,
    kind: "table",
    lineStart: 3620,
    lineEnd: 3700,
    sectionTitle: "Capitalization",
  }),
  sourceNode({
    id: "stage6.financials.use-of-proceeds",
    stage: 6,
    kind: "prose",
    lineStart: 3575,
    lineEnd: 3601,
    sectionTitle: "Use of Proceeds",
    tags: ["verbatim-required"],
  }),
  sourceNode({
    id: "stage6.financials.dividend-policy",
    stage: 6,
    kind: "prose",
    lineStart: 3603,
    lineEnd: 3617,
    sectionTitle: "Dividend Policy",
    tags: ["verbatim-required"],
  }),
  sourceNode({
    id: "stage6.financials.segment-breakdown-2025",
    stage: 6,
    kind: "table",
    lineStart: 5210,
    lineEnd: 5371,
    sectionTitle: "Segment Results",
  }),
];
