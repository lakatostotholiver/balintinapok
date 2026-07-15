import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Countdown from './components/Countdown'
import Day from './components/Day'
import Info from './components/Info'
import Footer from './components/Footer'
import { DAYS } from './data/program'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <a className="u-skip" href="#ertek-ter">
        Ugrás a programra
      </a>

      <Nav />

      <main>
        <Hero />
        <Ticker />
        <Countdown />

        {DAYS.map((day) => (
          <Day key={day.id} day={day} />
        ))}

        <Info />
      </main>

      <Footer />
    </>
  )
}
