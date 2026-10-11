import { useLogin } from '../useLogin'
import './Minimal.css'

export default function Minimal() {
  const f = useLogin()
  return (
    <main className="mn">
      <form className="mn-card" onSubmit={f.handleSubmit} noValidate>
        <h1>Sign in</h1>
        <label>
          Email
          <input type="email" value={f.email} onChange={(e) => f.setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label>
          Password
          <input type="password" value={f.password} onChange={(e) => f.setPassword(e.target.value)} autoComplete="current-password" />
        </label>
        {f.error && <p className="mn-error" role="alert">{f.error}</p>}
        <button type="submit" disabled={f.loading}>{f.loading ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  )
}
