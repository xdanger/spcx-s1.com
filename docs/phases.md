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

**Status:** done (2026-05-21). Awaiting Kros's review.

Deliverables:

- [x] Stage 1 — Cold Open: black-screen reveal, scroll-triggered
      typewriter of the Musk quote at l.577–580, sparse R3F starfield
      (sphere-shell distribution, slow drift) gated on WebGL +
      `min-width: 768px` + `prefers-reduced-motion: no-preference`.
- [x] Stage 5 — Roadmap: Why-now framing, four-category Growth
      Strategies grid (Space / Connectivity / AI / Future Markets)
      parsed from l.1049–1072, dedicated Future Markets cards with
      descriptions from l.7938–7962, collapsible Business detail
      (l.7635–7932), pinned commercial-viability caveat. Cinematic:
      R3F forward-drift starfield as a sticky backdrop while the
      reader scrolls through the section.
- [x] Stage 9 — The Horizon: Kardashev II framing (l.715–758), Future
      Markets summary, Lunar economy block (l.7666–7708), pinned
      verbatim commercial-viability caveat, scroll-triggered typewriter
      of the closing line at l.626 as the final beat before End
      Credits. Cinematic: R3F low-poly wireframe Earth on a sparse
      starfield, sticky-positioned through the section.
- [x] Shared `useCanCinematic()` hook: WebGL detect + 768 px floor +
      reduced-motion gate. Each 3D scene is dynamic-imported via
      `next/dynamic({ ssr: false })` so the static export bundle stays
      lean (~109 kB first-load JS on `/`).
- [x] Reduced-motion path: every cinematic backdrop returns `null`
      and every typewriter renders the full text immediately when
      `prefers-reduced-motion: reduce` is set.
- [x] Mobile fallback: cinematic backdrops disabled below 768 px so
      mobile users still get the full content with no GPU overhead.
- [x] Content fix: `stage5.roadmap.why-now` line range tightened from
      `l.700–758` to `l.715–758` so the "Why This Matters Now" prose
      no longer pulls in the preceding AI-segment / capex bullets.
- [x] `pnpm -r build`, `pnpm lint`, `pnpm --filter @spcx/content test`
      all green.

Note: cross-stage motion polish (KPI count-up easing, etc.) was left
to a focused follow-up. Phase 3's motion additions all use
`useReducedMotion` and stay close to the existing palette/restraint
rules.

---

## Phase 4 — Multilingual + a11y + SEO + share cards

**Status:** in progress. Delivered in three PRs.

### Phase 4 — PR A: infrastructure (this branch)

- [x] Chinese translation registry at
      `packages/content/src/translations/zh.ts` — keyed by node id,
      one canonical translation per node, looked up by the existing
      `sourceNode` / `authoredNode` factories. Initially empty.
- [x] Validator rule 12 wired to `--phase=4` flag. Originally exposed
      as `validate:phase4` while the build defaulted to phase 1;
      PR B₃ flipped the default to phase 4 (the build runs at phase 4
      by default and the inverse `validate:phase1` is now the escape
      hatch). The historical script name is preserved here for context.
- [x] Coverage audit: `pnpm --filter @spcx/content audit-zh`
      (`--quiet` for tally only) lists every missing translation
      grouped by stage and exits non-zero while gaps remain.
- [x] Locale-aware rendering helper at `apps/web/src/lib/localized.ts`
      and `apps/web/src/hooks/useLocalized.ts`. Returns
      `{ primary, secondary }`: verbatim nodes in `zh` keep their
      English original on top and render the Chinese translation
      beneath; non-verbatim nodes swap straight to `zh`.
- [x] Every stage component switched off the literal `node.text.en`
      pattern and through the dual-text helper.
- [x] UI-string registry at `apps/web/src/lib/uiStrings.ts` for
      labels outside the content layer (Shell controls, chapter
      index, mission briefing modal, stage titles). `<html lang>`
      already synced to `uiStore.locale` in `Shell.tsx`.

### Phase 4 — PR B: translations

Delivered in two passes so the Chinese copy can be reviewed in
focused chunks instead of a single 193-entry blob.

PR B₁ — infra + small stages (this branch):

- [x] Fill `zh` values across `uiStrings.ts` (shell controls, stage
      titles, stage-0 modal copy, Stage 4 callout).
- [x] Add `shell.stage-prefix` and a `useStageEyebrow(id)` hook so the
      `Stage NN` telemetry chip switches with locale across every
      stage component (StageSection, StagePlaceholder, MissionBriefing,
      Stage0Stub, ColdOpenInner, Roadmap, Horizon, EndCredits).
- [x] Populate `zh.ts` for stages 0 (4), 1 (1 Musk quote), and 4 (2)
      — 7/193 entries covered.

PR B₂ — stages 2-9 + label migration (this branch):

- [x] Populate `zh.ts` for stages 2/3/5/6/7/8/9 (64 entries) — 71/193
      entries covered, only stage 10 remains.
- [x] Migrate per-stage labels onto the `uiStrings` registry: Stage 2
      KPI/milestones eyebrow, Stage 3 pillar names + section toggles,
      Stage 5 / 6 / 9 section headings and caveat eyebrows, Stage 7
      `TITLE_OVERRIDES` + category labels + severity labels + section
      headings, Stage 8 `BLOCK_ORDER` labels + descriptions + verbatim
      toggle. Stage titles 2/3/5/6/7/8/9 also filled in zh.
- [x] `pnpm -r build`, `pnpm lint`, `pnpm --filter @spcx/content test`
      all green.

PR B₃ — stage 10 glossary + phase-4 gate (this branch):

- [x] Populate `zh.ts` for stage 10's glossary (122 entries) plus the
      Forward-Looking Statements caveat and four authored credit
      lines — 193/193 entries covered.
- [x] EndCredits "Forward-Looking Statements" heading + "Glossary
      Search" label routed through `uiStrings`. Stage 10 title also
      filled in zh.
- [x] Default validator phase flipped to 4: `bin/validate.ts` now
      defaults to phase 4, `packages/content/package.json`'s `build`
      and `validate` scripts pass `--phase=4`, and the new
      `validate:phase1` escape hatch is the only path back to the old
      gate. Rule 12 now hard-fails CI on any missing zh.
- [x] `pnpm -r build`, `pnpm lint`, `pnpm --filter @spcx/content test`
      all green.

Still deferred (tracked separately):

- [ ] KPI / milestone metadata labels still render in English (the
      `kpi.label` / `milestone.label` fields live on the schema, not in
      uiStrings) — a schema-level fix.
- [ ] `node.source?.sectionTitle` still surfaces verbatim English in
      details summaries (Stage 3 extras, Stage 6 tables) — needs a
      section-title translation map.

### Phase 4 — PR C: SEO + share cards + a11y audit

- [x] OpenGraph + Twitter Card metadata + canonical URL + hreflang
      alternates (en, zh, x-default) wired through `app/layout.tsx`.
- [x] `robots.txt` and `sitemap.xml` generated via Next.js metadata
      route conventions (`app/robots.ts`, `app/sitemap.ts`). Major LLM
      crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot,
      anthropic-ai) are disallowed; standard search and social-card
      scrapers are allowed.
- [x] OG share card generated at build time via Next.js
      `app/opengraph-image.tsx` + `app/twitter-image.tsx`
      (`next/og` ImageResponse, 1200×630, near-black with teal accent).
      Per-stage variants are out of scope here — see "Still deferred".
- [x] a11y polish: skip-to-main link (locale-aware), single H1 per
      page (Stage 0 modal heading demoted to H2), `<main id="main-content">`
      landmark, audited interactive elements have accessible names.
- [x] `prefers-reduced-motion: reduce` is already honored by every
      cinematic backdrop, typewriter, and KPI count-up via the shared
      `useReducedMotion` hook (confirmed unchanged from Phase 3).

Still deferred (tracked outside Phase 4):

- [ ] Per-stage OG share cards (e.g. `/#stage-7` social previews).
      The single-page-with-fragment URL shape means OG metadata can't
      vary by fragment, so per-stage cards would only land as their
      own deep-linked URLs — a future routing refactor.
- [ ] Full axe + Lighthouse run in CI. Manual sweep in Chrome
      verified no obvious violations, but the automated gate hasn't
      been wired in yet.

Review checkpoint at end of Phase 4 recommended (PLAN.md §11).

---

## Phase 5 — Audio polish

**Status:** infrastructure landed (PR D₁); audio assets pending.

### PR D₁ — playback infrastructure (this branch)

- [x] `apps/web/src/lib/audioManifest.ts` declares the BGM track, the
      per-stage SFX cues, and the optional Stage 1 TTS narration, with
      the volume policy encoded as `BGM_GAIN = 0.1` against
      `SFX_GAIN = 1.0` (the −20 dB ratio called for by PLAN.md §7).
- [x] `apps/web/src/components/Audio/AudioController.tsx` mounts once
      from `Shell`, owns the BGM `<audio>` element, attaches per-stage
      `IntersectionObserver`s for SFX cues, and gates everything on
      the persisted `audioOn` flag plus `prefers-reduced-motion`
      (forces audio off) and `max-width: 768px` (suppresses SFX,
      leaves BGM only — the mobile policy from §7).
- [x] `uiStore` extended with `ttsOn` (default false, persisted)
      and `toggleTts`. Optional Stage 1 narration only plays when
      both `audioOn` and `ttsOn` are true.
- [x] `<html suppressHydrationWarning>` so the pre-hydration lang
      script (PR C) no longer trips a React hydration mismatch on
      zh-locale returning visits.
- [x] `apps/web/public/audio/README.md` documents the expected file
      names (`bgm-ambient-loop.mp3`, `sfx-stage1-cold-open.mp3`,
      `tts-stage1-musk-quote.mp3`) and the generation workflow. Until
      a file lands, the corresponding cue is silently ignored at
      runtime — adding a file is a content drop with no code change.

### Still to do (follow-up PRs)

- [ ] **PR D₂** — generate and commit the BGM track + Stage 1 SFX
      via the ElevenLabs MCP (`mcp__ElevenLabs_Player__generate_music`,
      `generate_sound_effect`), then verify in browser.
- [ ] **PR D₃** — generate and commit the optional Stage 1 TTS
      narration (`generate_tts`) and surface a user-facing toggle for
      `ttsOn` (probably contextual on Stage 1 itself, not the
      persistent shell).
- [ ] **PR D₄** — extend SFX to other cinematic stages (5, 9) if
      desired.

The audio files involve creative / aesthetic decisions (mood, tone,
voice) that benefit from Kros's review before consuming ElevenLabs
credits. PR D₁ ships everything that doesn't require those choices.

---

## Cross-phase guarantees

These hold from Phase 1 onward:

- Every line of body copy traces to an S-1 line range (or is a
  Stage 0 / Stage 10 authored exception).
- `pnpm -r build` fails on any content validation error.
- Audio defaults to OFF and is mutable from the persistent shell.
- `prefers-reduced-motion: reduce` disables all motion immediately.
- No third-party CDNs (fonts, analytics, embeds). Static export only.
