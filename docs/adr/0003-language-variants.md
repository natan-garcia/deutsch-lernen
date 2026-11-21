# ADR 0003: Language variants with fallback (Swiss German ready)

- Status: accepted
- Date: 2026-11-20

## Context

The first version teaches standard German (A1). Swiss German (Schweizerdeutsch) should be added later without
rewriting screens or duplicating all content.

## Decision

- Every resource declares a `variant`: `de-DE` (standard) now, `gsw-CH` (Swiss German) later.
- A regional item may set `variantOf` to the id of the standard item it replaces (e.g. `Velo` replaces `Fahrrad`).
- When a user picks `gsw-CH`, the API returns the Swiss items plus every standard item that has no Swiss
  replacement (`VariantResolver`).
- Screens ask an interface (`ContentRepository` / `IContentProvider`) for content by level and variant, and
  speech goes through `SpeechService`, so neither knows about storage or voices.

## Consequences

- Swiss German can grow word by word; the app is usable in `gsw-CH` from the first item.
- CEFR levels are data too, so A2 and later levels are added as content.
