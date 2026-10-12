// Passwordless sign-in: only these OAuth providers are allowed.
export const SOCIAL_PROVIDERS = Object.freeze({
  line: { id: 'line', label: 'LINE' },
  google: { id: 'google', label: 'Google' },
})

export function isSupportedProvider(provider) {
  return Object.hasOwn(SOCIAL_PROVIDERS, provider)
}
