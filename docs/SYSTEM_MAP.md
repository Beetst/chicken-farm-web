# System Map

```
index.html → src/main.jsx → src/app/App.jsx        (hash router + gallery)
                               └─ src/app/designs.js (registry of designs)
                                     └─ features/auth/ui/<Design>.jsx  (UI only)
                                           └─ features/auth/useLogin.js  (form state)
                                                 └─ features/auth/auth.service.js  signIn()
                                                       ├─ features/auth/auth.rules.js  validateLoginInput()
                                                       └─ infrastructure/authClient.js  signInRequest()  ← swap for real API
```

| Path | Responsibility |
|---|---|
| `src/app/` | Routing, gallery page, design registry |
| `src/features/auth/ui/` | One self-contained design per file (`.jsx` + prefixed `.css`) |
| `src/features/auth/useLogin.js` | React form state, calls `signIn` |
| `src/features/auth/auth.service.js` | Sign-in use case; maps technical errors to user-facing messages |
| `src/features/auth/auth.rules.js` | Pure validation rules (no React) |
| `src/features/auth/auth.test.js` | Unit tests for rules and service |
| `src/infrastructure/authClient.js` | Backend adapter (currently fake) |

## Routes
`#/` gallery · `#/minimal` · `#/split` · `#/dark` · `#/social`

## Security notes
Frontend only. Authentication, authorization and authoritative validation belong to the real backend behind `authClient.js`. Social buttons are placeholders (no OAuth yet).
