"use client";

import { useEffect, useRef, useState } from "react";

import { BGM, SFX, STAGE_1_TTS } from "../../lib/audioManifest";
import { useUIStore } from "../../stores/uiStore";

// Mounts the playback layer once per session. Splits sources into two
// owners so policy stays simple:
//
//   - The BGM `<audio>` is created on mount, paused, and only resumes
//     once the user opts in via the shell toggle AND the page is not
//     under `prefers-reduced-motion: reduce`. It loops indefinitely
//     and survives across stage scrolls.
//   - Per-stage SFX cues fire from IntersectionObservers attached to
//     the matching section id. Each cue only plays once per session
//     (tracked by a separate "played" set, distinct from the cache of
//     `<audio>` elements so re-enabling audio after a brief opt-out
//     re-arms the observer instead of being silently skipped).
//
// The mobile gate (`max-width: 768px`) suppresses SFX entirely so
// shared-context readers don't get sudden bursts; BGM is the floor
// because users opted into "audio on" knowingly. The gate is tracked
// reactively via matchMedia so a viewport resize or rotation flips
// behavior without waiting for the next store change.
//
// Files referenced here live under `apps/web/public/audio/` and ride
// alongside the static export. The component renders nothing — it is
// a side-effect orchestrator only.

const MOBILE_QUERY = "(max-width: 768px)";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (typeof window.matchMedia !== "function") return undefined;

    const media = window.matchMedia(MOBILE_QUERY);
    setIsMobile(media.matches);

    const update = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
};

const observeStageEnter = (stageId: string, onEnter: () => void): (() => void) => {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return () => undefined;
  }
  const target = document.getElementById(stageId);
  if (!target) return () => undefined;

  let fired = false;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          observer.disconnect();
          onEnter();
        }
      }
    },
    { threshold: 0.35 },
  );
  observer.observe(target);
  return () => {
    observer.disconnect();
  };
};

export const AudioController = () => {
  const audioOn = useUIStore((state) => state.audioOn);
  const ttsOn = useUIStore((state) => state.ttsOn);
  const reducedMotion = useUIStore((state) => state.reducedMotion);
  const hasHydrated = useUIStore((state) => state.hasHydrated);
  const isMobile = useIsMobile();

  // BGM owns its own audio element so re-renders don't reset playback
  // position. SFX cache lives in a ref keyed by cue id — distinct
  // from `sfxPlayedRef`, which tracks "this cue has fired in this
  // session" so a brief audio toggle off/on doesn't permanently
  // silence the cue.
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const sfxPlayedRef = useRef<Set<string>>(new Set());
  const ttsRef = useRef<HTMLAudioElement | null>(null);
  const ttsPlayedRef = useRef(false);

  // BGM lifecycle: lazy-create on first opt-in, then play/pause
  // against the same instance so toggling doesn't reset playback
  // position. The lazy-create matters because audio is off by default
  // site-wide (AGENTS.md §3) — eagerly constructing the element with
  // `preload="auto"` would silently download the ~3-minute MP3 for
  // every first-time visitor who never asked for audio. We also
  // re-read `prefers-reduced-motion` directly from `matchMedia` here
  // instead of trusting the store's `reducedMotion` flag, because the
  // store starts at `false` and only flips after `hydrateReducedMotion`
  // runs — a one-render race where a reduced-motion user with audio
  // already persisted on could briefly hear BGM start.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!hasHydrated) return undefined;

    const reducedMotionNow =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : reducedMotion;

    const shouldPlay = audioOn && !reducedMotionNow;

    if (!shouldPlay) {
      // Don't even allocate the element; if we previously did, pause it.
      bgmRef.current?.pause();
      return undefined;
    }

    if (!bgmRef.current) {
      const el = new Audio();
      el.src = BGM.src;
      el.loop = BGM.loop;
      el.volume = BGM.gain;
      el.preload = "auto";
      bgmRef.current = el;
    }

    const el = bgmRef.current;
    // `.play()` may reject if the browser blocks autoplay before a
    // user gesture. Swallow the rejection — the user already opted
    // in by clicking the toggle, so a missed start is a no-op.
    void el.play().catch(() => undefined);

    return () => {
      el.pause();
    };
  }, [audioOn, reducedMotion, hasHydrated]);

  // Stage-1 SFX: fires once per session when Stage 1 scrolls into
  // view, gated on audio being on, not reduced-motion, and not
  // mobile. Important: the observer attaches every time the gates
  // flip on — opting out then back in re-arms the observer without
  // losing the cue (only `sfxPlayedRef` is the permanent latch).
  useEffect(() => {
    if (!hasHydrated) return undefined;
    if (!audioOn || reducedMotion || isMobile) return undefined;

    const cue = SFX["stage1.cold-open"];
    if (!cue) return undefined;
    if (sfxPlayedRef.current.has(cue.id)) return undefined;

    let el = sfxRef.current.get(cue.id);
    if (!el) {
      el = new Audio();
      el.src = cue.src;
      el.volume = cue.gain;
      el.preload = "auto";
      sfxRef.current.set(cue.id, el);
    }

    const audioEl = el;
    return observeStageEnter("stage-1", () => {
      sfxPlayedRef.current.add(cue.id);
      void audioEl.play().catch(() => undefined);
    });
  }, [audioOn, reducedMotion, isMobile, hasHydrated]);

  // Optional Stage 1 TTS narration. Independent of the main SFX cue;
  // fires only when the reader has explicitly opted in via the shell.
  // Same mobile / reduced-motion gates apply. The cleanup pauses the
  // element (not just the observer) so toggling `audioOn`, `ttsOn`,
  // or reduced-motion mid-playback actually stops the audio.
  useEffect(() => {
    if (!hasHydrated) return undefined;
    if (!audioOn || !ttsOn || reducedMotion || isMobile) return undefined;
    if (ttsPlayedRef.current) return undefined;

    if (!ttsRef.current) {
      const el = new Audio();
      el.src = STAGE_1_TTS.src;
      el.volume = STAGE_1_TTS.gain;
      el.preload = "auto";
      ttsRef.current = el;
    }

    const el = ttsRef.current;
    const cleanupObserver = observeStageEnter("stage-1", () => {
      ttsPlayedRef.current = true;
      void el.play().catch(() => undefined);
    });

    return () => {
      cleanupObserver();
      el.pause();
    };
  }, [audioOn, ttsOn, reducedMotion, isMobile, hasHydrated]);

  return null;
};
