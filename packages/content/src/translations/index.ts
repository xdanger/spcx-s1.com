import { zhTranslations } from "./zh";

export { zhTranslations };

// Returns the Chinese translation for a node id, or undefined when the
// registry has no entry. Empty strings count as "no translation" so a
// blank entry behaves the same as an omitted key — this keeps the
// rule 12 error surface consistent.
export const getZh = (id: string): string | undefined => {
  const value = zhTranslations[id];
  if (typeof value !== "string") return undefined;
  return value.trim().length > 0 ? value : undefined;
};

export const missingZhIds = (ids: readonly string[]): string[] =>
  ids.filter((id) => getZh(id) === undefined);

// Keys in the zh registry that don't match any known node id — usually
// a typo in the stage prefix or slug. Without this check, a typo would
// silently leave the real id untranslated while the orphan entry
// lingers forever. The known-id set is passed in (rather than imported
// from `../index`) to keep this module free of a circular dependency
// with the all-nodes barrel.
export const orphanZhKeys = (knownIds: ReadonlySet<string>): string[] =>
  Object.keys(zhTranslations).filter((key) => !knownIds.has(key));
