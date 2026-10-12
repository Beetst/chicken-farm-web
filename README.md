# chicken-farm-web (login designs)

A catalog of ready-to-use login pages built with React + Vite.

**Live demo:** https://beetst.github.io/chicken-farm-web/

| Design | Preview path | Highlights |
|---|---|---|
| **LINE + Google** | `#/passwordless` | Passwordless: LINE / Google only, no password field |
| **LINE + Google Split** | `#/passwordless-split` | Passwordless with brand panel |
| Minimal | `#/minimal` | Clean centered card |
| Split | `#/split` | Brand panel + form, show/hide password, remember me |
| Dark | `#/dark` | Glassmorphism on dark background |
| Social | `#/social` | Google / Facebook / LINE buttons + email |

## Use a design in another project

Copy `src/features/auth/` (keep `ui/<Name>.*` you need) and `src/infrastructure/authClient.js`.
Replace `signInRequest` in `authClient.js` with your real API call.

## Passwordless (LINE / Google) setup

The passwordless designs have no password field, so there is no password to leak or brute-force.
Set `VITE_AUTH_API_BASE` (see `.env.example`); buttons then redirect to `<base>/auth/line/start` or
`<base>/auth/google/start`. Without it they run in demo mode. Your backend handles the OAuth flow and
keeps the client secrets. See the security notes in `docs/SYSTEM_MAP.md`.

## Add a new design

1. Create `src/features/auth/ui/<Name>.jsx` (+ `.css`, prefix class names to avoid clashes)
2. Register it in `src/app/designs.js`

Structure and rules: see `docs/SYSTEM_MAP.md` and `CLAUDE.md`.

## Develop

```bash
npm install
npm run dev
npm test
```

Pushing to `main` deploys to GitHub Pages automatically (`.github/workflows/deploy.yml`).
