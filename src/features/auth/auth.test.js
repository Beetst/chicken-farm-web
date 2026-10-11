import { describe, expect, it, vi } from 'vitest'
import { MIN_PASSWORD_LENGTH, validateLoginInput } from './auth.rules'
import { AuthError, SIGN_IN_FAILED_MESSAGE, signIn } from './auth.service'

const valid = { email: 'user@example.com', password: 'secret1' }

describe('validateLoginInput', () => {
  it('accepts valid input', () => {
    expect(validateLoginInput(valid)).toBeNull()
  })
  it.each(['', 'user', 'user@', 'user@example', 'a b@c.d'])('rejects email %j', (email) => {
    expect(validateLoginInput({ ...valid, email })).toMatch(/email/)
  })
  it('rejects short password', () => {
    const password = 'x'.repeat(MIN_PASSWORD_LENGTH - 1)
    expect(validateLoginInput({ ...valid, password })).toMatch(/Password/)
  })
  it('accepts password at minimum length', () => {
    const password = 'x'.repeat(MIN_PASSWORD_LENGTH)
    expect(validateLoginInput({ ...valid, password })).toBeNull()
  })
})

describe('signIn', () => {
  it('does not call the backend when input is invalid', async () => {
    const request = vi.fn()
    await expect(signIn({ ...valid, email: 'bad' }, request)).rejects.toBeInstanceOf(AuthError)
    expect(request).not.toHaveBeenCalled()
  })
  it('sends trimmed email and returns the result', async () => {
    const request = vi.fn().mockResolvedValue({ user: { email: valid.email } })
    await expect(signIn({ ...valid, email: ` ${valid.email} ` }, request)).resolves.toEqual({ user: { email: valid.email } })
    expect(request).toHaveBeenCalledWith(valid)
  })
  it('hides technical errors and never logs the password', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const request = vi.fn().mockRejectedValue(new Error('ECONNRESET'))
    await expect(signIn(valid, request)).rejects.toThrow(SIGN_IN_FAILED_MESSAGE)
    expect(JSON.stringify(log.mock.calls)).not.toContain(valid.password)
    log.mockRestore()
  })
})
