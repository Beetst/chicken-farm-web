# System Map

```
index.html → src/main.jsx → src/app/App.jsx        (hash router + gallery)
                               └─ src/app/designs.js (registry of designs)
                                     └─ features/auth/ui/<Design>.jsx  (UI only)
                                           └─ features/auth/useLogin.js  (form state)
                                                 └─ features/auth/auth.service.js  signIn()
                                                       ├─ features/auth/auth.rules.js  validateLoginInput()
                                                       └─ infrastructure/authClient.js  signInRequest()  ← swap for real API

Passwordless (LINE / Google):
features/auth/ui/Passwordless*.jsx → ui/SocialButtons.jsx → useSocialLogin.js
  → auth.service.js signInWithProvider() → social.rules.js isSupportedProvider()
  → infrastructure/authClient.js startSocialSignIn()
      → redirects to  ${VITE_AUTH_API_BASE}/auth/<provider>/start   (demo mode if unset)
```

| Path | Responsibility |
|---|---|
| `src/app/` | Routing, gallery page, design registry |
| `src/features/auth/ui/` | One self-contained design per file (`.jsx` + prefixed `.css`) |
| `src/features/auth/useLogin.js` | React form state, calls `signIn` |
| `src/features/auth/auth.service.js` | Sign-in use case; maps technical errors to user-facing messages |
| `src/features/auth/auth.rules.js` | Pure validation rules (no React) |
| `src/features/auth/auth.test.js` | Unit tests for rules and service |
| `src/features/auth/social.rules.js` | Allow-list of passwordless providers (LINE, Google) |
| `src/features/auth/useSocialLogin.js` | React state for provider buttons |
| `src/features/auth/ui/SocialButtons.jsx` | Shared LINE / Google buttons |
| `src/features/auth/social.test.js` | Tests for provider allow-list and redirect adapter |
| `src/infrastructure/authClient.js` | Backend adapter (currently fake) |

## Routes
`#/` gallery · `#/passwordless` · `#/passwordless-split` · `#/minimal` · `#/split` · `#/dark` · `#/social`

## Security notes
Frontend only. Authentication, authorization and authoritative validation belong to the real backend behind `authClient.js`. The `Social` design's buttons are placeholders.

Passwordless designs never handle passwords or tokens in the browser. The backend must own the whole OAuth flow:
register LINE Login / Google OAuth apps, keep client secrets server-side, use `state` (and PKCE), exchange the code
server-side, verify the ID token, then set an `HttpOnly; Secure; SameSite` session cookie and redirect back.
