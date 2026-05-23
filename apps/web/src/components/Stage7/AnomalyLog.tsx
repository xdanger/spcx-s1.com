"use client";

import type { ContentNode, RiskCategory } from "@spcx/content";

import { useLocale, useUiString } from "../../hooks/useLocalized";
import { dualText } from "../../lib/localized";
import { cleanProse } from "../../lib/textHelpers";
import type { UiStringId } from "../../lib/uiStrings";
import { SourceRef } from "../SourceRef";
import { StageSection } from "../StageSection";

interface AnomalyLogProps {
  nodes: ContentNode[];
}

// Maps a node id to its locale-aware short title. Falls back to the
// node id itself so a typo surfaces visibly instead of crashing the
// row. The same `useUiString` lookup powers every other registered
// label in this stage.
const TITLE_KEY_BY_NODE_ID: Partial<Record<string, UiStringId>> = {
  "stage7.summary.principal-risk-factors": "stage7.title.summary.principal-risk-factors",
  "stage7.taxonomy.mission-starship": "stage7.title.taxonomy.mission-starship",
  "stage7.taxonomy.regulatory-approvals": "stage7.title.taxonomy.regulatory-approvals",
  "stage7.taxonomy.operational-space-systems":
    "stage7.title.taxonomy.operational-space-systems",
  "stage7.taxonomy.sector-ai-infrastructure": "stage7.title.taxonomy.sector-ai-infrastructure",
  "stage7.taxonomy.financial-capital-markets":
    "stage7.title.taxonomy.financial-capital-markets",
  "stage7.taxonomy.governance-ownership": "stage7.title.taxonomy.governance-ownership",
  "stage7.highlight.in-orbit-satellites-uninsured":
    "stage7.title.highlight.in-orbit-satellites-uninsured",
  "stage7.highlight.no-key-person-insurance-musk":
    "stage7.title.highlight.no-key-person-insurance-musk",
  "stage7.highlight.musk-not-full-time": "stage7.title.highlight.musk-not-full-time",
  "stage7.highlight.musk-senior-advisor": "stage7.title.highlight.musk-senior-advisor",
  "stage7.highlight.cursor-fees": "stage7.title.highlight.cursor-fees",
  "stage7.highlight.tesla-macrohard-terafab-unfinalized":
    "stage7.title.highlight.tesla-macrohard-terafab-unfinalized",
  "stage7.caveat.commercial-viability-crosslink":
    "stage7.title.caveat.commercial-viability-crosslink",
};

const CATEGORY_KEY: Record<RiskCategory, UiStringId> = {
  mission: "stage7.category.mission",
  operational: "stage7.category.operational",
  regulatory: "stage7.category.regulatory",
  financial: "stage7.category.financial",
  governance: "stage7.category.governance",
  "sector-ai": "stage7.category.sector-ai",
};

const CATEGORY_ORDER: RiskCategory[] = [
  "mission",
  "operational",
  "regulatory",
  "financial",
  "governance",
  "sector-ai",
];

type Severity = NonNullable<NonNullable<ContentNode["risk"]>["severity"]>;
const SEVERITY_KEY: Record<Severity, UiStringId> = {
  low: "stage7.severity.low",
  medium: "stage7.severity.medium",
  high: "stage7.severity.high",
  critical: "stage7.severity.critical",
};

const RiskCard = ({ node, dense = false }: { node: ContentNode; dense?: boolean }) => {
  const risk = node.risk;
  const locale = useLocale();
  const severityAriaPrefix = useUiString("stage7.severity.aria-prefix");
  const titleKey = TITLE_KEY_BY_NODE_ID[node.id];
  const title = useUiString(titleKey ?? "stage7.title.caveat.commercial-viability-crosslink");
  const severityLabel = useUiString(
    risk?.severity ? SEVERITY_KEY[risk.severity] : "stage7.severity.low",
  );
  const { primary, secondary } = dualText(node, locale);

  return (
    <details className="border border-white/10 bg-panel-black/60">
      <summary className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 hover:bg-white/[0.04]">
        {risk?.severity ? (
          <span
            aria-label={`${severityAriaPrefix} ${severityLabel}`}
            className="font-telemetry text-[10px] uppercase tracking-[0.16em] text-accent-coral"
          >
            {severityLabel}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <span className={dense ? "text-sm text-body-white" : "text-base text-body-white"}>
          {titleKey ? title : node.id}
        </span>
        {risk?.category ? (
          <span className="font-telemetry text-[10px] uppercase tracking-[0.16em] text-muted-white">
            {risk.category}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
      </summary>
      <div className="border-t border-white/10 px-5 py-4">
        <pre className="whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
          {cleanProse(primary)}
        </pre>
        {secondary ? (
          <pre
            lang="zh"
            className="mt-4 whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
          >
            {cleanProse(secondary)}
          </pre>
        ) : null}
        <SourceRef source={node.source} />
      </div>
    </details>
  );
};

const CategoryGroup = ({
  category,
  items,
}: {
  category: RiskCategory;
  items: ContentNode[];
}) => {
  const label = useUiString(CATEGORY_KEY[category]);
  if (items.length === 0) return null;
  return (
    <div>
      <p className="font-telemetry text-[11px] uppercase tracking-[0.18em] text-muted-white">
        {label}
      </p>
      <div className="mt-3 space-y-3">
        {items.map((node) => (
          <RiskCard key={node.id} node={node} dense />
        ))}
      </div>
    </div>
  );
};

export const AnomalyLog = ({ nodes }: AnomalyLogProps) => {
  const locale = useLocale();
  const principalHeading = useUiString("stage7.section.principal-risk-factors.heading");
  const principalSummary = useUiString("stage7.section.principal-risk-factors.summary");
  const highlightedHeading = useUiString("stage7.section.highlighted-disclosures.heading");
  const highlightedLede = useUiString("stage7.section.highlighted-disclosures.lede");
  const taxonomyHeading = useUiString("stage7.section.risk-taxonomy.heading");
  const crosslinkEyebrow = useUiString("stage7.caveat.crosslink.eyebrow");
  const crosslinkTitle = useUiString("stage7.caveat.crosslink.title");

  const summary = nodes.find((node) => node.id === "stage7.summary.principal-risk-factors");
  const highlights = nodes.filter((node) => node.tags?.includes("highlighted-disclosure"));
  const taxonomy = nodes.filter((node) => node.id.startsWith("stage7.taxonomy."));
  const caveat = nodes.find(
    (node) => node.id === "stage7.caveat.commercial-viability-crosslink",
  );
  const summaryDual = summary ? dualText(summary, locale) : null;
  const caveatDual = caveat ? dualText(caveat, locale) : null;

  const byCategory = new Map<RiskCategory, ContentNode[]>();
  for (const node of taxonomy) {
    const category = node.risk?.category;
    if (!category) continue;
    const existing = byCategory.get(category) ?? [];
    existing.push(node);
    byCategory.set(category, existing);
  }

  return (
    <StageSection id={7}>
      <div className="space-y-16">
        {summary && summaryDual ? (
          <section aria-labelledby="stage-7-summary-title">
            <h3
              id="stage-7-summary-title"
              className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-coral"
            >
              {principalHeading}
            </h3>
            <details className="mt-4 border border-white/10 bg-panel-black/60">
              <summary className="cursor-pointer px-5 py-4 font-telemetry text-xs uppercase tracking-[0.16em] text-body-white hover:text-accent-coral">
                {principalSummary}
              </summary>
              <div className="border-t border-white/10 px-5 py-4">
                <pre className="whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
                  {cleanProse(summaryDual.primary)}
                </pre>
                {summaryDual.secondary ? (
                  <pre
                    lang="zh"
                    className="mt-4 whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
                  >
                    {cleanProse(summaryDual.secondary)}
                  </pre>
                ) : null}
                <SourceRef source={summary.source} />
              </div>
            </details>
          </section>
        ) : null}

        <section aria-labelledby="stage-7-highlighted-title">
          <h3
            id="stage-7-highlighted-title"
            className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-coral"
          >
            {highlightedHeading}
          </h3>
          <p className="mt-3 max-w-[68ch] text-sm text-muted-white">{highlightedLede}</p>
          <div className="mt-6 space-y-3">
            {highlights.map((node) => (
              <RiskCard key={node.id} node={node} />
            ))}
          </div>
        </section>

        <section aria-labelledby="stage-7-taxonomy-title">
          <h3
            id="stage-7-taxonomy-title"
            className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-coral"
          >
            {taxonomyHeading}
          </h3>
          <div className="mt-6 space-y-8">
            {CATEGORY_ORDER.map((category) => (
              <CategoryGroup
                key={category}
                category={category}
                items={byCategory.get(category) ?? []}
              />
            ))}
          </div>
        </section>

        {caveat && caveatDual ? (
          <section
            aria-labelledby="stage-7-caveat-title"
            className="border-l-2 border-accent-amber bg-panel-black/40 p-6"
          >
            <p className="font-telemetry text-[11px] uppercase tracking-[0.18em] text-accent-amber">
              {crosslinkEyebrow}
            </p>
            <h3
              id="stage-7-caveat-title"
              className="mt-3 text-2xl font-semibold text-body-white"
            >
              {crosslinkTitle}
            </h3>
            <pre className="mt-5 whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
              {cleanProse(caveatDual.primary)}
            </pre>
            {caveatDual.secondary ? (
              <pre
                lang="zh"
                className="mt-4 whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
              >
                {cleanProse(caveatDual.secondary)}
              </pre>
            ) : null}
            <SourceRef source={caveat.source} />
          </section>
        ) : null}
      </div>
    </StageSection>
  );
};
