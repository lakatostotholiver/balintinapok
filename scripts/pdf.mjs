// A nyomtatható programfüzetet a program adataiból építjük, hogy sose csússzon el
// a weboldaltól. Kimenet: public/programfuzet.pdf (A4, beágyazott Clash Display).
import { chromium } from 'playwright'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const { EVENT, DAYS } = await import(new URL('../src/data/program.js', import.meta.url))

async function b64(rel) {
  return (await readFile(resolve(root, rel))).toString('base64')
}

const fontMed = await b64('public/fonts/clash-medium.woff2')
const fontSemi = await b64('public/fonts/clash-semibold.woff2')
const fontBold = await b64('public/fonts/clash-bold.woff2')
const mark = await b64('public/brand/mark.png')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function scheduleRows(day) {
  return day.schedule
    .map(
      (i) => `
      <li class="row ${i.peak ? 'row--peak' : ''}">
        <span class="row__time">${esc(i.time)}</span>
        <span class="row__main">
          <span class="row__title">${esc(i.title)}</span>
          ${i.subtitle ? `<span class="row__sub">${esc(i.subtitle)}</span>` : ''}
          ${i.note ? `<span class="row__note">${esc(i.note)}</span>` : ''}
        </span>
      </li>`
    )
    .join('')
}

function allDayBlock(day) {
  if (!day.allDay) return ''
  const items = day.allDay.items ?? (day.allDay.grid ?? []).map((g) => g.title)
  if (!items.length) return ''
  return `
    <div class="allday">
      <h3 class="allday__label">${esc(day.allDay.label)}</h3>
      <p class="allday__body">${items.map(esc).join(' &nbsp;·&nbsp; ')}</p>
    </div>`
}

function daySection(day, i) {
  return `
    <section class="day ${i === DAYS.length - 1 ? 'day--last' : ''}">
      <header class="day__head">
        <span class="day__index">${esc(day.index)}</span>
        <div>
          <h2 class="day__name">${esc(day.name)}</h2>
          ${day.tagline ? `<p class="day__tag">„${esc(day.tagline)}”</p>` : ''}
        </div>
        <div class="day__when">
          <span class="day__date">${esc(day.dateLabel)}</span>
          <span class="day__wd">${esc(day.weekday)}</span>
        </div>
      </header>
      <p class="day__venue">Helyszín · ${esc(day.venue ?? EVENT.venue)}</p>
      ${day.lead ? `<p class="day__lead">${esc(day.lead)}</p>` : ''}
      <ol class="rows">${scheduleRows(day)}</ol>
      ${allDayBlock(day)}
    </section>`
}

const hoursRows = EVENT.office.hours
  .map((h) => `<span class="hours__row"><b>${esc(h.day)}</b> ${esc(h.time)}</span>`)
  .join('')

const html = `<!doctype html><html lang="hu"><head><meta charset="utf-8" />
<style>
  @font-face { font-family:'Clash Display'; font-weight:500; src:url(data:font/woff2;base64,${fontMed}) format('woff2'); }
  @font-face { font-family:'Clash Display'; font-weight:600; src:url(data:font/woff2;base64,${fontSemi}) format('woff2'); }
  @font-face { font-family:'Clash Display'; font-weight:700; src:url(data:font/woff2;base64,${fontBold}) format('woff2'); }

  :root {
    --ink:#0d4b25; --ink-deep:#073318; --olive:#7e9529; --paper:#fff3db; --chalk:#fff9ee;
    --disp:'Clash Display','Trebuchet MS',sans-serif; --text:Georgia,'Times New Roman',serif;
  }
  @page { size:A4; margin:0; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:var(--text); color:var(--ink); background:var(--paper);
    -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .disp { font-family:var(--disp); font-weight:700; text-transform:uppercase;
    letter-spacing:-0.02em; word-spacing:0.12em; line-height:0.9; margin:0; }
  .tag { font-family:var(--disp); font-weight:500; text-transform:uppercase;
    letter-spacing:0.16em; font-size:8.5pt; }

  .page { width:210mm; min-height:297mm; padding:16mm 16mm 14mm; position:relative;
    page-break-after:always; overflow:hidden; }
  .page:last-child { page-break-after:auto; }

  /* ---- borító ---- */
  .cover { background:var(--paper); display:flex; flex-direction:column; }
  .cover__kicker { display:flex; align-items:center; gap:10px; padding-bottom:8px;
    border-bottom:2px solid var(--ink); }
  .cover__kicker span:last-child { margin-left:auto; }
  .cover__title { font-size:58pt; margin:14mm 0 4mm; }
  .cover__title em { color:var(--olive); font-style:normal; }
  .cover__dates { display:flex; align-items:flex-end; gap:8px; border-top:2px solid var(--ink);
    padding-top:6mm; margin-top:2mm; }
  .cover__day { font-family:var(--disp); font-weight:700; font-size:40pt; line-height:0.8; }
  .cover__dash { font-family:var(--disp); font-weight:700; font-size:30pt; color:var(--olive); }
  .cover__month { font-family:var(--disp); font-weight:500; text-transform:uppercase;
    letter-spacing:0.14em; font-size:10pt; line-height:1.5; border-left:2px solid var(--olive);
    padding-left:10px; margin-left:6px; }
  .cover__index { margin-top:auto; display:grid; gap:0; border-top:2px solid var(--ink); }
  .cover__row { display:grid; grid-template-columns:auto 1fr auto; gap:14px; align-items:baseline;
    padding:5mm 0; border-bottom:1px solid rgba(13,75,37,0.25); }
  .cover__num { font-family:var(--disp); font-weight:700; font-size:20pt; color:transparent;
    -webkit-text-stroke:1.4px var(--olive); }
  .cover__name { font-family:var(--disp); font-weight:600; text-transform:uppercase;
    letter-spacing:0.01em; font-size:14pt; }
  .cover__where { font-size:10pt; opacity:0.62; font-style:italic; }
  .cover__when { text-align:right; }
  .cover__foot { margin-top:6mm; padding-top:4mm; border-top:2px solid var(--ink);
    display:flex; align-items:center; gap:12px; }
  .cover__mark { width:16mm; height:16mm; background:var(--chalk); padding:2mm; }
  .cover__mark img { width:100%; height:100%; display:block; }
  .cover__org { font-size:9.5pt; line-height:1.5; }

  /* ---- napok ---- */
  .day { padding-bottom:9mm; margin-bottom:9mm; border-bottom:2px solid var(--ink); }
  .day--last { border-bottom:none; }
  /* Minden nap saját oldalon: nincs szükség nap végi elválasztóra. */
  .page--day .day { border-bottom:none; margin-bottom:0; padding-bottom:0; }
  .day__head { display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:start;
    padding-bottom:4mm; border-bottom:2px solid var(--ink); break-inside:avoid; break-after:avoid; }
  .day__venue, .day__lead { break-after:avoid; }
  .allday { break-inside:avoid; }
  .day__index { font-family:var(--disp); font-weight:700; font-size:26pt; color:transparent;
    -webkit-text-stroke:1.6px var(--olive); line-height:0.8; }
  .day__name { font-family:var(--disp); font-weight:700; text-transform:uppercase;
    letter-spacing:-0.02em; font-size:24pt; line-height:0.98; margin:0; }
  .day__tag { margin:2mm 0 0; font-style:italic; font-size:10.5pt; opacity:0.8; }
  .day__when { text-align:right; display:grid; gap:3px; }
  .day__date { font-family:var(--disp); font-weight:600; text-transform:uppercase;
    letter-spacing:0.1em; font-size:9.5pt; }
  .day__wd { font-family:var(--disp); font-weight:500; text-transform:uppercase;
    letter-spacing:0.14em; font-size:8.5pt; color:var(--olive); }
  .day__venue { display:inline-block; margin:4mm 0 0; padding:2px 9px; font-family:var(--disp);
    font-weight:500; text-transform:uppercase; letter-spacing:0.1em; font-size:8pt;
    border:1.6px solid var(--olive); color:var(--olive); }
  .day__lead { margin:3mm 0 4mm; font-size:10.5pt; line-height:1.5; max-width:150mm; opacity:0.9; }

  .rows { list-style:none; margin:0; padding:0; border-top:1px solid rgba(13,75,37,0.25); }
  .row { display:grid; grid-template-columns:30mm 1fr; gap:8mm; padding:3mm 0;
    border-bottom:1px solid rgba(13,75,37,0.22); break-inside:avoid; }
  .row__time { font-family:var(--disp); font-weight:500; text-transform:uppercase;
    letter-spacing:0.08em; font-size:9.5pt; color:var(--olive); padding-top:1.5mm; }
  .row__main { display:grid; gap:1.5mm; }
  .row__title { font-family:var(--disp); font-weight:600; text-transform:uppercase;
    letter-spacing:-0.005em; font-size:13pt; line-height:1; }
  .row__sub { font-style:italic; font-size:10pt; opacity:0.75; }
  .row__note { font-size:9.5pt; opacity:0.68; line-height:1.45; }
  .row--peak .row__time { color:var(--ink); }
  .row--peak .row__title::after { content:'★'; color:var(--olive); margin-left:6px; font-size:9pt;
    vertical-align:middle; }

  .allday { margin-top:5mm; background:var(--olive); color:var(--chalk); padding:4mm 5mm; }
  .allday__label { margin:0 0 2mm; font-family:var(--disp); font-weight:500; text-transform:uppercase;
    letter-spacing:0.14em; font-size:8.5pt; opacity:0.9; }
  .allday__body { margin:0; font-family:var(--disp); font-weight:500; text-transform:uppercase;
    letter-spacing:0.01em; font-size:10pt; line-height:1.5; }

  /* ---- lábléc (utolsó oldal) ---- */
  .info { background:var(--ink-deep); color:var(--paper); }
  .info__title { color:var(--chalk); font-size:30pt; margin-bottom:6mm;
    padding-bottom:4mm; border-bottom:2px solid rgba(255,243,219,0.3); }
  .info__cols { display:grid; grid-template-columns:1fr 1fr; gap:8mm; }
  .info__label { color:var(--olive); margin:0 0 2mm; }
  .info__body { margin:0 0 6mm; font-size:10.5pt; line-height:1.7; }
  .info__body b { font-weight:400; opacity:0.6; display:inline-block; min-width:22mm; }
  .hours { display:grid; gap:2mm; }
  .hours__row b { font-weight:400; opacity:0.6; display:inline-block; min-width:20mm; }
  .info__disc { margin-top:10mm; padding-top:4mm; border-top:2px solid rgba(255,243,219,0.3);
    font-size:9pt; opacity:0.6; line-height:1.5; }
</style></head>
<body>

  <div class="page cover">
    <div class="cover__kicker tag"><span>${esc(EVENT.organiser)}</span><span>${EVENT.year}</span></div>
    <h1 class="cover__title disp">Törökbálinti<br /><em>Napok</em></h1>
    <div class="cover__dates">
      <span class="cover__day">28</span><span class="cover__dash">–</span><span class="cover__day">30</span>
      <span class="cover__month">Augusztus<br />Péntek — vasárnap</span>
    </div>

    <div class="cover__index">
      ${DAYS.map(
        (d) => `<div class="cover__row">
        <span class="cover__num">${esc(d.index)}</span>
        <span><span class="cover__name">${esc(d.name)}</span><br /><span class="cover__where">${esc(
          d.venue ?? EVENT.venue
        )}</span></span>
        <span class="cover__when"><span class="day__date">${esc(d.dateLabel)}</span><br /><span class="day__wd">${esc(
          d.weekday
        )}</span></span>
      </div>`
      ).join('')}
    </div>

    <div class="cover__foot">
      <span class="cover__mark"><img src="data:image/png;base64,${mark}" alt="" /></span>
      <span class="cover__org">${esc(EVENT.venue)} · ${esc(EVENT.venue2)}<br />${esc(
  EVENT.address
)}</span>
    </div>
  </div>

  ${DAYS.map((d, i) => `<div class="page page--day">${daySection(d, i)}</div>`).join('')}

  <div class="page info">
    <h2 class="info__title disp">Információ</h2>
    <div class="info__cols">
      <div>
        <h3 class="info__label tag">Szervező</h3>
        <p class="info__body">${esc(EVENT.office.name)}<br />${esc(EVENT.office.dept)}<br />${esc(
  EVENT.office.postal
)}</p>
        <h3 class="info__label tag">Elérhetőség</h3>
        <p class="info__body"><b>Telefon</b>${esc(EVENT.office.phone)}<br /><b>Web</b>${esc(
  EVENT.office.web
)}</p>
      </div>
      <div>
        <h3 class="info__label tag">Ügyfélfogadás</h3>
        <div class="hours info__body">${hoursRows}</div>
        <h3 class="info__label tag">Helyszínek</h3>
        <p class="info__body"><b>Hétvége</b>${esc(EVENT.venue)}<br /><b>Péntek</b>${esc(
  EVENT.venue2
)} — közösségi mozi</p>
      </div>
    </div>
    <p class="info__disc">A programváltoztatás jogát a szervező fenntartja. · ${esc(
      EVENT.dates
    )} · © ${EVENT.year} ${esc(EVENT.organiser)}</p>
  </div>

</body></html>`

// Ellenőrzéshez: PDF_DEBUG=1 mellett kiírjuk a füzet HTML-jét is.
if (process.env.PDF_DEBUG) await writeFile(resolve(root, 'scripts/.programfuzet.html'), html)

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const out = resolve(root, 'public/programfuzet.pdf')
await page.pdf({ path: out, format: 'A4', printBackground: true })
await browser.close()

console.log('PDF kész:', out)
