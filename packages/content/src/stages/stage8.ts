import { sourceNode } from "./utils";

export const stage8Nodes = [
  sourceNode({
    id: "stage8.governance.founder",
    stage: 8,
    kind: "prose",
    lineStart: 1195,
    lineEnd: 1224,
    sectionTitle: "Founder and Controlled Company",
  }),
  sourceNode({
    id: "stage8.governance.musk-dependency",
    stage: 8,
    kind: "risk",
    lineStart: 3197,
    lineEnd: 3218,
    sectionTitle: "Risk Factors",
    risk: { category: "governance", severity: "high" },
  }),
  sourceNode({
    id: "stage8.governance.dual-class",
    stage: 8,
    kind: "prose",
    lineStart: 3254,
    lineEnd: 3300,
    sectionTitle: "Controlled Company",
  }),
  sourceNode({
    id: "stage8.governance.texas-forum",
    stage: 8,
    kind: "prose",
    lineStart: 3420,
    lineEnd: 3434,
    sectionTitle: "Forum Selection",
  }),
  sourceNode({
    id: "stage8.governance.related-party-transactions",
    stage: 8,
    kind: "prose",
    lineStart: 1148,
    lineEnd: 1194,
    sectionTitle: "Certain Relationships and Related Person Transactions",
  }),
  sourceNode({
    id: "stage8.governance.related-party-business-detail",
    stage: 8,
    kind: "prose",
    lineStart: 14383,
    lineEnd: 14454,
    sectionTitle: "Notes to Consolidated Financial Statements",
  }),
];
