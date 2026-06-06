import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../types/listing';
import ContactModal from './ContactModal';

interface ListingCardProps {
  listing: Listing;
}

const badgeClass: Record<string, string> = {
  hot: 'nm-badge-hot',
  new: 'nm-badge-new',
  verified: 'nm-badge-verified',
};

const typeBadge: Record<string, { label: string; cls: string }> = {
  sell: { label: 'Verkauf', cls: 'nm-badge-sell' },
  rent: { label: 'Miete', cls: 'nm-badge-rent' },
};

export default function ListingCard({ listing }: ListingCardProps) {
  const [showContact, setShowContact] = useState(false);
  const typeInfo = typeBadge[listing.type];
  const discountedPrice = Math.round(listing.price * 0.25);

  return (
    <div className="nm-card">
      {/* Campaign Banner - SOMMER AUFARBEITUNGS ANGEBOT -75% */}
      <div style={{
        background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '10px',
        fontWeight: 'bold',
        textAlign: 'center',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        letterSpacing: '0.5px'
      }}>
        SOMMER AUFARBEITUNGS ANGEBOT -75% bis 01.09.2026 • solange Vorrat reicht
      </div>
      <div className="nm-card-header">
        <div>
          <div className="nm-card-source">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--a3)]" />
            {listing.source} · ID #{listing.id}
          </div>
          <div className="nm-card-title">{listing.title}</div>
          <div className="nm-card-badges">
            <span className={`nm-badge ${typeInfo.cls}`}>
              {typeInfo.label}
            </span>
            {listing.badges?.map(b => (
              <span key={b} className={`nm-badge ${badgeClass[b]}`}>
                {b === 'hot' && '🔥 Hot'}
                {b === 'new' && '✨ Neu'}
                {b === 'verified' && '✓ Verifiziert'}
              </span>
            ))}
          </div>
        </div>
        <div 
          className="nm-card-type-icon" 
          style={{ 
            background: listing.type === 'sell' ? 'rgba(16,185,129,.15)' : 'rgba(0,229,255,.12)',
            color: listing.type === 'sell' ? 'var(--a3)' : 'var(--a1)'
          }}
        >
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

        <div className="nm-card-tech">
          {listing.techStack.slice(0, 4).map((t, i) => (
            <span key={i} className="nm-tech-tag">{t}</span>
          ))}
        </div>

        {listing.premiumDomain && (
          <div style={{
            marginTop: '6px',
            padding: '4px 8px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '6px',
            fontSize: '0.72rem',
            color: '#10b981',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🌐 PREMIUM DOMAIN INKLUSIVE: <strong>{listing.premiumDomain}</strong>
          </div>
        )}

        <div className="nm-card-meta">
          {listing.monthlyRevenue && (
            <div className="nm-meta-item">
              <div className="nm-meta-label">MONATSUMSATZ</div>
              <div className="nm-meta-value" style={{ color: 'var(--a3)' }}>
                €{listing.monthlyRevenue.toLocaleString('de-DE')}
              </div>
            </div>
          )}
          {listing.mrr && (
            <div className="nm-meta-item">
              <div className="nm-meta-label">MRR</div>
              <div className="nm-meta-value" style={{ color: 'var(--a1)' }}>
                €{listing.mrr.toLocaleString('de-DE')}
              </div>
            </div>
          )}
          {listing.traffic && (
            <div className="nm-meta-item">
              <div className="nm-meta-label">TRAFFIC/Mo</div>
              <div className="nm-meta-value">{listing.traffic.toLocaleString('de-DE')}</div>
            </div>
          )}
          {listing.users && (
            <div className="nm-meta-item">
              <div className="nm-meta-label">NUTZER</div>
              <div className="nm-meta-value">{listing.users.toLocaleString('de-DE')}</div>
            </div>
          )}
          {listing.ageYears && (
            <div className="nm-meta-item">
              <div className="nm-meta-label">ALTER</div>
              <div className="nm-meta-value">{listing.ageYears} Jahre</div>
            </div>
          )}
        </div>
      </div>

      <div className="nm-card-footer">
        <div>
          {/* Campaign pricing with -75% */}
          <div style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.75em' }}>
            {listing.type === 'rent' ? (
              <>€{listing.price}<span style={{ fontSize: '.65rem', fontWeight: 400 }}>/Mo</span></>
            ) : (
              <>€{listing.price.toLocaleString('de-DE')}</>
            )}
          </div>
          <div className="nm-price-main" style={{ color: '#10b981', fontSize: '1.1em' }}>
            {listing.type === 'rent' ? (
              <>€{discountedPrice}<span style={{ fontSize: '.75rem', fontWeight: 400 }}>/Mo</span></>
            ) : (
              <>€{discountedPrice.toLocaleString('de-DE')}</>
            )}
          </div>
          <div className="nm-price-sub" style={{ color: '#f59e0b', fontWeight: 'bold' }}>-75% SOMMER ANGEBOT</div>
          <div className="nm-price-sub">{listing.priceNote}</div>
        </div>

        <div className="nm-card-actions">
          <Link 
            to={`/angebot/${listing.slug}`} 
            className="nm-card-btn nm-card-btn-ghost"
          >
            Details
          </Link>
          <button 
            className="nm-card-btn nm-card-btn-primary"
            onClick={() => setShowContact(true)}
          >
            Kontakt
          </button>
        </div>

        <ContactModal 
          listing={listing} 
          isOpen={showContact} 
          onClose={() => setShowContact(false)} 
        />
      </div>
    </div>
  );
}
