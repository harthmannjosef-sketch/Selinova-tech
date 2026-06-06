import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield } from 'lucide-react';
import { useListings } from '../lib/api';
import Navbar from '../components/Navbar';
import ContactModal from '../components/ContactModal';
import { generateAngebotsblatt, generateContractPDF, generateFullDocumentPackage } from '../lib/generateContracts';

export default function ListingDetail() {
  const { listings } = useListings();
  const { slug } = useParams<{ slug: string }>();

  const listing = slug ? listings.find((l) => l.slug === slug) : undefined;

  if (!listing) {
    return (
      <div className="min-h-screen bg-[var(--bg)] p-10 text-center">
        <Navbar />
        <div className="mt-20">
          <h1 className="text-3xl font-display mb-4">Angebot nicht gefunden</h1>
          <Link to="/" className="nm-btn nm-btn-primary">Zurück zum Mainboard</Link>
        </div>
      </div>
    );
  }

  const [showContact, setShowContact] = useState(false);
  const isRent = listing.type === 'rent';

  // Map slug -> demo html path + short preview description (maintainable)
  const demoMap: Record<string, { path: string; desc: string }> = {
    'donero-punjab-doner': { path: '/demos/donero-preview.html', desc: 'Interaktiver Demo-Modus: Drehe den Wheel-Selector (PIZZA-WHEEL Konzept für Döner), baue deinen Döner zusammen, sieh dir den Cart und die Loyalty an. 100% funktional – echtes Kundenerlebnis.' },
    'premium-ecommerce-fashion': { path: '/demos/premium-ecommerce-fashion.html', desc: 'Voll funktionaler Fashion E-Commerce Shop: Filter, Produktdetails, Warenkorb, Checkout, Blog und Shop-Admin (für volle Souveränität des Käufers). Exakt 1:1 wie im Prototyp erwartet, erweitert um professionelle Features.' },
    'saas-projektmanagement': { path: '/demos/saas-projektmanagement.html', desc: 'Professionelles SaaS Dashboard: Projekte, Tasks, Team, Analytics. Voll interaktiv mit Drag & Drop, Echtzeit-Updates und Admin-Bereich. 1:1 wie im Prototyp, mit Full-Stack-Features.' },
    'authority-blog-finance': { path: '/demos/authority-blog-finance.html', desc: 'Voll funktionaler Authority Blog: Artikel-Grid, Kategorien, Newsletter, AdSense/Affiliate-Simulation, Admin für Content-Management. 1:1 zum Prototyp mit professionellen Finance-Features.' },
    'react-native-fitness-app': { path: '/demos/react-native-fitness-app.html', desc: 'Voll funktionale Cross-Platform Fitness App (React Native): Workouts, Progress-Tracking, Community-Challenges, In-App Purchases. 1:1 zum Prototyp mit 4.6★ Rating-Features.' },
    'woocommerce-elektronik': { path: '/demos/woocommerce-elektronik.html', desc: 'Voll funktionaler WooCommerce Elektronik-Store: 340+ SKUs, Dropshipping-Automatisierung, Google Shopping Sync, Admin für Bestellungen/Produkte. 1:1 zum Prototyp mit hoher Conversion.' },
    'b2b-leadgen-dach': { path: '/demos/b2b-leadgen-dach.html', desc: 'Voll funktionale B2B Lead-Gen Plattform: Lead-Suche, CRM-Sync, Newsletter (4.200 Abos), Admin. 1:1 zum Prototyp mit DACH-Fokus und Automatisierung.' },
    'news-portal-tech': { path: '/demos/news-portal-tech.html', desc: 'Voll funktionales Tech & Startup News Portal: Artikel-Grid, Kategorien, Search, Newsletter, Comments, Ad Placements, Admin für Publishing & Analytics. 1:1 zum Prototyp mit Community-Features.' },
    'elearning-platform': { path: '/demos/elearning-platform.html', desc: 'Voll funktionale E-Learning Plattform: Kurs-Katalog, Enrollment, Video-Lektionen, Quizzes, Zertifikate, Zahlung, Progress-Tracking, Admin für Kurs-Ersteller. 1:1 zum Prototyp mit Sovereignty-Features.' },
    'immobilien-portal': { path: '/demos/immobilien-portal.html', desc: 'Voll funktionales regionales Immobilienportal: Kartenintegration (Leaflet), Filter-Engine, Lead-Gen für Makler, Inserate-Management, Admin-Dashboard. 1:1 zum Prototyp (1.450 Inserate) mit professionellen Features und Sovereignty.' },
    'jobboard-it-tech': { path: '/demos/jobboard-it-tech.html', desc: 'Voll funktionales IT & Tech Job-Board: Stellenanzeigen, Kandidaten-Profilen, Employer-Branding Tools, Bewerbungs-Tracking, Admin. 1:1 zum Prototyp (280 Stellen, 1.900 Kandidaten) mit Sovereignty-Features.' },
    'food-blog-network': { path: '/demos/food-blog-network.html', desc: 'Voll funktionales Rezept und Food Blog Netzwerk: Rezepte-Grid, Kategorien, Search, Pinterest-Traffic, Mediavine, Admin für Content & Einnahmen. 1:1 zum Prototyp (65k Traffic, 3 Domains) mit Sovereignty-Features.' },
    'pwa-buchhaltung': { path: '/demos/pwa-buchhaltung.html', desc: 'Voll funktionales PWA Buchhaltungs-Tool: Transaktionen, Dashboard, DATEV/PDF-Export, Offline-Support, Admin. 1:1 zum Prototyp (GoBD-konform, 920 Nutzer) mit Sovereignty-Features.' },
    'reise-cityguides': { path: '/demos/reise-cityguides.html', desc: 'Voll funktionales Reise-Portal mit City Guides: Interaktive Karten, Booking-Integration, Guides für 40+ Städte, Admin. 1:1 zum Prototyp mit Sovereignty-Features.' },
    'fitness-health-app': { path: '/demos/fitness-health-app.html', desc: 'Voll funktionale Fitness und Gesundheits-App: Workouts, Ernährung, Community, Challenges. 1:1 zum Prototyp mit 8.4k MAU.' },
    'versicherungs-vergleich': { path: '/demos/versicherungs-vergleich.html', desc: 'Voll funktionales Vergleichsportal: Tabellen, Filter, Lead-Gen, Partner-APIs. 1:1 zum Prototyp (42k Traffic, CPA) mit Sovereignty.' },
    'crypto-nft-portal': { path: '/demos/crypto-nft-portal.html', desc: 'Voll funktionales Crypto und NFT Community Portal mit Gallery, Wallet-Connect, Token-Gated Content, Discord Integration und Admin. 1:1 zum Prototyp (18k Members, 22k Traffic) mit Sovereignty.' },
    'aether-music-studio': { path: '/demos/aether-music-studio.html', desc: 'High-class AETHER Music Studio: Vollständige Spotify/YouTube-Music ähnliche Plattform für einen Künstler. MP3-Upload, Player, Playlists, Studio-Management, Analytics – alles lokal gespeichert und 100% sovereign. Komplettes eigenes Erlebnis.' },
  };
  const demo = demoMap[listing.slug];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Navbar />

      <div className="nm-detail">
        <div className="nm-detail-header">
          <Link to="/" className="nm-btn nm-btn-outline flex items-center gap-2 !px-4 !py-2 text-sm">
            <ArrowLeft size={16} /> Zurück
          </Link>
          <div>
            <div className="text-xs font-mono text-[var(--t3)] tracking-[1px] mb-1">
              {listing.source} · #{listing.id}
            </div>
            <h1 className="nm-detail-title">
              {listing.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className={`nm-badge ${isRent ? 'nm-badge-rent' : 'nm-badge-sell'}`}>
            {isRent ? 'Miete' : 'Verkauf'}
          </span>
          {listing.badges?.map(b => (
            <span key={b} className={`nm-badge ${b === 'hot' ? 'nm-badge-hot' : b === 'new' ? 'nm-badge-new' : 'nm-badge-verified'}`}>
              {b}
            </span>
          ))}
          <span className="text-[var(--t2)] text-sm self-center ml-2">Kategorie: {listing.category}</span>
        </div>

        {/* Offer Images / Screenshots */}
        {listing.images && listing.images.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {listing.images.map((img, idx) => (
                <a key={idx} href={img} target="_blank" rel="noreferrer" className="block group">
                  <img 
                    src={img} 
                    alt={`${listing.title} Screenshot ${idx + 1}`} 
                    className="w-full aspect-video object-cover rounded-2xl border border-[var(--border)] group-hover:border-[var(--a1)] transition" 
                  />
                </a>
              ))}
            </div>
            <div className="text-[10px] text-[var(--t3)] mt-1.5">Echte Screenshots der Plattform (Desktop + Mobile)</div>
          </div>
        )}

        {/* Functional Live Preview - full functional HTML demo for the real product */}
        {demo && (
          <div className="mb-8 nm-admin-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-play text-[var(--a1)]"></i>
                <span className="font-semibold">Live Preview – Eigenes Erlebnis (funktionaler HTML-Modus)</span>
              </div>
              <a 
                href={demo.path}
                target="_blank" 
                className="text-xs flex items-center gap-1.5 px-3 py-1 bg-[var(--bg3)] hover:bg-zinc-800 rounded-lg border border-[var(--border)]"
              >
                Vollbild öffnen <i className="fa-solid fa-external-link-alt text-[10px]"></i>
              </a>
            </div>
            <p className="text-xs text-[var(--t2)] mb-3">
              {demo.desc}
            </p>
            
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-black">
              <iframe 
                src={demo.path} 
                className="w-full h-[420px] md:h-[520px]" 
                title={`${listing.title} Live Preview`}
                style={{ border: 'none' }}
              ></iframe>
            </div>
            <div className="text-[10px] text-center text-[var(--t3)] mt-1.5">Voll funktionaler HTML-Preview (kein Video – echtes Erlebnis). Kunden können die Website direkt ausprobieren.</div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="nm-admin-card">
              <h3 className="font-display text-xl mb-4">Beschreibung</h3>
              <p className="text-[var(--t2)] leading-relaxed text-[15px]">
                {listing.fullDesc || listing.shortDesc + ' Dieses Asset wurde von SELINOVA-TECH geprüft und erfüllt unsere Qualitätskriterien (Traffic-Historie, saubere Buchhaltung, technischer Zustand). Vollständige Due-Diligence Unterlagen sind nach Unterzeichnung der NDA verfügbar.'}
              </p>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <div className="text-xs uppercase tracking-widest text-[var(--t3)] mb-3 font-mono">Technologie-Stack</div>
                <div className="flex flex-wrap gap-2">
                  {listing.techStack.map((tech, idx) => (
                    <span key={idx} className="nm-tech-tag text-sm px-3 py-1">{tech}</span>
                  ))}
                </div>
              </div>

              {listing.premiumDomain && (
                <div className="mt-6 pt-6 border-t border-[var(--border)] bg-[rgba(16,185,129,0.05)] -mx-6 px-6 py-4 rounded-b-xl">
                  <div className="flex items-center gap-2 text-[#10b981] font-semibold mb-1">
                    <span>🌐</span> 
                    <span>PREMIUM DOMAIN INKLUSIVE</span>
                  </div>
                  <div className="font-mono text-lg font-bold text-[var(--t1)]">{listing.premiumDomain}</div>
                  <div className="text-xs text-[var(--t2)] mt-1">Wird mit vollständigem Domain-Transfer (Auth-Code + Inhaberdaten-Änderung) im Kaufvertrag / Übergabeprotokoll übergeben. Perfekt 1:1 passend zu diesem Angebot.</div>
                  {listing.domainIncludedNote && <div className="text-[10px] text-[#10b981] mt-1">{listing.domainIncludedNote}</div>}
                </div>
              )}
            </div>

            <div className="nm-admin-card">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-[var(--a3)]" />
                <h3 className="font-display text-xl">SELINOVA-TECH Käuferschutz</h3>
              </div>
              <ul className="space-y-2 text-sm text-[var(--t2)]">
                <li>✓ 14 Tage Prüfphase nach Vertragsschluss</li>
                <li>✓ Escrow für sichere Abwicklung (bei Verkäufen)</li>
                <li>✓ Vollständige Übergabe: Zugänge, {listing.premiumDomain ? `Domain (${listing.premiumDomain})` : 'Domains'}, Source, Verträge</li>
                <li>✓ 30 Tage Post-Sale Support durch Verkäufer</li>
              </ul>
            </div>

            <div className="nm-admin-card text-sm">
              <div className="flex items-center gap-2 mb-3 text-[var(--t3)]">
                <FileText size={18} />
                <span>Vertragsdokumente</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={async () => await generateFullDocumentPackage(listing)}
                  className="nm-btn nm-btn-primary text-xs py-1.5"
                  title="Generiert sofort das komplette Paket: Angebotsblatt + Kauf-/Mietvertrag + NDA + Übergabeprotokoll (alle produktspezifisch)"
                >
                  Vollständiges Dokumenten-Paket (PDFs)
                </button>
                <button 
                  onClick={async () => await generateAngebotsblatt(listing)}
                  className="nm-btn nm-btn-outline text-xs py-1.5"
                >
                  Nur Angebotsblatt
                </button>
                <button 
                  onClick={async () => await generateContractPDF(listing, listing.type === 'sell' ? 'kaufvertrag' : 'mietvertrag')}
                  className="nm-btn nm-btn-outline text-xs py-1.5"
                >
                  {listing.type === 'sell' ? 'Kaufvertrag' : 'Mietvertrag'}
                </button>
                <button 
                  onClick={async () => await generateContractPDF(listing, 'nda')}
                  className="nm-btn nm-btn-outline text-xs py-1.5"
                >
                  NDA
                </button>
                <button 
                  onClick={async () => await generateContractPDF(listing, 'uebergabe')}
                  className="nm-btn nm-btn-outline text-xs py-1.5"
                >
                  Übergabe
                </button>
              </div>
              <p className="mt-4 text-[10px] text-[var(--t3)]">Alle Dokumente sind nach Kontaktaufnahme und Identitätsprüfung verfügbar.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="nm-admin-card">
              <div className="text-xs text-[var(--t3)] mb-1 font-mono">PREIS</div>
              <div className="text-4xl font-display font-bold mb-1" style={{ color: isRent ? 'var(--a1)' : 'var(--a3)' }}>
                €{listing.price.toLocaleString('de-DE')}
                {isRent && <span className="text-base font-normal">/Monat</span>}
              </div>
              <div className="text-[var(--t2)] text-sm mb-6">{listing.priceNote}</div>

              <button 
                onClick={() => setShowContact(true)}
                className="w-full nm-btn nm-btn-primary justify-center py-3 text-base"
              >
                Jetzt {isRent ? 'mieten' : 'kaufen'} anfragen
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:support@selinova-tech.at?subject=' + encodeURIComponent('Anfrage zu #' + listing.id)}
                className="w-full mt-2 nm-btn nm-btn-outline justify-center"
              >
                Per E-Mail kontaktieren
              </button>

              <ContactModal 
                listing={listing} 
                isOpen={showContact} 
                onClose={() => setShowContact(false)} 
              />
            </div>

            <div className="nm-admin-card text-sm">
              <div className="text-xs uppercase tracking-widest text-[var(--t3)] mb-3">Kennzahlen</div>
              <div className="space-y-3">
                {listing.monthlyRevenue && <div className="flex justify-between"><span className="text-[var(--t2)]">Monatsumsatz</span><span className="font-semibold text-[var(--a3)]">€{listing.monthlyRevenue.toLocaleString('de-DE')}</span></div>}
                {listing.mrr && <div className="flex justify-between"><span className="text-[var(--t2)]">MRR</span><span className="font-semibold text-[var(--a1)]">€{listing.mrr.toLocaleString('de-DE')}</span></div>}
                {listing.traffic && <div className="flex justify-between"><span className="text-[var(--t2)]">Traffic / Monat</span><span className="font-semibold">{listing.traffic.toLocaleString('de-DE')}</span></div>}
                {listing.users && <div className="flex justify-between"><span className="text-[var(--t2)]">Aktive Nutzer</span><span className="font-semibold">{listing.users.toLocaleString('de-DE')}</span></div>}
                {listing.ageYears && <div className="flex justify-between"><span className="text-[var(--t2)]">Alter</span><span className="font-semibold">{listing.ageYears} Jahre</span></div>}
              </div>
            </div>

            <div className="text-[10px] text-center text-[var(--t3)] pt-2">
              Alle Angaben ohne Gewähr. Stand: Juni 2026. <br />
              SELINOVA-TECH Medien Architektur E.U · Wien
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <Link to="/" className="text-[var(--t2)] hover:text-[var(--a1)] text-sm">← Alle Angebote ansehen</Link>
        </div>
      </div>
    </div>
  );
}
