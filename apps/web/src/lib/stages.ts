// Stage manifest used by the chapter index, the page-level renderer
// map, and the StagePlaceholder fallback. Titles are NOT held here —
// they live in `lib/uiStrings.ts` under `stage.title.N` so there is one
// canonical English source per title and one zh value to fill in PR B.
// Components look up titles via `useUiString(stageTitleId(id))`.
export const STAGES = [
  { id: 0, phase: "Phase 1" },
  { id: 1, phase: "Phase 3" },
  { id: 2, phase: "Phase 2" },
  { id: 3, phase: "Phase 2" },
  { id: 4, phase: "Phase 2" },
  { id: 5, phase: "Phase 3" },
  { id: 6, phase: "Phase 2" },
  { id: 7, phase: "Phase 2" },
  { id: 8, phase: "Phase 2" },
  { id: 9, phase: "Phase 3" },
  { id: 10, phase: "Phase 1" },
] as const;
