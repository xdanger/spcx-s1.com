import type { ContentNode } from "@spcx/content";

import type { Locale } from "../stores/uiStore";

export interface DualText {
  // The string to render in the main slot. Equal to text.en in en locale,
  // or when zh translation is missing; equal to text.zh in zh locale for
  // non-verbatim nodes; equal to text.en for verbatim nodes in zh locale
  // (the English original always wins the primary slot).
  primary: string;
  // The string to render as a visually subordinate secondary slot. Only
  // populated for verbatim nodes in zh locale when a Chinese translation
  // exists — the bilingual rendering rule from docs/voice-and-visual.md
  // (English original on top, Chinese translation beneath).
  secondary: string | undefined;
}

const hasContent = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

// Pure function form — useful in non-hook contexts (server components,
// tests, parsers). React components should prefer the useDualText hook
// below which threads the locale from the UI store.
export const dualText = (node: ContentNode, locale: Locale): DualText => {
  const en = node.text.en;
  const zh = node.text.zh;

  if (locale === "en" || !hasContent(zh)) {
    return { primary: en, secondary: undefined };
  }

  if (node.verbatim) {
    return { primary: en, secondary: zh };
  }

  return { primary: zh, secondary: undefined };
};

// Returns the single string that should feed parsers — parseList,
// parseGroupedList, splitQuote, cleanProse — that consume structural
// markers (bullets, em-dashes, paragraph breaks) and emit per-item
// pieces for rendering. In `zh` locale this prefers `text.zh` when
// present, regardless of `node.verbatim`: if a list node is rendered
// only through its parsed items, falling back to English would mean
// the visible cards stay English even after the zh registry lands.
// Translators must preserve the source's structural shape in the zh
// string for list-kind nodes (the markdown markers are language-neutral)
// so the parser produces the same item count. For verbatim quote/prose
// rendered directly without a parser, callers should use `dualText`
// instead — that path still surfaces the English original on top with
// the Chinese translation beneath per docs/voice-and-visual.md.
export const primaryText = (node: ContentNode, locale: Locale): string => {
  const zh = node.text.zh;
  if (locale === "zh" && hasContent(zh)) return zh;
  return node.text.en;
};
