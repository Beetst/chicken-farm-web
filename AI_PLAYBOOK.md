# AI Playbook — BEET7

> **วิธีใช้ (สำหรับเจ้าของโปรเจ็ค)**
> 1. เริ่มเซสชันใหม่หรือใช้ AI ตัวอื่น ให้แนบไฟล์นี้ หรือพิมพ์ว่า "อ่านและทำตาม AI_PLAYBOOK.md ก่อนเริ่มงาน"
> 2. ถ้าโปรเจ็คอยู่บน GitHub ให้คัดลอกไฟล์นี้ไปไว้ที่ root ของรีโป แล้วตั้งชื่อว่า `CLAUDE.md` (Claude) หรือ `AGENTS.md` (AI ตัวอื่น) AI จะอ่านเองอัตโนมัติ
> 3. ส่วนที่ 0 ด้านล่างให้แก้ให้ตรงกับโปรเจ็คนั้นๆ ส่วนที่เหลือใช้ได้ทุกโปรเจ็ค
>
> The rest of this file is written in English for AI models. Reply to the owner in Thai.

---

## 0. Project facts (edit per project)

- Owner: non-programmer. Has a computer and a phone. Relies on AI for all code.
- Goal: <what this project is, who uses it>
- Stack: <e.g. React + Vite, static hosting>
- Commands: `npm test` · `npm run lint` · `npm run build`
- Live preview: <URL>

## 1. How to work with the owner

- Reply in **Thai**, short and plain. No jargon without a one-line explanation.
- Owner wants **results, not questions**. Make sensible decisions yourself and state them.
  Ask only when the choice is irreversible, costs money, deletes data/work, or changes security.
- Always end with: what changed, how to see it (link or screenshot), what is still not done.
- Never claim something works unless you ran it. Show evidence (test output, screenshot).
- Prefer solutions that need no manual setup; if setup is unavoidable, give step-by-step
  instructions with exact button names (ask computer or phone if the steps differ).

## 2. Workflow for every task

1. **Understand** the request; restate it in one Thai sentence if it is ambiguous.
2. **Inspect** existing code first (`docs/SYSTEM_MAP.md`, then only the relevant files).
3. **Reuse** existing modules before creating new ones.
4. **Implement** the smallest change that satisfies the request.
5. **Test**: run tests, lint, build. Add/adjust tests for any business-rule change.
6. **Verify in the running app** (open it, click the changed thing, take a screenshot).
7. **Update docs** (`docs/SYSTEM_MAP.md`, README) if structure or behavior changed.
8. **Commit** with a clear message, push, and report.

## 3. Code structure (feature-oriented, modular monolith)

```
src/
├── app/              # entry, routing, providers, page composition
├── features/
│   └── <feature>/    # everything for one feature lives together
│       ├── ui/                  # components: display + user events only
│       ├── use<Feature>.js      # React state/hooks for this feature
│       ├── <feature>.service.js # use cases: orchestrates rules + adapters
│       ├── <feature>.rules.js   # pure business rules, no React, no I/O
│       └── <feature>.test.js
├── infrastructure/   # adapters to the outside world: API clients, storage, payments
└── shared/           # only code truly used by 2+ features (create when needed)
docs/SYSTEM_MAP.md    # map of the system for humans and AI
```

**Dependency direction (never reverse):**
`app → features/*/ui → hooks → service → rules`, and `service → infrastructure`.

Rules:
- One responsibility per file and per function. Names say intent (`calculateOvertimePay`, not `process`).
- Business rules never import UI or framework code.
- Every external service (API, DB, storage, OAuth, payment) goes through one adapter in `infrastructure/`.
- No magic numbers or strings: name them as constants.
- No dead code, no commented-out code, no copy-pasted business rules.
- Comment **why**, not what. Keep the big picture in `docs/SYSTEM_MAP.md`.
- CSS: scope by prefix or CSS modules; no global styles that can collide.
- Don't add patterns, libraries or abstractions without a concrete problem. Simple first.
- Avoid: god files (>300 lines), god functions (>50 lines), circular imports.

## 4. Extensibility checklist (so features can be added later)

- A new feature = a new folder in `features/`, registered in `app/`. No edits across unrelated features.
- Config via environment variables (`VITE_*` for public frontend config), documented in `.env.example`.
- Swap a backend by replacing one adapter file, not by editing UI.
- Keep the UI text in one place per feature so it can be translated later.
- Keep `docs/SYSTEM_MAP.md` current: routes, files, responsibilities, data flow.

## 5. Security rules (OWASP-based, non-negotiable)

**Secrets**
- Never put API keys, client secrets, passwords or tokens in frontend code or in git.
  Anything in the browser bundle is public. `VITE_*` variables are public.
- Secrets live only on the server (env vars / secret manager). Keep `.env` in `.gitignore`.

**Authentication**
- Prefer **passwordless** sign-in (LINE Login, Google OAuth, magic link) over storing passwords.
- OAuth runs on the **backend**: Authorization Code flow + `state` + PKCE; exchange the code and
  verify the ID token server-side; never trust tokens decoded in the browser.
- Session = `HttpOnly; Secure; SameSite=Lax` cookie. Never store tokens in `localStorage`.
- If passwords are unavoidable: hash with Argon2id/bcrypt, rate-limit login, lock out brute force,
  generic error messages ("email or password incorrect").

**Authorization**
- Check permissions **on the server** for every protected request. Hiding a button is not security.
- Check ownership: user A must never read or change user B's data by changing an ID.
- Deny by default; when unsure, refuse.

**Input & output**
- Validate all input on the server (type, length, format, allow-lists). Client validation is UX only.
- Use parameterized queries / ORM; never build SQL from strings.
- Never inject untrusted HTML (`dangerouslySetInnerHTML`, `innerHTML`) without sanitizing.
- Allow-list redirect targets and provider names; never redirect to a URL from user input.

**Data & logging**
- Collect and show only the data you need (PDPA/GDPR mindset).
- Never log passwords, tokens, ID card numbers, or payment details.
- Log security events (login success/failure, permission denied) without sensitive values.
- Show users friendly errors; keep technical details in server logs only.

**Transport & headers**
- HTTPS only. Set security headers: Content-Security-Policy, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, HSTS, `frame-ancestors` (clickjacking).
- CORS: allow only your own domains, never `*` with credentials.

**Dependencies**
- Use few, well-known libraries. Pin versions via the lockfile. Run `npm audit` before release.

## 6. Testing

- Unit tests for every business rule and service (fast, many).
- Integration tests for adapters/boundaries when a real backend exists.
- One end-to-end test for each critical journey (e.g. login → main page).
- Every fixed bug gets a regression test.
- Read real test output; never assume tests pass.

## 7. Definition of Done

- [ ] Request satisfied, verified in the running app (screenshot)
- [ ] Tests, lint and build pass
- [ ] No secrets or sensitive data in code, git or logs
- [ ] Security rules in section 5 respected
- [ ] Fits the structure in section 3; `docs/SYSTEM_MAP.md` updated if needed
- [ ] Committed and pushed; owner told in Thai what changed, how to see it, what remains

## 8. Change report (end of every task)

```
งานที่ทำ:
ไฟล์ที่แก้:
ผลทดสอบ: (tests / lint / build / เช็กในแอปจริง)
ผลกระทบด้านความปลอดภัย:
สิ่งที่ยังไม่ได้ทำ / ความเสี่ยง:
ต้องให้เจ้าของตัดสินใจไหม: ใช่ / ไม่
```

## Sources

Google Engineering Practices (code review) · OWASP ASVS 5.0, Top 10, Cheat Sheet Series
(Authentication, Session Management, OAuth2, Logging, Secrets Management) · OAuth 2.0 Security
Best Current Practice (RFC 9700) · Martin Fowler (modularity, test pyramid) · Microsoft & AWS
Well-Architected Frameworks · BEET7 Good Code & Architecture Guide v2.
