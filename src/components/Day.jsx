import { useState } from 'react'
import TileGrid from './TileGrid'
import './day.css'

function Row({ item, onFocusItem, isActive }) {
  const interactive = Boolean(item.image)

  return (
    <li
      className={`row ${item.peak ? 'row--peak' : ''} ${isActive ? 'is-active' : ''}`}
      onMouseEnter={interactive ? () => onFocusItem(item) : undefined}
      onFocus={interactive ? () => onFocusItem(item) : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <span className="row__time u-tag">{item.time}</span>

      <span className="row__main">
        <span className="row__title u-display">{item.title}</span>
        {item.subtitle && <span className="row__subtitle">{item.subtitle}</span>}
        {item.note && <span className="row__note">{item.note}</span>}
      </span>

      {/* Mobilon a bélyegkép a sorban ül, asztali nézetben a jobb oldali előnézet veszi át. */}
      {item.image && (
        <img className="row__thumb" src={`/cards/${item.image}-sm.webp`} alt="" loading="lazy" width="420" height="420" />
      )}

      {item.peak && <span className="row__peak u-tag">Kiemelt</span>}
    </li>
  )
}

export default function Day({ day }) {
  const withImages = day.schedule.filter((i) => i.image)
  const [preview, setPreview] = useState(withImages[0] ?? null)

  return (
    <section className={`day day--${day.tone}`} id={day.id}>
      {day.tone === 'dark' && (
        <div className="day__texture" aria-hidden="true">
          <span className="u-sprigs" />
        </div>
      )}

      <div className="day__inner u-shell">
        <header className="day__head u-rise">
          <span className="day__index u-display" aria-hidden="true">
            {day.index}
          </span>

          <div className="day__headMain">
            <h2 className="day__name u-display">{day.name}</h2>
            {day.tagline && <p className="day__tagline">„{day.tagline}”</p>}
            {day.venue && <p className="day__venue u-tag">Helyszín · {day.venue}</p>}
          </div>

          <p className="day__date u-tag">
            {day.dateLabel}
            <span className="day__weekday">{day.weekday}</span>
          </p>
        </header>

        <p className="day__lead u-rise">{day.lead}</p>

        <div
          className={`day__grid ${day.tone === 'dark' ? 'day__grid--preview' : ''} ${
            !day.allDay ? 'day__grid--solo' : ''
          }`}
        >
          <ol className="day__list u-rise">
            {day.schedule.map((item) => (
              <Row
                key={item.time + item.title}
                item={item}
                isActive={preview?.title === item.title}
                onFocusItem={setPreview}
              />
            ))}
          </ol>

          {/* NAP 01 — a napközbeni kínálat a jobb hasábban fut, olívazöld tömbben. */}
          {day.allDay?.items && (
            <aside className="allday u-rise">
              <h3 className="allday__label u-tag">{day.allDay.label}</h3>
              <ul className="allday__list">
                {day.allDay.items.map((item) => (
                  <li className="allday__item u-display" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* NAP 02 — a kiválasztott programpont képe követi a listát. */}
          {day.tone === 'dark' && preview && (
            <aside className="preview" aria-hidden="true">
              <div className="preview__frame">
                <img src={`/cards/${preview.image}.webp`} alt="" width="900" height="900" />
              </div>
              <p className="preview__caption u-tag">
                <span className="preview__time">{preview.time}</span>
                {preview.title}
              </p>
            </aside>
          )}
        </div>

        {day.allDay?.grid && <TileGrid label={day.allDay.label} items={day.allDay.grid} />}
      </div>
    </section>
  )
}
