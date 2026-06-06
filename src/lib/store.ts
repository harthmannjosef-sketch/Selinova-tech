import { useState, useEffect, useCallback } from 'react';
import { Listing } from '../types/listing';
import { Inquiry, GeneratedContract } from '../types/store';
import { listings as seedListings } from '../data/listings';

const STORAGE_KEY = 'nexusmarket_data_v1';

interface AppState {
  listings: Listing[];
  inquiries: Inquiry[];
  contracts: GeneratedContract[];
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const persisted = raw ? JSON.parse(raw) : {};
    const persistedListings = Array.isArray(persisted.listings) ? persisted.listings : [];

    // Always include latest seed + respect persisted overrides + keep user-added extras
    const mergedListings = seedListings.map(seed => {
      const p = persistedListings.find((x: any) => x.id === seed.id);
      return p ? { ...seed, ...p } : seed;
    });
    const extraUserListings = persistedListings.filter((p: any) => !seedListings.some(s => s.id === p.id));

    return {
      listings: [...mergedListings, ...extraUserListings],
      inquiries: Array.isArray(persisted.inquiries) ? persisted.inquiries : [],
      contracts: Array.isArray(persisted.contracts) ? persisted.contracts : [],
    };
  } catch (e) {
    console.warn('Failed to load state', e);
  }
  return {
    listings: [...seedListings],
    inquiries: [],
    contracts: [],
  };
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist state', e);
  }
}

let globalState: AppState = loadState();
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function setGlobalState(updater: (prev: AppState) => AppState) {
  globalState = updater(globalState);
  saveState(globalState);
  notify();
}

export function resetData() {
  globalState = {
    listings: [...seedListings],
    inquiries: [],
    contracts: [],
  };
  saveState(globalState);
  notify();
}

// ===== LISTINGS =====
export function getListings(): Listing[] {
  return globalState.listings;
}

export function addListing(newListing: Omit<Listing, 'id'> & Partial<Pick<Listing, 'id'>>) {
  const listing: Listing = {
    id: newListing.id || 'D' + Math.floor(Math.random() * 9000 + 1000),
    slug: newListing.slug || newListing.title.toLowerCase().replace(/\s+/g, '-').slice(0, 40),
    ...newListing as any,
  } as Listing;

  setGlobalState((prev) => ({
    ...prev,
    listings: [listing, ...prev.listings],
  }));
  return listing;
}

export function updateListing(id: string, updates: Partial<Listing>) {
  setGlobalState((prev) => ({
    ...prev,
    listings: prev.listings.map((l) => (l.id === id ? { ...l, ...updates } : l)),
  }));
}

export function deleteListing(id: string) {
  setGlobalState((prev) => ({
    ...prev,
    listings: prev.listings.filter((l) => l.id !== id),
  }));
}

// ===== INQUIRIES =====
export function getInquiries(): Inquiry[] {
  return globalState.inquiries;
}

export function createInquiry(data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const inquiry: Inquiry = {
    ...data,
    id: 'INQ-' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  setGlobalState((prev) => ({
    ...prev,
    inquiries: [inquiry, ...prev.inquiries],
  }));
  return inquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']) {
  setGlobalState((prev) => ({
    ...prev,
    inquiries: prev.inquiries.map((i) => (i.id === id ? { ...i, status } : i)),
  }));
}

// ===== CONTRACTS =====
export function getContracts(): GeneratedContract[] {
  return globalState.contracts;
}

export function recordContract(contract: Omit<GeneratedContract, 'id' | 'generatedAt'>) {
  const record: GeneratedContract = {
    ...contract,
    id: 'CTR-' + Date.now().toString(36).toUpperCase(),
    generatedAt: new Date().toISOString(),
  };
  setGlobalState((prev) => ({
    ...prev,
    contracts: [record, ...prev.contracts],
  }));
  return record;
}

// React hook for components
export function useListings() {
  const [state, setState] = useState<AppState>(globalState);

  useEffect(() => {
    const listener = () => setState({ ...globalState });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const actions = {
    resetData: useCallback(() => {
      resetData();
    }, []),

    // Listings
    addListing: useCallback((l: Parameters<typeof addListing>[0]) => addListing(l), []),
    updateListing: useCallback((id: string, u: Partial<Listing>) => updateListing(id, u), []),
    deleteListing: useCallback((id: string) => deleteListing(id), []),

    // Inquiries
    createInquiry: useCallback((d: Parameters<typeof createInquiry>[0]) => createInquiry(d), []),
    updateInquiryStatus: useCallback((id: string, s: Inquiry['status']) => updateInquiryStatus(id, s), []),

    // Contracts
    recordContract: useCallback((c: Parameters<typeof recordContract>[0]) => recordContract(c), []),
  };

  return {
    listings: state.listings,
    inquiries: state.inquiries,
    contracts: state.contracts,
    ...actions,
  };
}
