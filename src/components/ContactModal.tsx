import { useState } from 'react';
import { X } from 'lucide-react';
import { Listing } from '../types/listing';
import { useListings } from '../lib/api';

interface ContactModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ listing, isOpen, onClose }: ContactModalProps) {
  const { createInquiry } = useListings();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    // Simulate network
    setTimeout(() => {
      createInquiry({
        listingId: listing.id,
        listingTitle: listing.title,
        type: listing.type === 'sell' ? 'buy' : 'rent',
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        phone: form.phone || undefined,
        message: form.message,
      });

      setLoading(false);
      setSubmitted(true);

      // Auto close after success
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', company: '', phone: '', message: '' });
        onClose();
      }, 1600);
    }, 420);
  };

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="nm-admin-card w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--t2)] hover:text-[var(--t1)]">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-2xl font-display mb-1">Anfrage stellen</h3>
            <p className="text-[var(--t2)] mb-6 text-sm">
              Für <span className="text-[var(--a1)] font-medium">#{listing.id}</span> — {listing.title}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--t3)] mb-1">VOLLSTÄNDIGER NAME *</label>
                  <input
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--a1)]"
                    placeholder="Max Mustermann"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--t3)] mb-1">E-MAIL *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--a1)]"
                    placeholder="max@unternehmen.de"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--t3)] mb-1">UNTERNEHMEN</label>
                  <input
                    value={form.company}
                    onChange={handleChange('company')}
                    className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--a1)]"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--t3)] mb-1">TELEFON</label>
                  <input
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--a1)]"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[var(--t3)] mb-1">NACHRICHT / ANGEBOT *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange('message')}
                  className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--a1)] resize-y"
                  placeholder="Ich bin sehr interessiert an diesem Asset. Können wir einen Termin für eine Due Diligence vereinbaren?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full nm-btn nm-btn-primary py-3 text-base disabled:opacity-60"
              >
                {loading ? 'Anfrage wird gesendet...' : `Anfrage für #${listing.id} abschicken`}
              </button>

              <p className="text-[10px] text-center text-[var(--t3)]">
                Diese Anfrage wird gespeichert und erscheint im Admin-Bereich unter Anfragen.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-display mb-2">Anfrage erfolgreich übermittelt!</h3>
            <p className="text-[var(--t2)]">Der Verkäufer / SELINOVA-TECH Team wird sich innerhalb von 24h bei dir melden.</p>
            <p className="text-xs mt-4 text-[var(--t3)]">Die Anfrage ist jetzt im Admin unter "Anfragen" sichtbar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
