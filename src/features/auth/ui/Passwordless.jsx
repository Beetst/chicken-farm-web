import SocialButtons from './SocialButtons'
import './Passwordless.css'

export default function Passwordless() {
  return (
    <main className="pl">
      <section className="pl-card">
        <div className="pl-logo" aria-hidden="true">B</div>
        <h1>Sign in to Brand</h1>
        <p className="pl-sub">Use your LINE or Google account. No password to remember.</p>
        <SocialButtons />
        <p className="pl-note">🔒 We never see or store your password.</p>
        <p className="pl-terms">By continuing you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </section>
    </main>
  )
}
