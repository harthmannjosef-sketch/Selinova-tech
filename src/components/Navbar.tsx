import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path || (path === '/' && location.pathname === '/') || (path === '/kampange' && location.pathname === '/kampange');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAdminLoggedIn(typeof window !== 'undefined' && localStorage.getItem('nexus_admin_auth') === 'true');
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('admin-auth-changed', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('admin-auth-changed', checkAuth);
    };
  }, []);

  return (
    <nav className="nm-nav">
      <Link to="/" className="nm-logo">
        <img src="/images/selinova-gate-logo.png" alt="SELINOVA-TECH" className="nm-logo-img" style={{ height: '32px', width: 'auto' }} />
      </Link>

      <Link 
        to="/" 
        className={`nm-nav-link ${isActive('/') ? 'active' : ''}`}
      >
        Mainboard
      </Link>
      
      <Link 
        to="/kampange" 
        className={`nm-nav-link ${isActive('/kampange') ? 'active' : ''}`}
        style={{ color: '#f59e0b', fontWeight: 'bold' }}
      >
        🔥 SOMMER ANGEBOT
      </Link>
      
      {isAdminLoggedIn && (
        <Link 
          to="/admin" 
          className={`nm-nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
        >
          Admin
        </Link>
      )}

      <div className="nm-nav-actions">
        {isAdminLoggedIn && (
          <button 
            onClick={() => navigate('/admin')} 
            className="nm-btn nm-btn-outline" 
            title="Benachrichtigungen &amp; Admin (Anfragen, Verträge)"
          >
            <Bell size={16} />
          </button>
        )}
        {isAdminLoggedIn ? (
          <Link to="/admin" className="nm-btn nm-btn-primary">
            <Plus size={16} />
            Angebot einstellen
          </Link>
        ) : (
          <Link to="/kampange" className="nm-btn nm-btn-outline" style={{ color: '#f59e0b' }}>
            Kampagne ansehen
          </Link>
        )}
      </div>
    </nav>
  );
}
