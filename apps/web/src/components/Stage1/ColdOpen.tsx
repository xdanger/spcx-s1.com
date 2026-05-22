import type { ContentNode } from "@spcx/content";

import { ColdOpenInner } from "./ColdOpenInner";

interface ColdOpenProps {
  nodes: ContentNode[];
}

// The Stage 1 source range (l.577–580) ends with the attribution line
// "— Elon Musk". `splitQuote` separates that from the running body and
// throws if the shape changes — mirroring the missing-node invariant
// below so content drift fails loud at build/render time instead of
// silently substituting a hardcoded author name.
const ATTRIBUTION_LEAD = /^[—–]\s+/; // em-dash or en-dash + space

const splitQuote = (raw: string): { body: string; attribution: string } => {
  const lines = raw
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error(
      "Stage 1: Musk quote source must have at least two lines (body + attribution)",
    );
  }

  const last = lines[lines.length - 1];
  if (!ATTRIBUTION_LEAD.test(last)) {
    throw new Error(
      `Stage 1: Musk quote attribution line must start with an em-dash, got: ${JSON.stringify(last)}`,
    );
  }

  const body = lines.slice(0, -1).join(" ").replace(/\s+/g, " ").trim();
  return { body, attribution: last };
};

export const ColdOpen = ({ nodes }: ColdOpenProps) => {
  const muskQuote = nodes.find((node) => node.id === "stage1.cold-open.musk-quote");
  if (!muskQuote) {
    throw new Error("Stage 1: missing Musk quote content node");
  }

  const { body, attribution } = splitQuote(muskQuote.text.en);

  return <ColdOpenInner body={body} attribution={attribution} source={muskQuote.source} />;
};
