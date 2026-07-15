# Törökbálinti Napok 2026

A Törökbálinti Napok (2026. augusztus 29–30.) hivatalos programoldala. React + Vite, reszponzív.

## Parancsok

```bash
npm install
npm run dev      # fejlesztői szerver
npm run build    # éles build a dist/ mappába
npm run preview  # a build kipróbálása localhost:4173-on
```

## Tartalom

A teljes programot a [`src/data/program.js`](src/data/program.js) írja le — ez az egyetlen forrás.
A `DAYS` tömb két napot tartalmaz; minden programpont `image` mezője a `public/cards/`
mappa egy fájljára hivatkozik (kiterjesztés nélkül, pl. `fb-08`).

Programmódosításhoz csak ezt a fájlt kell szerkeszteni.

## Arculat

A vizuális rendszer a logó 2×2-es csempéjéből indul: papír alap (`#fff3db`), zöld
festék (`#0d4b25`), olívazöld kiemelés (`#7e9529`). Éles élek, vonalzók árnyék helyett,
nyomdai logika. A címbetű a hivatalos **Clash Display** (helyben tárolva, woff2),
a folyószöveg **Newsreader**.

A második nap (Rozmaring fesztivál) szándékosan megfordítja a lapot: sötét alap,
papírszínű szöveg — így a két nap szerkezetében is elválik.

## Képek és betűk előkészítése

A `public/` mappa generált tartalma a verziókövetésben van, tehát az éles buildhez
nem kell újrafuttatni. Ha az eredeti arculati csomag változik:

```bash
node scripts/prep.mjs
```

Ez a szkript az `assets_raw/` mappából dolgozik:

- a Clash Display OTF fájlokat woff2-re tömöríti,
- a közösségi programkártyákból kivágja a fotót (a beégetett feliratsávok és a
  logóplakett nélkül, mert a szövegeket az oldal tipográfiája hordozza),
- előállítja a 2×2-es jelet, a megosztási képet és a rozmaringmintás alfa-maszkot.

## Ellenőrzés

```bash
npm run preview          # külön ablakban
node scripts/shots.mjs   # képernyőképek + hibakeresés
```

A `shots.mjs` asztali és mobil nézetben is végigfotózza az oldalt, és elbukik, ha
konzolhiba, vízszintes túlcsordulás vagy tört főcím van.
