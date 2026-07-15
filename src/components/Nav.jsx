import { useEffect, useRef, useState } from 'react'
import './nav.css'

const LINKS = [
  { id: 'ertek-ter', label: 'Érték-tér', num: '01' },
  { id: 'rozmaring', label: 'Rozmaring fesztivál', num: '02' },
  { id: 'helyszin', label: 'Helyszín', num: '03' },
]

export default function Nav() {
  const [lifted, setLifted] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Nyitott menünél a háttér ne görgethető, és az Esc zárjon.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a')?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`nav ${lifted ? 'is-lifted' : ''}`}>
      <div className="nav__bar">
        <a className="nav__mark" href="#top" onClick={() => setOpen(false)}>
          <img src="/brand/mark.png" alt="" width="256" height="256" />
          <span className="u-tag nav__wordmark">
            Törökbálinti
            <br />
            Napok
          </span>
        </a>

        <nav className="nav__links" aria-label="Fő navigáció">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="nav__link u-tag">
              <span className="nav__num">{l.num}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <span className="nav__stamp u-tag" aria-hidden="true">
          Aug 29–30.
        </span>

        <button
          className="nav__toggle u-tag"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-panel"
        >
          {open ? 'Bezár' : 'Menü'}
        </button>
      </div>

      <div
        id="nav-panel"
        ref={panelRef}
        className={`nav__panel ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="nav__panelLink" onClick={() => setOpen(false)}>
            <span className="u-tag nav__num">{l.num}</span>
            <span className="u-display">{l.label}</span>
          </a>
        ))}
        <p className="nav__panelFoot u-tag">
          Városháza mögötti parkoló
          <br />
          2026. augusztus 29–30.
        </p>
      </div>
    </header>
  )
}
