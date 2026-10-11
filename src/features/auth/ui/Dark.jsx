import { useLogin } from '../useLogin'
import './Dark.css'

export default function Dark() {
  const f = useLogin()
  return (
    <main className="dk">
      <div className="dk-glow" aria-hidden="true" />
      <form className="dk-card" onSubmit={f.handleSubmit} noValidate>
        <div className="dk-logo">⚡</div>
        <h1>Welcome back</h1>
        <p className="dk-sub">Sign in to continue</p>
        <input type="email" placeholder="Email" aria-label="Email" value={f.email} onChange={(e) => f.setEmail(e.target.value)} autoComplete="email" />
        <input type="password" placeholder="Password" aria-label="Password" value={f.password} onChange={(e) => f.setPassword(e.target.value)} autoComplete="current-password" />
        {f.error && <p className="dk-error" role="alert">{f.error}</p>}
        <button type="submit" disabled={f.loading}>{f.loading ? 'Signing in…' : 'Sign in'}</button>
        <a href="#forgot">Forgot password?</a>
      </form>
    </main>
  )
}
