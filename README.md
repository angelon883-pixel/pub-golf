# 🍺 Pub Golf App

Een GPS-gestuurd pub golf spel voor twee groepen, gebouwd als Progressive Web App (PWA). Werkt volledig in de browser — geen installatie nodig.

## 🚀 Live spelen

Zet de app op **GitHub Pages** zodat iedereen hem gewoon via een URL kan openen:

1. Push deze repo naar GitHub
2. Ga naar **Settings → Pages → Branch: main → Save**
3. De app is live op: `https://[jouw-gebruikersnaam].github.io/pub-golf/pub-golf.html`

Stuur die link via WhatsApp naar beide groepen — klaar.

---

## 📁 Bestandsstructuur

```
pub-golf/
├── pub-golf.html     # De volledige app (één bestand)
├── manifest.json     # PWA manifest (icoontje, naam, kleuren)
├── sw.js             # Service worker (offline ondersteuning)
└── README.md         # Dit bestand
```

---

## 📱 Installeren als app (PWA)

**iPhone (Safari):**
1. Open de link in Safari
2. Tik op het deel-icoontje (vierkantje met pijltje)
3. Kies "Zet op beginscherm"

**Android (Chrome):**
1. Open de link in Chrome
2. Tik op "Toevoegen aan beginscherm" (verschijnt automatisch)

---

## ✏️ Aanpassen met Claude Code

```bash
# Installeer Claude Code
npm install -g @anthropic-ai/claude-code

# Clone je repo
git clone https://github.com/[jouw-gebruikersnaam]/pub-golf.git
cd pub-golf

# Start Claude Code
claude
```

Voorbeelden van wat je kunt vragen:
- *"Voeg een sober mode toe voor niet-drinkers"*
- *"Voeg een countdown timer toe per hole"*
- *"Verander het kleurenschema naar blauw/paars"*
- *"Voeg groepsnamen toe die je kunt instellen"*

Na aanpassingen pushen:
```bash
git add .
git commit -m "Beschrijving van de aanpassing"
git push
```

GitHub Pages is dan binnen ~30 seconden bijgewerkt.

---

## ⚙️ Features

- 🗺️ **GPS navigatie** — volgt je positie live, centreert de kaart op jou
- 🔓 **Auto-unlock clues** — clue verschijnt automatisch als je binnen 80m bent
- 🃏 **Wildcard challenges** — random extra regel bij aangewezen holes
- ⭐ **Geheime bonus hole** — verschijnt als verrassing na een instelbare hole
- 📸 **Verplichte groepsfoto** — foto vereist voor je verder kunt bij foto-holes
- 🎞️ **Fotostrip** — polaroid-stijl overzicht van alle foto's op het eindscherm
- 📡 **Live scorebord** — beide groepen zien elkaars score via een sessiecode
- 📳 **Alarm + trillen** — geluid en trilling bij aankomst
- 🎬 **Reveal animatie** — slot schudt, clue valt naar binnen
- 🚶 **Reistijd** — echte looptijd via OSRM routering
- 💻 **Desktop editor** — twee kolommen naast elkaar op laptop
- 📴 **Offline support** — werkt ook zonder internet (kaart uitgezonderd)

---

## 🛠️ Technologie

| Onderdeel | Technologie |
|---|---|
| Kaart | [Leaflet.js](https://leafletjs.com/) + [CartoDB dark tiles](https://carto.com/) |
| Routing | [OSRM](https://project-osrm.org/) (gratis, geen API key) |
| Live scores + locatie | [Firebase Realtime Database](https://firebase.google.com/) (gratis Spark plan) |
| Fonts | Google Fonts (Bebas Neue + DM Mono) |
| Geluid | Web Audio API |
| Trillen | Vibration API |
| Offline | Service Worker + Cache API |

---

## 🔥 Firebase opzetten (voor live sync + locatie)

De app gebruikt Firebase Realtime Database om scores en live locatie tussen beide groepen te delen. Dit is **gratis** (Spark tier, geen creditcard nodig).

1. Ga naar [console.firebase.google.com](https://console.firebase.google.com) en maak een nieuw project (naam maakt niet uit).
2. Ga in het project naar **Build → Realtime Database → Create Database**. Kies een regio (bv. `europe-west1`) en start in **test mode**.
3. Stel daarna de volgende security rules in (Realtime Database → Rules), zodat alleen sessiedata toegankelijk is:
   ```json
   {
     "rules": {
       "sessions": {
         "$code": {
           ".read": true,
           ".write": true,
           ".indexOn": ["g"]
         }
       }
     }
   }
   ```
   (Test mode rules verlopen na 30 dagen — dit zijn permanente rules die alleen toegang geven tot `/sessions/...`.)
4. Ga naar **Project settings → General → Your apps → Web app** (</> icoon), registreer een app (geen Hosting nodig) en kopieer de `firebaseConfig` waarden.
5. Open `pub-golf.html`, zoek naar `FIREBASE_CONFIG` en vul `apiKey`, `databaseURL` en `projectId` in met jouw waarden.
6. Push naar GitHub — klaar. Beide groepen zien elkaars score én live positie op de kaart zodra ze in dezelfde sessie zitten.

---

## 🎨 Kleuren aanpassen

In `pub-golf.html`, bovenaan in de CSS:

```css
:root {
  --primary: #FF6B00;   /* Hoofd accent (oranje) */
  --secondary: #FF1744; /* Tweede accent (rood) */
  --gold: #FFD600;      /* Bonus / wildcards */
  --dark: #0a0500;      /* Achtergrond */
  --card: #160800;      /* Kaarten */
  --border: #3a1500;    /* Randen */
  --text: #ffe8d0;      /* Tekst */
  --muted: #7a4020;     /* Subtiele tekst */
}
```

---

## 📍 GPS coördinaten vinden

1. Open [Google Maps](https://maps.google.com)
2. Klik/tik lang op een locatie
3. Coördinaten verschijnen onderaan (bijv. `52.3702, 4.8952`)
4. Vul deze in bij de stop in de editor

---

## 📄 Licentie

Vrij te gebruiken en aan te passen. Veel plezier! 🍺
