import Minimal from '../features/auth/ui/Minimal'
import Split from '../features/auth/ui/Split'
import Dark from '../features/auth/ui/Dark'
import Social from '../features/auth/ui/Social'
import Passwordless from '../features/auth/ui/Passwordless'
import PasswordlessSplit from '../features/auth/ui/PasswordlessSplit'

// To add a design: create src/features/auth/ui/<Name>.jsx and register it here.
export const designs = [
  { id: 'passwordless', name: 'LINE + Google', desc: 'Passwordless, no password field', Component: Passwordless, swatch: 'linear-gradient(90deg,#06c755 50%,#4285f4 50%)' },
  { id: 'passwordless-split', name: 'LINE + Google Split', desc: 'Passwordless with brand panel', Component: PasswordlessSplit, swatch: 'linear-gradient(160deg,#06c755,#048a3b)' },
  { id: 'minimal', name: 'Minimal', desc: 'Clean centered card', Component: Minimal, swatch: '#2563eb' },
  { id: 'split', name: 'Split', desc: 'Brand panel + form, show password', Component: Split, swatch: 'linear-gradient(135deg,#0ea5e9,#6366f1)' },
  { id: 'dark', name: 'Dark', desc: 'Glassmorphism on dark', Component: Dark, swatch: 'linear-gradient(90deg,#a855f7,#ec4899)' },
  { id: 'social', name: 'Social', desc: 'Google / Facebook / LINE', Component: Social, swatch: '#f59e0b' },
]
