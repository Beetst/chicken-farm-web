import { signInRequest } from '../../infrastructure/authClient'
import { validateLoginInput } from './auth.rules'

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
