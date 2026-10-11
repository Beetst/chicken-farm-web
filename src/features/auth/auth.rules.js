export const MIN_PASSWORD_LENGTH = 6
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

// Client-side checks are for UX only; the server must re-validate.
export function validateLoginInput({ email, password }) {
  if (!EMAIL_PATTERN.test(email.trim())) return 'Please enter a valid email'
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
  }
  return null
}
