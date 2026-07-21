import { EVENT } from '../data/program'
import './footer.css'

export default function Footer() {
  const o = EVENT.office

  return (
    <footer className="foot">
      <div className="foot__texture" aria-hidden="true">
        <span className="u-sprigs" />
      </div>

      <div className="foot__inner u-shell">
        {/* A logó eredeti felirata is Clash Display, ezért a sötét alapra élő szövegként
            építjük újra a lockupot — a plaketten ülő jel a hivatalos arculat megoldása. */}
        <div className="foot__lockup">
          <span className="foot__plate">
            <img src="/brand/mark.png" alt="" width="256" height="256" />
          </span>
          <span className="foot__word">
            <span className="foot__wordLine u-display">Törökbálinti</span>
            <span className="foot__wordLine u-display">
              Napok
              <span className="foot__badge u-tag">Augusztus 28–30.</span>
            </span>
          </span>
        </div>

        {/* Hivatalos elérhetőségek a torokbalint.hu-ról. */}
        <div className="foot__cols">
          <div className="foot__col">
            <h3 className="foot__colLabel u-tag">Szervező</h3>
            <p className="foot__colBody">
              {o.name}
              <br />
              <span className="foot__faint">{o.dept}</span>
            </p>
          </div>

          <div className="foot__col">
            <h3 className="foot__colLabel u-tag">Elérhetőség</h3>
            <p className="foot__colBody">
              {o.postal}
              <br />
              <a className="foot__inline" href={o.phoneHref}>
                {o.phone}
              </a>
              <br />
              <a
                className="foot__inline"
                href={EVENT.organiserUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {o.web}
              </a>
            </p>
          </div>

          <div className="foot__col">
            <h3 className="foot__colLabel u-tag">Ügyfélfogadás</h3>
            <ul className="foot__hours">
              {o.hours.map((h) => (
                <li key={h.day}>
                  <span className="foot__faint">{h.day}</span>
                  {h.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="foot__col">
            <h3 className="foot__colLabel u-tag">Letöltés</h3>
            <a className="foot__pdf u-tag" href="/programfuzet.pdf" target="_blank" rel="noopener noreferrer">
              Programfüzet (PDF)
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </a>
          </div>
        </div>

        <div className="foot__row">
          <p className="foot__meta u-tag">
            {EVENT.venue} · {EVENT.venue2}
            <br />
            {EVENT.dates}
          </p>

          <nav className="foot__nav u-tag" aria-label="Lábléc">
            <a href="#mozi">Közösségi mozi</a>
            <a href="#ertek-ter">Érték-tér</a>
            <a href="#rozmaring">Rozmaring fesztivál</a>
            <a href="#helyszin">Helyszín</a>
            <a href="#gyik">GYIK</a>
            <a href={EVENT.organiserUrl} target="_blank" rel="noopener noreferrer">
              torokbalint.hu
            </a>
          </nav>

          <p className="foot__copy u-tag">
            © {EVENT.year} {EVENT.organiser}
          </p>
        </div>
      </div>
    </footer>
  )
}
