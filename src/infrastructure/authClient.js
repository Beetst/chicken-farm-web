// Passwordless OAuth. The backend owns the whole OAuth flow (client secret,
// state/PKCE, token exchange, session cookie); the browser only navigates to it,
// so no tokens or secrets ever live in frontend code.
// Set VITE_AUTH_API_BASE (e.g. https://api.example.com) to enable real sign-in.
const AUTH_API_BASE = import.meta.env.VITE_AUTH_API_BASE

export function socialSignInUrl(provider, apiBase = AUTH_API_BASE) {
  if (!apiBase) return null
  return `${apiBase.replace(/\/+$/, '')}/auth/${encodeURIComponent(provider)}/start`
}

export function startSocialSignIn(provider, apiBase = AUTH_API_BASE) {
  const url = socialSignInUrl(provider, apiBase)
  if (!url) return { demo: true }
  window.location.assign(url)
  return { redirected: true }
}
