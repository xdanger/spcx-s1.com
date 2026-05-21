"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Locale = "en" | "zh";

interface UIState {
  locale: Locale;
  audioOn: boolean;
  sourceVisible: boolean;
  modalOpen: boolean;
  modalDismissed: boolean;
  chapterIndexOpen: boolean;
  reducedMotion: boolean;
  scrollProgress: number;
  setLocale: (locale: Locale) => void;
  toggleAudio: () => void;
  toggleSource: () => void;
  openModal: () => void;
  dismissModal: () => void;
  toggleChapterIndex: () => void;
  setChapterIndexOpen: (open: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setScrollProgress: (progress: number) => void;
  hydrateReducedMotion: () => () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      locale: "en",
      audioOn: false,
      sourceVisible: false,
      modalOpen: true,
      modalDismissed: false,
      chapterIndexOpen: false,
      reducedMotion: false,
      scrollProgress: 0,
      setLocale: (locale) => set({ locale }),
      toggleAudio: () => set((state) => ({ audioOn: !state.audioOn })),
      toggleSource: () => set((state) => ({ sourceVisible: !state.sourceVisible })),
      openModal: () => set({ modalOpen: true }),
      dismissModal: () => set({ modalOpen: false, modalDismissed: true }),
      toggleChapterIndex: () => set((state) => ({ chapterIndexOpen: !state.chapterIndexOpen })),
      setChapterIndexOpen: (open) => set({ chapterIndexOpen: open }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      setScrollProgress: (progress) =>
        set({ scrollProgress: Math.min(1, Math.max(0, progress)) }),
      hydrateReducedMotion: () => {
        if (typeof window === "undefined") {
          return () => undefined;
        }

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => set({ reducedMotion: media.matches });
        update();
        media.addEventListener("change", update);

        return () => {
          media.removeEventListener("change", update);
        };
      },
    }),
    {
      name: "spcx-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locale: state.locale,
        audioOn: state.audioOn,
        sourceVisible: state.sourceVisible,
        modalDismissed: state.modalDismissed,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.modalDismissed) {
          state.modalOpen = false;
        }
      },
    },
  ),
);
