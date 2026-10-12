import { startSocialSignIn } from '../../infrastructure/authClient'
import { isSupportedProvider } from './social.rules'

export const UNSUPPORTED_PROVIDER_MESSAGE = 'ไม่รองรับวิธีเข้าสู่ระบบนี้'

export class AuthError extends Error {}

export function signInWithProvider(provider, start = startSocialSignIn) {
  if (!isSupportedProvider(provider)) throw new AuthError(UNSUPPORTED_PROVIDER_MESSAGE)
  return start(provider)
}
