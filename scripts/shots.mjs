import { chromium } from 'playwright'

const OUT =
  'C:/Users/OLIVER~1/AppData/Local/Temp/claude/f--Programoz-s2-0-B-linti-Napok/f962d3c9-e40b-4168-ab72-9bbc2e49d641/scratchpad/shots'
const URL = process.env.URL || 'http://localhost:4173/'

const browser = await chromium.launch()
const errors = []

async function shoot(name, width, height, fn) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${name}] ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`[${name}] ${e.message}`))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)
  if (fn) await fn(page)
  await page.screenshot({ path: `${OUT}/${name}.png` })

  // Vízszintes túlcsordulás ellenőrzése — a törzs sose görgethessen oldalra.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  if (overflow > 0) errors.push(`[${name}] VÍZSZINTES TÚLCSORDULÁS: ${overflow}px`)

  // A főcím két sora kötött: "Törökbálinti" / "Napok". Ha több sorba tört, elcsúszott a méretezés.
  const lines = await page.evaluate(() => {
    const h1 = document.querySelector('.hero__title')
    if (!h1) return null
    const cs = getComputedStyle(h1)
    return Math.round(h1.getBoundingClientRect().height / (parseFloat(cs.fontSize) * parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)))
  })
  if (lines && lines > 2) errors.push(`[${name}] A FŐCÍM ${lines} SORBA TÖRT (2 helyett)`)

  await page.close()
}

const scrollTo = (sel) => async (page) => {
  await page.locator(sel).scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
}

await shoot('01-hero-desktop', 1440, 900)
await shoot('02-day1-desktop', 1440, 900, scrollTo('#ertek-ter'))
await shoot('03-day2-desktop', 1440, 900, scrollTo('#rozmaring'))
await shoot('04-tiles-desktop', 1440, 900, scrollTo('.tiles'))
await shoot('05-info-desktop', 1440, 900, scrollTo('#helyszin'))
await shoot('06-hero-mobile', 390, 844)
await shoot('07-day1-mobile', 390, 844, scrollTo('#ertek-ter'))
await shoot('08-day2-mobile', 390, 844, scrollTo('#rozmaring'))
await shoot('09-footer-desktop', 1440, 900, scrollTo('.foot'))
await shoot('11-footer-mobile', 390, 844, scrollTo('.foot'))
await shoot('12-lightbox', 1440, 900, async (page) => {
  await page.locator('.tiles').scrollIntoViewIfNeeded()
  await page.locator('.tile').first().click()
  await page.waitForTimeout(700)
})
await shoot('13-menu-mobile', 390, 844, async (page) => {
  await page.locator('.nav__toggle').click()
  await page.waitForTimeout(500)
})

// Teljes oldal, kicsinyítve — egyben látszik a ritmus.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(URL, { waitUntil: 'networkidle' })
await page.evaluate(() => document.querySelectorAll('.u-rise').forEach((e) => e.classList.add('is-in')))
await page.waitForTimeout(800)
await page.screenshot({ path: `${OUT}/10-fullpage.png`, fullPage: true })
await page.close()

await browser.close()
console.log(errors.length ? 'PROBLÉMÁK:\n' + errors.join('\n') : 'Nincs konzolhiba, nincs túlcsordulás.')
