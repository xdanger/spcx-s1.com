"use client";

import { useUIStore, type Locale } from "../../stores/uiStore";

export const Controls = () => {
  const audioOn = useUIStore((state) => state.audioOn);
  const sourceVisible = useUIStore((state) => state.sourceVisible);
  const locale = useUIStore((state) => state.locale);
  const toggleAudio = useUIStore((state) => state.toggleAudio);
  const toggleSource = useUIStore((state) => state.toggleSource);
  const setLocale = useUIStore((state) => state.setLocale);
  const openModal = useUIStore((state) => state.openModal);

  const nextLocale: Locale = locale === "en" ? "zh" : "en";

  return (
    <div className="fixed bottom-4 right-4 z-40 flex gap-2">
      <button
        type="button"
        aria-pressed={sourceVisible}
        aria-label={sourceVisible ? "Hide source references" : "Show source references"}
        onClick={toggleSource}
        className="h-10 w-10 border border-white/25 bg-panel-black font-telemetry text-sm text-body-white hover:border-accent-teal"
      >
        S
      </button>
      <button
        type="button"
        aria-pressed={audioOn}
        aria-label={audioOn ? "Turn audio off" : "Turn audio on"}
        onClick={toggleAudio}
        className="h-10 w-10 border border-white/25 bg-panel-black font-telemetry text-sm text-body-white hover:border-accent-teal"
      >
        ♪
      </button>
      <button
        type="button"
        aria-label={`Switch language to ${nextLocale === "en" ? "English" : "Chinese"}`}
        onClick={() => {
          setLocale(nextLocale);
        }}
        className="h-10 min-w-14 border border-white/25 bg-panel-black px-2 font-telemetry text-xs text-body-white hover:border-accent-teal"
      >
        {locale === "en" ? "EN" : "中"}
      </button>
      <button
        type="button"
        aria-label="Reopen mission briefing"
        onClick={openModal}
        className="h-10 w-10 border border-white/25 bg-panel-black font-telemetry text-sm text-body-white hover:border-accent-teal"
      >
        i
      </button>
    </div>
  );
};
