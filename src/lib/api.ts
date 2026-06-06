/**
 * Data Layer
 *
 * Uses local persistence (localStorage) so the full application is usable out of the box.
 * 
 * Prepared for replacement with real backend API calls.
 */

export { 
  useListings, 
  addListing, 
  updateListing, 
  deleteListing,
  createInquiry,
  updateInquiryStatus,
  recordContract,
  resetData,
} from './store';

// TODO: When server is ready, implement real versions here e.g.
// export async function fetchListings() { return fetch('/api/listings').then(r => r.json()); }
