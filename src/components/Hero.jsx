import { EVENT, DAYS } from '../data/program'
import './hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__texture" aria-hidden="true">
        <span className="u-sprigs" />
      </div>

      <div className="hero__inner">
        <p className="hero__kicker u-tag">
          <span>{EVENT.organiser}</span>
          <span className="hero__kickerDot" aria-hidden="true" />
          <span>{EVENT.year}</span>
        </p>

        <h1 className="hero__title u-display">
          Törökbálinti
          <br />
          <span className="hero__titleAccent">Napok</span>
        </h1>

        <div className="hero__body">
          <p className="hero__when">
            <span className="hero__day u-display">28</span>
            <span className="hero__dash u-display" aria-hidden="true">
              –
            </span>
            <span className="hero__day u-display">30</span>
            <span className="hero__month u-tag">
              Augusztus
              <br />
              Péntek — vasárnap
            </span>
          </p>

          <aside className="hero__rail">
            <dl className="hero__meta">
              <dt className="u-tag">Helyszínek</dt>
              <dd>
                {EVENT.venue}
                <br />
                <span className="hero__metaFaint">Pénteken: {EVENT.venue2}</span>
              </dd>

              <dt className="u-tag">Három nap, három arc</dt>
              <dd>
                Bálinti Közösségi Mozi
                <br />
                Érték-tér
                <br />
                Rozmaring fesztivál
              </dd>
            </dl>

            <a className="hero__cta" href="#program">
              <span className="u-tag">Programok</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="hero__ctaArrow">
                <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </a>
          </aside>
        </div>
      </div>

      {/* A logó sakktáblája navigációként: a két nap egy-egy csempe. */}
      <div className="hero__split">
        {DAYS.map((day) => (
          <a key={day.id} className={`hero__tile hero__tile--${day.tone}`} href={`#${day.id}`}>
            <span className="hero__tileNum u-tag">{day.index}</span>
            <span className="hero__tileName u-display">{day.short ?? day.name}</span>
            <span className="hero__tileDate u-tag">
              {day.dateLabel} <span className="hero__tileWd">{day.weekday}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
