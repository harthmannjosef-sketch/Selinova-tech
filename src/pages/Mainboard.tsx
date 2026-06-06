import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ListingType, ListingSource } from '../types/listing';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useListings } from '../lib/api';

const ALL_TYPES: ListingType[] = ['sell', 'rent'];
const ALL_SOURCES: ListingSource[] = ['Flippa', 'Sedo', 'Empire Flippers', 'MicroAcquire', 'BizBuySell', 'FE International', 'Direct'];

export default function Mainboard() {
  const { listings } = useListings();

  const [query, setQuery] = useState('');
  const [activeTypes, setActiveTypes] = useState<ListingType[]>([]);
  const [activeSources, setActiveSources] = useState<ListingSource[]>([]);
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'revenue-desc' | 'newest'>('newest');

  const filtered = useMemo(() => {
    let result = [...listings];

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.shortDesc.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q) ||
        l.techStack.some(t => t.toLowerCase().includes(q)) ||
        l.category.toLowerCase().includes(q)
      );
    }

    // type filter
    if (activeTypes.length > 0) {
      result = result.filter(l => activeTypes.includes(l.type));
    }

    // source filter
    if (activeSources.length > 0) {
      result = result.filter(l => activeSources.includes(l.source));
    }

    // sort
    result.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'revenue-desc') {
        const ra = a.monthlyRevenue || a.mrr || 0;
        const rb = b.monthlyRevenue || b.mrr || 0;
        return rb - ra;
      }
      // newest -> just reverse id alpha or keep original
      return listings.indexOf(a) - listings.indexOf(b); // preserve seed order
    });

    return result;
  }, [query, activeTypes, activeSources, sort]);

  const toggleType = (t: ListingType) => {
    setActiveTypes(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const toggleSource = (s: ListingSource) => {
    setActiveSources(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setActiveTypes([]);
    setActiveSources([]);
    setSort('newest');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Navbar />

      {/* HERO */}
      <div className="nm-hero">
        <div className="nm-hero-tag">
          <span>⬡</span> 17 geprüfte Angebote · GDPR konform
        </div>
        <h1>
          Webseiten <span>kaufen &amp; mieten</span><br />auf einem Marktplatz
        </h1>
        <p>
          E-Commerce, SaaS, Blogs, Apps – direkt von geprüften Sellern. 
          Sofort verfügbar, mit Vertrag und Support.
        </p>

        {/* Campaign Promo Banner */}
        <Link to="/kampange" style={{ 
          display: 'inline-block', 
          marginTop: '12px', 
          background: 'linear-gradient(90deg, #f59e0b, #ef4444)', 
          color: 'white', 
          padding: '10px 24px', 
          borderRadius: '8px', 
          fontWeight: 700, 
          fontSize: '14px',
          textDecoration: 'none'
        }}>
          🔥 SOMMER AUFARBEITUNGS ANGEBOT – JETZT -75% AUF ALLE ANGEBOTE BIS 01.09.2026
        </Link>

        <div className="hero-stats" style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 40 }}>
          <div className="h-stat">
            <div className="h-stat-num" style={{ fontFamily: 'var(--fh)', fontSize: '2rem', fontWeight: 800, color: 'var(--a1)' }}>€4.2M</div>
            <div className="h-stat-lab" style={{ fontSize: '.72rem', color: 'var(--t2)', fontFamily: 'var(--fm)' }}>HANDELSVOLUMEN</div>
          </div>
          <div className="h-stat">
            <div className="h-stat-num" style={{ fontFamily: 'var(--fh)', fontSize: '2rem', fontWeight: 800, color: 'var(--a1)' }}>184</div>
            <div className="h-stat-lab" style={{ fontSize: '.72rem', color: 'var(--t2)', fontFamily: 'var(--fm)' }}>ERFOLGREICHE DEALS</div>
          </div>
          <div className="h-stat">
            <div className="h-stat-num" style={{ fontFamily: 'var(--fh)', fontSize: '2rem', fontWeight: 800, color: 'var(--a1)' }}>94%</div>
            <div className="h-stat-lab" style={{ fontSize: '.72rem', color: 'var(--t2)', fontFamily: 'var(--fm)' }}>KÄUFERZUFRIEDENHEIT</div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="nm-filter-bar">
        <div className="nm-search-wrap">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Suche Titel, Tech, ID oder Kategorie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {ALL_TYPES.map(t => (
          <button
            key={t}
            onClick={() => toggleType(t)}
            className={`nm-filter-chip ${activeTypes.includes(t) ? 'active' : ''}`}
          >
            {t === 'sell' ? 'Verkauf' : 'Miete'}
          </button>
        ))}

        <select 
          className="nm-sort-select" 
          value={sort} 
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="newest">Neueste zuerst</option>
          <option value="price-desc">Preis absteigend</option>
          <option value="price-asc">Preis aufsteigend</option>
          <option value="revenue-desc">Umsatz absteigend</option>
        </select>

        {(query || activeTypes.length > 0 || activeSources.length > 0) && (
          <button 
            onClick={clearFilters}
            className="nm-btn nm-btn-outline"
            style={{ marginLeft: 8, padding: '8px 14px', fontSize: '.75rem' }}
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* SOURCE FILTERS (horizontal scroll) */}
      <div className="nm-source-strip">
        {ALL_SOURCES.map(source => (
          <button
            key={source}
            onClick={() => toggleSource(source)}
            className={`nm-source-badge ${activeSources.includes(source) ? 'border-[var(--a1)] text-[var(--a1)]' : ''}`}
          >
            {source}
          </button>
        ))}
      </div>

      {/* RESULTS */}
      <div className="nm-section-head">
        <div>
          <span className="nm-section-title">{filtered.length} Angebote</span>
          <span className="ml-3 text-[var(--t3)] text-sm">geprüft &amp; bereit zum Transfer</span>
        </div>
        <div className="text-xs text-[var(--t3)] font-mono">SELINOVA-TECH · LIVE</div>
      </div>

      <div className="nm-listings">
        {filtered.length > 0 ? (
          filtered.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-[var(--t2)]">
            Keine Angebote gefunden. <button onClick={clearFilters} className="text-[var(--a1)] underline">Filter löschen</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
