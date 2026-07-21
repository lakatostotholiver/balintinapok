import { EVENT } from '../data/program'
import './info.css'

export default function Info() {
  return (
    <section className="info" id="helyszin">
      <div className="info__inner u-shell">
        <header className="info__head u-rise">
          <span className="info__index u-display" aria-hidden="true">
            04
          </span>
          <h2 className="info__title u-display">Helyszín</h2>
        </header>

        <div className="info__grid">
          <div className="info__block u-rise">
            <h3 className="u-tag info__label">Helyszínek</h3>

            <p className="info__venue u-display">{EVENT.venue}</p>
            <p className="info__addr">{EVENT.address}</p>
            <p className="info__venueNote u-tag">Érték-tér · Rozmaring fesztivál</p>
            <a className="info__link" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer">
              Megnyitás térképen
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </a>

            <p className="info__venue info__venue--second u-display">{EVENT.venue2}</p>
            <p className="info__venueNote u-tag">Pénteki közösségi mozi</p>
            <a className="info__link" href={EVENT.maps2Url} target="_blank" rel="noopener noreferrer">
              Megnyitás térképen
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </a>
          </div>

          <div className="info__block u-rise">
            <h3 className="u-tag info__label">Mikor</h3>
            <ul className="info__when">
              <li>
                <span className="u-tag">Péntek</span>
                <span className="info__whenMain">Augusztus 28. — 17:00-tól</span>
                <span className="info__whenSub">Bálinti Közösségi Mozi · Nádas-tó</span>
              </li>
              <li>
                <span className="u-tag">Szombat</span>
                <span className="info__whenMain">Augusztus 29. — 14:00-tól</span>
                <span className="info__whenSub">Érték-tér</span>
              </li>
              <li>
                <span className="u-tag">Vasárnap</span>
                <span className="info__whenMain">Augusztus 30. — 10:30-tól</span>
                <span className="info__whenSub">Rozmaring fesztivál</span>
              </li>
            </ul>
          </div>

          <div className="info__block u-rise">
            <h3 className="u-tag info__label">Szervező</h3>
            <p className="info__org">{EVENT.office.name}</p>
            <p className="info__orgSub">{EVENT.office.dept}</p>
            <p className="info__addr">{EVENT.office.postal}</p>
            <a className="info__link" href={EVENT.office.phoneHref}>
              {EVENT.office.phone}
            </a>
            <a className="info__link info__link--web" href={EVENT.organiserUrl} target="_blank" rel="noopener noreferrer">
              {EVENT.office.web}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </a>
            <p className="info__disclaimer">A programváltoztatás jogát a szervező fenntartja.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
