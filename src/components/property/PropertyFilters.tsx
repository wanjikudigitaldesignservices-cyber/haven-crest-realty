import React from 'react';
import { useFilterStore } from '../../store/filterStore';
import { useNeighborhoods } from '../../hooks/useNeighborhoods';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

interface PropertyFiltersProps {
  onApply?: () => void;
  compact?: boolean;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onApply, compact = false }) => {
  const {
    listing_type,
    neighborhood_id,
    bedrooms,
    keyword,
    sort,
    setListingType,
    setNeighborhoodId,
    setBedrooms,
    setKeyword,
    setSort,
    resetFilters,
  } = useFilterStore();

  const { data: neighborhoods = [] } = useNeighborhoods();

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-brand-stone-200 shadow-card space-y-4">
      {/* Top Row: Listing Type Tabs + Keyword Input */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Type Toggle */}
        <div className="flex bg-brand-stone-100 p-1 rounded-xl border border-brand-stone-200 shrink-0">
          {(['all', 'buy', 'rent'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setListingType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                listing_type === type
                  ? 'bg-brand-dark text-white shadow-sm'
                  : 'text-brand-stone-600 hover:text-brand-stone-900'
              }`}
            >
              {type === 'all' ? 'All Types' : type === 'buy' ? 'For Sale' : 'For Rent'}
            </button>
          ))}
        </div>

        {/* Search Keyword */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword || ''}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by neighborhood, architectural style, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-stone-300 text-sm focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark"
          />
        </div>
      </div>

      {/* Second Row: Specific Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-brand-stone-100">
        {/* Neighborhood */}
        <div>
          <label className="block text-[11px] font-bold text-brand-stone-600 uppercase tracking-wider mb-1">
            Neighborhood
          </label>
          <select
            value={neighborhood_id || ''}
            onChange={(e) => setNeighborhoodId(e.target.value || undefined)}
            className="w-full text-xs py-2 px-3 rounded-lg border border-brand-stone-300 bg-white focus:outline-none focus:border-brand-dark"
          >
            <option value="">All Neighborhoods</option>
            {neighborhoods.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-[11px] font-bold text-brand-stone-600 uppercase tracking-wider mb-1">
            Min Bedrooms
          </label>
          <select
            value={bedrooms || 'any'}
            onChange={(e) => setBedrooms(e.target.value === 'any' ? 'any' : Number(e.target.value))}
            className="w-full text-xs py-2 px-3 rounded-lg border border-brand-stone-300 bg-white focus:outline-none focus:border-brand-dark"
          >
            <option value="any">Any Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-[11px] font-bold text-brand-stone-600 uppercase tracking-wider mb-1">
            Sort By
          </label>
          <select
            value={sort || 'newest'}
            onChange={(e) => setSort(e.target.value as any)}
            className="w-full text-xs py-2 px-3 rounded-lg border border-brand-stone-300 bg-white focus:outline-none focus:border-brand-dark"
          >
            <option value="newest">Newest First</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="size_desc">Largest Area (sqm)</option>
          </select>
        </div>

        {/* Reset / Actions */}
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="w-full text-xs py-2 h-auto"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
