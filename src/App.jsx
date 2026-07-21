import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Countdown from './components/Countdown'
import Overview from './components/Overview'
import Day from './components/Day'
import Info from './components/Info'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { DAYS } from './data/program'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <a className="u-skip" href="#program">
        Ugrás a programra
      </a>

      <Nav />

      <main>
        <Hero />
        <Ticker />
        <Countdown />
        <Overview />

        {DAYS.map((day) => (
          <Day key={day.id} day={day} />
        ))}

        <Info />
        <Faq />
      </main>

      <Footer />
    </>
  )
}
