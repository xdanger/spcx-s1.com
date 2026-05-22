"use client";

import { useLocale, useUiString } from "../../hooks/useLocalized";
import { STAGES } from "../../lib/stages";
import { stageTitleId, uiString } from "../../lib/uiStrings";
import { useUIStore } from "../../stores/uiStore";

export const ChapterIndex = () => {
  const open = useUIStore((state) => state.chapterIndexOpen);
  const toggle = useUIStore((state) => state.toggleChapterIndex);
  const setOpen = useUIStore((state) => state.setChapterIndexOpen);
  const reducedMotion = useUIStore((state) => state.reducedMotion);
  const locale = useLocale();
  const navAria = useUiString("shell.chapters.nav-aria");
  const chaptersLabel = useUiString("shell.chapters.label");

  const jumpTo = (id: number) => {
    document
      .getElementById(`stage-${String(id)}`)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setOpen(false);
  };

  return (
    <nav
      aria-label={navAria}
      className="fixed bottom-4 left-4 z-40 max-w-[min(22rem,calc(100vw-2rem))]"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="chapter-index-list"
        onClick={toggle}
        className="border border-white/25 bg-panel-black px-3 py-2 font-telemetry text-xs uppercase tracking-[0.16em] text-body-white"
      >
        {chaptersLabel}
      </button>
      {open ? (
        <ol
          id="chapter-index-list"
          className="mt-2 max-h-[55vh] overflow-auto border border-white/15 bg-panel-black p-2"
        >
          {STAGES.map((stage) => (
            <li key={stage.id}>
              <button
                type="button"
                onClick={() => {
                  jumpTo(stage.id);
                }}
                className="grid w-full grid-cols-[3rem_1fr] gap-3 px-2 py-2 text-left text-sm text-body-white hover:bg-white/10"
              >
                <span className="font-telemetry text-muted-white">
                  {String(stage.id).padStart(2, "0")}
                </span>
                <span>{uiString(stageTitleId(stage.id), locale)}</span>
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </nav>
  );
};
