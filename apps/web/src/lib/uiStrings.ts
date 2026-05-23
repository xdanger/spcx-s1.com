import type { Locale } from "../stores/uiStore";

// Central registry of UI strings that are not part of the S-1 content
// layer — button labels, aria descriptions, modal copy, stage titles,
// etc. Keyed by dot-separated id. An empty zh string falls back to en
// at render time, so stages whose translation pass hasn't landed yet
// keep rendering English in the zh locale without crashing.
//
// Proper-noun rules from docs/voice-and-visual.md: SpaceX, Falcon 9,
// Dragon, Starlink, Starshield, COLOSSUS, Grok, xAI, Macrohard,
// Terafab, NASA, FCC, FAA, etc. stay in English inside the Chinese
// string. The Stage NN telemetry chip is rendered via `shell.stage-prefix`
// plus a zero-padded number so locale switching threads through every
// stage eyebrow.

interface UiStringEntry {
  en: string;
  zh: string;
}

const stageTitle = (en: string, zh: string): UiStringEntry => ({ en, zh });

export const UI_STRINGS = {
  "shell.brand": { en: "SpaceX S-1", zh: "SpaceX S-1" },
  "shell.tminus.aria": { en: "T minus", zh: "T 减" },
  "shell.chapters.label": { en: "Chapters", zh: "章节" },
  "shell.chapters.nav-aria": { en: "Chapter index", zh: "章节索引" },
  "shell.controls.source.show": { en: "Show source references", zh: "显示来源引用" },
  "shell.controls.source.hide": { en: "Hide source references", zh: "隐藏来源引用" },
  "shell.controls.audio.on": { en: "Turn audio on", zh: "开启声音" },
  "shell.controls.audio.off": { en: "Turn audio off", zh: "关闭声音" },
  "shell.controls.locale.to-en": { en: "Switch language to English", zh: "切换至英文" },
  "shell.controls.locale.to-zh": { en: "Switch language to Chinese", zh: "切换至中文" },
  "shell.controls.reopen-briefing": { en: "Reopen mission briefing", zh: "重新打开任务简报" },

  "shell.stage-prefix": { en: "Stage", zh: "阶段" },

  "stage0.dismiss": { en: "Begin", zh: "开始" },
  "stage0.intro": {
    en: "This stage opens as a modal on first visit and remains reachable from the information control.",
    zh: "首次访问时本阶段以弹窗形式打开，之后亦可通过信息按钮再次进入。",
  },

  "stage4.algorithm.callout": { en: "The Algorithm", zh: "算法准则" },

  "stage.title.0": stageTitle("Mission Briefing", "任务简报"),
  "stage.title.1": stageTitle("Cold Open", "开场"),
  "stage.title.2": stageTitle("Who We Are", "我们是谁"),
  "stage.title.3": stageTitle("The Three Pillars", "三大支柱"),
  "stage.title.4": stageTitle("The Algorithm", "算法准则"),
  "stage.title.5": stageTitle("The Roadmap", "路线图"),
  "stage.title.6": stageTitle("The Numbers", "数字"),
  "stage.title.7": stageTitle("The Anomaly Log", "异常日志"),
  "stage.title.8": stageTitle("Who Steers the Ship", "由谁掌舵"),
  "stage.title.9": stageTitle("The Horizon", "远景"),
  "stage.title.10": stageTitle("End Credits", "片尾字幕"),
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

// Renders the "Stage NN" telemetry chip used as each stage's eyebrow.
// The prefix word is localised through `shell.stage-prefix`; the number
// is zero-padded and stays language-neutral so the JetBrains-Mono
// tabular column stays aligned in both locales.
export const stageEyebrow = (id: number, locale: Locale): string => {
  const prefix = uiString("shell.stage-prefix", locale);
  return `${prefix} ${String(id).padStart(2, "0")}`;
};
