import { useState } from 'react'
import Lightbox from './Lightbox'
import './tilegrid.css'

export default function TileGrid({ label, items }) {
  const [open, setOpen] = useState(null)

  return (
    <section className="tiles">
      <header className="tiles__head u-rise">
        <h3 className="tiles__label u-display">{label}</h3>
        <p className="tiles__hint u-tag">Koppints a részletekért</p>
      </header>

      <ul className="tiles__grid u-rise">
        {items.map((item, i) => (
          <li key={item.title}>
            <button className="tile" onClick={() => setOpen(i)}>
              <span className="tile__img">
                <img src={`/cards/${item.image}-sm.webp`} alt="" loading="lazy" width="420" height="420" />
              </span>
              <span className="tile__bar">
                <span className="tile__title">{item.title}</span>
                {item.time && <span className="tile__time u-tag">{item.time}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox items={items} index={open} onMove={setOpen} onClose={() => setOpen(null)} />}
    </section>
  )
}
