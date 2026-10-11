# chicken-farm-web (login designs)

A catalog of ready-to-use login pages built with React + Vite.

**Live demo:** https://beetst.github.io/chicken-farm-web/

| Design | Preview path | Highlights |
|---|---|---|
| Minimal | `#/minimal` | Clean centered card |
| Split | `#/split` | Brand panel + form, show/hide password, remember me |
| Dark | `#/dark` | Glassmorphism on dark background |
| Social | `#/social` | Google / Facebook / LINE buttons + email |

## Use a design in another project

Copy `src/features/auth/` (keep `ui/<Name>.*` you need) and `src/infrastructure/authClient.js`.
Replace `signInRequest` in `authClient.js` with your real API call.

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
