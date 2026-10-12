import SocialButtons from './SocialButtons'
import './Passwordless.css'

export default function Passwordless() {
  return (
    <main className="pl">
      <section className="pl-card">
        <div className="pl-logo" aria-hidden="true">B</div>
        <h1>เข้าสู่ระบบ</h1>
        <SocialButtons />
        <p className="pl-terms"><a href="#terms">ข้อกำหนด</a> · <a href="#privacy">ความเป็นส่วนตัว</a></p>
      </section>
    </main>
  )
}
