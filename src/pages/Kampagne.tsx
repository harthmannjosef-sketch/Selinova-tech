import { Link } from 'react-router-dom';
import { useListings } from '../lib/api';

export default function Kampagne() {
  const { listings } = useListings();

  const campaignEnd = '01.09.2026';
  const discount = 0.75;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      {/* Campaign Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', letterSpacing: '2px' }}>
          EXKLUSIV BIS {campaignEnd} • SOLANGE VORRAT REICHT
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 12px', fontFamily: 'var(--fh)' }}>
          SOMMER AUFARBEITUNGS ANGEBOT
        </h1>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
          -75% AUF ALLE ANGEBOTE
        </div>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.95 }}>
          Aufarbeiten Sie Ihren Marktplatz mit unseren geprüften Webseiten, Apps und Plattformen.<br />
          Jetzt 75% sparen – nur für kurze Zeit!
        </p>
        <div style={{ marginTop: '24px', fontSize: '13px', opacity: 0.8 }}>
          17 geprüfte Angebote • Sofort verfügbar • Mit Vertrag & Support
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div style={{ textAlign: 'center', margin: '20px 0 40px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '6px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>
            KAMPAGNE LÄUFT • BIS 01.09.2026
          </div>
        </div>

        {/* All offers with banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => {
            const discounted = Math.round(listing.price * discount);
            const isRent = listing.type === 'rent';
            return (
              <div key={listing.id} className="nm-card" style={{ overflow: 'hidden' }}>
                {/* Per-card banner */}
                <div style={{
                  background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                  color: 'white',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  SOMMER AUFARBEITUNGS ANGEBOT -75%
                </div>

                <div className="nm-card-header" style={{ paddingTop: '12px' }}>
                  <div>
                    <div className="nm-card-source">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--a3)]" />
                      {listing.source} · ID #{listing.id}
                    </div>
                    <div className="nm-card-title">{listing.title}</div>
                    <div className="nm-card-badges">
                      <span className={`nm-badge ${isRent ? 'nm-badge-rent' : 'nm-badge-sell'}`}>
                        {isRent ? 'Miete' : 'Verkauf'}
                      </span>
                    </div>
                  </div>
                  <div className="nm-card-type-icon" style={{ 
                    background: isRent ? 'rgba(0,229,255,.12)' : 'rgba(16,185,129,.15)',
                    color: isRent ? 'var(--a1)' : 'var(--a3)'
                  }}>
                    {listing.icon}
                  </div>
                </div>

                {listing.images && listing.images.length > 0 && (
                  <div className="px-4 pt-2">
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title} 
                      className="w-full h-32 object-cover rounded-lg border border-[var(--border)]"
                    />
                  </div>
                )}

                <div className="nm-card-body">
                  <div className="nm-card-desc">{listing.shortDesc}</div>

                  {/* Campaign price highlight */}
                  <div style={{ margin: '12px 0', padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ fontSize: '12px', color: '#888', textDecoration: 'line-through' }}>
                      Statt {isRent ? `€${listing.price}/Monat` : `€${listing.price.toLocaleString('de-DE')}`}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#10b981' }}>
                      Nur €{discounted.toLocaleString('de-DE')}{isRent ? '/Monat' : ''}
                    </div>
                    <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>-75% RABATT</div>
                  </div>

                  <div className="nm-card-tech">
                    {listing.techStack.slice(0, 4).map((t, i) => (
                      <span key={i} className="nm-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="nm-card-footer">
                  <div>
                    <div style={{ fontSize: '10px', color: '#888' }}>KAMPAGNE</div>
                    <div style={{ color: '#10b981', fontWeight: 700 }}>bis 01.09.2026</div>
                  </div>
                  <div className="nm-card-actions">
                    <Link 
                      to={`/angebot/${listing.slug}`} 
                      className="nm-card-btn nm-card-btn-primary"
                      style={{ background: '#f59e0b', color: 'black' }}
                    >
                      Zum Angebot
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px', background: 'var(--bg3)', borderRadius: '12px' }}>
          <p style={{ fontSize: '14px', color: 'var(--t2)' }}>
            Die Kampagne läuft bis <strong>01.09.2026</strong> – solange der Vorrat reicht.<br />
            Alle Preise bereits mit -75% Rabatt. Keine weiteren Abzüge.
          </p>
          <Link to="/" className="nm-btn nm-btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>
            Zum vollen Marktplatz
          </Link>
        </div>
      </div>
    </div>
  );
}
