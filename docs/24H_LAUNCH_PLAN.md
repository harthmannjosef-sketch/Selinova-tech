# SELINOVA-TECH 24H Launch Project Plan

**Ziel:** In 24 Stunden von aktuellem Stand zu einem launch-bereiten, professionellen Projekt mit allen Unterseiten auf dedizierten Premium-Domains (wo gekauft), aktualisierten statischen Dateien, React-App vorbereitet, Verträge/Demos ready, Deployment-Anleitung.

**Voraussetzungen (aktueller Stand - 1:1 mit Upload):**
- React App (Vite) mit 20+ Listings, Admin, Kampagne, individualisierte Verträge (Preise kalkuliert, per-Asset Klauseln), Live-Demos (18 in public/demos inkl. aether-music-studio).
- Statische Prototypen in designs/ (16 unterseite*.html + index, kampange, admin).
- Gekaufte Domains (User hat diese):
  - immobilien-portal.co.at → Unterseite 9 (Immobilien-Portal #I4410)
  - versicherungs-vergleich.co.at → Unterseite 15 (Vergleichsportal #O1078)
  - jobboard.co.at → Unterseite 10 (Job-Board #J5521)
  - cityguides.at → Unterseite 13 (Reise-Portal #M8856)
  - elearning-plattform.at → Unterseite 8 (E-Learning #H3302)
  - shop-fashion.co.at → Unterseite 1 (E-Commerce Fashion #A1042)
  - fitnessapp.at → Unterseite 14 (Fitness & Health App #N9967)
  - cryptoportal.at → Unterseite 16 (Crypto & NFT #P2189)
  - projektmanagement-saas.at → Unterseite 2 (SaaS Projektmanagement #B2089)
  - doner-app.at → DÖNERO (neues Angebot, React + neuer Demo)
  - pizza-app.at → Neues Pizza-Wheel Angebot (als Ergänzung zu DÖNERO)
  - assetmarkt.at → Haupt-Marktplatz / Asset Marketplace Angebot

**Wichtige Hinweise für 24H:**
- Domains sind bei Registrar (z.B. united-domains, world4you). User muss selbst DNS einrichten (A-Record oder Netlify/Vercel Connect).
- Für schnellen Launch: Hoste die statischen HTMLs auf Netlify oder Vercel (einfach drag & drop Ordner oder Git).
- React App separat deployen (Vercel empfohlen).
- Alle PDFs (Kaufvertrag-*.pdf etc.) müssen im selben Ordner wie die HTML liegen oder per absoluter URL verlinkt (besser: User generiert frisch aus Admin und lädt hoch).
- Kein echter Server – alles statisch + Client (wie aktuell).
- Nach 24H: Alles "launch ready" – User kann Domains verbinden und live gehen.

---

## 24H Timeline (Stunde für Stunde – realistisch, priorisiert)

### Stunde 0-1: Setup & Plan Review (Jetzt)
- Lies diese Datei komplett.
- Öffne alle relevanten Dateien in Editor.
- Erstelle Backups: Kopiere `designs/` Ordner nach `designs/backup-24h/`.
- Starte Dev Server: `npm run dev` (zum Testen).
- Baue frisch: `npm run build` (um dist/ aktuell zu haben).
- Sammle alle gekauften Domain-Login-Daten (Registrar).

**Deliverable:** Backup erstellt, Dev läuft, Plan bestätigt.

**Status Update (nach Edits in dieser Session):** 
- unterseite1.html (shop-fashion.co.at): Title, og:url, canonical, Unterlagen Sektion und Footer aktualisiert mit Domain + Hinweis auf Domain-Transfer.
- unterseite9.html (immobilien-portal.co.at): Title, Unterlagen und Note aktualisiert.
- unterseite15.html (versicherungs-vergleich.co.at): Title und Unterlagen aktualisiert.
- unterseite8.html (elearning-plattform.at): Title und Unterlagen aktualisiert.
- designs/index.html: Title auf assetmarkt.at umgestellt für Haupt-Marktplatz.
- Weitere Unterseiten mit gekauften Domains (2,10,13,14,16 etc.) können analog in <1h pro Datei aktualisiert werden – sage welche als Nächstes.
- React Listings bereits mit premiumDomain für die meisten (shop-fashion.co.at, immobilien-portal.co.at, jobboard.co.at, elearning-plattform.at, cityguides.at, fitnessapp.at, versicherungs-vergleich.co.at, cryptoportal.at, projektmanagement-saas.at, doner-app.at, pizza-app.at, assetmarkt.at).
- PDFs: User sollte frische aus dem Admin generieren (Namen mit -ID.pdf z.B. Kaufvertrag-I4410.pdf) und zusammen mit den HTMLs hochladen.
- Demos (inkl. aether-music-studio.html für neues Food/ Music Angebot): Bleiben auf der Haupt-Domain (assetmarkt.at/demos/...) oder separat.

**24H konkrete To-Do Liste (Stunde 0 = jetzt):**
0-1h: Domains bestätigen, Backups machen, `npm run build` laufen lassen.
1-6h: Statische Unterseiten für die 9+ Domains updaten (Titles, Metas, Verträge-Sektionen mit Domain-Hinweis, Footers, Contract-Links auf -ID.pdf fixen). Ich habe die ersten 4+ gemacht – Rest auf Anfrage.
6-10h: React App final check + build, neue Angebote (DÖNERO/Pizza/AETHER) in Kampagne/Mainboard highlighten.
10-14h: Hosting Setup (Netlify für static Unterseiten, Vercel für React) + DNS Records eintragen (siehe unten).
14-18h: PDFs generieren + hochladen, Testing (jede Domain HTML + PDFs + Links).
18-22h: Final Polish (Launch Banner in allen Files), Announcement Texte schreiben.
22-24h: DNS Propagation check, erste Seite live schalten, Test-Inquiry.

**DNS Beispiel (für Netlify - passe IP an):**
Für immobilien-portal.co.at:
- A Record: @ -> 75.2.60.5 (Netlify Standard IP, check netlify docs für aktuell)
- CNAME: www -> your-netlify-site.netlify.app
Dann in Netlify: Add custom domain "immobilien-portal.co.at" zur Site mit der unterseite9.html als Index.

Wiederhole für jede Domain (jede Unterseite als eigene kleine Site oder eine große mit _redirects für / zu den Files).

**Hosting Tipp für 24H:** 
- Netlify Drop: Ziehe den Ordner mit der einzelnen unterseite.html + benötigten images/ und PDFs in Netlify Drop für schnelle URL, dann custom domain.
- Für alle: Git Repo mit Ordner pro Domain (z.B. launch/immobilien-portal/ mit der HTML umbenannt zu index.html).

**Nächster Schritt von dir:** Bestätige die Domains sind ready zum Verbinden. Sage "update unterseiteX for domainY" für die nächsten Edits. Oder "deploy guide" für detaillierte Netlify/Vercel Steps.

Wir sind im 24H Launch Mode. Alles wird solide auf die Domains gelegt. Los!

### Stunde 1-4: Domain-Mapping & Statische Unterseiten updaten (Kern-Arbeit)
Für **jede** Unterseite mit Domain (und Main):

- Update `<title>`, meta description, og:url, canonical, twitter etc. auf die neue Domain.
- Update alle internen Links (zu anderen unterseiteN.html) – behalte relative für lokale, aber füge Hinweis "Bei Live auf Domain: volle URL".
- In "Unterlagen & Verträge" Sektion:
  - Füge prominent ein: "Premium Domain inklusive: [domain] (wird mit Vertrag übertragen)"
  - Update Download-Links zu korrekten Namen (Kaufvertrag-ID.pdf mit Minus, keine Unterstriche).
  - Füge Angebotsblatt-Link hinzu.
  - Aktualisiere "spezifisch für dieses Angebot" Texte mit Domain.
- Update Footer: Füge Domain hinzu, "Powered by SELINOVA-TECH | [domain]".
- Update alle Kontakt-Buttons / mailto zu support@selinova-tech.at (bleibt zentral).
- Für DÖNERO/Pizza (keine klassische unterseite): Erstelle minimale Landing-HTMLs oder verweise auf React.
- Für assetmarkt.at: Mache designs/index.html oder eine neue main als Landing für den Marktplatz.

**Konkrete Zuordnungen (1:1):**
- unterseite1.html → shop-fashion.co.at (E-Commerce Fashion)
- unterseite2.html → projektmanagement-saas.at (SaaS)
- unterseite8.html → elearning-plattform.at (E-Learning)
- unterseite9.html → immobilien-portal.co.at (Immobilien)
- unterseite10.html → jobboard.co.at (Job-Board)
- unterseite13.html → cityguides.at (Reise)
- unterseite14.html → fitnessapp.at (Fitness App)
- unterseite15.html → versicherungs-vergleich.co.at (Versicherung)
- unterseite16.html → cryptoportal.at (Crypto)
- (Für die ohne dedizierte Domain: Lass bei selinova-tech.at oder assetmarkt.at, update nur wo sinnvoll)

**Tools:** Verwende Search & Replace im Editor oder hier (ich kann es für dich machen – sag welche zuerst).

**Deliverable:** Alle 9+ zugeordneten unterseiten.html haben korrekte Domain in Title/Meta/Verträge/Footer. Keine toten Links.

### Stunde 4-7: React App & Demos finalisieren für Launch
- Stelle sicher, dass alle premiumDomain in src/data/listings.ts korrekt sind (bereits teilweise gemacht für die gekauften).
- Füge für fehlende hinzu (z.B. assetmarkt.at als Haupt).
- Update src/pages/ListingDetail.tsx demoMap für alle (bereits für aether).
- Teste alle Document-Buttons (generiere frische PDFs mit korrekten Namen: Kaufvertrag-ID.pdf).
- Für neue Angebote (DÖNERO, Pizza, AETHER): Stelle sicher, dass Demos in public/demos/ und dist/ sind.
- Füge in React Mainboard/Kampagne Hinweise auf die neuen Domains ein (z.B. "Jetzt auch auf immobilien-portal.co.at verfügbar").
- Baue: `npm run build` – kopiere dist/ Inhalte bereit für Upload.
- Füge Impressum/Datenschutz minimal hinzu (kopiere aus designs/ oder erstelle simple Seite).

**Deliverable:** React App buildet clean, alle Demos laufen, Listings haben korrekte premiumDomains, Verträge referenzieren Domains wo relevant.

### Stunde 7-10: Verträge, PDFs & Dokumente updaten
- Generiere frische PDFs für die Assets mit Domains (aus Admin oder direkt).
- Kopiere die PDFs in designs/ (für statische Unterseiten) und in einen "assets/pdfs/" Ordner für Hosting.
- Update in allen unterseiten.html die <a href="Kaufvertrag-..."> zu exakten Dateinamen (mit korrektem -ID.pdf).
- Füge in Verträge-Sektionen: "Domain-Transfer: [domain] ist im Kaufvertrag §4 explizit als Übergabegegenstand aufgeführt."
- Für React: Die generateContracts.ts erwähnt bereits premiumDomain in Verträgen.

**Deliverable:** 10+ frische PDFs mit Domain-Erwähnung, alle statischen Links funktionieren lokal.

### Stunde 10-14: Hosting & Domain Setup Vorbereitung (DNS & Upload)
- **Empfohlene Hosting für 24H (einfach & günstig):**
  - Netlify (kostenlos, Drag & Drop): Lade den gesamten `designs/` Ordner hoch für die statischen Unterseiten (jede Unterseite kann als eigene Site oder mit Rewrites).
  - Vercel für die React App (beste für Vite).
  - Für einzelne Domains: Auf Netlify "Add custom domain" für jede (z.B. immobilien-portal.co.at → spezifischer Unterordner oder separate Sites).

- **DNS Anleitung (User macht das bei Registrar):**
  - Für jede Domain (z.B. immobilien-portal.co.at):
    - Bei Registrar: Nameserver auf Netlify/Vercel stellen ODER A-Record auf die Hosting-IP (Netlify: 75.2.60.5 etc. – check aktuell).
    - Für www: CNAME auf die primary.
  - Propagation: 1-24h, aber oft schneller.
  - SSL: Hosting (Netlify/Vercel) übernimmt automatisch Let's Encrypt.

- **Upload Plan:**
  - React App: Deploy zu Vercel → vercel.com (verlinke mit assetmarkt.at als Custom Domain).
  - Statische Unterseiten: 
    - Option 1 (einfach): Eine große Netlify Site mit allen designs/ → Unterseiten als /unterseite1 etc., aber für Root-Domain: Verwende Netlify Rewrites pro Domain.
    - Option 2 (besser für 24H): Für jede Domain eine eigene kleine Netlify Site (kopiere nur die eine unterseite.html + benötigte Assets wie Logo, PDFs in einen Mini-Ordner).
  - PDFs: Lade alle generierten PDFs hoch in den jeweiligen Site-Root.
  - Demos: Bleiben auf der Haupt-React-Domain (z.B. selinova-tech.at/demos/...) oder separat hosten.

- Erstelle eine `DEPLOY_INSTRUCTIONS.md` mit Copy-Paste Schritten für Netlify/Vercel + DNS Beispiele.

**Deliverable:** Bereite 2-3 Test-Uploads vor (z.B. eine Unterseite + eine Domain). Anleitung für alle.

### Stunde 14-18: Testing, Polish & 1:1 Consistency
- Öffne alle aktualisierten unterseite*.html lokal und prüfe:
  - Title/Meta zeigen die Domain.
  - Verträge-Links funktionieren (PDFs im selben Ordner).
  - Premium Domain Badge prominent.
  - Keine alten selinova-tech.at Links wo nicht gewollt.
- Teste React App mit neuen Domains in Listings (Karten zeigen "Premium Domain inklusive").
- Teste Verträge-Generierung für ein Asset mit Domain (soll Domain in §1/§4 erwähnen).
- Füge in alle relevanten Footer/Header: "Diese Seite ist Teil von SELINOVA-TECH | [domain] ist exklusiv für dieses Asset".
- Für Main (assetmarkt.at): Mache designs/index.html oder designs/mainboard.html zur Landing mit Links zu den Unterseiten-Domains.
- Update kampange.html mit den neuen Domains.

**Deliverable:** Alle Dateien lokal "launch ready" (keine Broken Links, korrekte Domains überall).

### Stunde 18-22: Final Deployment & DNS (User Action + Support)
- Deploy React App zu Vercel (verlinke assetmarkt.at).
- Deploy statische Sites zu Netlify (eine pro Domain oder eine große mit Custom Domains).
- User: Logge dich in jeden Registrar ein und setze DNS (ich gebe genaue Records).
- Warte auf Propagation (nutze whatsmy dns.net zum Check).
- Teste live: Öffne z.B. https://immobilien-portal.co.at (wenn DNS ready) – sollte die aktualisierte HTML zeigen.

**Support in dieser Phase:** Ich helfe bei spezifischen DNS-Beispielen oder Netlify Config (netlify.toml für Rewrites).

### Stunde 22-24: Go-Live Polish & Announcement
- Füge "Launch Banner" in alle Unterseiten und React hinzu: "Jetzt live auf [domain] – Premium Asset mit Domain-Transfer".
- Generiere finale PDFs mit aktuellen Daten.
- Erstelle eine simple Press/Launch Note (Text für LinkedIn/X/Email).
- Überprüfe: Alle 16 Unterseiten haben (wo möglich) Domain-Setup, React hat alle premiumDomains.
- Backup alles.
- **Go-Live:** Domains verbunden, erste Seite live, Test-Inquiry senden.

**Deliverable:** Projekt ist "24H Launch ready" – User kann in den nächsten Stunden live gehen.

---

## Sofort-Checkliste für User (nach diesem Plan)

1. [ ] Domains bei Registrar bestätigen (Status: pending oder active).
2. [ ] Alle Unterseiten-HTMLs aktualisiert (ich mache die Änderungen hier).
3. [ ] Netlify/Vercel Accounts bereit.
4. [ ] Frische PDFs generiert (aus dem laufenden Admin oder hier simulieren).
5. [ ] DNS Records vorbereitet (ich gebe sie unten).

**DNS Beispiele (anpassen):**
Für immobilien-portal.co.at (Netlify Beispiel):
- Type: A, Value: 75.2.60.5 (Netlify IP – prüfe aktuell unter netlify.com)
- Oder Nameserver auf Netlify stellen.
- Für React Main: assetmarkt.at → Vercel (vercel.com → Add Domain).

---

## Nächste Aktion von mir (als AI)

Ich werde **sofort** anfangen, die relevanten designs/unterseite*.html Dateien mit den Domains zu updaten (Title, Meta, Verträge-Sektion, Footer).

Sage mir die Reihenfolge oder "update alle mit Domains" – ich fange mit den gekauften an.

Danach erstelle ich die DEPLOY_INSTRUCTIONS.md und aktualisiere die React Listings wo nötig.

Dann können wir Stunde für Stunde abhaken.

**Bereit?** Sag "start updates" oder spezifiziere welche Unterseite/Domain zuerst.

Wir schaffen den 24H Launch solide. Alle Unterseiten mit ihren Domains – 1:1 ready. 

Los! 🚀

(Full plan saved as 24H_LAUNCH_PLAN.md – lies ihn für Details.)
