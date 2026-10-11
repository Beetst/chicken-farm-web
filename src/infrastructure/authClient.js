// Adapter for the auth backend. Replace `signInRequest` with a real API call,
// e.g. fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) }).
const FAKE_LATENCY_MS = 800

export async function signInRequest({ email }) {
  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
  return { user: { email } }
}
