"use client";

import type { ContentNode } from "@spcx/content";

import { useLocale, useUiString } from "../../hooks/useLocalized";
import { dualText } from "../../lib/localized";
import { reflowProse } from "../../lib/textHelpers";
import type { UiStringId } from "../../lib/uiStrings";
import { SourceRef } from "../SourceRef";
import { StageSection } from "../StageSection";

interface WhoSteersProps {
  nodes: ContentNode[];
}

interface BlockSpec {
  id: string;
  labelKey: UiStringId;
  descriptionKey?: UiStringId;
}

// Each governance block pulls its label and (optional) description from
// the locale-aware uiStrings registry instead of hard-coding English
// here. The id field still drives node lookup.
const BLOCK_ORDER: BlockSpec[] = [
  {
    id: "stage8.governance.founder",
    labelKey: "stage8.block.founder.label",
    descriptionKey: "stage8.block.founder.description",
  },
  {
    id: "stage8.governance.dual-class",
    labelKey: "stage8.block.dual-class.label",
    descriptionKey: "stage8.block.dual-class.description",
  },
  {
    id: "stage8.governance.texas-forum",
    labelKey: "stage8.block.texas-forum.label",
    descriptionKey: "stage8.block.texas-forum.description",
  },
  {
    id: "stage8.governance.musk-dependency",
    labelKey: "stage8.block.musk-dependency.label",
  },
  {
    id: "stage8.governance.related-party-transactions",
    labelKey: "stage8.block.related-party-transactions.label",
  },
  {
    id: "stage8.governance.related-party-business-detail",
    labelKey: "stage8.block.related-party-business-detail.label",
  },
];

interface GovernanceBlockProps {
  node: ContentNode;
  spec: BlockSpec;
  index: number;
}

const GovernanceBlock = ({ node, spec, index }: GovernanceBlockProps) => {
  const locale = useLocale();
  const label = useUiString(spec.labelKey);
  const description = useUiString(spec.descriptionKey ?? "stage8.block.musk-dependency.label");
  const readVerbatim = useUiString("stage8.summary.read-verbatim");
  const { primary, secondary } = dualText(node, locale);

  return (
    <article
      aria-labelledby={`${spec.id}-title`}
      className="border-l border-accent-blue/40 pl-6"
    >
      <p className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-blue">
        {String(index + 1).padStart(2, "0")} — {label}
      </p>
      <h3
        id={`${spec.id}-title`}
        className="mt-3 text-2xl font-semibold text-body-white sm:text-3xl"
      >
        {label}
      </h3>
      {spec.descriptionKey ? (
        <p className="mt-3 max-w-[68ch] text-sm text-muted-white">{description}</p>
      ) : null}
      <details className="group mt-5 border-t border-white/10 pt-5">
        <summary className="cursor-pointer font-telemetry text-xs uppercase tracking-[0.16em] text-muted-white hover:text-accent-blue">
          {readVerbatim}
        </summary>
        <div className="mt-4">
          <pre className="whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
            {reflowProse(primary)}
          </pre>
          {secondary ? (
            <pre
              lang="zh"
              className="mt-4 whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
            >
              {reflowProse(secondary)}
            </pre>
          ) : null}
          <SourceRef source={node.source} />
        </div>
      </details>
    </article>
  );
};

export const WhoSteers = ({ nodes }: WhoSteersProps) => {
  const blocks = BLOCK_ORDER.map((spec) => ({
    spec,
    node: nodes.find((node) => node.id === spec.id),
  })).filter((entry): entry is { spec: BlockSpec; node: ContentNode } => Boolean(entry.node));

  return (
    <StageSection id={8}>
      <div className="space-y-8">
        {blocks.map(({ spec, node }, index) => (
          <GovernanceBlock key={spec.id} spec={spec} node={node} index={index} />
        ))}
      </div>
    </StageSection>
  );
};
