import { EVENT } from '../data/program'
import './footer.css'

export default function Footer() {
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
              <span className="foot__badge u-tag">Augusztus 29–30.</span>
            </span>
          </span>
        </div>

        <div className="foot__row">
          <p className="foot__meta u-tag">
            {EVENT.venue}
            <br />
            {EVENT.dates}
          </p>

          <nav className="foot__nav u-tag" aria-label="Lábléc">
            <a href="#ertek-ter">Érték-tér</a>
            <a href="#rozmaring">Rozmaring fesztivál</a>
            <a href="#helyszin">Helyszín</a>
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
