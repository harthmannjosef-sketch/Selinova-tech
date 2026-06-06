import { Listing } from '../types/listing';

export const listings: Listing[] = [
  {
    id: 'A1042',
    slug: 'premium-ecommerce-fashion',
    title: 'Premium E-Commerce Shop – Fashion Nische',
    shortDesc: 'Etablierter Online-Shop mit 3 Jahren Traffic-History, 12.000 monatliche Besucher, SEO-optimiert, fertige Lieferkette inklusive.',
    fullDesc: 'Hochwertiger Fashion E-Commerce Shop auf React/Next.js Basis mit integriertem Shopify-Checkout. Vollständig funktional mit Produktkatalog, Filtern, Warenkorb, Checkout und Admin-Bereich für den Shop-Besitzer. Inklusive Lieferketten-Integration, SEO-Optimierung (Score 94) und Social-Media-Kanälen. Sofort übernehmbar und skalierbar.',
    type: 'sell',
    price: 12500,
    priceNote: 'Einmalzahlung · Verhandlungsbasis',
    monthlyRevenue: 3200,
    traffic: 12400,
    ageYears: 3,
    techStack: ['React', 'Next.js', 'Shopify', 'SEO:94'],
    source: 'Flippa',
    badges: ['hot', 'verified'],
    icon: '🛒',
    category: 'E-Commerce',
    images: [
      '/images/offers/ecommerce-desktop.jpg',
      '/images/offers/ecommerce-mobile.jpg'
    ],
    premiumDomain: 'shop-fashion.co.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'B2089',
    slug: 'saas-projektmanagement',
    title: 'SaaS Dashboard – Projektmanagement Tool',
    shortDesc: 'Vollständiges SaaS-Dashboard mit 450 aktiven Nutzern, monatlich wiederkehrende Einnahmen, Vue.js Frontend, Laravel Backend.',
    fullDesc: 'Professionelles Projektmanagement SaaS mit Echtzeit-Kollaboration, Aufgabenverwaltung, Team-Dashboards, Analytics und PWA-Support. Voll funktional mit Projekten, Tasks, Team und Analytics. Bereit für sofortige Nutzung und Skalierung.',
    type: 'rent',
    price: 450,
    priceNote: '12 Mon. Mindestlaufzeit',
    mrr: 1800,
    users: 450,
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'PWA'],
    source: 'Sedo',
    badges: ['new'],
    icon: '📊',
    category: 'SaaS',
    images: [
      '/images/offers/ecommerce-desktop.jpg',
      '/images/offers/ecommerce-mobile.jpg'
    ],
    premiumDomain: 'projektmanagement-saas.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'C3401',
    slug: 'authority-blog-finance',
    title: 'Authority Blog – Finanznische – 80K Traffic',
    shortDesc: 'Authority Blog mit 80.000 monatlichen organischen Besuchern, 45 DR, AdSense + Affiliate-Einnahmen, vollständig Content-optimiert.',
    fullDesc: 'Professioneller Authority Blog im Finanzbereich auf WordPress/Elementor mit 80k Traffic, DR 45, laufenden AdSense- und Affiliate-Einnahmen. Voll funktional mit Artikeln, Kategorien, Newsletter, Admin-Bereich für Content-Management. 5 Jahre History, SEO-optimiert (Score 91).',
    type: 'sell',
    price: 48700, // +2.500 für inkl. Premium Domain versicherungs-vergleich.co.at
    priceNote: '3× Jahresumsatz · Bewertungsbasis',
    monthlyRevenue: 2100,
    traffic: 80000,
    ageYears: 5,
    techStack: ['WordPress', 'Elementor', 'AdSense', 'DR:45'],
    source: 'Empire Flippers',
    badges: ['hot'],
    icon: '📝',
    category: 'Blog',
    images: [
      '/images/offers/blog-desktop.jpg',
      '/images/offers/blog-mobile.jpg'
    ]
  },
  {
    id: 'D0912',
    slug: 'react-native-fitness-app',
    title: 'React Native App – Fitness & Tracking',
    shortDesc: 'iOS & Android App mit 5.200 aktiven Nutzern, In-App-Käufe integriert, 4.6★ Rating im App Store, vollständiger Source-Code inklusive.',
    fullDesc: 'Voll funktionale Cross-Platform Fitness App (React Native) mit Workouts, Progress-Tracking, Community-Challenges, Push-Notifications und Monetarisierung (In-App Purchases). 5.2k MAU, 4.6★ Rating. Inklusive Source, Firebase Backend, RevenueCat. Bereit für sofortige Weiterentwicklung und Skalierung.',
    type: 'sell',
    price: 96000,
    priceNote: '20× MRR · Verhandlungsbasis',
    monthlyRevenue: 4800,
    users: 5200,
    techStack: ['React Native', 'Firebase', 'Stripe', 'iOS/Android'],
    source: 'MicroAcquire',
    badges: ['new', 'verified'],
    icon: '📱',
    category: 'App',
    images: [
      '/images/offers/fitness-mobile.jpg'
    ]
  },
  {
    id: 'E2201',
    slug: 'woocommerce-elektronik',
    title: 'WooCommerce Store – Elektronik & Gadgets',
    shortDesc: 'Vollständig betriebsbereiter WooCommerce Store, Dropshipping-Setup, 340 SKUs, Google Shopping integriert, automatisierte Prozesse.',
    fullDesc: 'Voll funktionaler WooCommerce Elektronik-Shop mit 340+ Produkten, Dropshipping-Integration (automatisierte Bestellungen), Google Merchant Center Sync, Google Ads, Yoast SEO. Kunden-Frontend + Admin (für Sovereignty). 18k Traffic, 3.2% Conversion.',
    type: 'rent',
    price: 380,
    priceNote: '6 Mon. Mindestlaufzeit',
    monthlyRevenue: 2800,
    traffic: 18000,
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Google Ads'],
    source: 'BizBuySell',
    icon: '⚡',
    category: 'E-Commerce',
    images: [
      '/images/offers/ecommerce-desktop.jpg',
      '/images/offers/ecommerce-mobile.jpg'
    ]
  },
  {
    id: 'F0077',
    slug: 'b2b-leadgen-dach',
    title: 'B2B Lead-Gen Plattform – DACH Region',
    shortDesc: 'Spezialisierte B2B-Plattform für DACH-Unternehmen, 1.200 registrierte Firmen, CRM-Integration, automatisierter Newsletter (4.200 Abonnenten).',
    fullDesc: 'Voll funktionale B2B Lead-Gen Plattform mit Lead-Suche, CRM-Sync (HubSpot), automatisierter Newsletter-Kampagnen und Admin-Dashboard. 1.200 Firmen, 4.200 Abos. 1:1 zum Prototyp mit DACH-Fokus und voller Sovereignty (Admin-Bereich für den Käufer).',
    type: 'sell',
    price: 192000,
    priceNote: '2,5× Jahresumsatz',
    monthlyRevenue: 6400,
    users: 1200,
    ageYears: 4,
    techStack: ['Angular', 'Node.js', 'PostgreSQL', 'HubSpot'],
    source: 'FE International',
    badges: ['verified'],
    icon: '🎯',
    category: 'B2B',
    images: [
      '/images/offers/ecommerce-desktop.jpg'
    ]
  },
  {
    id: 'G1155',
    slug: 'news-portal-tech',
    title: 'News Portal – Tech und Startup',
    shortDesc: 'Tech-News und Startup-Portal mit starker Community, 28k monatliche Unique Visitors, Newsletter mit 9.400 Abos.',
    fullDesc: 'Voll funktionales Tech & Startup News Portal mit Artikeln, Kategorien (Tech, Startup, AI, Funding), Search, Newsletter, Comments, Ad Placements und vollem Admin für Publishing & Analytics. 1:1 zum Prototyp + erweitert mit Community Features und Sovereignty (Admin Dashboard).',
    type: 'sell',
    price: 28000,
    priceNote: '1,8× Jahresumsatz',
    monthlyRevenue: 1300,
    traffic: 28000,
    ageYears: 2,
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Mailchimp'],
    source: 'Direct',
    icon: '📰',
    category: 'Media',
    images: [
      '/images/offers/news-desktop.jpg'
    ]
  },
  {
    id: 'H3302',
    slug: 'elearning-platform',
    title: 'E-Learning Plattform Online-Kurse',
    shortDesc: 'Professionelle Kursplattform mit 62 Kursen, 3.800 aktiven Lernenden, integriertes Zahlungssystem und Zertifikate.',
    fullDesc: 'Voll funktionale E-Learning Plattform mit Kurs-Katalog, Enrollment, Video-Lektionen, Quizzes, Zertifikaten, Zahlung (Stripe), Progress-Tracking und Admin für Kurs-Ersteller/Owner. 1:1 zum Prototyp + erweitert mit Community und Sovereignty Features.',
    type: 'rent',
    price: 620,
    priceNote: '12 Mon. Mindestlaufzeit',
    mrr: 3100,
    users: 3800,
    techStack: ['Next.js', 'Stripe', 'Supabase', 'Video.js'],
    source: 'Sedo',
    badges: ['verified'],
    icon: '🎓',
    category: 'Education',
    images: [
      '/images/offers/ecommerce-desktop.jpg',
      '/images/offers/ecommerce-mobile.jpg'
    ],
    premiumDomain: 'elearning-plattform.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'I4410',
    slug: 'immobilien-portal',
    title: 'Immobilien-Portal Regional',
    shortDesc: 'Regionales Immobilienportal mit 1.450 Inseraten, Lead-Gen für Makler, Kartenintegration und Filter-Engine.',
    fullDesc: 'Voll funktionales regionales Immobilienportal mit Kartenintegration (Leaflet/OpenStreetMap), Filter-Engine (Preis, Typ, Ort), Lead-Gen für Makler, Inserate-Management und Admin-Dashboard. 1:1 zum Prototyp (1.450 Inserate, 42k Traffic) + erweitert mit Sovereignty (Admin für den Käufer) und professionellen Features.',
    type: 'sell',
    price: 69500, // +2.500 für inkl. Premium Domain immobilien-portal.co.at
    priceNote: 'Bewertet nach Inseratsvolumen',
    monthlyRevenue: 4100,
    traffic: 42000,
    ageYears: 3,
    techStack: ['React', 'Mapbox', 'Node.js', 'MongoDB'],
    source: 'Empire Flippers',
    icon: '🏠',
    category: 'Real Estate',
    images: [
      '/images/offers/immobilien-desktop.jpg'
    ],
    premiumDomain: 'immobilien-portal.co.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'J5521',
    slug: 'jobboard-it-tech',
    title: 'Job-Board IT und Tech',
    shortDesc: 'Spezialisiertes Jobboard für IT & Tech mit 280 offenen Stellen, 1.900 registrierten Kandidaten und Employer-Branding Tools.',
    fullDesc: 'Voll funktionales IT & Tech Job-Board mit Stellenanzeigen, Kandidaten-Profilen, Employer-Branding Tools, Bewerbungs-Tracking und Admin. 1:1 zum Prototyp (280 Stellen, 1.900 Kandidaten) + erweitert mit Sovereignty (Admin für den Käufer) und professionellen Matching-Features.',
    type: 'rent',
    price: 280, // jobboard.co.at als starker Domain-Boost (Mietmodell bleibt attraktiv)
    priceNote: 'Monatlich kündbar',
    mrr: 920,
    users: 1900,
    techStack: ['Remix', 'Prisma', 'PostgreSQL', 'Resend'],
    source: 'Direct',
    icon: '💼',
    category: 'Jobs',
    images: [
      '/images/offers/ecommerce-desktop.jpg',
      '/images/offers/news-desktop.jpg'
    ],
    premiumDomain: 'jobboard.co.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'K6634',
    slug: 'food-blog-network',
    title: 'Rezept und Food Blog Netzwerk',
    shortDesc: 'Food & Rezept Netzwerk mit 14 thematischen Blogs, starke Affiliate-Partnerschaften und 65k monatliche Besucher.',
    fullDesc: 'Voll funktionales Rezept und Food Blog Netzwerk mit 3 Domains, 14 thematischen Blogs, WPRecipeMaker, Pinterest-Traffic, Mediavine Publisher, Affiliate-Integration und Admin für Content & Einnahmen. 1:1 zum Prototyp (65k Traffic, 4 Jahre) + erweitert mit Sovereignty (Admin für den Käufer) und professionellen Features.',
    type: 'sell',
    price: 19500,
    priceNote: 'Inkl. Social Media Accounts',
    monthlyRevenue: 980,
    traffic: 65000,
    ageYears: 4,
    techStack: ['WordPress', 'Astra', 'AffiliateWP'],
    source: 'Flippa',
    icon: '🍳',
    category: 'Blog',
    images: [
      '/images/offers/foodblog-desktop.jpg',
      '/images/offers/ecommerce-desktop.jpg'
    ]
  },
  {
    id: 'L7745',
    slug: 'pwa-buchhaltung',
    title: 'PWA Buchhaltungs-Tool Freelancer',
    shortDesc: 'Leichtes Buchhaltungstool als PWA für Freelancer & Solopreneure. GoBD-konform, DATEV-Export, 920 aktive Nutzer.',
    fullDesc: 'Voll funktionales PWA Buchhaltungs-Tool mit Transaktionen, Export (DATEV/PDF), Dashboard, Offline-Support und Admin. 1:1 zum Prototyp (920 Nutzer, GoBD-konform) + erweitert mit Sovereignty (Admin für den Käufer) und professionellen Freelancer-Features.',
    type: 'rent',
    price: 350,
    priceNote: 'Monatlich, keine Mindestlaufzeit',
    mrr: 1240,
    users: 920,
    techStack: ['SvelteKit', 'PWA', 'IndexedDB', 'PDF.js'],
    source: 'MicroAcquire',
    badges: ['new'],
    icon: '📒',
    category: 'SaaS',
    images: [
      '/images/offers/ecommerce-desktop.jpg',
      '/images/offers/ecommerce-mobile.jpg'
    ]
  },
  {
    id: 'M8856',
    slug: 'reise-cityguides',
    title: 'Reise-Portal Cityguides Europa',
    shortDesc: 'Curated City Guides für 28 europäische Städte, 38k MAU, Partnerschaften mit Hotels & Tour-Anbietern.',
    fullDesc: 'Voll funktionales Reise-Portal mit City Guides für 40+ Städte, interaktive Karten (Leaflet), Booking Integration, Guides Management und Admin. 1:1 zum Prototyp (55k Traffic, Booking.com Partnerschaft) + erweitert mit Sovereignty.',
    type: 'sell',
    price: 38000,
    priceNote: 'Inkl. Marke & Socials',
    monthlyRevenue: 1950,
    traffic: 38000,
    ageYears: 3,
    techStack: ['Astro', 'Tailwind', 'Contentful'],
    source: 'Direct',
    icon: '✈️',
    category: 'Travel',
    images: [
      '/images/offers/reise-desktop.jpg',
      '/images/offers/reise-mobile.jpg',
      '/images/offers/reise-map.jpg',
      '/images/offers/reise-booking.jpg'
    ],
    premiumDomain: 'cityguides.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'N9967',
    slug: 'fitness-health-app',
    title: 'Fitness und Gesundheits-App',
    shortDesc: 'Native + Web App für Workouts & Ernährung, 8.4k MAU, integrierte Community und Challenges.',
    fullDesc: 'Voll funktionale Fitness & Health App (Native + Web) mit Workouts, Ernährung, Community, Challenges. 1:1 zum Prototyp + erweitert mit Sovereignty.',
    type: 'rent',
    price: 490,
    priceNote: '12 Monate',
    mrr: 2450,
    users: 8400,
    techStack: ['Flutter', 'Supabase', 'RevenueCat'],
    source: 'BizBuySell',
    icon: '🏋️',
    category: 'Health',
    images: [
      '/images/offers/fitness-desktop.jpg',
      '/images/offers/fitness-nutrition.jpg',
      '/images/offers/fitness-community.jpg',
      '/images/offers/fitness2-mobile.jpg'
    ],
    premiumDomain: 'fitnessapp.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'O1078',
    slug: 'versicherungs-vergleich',
    title: 'Vergleichsportal Versicherungen',
    shortDesc: 'Vergleichsportal für Kfz-, Haftpflicht- und Hausratversicherungen mit 42.000 monatlichen Besuchern und CPA-Provisionen.',
    fullDesc: 'Voll funktionales Vergleichsportal mit Tabellen, Filtern, Lead-Generierung und Partner-APIs. 1:1 zum Prototyp (42k Traffic, CPA) + erweitert mit Sovereignty (Admin).',
    type: 'sell',
    price: 145000,
    priceNote: 'Sehr starke Lead-Qualität',
    monthlyRevenue: 9200,
    traffic: 42000,
    ageYears: 6,
    techStack: ['Next.js', 'tRPC', 'PostgreSQL', 'Partner-APIs'],
    source: 'Empire Flippers',
    badges: ['hot', 'verified'],
    icon: '🛡️',
    category: 'Finance',
    images: [
      '/images/offers/versicherung-desktop.jpg',
      '/images/offers/versicherung-kfz.jpg',
      '/images/offers/versicherung-lead.jpg',
      '/images/offers/versicherung-admin.jpg'
    ],
    premiumDomain: 'versicherungs-vergleich.co.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'P2189',
    slug: 'crypto-nft-portal',
    title: 'Crypto und NFT Community Portal',
    shortDesc: 'Crypto und NFT Community mit 18.000 Mitgliedern, NFT-Galerie, Wallet-Connect Integration und Token-Gated Content.',
    fullDesc: 'Voll funktionales Crypto und NFT Community Portal mit Gallery, Wallet-Connect, Token-Gated Content, Discord Integration und Admin. 1:1 zum Prototyp (18k Members, 22k Traffic) + erweitert mit Sovereignty.',
    type: 'sell',
    price: 55000,
    priceNote: 'Inkl. Discord + 18k Community',
    monthlyRevenue: 3100,
    traffic: 22000,
    ageYears: 3,
    techStack: ['Next.js', 'Ethers.js', 'Supabase', 'Discord Bot'],
    source: 'Direct',
    icon: '💎',
    category: 'Crypto',
    images: [
      '/images/offers/crypto-desktop.jpg',
      '/images/offers/crypto-gallery.jpg',
      '/images/offers/crypto-wallet.jpg'
    ],
    premiumDomain: 'cryptoportal.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },
  {
    id: 'Q4401',
    slug: 'donero-punjab-doner',
    title: 'DÖNERO – Punjab Döner App mit Wheel Selector',
    shortDesc: 'Moderne Bestellplattform für die Punjab Döner Kette mit interaktivem Wheel-Selector für individuelle Döner-Zusammenstellungen, Loyalty-Programm und Multi-Channel Support (Web + App). 28 Filialen, starke Conversion.',
    fullDesc: 'DÖNERO ist die dedizierte Ordering & Loyalty Plattform für die Punjab Döner Kette – die Döner-Variante des beliebten PIZZA-WHEEL Konzepts. Kunden nutzen den einzigartigen interaktiven Wheel-Selector, um ihren perfekten Döner mit frischen Zutaten, Soßen und Extras zusammenzustellen. Inklusive Echtzeit-Preiskalkulation, Loyalty-Programm mit Punkten und exklusiven Deals, Filial-Finder und nahtloser Bezahlung. Die Plattform ist als PWA und native App verfügbar und bereits in allen 28 Punjab Filialen integriert. Hohe Wiederholrate und Umsatzsteigerung durch personalisierte Empfehlungen und schnelle Bestellabwicklung.',
    type: 'sell',
    price: 29500,
    priceNote: 'Inkl. App, Backend, 28 Filialen Integration & Marke',
    monthlyRevenue: 2150,
    users: 12500,
    traffic: 42000,
    ageYears: 1.5,
    techStack: ['React', 'React Native', 'Node.js', 'Firebase', 'Stripe', 'Tailwind'],
    source: 'Direct',
    badges: ['new', 'verified'],
    icon: '🌯',
    category: 'Food & Delivery',
    images: [
      '/images/offers/donero-desktop.jpg',
      '/images/offers/donero-mobile.jpg',
      '/images/offers/donero-order.jpg',
      '/images/offers/donero-rewards.jpg'
    ],
    premiumDomain: 'doner-app.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },

  // New asset from acquired domains - Pizza-Wheel variant (sibling to DÖNERO / original PIZZA-WHEEL concept)
  {
    id: 'R5522',
    slug: 'pizza-wheel-app',
    title: 'PIZZA-WHEEL App – Interaktive Bestellplattform',
    shortDesc: 'Moderne Pizza-Bestellplattform mit interaktivem Wheel-Selector für individuelle Pizzazusammenstellungen, Loyalty-Programm und Multi-Channel Support. Perfekte Ergänzung zum DÖNERO-Konzept.',
    fullDesc: 'PIZZA-WHEEL ist die dedizierte Ordering & Loyalty Plattform mit dem einzigartigen interaktiven Wheel-Selector für perfekte Pizza-Kreationen (Teig, Beläge, Soßen, Extras + Echtzeit-Preiskalkulation). Inklusive Loyalty-Programm, Filial-Integration, PWA + App, Firebase und Stripe. Hohe Conversion und Wiederholrate.',
    type: 'sell',
    price: 24500,
    priceNote: 'Inkl. App, Backend & Marke',
    monthlyRevenue: 1850,
    users: 9800,
    traffic: 35000,
    ageYears: 1,
    techStack: ['React', 'React Native', 'Node.js', 'Firebase', 'Stripe', 'Tailwind'],
    source: 'Direct',
    badges: ['new'],
    icon: '🍕',
    category: 'Food & Delivery',
    images: [
      '/images/offers/donero-desktop.jpg',
      '/images/offers/donero-mobile.jpg'
    ],
    premiumDomain: 'pizza-app.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer'
  },

  // Strategic marketplace domain asset
  {
    id: 'S9999',
    slug: 'digital-asset-marketplace',
    title: 'Digital Asset Marketplace Plattform',
    shortDesc: 'Fertige Marktplatz-Plattform für digitale Assets (Websites, Apps, SaaS, Domains). Inkl. Admin, Vertrag-Generator, Kampagnen-System und Lead-Management.',
    fullDesc: 'Voll funktionale Marktplatz-Lösung wie SELINOVA-TECH: React + TypeScript, Listings-CRUD, Admin mit Rollen, dynamische PDF-Verträge (Kauf/Miete/Angebot), Sovereign Demos, Kampagne-75%, Lead-Formulare und Persistence. Mit der Premium Domain assetmarkt.at sofort als eigenständiges Business nutzbar oder als White-Label.',
    type: 'sell',
    price: 18500,
    priceNote: 'Inkl. Codebase + assetmarkt.at Domain',
    monthlyRevenue: 950,
    traffic: 8500,
    ageYears: 0.5,
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'jsPDF', 'localStorage'],
    source: 'Direct',
    badges: ['new', 'verified'],
    icon: '🛒',
    category: 'Marketplace',
    images: [
      '/images/offers/ecommerce-desktop.jpg'
    ],
    premiumDomain: 'assetmarkt.at',
    domainIncludedNote: 'Inkl. Premium Domain-Transfer + kompletter Source'
  },

  // New high-class Music Studio asset (full sovereign standalone app)
  {
    id: 'T1122',
    slug: 'aether-music-studio',
    title: 'AETHER Music Studio – Premium Artist Platform',
    shortDesc: 'High-class standalone Music Studio Web App. Upload full MP3 tracks, represent one artist 100% sovereign. Spotify + YouTube Music style with complete studio functions. All data stored locally.',
    fullDesc: 'Vollständige Premium Music Studio Plattform für einen Künstler. Features: MP3 Upload mit Cover, Full Audio Player (Progress, Queue, Volume), Playlists, Library, Studio Management (Edit/Delete), Live Analytics (Plays, Stats), Artist Profile. Komplett client-side mit lokalem Storage (localStorage + IndexedDB-fähig). Perfekt als fertiges Produkt für unabhängige Künstler. Demo-Daten inklusive.',
    type: 'sell',
    price: 8900,
    priceNote: 'Inkl. vollständiges Standalone HTML + Source',
    monthlyRevenue: 420,
    traffic: 12500,
    ageYears: 0.2,
    techStack: ['HTML5', 'Tailwind', 'Vanilla JS', 'Web Audio', 'localStorage'],
    source: 'Direct',
    badges: ['new'],
    icon: '🎵',
    category: 'Music & Media',
    images: [
      '/images/offers/ecommerce-desktop.jpg'
    ],
    premiumDomain: 'aether-music.studio',
    domainIncludedNote: 'Inkl. komplette App (lokal speichernd)'
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find(l => l.slug === slug);
}

export function getListingById(id: string): Listing | undefined {
  return listings.find(l => l.id === id);
}
