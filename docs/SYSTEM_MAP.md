# System Map

Passwordless login page: LINE and Google only. No password field anywhere.

```
index.html → src/main.jsx → src/app/App.jsx
  └─ features/auth/ui/Passwordless.jsx        (page layout)
       └─ features/auth/ui/SocialButtons.jsx  (LINE / Google buttons, "ใช้ล่าสุด" badge)
            └─ features/auth/useSocialLogin.js
                 ├─ features/auth/auth.service.js  signInWithProvider()
                 │    ├─ features/auth/social.rules.js  isSupportedProvider()
                 │    └─ infrastructure/authClient.js   startSocialSignIn()
                 │         → redirects to ${VITE_AUTH_API_BASE}/auth/<provider>/start (demo mode if unset)
                 └─ infrastructure/lastProvider.js  read/saveLastProvider()
```

| Path | Responsibility |
|---|---|
| `src/app/App.jsx` | Renders the login page |
| `src/features/auth/ui/` | Page layout and provider buttons (prefixed CSS: `pl-`, `sb-`) |
| `src/features/auth/useSocialLogin.js` | React state for the buttons |
| `src/features/auth/auth.service.js` | Sign-in use case; rejects unknown providers |
| `src/features/auth/social.rules.js` | Allow-list of providers (LINE, Google) |
| `src/infrastructure/authClient.js` | Redirect adapter to the auth backend |
| `src/infrastructure/lastProvider.js` | Remembers last-used provider id (no tokens) |
| `*.test.js` | Unit tests |

## Security notes
The browser never handles passwords or tokens. The backend must own the whole OAuth flow:
register LINE Login / Google OAuth apps, keep client secrets server-side, use `state` (and PKCE), exchange the code
server-side, verify the ID token, then set an `HttpOnly; Secure; SameSite` session cookie and redirect back.

## UX principles
- One heading, two buttons, one tiny legal line. No paragraphs.
- Thai labels; 52px tap targets; LINE first (most used in Thailand).
- "ใช้ล่าสุด" badge on the provider used last.

Earlier password-based designs were removed; they remain in git history.
