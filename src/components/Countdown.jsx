import { useEffect, useState } from 'react'
import { EVENT } from '../data/program'
import './countdown.css'

const TARGET = new Date(EVENT.startsAt).getTime()

function remaining() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return null
  const s = Math.floor(diff / 1000)
  return {
    nap: Math.floor(s / 86400),
    óra: Math.floor((s % 86400) / 3600),
    perc: Math.floor((s % 3600) / 60),
    mp: s % 60,
  }
}

export default function Countdown() {
  const [left, setLeft] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setLeft(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  // A rendezvény alatt / után a visszaszámláló helyét egy állapotsor veszi át.
  if (!left) {
    const over = Date.now() > new Date(EVENT.endsAt).getTime()
    return (
      <section className="cd cd--done">
        <p className="cd__done u-display">{over ? 'Köszönjük, hogy velünk tartottatok.' : 'Most zajlik — gyertek!'}</p>
      </section>
    )
  }

  return (
    <section className="cd" aria-label="Visszaszámlálás a kezdésig">
      <p className="cd__label u-tag">A kezdésig</p>

      <ol className="cd__row">
        {Object.entries(left).map(([unit, value]) => (
          <li className="cd__cell" key={unit}>
            <span className="cd__value u-display">{String(value).padStart(2, '0')}</span>
            <span className="cd__unit u-tag">{unit}</span>
          </li>
        ))}
      </ol>

      <p className="cd__note u-tag">2026. 08. 28. — 17:00 · Nádas-tó</p>
    </section>
  )
}
