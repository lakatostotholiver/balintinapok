import { EVENT } from '../data/program'
import './faq.css'

// A válaszok a hivatalos programból származnak — nincs kitalált adat (ár, jegy stb.).
const ITEMS = [
  {
    q: 'Mikor és hol lesznek a Törökbálinti Napok?',
    a: '2026. augusztus 28–30., péntektől vasárnapig. A pénteki közösségi mozi a Nádas-tó partján, a szombati Érték-tér és a vasárnapi Rozmaring fesztivál pedig a Városháza mögötti parkolóban (2045 Törökbálint, Munkácsy Mihály u. 79.) várja a látogatókat.',
  },
  {
    q: 'Milyen gyerekprogramok lesznek?',
    a: 'Sok minden: pénteken a Zootopia 2 vetítése a tóparton, szombaton az Álomzug Társulás Kocsonyakirályfi bábelőadása és a népi játszótér, vasárnap pedig az Alma Zenekar gyerekkoncertje. Egész hétvégén kézműves foglalkozások, kalandpark, kosaras körhinta, óriásjenga és szalmás ugráló várja a kicsiket.',
  },
  {
    q: 'Milyen felnőtt programok lesznek?',
    a: 'Szombat este a „Minden jó, ha swing a vége” koncert a Swing a La Django zenekar és Szőke Nikoletta előadásában, pénteken pedig a Made in Hungária esti vetítése. Vasárnap a II. Troll János Fúvószenei Találkozó és az Örömzene világslágerei, valamint főzőverseny és sörivóverseny is várja a felnőtteket.',
  },
  {
    q: 'Mit érdemes tudni a pénteki moziról?',
    a: 'A Bálinti Közösségi Mozi a Nádas-tó partján, nagyvásznon vetít: 17:00-tól a Zootopia 2, 20:00-tól a Made in Hungária. A két film között kerül sor a Szépkertek Pályázat díjátadójára.',
  },
  {
    q: 'Milyen gasztronómiai programok lesznek?',
    a: 'Vasárnap a Rozmaring fesztiválon térségi ízek kóstolója és gasztropontok várják a látogatókat, emellett hagyományos receptekkel zajló főzőverseny (10:00–13:00) és sörivóverseny is színesíti a napot.',
  },
  {
    q: 'Hol tájékozódhatok a részletekről?',
    a: `A hivatalos információk a ${EVENT.office.web} oldalon érhetők el. A szervező ${EVENT.office.name} (${EVENT.office.dept}), telefon: ${EVENT.office.phone}. A programváltoztatás jogát a szervező fenntartja.`,
  },
]

export default function Faq() {
  return (
    <section className="faq" id="gyik">
      <div className="faq__inner u-shell">
        <header className="faq__head u-rise">
          <span className="faq__index u-display" aria-hidden="true">
            05
          </span>
          <div className="faq__headMain">
            <h2 className="faq__title u-display">Gyakori kérdések</h2>
            <p className="faq__sub u-tag">Amit a leggyakrabban kérdeztek</p>
          </div>
        </header>

        <ul className="faq__list u-rise">
          {ITEMS.map((item) => (
            <li className="faq__item" key={item.q}>
              <details className="faq__d">
                <summary className="faq__q">
                  <span className="faq__qText u-display">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.4" />
                    </svg>
                  </span>
                </summary>
                <p className="faq__a">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
