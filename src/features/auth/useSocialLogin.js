import { useState } from 'react'
import { signInWithProvider } from './auth.service'
import { SOCIAL_PROVIDERS } from './social.rules'

const showDemoNotice = (provider) =>
  alert(`Demo mode: ${SOCIAL_PROVIDERS[provider].label} sign-in will redirect once VITE_AUTH_API_BASE is set`)

export function useSocialLogin({ onDemo = showDemoNotice } = {}) {
  const [pendingProvider, setPendingProvider] = useState(null)
  const [error, setError] = useState('')

  const signIn = (provider) => {
    if (pendingProvider) return
    setError('')
    try {
      const result = signInWithProvider(provider)
      if (result.redirected) setPendingProvider(provider)
      else onDemo(provider)
    } catch (err) {
      setError(err.message)
    }
  }

  return { pendingProvider, error, signIn }
}
