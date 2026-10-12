import { useSocialLogin } from '../useSocialLogin'
import { SOCIAL_PROVIDERS } from '../social.rules'
import './SocialButtons.css'

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
      <path fill="currentColor" d="M12 2.5C6.2 2.5 1.5 6.3 1.5 11c0 4.2 3.7 7.7 8.8 8.4.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s6-3.5 8.2-6.1c1.5-1.6 2.3-3.3 2.3-5.2 0-4.7-4.7-8.5-10.5-8.5Z" />
      <path fill="#06C755" d="M7.2 13.4H5.1a.4.4 0 0 1-.4-.4V8.9c0-.2.2-.4.4-.4s.4.2.4.4v3.7h1.7c.2 0 .4.2.4.4s-.2.4-.4.4Zm1.6-.4c0 .2-.2.4-.4.4s-.4-.2-.4-.4V8.9c0-.2.2-.4.4-.4s.4.2.4.4V13Zm4.6 0c0 .2-.1.3-.3.4h-.1a.4.4 0 0 1-.3-.2l-2.1-2.9V13c0 .2-.2.4-.4.4s-.4-.2-.4-.4V8.9c0-.2.1-.3.3-.4h.1c.1 0 .3.1.3.2l2.1 2.9V8.9c0-.2.2-.4.4-.4s.4.2.4.4V13Zm3.1-2.5c.2 0 .4.2.4.4s-.2.4-.4.4h-1.7v1.1h1.7c.2 0 .4.2.4.4s-.2.4-.4.4h-2.1a.4.4 0 0 1-.4-.4V8.9c0-.2.2-.4.4-.4h2.1c.2 0 .4.2.4.4s-.2.4-.4.4h-1.7v1.1h1.7Z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" width="20" height="20">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5Z" />
    </svg>
  )
}

const ICONS = { line: LineIcon, google: GoogleIcon }

// Shared provider buttons for passwordless designs.
export default function SocialButtons() {
  const { pendingProvider, lastProvider, error, signIn } = useSocialLogin()
  return (
    <div className="sb">
      {Object.values(SOCIAL_PROVIDERS).map(({ id, label }) => {
        const Icon = ICONS[id]
        return (
          <button key={id} type="button" className={`sb-btn sb-${id}`} onClick={() => signIn(id)} disabled={!!pendingProvider}>
            <Icon />
            <span>{pendingProvider === id ? 'กำลังไป…' : `เข้าสู่ระบบด้วย ${label}`}</span>
            {lastProvider === id && !pendingProvider && <em className="sb-last">ใช้ล่าสุด</em>}
          </button>
        )
      })}
      {error && <p className="sb-error" role="alert">{error}</p>}
    </div>
  )
}
