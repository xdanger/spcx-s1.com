import type { Locale } from "../stores/uiStore";

// Central registry of UI strings that are not part of the S-1 content
// layer — button labels, aria descriptions, modal copy, stage titles,
// etc. Keyed by dot-separated id. PR A seeds the en values from the
// existing component literals; PR B populates the zh values. An empty
// zh string falls back to en at render time.
//
// Proper nouns (SpaceX, S-1, T-minus, Stage NN labels) stay in English
// across locales — they have no zh override here, the en value is the
// shared display.

interface UiStringEntry {
  en: string;
  zh: string;
}

const stageTitle = (en: string): UiStringEntry => ({ en, zh: "" });

export const UI_STRINGS = {
  "shell.brand": { en: "SpaceX S-1", zh: "SpaceX S-1" },
  "shell.tminus.aria": { en: "T minus", zh: "" },
  "shell.chapters.label": { en: "Chapters", zh: "" },
  "shell.chapters.nav-aria": { en: "Chapter index", zh: "" },
  "shell.controls.source.show": { en: "Show source references", zh: "" },
  "shell.controls.source.hide": { en: "Hide source references", zh: "" },
  "shell.controls.audio.on": { en: "Turn audio on", zh: "" },
  "shell.controls.audio.off": { en: "Turn audio off", zh: "" },
  "shell.controls.locale.to-en": { en: "Switch language to English", zh: "" },
  "shell.controls.locale.to-zh": { en: "Switch language to Chinese", zh: "" },
  "shell.controls.reopen-briefing": { en: "Reopen mission briefing", zh: "" },

  "stage0.title": { en: "Mission Briefing", zh: "" },
  "stage0.dismiss": { en: "Begin", zh: "" },
  "stage0.intro": {
    en: "This stage opens as a modal on first visit and remains reachable from the information control.",
    zh: "",
  },

  "stage.title.0": stageTitle("Mission Briefing"),
  "stage.title.1": stageTitle("Cold Open"),
  "stage.title.2": stageTitle("Who We Are"),
  "stage.title.3": stageTitle("The Three Pillars"),
  "stage.title.4": stageTitle("The Algorithm"),
  "stage.title.5": stageTitle("The Roadmap"),
  "stage.title.6": stageTitle("The Numbers"),
  "stage.title.7": stageTitle("The Anomaly Log"),
  "stage.title.8": stageTitle("Who Steers the Ship"),
  "stage.title.9": stageTitle("The Horizon"),
  "stage.title.10": stageTitle("End Credits"),
} as const satisfies Record<string, UiStringEntry>;

export type UiStringId = keyof typeof UI_STRINGS;

export const uiString = (id: UiStringId, locale: Locale): string => {
  const entry = UI_STRINGS[id];
  if (locale === "zh" && entry.zh.trim().length > 0) return entry.zh;
  return entry.en;
};

// Narrowed signature: only stage ids the registry actually defines are
// accepted. Catches the case where a future contributor extends STAGES
// without adding the corresponding `stage.title.N` entry — TypeScript
// will reject the call instead of bouncing through an `as UiStringId`
// cast that crashes `uiString()` with `Cannot read properties of
// undefined` when ChapterIndex enumerates the stage.
type StageTitleKey = Extract<UiStringId, `stage.title.${number}`>;
export type StageWithTitle = StageTitleKey extends `stage.title.${infer N extends number}`
  ? N
  : never;

export const stageTitleId = (id: StageWithTitle): StageTitleKey =>
  `stage.title.${String(id)}` as StageTitleKey;
