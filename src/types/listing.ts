export type ListingType = 'sell' | 'rent';

export type ListingSource = 'Flippa' | 'Sedo' | 'Empire Flippers' | 'MicroAcquire' | 'BizBuySell' | 'FE International' | 'Direct';

export interface Listing {
  id: string;           // e.g. A1042
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  type: ListingType;
  price: number;        // for sell: total, for rent: monthly
  priceNote: string;
  monthlyRevenue?: number;
  mrr?: number;
  traffic?: number;
  users?: number;
  ageYears?: number;
  techStack: string[];
  source: ListingSource;
  badges?: ('hot' | 'new' | 'verified')[];
  icon: string;         // emoji or short label
  category: string;
  contractReady?: boolean;
  images?: string[]; // paths like '/images/offers/donero-xxx.jpg' for gallery/screenshots
  premiumDomain?: string;     // e.g. "immobilien-portal.co.at" – branded premium domain included with the asset
  domainIncludedNote?: string; // optional short note like "Inkl. Domain-Transfer"
}

export interface ListingFilter {
  query: string;
  types: ListingType[];
  sources: ListingSource[];
  sort: 'price-asc' | 'price-desc' | 'revenue-desc' | 'newest';
}
