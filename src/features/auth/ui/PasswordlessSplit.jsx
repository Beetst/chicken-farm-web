import SocialButtons from './SocialButtons'
import './PasswordlessSplit.css'

export default function PasswordlessSplit() {
  return (
    <main className="ps">
      <aside className="ps-hero">
        <div className="ps-brand">◆ Brand</div>
        <div>
          <h2>One tap to get in</h2>
          <ul>
            <li>No passwords to leak or forget</li>
            <li>Protected by LINE and Google security</li>
            <li>Works on any phone</li>
          </ul>
        </div>
      </aside>
      <section className="ps-panel">
        <div className="ps-inner">
          <h1>Welcome</h1>
          <p className="ps-sub">Choose how you want to sign in</p>
          <SocialButtons />
          <p className="ps-terms">By continuing you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>
  )
}
