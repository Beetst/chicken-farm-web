import SocialButtons from './SocialButtons'
import './PasswordlessSplit.css'

export default function PasswordlessSplit() {
  return (
    <main className="ps">
      <aside className="ps-hero">
        <div className="ps-brand">◆ Brand</div>
        <h2>แตะเดียว เข้าได้เลย</h2>
      </aside>
      <section className="ps-panel">
        <div className="ps-inner">
          <h1>ยินดีต้อนรับ</h1>
          <SocialButtons />
          <p className="ps-terms"><a href="#terms">ข้อกำหนด</a> · <a href="#privacy">ความเป็นส่วนตัว</a></p>
        </div>
      </section>
    </main>
  )
}
