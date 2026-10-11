import { useState } from 'react'
import { useLogin } from '../useLogin'
import './Split.css'

export default function Split() {
  const f = useLogin()
  const [show, setShow] = useState(false)
  return (
    <main className="sp">
      <aside className="sp-hero">
        <div className="sp-brand">◆ Brand</div>
        <div>
          <h2>Welcome back</h2>
          <p>Sign in to manage your account, orders and settings in one place.</p>
        </div>
        <small>© Brand Inc.</small>
      </aside>
      <section className="sp-form-wrap">
        <form className="sp-form" onSubmit={f.handleSubmit} noValidate>
          <h1>Log in</h1>
          <p className="sp-sub">Enter your details below</p>
          <label>
            Email
            <input type="email" placeholder="you@example.com" value={f.email} onChange={(e) => f.setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label>
            Password
            <span className="sp-pw">
              <input type={show ? 'text' : 'password'} value={f.password} onChange={(e) => f.setPassword(e.target.value)} autoComplete="current-password" />
              <button type="button" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
            </span>
          </label>
          <div className="sp-row">
            <label className="sp-check"><input type="checkbox" /> Remember me</label>
            <a href="#forgot">Forgot password?</a>
          </div>
          {f.error && <p className="sp-error" role="alert">{f.error}</p>}
          <button className="sp-submit" type="submit" disabled={f.loading}>{f.loading ? 'Logging in…' : 'Log in'}</button>
          <p className="sp-foot">No account? <a href="#signup">Sign up</a></p>
        </form>
      </section>
    </main>
  )
}
