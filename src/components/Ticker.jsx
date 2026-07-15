import './ticker.css'

const PHRASES = [
  'Augusztus 29–30.',
  'Városháza mögötti parkoló',
  'Érték-tér',
  'Rozmaring, ami összeköt',
  'Két nap, egy város',
]

export default function Ticker() {
  // Kétszer futtatjuk ugyanazt a sort, így a ciklus varrat nélkül zárul.
  const run = [...PHRASES, ...PHRASES]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {run.map((phrase, i) => (
          <span className="ticker__item u-tag" key={i}>
            {phrase}
            <svg className="ticker__sprig" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 22V6" />
              <path d="M12 12c0-3 2-5 5-5.5M12 12c0-3-2-5-5-5.5M12 17c0-2.6 1.8-4.4 4.4-4.9M12 17c0-2.6-1.8-4.4-4.4-4.9M12 7c0-2.2 1.4-3.6 3.4-4.2M12 7c0-2.2-1.4-3.6-3.4-4.2" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
