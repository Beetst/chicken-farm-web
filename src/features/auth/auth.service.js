import { signInRequest, startSocialSignIn } from '../../infrastructure/authClient'
import { validateLoginInput } from './auth.rules'
import { isSupportedProvider } from './social.rules'

export const SIGN_IN_FAILED_MESSAGE = 'Sign in failed. Please try again.'

export class AuthError extends Error {}

export async function signIn(credentials, request = signInRequest) {
  const validationError = validateLoginInput(credentials)
  if (validationError) throw new AuthError(validationError)

  try {
    return await request({ email: credentials.email.trim(), password: credentials.password })
  } catch (cause) {
    // Never include credentials in diagnostics.
    console.error('signIn request failed', cause?.message)
    throw new AuthError(SIGN_IN_FAILED_MESSAGE, { cause })
  }
}

export const UNSUPPORTED_PROVIDER_MESSAGE = 'ไม่รองรับวิธีเข้าสู่ระบบนี้'

export function signInWithProvider(provider, start = startSocialSignIn) {
  if (!isSupportedProvider(provider)) throw new AuthError(UNSUPPORTED_PROVIDER_MESSAGE)
  return start(provider)
}
