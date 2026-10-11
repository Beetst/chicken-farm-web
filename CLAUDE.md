# Project rules

Follows the BEET7 "Good Code & Good Architecture" guide. Read `docs/SYSTEM_MAP.md` first.

## Commands
- `npm test` — unit tests (Vitest)
- `npm run lint` — oxlint
- `npm run build` — production build

## Architecture rules
1. Dependency direction: `app` → `features/*/ui` → `features/*` service/rules → `infrastructure`. Never the reverse.
2. Business rules (`*.rules.js`) must not import React or UI code.
3. External services go through an adapter in `src/infrastructure/`.
4. Client validation is UX only; the real server must re-validate and enforce authorization.
5. Never log or persist passwords, tokens or other credentials. No secrets in source.
6. UI design CSS classes use a per-design prefix (`mn-`, `sp-`, `dk-`, `so-`).
7. Reuse `useLogin` / `auth.service` before adding new abstractions.
8. Business-rule changes require tests; recurring bugs become regression tests.

## Definition of Done
Tests, lint and build pass; each touched design verified in the running app; `docs/SYSTEM_MAP.md` updated if structure changed.
