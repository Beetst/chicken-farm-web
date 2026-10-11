import { useEffect, useState } from 'react'
import { designs } from './designs'
import './App.css'

const getHash = () => window.location.hash.replace(/^#\/?/, '')

export default function App() {
  const [route, setRoute] = useState(getHash)
  useEffect(() => {
    const onHash = () => setRoute(getHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const design = designs.find((d) => d.id === route)
  if (design) {
    return (
      <>
        <a className="back" href="#/">← All designs</a>
        <design.Component />
      </>
    )
  }

  return (
    <main className="gallery">
      <header>
        <h1>Login Page Designs</h1>
        <p>{designs.length} ready-to-use React login pages. Tap one to preview.</p>
      </header>
      <ul>
        {designs.map((d) => (
          <li key={d.id}>
            <a href={`#/${d.id}`}>
              <span className="swatch" style={{ background: d.swatch }} />
              <strong>{d.name}</strong>
              <span>{d.desc}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
