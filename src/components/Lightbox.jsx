import { useCallback, useEffect, useRef } from 'react'
import './lightbox.css'

export default function Lightbox({ items, index, onClose, onMove }) {
  const closeRef = useRef(null)
  const item = items[index]

  const step = useCallback((delta) => onMove((index + delta + items.length) % items.length), [index, items.length, onMove])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, step])

  if (!item) return null

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="lb__scrim" onClick={onClose} tabIndex={-1} aria-hidden="true" />

      <div className="lb__stage">
        <figure className="lb__figure">
          <img src={`/cards/${item.image}.webp`} alt={item.title} width="900" height="900" />
          <figcaption className="lb__caption">
            <span className="lb__title u-display">{item.title}</span>
            {item.time && <span className="lb__time u-tag">{item.time}</span>}
            {item.note && <span className="lb__note">{item.note}</span>}
          </figcaption>
        </figure>

        <div className="lb__controls">
          <button className="lb__btn u-tag" onClick={() => step(-1)} aria-label="Előző program">
            ←
          </button>
          <span className="lb__count u-tag">
            {index + 1} / {items.length}
          </span>
          <button className="lb__btn u-tag" onClick={() => step(1)} aria-label="Következő program">
            →
          </button>
        </div>
      </div>

      <button className="lb__close u-tag" onClick={onClose} ref={closeRef}>
        Bezár ✕
      </button>
    </div>
  )
}
