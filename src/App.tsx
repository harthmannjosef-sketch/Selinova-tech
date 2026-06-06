import { Routes, Route } from 'react-router-dom';
import Mainboard from './pages/Mainboard';
import ListingDetail from './pages/ListingDetail';
import Admin from './pages/Admin';
import Kampagne from './pages/Kampagne';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainboard />} />
      <Route path="/angebot/:slug" element={<ListingDetail />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/kampange" element={<Kampagne />} />
      {/* Fallback */}
      <Route path="*" element={<Mainboard />} />
    </Routes>
  );
}
