"use client";

import { useEffect } from "react";

import { useUIStore } from "../../stores/uiStore";
import { ChapterIndex } from "./ChapterIndex";
import { Controls } from "./Controls";
import { TMinusBar } from "./TMinusBar";

export const Shell = () => {
  const locale = useUIStore((state) => state.locale);
  const hydrateReducedMotion = useUIStore((state) => state.hydrateReducedMotion);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => hydrateReducedMotion(), [hydrateReducedMotion]);

  return (
    <>
      <TMinusBar />
      <ChapterIndex />
      <Controls />
    </>
  );
};
