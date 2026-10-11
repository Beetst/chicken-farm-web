import Minimal from '../features/auth/ui/Minimal'
import Split from '../features/auth/ui/Split'
import Dark from '../features/auth/ui/Dark'
import Social from '../features/auth/ui/Social'

// To add a design: create src/features/auth/ui/<Name>.jsx and register it here.
export const designs = [
  { id: 'minimal', name: 'Minimal', desc: 'Clean centered card', Component: Minimal, swatch: '#2563eb' },
  { id: 'split', name: 'Split', desc: 'Brand panel + form, show password', Component: Split, swatch: 'linear-gradient(135deg,#0ea5e9,#6366f1)' },
  { id: 'dark', name: 'Dark', desc: 'Glassmorphism on dark', Component: Dark, swatch: 'linear-gradient(90deg,#a855f7,#ec4899)' },
  { id: 'social', name: 'Social', desc: 'Google / Facebook / LINE', Component: Social, swatch: '#f59e0b' },
]
