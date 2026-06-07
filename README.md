# Louise Dumon — Studio Website

Minimalistische portfoliosite met riso-print esthetiek. Volledig statisch — geen server, geen database. Werkt rechtstreeks via GitHub Pages.

Je onderhoudt de site door **alleen twee tekstbestanden en je foto's** aan te passen. De rest van de code hoef je nooit aan te raken.

---

## Structuur

```
louisedumon/
│
├── index.html              ← de pagina (niet aanpassen)
├── assets/
│   ├── css/style.css       ← vormgeving (niet aanpassen)
│   └── js/main.js          ← werking (niet aanpassen)
│
├── data/                   ← HIER pas je de inhoud aan
│   ├── works.json          ← je werken (titel, prijs, foto, beschrijving)
│   └── content.json        ← bio, tagline, e-mailadres
│
└── images/
    ├── louise.jpg          ← jouw portretfoto (Over-sectie)
    ├── hero/hero.jpg       ← grote foto op de startpagina
    └── werken/             ← foto's van je werken
```

> **Belangrijk:** je past inhoud aan in de map **`data/`**. De bestanden in `assets/` zijn de techniek — daar blijf je af.

---

## Alles aanpassen via GitHub (geen software nodig)

Je kan de site volledig in je browser onderhouden, rechtstreeks op github.com:

1. Open je repository op GitHub.
2. Klik op het bestand dat je wil wijzigen (bv. `data/works.json`).
3. Klik op het **potlood-icoon** (✏️ "Edit this file") rechtsboven.
4. Pas de tekst aan (zie hieronder hoe).
5. Klik onderaan op de groene knop **"Commit changes"**.
6. Na ~1 minuut staat de wijziging live op je site.

---

## Een werk toevoegen of wijzigen — `data/works.json`

Elk werk is een blokje tussen `{ }`. Zo ziet er één uit:

```json
{
  "title": "Kom Ruw",
  "category": "keramiek",
  "year": "2024",
  "images": [
    "images/werken/kom-ruw-1.jpg",
    "images/werken/kom-ruw-2.jpg"
  ],
  "price": "€ 95",
  "description": "Met de hand opgebouwde kom, dik glazuur dat over de ruwe rand loopt."
}
```

**De velden:**

| Veld | Wat | Verplicht |
|------|-----|-----------|
| `title` | Titel van het werk | ja |
| `category` | Exact `keramiek`, `schilderij` of `illustratie` (kleine letters) | ja |
| `year` | Jaartal | ja |
| `images` | **Lijst** met foto's tussen `[ ]`, elk pad tussen `" "` en gescheiden door een komma. De eerste foto is de hoofdfoto in het overzicht; de rest verschijnt als slideshow in de pop-up | ja |
| `price` | Richtprijs, bv. `€ 95` (mag je weglaten) | nee |
| `description` | Korte beschrijving in de pop-up (mag je weglaten) | nee |

> **Eén of meerdere foto's?** Bij één foto zet je gewoon één pad in de lijst: `"images": ["images/werken/kom-ruw.jpg"]`. Bij meerdere foto's krijgt de bezoeker pijltjes en stipjes om door de foto's te bladeren. De volgorde in de lijst = de volgorde van de slideshow.

**Een werk toevoegen:** kopieer een bestaand blokje en pas de waarden aan. Zet een **komma** tussen elk blokje, maar **niet** na het laatste:

```json
[
  {
    "title": "Werk één",
    "category": "keramiek",
    "year": "2025",
    "images": ["images/werken/werk-een-1.jpg", "images/werken/werk-een-2.jpg"],
    "price": "€ 150",
    "description": "..."
  },
  {
    "title": "Werk twee",
    "category": "schilderij",
    "year": "2025",
    "images": ["images/werken/werk-twee.jpg"],
    "price": "€ 300",
    "description": "..."
  }
]
```

**Een werk verwijderen:** wis het hele blokje `{ ... }` (en de komma ervoor of erna, zodat er geen dubbele komma overblijft).

> **Tip:** de tekst staat tussen `" "` (rechte aanhalingstekens). Gebruik geen "slimme" of gebogen aanhalingstekens. Vergeet de komma's tussen de blokjes niet — dat is de meest gemaakte fout. Twijfel je? Plak de inhoud in [jsonlint.com](https://jsonlint.com) om te controleren of het klopt.

---

## Je bio en teksten aanpassen — `data/content.json`

```json
{
  "tagline": "Keramiek · Schilderkunst · Illustratie",
  "heroSubtitle": "Handgemaakt werk in klei, verf en inkt — ...",
  "ticker": "Keramiek · Schilderkunst · Illustratie · Handgemaakt",
  "aboutQuote": "Materie die *weerstand* biedt",
  "aboutBody": [
    "Eerste alinea van je bio.",
    "Tweede alinea.",
    "Derde alinea."
  ],
  "email": "louisedumon@icloud.com"
}
```

| Veld | Wat |
|------|-----|
| `tagline` | Regeltje boven je naam op de startpagina |
| `heroSubtitle` | Zinnetje onder je naam |
| `ticker` | De lopende band (oranje balk) |
| `aboutQuote` | De grote uitspraak in de Over-sectie. Zet `*sterretjes*` rond een woord om het **hol** (outline) te maken |
| `aboutBody` | Je bio in alinea's — elke alinea staat tussen `" "`, gescheiden door een komma |
| `email` | Je e-mailadres. Wordt automatisch gebruikt in het contactblok én in elke "Interesse"-knop |

---

## Foto's toevoegen of vervangen

In de GitHub web-editor: open de map `images/werken/`, klik **"Add file → Upload files"** en sleep je foto erin. Daarna verwijs je ernaar in `works.json` via het `image`-veld.

- **Portret (Over):** vervang `images/louise.jpg` door een foto met dezelfde naam.
- **Startpagina:** vervang `images/hero/hero.jpg`.
- **Werken:** upload naar `images/werken/` en gebruik die bestandsnaam in `works.json`.

**Aanbevolen:** JPEG, staand formaat voor werken, breedte 800–1200px. Comprimeer eerst via [squoosh.app](https://squoosh.app) voor snelle laadtijd. Gebruik eenvoudige bestandsnamen: kleine letters, geen spaties of accenten (bv. `vaas-zwart.jpg`).

---

## Hoe de aankoop-/interesseflow werkt

Op de site klikt een bezoeker op een werk → er opent een pop-up met de foto's (bladeren met pijltjes als er meerdere zijn), de richtprijs en een knop **"Interesse — stuur een mail"**. Die knop opent automatisch een mail naar jouw adres, met de **titel van het werk en de richtprijs al ingevuld** in onderwerp en bericht. Jij hoeft enkel te antwoorden. Direct contact, geen platform of tussenpersoon.

> Wil je later liever een echt contactformulier (zonder dat bezoekers hun mailprogramma openen)? Dat kan met een gratis dienst zoals [Formspree](https://formspree.io) of [Web3Forms](https://web3forms.com). Vraag je ontwikkelaar om dat eenmalig te koppelen.

---

## Online zetten via GitHub Pages

1. Maak een gratis account op [github.com](https://github.com).
2. Maak een nieuwe repository: `louisedumon.github.io`.
3. Upload alle bestanden (`index.html`, de mappen `assets/`, `data/` en `images/`).
4. Ga naar **Settings → Pages → Source: main branch**.
5. Je site is live op `https://louisedumon.github.io`.

> **Let op:** bekijk de site altijd via de GitHub Pages-link. Als je `index.html` lokaal dubbelklikt (vanaf je schijf) blijven de werken leeg — dat is normaal, de browser mag dan de databestanden niet inladen. Online werkt alles wél.

---

## Kleurenpalet

De accentkleuren staan bovenaan `assets/css/style.css` onder `:root` (alleen aanpassen als je de vormgeving wil wijzigen):

```css
--accent: #b8860b;       /* okergeel — knoppen, accenten */
--accent-light: #d4a017; /* lichter okergeel */
--off: #f0ebe0;          /* warme achtergrond */
```
