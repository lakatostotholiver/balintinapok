import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import wawoff2 from 'wawoff2'

const SRC = 'F:/Programozás2.0/Bálinti Napok/assets_raw'
const OUT = 'F:/Programozás2.0/Bálinti Napok/website/public'

const root = path.join(SRC, (await readdir(SRC))[0])
const rozDir = path.join(root, (await readdir(root)).find((d) => d.startsWith('rozmaring')))

await mkdir(path.join(OUT, 'fonts'), { recursive: true })
await mkdir(path.join(OUT, 'cards'), { recursive: true })
await mkdir(path.join(OUT, 'brand'), { recursive: true })

// 1. Fonts: OTF -> WOFF2
const fontDir = path.join(root, 'font', 'clash-display-font')
for (const f of (await readdir(fontDir)).filter((f) => f.endsWith('.otf'))) {
  const weight = f.replace('ClashDisplay-', '').replace('.otf', '').toLowerCase()
  const otf = await readFile(path.join(fontDir, f))
  const woff2 = await wawoff2.compress(otf)
  await writeFile(path.join(OUT, 'fonts', `clash-${weight}.woff2`), woff2)
  console.log(`font  clash-${weight}.woff2  ${(otf.length / 1024) | 0}KB -> ${(woff2.length / 1024) | 0}KB`)
}

// 2. Programkártyák -> csak a fotó.
// A közösségi kártyák egységes sablonra készültek: fent a logóplakett, lent a zöld
// feliratsávok. Mindkettőt levágjuk, mert a szöveget az oldal tipográfiája hordozza —
// különben minden cím kétszer szerepelne. Ami marad, az a fotósáv; abból a sharp
// "attention" vágása választja ki a legfontosabb részletet.
const PHOTO_TOP = 0.155
const PHOTO_BOTTOM = 0.65
const CREAM_RATIO = 0.45

// A fotó oldalt is beljebb ül egy krémszínű kereten belül (a sablonban ~124px).
// Oszloponként megnézzük, hol ér véget a krém, és csak a valódi fotót tartjuk meg.
async function photoBox(file) {
  const { width, height } = await sharp(file).metadata()
  const top = Math.round(height * PHOTO_TOP)
  const h = Math.round(height * (PHOTO_BOTTOM - PHOTO_TOP))
  const { data, info } = await sharp(file)
    .extract({ left: 0, top, width, height: h })
    .raw()
    .toBuffer({ resolveWithObject: true })

  // A márka krémje ~#FFF3DB: világos, meleg, alacsony telítettségű.
  const isCream = (x, y) => {
    const i = (y * info.width + x) * info.channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    return r > 230 && g > 218 && b > 185 && r - b > 10 && r - b < 75 && Math.abs(r - g) < 28
  }
  const creamRatio = (x) => {
    let n = 0
    let t = 0
    for (let y = 0; y < info.height; y += 3, t++) if (isCream(x, y)) n++
    return n / t
  }

  const limit = Math.floor(info.width * 0.35)
  let left = 0
  while (left < limit && creamRatio(left) > CREAM_RATIO) left++
  let right = info.width - 1
  while (info.width - 1 - right < limit && creamRatio(right) > CREAM_RATIO) right--

  return { left, top, width: right - left + 1, height: h }
}

// fb-16 a Rozmaring kulcsvizuál (csak logó, fotó nélkül) — az oldalon nincs rá szükség.
const cards = (await readdir(rozDir)).filter((f) => /^fb-\d+\.jpg$/.test(f) && f !== 'fb-16.jpg').sort()
for (const f of cards) {
  const name = f.replace('.jpg', '')
  const file = path.join(rozDir, f)
  const photo = await sharp(file).extract(await photoBox(file)).toBuffer()

  for (const [size, quality, suffix] of [
    [900, 80, ''],
    [420, 72, '-sm'],
  ]) {
    await sharp(photo)
      // Az "attention" a sáv legfontosabb részletére vágja a négyzetet.
      .resize(size, size, { fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality })
      .toFile(path.join(OUT, 'cards', `${name}${suffix}.webp`))
  }
  console.log(`card  ${name}.webp`)
}

// 3. Arculat. A lockup feliratát az oldal élő szövegként szedi (ugyanaz a Clash Display),
// ezért csak a 2×2-es jelre van szükség: az a logó bal szélén ülő négyzet.
const logoPng = path.join(root, 'logo', (await readdir(path.join(root, 'logo'))).find((f) => f.endsWith('.png')))
const meta = await sharp(logoPng).metadata()
await sharp(logoPng)
  .extract({ left: 0, top: 0, width: meta.height, height: meta.height })
  .resize(256, 256)
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'brand', 'mark.png'))

// Megosztási kép a hivatalos borítóból.
await sharp(path.join(root, 'fb_tb-01.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'left' })
  .jpeg({ quality: 86 })
  .toFile(path.join(OUT, 'brand', 'og.jpg'))

// 4. Rosemary pattern -> alpha PNG used as a CSS mask, so it can be tinted per section.
// The source art is flat #ece3d0 line work on transparent; the alpha channel is the ink.
// Keep the native alpha: ink opaque, ground transparent, so mask-image (alpha mode) tints it.
const patSvg = await readFile(path.join(root, 'logo', 'pattern.svg'))
await sharp(patSvg, { density: 72 })
  .resize({ width: 1000 })
  .ensureAlpha()
  .png({ compressionLevel: 9, palette: true, colours: 8 })
  .toFile(path.join(OUT, 'brand', 'rosemary-mask.png'))

console.log('\ndone')
