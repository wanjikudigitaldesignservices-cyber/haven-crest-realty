import { create } from 'zustand';
import { mockDb } from '../lib/supabaseClient';
import { trackEvent } from '../lib/analytics';

interface SavedState {
  savedIds: string[];
  initSaved: (visitorId: string) => void;
  toggleSaved: (propertyId: string, visitorId?: string) => boolean;
  isSaved: (propertyId: string) => boolean;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: ['prop-1', 'prop-3'], // default saved items

  initSaved: (visitorId: string) => {
    const ids = mockDb.getSavedListingIds(visitorId);
    set({ savedIds: ids });
  },

  toggleSaved: (propertyId: string, visitorId: string = 'usr-visitor-demo') => {
    const isNowSaved = mockDb.toggleSavedListing(visitorId, propertyId);
    const current = get().savedIds;
    const updated = isNowSaved
      ? [...current, propertyId]
      : current.filter(id => id !== propertyId);
    
    set({ savedIds: updated });
    trackEvent('property_favorited', { property_id: propertyId, favorited: isNowSaved });
    return isNowSaved;
  },

  isSaved: (propertyId: string) => {
    return get().savedIds.includes(propertyId);
  },
}));
