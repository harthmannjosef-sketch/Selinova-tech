# Selinova Tech · NexusMarket

Professioneller Marktplatz zum Kaufen und Mieten von Webseiten, SaaS-Produkten, Apps und digitalen Assets (17+ Assets).

**Live-fähig**: React + TypeScript Marketplace + **18 souveräne Standalone-HTML-Demos** (public/demos) + vollständiges Admin-Panel (geschützt, nicht direkt aus Index verlinkt) + dynamische Verträge mit echten Preisen.

## Wichtige Features (Launch-Ready)

- React Mainboard + Detailseiten mit Filtern, Kampagne (-75% bis 01.09.2026), Premium-Domain Badges
- **Vollständige Verträge** (Angebotsblatt, Kaufvertrag, Mietvertrag, NDA, Übergabeprotokoll) — Preise **explizit mit einkalkuliert**, 50/50 Split, asset-spezifische Beschreibungen (kein MUSTER-Text), Wien-Gerichtsstand, DSGVO
- **18 interaktive Demos** (inkl. AETHER Music Studio mit MP3-Upload, Player, Playlists, Analytics + mobile Bottom-Nav)
- **Admin** (fero1160?! / selina192338) – Base64-obfuskiert (auch in React Admin.tsx), Role-Check, Inquiries, Contract-Generation. Öffentlich nicht verlinkt.
- **Visitenkarten** (Vorder- + Rückseite 90x55mm) mit echtem Logo + QR-Code zu allen Unterseiten (PNG-Exporte liegen bei)
- Admin-Bereich nur über direkte URL /admin (React) oder interne Prototypen erreichbar – keine Links aus öffentlichem Index/Mainboard/Unterseiten
- Alle Unterseiten mit korrekten zukünftigen Sub-Domain-Titeln (shop-fashion.co.at, doner-app.at, assetmarkt.at etc.), Impressum + DSGVO pro Seite, Logo überall
- Kein "demo"-Text mehr, alle Forms & Buttons produktionsbereit

## Tech Stack

- Vite + React 19 + TypeScript + React Router v7 + Tailwind v3
- jsPDF (dynamische, asset-spezifische PDFs mit Preisen + Logo)
- Lucide Icons
- Statische souveräne HTMLs (Tailwind CDN + Vanilla JS) parallel zum React-App

## Lokaler Start

```powershell
npm install
npm run dev
```

React-App: `http://localhost:5173`

Wichtige statische Seiten (werden auch deployed):
- `designs/index.html` und `designs/mainboard.html` (statische Hauptübersicht)
- `designs/unterseite1.html` … `designs/unterseite16.html` (production static sales pages – KEINE Admin-Links mehr)
- `designs/kampange.html`, `designs/angebote-qr-selector.html`, `designs/visitenkarte.html`
- `public/demos/aether-music-studio.html` (und 17 weitere interaktive Demos)
- Admin-Prototypen (nicht deployed): `prototypes/admin/admin-login.html` + `admin-panel.html` (nur für Entwickler im Repo)

## Build & Deployment (Vercel)

### Lokaler Build
```powershell
npm run build
```

Der Build kopiert automatisch `designs/` nach `dist/designs/`, sodass **beides** funktioniert:

- React-SPA unter `/` und `/angebot/*` etc.
- Direkte statische HTMLs unter `/designs/unterseiteN.html`, `/demos/*.html`, `/designs/visitenkarte-vorne.png` etc. (bessere Ordnerstruktur für Produktion)

**vercel.json** + angepasster Build-Script + bereinigte **.vercelignore** (Bilder/Logos/PNGs/SVGs werden mitgenommen) sind entscheidend dafür, dass nach dem Deploy alles korrekt angezeigt wird.

### GitHub Actions + Vercel (recommended CI/CD)
Es gibt zwei separate Workflows (siehe `.github/workflows/`):

- **[vercel-preview.yml](.github/workflows/vercel-preview.yml)**: Wird bei Pull Requests gegen `master` ausgelöst (oder manuell via "Run workflow"). Führt Preview-Deploy aus.
- **[vercel-production.yml](.github/workflows/vercel-production.yml)**: Wird bei Pushes auf `master` ausgelöst (oder manuell). Führt Production-Deploy aus.

Beide Workflows folgen exakt dem Vercel-Muster für sichere Builds ohne Source-Code-Exposure:

1. `npm install --global vercel@latest`
2. `vercel pull --yes --environment=preview|production --token=${{ secrets.VERCEL_TOKEN }}`
3. `vercel build` (bzw. `vercel build --prod` für Production)
4. `vercel deploy --prebuilt` (bzw. `vercel deploy --prebuilt --prod`)

**Erforderliche GitHub Secrets** (unter Settings → Secrets and variables → Actions anlegen):
- `VERCEL_TOKEN` (von https://vercel.com/account/tokens – Scope: Deploy)
- Optional aber empfohlen für stabile Pulls: `VERCEL_ORG_ID` und `VERCEL_PROJECT_ID`

Nach dem ersten erfolgreichen Run erscheinen Deployments automatisch in Vercel (inkl. Preview-URLs pro PR und Production-URL).

Der `vercel build` Schritt läuft komplett in GitHub Actions. Nur das fertige `.vercel/output`-Artefakt wird zu Vercel hochgeladen (`--prebuilt`). Der angepasste `package.json`-Build (inkl. `designs/`-Copy) wird dabei weiterhin ausgeführt.

## GitHub-Repo-Struktur (was hochgeladen werden muss)

```
.
├── index.html                 # Vite/React Einstieg (wird zur SPA-Shell)
├── package.json               # WICHTIG: build-Skript mit designs/ Copy nach dist/designs/
├── vercel.json                # SPA-Fallback (statische Dateien haben Vorrang)
├── .vercelignore              # Bereinigt – keine Bilder blocken!
├── netlify.toml
├── .github/
│   └── workflows/
│       ├── vercel-preview.yml      # PR → Preview-Deploy (vercel pull + build + deploy --prebuilt)
│       └── vercel-production.yml   # master push → Prod-Deploy (vercel pull + build --prod + deploy --prebuilt --prod)
├── src/                       # Komplette React-App (Listings, Verträge mit Preisen, Admin, Kampagne...)
├── public/
│   ├── demos/                 # 18 vollständige interaktive HTML-Demos (AETHER, DÖNERO, Fitness, Immobilien etc.)
│   └── images/                # Produkt-Vorschau-Bilder
├── designs/                    # Statische Sovereign-Versionen (werden 1:1 deployed unter /designs/)
│   ├── unterseite1.html … unterseite16.html   # Korrekte <title> = zukünftige Domains (shop-fashion.co.at etc.) – Admin-Links entfernt
│   ├── visitenkarte.html + visitenkarte-*.png # Mit Logo + QR (druckfertig)
│   ├── angebote-qr-selector.html
│   ├── kampange.html
│   ├── index.html + mainboard.html            # Öffentliche Einstiegsseiten (ohne Admin-Zugang)
│   ├── logos/                 # 16 individuelle Asset-Logos (SVGs)
│   └── images/                # Logo für designs Seiten
├── prototypes/                # Interne / nicht-öffentliche Prototypen (nicht in dist/designs/)
│   └── admin/                 # Admin-Login + Panel (Base64-obfuskiert) – NUR über Repo, nicht verlinkt
│       ├── admin-login.html
│       └── admin-panel.html
├── docs/                      # Projektplanung (nicht Teil der Site)
│   ├── 24H_LAUNCH_PLAN.md
│   ├── LAUNCH_ROADMAP.md
│   └── PROJECT_SUMMARY.md
├── *.md                       # README (im Root)
└── (keine dist/, keine node_modules/, keine riesigen generierten PDFs/EXEs)
```

**Wichtig für korrekte Anzeige nach Deploy:**
- Die Ordner `designs/` und `public/demos/` + `public/images/` **müssen** im Repo sein.
- Der Build-Befehl in package.json **muss** die Kopie von `designs/` nach `dist/designs/` machen.
- .vercelignore darf keine *.png / *.svg / Bilder blockieren.

## Admin-Zugang (statisch + React)

**Wichtig**: Der Admin-Bereich ist **nicht über die öffentlichen index.html / mainboard / Unterseiten verlinkt** (Links wurden entfernt, Konami-Code gelöscht).

- React App (empfohlen): `/admin` (Login-Formular im SPA, persistiert via localStorage)
- Statische Prototypen (nur im Quell-Repo, werden nicht deployed): `prototypes/admin/admin-login.html` / `admin-panel.html`

Zugangsdaten (Base64-obfuskiert in den HTML-Dateien):
- User: fero1160?!
- Pass: selina192338
- Weitere Demo-Accounts siehe Code (mod / view)

## Verträge

Alle Verträge werden clientseitig mit jsPDF erzeugt und enthalten:
- Den exakten Gesamtkaufpreis / Mietpreis des jeweiligen Assets
- 50 % bei Vertragsschluss + 50 % bei Übergabe
- Speziell auf das Angebot zugeschnittene Beschreibungen (z. B. 28 Filialen + Punjab-Brand für DÖNERO, 80k Traffic + DR45 für Blog etc.)
- Domain-Transfer-Klauseln bei Premium-Domains
- Logo + korrekte Stammdaten (Wien, DSGVO, 14/30 Tage)

---

**Selinova Tech** – Launch 2026 | selinova-tech.at (nach DNS)
