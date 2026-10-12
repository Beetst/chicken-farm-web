# chicken-farm-web (LINE + Google login)

Passwordless login page (LINE + Google) built with React + Vite. No password field, so no password to leak.

## Use it

Set `VITE_AUTH_API_BASE` (see `.env.example`). Buttons redirect to `<base>/auth/line/start` or
`<base>/auth/google/start`; your backend runs the OAuth flow and keeps the secrets.
Without it the page runs in demo mode. See `docs/SYSTEM_MAP.md` for structure and security notes.

## Develop

```bash
npm install
npm run dev
npm test
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).
