# Phases

Five phases. Each phase ends with a deployable preview and a Kros
review checkpoint. Do not start Phase N+1 until Phase N is reviewed
and merged.

If time gets tight, **Phase 2 is the minimum viable site** — readable,
complete, and honest, even without 3D and audio polish.

---

## Phase 1 — Skeleton + content extraction

**Status:** done (2026-05-21). Awaiting Kros's review on PR #1.

Deliverables:

- [x] Workspace scaffolding (pnpm), MIT LICENSE
- [x] S-1 source file copied into `sources/` with SHA-256 captured
- [x] Agent-facing documentation (CLAUDE.md, AGENTS.md, docs/)
- [x] `packages/content/` — Zod schema, validator, Vitest suite
- [x] S-1 content extracted into stage files for **all 11 stages**
      (English required; Chinese stub allowed)
- [x] Validator wired into `pnpm -r build`
- [x] `apps/web/` — Next.js 15 + Tailwind v4 + Zustand
- [x] Persistent UI shell: T-minus bar, chapter index, source toggle,
      language toggle, audio toggle, `[ⓘ]` modal reopen — all wired to
      global Zustand state
- [x] Stage 0 modal (authored disclaimer, third-person)
- [x] Stage 10 (end credits, full glossary with search, verbatim
      Forward-Looking caveat)
- [x] Cloudflare Pages preview URL live
      (https://0c5fc859.spcx-s1.pages.dev, branch alias
      https://xdanger-claude-musing-gagari.spcx-s1.pages.dev)
- [x] Short summary in chat: stack chosen, repo path on disk, how to
      run locally, what's queued for Phase 2 (covered in the Phase 1
      PR thread; Phase 2 deliverables enumerated below)

**Out of scope for Phase 1:** Stages 1, 2, 3, 4, 5, 6, 7, 8, 9
rendering (Phase 2 + Phase 3); multilingual UI translation; share
cards; audio files; 3D. The data layer extracted in Phase 1 must
support all of them.

---

## Phase 2 — All static stages

**Status:** done (2026-05-21). Awaiting Kros's review.

Deliverables:

- [x] Stage 2 — Who We Are: KPI strip with scroll-triggered count-ups
      (mass to orbit / orbital launches / Starlink subscribers), founding
      prose, and the milestone timeline 2008-2026.
- [x] Stage 3 — The Three Pillars: Space, Connectivity, AI rendered as
      stacked sections; each pillar parses its bullet list into sub-product
      cards (Falcon 9, Dragon, Starlink Consumer/Enterprise/Government/
      Mobile, COLOSSUS, Grok, Macrohard) with an expandable business-detail
      `<details>` for the deep prose.
- [x] Stage 4 — The Algorithm: the seven-point Repeatable Business Model
      list plus the pulled-out five-step Algorithm quote at l.906.
- [x] Stage 6 — The Numbers: six new KPI nodes (Revenue 2023/2024/2025 +
      Net income (loss) 2023/2024/2025) with finance-convention rendering
      `$10,387` / `($4,937)`, verbatim Use of Proceeds and Dividend
      Policy callouts in amber, and four collapsible deep tables
      (Summary, MD&A, Capitalization, Segment 2025).
- [x] Stage 7 — The Anomaly Log: six highlighted disclosures pinned, full
      taxonomy by category (mission / operational / regulatory / financial
      / governance / sector-ai), each risk card expandable to its verbatim
      S-1 paragraph; commercial-viability caveat cross-linked at the
      bottom with `caveat:commercial-viability` tag.
- [x] Stage 8 — Who Steers the Ship: founder & controlled-company status,
      dual-class share structure, Texas reincorporation & forum, Musk
      dependency risk factor, related-party transactions (summary +
      financial-statement notes).
- [x] Shared `StageSection` wrapper + `textHelpers` lib (`parseList`,
      `cleanProse`, `parseNumericValue`, `formatNumericValue`) covering
      all six stages.
- [x] Stage 1 / 5 / 9 still render the Phase-3 placeholder.
- [x] Source toggle annotates every Phase 2 content block via
      `SourceRef`.
- [x] `pnpm -r build`, `pnpm lint`, `pnpm --filter @spcx/content test`
      all green; static export still ~106 kB first-load JS on `/`.

Note: Chart.js was deferred. Stage 6 ships with a KPI grid that
captures the headline trajectory but no rendered bar/line charts yet;
this can be picked up in a focused follow-up without touching the
content layer.

Review checkpoint at end of Phase 2 recommended (PLAN.md §11).

---

## Phase 3 — Cinematic stages

**Status:** not started.

Stages 1, 5, 9 built with React Three Fiber. Mobile and reduced-motion
fallbacks mandatory: each 3D scene has a non-WebGL path that conveys
the same story. Motion across all stages tuned.

---

## Phase 4 — Multilingual + a11y + SEO + share cards

**Status:** not started.

Chinese translation layer fully populated (every `text.en` has a
non-empty `text.zh`). Validator switches `text.zh` from optional to
required. Accessibility audit clean (WCAG 2.1 AA). SEO metadata +
per-stage Open Graph share cards generated at build time.

Review checkpoint at end of Phase 4 recommended (PLAN.md §11).

---

## Phase 5 — Audio polish

**Status:** not started.

Ambient BGM (~3 min loop) + stage SFX from ElevenLabs committed under
`apps/web/public/audio/`. Optional Stage 1 TTS narration (opt-in,
default OFF). All audio off by default site-wide. Volume policy: BGM
≈ −20 dB below SFX, all cues < 2s. Mobile defaults to BGM only.
`prefers-reduced-motion: reduce` → audio also defaults to muted.

---

## Cross-phase guarantees

These hold from Phase 1 onward:

- Every line of body copy traces to an S-1 line range (or is a
  Stage 0 / Stage 10 authored exception).
- `pnpm -r build` fails on any content validation error.
- Audio defaults to OFF and is mutable from the persistent shell.
- `prefers-reduced-motion: reduce` disables all motion immediately.
- No third-party CDNs (fonts, analytics, embeds). Static export only.
