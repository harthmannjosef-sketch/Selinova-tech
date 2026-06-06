import jsPDF from 'jspdf';
import { Listing } from '../types/listing';
import { recordContract } from './store';

type ContractType = 'kaufvertrag' | 'mietvertrag' | 'nda' | 'uebergabe';

async function loadLogoAsBase64(): Promise<string | null> {
  try {
    const res = await fetch('/images/selinova-gate-logo.png');
    if (!res.ok) {
      console.warn('[PDF] Logo not found at /images/selinova-gate-logo.png — using drawn header. Save the logo image there.');
      return null;
    }
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('[PDF] Could not load logo image, using text/drawn header only.', e);
    return null;
  }
}

/** Helper to add text and advance y, with auto page break */
function addText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight = 5.5) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function checkPageBreak(doc: jsPDF, y: number, margin: number, pageHeight: number): number {
  if (y > pageHeight - 35) {
    doc.addPage();
    return margin + 10;
  }
  return y;
}

function drawHeader(doc: jsPDF, title: string, listing: Listing, margin: number, pageWidth: number, logoBase64?: string | null) {
  // Top bar
  doc.setFillColor(7, 8, 13);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setTextColor(0, 229, 255);
  doc.setFontSize(10);
  doc.text('SELINOVA-TECH Medien Architektur E.U', margin, 11);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('SELINOVA GATE — Professionelle Assets', pageWidth - margin, 11, { align: 'right' });

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, 26);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${listing.title}  •  #${listing.id}  •  ${listing.source}`, margin, 32);

  // Add the actual logo image if available (left side of letterhead)
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', margin, 2, 22, 10);
    } catch (e) {
      console.warn('Failed to add logo image to PDF', e);
    }
  } else {
    // Fallback visual: simple triangle + center glow + "GATE" to represent the provided logo
    const lx = margin + 8;
    const ly = 7;
    doc.setDrawColor(0, 229, 255);
    doc.setLineWidth(0.4);
    doc.line(lx, ly - 2.5, lx - 4, ly + 2.5);
    doc.line(lx - 4, ly + 2.5, lx + 4, ly + 2.5);
    doc.line(lx + 4, ly + 2.5, lx, ly - 2.5);
    doc.setFillColor(0, 229, 255);
    doc.circle(lx, ly, 1.3, 'F');
    doc.setFontSize(4);
    doc.setTextColor(0, 229, 255);
    doc.text('GATE', lx - 2, ly + 4.5);
  }
}

function drawFooter(doc: jsPDF, pageNum: number, totalPages: number, margin: number, pageWidth: number, pageHeight: number) {
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  const disclaimer = 'Dieses Dokument ist eine professionelle Vertragsvorlage für den Kauf oder die Miete digitaler Assets. Es zeigt rechtlich abgesicherte Wege für beide Parteien (Verkäufer/Vermieter und Käufer/Mieter). Es ersetzt keine individuelle anwaltliche Beratung. Vor Abschluss eines rechtsverbindlichen Vertrags ist eine Prüfung durch einen in Österreich zugelassenen Rechtsanwalt erforderlich. SELINOVA-TECH Medien Architektur E.U haftet nicht für die rechtliche Wirksamkeit nach individueller Anpassung.';
  const lines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2);
  doc.text(lines, margin, pageHeight - 18);
  doc.text(`Seite ${pageNum} von ${totalPages}  •  Generiert am ${new Date().toLocaleDateString('de-DE')}  •  SELINOVA-TECH Medien Architektur E.U, 1020 Wien, Engerthstrasse`, margin, pageHeight - 8);
}

/** ==================== ANGEBOTSBLATT ==================== */
export async function generateAngebotsblatt(listing: Listing) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let y = 38;
  let pageNum = 1;

  const isRent = listing.type === 'rent';
  const priceLabel = isRent 
    ? `€${listing.price.toLocaleString('de-DE')} / Monat` 
    : `€${listing.price.toLocaleString('de-DE')}`;

  const logoBase64 = await loadLogoAsBase64();

  // Header (with logo if available)
  drawHeader(doc, 'ANGEBOTSBLATT', listing, margin, pageWidth, logoBase64);

  // Prominent price box
  doc.setFillColor(240, 248, 255);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 14, 2, 2, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(priceLabel, margin + 5, y + 9);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(listing.priceNote || (isRent ? 'Mietmodell' : 'Kaufpreis'), pageWidth - margin - 5, y + 9, { align: 'right' });
  y += 20;

  // Key Metrics
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('KENNZAHLEN', margin, y);
  y += 6;

  const metrics: string[] = [];
  if (listing.monthlyRevenue) metrics.push(`Monatsumsatz: €${listing.monthlyRevenue.toLocaleString('de-DE')}`);
  if (listing.mrr) metrics.push(`MRR: €${listing.mrr.toLocaleString('de-DE')}`);
  if (listing.traffic) metrics.push(`Traffic/Monat: ${listing.traffic.toLocaleString('de-DE')}`);
  if (listing.users) metrics.push(`Aktive Nutzer: ${listing.users.toLocaleString('de-DE')}`);
  if (listing.ageYears) metrics.push(`Alter: ${listing.ageYears} Jahre`);
  if (listing.category) metrics.push(`Kategorie: ${listing.category}`);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  metrics.forEach((m) => {
    y = checkPageBreak(doc, y, margin, pageHeight);
    doc.text(`• ${m}`, margin + 3, y);
    y += 5;
  });
  y += 4;

  // Description
  y = checkPageBreak(doc, y, margin, pageHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('PRODUKTBESCHREIBUNG', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  y = addText(doc, listing.shortDesc, margin, y, pageWidth - margin * 2);
  if (listing.fullDesc) {
    y += 2;
    y = addText(doc, listing.fullDesc, margin, y, pageWidth - margin * 2);
  }
  y += 3;
  // Uniqueness note for this offer only (prices + deliverables)
  y = addText(doc, `Hinweis: Dieses Angebotsblatt, der Preis und alle Konditionen gelten AUSSCHLIESSLICH für das Asset #${listing.id} in der hier beschriebenen Konfiguration. Ohne die exakten Kennzahlen, Deliverables und Bestandteile existiert dieses Angebot nicht.`, margin, y, pageWidth - margin * 2);
  y += 6;

  // Tech Stack
  y = checkPageBreak(doc, y, margin, pageHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNOLOGIE & STACK', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const techLine = listing.techStack.join('  •  ');
  y = addText(doc, techLine, margin, y, pageWidth - margin * 2);
  y += 6;

  // Pricing & Terms - explicit calculated for this offer
  y = checkPageBreak(doc, y, margin, pageHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('PREIS & KONDITIONEN – SPEZIFISCH FÜR DIESES ANGEBOT', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  if (isRent) {
    const monthly = listing.price;
    const minNote = listing.priceNote || 'Flexible Laufzeit möglich';
    y = addText(doc, `Monatlicher Mietzins (Angebotspreis): €${monthly.toLocaleString('de-DE')} / Monat — ${minNote}.`, margin, y, pageWidth - margin * 2);
    y = addText(doc, `Dieser Mietzins gilt ausschließlich für das in diesem Blatt beschriebene Asset mit den genannten Kennzahlen (MRR/Umsatz/Traffic/Nutzer). Eine andere Konfiguration ist nicht Gegenstand dieses Angebots.`, margin, y, pageWidth - margin * 2);
  } else {
    const total = listing.price;
    const first = Math.ceil(total / 2);
    const second = total - first;
    y = addText(doc, `Kaufpreis (Angebotspreis): €${total.toLocaleString('de-DE')} einmalig (inkl. aller Bestandteile). ${listing.priceNote || 'Einmalzahlung'}.`, margin, y, pageWidth - margin * 2);
    y = addText(doc, `Zahlung (explizit kalkuliert): 50 % (€${first.toLocaleString('de-DE')}) bei Vertragsunterzeichnung, 50 % (€${second.toLocaleString('de-DE')}) nach Übergabeprotokoll und Abnahme.`, margin, y, pageWidth - margin * 2);
    y = addText(doc, `Dieser Preis und diese Konditionen gelten AUSSCHLIESSLICH für dieses konkrete Angebot (#${listing.id}). Andere Assets oder Konfigurationen sind hiervon nicht umfasst – ohne die exakten in diesem Blatt genannten Deliverables existiert dieses Angebot nicht.`, margin, y, pageWidth - margin * 2);
  }
  y += 6;

  // Source & Verification
  y = checkPageBreak(doc, y, margin, pageHeight);
  doc.setFont('helvetica', 'bold');
  doc.text('HERKUNFT & VERIFIZIERUNG', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  y = addText(doc, `Quelle: ${listing.source} • Asset-ID: #${listing.id} • Kategorie: ${listing.category}`, margin, y, pageWidth - margin * 2);
  y += 3;
  y = addText(doc, 'Alle Kennzahlen wurden von SELINOVA-TECH geprüft (Traffic-Historie, Umsatz, technische Due Diligence). Vollständige Unterlagen (NDA erforderlich) stehen nach Kontaktaufnahme zur Verfügung.', margin, y, pageWidth - margin * 2);
  y += 8;

  // Legal note box
  y = checkPageBreak(doc, y, margin, pageHeight);
  doc.setFillColor(255, 250, 240);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 28, 2, 2, 'F');
  doc.setTextColor(80, 60, 0);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('WICHTIGER HINWEIS', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  const legalNote = 'Dieses Angebotsblatt ist eine professionelle Grundlage für Verhandlungen. Es basiert auf vom Verkäufer/Vermieter bereitgestellten und von SELINOVA-TECH verifizierten Daten. Eine vollständige Due Diligence, steuerliche und rechtliche Prüfung durch einen qualifizierten Anwalt sind vor Vertragsabschluss zwingend. SELINOVA-TECH Medien Architektur E.U haftet nicht für die Richtigkeit der Angaben oder die Wirksamkeit individuell angepasster Verträge. Dieses Dokument weist rechtlich abgesicherte Wege für beide Parteien auf.';
  const noteLines = doc.splitTextToSize(legalNote, pageWidth - margin * 2 - 8);
  doc.text(noteLines, margin + 4, y + 11);
  y += 32;

  // Signature / Contact
  y = checkPageBreak(doc, y, margin, pageHeight);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.text('Interessiert? Kontaktieren Sie uns über die Plattform oder direkt unter support@selinova-tech.at', margin, y);

  // Footer
  drawFooter(doc, pageNum, 1, margin, pageWidth, pageHeight);

  const fileName = `Angebotsblatt-${listing.id}.pdf`;
  doc.save(fileName);

  recordContract({
    listingId: listing.id,
    listingTitle: listing.title,
    type: 'angebotsblatt',
    fileName,
  });
}

function getSpecificHandoverItems(listing: Listing): string[] {
  const items: string[] = [];
  const cat = (listing.category || '').toLowerCase();
  const tech = listing.techStack.join(' ').toLowerCase();
  const title = (listing.title || '').toLowerCase();
  const slug = listing.slug;

  // E-Commerce / Shops
  if (cat.includes('e-commerce') || title.includes('shop') || title.includes('ecommerce') || title.includes('woocommerce')) {
    items.push('Vollständiger Produktkatalog inklusive Bilder, Beschreibungen, Preise, Varianten und SKUs');
    items.push('Lagerbestands-, Bestell- und Kundendaten (DSGVO-konform, anonymisiert wo erforderlich)');
    items.push('Zahlungs-Integrationen (Stripe/Shopify etc.) mit API-Keys und Webhook-Konfigurationen');
    items.push('Versand- und Dropshipping-Integrationen inkl. Zugangsdaten und Prozessautomatisierungen');
    if (slug === 'woocommerce-elektronik') {
      items.push('Google Merchant Center Sync, Google Ads Konten und 340+ SKU-Daten mit aktuellen Preisen');
    }
  }
  // SaaS / Dashboards / Tools
  if (cat.includes('saas') || tech.includes('saas') || title.includes('dashboard') || title.includes('projektmanagement') || title.includes('buchhaltung')) {
    items.push('Nutzer- und Kundenstamm mit Subscription-, Billing- und Zahlungsdaten');
    items.push('API-Keys, Webhooks, Drittanbieter-Integrationen (z.B. HubSpot, DATEV-Export)');
    items.push('Datenbank-Dumps, Schema, Backup-Strategie und aktuelle Produktionsdaten');
    if (slug === 'pwa-buchhaltung') {
      items.push('GoBD-konforme Konfiguration, IndexedDB-Offline-Daten und PDF-Export-Templates');
    }
  }
  // Blogs / Content / Media
  if (cat.includes('blog') || title.includes('blog') || tech.includes('wordpress') || tech.includes('content') || title.includes('news') || title.includes('portal')) {
    items.push('Vollständiger Content-Export (Posts, Pages, Media Library, Kategorien)');
    items.push('Werbenetzwerk-Accounts (AdSense, Mediavine, Affiliate-Programme) mit Einnahmenhistorie und Login-Daten');
    items.push('Newsletter-Abonnenten-Listen (Mailchimp etc.) und Social-Media-Account-Zugänge');
    if (slug === 'food-blog-network') {
      items.push('3 Domains, 14 thematische Blogs, WPRecipeMaker Konfigurationen und Pinterest-Traffic-Accounts');
    }
  }
  // Mobile Apps
  if (cat.includes('app') || tech.includes('react native') || tech.includes('flutter') || title.includes('app') || title.includes('fitness')) {
    items.push('App-Store-Connect und Google-Play-Console Zugänge sowie App-Signing-Keys / Keystores');
    items.push('Push-Benachrichtigungs-Services (Firebase), Analytics und Crash-Reporting Zugänge');
    items.push('In-App-Purchase- und Subscription-Konfigurationen (RevenueCat / Stripe)');
    if (slug === 'react-native-fitness-app' || slug === 'fitness-health-app') {
      items.push('Firebase Project Config, Workouts/Ernährungs-Datenbank-Dumps und Community-Challenge-Logik');
    }
  }
  // B2B / LeadGen / RealEstate / Jobs
  if (slug === 'b2b-leadgen-dach') {
    items.push('1.200 registrierte Firmen-Datensätze, CRM-Sync (HubSpot) Konfigurationen und 4.200 Newsletter-Abonnenten');
    items.push('Lead-Such-Algorithmen, Matching-Logik und Export-Funktionen');
  }
  if (slug === 'immobilien-portal') {
    items.push('1.450 Inserate mit Bildern und Metadaten, Lead-Daten für Makler, Karten-Integration (Leaflet/Mapbox) Keys');
    items.push('Filter-Engine und Admin-Dashboard für Inserats-Management');
  }
  if (slug === 'jobboard-it-tech') {
    items.push('280 offene Stellenanzeigen, 1.900 Kandidaten-Profile, Employer-Branding-Tools und Bewerbungs-Tracking-Daten');
  }
  // Travel
  if (slug === 'reise-cityguides') {
    items.push('City Guides für 28+ europäische Städte (Content + Bilder + Karten), Booking.com Partner-Integrationen und Hotel/Tour-Partner-Daten');
    items.push('Interaktive Leaflet-Karten-Konfigurationen und Booking-Flows');
  }
  // Insurance / Finance / Crypto
  if (slug === 'versicherungs-vergleich') {
    items.push('Vergleichs-Logik, Filter und Tabellen für Kfz/Haftpflicht/Hausrat, CPA-Partner-APIs und Lead-Routing-Konfigurationen');
    items.push('42.000 MAU Traffic-Quellen und historische Lead-Qualitätsdaten');
  }
  if (slug === 'crypto-nft-portal') {
    items.push('18.000 Community-Mitglieder, NFT-Gallery Assets, Wallet-Connect Integration, Token-Gated Content Logik und Discord-Bot + Server-Admin');
  }
  // E-Learning
  if (slug === 'elearning-platform') {
    items.push('62 Kurse mit Video-Lektionen, Quizzes, Zertifikats-Templates, Enrollment- und Progress-Daten, Stripe-Zahlungs-Setup');
  }
  // DÖNERO specific (Wheel IP, Filialen)
  if (slug === 'donero-punjab-doner') {
    items.push('Interaktiver Wheel-Selector (IP & UI/UX-Logik für Döner-Zusammenstellung mit Zutaten/Soßen/Extras + Echtzeit-Preiskalkulation)');
    items.push('Loyalty-Programm (Punkte, Belohnungen, exklusive Deals), Filial-Finder für alle 28 Punjab Döner Filialen mit Integrationen');
    items.push('React Native App + PWA, Firebase Backend, Stripe Payment Flows, Bestellhistorie und Kunden-Accounts der Punjab Kette');
    items.push('Markenrechte und Design-Assets der DÖNERO / Punjab Döner Plattform');
  }
  // News / Tech Portal
  if (slug === 'news-portal-tech') {
    items.push('Tech & Startup News Archiv (Kategorien AI/Funding/Startup), Community Comments, Ad-Placements und Publishing-Admin');
    items.push('9.400 Newsletter-Abonnenten und Mailchimp/Send-Integrationen');
  }

  if (items.length === 0) {
    items.push('Vollständiger Quellcode, Datenbank-Dump, Domain-Zugänge, API-Keys und Admin-Accounts wie in §4 beschrieben');
  }
  return items;
}

/** Per-offer unique description that makes the contract ONLY valid/sensible for THIS exact asset/offer. */
function getSpecificOfferDescription(listing: Listing): string {
  const slug = listing.slug;
  const id = listing.id;
  const title = listing.title;

  if (slug === 'premium-ecommerce-fashion') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf den "Premium E-Commerce Shop – Fashion Nische" (Asset-ID #${id}). Inklusive: React/Next.js Codebase mit Shopify-Checkout, vollständigem Produktkatalog (Filter, Varianten, Bilder, Preise), Lieferketten-Integration, SEO-Optimierung (Score 94), Social-Media-Kanälen, Admin-Bereich, 12.000 monatlichen Besuchern, ca. €3.200 Monatsumsatz und 3-jähriger Traffic-/Umsatz-Historie. Der Vertrag gilt nur für dieses konkrete Shop-Asset in seiner aktuellen Konfiguration. Ein anderes E-Commerce-Projekt, ein anderer Shop oder eine abweichende Codebase ist nicht Gegenstand dieses Angebots – ohne diese exakten Kennzahlen, Integrationen und Historie existiert dieses Angebot nicht.`;
  }
  if (slug === 'authority-blog-finance') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf den "Authority Blog – Finanznische – 80K Traffic" (Asset-ID #${id}). Inklusive: WordPress/Elementor Installation mit 80.000 monatlichen organischen Besuchern, DR 45, laufenden AdSense- + Affiliate-Einnahmen (ca. €2.100/Monat), 5-jähriger Content-Historie, SEO-Score 91, Newsletter, Admin für Content-Management und allen Werbenetzwerk-Accounts. Der Vertrag gilt nur für dieses exakte Blog-Asset mit der genannten Traffic-, Domain- und Umsatzhistorie. Andere Blogs, Finanzportale oder Content-Seiten ohne diese exakten Metriken und Accounts sind nicht Gegenstand – ohne 80k Traffic, DR45 und die AdSense/Affiliate-Accounts existiert dieses Angebot nicht.`;
  }
  if (slug === 'react-native-fitness-app') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf die "React Native App – Fitness & Tracking" (Asset-ID #${id}). Inklusive: Vollständiger React Native Cross-Platform App (iOS + Android) mit Workouts, Progress-Tracking, Community-Challenges, Push-Notifications, In-App-Purchases, 5.200 aktiven Nutzern (MAU), 4.6★ App-Store-Rating, Firebase Backend, RevenueCat, Stripe, Source Code, Signing Keys und App-Store-Accounts. Der Vertrag gilt nur für diese exakte App-Version und Konfiguration mit den genannten Nutzerzahlen und Monetarisierungs-Setups. Andere Fitness-Apps oder React-Native-Projekte ohne App-Store-Accounts, RevenueCat-Projekt und exakt diese MAU/Rating-Historie sind nicht Gegenstand – ohne diese App-Store-Assets und 5.2k MAU existiert dieses Angebot nicht.`;
  }
  if (slug === 'b2b-leadgen-dach') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf die "B2B Lead-Gen Plattform – DACH Region" (Asset-ID #${id}). Inklusive: Lead-Suche, CRM-Sync (HubSpot), automatisierte Newsletter-Kampagnen (4.200 Abonnenten), 1.200 registrierte Firmen, Admin-Dashboard, Matching-Logik und DACH-spezifische Datensätze. Der Vertrag gilt nur für diese exakte B2B-Plattform mit den genannten Firmen- und Abonnentenzahlen sowie HubSpot-Integration. Andere Lead-Gen-Systeme oder B2B-Plattformen ohne diese 1.200 Firmen, 4.200 Abos und HubSpot-Sync sind nicht Gegenstand – ohne diese exakten Leads, CRM-Daten und die DACH-Fokussierung existiert dieses Angebot nicht.`;
  }
  if (slug === 'news-portal-tech') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "News Portal – Tech und Startup" (Asset-ID #${id}). Inklusive: Tech/Startup/AI/Funding News-Archiv, Kategorien, Search, Comments, Ad-Placements, Newsletter (9.400 Abos), Community-Features und vollem Publishing-Admin. Der Vertrag gilt nur für dieses exakte Portal mit 28.000 monatlichen Unique Visitors, 2-jähriger Historie und den genannten Abonnenten. Andere News-Portale oder Tech-Blogs ohne diese Traffic-Zahlen, Newsletter-Listen und Ad-Setup sind nicht Gegenstand – ohne 28k UV und 9.4k Abos existiert dieses Angebot nicht.`;
  }
  if (slug === 'immobilien-portal') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "Immobilien-Portal Regional" (Asset-ID #${id}). Inklusive: 1.450 Inserate, Karten-Integration (Leaflet/OpenStreetMap), Filter-Engine (Preis/Typ/Ort), Lead-Gen für Makler, Inserats-Management und Admin-Dashboard mit 42.000 Traffic. Der Vertrag gilt nur für dieses exakte regionale Immobilienportal mit dem genannten Inseratsvolumen und Karten-Features. Andere Immobilienportale oder Listing-Sites ohne 1.450 Inserate und die Leaflet-Karten-Engine sind nicht Gegenstand – ohne dieses Inseratsvolumen und die Karten-Integration existiert dieses Angebot nicht.`;
  }
  if (slug === 'jobboard-it-tech') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "Job-Board IT und Tech" (Asset-ID #${id}). Inklusive: 280 offene IT/Tech-Stellenanzeigen, 1.900 registrierte Kandidaten, Employer-Branding-Tools, Bewerbungs-Tracking und Admin. Der Vertrag gilt nur für dieses exakte Job-Board mit den genannten Stellen- und Kandidatenzahlen. Andere Jobbörsen oder Career-Plattformen ohne diese 280 Stellen und 1.900 Profile sind nicht Gegenstand – ohne diese exakten Job- und Kandidatendaten existiert dieses Angebot nicht.`;
  }
  if (slug === 'food-blog-network') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "Rezept und Food Blog Netzwerk" (Asset-ID #${id}). Inklusive: 3 Domains + 14 thematische Food/Rezept-Blogs, WPRecipeMaker, Pinterest-Traffic, Mediavine Publisher, Affiliate-Integrationen, 65.000 monatliche Besucher, 4-jährige Historie und Social-Media-Accounts. Der Vertrag gilt nur für dieses exakte Food-Blog-Netzwerk mit den genannten Domains und Affiliate-Accounts. Andere Rezept-Blogs oder Food-Portale ohne die 14 Blogs, 3 Domains und Mediavine-Integration sind nicht Gegenstand – ohne diese Netzwerk-Struktur und Traffic existiert dieses Angebot nicht.`;
  }
  if (slug === 'reise-cityguides') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "Reise-Portal Cityguides Europa" (Asset-ID #${id}). Inklusive: Curated City Guides für 28+ europäische Städte (Content, Bilder, interaktive Leaflet-Karten), Booking-Integrationen, Hotel/Tour-Partner-Partnerschaften, 38.000 MAU und Marken-Assets. Der Vertrag gilt nur für dieses exakte Reise-Portal mit den genannten Städte-Guides und Booking-Flows. Andere Reise-Portale oder Cityguide-Apps ohne diese 28 Städte und Partner-Integrationen sind nicht Gegenstand – ohne die City-Guides-Datenbank und Booking-Partnerschaften existiert dieses Angebot nicht.`;
  }
  if (slug === 'versicherungs-vergleich') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "Vergleichsportal Versicherungen" (Asset-ID #${id}). Inklusive: Vergleichs-Engine für Kfz-, Haftpflicht- und Hausratversicherungen, Tabellen/Filter, Lead-Generierung, Partner-APIs, CPA-Provisionen, 42.000 monatliche Besucher und 6-jährige Historie mit starker Lead-Qualität. Der Vertrag gilt nur für dieses exakte Vergleichsportal mit den genannten Versicherungs-Sparten und Lead-Routing. Andere Vergleichsportale oder Finanz-Tools ohne diese Lead-Qualität, 42k Traffic und CPA-Setup sind nicht Gegenstand – ohne die Versicherungs-Vergleichslogik und CPA-Partner existiert dieses Angebot nicht.`;
  }
  if (slug === 'crypto-nft-portal') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf das "Crypto und NFT Community Portal" (Asset-ID #${id}). Inklusive: 18.000 Community-Mitglieder, NFT-Galerie, Wallet-Connect Integration, Token-Gated Content, Discord-Integration (Bot + Server), 22.000 Traffic und Admin. Der Vertrag gilt nur für dieses exakte Crypto/NFT-Portal mit der genannten Community-Größe und Token-Gating-Logik. Andere Crypto-Communities oder NFT-Plattformen ohne 18k Mitglieder, Wallet-Connect und Discord-Gating sind nicht Gegenstand – ohne diese Community und die Token-Gated Assets existiert dieses Angebot nicht.`;
  }
  if (slug === 'donero-punjab-doner') {
    return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf "DÖNERO – Punjab Döner App mit Wheel Selector" (Asset-ID #${id}) – die dedizierte Döner-Variante des PIZZA-WHEEL Konzepts für die Punjab Döner Kette. Inklusive: Interaktiver Wheel-Selector (einzigartige IP für Döner-Zusammenstellung mit Zutaten/Soßen/Extras + Echtzeit-Preiskalkulation), Loyalty-Programm mit Punkten und exklusiven Deals, Filial-Finder + Integration für alle 28 Punjab Filialen, React Native App + PWA, Firebase Backend, Stripe-Zahlung, Bestellhistorie, Kunden-Accounts und Marken-Assets. Der Vertrag gilt nur für diese exakte DÖNERO-Instanz mit Wheel-IP, 28-Filialen-Anbindung und Punjab-Markenrechten. Ein vergleichbares Ordering-Tool ohne den Wheel-Selector, ohne die 28-Filialen-Integration oder ohne die DÖNERO/Punjab Marke ist nicht Gegenstand dieses Angebots – ohne diese spezifische Wheel-Technologie, Filialanbindung und 28-Filialen-Daten existiert dieses Angebot nicht.`;
  }

  // Fallback for any missed or rent ones (still make it offer-specific)
  return `Dieses Angebot und dieser Vertrag beziehen sich AUSSCHLIESSLICH auf "${title}" (Asset-ID #${id}, Kategorie: ${listing.category}). Alle in §1 genannten Kennzahlen (Traffic, Nutzer, Umsatz, Stack), der Quellcode, die Daten, Zugänge und Rechte in der zum Zeitpunkt der Übergabe bestehenden Form sind integraler Bestandteil. Ein anderes oder abweichendes digitales Asset ist nicht Gegenstand dieses Vertrags. Ohne die exakt in diesem Vertrag beschriebenen Metriken, Deliverables und Konfigurationen existiert dieses Angebot nicht.`;
}

/** ==================== KAUF- / MIETVERTRAG (verbessert & produktspezifisch) ==================== */
export async function generateContractPDF(listing: Listing, type: ContractType) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let y = 30;
  let pageNum = 1;

  const isRent = listing.type === 'rent';
  const isPurchase = type === 'kaufvertrag' || (!isRent && type !== 'mietvertrag');

  const title = isPurchase ? 'KAUFVERTRAG' : 'MIETVERTRAG';
  const fileBase = isPurchase 
    ? `Kaufvertrag-${listing.id}` 
    : `Mietvertrag-${listing.id}`;

  // Header
  doc.setFillColor(7, 8, 13);
  doc.rect(0, 0, pageWidth, 14, 'F');
  doc.setTextColor(0, 229, 255);
  doc.setFontSize(9);
  doc.text('SELINOVA-TECH Medien Architektur E.U', margin, 10);
  doc.setTextColor(255, 255, 255);
  doc.text('SELINOVA GATE — Vertrag für digitale Assets', pageWidth - margin, 10, { align: 'right' });

  const logoBase64 = await loadLogoAsBase64();

  // Add the actual logo image if available (left side of letterhead)
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', margin, 2, 20, 9);
    } catch (e) {
      console.warn('Failed to add logo image to PDF', e);
    }
  } else {
    // Draw simple logo icon (triangle + GATE) representing the provided image
    const lx = pageWidth - margin - 16;
    const ly = 7.5;
    doc.setDrawColor(0, 229, 255);
    doc.setLineWidth(0.3);
    doc.line(lx, ly - 2, lx - 3.5, ly + 2);
    doc.line(lx - 3.5, ly + 2, lx + 3.5, ly + 2);
    doc.line(lx + 3.5, ly + 2, lx, ly - 2);
    doc.setFillColor(0, 229, 255);
    doc.circle(lx, ly, 1, 'F');
    doc.setFontSize(3);
    doc.setTextColor(0, 229, 255);
    doc.text('GATE', lx - 1.8, ly + 3.5);
  }

  // TODO: For the exact logo image: doc.addImage(logoBase64, 'PNG', lx - 4, ly - 2.5, 8, 5);
  // Place the image at public/images/selinova-gate-logo.png and convert to base64 when needed.

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, 24);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${listing.title} (#${listing.id})`, margin, 30);

  y = 38;

  const addSection = (title: string) => {
    y = checkPageBreak(doc, y, margin, pageHeight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
  };

  const addParagraph = (text: string) => {
    y = checkPageBreak(doc, y, margin, pageHeight);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 4.8 + 2;
  };

  // Preamble - emphasizes this is ONLY for this exact offer
  addParagraph(`Dieser ${isPurchase ? 'Kaufvertrag' : 'Mietvertrag'} („Vertrag“) wird geschlossen zwischen dem Verkäufer/Vermieter („Verkäufer“) und dem Käufer/Mieter („Käufer“). SELINOVA-TECH Medien Architektur E.U tritt ausschließlich als Vermittler und Plattformbetreiber auf. Dieser Vertrag bezieht sich AUSSCHLIESSLICH auf das in §1 beschriebene konkrete Angebot. Ein anderes digitales Asset oder eine abweichende Konfiguration ist nicht Gegenstand dieses Vertrags.`);

  // §1
  addSection('§ 1 Vertragsgegenstand');
  addParagraph(`Gegenstand dieses Vertrags ist das digitale Asset mit der Bezeichnung "${listing.title}" (Asset-ID: #${listing.id}, Kategorie: ${listing.category}, Quelle: ${listing.source}).`);
  addParagraph(`Beschreibung: ${listing.shortDesc}`);
  if (listing.premiumDomain) {
    addParagraph(`Inklusive Premium-Domain: ${listing.premiumDomain} (vollständiger Inhaberwechsel und Auth-Code-Übergabe im Rahmen von §4).`);
  }
  if (listing.monthlyRevenue) addParagraph(`Bestätigter Monatsumsatz: ca. €${listing.monthlyRevenue.toLocaleString('de-DE')}.`);
  if (listing.mrr) addParagraph(`MRR (Monthly Recurring Revenue): ca. €${listing.mrr.toLocaleString('de-DE')}.`);
  if (listing.traffic) addParagraph(`Monatlicher Traffic: ca. ${listing.traffic.toLocaleString('de-DE')} Unique Visitors.`);
  if (listing.users) addParagraph(`Aktive Nutzer / Kunden / Mitglieder: ca. ${listing.users.toLocaleString('de-DE')}.`);
  if (listing.ageYears) addParagraph(`Betriebsalter / Historie: ca. ${listing.ageYears} Jahre.`);
  addParagraph(`Technologie-Stack: ${listing.techStack.join(', ')}.`);

  // Insert the highly asset-specific description that makes this contract unique to THIS offer only
  const specificDesc = getSpecificOfferDescription(listing);
  if (specificDesc) {
    addParagraph(specificDesc);
  }

  // §2 - EXPLICIT PRICE CALCULATION & TERMS (per-offer, with exact numbers)
  addSection('§ 2 Kaufpreis / Mietzins und Zahlungsbedingungen');
  if (isPurchase) {
    const total = listing.price;
    const first = Math.ceil(total / 2);
    const second = total - first;
    const totalFmt = total.toLocaleString('de-DE');
    const firstFmt = first.toLocaleString('de-DE');
    const secondFmt = second.toLocaleString('de-DE');
    addParagraph(`Der Gesamtkaufpreis für das digitale Asset "${listing.title}" (#${listing.id}) beträgt €${totalFmt} (inkl. aller in §1 genannten Bestandteile: Quellcode, Datenbanken, Zugänge, Domains, Nutzerdaten, Integrationen, Markenrechte soweit vorhanden und Rechteübertragung). ${listing.priceNote ? 'Bewertungsbasis: ' + listing.priceNote : ''}`);
    addParagraph(`Zahlungsmodalitäten (explizit kalkuliert): 50 % des Kaufpreises (€${firstFmt}) sind innerhalb von 5 Werktagen nach Unterzeichnung dieses Kaufvertrags per Banküberweisung auf das vom Verkäufer benannte Konto zu leisten. Die restlichen 50 % (€${secondFmt}) sind innerhalb von 5 Werktagen nach Unterzeichnung des Übergabeprotokolls (§4) und erfolgreicher Abnahme/Freigabe durch den Käufer fällig.`);
    addParagraph(`Der Kaufpreis ist ein Festpreis für genau dieses Angebot. Eine Aufteilung oder Teilübertragung ist nicht möglich. Mit vollständiger Zahlung gehen alle Rechte am Asset unwiderruflich auf den Käufer über.`);
  } else {
    const monthly = listing.price;
    const minMonths = (listing.priceNote || '').match(/(\d+)\s*Mon/i) ? parseInt((listing.priceNote || '').match(/(\d+)\s*Mon/i)![1]) : 1;
    const minTotal = monthly * Math.max(minMonths, 1);
    addParagraph(`Der monatliche Mietzins für das digitale Asset "${listing.title}" (#${listing.id}) beträgt €${monthly.toLocaleString('de-DE')} (zzgl. 20% MwSt.). ${listing.priceNote || ''}`);
    if (minMonths > 1) {
      addParagraph(`Mindestlaufzeit: ${minMonths} Monate. Der Mindestgesamtbetrag für die Mindestlaufzeit beträgt somit €${minTotal.toLocaleString('de-DE')} (zzgl. MwSt.). Zahlung monatlich im Voraus per Banküberweisung oder über die von SELINOVA-TECH bereitgestellte Zahlungsschnittstelle.`);
    } else {
      addParagraph('Zahlung monatlich im Voraus per Banküberweisung oder über die von SELINOVA-TECH bereitgestellte Zahlungsschnittstelle. Kündbar gemäß Preisnote / monatlich kündbar, sofern nicht anders vereinbart.');
    }
    addParagraph(`Der Mietzins gilt ausschließlich für die in §1 spezifizierte Konfiguration und Nutzer-/Traffic-Volumina dieses Angebots. Eine Nutzung über die vereinbarten Grenzen hinaus bedarf einer gesonderten Vereinbarung.`);
  }

  // §3
  addSection('§ 3 Rechteübertragung / Lizenz');
  if (isPurchase) {
    addParagraph(`Der Verkäufer überträgt dem Käufer mit vollständiger Kaufpreiszahlung (gemäß §2, €${listing.price.toLocaleString('de-DE')}) alle Rechte am Asset "${listing.title}" (#${listing.id}), insbesondere Eigentum an Domains, Quellcode, Datenbanken, Nutzerkonten, Markenrechten (soweit vorhanden), Integrationen, Inhalten und allen sonstigen immateriellen Gütern, die zum Asset gehören. Der Verkäufer räumt hiermit eine unwiderrufliche, ausschließliche, unbeschränkte Lizenz zur Nutzung und Verwertung ein und verpflichtet sich zur Abtretung aller Rechte. Dies gilt ausschließlich für das in §1 beschriebene Angebot.`);
  } else {
    addParagraph(`Der Vermieter räumt dem Mieter für die Dauer des Mietverhältnisses (monatlicher Mietzins €${listing.price.toLocaleString('de-DE')}) ein nicht-ausschließliches, nicht übertragbares Nutzungsrecht am Asset "${listing.title}" (#${listing.id}) ein. Alle Rechte am Quellcode und an geistigem Eigentum verbleiben beim Vermieter, soweit nicht ausdrücklich etwas anderes vereinbart ist. Die Lizenz ist strikt auf die in §1 spezifizierte Konfiguration und Nutzerbasis dieses Angebots beschränkt.`);
  }

  // §4 - with asset-specific handover items (makes contract unique)
  addSection('§ 4 Übergabe und Mitwirkungspflichten');
  addParagraph('Der Verkäufer/Vermieter verpflichtet sich, innerhalb von 7 Werktagen nach Zahlungseingang alle notwendigen Zugangsdaten, Source Code, Datenbank-Dumps, Domain-Zugänge, API-Schlüssel, E-Mail-Accounts und sonstige für den Betrieb erforderlichen Informationen zu übergeben.');
  addParagraph('Der Käufer/Mieter verpflichtet sich, die erhaltenen Zugangsdaten unverzüglich zu ändern und den Verkäufer/Vermieter über erfolgreiche Übergabe zu informieren.');

  // Asset-specific handover list (generated from getSpecificHandoverItems)
  const handoverItems = getSpecificHandoverItems(listing);
  if (handoverItems.length > 0) {
    addParagraph('Zusätzlich zu den allgemeinen Übergabegegenständen sind folgende asset-spezifische Bestandteile integraler Bestandteil der Übergabe (nur für dieses Angebot):');
    handoverItems.forEach((item) => {
      addParagraph(`• ${item}`);
    });
    if (listing.premiumDomain) {
      addParagraph(`• Vollständige Domain ${listing.premiumDomain} (Inhaberwechsel, Auth-Code, Nameserver-Update, WHOIS-Daten-Übertragung)`);
    }
  }

  // §5
  addSection('§ 5 Gewährleistung, Haftung und Support');
  addParagraph('Der Verkäufer/Vermieter gewährleistet, dass er berechtigt ist, das Asset zu veräußern bzw. zu vermieten, und dass keine Rechte Dritter entgegenstehen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit gesetzlich zulässig.');
  addParagraph('Es wird eine Prüfphase von 14 Tagen ab Übergabe eingeräumt. Während dieser Zeit kann der Käufer/Mieter bei wesentlichen Abweichungen vom in §1 beschriebenen Zustand (einschließlich der asset-spezifischen Kennzahlen und Deliverables) vom Vertrag zurücktreten.');
  addParagraph(`Der Verkäufer/Vermieter stellt für einen Zeitraum von 30 Tagen nach Übergabe kostenlosen Support bei technischen Fragen zur Verfügung (max. 10 Stunden). Dieser Support bezieht sich ausschließlich auf das in diesem Vertrag beschriebene Asset "${listing.title}" (#${listing.id}) und dessen in §1 und §4 genannte Bestandteile. Darüber hinausgehende Anpassungen, Feature-Entwicklung oder Migrationen sind nicht inkludiert.`);

  // §6
  addSection('§ 6 Datenschutz und Geheimhaltung');
  addParagraph('Beide Parteien verpflichten sich zur Einhaltung der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes. Personenbezogene Daten, die im Rahmen des Assets verarbeitet werden (Kunden-, Nutzer-, Lead-Daten), sind im Rahmen der Übergabe (siehe §4) DSGVO-konform zu regeln und zu übertragen. Der Käufer/Mieter übernimmt die Verantwortung für die weitere DSGVO-konforme Verarbeitung ab Übergabe.');
  addParagraph('Die Parteien verpflichten sich, alle im Zusammenhang mit diesem Vertrag erlangten vertraulichen Informationen (insbesondere Umsatzzahlen, Kundendaten, technische Zugänge, Quellcode-Details) geheim zu halten. Diese Pflicht gilt für 5 Jahre nach Vertragsende. Dies gilt auch für die in §1 spezifizierten asset-eigenen Daten.');

  // §7
  addSection('§ 7 Anwendbares Recht und Gerichtsstand');
  addParagraph('Es gilt das Recht der Republik Österreich. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist, soweit gesetzlich zulässig, Wien.');
  addParagraph('Sollte eine Bestimmung dieses Vertrags unwirksam sein, bleibt der Vertrag im Übrigen wirksam. Die Parteien werden die unwirksame Bestimmung durch eine wirksame ersetzen, die dem wirtschaftlichen Zweck am nächsten kommt.');
  addParagraph(`Dieser Vertrag ist ausschließlich für das Angebot "${listing.title}" (#${listing.id}) erstellt. Er ist nicht auf andere Assets oder Angebote von SELINOVA-TECH oder Dritten übertragbar. Mit Unterzeichnung bestätigen beide Parteien, dass sie dieses konkrete Angebot in allen in §1–§4 beschriebenen Details verstanden und akzeptiert haben.`);

  y = checkPageBreak(doc, y, margin, pageHeight);
  y += 8;
  // Uniqueness confirmation box for this specific offer only
  doc.setFillColor(245, 248, 255);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 18, 2, 2, 'F');
  doc.setTextColor(20, 40, 80);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('BESTÄTIGUNG SPEZIFISCHES ANGEBOT', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  const uniqNote = `Dieser ${isPurchase ? 'Kaufvertrag' : 'Mietvertrag'} gilt ausschließlich für das Angebot "${listing.title}" (#${listing.id}). Die Preise (§2), Kennzahlen und Deliverables (§1, §4) sind exakt für dieses Asset kalkuliert und beschrieben. Ohne diese exakten Bestandteile existiert dieses Angebot nicht. Ein Einsatz für andere Projekte ist ausgeschlossen.`;
  const uniqLines = doc.splitTextToSize(uniqNote, pageWidth - margin * 2 - 6);
  doc.text(uniqLines, margin + 3, y + 9);
  y += 22;
  doc.setTextColor(0, 0, 0);

  doc.setFont('helvetica', 'bold');
  doc.text('Unterschriften', margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text('____________________________________________          ____________________________________________', margin, y);
  y += 5;
  doc.text('Verkäufer / Vermieter (Name, Anschrift, Datum)               Käufer / Mieter (Name, Anschrift, Datum)', margin, y);

  // Footer on last page
  drawFooter(doc, pageNum, 1, margin, pageWidth, pageHeight);

  const fileName = `${fileBase}.pdf`;
  doc.save(fileName);

  recordContract({
    listingId: listing.id,
    listingTitle: listing.title,
    type: isPurchase ? 'kaufvertrag' : 'mietvertrag',
    fileName,
  });
}

/** ==================== NDA & Übergabe ==================== */
export async function generateNdaOrUebergabe(listing: Listing, type: 'nda' | 'uebergabe') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let y = 30;
  let pageNum = 1;

  const isNda = type === 'nda';
  const title = isNda ? 'GEHEIMHALTUNGSVEREINBARUNG (NDA)' : 'ÜBERGABEPROTOKOLL';

  // Header
  doc.setFillColor(7, 8, 13);
  doc.rect(0, 0, pageWidth, 14, 'F');
  doc.setTextColor(0, 229, 255);
  doc.setFontSize(9);
  doc.text('SELINOVA-TECH Medien Architektur E.U', margin, 10);
  doc.setTextColor(255, 255, 255);
  doc.text('SELINOVA GATE — ' + (isNda ? 'NDA' : 'ÜBERGABE'), pageWidth - margin, 10, { align: 'right' });

  const logoBase64 = await loadLogoAsBase64();

  // Add the actual logo image if available
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', margin, 2, 18, 8);
    } catch (e) {
      console.warn('Failed to add logo image to PDF', e);
    }
  } else {
    // Draw simple logo icon (triangle + GATE) to echo the provided image
    const lx = pageWidth - margin - 15;
    const ly = 7;
    doc.setDrawColor(0, 229, 255);
    doc.setLineWidth(0.3);
    doc.line(lx, ly - 2, lx - 3, ly + 2);
    doc.line(lx - 3, ly + 2, lx + 3, ly + 2);
    doc.line(lx + 3, ly + 2, lx, ly - 2);
    doc.setFillColor(0, 229, 255);
    doc.circle(lx, ly, 1, 'F');
    doc.setFontSize(3);
    doc.setTextColor(0, 229, 255);
    doc.text('GATE', lx - 1.5, ly + 3);
  }

  // TODO: Full logo image: doc.addImage(logoBase64, 'PNG', lx - 4, ly - 2, 8, 4);

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, 24);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${listing.title} (#${listing.id})`, margin, 30);

  y = 38;

  const addSection = (secTitle: string) => {
    y = checkPageBreak(doc, y, margin, pageHeight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(secTitle, margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
  };

  const addParagraph = (text: string) => {
    y = checkPageBreak(doc, y, margin, pageHeight);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 4.8 + 2;
  };

  if (isNda) {
    addSection('§ 1 Gegenstand der Geheimhaltung');
    addParagraph(`Die Parteien vereinbaren, dass alle im Rahmen der Due Diligence oder Verhandlungen über das Asset "${listing.title}" (#${listing.id}) ausgetauschten vertraulichen Informationen (insbesondere technische Details, Kundendaten, Umsatzzahlen, Quellcode, Zugangsdaten, in §1 des zugehörigen Kauf-/Mietvertrags genannte Kennzahlen und Deliverables) streng vertraulich zu behandeln sind. Dies gilt ausschließlich für die Prüfung dieses konkreten Angebots.`);

    addSection('§ 2 Verpflichtungen');
    addParagraph('Der Empfänger verpflichtet sich, die Informationen nur für die Prüfung des Assets zu verwenden, sie nicht an Dritte weiterzugeben und angemessene Sicherheitsmaßnahmen zu treffen. Die Pflicht gilt für 5 Jahre nach Beendigung der Verhandlungen. Die Geheimhaltung umfasst auch die asset-spezifischen Metriken und Übergabegegenstände dieses Angebots.');

    addSection('§ 3 Ausnahmen');
    addParagraph('Von der Geheimhaltung ausgenommen sind Informationen, die öffentlich bekannt sind, bereits vorher bekannt waren oder unabhängig entwickelt wurden.');

    addSection('§ 4 Rückgabe und Vernichtung');
    addParagraph('Auf Verlangen sind alle erhaltenen vertraulichen Unterlagen und Kopien unverzüglich zurückzugeben oder zu vernichten.');

    addSection('§ 5 Anwendbares Recht');
    addParagraph('Es gilt österreichisches Recht. Gerichtsstand ist Wien.');

  } else {
    // Übergabeprotokoll - asset specific
    addSection('§ 1 Gegenstand der Übergabe');
    addParagraph(`Mit diesem Protokoll wird die Übergabe des digitalen Assets "${listing.title}" (ID: #${listing.id}) vom Verkäufer/Vermieter an den Käufer/Mieter dokumentiert. Dieses Protokoll bezieht sich AUSSCHLIESSLICH auf das in den zugehörigen Verträgen/Angebotsblatt beschriebene konkrete Angebot.`);

    addSection('§ 2 Übergebene Gegenstände');
    addParagraph('Folgende Zugänge und Materialien wurden übergeben (bitte vom Empfänger abhaken und ergänzen). Die Liste umfasst die allgemeinen sowie die für dieses spezifische Angebot relevanten Bestandteile:');
    addParagraph('• Domain-Zugänge und DNS-Einstellungen');
    addParagraph('• Hosting- / Server-Zugänge (SSH, FTP, Control-Panel)');
    addParagraph('• Datenbank-Dumps und Dateien');
    addParagraph('• Quellcode (Git-Repository oder Zip)');
    addParagraph('• API-Schlüssel, Third-Party-Accounts');
    addParagraph('• E-Mail-Accounts und Weiterleitungen');
    addParagraph('• Nutzerdaten / Kundendaten (anonymisiert wo möglich, DSGVO-konform)');
    addParagraph('• Dokumentation und Admin-Zugänge');

    // Insert specific handover items for THIS offer only
    const specificItems = getSpecificHandoverItems(listing);
    if (specificItems.length > 0) {
      addParagraph(`Asset-spezifische Übergabegegenstände (nur für dieses Angebot #${listing.id}):`);
      specificItems.forEach((it) => addParagraph(`• ${it}`));
    }

    addParagraph('• Sonstiges: ________________________________');

    addSection('§ 3 Bestätigung');
    addParagraph('Der Empfänger bestätigt hiermit den Erhalt aller oben genannten Gegenstände in funktionsfähigem Zustand zum Zeitpunkt der Übergabe. Mit dieser Bestätigung wird die Abnahme des in §2 des zugehörigen Kauf-/Mietvertrags beschriebenen Assets dokumentiert.');

    addSection('§ 4 Änderung der Zugänge');
    addParagraph('Der Empfänger verpflichtet sich, alle Zugangsdaten unverzüglich nach Erhalt zu ändern und den Verkäufer/Vermieter über den Abschluss der Übergabe zu informieren.');

    addSection('§ 5 Haftung und Gewährleistung');
    addParagraph('Der Verkäufer/Vermieter gewährleistet, dass zum Zeitpunkt der Übergabe alle übergebenen Zugänge funktionsfähig und berechtigt sind. Nach erfolgreicher Übergabe und Bestätigung endet die Verantwortung des Verkäufers/Vermieters für den Betrieb des Assets.');

    y = checkPageBreak(doc, y, margin, pageHeight);
    y += 10;
    doc.text('Unterschriften', margin, y);
    y += 8;
    doc.text('____________________________________________          ____________________________________________', margin, y);
    y += 5;
    doc.text('Verkäufer / Vermieter                                              Käufer / Mieter', margin, y);
    y += 5;
    doc.text('Datum: ____________________                                     Datum: ____________________', margin, y);
  }

  // Footer
  drawFooter(doc, pageNum, 1, margin, pageWidth, pageHeight);

  const fileName = isNda ? `NDA-${listing.id}.pdf` : `Uebergabeprotokoll-${listing.id}.pdf`;
  doc.save(fileName);

  recordContract({
    listingId: listing.id,
    listingTitle: listing.title,
    type: isNda ? 'nda' : 'uebergabe',
    fileName,
  });
}

/** Vollständiges Paket für ein Produkt: Angebotsblatt + passender Vertrag + NDA + Übergabeprotokoll */
export async function generateFullDocumentPackage(listing: Listing) {
  // Angebotsblatt zuerst
  await generateAngebotsblatt(listing);

  // Dann der Hauptvertrag (Kauf oder Miet)
  const mainContractType: ContractType = listing.type === 'sell' ? 'kaufvertrag' : 'mietvertrag';
  await generateContractPDF(listing, mainContractType);

  // NDA (spezifisch)
  await generateNdaOrUebergabe(listing, 'nda');

  // Übergabeprotokoll (spezifisch)
  await generateNdaOrUebergabe(listing, 'uebergabe');
}

