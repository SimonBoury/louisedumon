# Louise Dumon — Studio Website

Minimalistische portfoliosite met riso-print esthetiek. Volledig statisch — geen server, geen database. Werkt rechtstreeks via GitHub Pages.

---

## Structuur

```
louise-dumon/
│
├── index.html          ← de volledige website (1 bestand)
│
└── images/
    ├── louise.jpg      ← jouw portretfoto (Over-sectie)
    ├── hero/
    │   └── hero.jpg    ← grote foto op de startpagina
    └── werken/
        ├── kom-i.jpg
        ├── kruik.jpg
        └── ...         ← foto's van je werken
```

---

## Werken toevoegen of wijzigen

Open `index.html` in een tekstverwerker (Kladblok, TextEdit, VS Code…).

Zoek deze sectie (staat onderaan in het bestand):

```js
const works=[
  {title:'Kom I', cat:'keramiek', year:'2025', img:'images/werken/kom-i.jpg'},
  ...
];
```

**Een werk toevoegen:**
```js
{title:'Nieuwe Vaas', cat:'keramiek', year:'2025', img:'images/werken/nieuwe-vaas.jpg'},
```
Sla de bijbehorende foto op als `images/werken/nieuwe-vaas.jpg`.

**Een werk verwijderen:** verwijder de hele regel.

**Categorieën:** gebruik exact `keramiek`, `schilderij` of `illustratie` (kleine letters).

---

## Foto's

- **Portret:** vervang `images/louise.jpg` door een nieuwe foto met dezelfde bestandsnaam.
- **Hero (startpagina):** vervang `images/hero/hero.jpg`.
- **Werken:** sla foto's op in `images/werken/` en gebruik die bestandsnaam in de lijst hierboven.

**Aanbevolen formaat:** JPEG, breedte 800–1200px, zo klein mogelijk (gebruik [Squoosh](https://squoosh.app) om te comprimeren).

---

## Teksten aanpassen

Zoek in `index.html` naar de tekst die je wil wijzigen en pas die aan. De belangrijkste plekken:

| Wat | Zoek naar |
|-----|-----------|
| Tagline onder de naam | `Handgemaakt werk in klei, verf en inkt` |
| Biografie | `Louise Dumon werkt met keramiek` |
| E-mailadres | `louise@louisedumon.be` (staat op 3 plaatsen) |
| Instagram handle | `@louisedumon.studio` |
| Ticker (lopende band) | `Keramiek · Schilderkunst · Illustratie` |

---

## Online zetten via GitHub Pages

1. Maak een gratis account op [github.com](https://github.com)
2. Maak een nieuwe repository aan, naam: `louisedumon.github.io`
3. Upload alle bestanden (index.html + images-map)
4. Ga naar **Settings → Pages → Source: main branch**
5. Je site is live op `https://louisedumon.github.io`

**Daarna aanpassen:** upload gewoon een nieuw bestand met dezelfde naam — GitHub vervangt het automatisch.

---

## Kleurenpalet

De site gebruikt drie kleuren die je eventueel kunt aanpassen in `:root` bovenaan `index.html`:

```css
--accent: #b8860b;       /* okergeel — knoppen, accenten */
--accent-light: #d4a017; /* lichter okergeel */
--off: #f0ebe0;          /* warme achtergrond */
```
