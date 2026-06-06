export interface Inquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  type: 'buy' | 'rent';
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  createdAt: string; // ISO
  status: 'new' | 'contacted' | 'in_negotiation' | 'closed';
}

export interface GeneratedContract {
  id: string;
  listingId: string;
  listingTitle: string;
  type: 'kaufvertrag' | 'mietvertrag' | 'nda' | 'uebergabe' | 'angebotsblatt';
  generatedAt: string;
  fileName: string;
}

export interface AppData {
  listings: import('./listing').Listing[];
  inquiries: Inquiry[];
  contracts: GeneratedContract[];
}
