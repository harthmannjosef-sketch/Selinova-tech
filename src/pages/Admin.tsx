import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Listing } from '../types/listing';

import Navbar from '../components/Navbar';
import { useListings } from '../lib/api';
import { Users, TrendingUp, FileText, Plus, Edit2, Trash2, Download } from 'lucide-react';

type Tab = 'overview' | 'listings' | 'contracts' | 'inquiries' | 'users';

export default function Admin() {
  const { 
    listings, 
    inquiries, 
    contracts,
    addListing, 
    updateListing, 
    deleteListing, 
    updateInquiryStatus,
    resetData
  } = useListings();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab) || 'overview';
  const [tab, setTab] = useState<Tab>(initialTab);

  const [showNewModal, setShowNewModal] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  // Users for the users tab (interactive management)
  const [users, setUsers] = useState([
    { name: 'Max Mustermann', email: 'max@selinova-tech.at', role: 'Verkäufer', status: 'aktiv' },
    { name: 'Lisa Schmidt', email: 'lisa@startup.io', role: 'Käufer', status: 'aktiv' },
    { name: 'Tom Weber', email: 'tom@corp.de', role: 'Verkäufer', status: 'inaktiv' },
  ]);

  // Simple admin authentication for the admin area (demo credentials)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminRole, setAdminRole] = useState<'superadmin' | 'moderator' | 'viewer'>('viewer');
  const [adminUser, setAdminUser] = useState(''); // store logged in username
  const [adminLoginForm, setAdminLoginForm] = useState({ user: '', pass: '' });
  const [adminLoginError, setAdminLoginError] = useState('');

  // Check auth on mount
  useEffect(() => {
    if (localStorage.getItem('nexus_admin_auth') === 'true') {
      setIsAdminAuthenticated(true);
      const savedRole = localStorage.getItem('nexus_admin_role') as 'superadmin' | 'moderator' | 'viewer' | null;
      if (savedRole) setAdminRole(savedRole);
      const savedUser = localStorage.getItem('nexus_admin_user');
      if (savedUser) setAdminUser(savedUser);
    }
  }, []);

  // Encrypted credentials (base64, simple obfuscation for GitHub)
  const SUPER_U = atob('ZmVybzExNjA/JSE=');
  const SUPER_P = atob('c2VsaW5hMTkyMzM4');
  const MOD_U = atob('bW9k');
  const MOD_P = atob('bmV4dXMyMDI2');
  const VIEW_U = atob('dmlldw==');
  const VIEW_P = atob('bmV4dXMyMDI2');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { user, pass } = adminLoginForm;

    if (user === SUPER_U && pass === SUPER_P) {
      localStorage.setItem('nexus_admin_auth', 'true');
      localStorage.setItem('nexus_admin_role', 'superadmin');
      localStorage.setItem('nexus_admin_user', user);
      setIsAdminAuthenticated(true);
      setAdminRole('superadmin');
      setAdminUser(user);
      setAdminLoginError('');
      setAdminLoginForm({ user: '', pass: '' });
      window.dispatchEvent(new Event('admin-auth-changed'));
    } else if (user === MOD_U && pass === MOD_P) {
      localStorage.setItem('nexus_admin_auth', 'true');
      localStorage.setItem('nexus_admin_role', 'moderator');
      localStorage.setItem('nexus_admin_user', user);
      setIsAdminAuthenticated(true);
      setAdminRole('moderator');
      setAdminUser(user);
      setAdminLoginError('');
      setAdminLoginForm({ user: '', pass: '' });
      window.dispatchEvent(new Event('admin-auth-changed'));
    } else if (user === VIEW_U && pass === VIEW_P) {
      localStorage.setItem('nexus_admin_auth', 'true');
      localStorage.setItem('nexus_admin_role', 'viewer');
      localStorage.setItem('nexus_admin_user', user);
      setIsAdminAuthenticated(true);
      setAdminRole('viewer');
      setAdminUser(user);
      setAdminLoginError('');
      setAdminLoginForm({ user: '', pass: '' });
      window.dispatchEvent(new Event('admin-auth-changed'));
    } else {
      setAdminLoginError('Falsche Zugangsdaten. Haupt-Admin (verschlüsselt), mod / nexus2026 (Moderator), view / nexus2026 (Viewer)');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('nexus_admin_auth');
    localStorage.removeItem('nexus_admin_role');
    localStorage.removeItem('nexus_admin_user');
    setIsAdminAuthenticated(false);
    setAdminRole('viewer');
    setAdminUser('');
    setAdminLoginForm({ user: '', pass: '' });
    window.dispatchEvent(new Event('admin-auth-changed'));
  };

  // Access rights helpers
  const canManageListings = adminRole === 'superadmin';
  const canDeleteListings = adminRole === 'superadmin';
  const canManageUsers = adminRole === 'superadmin';
  const canManageContracts = adminRole !== 'viewer';
  const canUpdateInquiries = adminRole !== 'viewer';
  const isSuperAdmin = adminRole === 'superadmin';

  const toggleUserStatus = (idx: number) => {
    setUsers(prev => prev.map((u, i) => i === idx ? { ...u, status: u.status === 'aktiv' ? 'inaktiv' : 'aktiv' } : u));
  };
  const changeUserRole = (idx: number) => {
    setUsers(prev => prev.map((u, i) => i === idx ? { ...u, role: u.role === 'Verkäufer' ? 'Käufer' : 'Verkäufer' } : u));
  };
  const removeUser = (idx: number) => {
    if (confirm('Nutzer entfernen?')) {
      setUsers(prev => prev.filter((_, i) => i !== idx));
    }
  };
  const addUser = () => {
    const name = prompt('Name des Nutzers:', 'Neuer User');
    if (name) {
      setUsers(prev => [...prev, { name, email: name.toLowerCase().replace(/\s+/g, '') + '@selinova-tech.at', role: 'Käufer', status: 'aktiv' }]);
    }
  };

  const changeTab = (newTab: Tab) => {
    setTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Live stats from data
  const totalVolume = listings.reduce((sum, l) => sum + (l.type === 'sell' ? l.price : l.price * 12), 0);
  const activeRentals = listings.filter(l => l.type === 'rent').length;
  const openInquiries = inquiries.filter(i => i.status === 'new').length;

  const handleDelete = (id: string) => {
    if (confirm('Angebot wirklich löschen?')) {
      deleteListing(id);
    }
  };

  const handleQuickRentToggle = (id: string) => {
    const current = listings.find(l => l.id === id);
    if (current) {
      updateListing(id, { type: current.type === 'rent' ? 'sell' : 'rent' });
    }
  };

  // Simple new/edit form state (strings for complex fields for easy input)
  const [form, setForm] = useState<Partial<Listing & { techStackStr?: string; imagesStr?: string; badgesStr?: string }>>({});

  const openNew = () => {
    setForm({
      title: '',
      shortDesc: '',
      type: 'sell',
      price: 25000,
      priceNote: 'Einmalzahlung',
      source: 'Direct',
      category: 'E-Commerce',
      icon: '🛒',
      techStackStr: 'Next.js, React, Tailwind',
      imagesStr: '/images/offers/ecommerce-desktop.jpg,/images/offers/ecommerce-mobile.jpg',
      fullDesc: 'Vollständige Beschreibung des Angebots. Hochwertiges digitales Asset mit Traffic-Historie und laufenden Einnahmen.',
      badgesStr: 'new',
    });
    setEditingListing(null);
    setShowNewModal(true);
  };

  const openEdit = (l: Listing) => {
    setForm({
      ...l,
      techStackStr: Array.isArray(l.techStack) ? l.techStack.join(', ') : (l.techStack as any) || '',
      imagesStr: Array.isArray(l.images) ? l.images.join(', ') : (l.images as any) || '',
      badgesStr: Array.isArray(l.badges) ? l.badges.join(', ') : (l.badges as any) || '',
    });
    setEditingListing(l);
    setShowNewModal(true);
  };

  const saveListing = () => {
    if (!form.title || !form.shortDesc) {
      alert('Titel und Kurzbeschreibung sind Pflicht.');
      return;
    }

    const parsedForm: any = { ...form };

    // Parse comma separated fields to arrays
    if (typeof parsedForm.techStackStr === 'string') {
      parsedForm.techStack = parsedForm.techStackStr.split(',').map((s: string) => s.trim()).filter(Boolean);
      delete parsedForm.techStackStr;
    }
    if (typeof parsedForm.imagesStr === 'string') {
      parsedForm.images = parsedForm.imagesStr.split(',').map((s: string) => s.trim()).filter(Boolean);
      delete parsedForm.imagesStr;
    }
    if (typeof parsedForm.badgesStr === 'string') {
      parsedForm.badges = parsedForm.badgesStr.split(',').map((s: string) => s.trim()).filter(Boolean);
      delete parsedForm.badgesStr;
    }

    if (editingListing) {
      updateListing(editingListing.id, parsedForm as Partial<Listing>);
    } else {
      addListing(parsedForm);
    }
    setShowNewModal(false);
    setForm({});
    setEditingListing(null);
  };

  const handleFormChange = (key: string, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Admin authentication gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
        <Navbar />
        <div className="max-w-md mx-auto pt-20 p-6">
          <div className="nm-admin-card">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/selinova-gate-logo.png" alt="SELINOVA-TECH" style={{ height: '36px', width: 'auto', marginRight: '8px' }} />
              <div>
                <div className="font-display font-bold text-xl">SELINOVA-TECH</div>
                <div className="text-[10px] text-[var(--t3)] -mt-0.5">ADMIN BEREICH</div>
              </div>
            </div>

            <h1 className="text-2xl font-display mb-2">Admin-Zugang</h1>
            <p className="text-[var(--t2)] mb-6 text-sm">Dieser Bereich ist passwortgeschützt. Nur autorisierte Personen haben Zugriff.</p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-xs text-[var(--t3)]">Benutzername</label>
                <input 
                  type="text" 
                  value={adminLoginForm.user} 
                  onChange={e => setAdminLoginForm(f => ({...f, user: e.target.value}))}
                  className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-3 text-sm" 
                  placeholder="fero1160?!" 
                  required 
                />
              </div>
              <div>
                <label className="text-xs text-[var(--t3)]">Passwort</label>
                <input 
                  type="password" 
                  value={adminLoginForm.pass} 
                  onChange={e => setAdminLoginForm(f => ({...f, pass: e.target.value}))}
                  className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-3 text-sm" 
                  placeholder="••••••••" 
                  required 
                />
              </div>

              {adminLoginError && (
                <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">{adminLoginError}</div>
              )}

              <button type="submit" className="w-full nm-btn nm-btn-primary py-3">Anmelden</button>
            </form>

            <div className="mt-6 text-xs text-[var(--t3)] text-center">
              <strong>Zugangsrechte:</strong><br />
              <strong>Haupt-Admin (verschlüsselt)</strong> → Superadmin (alles)<br />
              <strong>mod / nexus2026</strong> → Moderator (Anfragen + Verträge verwalten, Listings ansehen)<br />
              <strong>view / nexus2026</strong> → Viewer (nur Leserecht)<br />
              (Demo-Modus)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Navbar />

      <div className="nm-admin-layout">
        {/* Sidebar */}
        <div className="nm-admin-sidebar">
          <div className="flex items-center gap-3 mb-8 px-2">
            <img src="/images/selinova-gate-logo.png" alt="SELINOVA-TECH" style={{ height: '36px', width: 'auto', marginRight: '8px' }} />
            <div>
              <div className="font-display font-bold">SELINOVA-TECH</div>
              <div className="text-[10px] text-[var(--t3)] -mt-0.5">ADMIN • {adminRole.toUpperCase()}</div>
            </div>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-[var(--t3)] px-2 mb-2">VERWALTUNG</div>
          
          <button onClick={() => changeTab('overview')} className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 text-sm ${tab === 'overview' ? 'bg-[var(--bg3)] text-[var(--a1)]' : 'hover:bg-[var(--bg3)]'}`}>
            <TrendingUp size={16} /> Dashboard
          </button>
          <button onClick={() => changeTab('listings')} className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 text-sm ${tab === 'listings' ? 'bg-[var(--bg3)] text-[var(--a1)]' : 'hover:bg-[var(--bg3)]'}`}>
            <FileText size={16} /> Angebote ({listings.length})
          </button>
          {canManageContracts && (
            <button onClick={() => changeTab('contracts')} className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 text-sm ${tab === 'contracts' ? 'bg-[var(--bg3)] text-[var(--a1)]' : 'hover:bg-[var(--bg3)]'}`}>
              <FileText size={16} /> Verträge ({contracts.length})
            </button>
          )}
          <button onClick={() => changeTab('inquiries')} className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 text-sm ${tab === 'inquiries' ? 'bg-[var(--bg3)] text-[var(--a1)]' : 'hover:bg-[var(--bg3)]'}`}>
            <Users size={16} /> Anfragen ({inquiries.length})
          </button>
          {canManageUsers && (
            <button onClick={() => changeTab('users')} className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 text-sm ${tab === 'users' ? 'bg-[var(--bg3)] text-[var(--a1)]' : 'hover:bg-[var(--bg3)]'}`}>
              <Users size={16} /> Nutzer &amp; Verkäufer
            </button>
          )}

          <div className="my-6 border-t border-[var(--border)]" />

          <button 
            onClick={openNew}
            className="w-full nm-btn nm-btn-primary justify-center gap-2 mt-2"
          >
            <Plus size={16} /> Neues Angebot
          </button>



          <div className="mt-auto pt-8 text-[10px] text-[var(--t3)] px-2">
            Angemeldet als: <span className="text-[var(--a1)]">{adminUser}@selinova.tech</span>
            <button 
              onClick={handleAdminLogout} 
              className="block mt-2 text-red-400 hover:text-red-300 text-xs"
            >
              Abmelden
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="nm-admin-main">
          {tab === 'overview' && (
            <>
              <h1 className="text-3xl font-display mb-1">Admin Dashboard</h1>
              <p className="text-[var(--t2)] mb-8">Willkommen zurück. Heute: 3 neue Anfragen, 1 Deal in Closing.</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="nm-admin-card">
                  <div className="text-xs text-[var(--t3)]">GESAMTVOLUMEN (YTD)</div>
                  <div className="text-3xl font-display mt-1">€{(totalVolume / 1000000).toFixed(1)}M</div>
                </div>
                <div className="nm-admin-card">
                  <div className="text-xs text-[var(--t3)]">AKTIVE MIETEN</div>
                  <div className="text-3xl font-display mt-1 text-[var(--a1)]">{activeRentals}</div>
                </div>
                <div className="nm-admin-card">
                  <div className="text-xs text-[var(--t3)]">OFFENE ANFRAGEN</div>
                  <div className="text-3xl font-display mt-1 text-[var(--a4)]">{openInquiries}</div>
                </div>
                <div className="nm-admin-card">
                  <div className="text-xs text-[var(--t3)]">CONVERSION RATE</div>
                  <div className="text-3xl font-display mt-1">31%</div>
                </div>
              </div>

              <div className="nm-admin-card">
                <h3 className="mb-4 font-semibold">Schnellzugriff</h3>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => changeTab('listings')} className="nm-btn nm-btn-outline">Alle Angebote verwalten</button>
                  <button onClick={() => setShowNewModal(true)} className="nm-btn nm-btn-primary">Angebot anlegen</button>
                  <Link to="/" className="nm-btn nm-btn-outline">Zum öffentlichen Mainboard</Link>
                </div>
              </div>
            </>
          )}

          {tab === 'listings' && (
            <>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h1 className="text-3xl font-display">Angebote verwalten</h1>
                  <p className="text-[var(--t2)]">Gesamt: {listings.length}</p>
                </div>
                {canManageListings && (
                  <button onClick={() => setShowNewModal(true)} className="nm-btn nm-btn-primary">+ Neues Angebot</button>
                )}
                {isSuperAdmin && (
                  <button 
                    onClick={() => { if (confirm('Wirklich alle Daten (Listings, Inquiries, Contracts) zurücksetzen?')) resetData(); }} 
                    className="ml-2 nm-btn nm-btn-outline text-xs"
                    title="Setzt alle lokalen Daten zurück auf den Original-Seed"
                  >
                    Reset Daten
                  </button>
                )}
              </div>

              <div className="nm-admin-card overflow-x-auto">
                <table className="nm-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Titel</th>
                      <th>Premium Domain</th>
                      <th>Typ</th>
                      <th>Preis</th>
                      <th>Umsatz/Mo</th>
                      <th>Quelle</th>
                      <th className="text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map(l => (
                      <tr key={l.id}>
                        <td className="font-mono text-xs text-[var(--t3)]">#{l.id}</td>
                        <td className="font-medium max-w-[280px] truncate">{l.title}</td>
                        <td className="text-xs font-mono text-emerald-400">{l.premiumDomain || '—'}</td>
                        <td>
                          <button 
                            onClick={() => handleQuickRentToggle(l.id)}
                            className={`text-xs px-2.5 py-px rounded ${l.type === 'sell' ? 'bg-emerald-900/60 text-emerald-400' : 'bg-cyan-900/60 text-[var(--a1)]'}`}
                          >
                            {l.type === 'sell' ? 'Verkauf' : 'Miete'}
                          </button>
                        </td>
                        <td className="font-semibold">€{l.price.toLocaleString('de-DE')}{l.type === 'rent' ? '/Mo' : ''}</td>
                        <td>{l.monthlyRevenue || l.mrr ? `€${(l.monthlyRevenue || l.mrr || 0).toLocaleString('de-DE')}` : '—'}</td>
                        <td className="text-xs text-[var(--t2)]">{l.source}</td>
                        <td className="text-right">
                          <button 
                            onClick={() => openEdit(l)}
                            className="p-1.5 text-[var(--t2)] hover:text-[var(--a1)]"
                            title="Bearbeiten"
                          >
                            <Edit2 size={15} />
                          </button>
                          {canDeleteListings && (
                            <button 
                              onClick={() => handleDelete(l.id)}
                              className="p-1.5 text-[var(--t2)] hover:text-red-400 ml-1"
                              title="Löschen"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                          <Link 
                            to={`/angebot/${l.slug}`} 
                            className="ml-2 text-xs px-2 py-1 rounded bg-[var(--bg3)] hover:bg-[var(--border)]"
                          >
                            Ansehen
                          </Link>
                          {adminRole !== 'viewer' && (
                            <>
                              <button 
                                onClick={async () => {
                                  const m = await import('../lib/generateContracts');
                                  await m.generateFullDocumentPackage(l);
                                }}
                                className="ml-2 text-xs px-2 py-1 rounded bg-[var(--a1)] text-black hover:opacity-80 font-medium"
                                title="Vollständiges Paket: Angebotsblatt + Vertrag + NDA + Übergabe (produkt-spezifisch)"
                              >
                                Paket
                              </button>
                              <button 
                                onClick={async () => {
                                  const m = await import('../lib/generateContracts');
                                  await m.generateAngebotsblatt(l);
                                }}
                                className="ml-1 text-xs px-2 py-1 rounded bg-[var(--bg3)] hover:bg-[var(--a1)] hover:text-black"
                                title="Nur Angebotsblatt"
                              >
                                Blatt
                              </button>
                              <button 
                                onClick={async () => {
                                  const m = await import('../lib/generateContracts');
                                  await m.generateContractPDF(l, l.type === 'sell' ? 'kaufvertrag' : 'mietvertrag');
                                }}
                                className="ml-1 text-xs px-2 py-1 rounded bg-[var(--bg3)] hover:bg-[var(--a1)] hover:text-black"
                                title={l.type === 'sell' ? 'Kaufvertrag generieren' : 'Mietvertrag generieren'}
                              >
                                Vertrag
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'contracts' && (
            <div>
              <h1 className="text-3xl font-display mb-4">Verträge &amp; Dokumente</h1>
              <div className="nm-admin-card">
                {contracts.length === 0 ? (
                  <p className="text-[var(--t2)] py-6">Noch keine Verträge generiert. Gehe zu einer Detailseite und lade PDFs herunter (Kaufvertrag, NDA, Übergabe).</p>
                ) : (
                  <table className="nm-table">
                    <thead>
                      <tr>
                        <th>Datum</th>
                        <th>Asset</th>
                        <th>Typ</th>
                        <th>Datei</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {contracts.map((c) => (
                        <tr key={c.id}>
                          <td className="text-xs text-[var(--t3)]">{new Date(c.generatedAt).toLocaleDateString('de-DE')}</td>
                          <td className="font-medium">{c.listingTitle}</td>
                          <td><span className="text-xs px-2 py-0.5 bg-[var(--bg3)] rounded">{c.type === 'angebotsblatt' ? 'Angebotsblatt' : c.type}</span></td>
                          <td className="font-mono text-xs">{c.fileName}</td>
                          <td>
                            {canManageContracts && (
                              <button 
                                onClick={async () => {
                                  // Re-generate on the fly using current listing data
                                  const l = listings.find(ll => ll.id === c.listingId);
                                  if (l) {
                                    // dynamic import to avoid circular if needed, but it's fine
                                    const m = await import('../lib/generateContracts');
                                    if (c.type === 'angebotsblatt') {
                                      await m.generateAngebotsblatt(l);
                                    } else {
                                      await m.generateContractPDF(l, c.type === 'mietvertrag' ? 'mietvertrag' : c.type === 'kaufvertrag' ? 'kaufvertrag' : c.type === 'nda' ? 'nda' : 'uebergabe');
                                    }
                                  }
                                }}
                                className="flex items-center gap-1 text-xs px-3 py-1 rounded bg-[var(--bg3)] hover:bg-[var(--a1)] hover:text-black"
                              >
                                <Download size={14} /> Erneut generieren
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="nm-admin-card">
              <h2 className="text-xl mb-4">Nutzer &amp; Verkäufer</h2>
              <p className="text-[var(--t2)] mb-4">Verwaltung für Accounts. Änderungen werden lokal gespeichert.</p>
              <div className="space-y-2">
                {users.map((u, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[var(--bg3)] p-3 rounded-xl text-sm">
                    <div>
                      <span className="font-medium">{u.name}</span> <span className="text-[var(--t3)]">({u.email})</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${u.status === 'aktiv' ? 'bg-emerald-900/60 text-emerald-400' : 'bg-zinc-700'}`}>{u.status}</span>
                      <span className="ml-2 text-xs text-[var(--t3)]">Rolle: {u.role}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleUserStatus(idx)} className="text-xs px-2 py-1 bg-[var(--bg)] rounded hover:bg-[var(--border)]">Status togglen</button>
                      <button onClick={() => changeUserRole(idx)} className="text-xs px-2 py-1 bg-[var(--bg)] rounded hover:bg-[var(--border)]">Rolle ändern</button>
                      <button onClick={() => removeUser(idx)} className="text-xs px-2 py-1 bg-red-900/40 text-red-400 rounded hover:bg-red-900/60">Entfernen</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addUser} className="mt-4 text-xs nm-btn nm-btn-outline">+ Nutzer hinzufügen</button>
              <div className="mt-4 text-xs text-[var(--t3)]">Aktuell angemeldet als: {adminUser}@selinova.tech</div>
            </div>
          )}

          {tab === 'inquiries' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-display">Eingegangene Anfragen</h1>

              </div>

              <div className="nm-admin-card overflow-x-auto">
                {inquiries.length === 0 ? (
                  <p className="py-8 text-center text-[var(--t2)]">Noch keine Anfragen. Gehe auf eine Detailseite oder ein Listing-Card und stelle eine Anfrage über den "Kontakt" Button.</p>
                ) : (
                  <table className="nm-table">
                    <thead>
                      <tr>
                        <th>Datum</th>
                        <th>Asset</th>
                        <th>Name / Kontakt</th>
                        <th>Nachricht</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inq) => (
                        <tr key={inq.id}>
                          <td className="text-xs whitespace-nowrap text-[var(--t3)]">{new Date(inq.createdAt).toLocaleDateString('de-DE')}</td>
                          <td className="text-sm">{inq.listingTitle}<div className="text-[10px] text-[var(--t3)]">#{inq.listingId}</div></td>
                          <td>
                            <div>{inq.name}</div>
                            <div className="text-xs text-[var(--t2)]">{inq.email}{inq.company ? ` • ${inq.company}` : ''}</div>
                          </td>
                          <td className="max-w-[280px] text-sm text-[var(--t2)] truncate" title={inq.message}>{inq.message}</td>
                          <td>
                            {canUpdateInquiries ? (
                              <select 
                                value={inq.status} 
                                onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                                className="text-xs bg-[var(--bg3)] border border-[var(--border)] rounded px-2 py-0.5"
                              >
                                <option value="new">Neu</option>
                                <option value="contacted">Kontaktiert</option>
                                <option value="in_negotiation">In Verhandlung</option>
                                <option value="closed">Abgeschlossen</option>
                              </select>
                            ) : (
                              <span className="text-xs px-2 py-0.5 bg-[var(--bg3)] rounded">{inq.status}</span>
                            )}
                          </td>
                          <td className="text-right">
                            <a href={`mailto:${inq.email}`} className="text-xs px-3 py-1 bg-[var(--bg3)] rounded hover:bg-[var(--a1)] hover:text-black">Antworten</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* New / Edit Listing Modal */}
          {showNewModal && (
            <div className="fixed inset-0 bg-black/70 z-[250] flex items-center justify-center p-4" onClick={() => setShowNewModal(false)}>
              <div className="nm-admin-card w-full max-w-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl mb-4">{editingListing ? 'Angebot bearbeiten' : 'Neues Angebot anlegen'}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--t3)]">TITEL *</label>
                    <input value={form.title || ''} onChange={e => handleFormChange('title', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--t3)]">KURZBESCHREIBUNG *</label>
                    <textarea rows={2} value={form.shortDesc || ''} onChange={e => handleFormChange('shortDesc', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">TYP</label>
                    <select value={form.type} onChange={e => handleFormChange('type', e.target.value as any)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm">
                      <option value="sell">Verkauf</option>
                      <option value="rent">Miete</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">PREIS</label>
                    <input type="number" value={form.price || 0} onChange={e => handleFormChange('price', parseInt(e.target.value) || 0)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">PREIS HINWEIS</label>
                    <input value={form.priceNote || ''} onChange={e => handleFormChange('priceNote', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">KATEGORIE</label>
                    <input value={form.category || ''} onChange={e => handleFormChange('category', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">SOURCE</label>
                    <input value={form.source || ''} onChange={e => handleFormChange('source', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">ICON (Emoji)</label>
                    <input value={form.icon || ''} onChange={e => handleFormChange('icon', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" placeholder="🛒" />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">TECH STACK (komma-getrennt)</label>
                    <input value={form.techStackStr || ''} onChange={e => handleFormChange('techStackStr', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" placeholder="React, Next.js, Tailwind" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--t3)]">IMAGES (komma-getrennt URLs)</label>
                    <input value={form.imagesStr || ''} onChange={e => handleFormChange('imagesStr', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" placeholder="/images/offers/ecommerce-desktop.jpg,/images/offers/ecommerce-mobile.jpg" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--t3)]">VOLLSTÄNDIGE BESCHREIBUNG</label>
                    <textarea rows={3} value={form.fullDesc || ''} onChange={e => handleFormChange('fullDesc', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" placeholder="Lange Beschreibung für die Detailseite..." />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--t3)]">BADGES (komma, z.B. hot,new)</label>
                    <input value={form.badgesStr || ''} onChange={e => handleFormChange('badgesStr', e.target.value)} className="w-full mt-1 bg-[var(--bg3)] border border-[var(--border)] rounded p-2 text-sm" placeholder="new,verified" />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={saveListing} className="flex-1 nm-btn nm-btn-primary">Speichern</button>
                  <button onClick={() => { setShowNewModal(false); setEditingListing(null); }} className="flex-1 nm-btn nm-btn-outline">Abbrechen</button>
                </div>


              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}
