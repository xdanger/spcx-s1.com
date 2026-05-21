"use client";

import { useUIStore } from "../stores/uiStore";

export const useReducedMotion = (): boolean => useUIStore((state) => state.reducedMotion);
