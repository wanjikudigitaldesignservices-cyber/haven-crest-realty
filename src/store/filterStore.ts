import { create } from 'zustand';
import { PropertyFilterState } from '../types';

interface FilterStore extends PropertyFilterState {
  setListingType: (type: PropertyFilterState['listing_type']) => void;
  setNeighborhoodId: (id: string | undefined) => void;
  setPriceRange: (min?: number, max?: number) => void;
  setBedrooms: (bedrooms: number | 'any') => void;
  setBathrooms: (bathrooms: number | 'any') => void;
  setKeyword: (keyword: string) => void;
  setSort: (sort: PropertyFilterState['sort']) => void;
  resetFilters: () => void;
}

const initialFilters: PropertyFilterState = {
  listing_type: 'all',
  neighborhood_id: undefined,
  min_price: undefined,
  max_price: undefined,
  bedrooms: 'any',
  bathrooms: 'any',
  keyword: '',
  sort: 'newest',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilters,

  setListingType: (listing_type) => set({ listing_type }),
  setNeighborhoodId: (neighborhood_id) => set({ neighborhood_id }),
  setPriceRange: (min_price, max_price) => set({ min_price, max_price }),
  setBedrooms: (bedrooms) => set({ bedrooms }),
  setBathrooms: (bathrooms) => set({ bathrooms }),
  setKeyword: (keyword) => set({ keyword }),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set(initialFilters),
}));
