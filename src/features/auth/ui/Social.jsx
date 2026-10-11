import { useLogin } from '../useLogin'
import './Social.css'

const providers = [
  { name: 'Google', color: '#fff', text: '#1f2937', icon: 'G' },
  { name: 'Facebook', color: '#1877f2', text: '#fff', icon: 'f' },
  { name: 'LINE', color: '#06c755', text: '#fff', icon: 'L' },
]

export default function Social() {
  const f = useLogin()
  return (
    <main className="so">
      <div className="so-card">
        <h1>Create your account</h1>
        <p className="so-sub">Continue with a social account or email</p>
        <div className="so-providers">
          {providers.map((p) => (
            <button key={p.name} type="button" style={{ background: p.color, color: p.text }} onClick={() => alert(`TODO: ${p.name} OAuth`)}>
              <span className="so-icon">{p.icon}</span> Continue with {p.name}
            </button>
          ))}
        </div>
        <div className="so-divider"><span>or</span></div>
        <form onSubmit={f.handleSubmit} noValidate>
          <input type="email" placeholder="Email" aria-label="Email" value={f.email} onChange={(e) => f.setEmail(e.target.value)} autoComplete="email" />
          <input type="password" placeholder="Password" aria-label="Password" value={f.password} onChange={(e) => f.setPassword(e.target.value)} autoComplete="current-password" />
          {f.error && <p className="so-error" role="alert">{f.error}</p>}
          <button className="so-submit" type="submit" disabled={f.loading}>{f.loading ? 'Please wait…' : 'Continue with email'}</button>
        </form>
        <p className="so-terms">By continuing you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </div>
    </main>
  )
}
