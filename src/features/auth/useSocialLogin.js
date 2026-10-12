import { useState } from 'react'
import { readLastProvider, saveLastProvider } from '../../infrastructure/lastProvider'
import { signInWithProvider } from './auth.service'
import { isSupportedProvider, SOCIAL_PROVIDERS } from './social.rules'

const showDemoNotice = (provider) =>
  alert(`ตัวอย่าง: ปุ่ม ${SOCIAL_PROVIDERS[provider].label} จะพาไปเข้าสู่ระบบจริงเมื่อเชื่อมระบบหลังบ้าน`)

export function useSocialLogin({ onDemo = showDemoNotice } = {}) {
  const [pendingProvider, setPendingProvider] = useState(null)
  const [error, setError] = useState('')
  const [lastProvider, setLastProvider] = useState(() => {
    const saved = readLastProvider()
    return isSupportedProvider(saved) ? saved : null
  })

  const signIn = (provider) => {
    if (pendingProvider) return
    setError('')
    try {
      const result = signInWithProvider(provider)
      saveLastProvider(provider)
      setLastProvider(provider)
      if (result.redirected) setPendingProvider(provider)
      else onDemo(provider)
    } catch (err) {
      setError(err.message)
    }
  }

  return { pendingProvider, lastProvider, error, signIn }
}
