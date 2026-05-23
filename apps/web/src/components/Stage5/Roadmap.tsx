"use client";

import type { ContentNode } from "@spcx/content";

import { useLocale, useStageEyebrow, useUiString } from "../../hooks/useLocalized";
import { dualText, primaryText } from "../../lib/localized";
import { reflowProse } from "../../lib/textHelpers";
import { parseGroupedList } from "../../lib/groupedList";
import { SourceRef } from "../SourceRef";
import { RoadmapCinematic } from "./RoadmapCinematic";

interface RoadmapProps {
  nodes: ContentNode[];
}

const GROUP_ACCENT: Record<string, string> = {
  Space: "text-accent-blue",
  Connectivity: "text-accent-teal",
  AI: "text-accent-green",
  "Future Markets": "text-accent-amber",
};

export const Roadmap = ({ nodes }: RoadmapProps) => {
  const locale = useLocale();
  const title = useUiString("stage.title.5");
  const eyebrow = useStageEyebrow(5);
  const whyNowEyebrow = useUiString("stage5.why-now.eyebrow");
  const growthHeading = useUiString("stage5.growth.heading");
  const growthFallback = useUiString("stage5.growth.fallback");
  const futureMarketsHeading = useUiString("stage5.future-markets.heading");
  const growthDetailSummary = useUiString("stage5.growth-detail.summary");
  const caveatEyebrow = useUiString("stage5.caveat.eyebrow");
  const caveatTitle = useUiString("stage5.caveat.title");
  const whyNow = nodes.find((node) => node.id === "stage5.roadmap.why-now");
  const growthSummary = nodes.find((node) => node.id === "stage5.roadmap.growth-summary");
  const growthDetail = nodes.find((node) => node.id === "stage5.roadmap.growth-detail");
  const futureMarkets = nodes.find((node) => node.id === "stage5.roadmap.future-markets");
  const caveat = nodes.find((node) => node.id === "stage5.caveat.commercial-viability");

  const whyNowDual = whyNow ? dualText(whyNow, locale) : null;
  const growthDetailDual = growthDetail ? dualText(growthDetail, locale) : null;
  const caveatDual = caveat ? dualText(caveat, locale) : null;

  const groups = growthSummary ? parseGroupedList(primaryText(growthSummary, locale)) : [];
  const futureMarketGroup = futureMarkets
    ? parseGroupedList(primaryText(futureMarkets, locale))
    : [];
  const futureMarketItems = futureMarketGroup[0]?.items ?? [];

  return (
    <section
      id="stage-5"
      aria-labelledby="stage-5-title"
      className="relative isolate border-t border-white/5 bg-space-black px-6 py-28"
    >
      <RoadmapCinematic />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-blue">
          {eyebrow}
        </p>
        <h2
          id="stage-5-title"
          className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl"
        >
          {title}
        </h2>
        <div className="mt-12 space-y-16">
          {whyNow && whyNowDual ? (
            <article className="max-w-[68ch] space-y-4">
              <p className="font-telemetry text-[11px] uppercase tracking-[0.18em] text-accent-blue">
                {whyNowEyebrow}
              </p>
              <pre className="whitespace-pre-wrap font-body text-base leading-7 text-body-white">
                {reflowProse(whyNowDual.primary)}
              </pre>
              {whyNowDual.secondary ? (
                <pre
                  lang="zh"
                  className="whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
                >
                  {reflowProse(whyNowDual.secondary)}
                </pre>
              ) : null}
              <SourceRef source={whyNow.source} />
            </article>
          ) : null}

          {groups.length > 0 ? (
            <section aria-labelledby="stage-5-growth-title" className="space-y-6">
              <h3
                id="stage-5-growth-title"
                className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-blue"
              >
                {growthHeading}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {groups.map((group) => (
                  <div
                    key={group.heading || "group"}
                    className="border border-white/10 bg-panel-black/60 p-5 backdrop-blur-sm"
                  >
                    <p
                      className={`font-telemetry text-[11px] uppercase tracking-[0.18em] ${
                        GROUP_ACCENT[group.heading] ?? "text-muted-white"
                      }`}
                    >
                      {group.heading || growthFallback}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item, idx) => (
                        <li
                          key={`${group.heading}-${String(idx)}`}
                          className="flex gap-3 text-sm leading-6 text-body-white"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[10px] h-[3px] w-[10px] shrink-0 bg-white/40"
                          />
                          <span>{item.title ? `${item.title}. ${item.body}` : item.body}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {growthSummary ? <SourceRef source={growthSummary.source} /> : null}
            </section>
          ) : null}

          {futureMarketItems.length > 0 ? (
            <section aria-labelledby="stage-5-future-title" className="space-y-6">
              <h3
                id="stage-5-future-title"
                className="font-telemetry text-xs uppercase tracking-[0.18em] text-accent-amber"
              >
                {futureMarketsHeading}
              </h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {futureMarketItems.map((item, idx) => (
                  <li
                    key={`fm-${String(idx)}`}
                    className="border border-white/10 bg-panel-black/40 p-4 text-sm leading-6 text-muted-white backdrop-blur-sm"
                  >
                    <span className="block text-body-white">{item.title ?? item.body}</span>
                    {item.title ? (
                      <span className="mt-2 block text-xs leading-5">{item.body}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
              {futureMarkets ? <SourceRef source={futureMarkets.source} /> : null}
            </section>
          ) : null}

          {growthDetail && growthDetailDual ? (
            <details className="border border-white/10 bg-panel-black/60 backdrop-blur-sm">
              <summary className="cursor-pointer px-5 py-4 font-telemetry text-xs uppercase tracking-[0.16em] text-body-white hover:text-accent-blue">
                {growthDetailSummary}
              </summary>
              <div className="border-t border-white/10 px-5 py-5">
                <pre className="whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
                  {reflowProse(growthDetailDual.primary)}
                </pre>
                {growthDetailDual.secondary ? (
                  <pre
                    lang="zh"
                    className="mt-4 whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
                  >
                    {reflowProse(growthDetailDual.secondary)}
                  </pre>
                ) : null}
                <SourceRef source={growthDetail.source} />
              </div>
            </details>
          ) : null}

          {caveat && caveatDual ? (
            <section
              aria-labelledby="stage-5-caveat-title"
              className="border-l-2 border-accent-amber bg-panel-black/60 p-6 backdrop-blur-sm"
            >
              <p className="font-telemetry text-[11px] uppercase tracking-[0.18em] text-accent-amber">
                {caveatEyebrow}
              </p>
              <h3
                id="stage-5-caveat-title"
                className="mt-3 text-2xl font-semibold text-body-white"
              >
                {caveatTitle}
              </h3>
              <pre className="mt-5 whitespace-pre-wrap font-body text-sm leading-7 text-muted-white">
                {reflowProse(caveatDual.primary)}
              </pre>
              {caveatDual.secondary ? (
                <pre
                  lang="zh"
                  className="mt-4 whitespace-pre-wrap border-l border-white/15 pl-3 font-body text-sm leading-7 text-muted-white/80"
                >
                  {reflowProse(caveatDual.secondary)}
                </pre>
              ) : null}
              <SourceRef source={caveat.source} />
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
};
