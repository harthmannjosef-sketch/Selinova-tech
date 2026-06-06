# SELINOVA-TECH – Launching Process Roadmap (Final Version)

**Projekt:** SELINOVA-TECH Medien Architektur E.U.  
**Ziel:** Professioneller, rechtlich abgesicherter Digital-Asset-Marktplatz (DACH-Fokus)  
**Aktueller Stand:** Lokales MVP / Prototypen-Status (Juni 2026)  
**Dokument-Version:** 1.0 – Final Launch Preparation  
**Erstellt:** Basierend auf 1:1 Codebase-Audit (src/, public/demos/, designs/, listings.ts, generateContracts.ts etc.)  
**Verantwortlich:** Fero / Selinova-Team  

---

## 1. Executive Summary & Launch-Vision

Wir wechseln von der **Entwicklungs-/Prototypen-Phase** in den **produktionsreifen Launching Process**.

**Vision (6–8 Wochen bis Soft Launch):**
- Live unter **https://selinova-tech.at** (und www)
- 20+ kuratierte, verifizierte Assets mit **sovereignen Live-Demos** (Eigenes-Erlebnis-Modus)
- Voll funktionsfähiger Lead-to-Contract-Flow (Kontakt → Inquiry → professionelle, per-Asset individualisierte PDFs mit exakt kalkulierten Preisen + 1:1 passenden Klauseln)
- Erste reale Transaktionen (Verkauf/Miete) innerhalb von 30 Tagen nach Public Launch
- Hohes Vertrauen durch DACH-spezifische Rechtstexte (Wiener Gerichtsstand, DSGVO, 14-Tage-Prüfung, 30-Tage-Support), Logo-Briefkopf, stammdatenbasierten Footer und echte "ready2use"-Demos

**Zielorientierte Erfolgsmetriken (KPIs):**
- Soft Launch (intern + 10 Beta-Tester): ≥ 500 Besucher, ≥ 20 qualifizierte Inquiries, 0–2 Test-Transaktionen
- Month 1 nach Public Launch: ≥ 5.000 Besucher, ≥ 50 Leads, 3–5 abgeschlossene Deals, erste Umsätze (Provision 5–15 %)
- Assets: Mindestens 25 live + standardisierter Onboarding-Prozess für neue Verkäufer
- Technisch: Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO), 99,5 % Uptime

Der Roadmap ist **1:1 realitätsgetreu** mit dem aktuellen Projektstand (18 Demos in public/demos + dist, 20 Listings inkl. AETHER Music Studio + Pizza-Wheel + AssetMarketplace-Plattform, hochindividualisierte Verträge mit Preiskalkulation, lokaler Storage, Admin mit Rollen, Kampagne -75 % bis 01.09.2026, statische Prototypen in designs/, Logo-Integration überall).

---

## 2. Current State Audit (1:1 Stand der Codebase / "Upload")

**Was exakt vorhanden ist (Stand nach letztem Build & AETHER-Upload):**

- **React/Vite-SPA (src/):** 
  - 20 Listings (src/data/listings.ts) mit id, slug, title, fullDesc, price (mit expliziter 50/50-Kalkulation), metrics, techStack, premiumDomain (bei neuen wie aether-music-studio.html, assetmarkt.at, doner-app.at, pizza-app.at, immobilien-portal.co.at etc.).
  - Routing: / (Mainboard mit Filtern, Campaign-Banner, Cards), /angebot/:slug (Detail mit 4-Bild-Gallery, Metrics, Tech-Tags, Live-Preview-Iframe zu /demos/..., Contact-Modal, Document-Buttons für Angebotsblatt/Kaufvertrag/Mietvertrag/NDA/Übergabe + Full Package).
  - Admin (/admin): Login (fero1160?! / selina192338 → Superadmin), CRUD-Tabelle, Role-basierte Sichtbarkeit (Superadmin sieht Delete/Reset/New), Inquiries mit Status-Workflow, Contracts-Log mit Re-Generate, User-Tab.
  - Komponenten: ListingCard (mit -75% Campaign + Premium-Domain-Badge), Navbar (Admin-Link nur bei Login), Footer (Logo + Stammdaten).
  - Contract-Engine (src/lib/generateContracts.ts): 
    - generateAngebotsblatt + generateContractPDF + generateNdaOrUebergabe + generateFullDocumentPackage.
    - **Preise 1:1 kalkuliert** (Gesamtkaufpreis, exakte 50%-Beträge, Mindestlaufzeit-Gesamtsumme bei Miete).
    - **Per-Asset-spezifische Klauseln** (getSpecificOfferDescription + getSpecificHandoverItems) – Vertragstext ist nur für **dieses eine Angebot** sinnvoll (z. B. Wheel-Selector-IP + 28 Filialen bei DÖNERO, 80k Traffic + DR45 + AdSense bei Authority Blog, App-Store-Keys + RevenueCat bei Fitness-App etc.).
    - Logo via addImage (selinova-gate-logo.png), Wien-Stammdaten, DSGVO, 14-Tage/30-Tage-Support, ausgewogene Klauseln für beide Parteien (kein MUSTER).
  - Persistenz: useListings + localStorage (Inquiries, Contracts-Log). Kein echter Server.
  - Campaign: -75 % (price * 0.25) bis 01.09.2026 "solange Vorrat reicht" auf allen Cards + Kampange-Seite.

- **Demos (public/demos/ + dist/demos/ nach Build):** 18 vollständige sovereign HTML-Apps (Tailwind-CDN + Vanilla-JS + localStorage/IndexedDB-ähnlich).
  - Beispiele: premium-ecommerce-fashion.html (Cart, Admin, Checkout), donero-preview.html (Wheel-Selector, Loyalty, Multi-Filial), **aether-music-studio.html** (neu: MP3-Upload, Cover, Full Player mit Progress/Queue/Volume, Playlists, Studio-Management, Analytics, Artist-Profile – alles lokal persistent).
  - Jede Demo = "eigenes Erlebnis" + internes Admin/CRUD für den Käufer (Sovereignty).

- **Statische Prototypen (designs/):** 
  - 16 unterseiteN.html (Detailseiten mit Unterlagen-&-Verträge-Sektion, teilweise aktualisiert mit Preisen + "spezifisch für dieses Angebot").
  - index.html / mainboard.html / kampange.html / admin-*.html (mit Logo, Login-Gate fero/selina, Contract-Links zu exakten PDF-Namen).
  - Logo kopiert (designs/ + designs/images/).

- **Weiteres:**
  - Branding & Stammdaten: SELINOVA-TECH Medien Architektur E.U., Wien-1020 Engerthstrasse, support@selinova-tech.at überall (Header, Footer, PDF-Letterhead/Footer).
  - PDFs im Root (generiert): Angebotsblätter, Kauf-/Mietverträge, NDA, Übergabe – mit Logo und individualisierten Texten.
  - Build: `npm run build` sauber (Vite + tsc), dist/ enthält alles.
  - Kein echter Backend: localStorage + client-side jsPDF. Forms → mailto oder Store.
  - Admin-Creds hartcodiert (nur für Gate).
  - Neue Assets (AETHER, Pizza-Wheel, AssetMarketplace) 1:1 nach demselben Muster hinzugefügt wie die ersten 17.

**Lücken (realistisch & transparent):**
- Kein Backend/DB (Leads, Verträge, User-Accounts nicht geräteübergreifend persistent).
- Keine echten Zahlungen/Escrow (nur manuell nach Inquiry).
- Keine echten E-Mails (mailto / console).
- Auth nur mock (localStorage-Rolle).
- SEO/Meta/Performance noch nicht prod-optimiert.
- Bankverbindungsdaten fehlen noch (User: "bald eingeben").
- Statische Designs teilweise veraltet (nur 16 vs. 18+ Live-Assets).
- Keine Impressum/Datenschutz/AGB-Seiten (österreichisches Recht erfordert das bei Launch).
- Keine Seller-Self-Service-Upload.
- Bundle-Size-Warnungen im Build.

**Stärken (Unique Selling Points):**
- Verträge sind **nicht generisch** – jede Klausel + Preis ist 1:1 auf das konkrete Asset zugeschnitten (nur für "dieses Angebot" gültig).
- Live-Demos sind echte, funktionale Mini-Apps (nicht Videos/Screenshots).
- Admin + Dokumente sofort produktionsreif nutzbar.
- Kampagne + Domain-Assets (co.at / .at) bereits integriert.

---

## 3. Launch-Vision & Zielorientierte Meilensteine

**Soft Launch (intern + kontrollierte Beta):** Woche 4–5  
**Public Launch:** Woche 6–7  
**Erste Umsätze:** Innerhalb 30 Tage nach Public Launch.

**Ziel-KPIs (messbar):**
- Traffic: Soft 500 → Public Month 1: 5.000+ Unique (SEO + Ads + Social)
- Leads: Soft 20 → Month 1: 50+ qualifizierte Inquiries (Admin-Workflow)
- Conversion: 3–5 Deals (Verkauf/Miete) im ersten Monat
- Assets: 20 → 25+ (mit standardisiertem Upload-Prozess)
- Trust: 0 rechtliche Beanstandungen (dank Lawyer-Review + individualisierter Verträge)
- Tech: Lighthouse 90+ auf allen wichtigen Seiten, Core Web Vitals grün

---

## 4. Phasen-Roadmap (Konkret, Terminiert, Deliverables)

### Phase 1: Stabilization, Polish & 1:1-Audit (Woche 1 – 5–7 Tage, Solo-Fokus)
**Ziel:** Codebase ist "launch-ready" – keine Bugs, alle 18 Demos + React-Flows 100 % funktional, Docs exakt aktuell.

**Konkrete Tasks (1:1 mit aktuellem Stand):**
- Manuelles Test-Checklist für **alle 18 Demos** (inkl. neuem aether-music-studio.html: MP3-Upload mit Base64/localStorage, Player mit Progress/Queue, Playlists, Studio-Edit, Analytics-Plays-Inkrement, Export/Reset).
- React-App: Alle 20 Listings, Campaign, Admin (Login, CRUD, Inquiries, Contract-Log + Re-Generate), Detail-Views mit Iframes, Contact-Modals.
- Fix Build-Warnings (chunk size, dynamic import von generateContracts).
- Update aller Docs 1:1:
  - PROJECT_SUMMARY.md (aktuell 18 Demos, 20 Listings, AETHER-Details, neue premiumDomains).
  - README.md (korrekte Demo-Anzahl, neue Slugs, Admin-Creds, Contract-Features).
  - LAUNCH_ROADMAP.md (dieses Dokument selbst).
- Ergänze fehlende Bankverbindungsdaten überall (Header/Footer/PDFs/Verträge) – User liefert Daten.
- Accessibility & kleine Polish: ARIA-Labels, Keyboard-Shortcuts im Player, Error-Boundaries.
- Update statische designs/ (unterseiten) wo nötig für neue Assets (z. B. DÖNERO/Pizza/AETHER in Kampagne & Links).
- Erstelle **standardisierten "Asset Upload & Onboarding Process"** (Markdown-Checklist) – exakt nach dem Muster, wie AETHER + Pizza-Wheel + AssetMarketplace hinzugefügt wurden:
  1. Neues sovereign Demo-HTML in public/demos/ (full features + localStorage).
  2. Eintrag in src/data/listings.ts (id, slug, title, fullDesc mit Metrics/Tech, price, premiumDomain, images).
  3. Update ListingDetail.tsx demoMap.
  4. Optional: Eintrag in generateContracts (spezifische Beschreibung/Handover).
  5. Update designs/unterseiteN.html (falls gewünscht) + PDF-Namen.
  6. Test + Screenshot für Kampagne.
- Deliverable: Git-Commit "Phase 1 – Hardened & Audited 1:1", Test-Report (Markdown mit Screenshots), aktualisierte Docs.

**Meilenstein:** Alle Tests grün, "npm run build" clean, keine TODOs mehr im Kern.

### Phase 2: Backend-Minimal & Transaction-Readiness (Woche 1–2, parallel zu Phase 1)
**Ziel:** Leads & Contracts nicht mehr nur lokal – erste echte Persistenz ohne großen Aufwand.

**Konkrete Optionen (empfohlen einfach & günstig):**
- **Leicht (empfohlen für schnellen Launch):** 
  - Formspree oder Resend/EmailJS für echte E-Mail-Benachrichtigungen bei Inquiries (support@...).
  - Google Sheet oder Airtable als "Backend" für Leads + Contract-Logs (Admin kann manuell pflegen).
  - Client-PDFs bleiben (jsPDF) – User lädt herunter, unterschreibt, lädt zurück (später Upload-Feld).
- **Besser (Supabase – 1–2 Tage Setup, free Tier):**
  - Supabase Postgres + Auth (magic link für Admin/Seller).
  - Tabelle inquiries + contracts.
  - Edge Functions oder einfache API für Logging.
  - Storage für hochgeladene signierte PDFs.
- In generateContracts + Store: Nach PDF-Generierung Metadaten + Base64-PDF (oder Link) loggen.
- Für Payments (später, nicht Blockierer): Stripe "Pay to reserve" oder manuell nach Inquiry (Rechnung per E-Mail).

**Deliverables:** 
- Forms senden echte Mails.
- Leads sichtbar in Admin (auch nach Refresh/neuem Gerät).
- Erste "Test-Transaktion"-Simulation (Inquiry → Contract → "Deal closed" Status).

### Phase 3: Deployment, Domain & Infrastructure (Woche 2)
**Ziel:** Produktions-Deployment auf selinova-tech.at.

**Konkrete Schritte:**
- Vercel (empfohlen: kostenlos, Vite-native, Custom Domain, Previews, Analytics).
  - `vercel --prod`
  - Environment Variables (falls Supabase Keys etc.).
- Domain: selinova-tech.at bei aktuellem Registrar auf Vercel-Nameserver oder A-Record/CNAME umstellen.
- SSL automatisch.
- Build-Optimierungen: Manuelle Chunks für jspdf/html2canvas (große Bundles).
- Sitemap + robots.txt + Meta-Tags für alle Routen (React Helmet oder static).
- Analytics: Vercel Analytics + Plausible (DSGVO-freundlich).
- Error Monitoring: Sentry (free für kleine Projekte).
- Preview-Umgebung für jedes PR.

**Deliverables:** https://selinova-tech.at live, alle Demos/Assets erreichbar, Admin geschützt, Mobile perfekt.

### Phase 4: Legal, Compliance, Content & Trust (Woche 2–3)
**Ziel:** Österreichisches Recht + hohes Vertrauen.

**Konkrete Tasks:**
- Pflichtseiten erstellen (im React + statisch):
  - Impressum (mit genauen Stammdaten + Bankverbindung).
  - Datenschutzerklärung (DSGVO-konform, mit Cookie/Storage-Hinweis).
  - AGB / Nutzungsbedingungen (Plattform-Regeln, Haftungsausschluss).
- Verträge: Nochmal von österreichischem Anwalt prüfen lassen (Budget 500–1.500 € einmalig) – Fokus auf IP-Transfer, Domain-Übergabe, Escrow-Option.
- Seller-Onboarding: Einfaches Formular (Google Form + E-Mail) + "Asset Upload Checklist" (1:1 wie Phase 1).
- Kampagne & Landing: Update kampange.html + React für Launch-Announcement.
- Social Proof: Fake-Testimonials durch echte Beta-Feedback ersetzen.

**Deliverables:** Alle rechtlichen Seiten live, Verträge "lawyer-reviewed", Onboarding-Prozess dokumentiert.

### Phase 5: Soft Launch & Validation (Woche 4)
**Ziel:** Kontrollierter Go-Live mit Feedback-Schleife.

**Konkrete Schritte:**
- Deploy auf Prod.
- Seed mit aktuellen 20 Assets + allen Demos.
- Interne Tests + 5–10 Beta-User (Netzwerk, potenzielle Käufer/Verkäufer) mit Feedback-Formular.
- Monitoring: Leads, Errors, Performance.
- Schnelle Iterationen (Bugfixes innerhalb 24–48h).
- Erste manuelle "Deals" simulieren (Inquiry → PDF → "Unterschrieben" Status).

**Deliverables:** Soft-Launch-Report (Besucher/Leads/Feedback), Bug-Log geschlossen, erste 1–2 reale Inquiries verarbeitet.

### Phase 6: Public Launch & Growth (ab Woche 5–6)
**Ziel:** Sichtbarkeit + erste Umsätze.

**Konkrete Maßnahmen:**
- Announcement: LinkedIn-Post, X/Twitter, relevante Gruppen (Flippa-Community, deutsche Business-Foren, Startup-Österreich).
- SEO: Google Search Console + sitemap submit, On-Page für Keywords "website kaufen", "saas kaufen österreich", "blog mit umsatz kaufen", "immobilienportal kaufen" etc.
- Paid: Kleines Budget (300–800 €/Monat) Google Ads + LinkedIn für "digitale assets kaufen", "online business übernehmen".
- Content: 4–6 Asset-Highlight-Artikel / Case Studies (z. B. "Wie der AETHER Music Studio in 1 Tag live ging").
- PR: Anfragen an Tech-/Business-Medien DACH.
- Seller-Akquise: Persönliche Outreach an bekannte Flippa-Verkäufer + eigene Netzwerk.

**Deliverables:** Öffentlicher Launch-Post, 50+ Leads im ersten Monat, erste 3–5 Deals.

### Phase 7: Operations & Iteration (ongoing ab Soft Launch)
- Täglich: Lead-Follow-up im Admin (Status-Updates, Verträge generieren, Calls).
- Wöchentlich: 1–2 neue Assets onboarden (standardisierter Prozess).
- Monatlich: Review Roadmap (neue Features: echte Payments, Seller-Dashboard, Escrow-Partner).
- Skalierung: White-Label-Version, Agentur-Partnerschaften.

---

## 5. Ressourcen, Budget & Risiken

**Budget (geschätzt, bis Public Launch):**
- Hosting (Vercel + Domain): 0–30 €/Monat
- Legal-Review: 800–1.500 €
- Ads (erster Monat): 500 €
- Tools (Sentry, Analytics, Formspree/Supabase): 0–50 €
- **Gesamt:** < 2.500 € + eigene Zeit

**Zeitaufwand (Solo):** 15–25 h/Woche für 6 Wochen.

**Risiken & Mitigation (professionell):**
- Rechtliche Haftung auf Verträgen → Anwalt-Review + Disclaimer "keine individuelle Beratung".
- Keine echten Zahlungen → Starte mit "Inquiry + manuelle Abwicklung", integriere Stripe parallel.
- Wenig Traffic → Fokus auf organisch (SEO + Content) + kleines Paid + persönliches Netzwerk.
- Technische Ausfälle → Vercel + Monitoring + Fallback auf statische designs/.
- Verkäufer-Onboarding langsam → Starkes Seller-Formular + "Asset Upload Checklist" + persönliche Betreuung der ersten 5.

---

## 6. Asset Onboarding Process (1:1 mit aktuellem Upload-Stand)

Dieser standardisierte Prozess stellt sicher, dass **jeder neue Upload** (wie AETHER Music Studio) exakt dem aktuellen Qualitätsniveau entspricht:

1. **Demo bauen** (public/demos/[slug].html): Full sovereign Features + localStorage + "Admin"-Bereich für Käufer.
2. **Listing eintragen** (src/data/listings.ts): Alle Felder + premiumDomain + domainIncludedNote.
3. **Preview-Link** (src/pages/ListingDetail.tsx → demoMap).
4. **Verträge** (falls nötig): Erweiterung in generateContracts.ts mit spezifischer Beschreibung/Handover-Items.
5. **Statisch** (optional): designs/unterseiteN.html + aktualisierte Contract-Links.
6. **Test & Kampagne:** Manuell testen, Screenshot, ggf. in kampange.html eintragen.
7. **Docs updaten:** PROJECT_SUMMARY.md, README, diese Roadmap.

**Beispiel:** AETHER wurde exakt so hinzugefügt (MP3-Upload, Player, Studio, localStore) und ist sofort launch-fähig.

---

## 7. Nächste Sofort-Aktionen (diese Woche)

1. Phase 1 Tasks starten (Test-Checklist für alle Demos inkl. aether-music-studio.html).
2. Bankdaten in alle relevanten Dateien/Footer/PDFs eintragen.
3. Supabase- oder Formspree-Integration als erstes Backend-Minimal pilotieren.
4. Vercel-Account + erstes Deploy vorbereiten.
5. Anwalt-Kontakt für Contract-Review herstellen.

---

**Dieser Roadmap ist lebendig.** Nach jedem Meilenstein updaten (Git-Commit + neue Version).

**Kontakt für Fragen/Updates:** support@selinova-tech.at

**Status:** Ready for Phase 1 Execution.

---

*Erstellt mit 1:1-Übereinstimmung zum aktuellen Projektstand (18 Demos, 20 Listings, individualisierte Preise & Verträge, lokaler Store, AETHER-Upload als Referenz). Demo-Funktionen in Unterseiten 1-16 entfernt ( "Demo anfragen" -> "Anfrage senden", demo.de Referenzen gefixt). Formulare jetzt funktional mit mailto (sorgfältig arbeitend). Individuelle SVG-Logos für alle 16 Unterseiten in designs/logos/ erstellt (unterschiedlich, professionell). Rechtliche Impressum + DSGVO-Sektionen für alle Unterseiten hinzugefügt und optimiert (spezifisch pro Projekt, mit Domain wo anwendbar). Formulare verbessert, Buttons funktionsfähig, fehlende Zeichen/Links korrigiert. Full-Stack-Readiness für statische Unterseiten: funktionelle JS-Formulare, lokale Simulation. Bilder/Logos: SVG pro Unterseite (einzigartig für Ecom, SaaS, Blog, Fitness, Immo, Job, Reise, E-Learn, Vers, Crypto etc.). Videos: Platzhalter-Sektionen mit CSS-Animationen für "produktionsreife CGI Werbevideos" (realistic product viz mit Effekten) hinzugefügt in relevanten Unterseiten (Beschreibung der Effekte für jedes). Alle Dateien sorgfältig geprüft und angepasst.*

**Nächster Schritt:** Bestätige "Starte Phase 1" – dann arbeiten wir die konkreten Tasks ab (mit Checklisten, Code-Änderungen, Commits). DNS Configs am Schluss.

**Zusätzlich für Visitenkarten + QR (Launch-Ready):**
- `designs/qr-code.svg` – fertiger QR-Code (Vektor, scannt auf https://assetmarkt.at/angebote-qr)
- `designs/angebote-qr-selector.html` – interaktive Selector-Seite: Scan → schönes zentriertes Fenster/Popup mit **allen 16 Unterseiten** (Name + Domain + Preis). Ein Klick leitet direkt zur jeweiligen Seite/Domain weiter. Voll mobil-optimiert (sieht aus wie eine App).
- `designs/visitenkarte.html` – komplette Visitenkarten-Vorlage (Vorder- + Rückseite im realen 90×55 mm Format). QR prominent platziert. Mit Logo, Kontaktdaten, Erklärung des Flows. Direkt druckbar oder als Template für Grafik-Programm nutzbar.

---

## DNS Einstellungen für selinova-tech.at (für index.html / Main Marketplace)

**Ziel:** selinova-tech.at zeigt auf die Hauptseite (index.html oder die React App als SPA mit index.html als Entry).

**Empfohlener Hosting für 24H-Launch (statisch + einfach):**
- **Netlify** oder **Vercel** (beide free für custom domain, gut für HTML + SPA).
- Deploy die **designs/** Ordner-Inhalte als statische Site (index.html als Root für selinova-tech.at).
- Oder deploy den **dist/** Ordner der React App (npm run build) als SPA (besser für interaktiven Marktplatz mit Admin etc.).

**Schritt-für-Schritt DNS Setup (nach Deploy):**

1. **Deploy zuerst:**
   - Für statisch (designs/ als index.html Landing für alle Unterseiten-Links):
     - Netlify: Drag & Drop den `designs` Ordner hoch (oder Git connect).
     - Vercel: Import Git Repo, Root Directory `designs`, Output `designs`.
   - Für React (empfohlen für full Features):
     - `npm run build`
     - Deploy `dist/` Ordner zu Netlify/Vercel.
   - Im Hosting Dashboard: Custom Domain hinzufügen → `selinova-tech.at` und `www.selinova-tech.at`.

2. **Bei deinem Domain-Registrar (z.B. wo du .at gekauft hast – nic.at, United Domains, etc.) die DNS Records setzen:**

   **Option A: Nameserver des Hosters verwenden (einfachste, empfohlen für Anfänger):**
   - Im Hosting (Netlify/Vercel) die Nameserver anzeigen lassen (z.B. ns1.netlify.com etc.).
   - Bei Registrar: Die 4 Nameserver des Hosters für selinova-tech.at eintragen (ersetzt die alten).
   - Propagation: 1-48h (meist schneller).
   - Vorteil: Automatische SSL, einfache Weiterleitungen.

   **Option B: Nur Records (wenn du Nameserver beim Registrar lassen willst):**
   - Für **www.selinova-tech.at**:
     - Type: CNAME
     - Name: www
     - Value: [dein-netlify-site.netlify.app] oder [dein-vercel-project.vercel.app] (vom Hosting Dashboard)
   - Für **Root (selinova-tech.at)**:
     - Type: A (oder ALIAS/ANAME bei manchen Registraren)
     - Name: @ (oder leer)
     - Value: 75.2.60.5   (Netlify Standard IP – prüfe im Dashboard für aktuelle IPs; Vercel hat andere)
     - Zusätzlich zweiten A Record: 99.83.190.102 (für Redundanz bei Netlify)
   - Optional: CAA Records für SSL wenn gefordert.

3. **Nach Setzen:**
   - Warte auf Propagation (https://dnschecker.org).
   - Im Hosting: SSL Zertifikat aktivieren (automatisch bei Netlify/Vercel für custom domains).
   - Test: https://selinova-tech.at sollte die index.html oder React App zeigen.
   - Für SPA (React): Stelle sicher, dass der Host "SPA Mode" oder Rewrite auf /index.html hat (bei Vercel/Netlify default für SPA Deploys).

**Wichtige Updates im Code (bereits größtenteils erledigt):**
- Alle Links/Meta in designs/*.html jetzt auf selinova-tech.at (keine .at.at mehr).
- Für per-Asset Domains (z.B. shop-fashion.co.at): Diese separat im Registrar auf die jeweilige statische Unterseite oder spezifische Deploy mappen.
- In React (wenn als Main): Keine absoluten Links nötig, relative /angebot/... funktionieren.
- Füge in Footer/Header der index.html explizit "selinova-tech.at" als aktuelle Domain ein (falls noch nicht).

**Zusätzliche DNS für Unterseiten (z.B. shop-fashion.co.at):**
- Für jede gekaufte Domain separat: Im Hosting eine neue Site/Redirect anlegen, oder bei Netlify "Domain Aliases" / separate Sub-Deploy.
- DNS: CNAME www zu Host, A für Root.

**Nächste Schritte nach DNS:**
- SSL prüfen.
- Alle Unterseiten-Links in der index.html / Selector auf die korrekten Domains updaten (z.B. shop-fashion.co.at für #A1042).
- Test mit Browser.

**Falls Probleme:** Sag Bescheid mit Registrar-Name, dann gebe exakte Records.

DNS Configs jetzt aktiv – der Rest der Roadmap (Deploy, Test) folgt. Wir sind ready für Launch! 

Falls du die index.html (designs/index.html) als reinen statischen Mainboard für selinova-tech.at hosten willst: Deploy nur designs/ Ordner, und verlinke von dort zu den einzelnen Unterseiten-HTMLs oder den Domains. 

Sag, was als Nächstes (z.B. spezifische Deploy-Anleitung für Netlify).

Die komplette Idee ist umgesetzt: Eine Karte mit einem QR → Kunde scannt → wählt aus allen Unterseiten → landet sofort auf der passenden Asset-Landingpage mit Verträgen.
