import { parseList, type ParsedListItem } from "./textHelpers";

export interface ParsedGroup {
  heading: string;
  items: ParsedListItem[];
}

// Headings in the S-1 growth-summary are short title-case section
// names: "Space", "Connectivity", "AI", "Future Markets". Also accept
// the Han-script equivalents that PR B will introduce — `空间`,
// `连接性`, `未来市场` — so the zh translation doesn't collapse the
// four pillared groups into one anonymous fallback card.
// Cap length tightly and disallow commas so a wrapped bullet body like
// "Starship, enabling passengers..." can't pass. The `nextNonEmptyIsBullet`
// lookahead in `parseGroupedList` still gates the heading classification
// on the following line being an actual bullet, so this regex only
// needs to recognize the shape.
const HEADING_PATTERN = /^[A-Z\p{Script=Han}][\p{Script=Han}A-Za-z &/()-]{0,29}$/u;
const TRAILING_PUNCTUATION = /[.:。：]$/;

const isHeadingShape = (line: string): boolean =>
  HEADING_PATTERN.test(line) && !TRAILING_PUNCTUATION.test(line);

const parseBullet = (line: string): { marker: string; body: string } | null => {
  const match = /^\s*([-*•]|\d{1,2}\.)\s+(.*)$/.exec(line);
  if (!match) return null;
  return { marker: match[1], body: match[2].trim() };
};

// Title separator: ASCII period + space (en source convention) or
// full-width Chinese period (`。`), which traditionally has no
// trailing space. Accepting both lets the eyebrow/body split still
// fire after the zh registry lands.
const TITLE_SPLIT_EN = /^([^.]{2,80})\.\s+(.*)$/s;
const TITLE_SPLIT_ZH = /^([^。]{2,80})。\s*(.*)$/s;

const splitTitle = (body: string): { title: string | null; rest: string } => {
  const match = TITLE_SPLIT_EN.exec(body) ?? TITLE_SPLIT_ZH.exec(body);
  if (!match) return { title: null, rest: body };
  return { title: match[1].trim(), rest: match[2].trim() };
};

const sanitize = (lines: string[]): string[] =>
  lines.filter((line) => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !/^\d{1,3}$/.test(trimmed);
  });

// A short capitalized line should only be treated as a heading when
// the next non-empty line is itself a bullet. Without this lookahead
// a bullet that wraps onto a short capitalized fragment (e.g.
// "Starship", "Power generation") gets misclassified as a new
// heading and the remainder of the wrapped bullet body is lost.
const nextNonEmptyIsBullet = (lines: string[], fromIndex: number): boolean => {
  for (let j = fromIndex; j < lines.length; j += 1) {
    const next = lines[j].trim();
    if (!next) continue;
    return parseBullet(lines[j]) !== null;
  }
  return false;
};

export const parseGroupedList = (text: string): ParsedGroup[] => {
  const lines = sanitize(text.split(/\r?\n/));
  const groups: ParsedGroup[] = [];
  let current: ParsedGroup | null = null;
  let pendingBullet: { marker: string; body: string } | null = null;

  const commitBullet = () => {
    if (!pendingBullet) return;
    // Bullets that appear before any heading land in an anonymous
    // group so they're not silently dropped. Without this, the
    // `current === null` early-return would lose data whenever the
    // source begins with bullets.
    if (!current) {
      current = { heading: "", items: [] };
      groups.push(current);
    }
    const { title, rest } = splitTitle(pendingBullet.body);
    current.items.push({
      marker: pendingBullet.marker,
      title,
      body: title ? rest : pendingBullet.body,
    });
    pendingBullet = null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();
    const bullet = parseBullet(line);

    if (bullet) {
      commitBullet();
      pendingBullet = bullet;
      continue;
    }

    if (isHeadingShape(trimmed) && nextNonEmptyIsBullet(lines, i + 1)) {
      commitBullet();
      current = { heading: trimmed, items: [] };
      groups.push(current);
      continue;
    }

    if (pendingBullet) {
      pendingBullet.body = `${pendingBullet.body} ${trimmed}`;
    }
  }

  commitBullet();

  // If no bullets were ever found, fall back to the simpler parser so
  // callers still get some structure out of the input.
  if (groups.length === 0) {
    const flat = parseList(text);
    if (flat.items.length > 0) {
      return [{ heading: "", items: flat.items }];
    }
  }

  return groups.filter((g) => g.items.length > 0);
};
