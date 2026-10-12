import { afterEach, describe, expect, it, vi } from 'vitest'
import { isSupportedProvider } from './social.rules'
import { AuthError, signInWithProvider } from './auth.service'
import { socialSignInUrl, startSocialSignIn } from '../../infrastructure/authClient'

describe('isSupportedProvider', () => {
  it.each(['line', 'google'])('allows %s', (p) => expect(isSupportedProvider(p)).toBe(true))
  it.each(['facebook', '', 'toString', '__proto__', '../admin'])('rejects %j', (p) => expect(isSupportedProvider(p)).toBe(false))
})

describe('signInWithProvider', () => {
  it('starts sign-in for an allowed provider', () => {
    const start = vi.fn().mockReturnValue({ redirected: true })
    expect(signInWithProvider('line', start)).toEqual({ redirected: true })
    expect(start).toHaveBeenCalledWith('line')
  })
  it('never starts sign-in for an unknown provider', () => {
    const start = vi.fn()
    expect(() => signInWithProvider('evil', start)).toThrow(AuthError)
    expect(start).not.toHaveBeenCalled()
  })
})

describe('socialSignInUrl', () => {
  it('builds the backend start URL', () => {
    expect(socialSignInUrl('google', 'https://api.example.com/')).toBe('https://api.example.com/auth/google/start')
  })
  it('returns null without a configured backend', () => {
    expect(socialSignInUrl('line', undefined)).toBeNull()
  })
})

describe('startSocialSignIn', () => {
  afterEach(() => vi.unstubAllGlobals())
  it('is demo mode without a backend and does not navigate', () => {
    const assign = vi.fn()
    vi.stubGlobal('window', { location: { assign } })
    expect(startSocialSignIn('line', undefined)).toEqual({ demo: true })
    expect(assign).not.toHaveBeenCalled()
  })
  it('redirects to the backend when configured', () => {
    const assign = vi.fn()
    vi.stubGlobal('window', { location: { assign } })
    expect(startSocialSignIn('line', 'https://api.example.com')).toEqual({ redirected: true })
    expect(assign).toHaveBeenCalledWith('https://api.example.com/auth/line/start')
  })
})
