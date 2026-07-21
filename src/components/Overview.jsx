import { EVENT, DAYS } from '../data/program'
import './overview.css'

// A tetején futó „mi lesz és mikor” felsorolás — a teljes hétvége egy pillantásra.
export default function Overview() {
  return (
    <section className="ov" id="program">
      <div className="ov__inner u-shell">
        <header className="ov__head u-rise">
          <span className="ov__index u-display" aria-hidden="true">
            00
          </span>
          <div className="ov__headMain">
            <h2 className="ov__title u-display">Program</h2>
            <p className="ov__sub u-tag">Három nap · {EVENT.dates}</p>
          </div>
          <a className="ov__pdf u-tag" href="/programfuzet.pdf" target="_blank" rel="noopener noreferrer">
            Programfüzet PDF
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" />
            </svg>
          </a>
        </header>

        <ol className="ov__days u-rise">
          {DAYS.map((day) => (
            <li className="ov__day" key={day.id}>
              <a className="ov__link" href={`#${day.id}`}>
                <div className="ov__meta">
                  <span className="ov__num u-display" aria-hidden="true">
                    {day.index}
                  </span>
                  <span className="ov__date u-tag">{day.dateLabel}</span>
                  <span className="ov__wd u-tag">{day.weekday}</span>
                  <span className="ov__name u-display">{day.name}</span>
                  <span className="ov__venue u-tag">{day.venue ?? EVENT.venue}</span>
                </div>

                <ul className="ov__list">
                  {day.schedule.map((item) => (
                    <li className="ov__row" key={item.time + item.title}>
                      <span className="ov__time u-tag">{item.time}</span>
                      <span className="ov__what">
                        {item.title}
                        {item.subtitle && <span className="ov__whatSub"> — {item.subtitle}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
