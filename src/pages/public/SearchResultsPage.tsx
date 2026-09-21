import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { useFilterStore } from '../../store/filterStore';
import { PropertyCard } from '../../components/property/PropertyCard';
import { PropertyFilters } from '../../components/property/PropertyFilters';
import { MapboxPropertyMap } from '../../components/map/MapboxPropertyMap';
import { SEOHead } from '../../components/shared/SEOHead';
import { trackEvent } from '../../lib/analytics';
import { SlidersHorizontal, Map, Grid } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterStore = useFilterStore();
  const [viewMode, setViewMode] = React.useState<'split' | 'grid' | 'map'>('split');

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    const qType = searchParams.get('type') as any;
    const qNeighborhood = searchParams.get('neighborhood');
    const qKeyword = searchParams.get('q');
    const qBedrooms = searchParams.get('bedrooms');

    if (qType) filterStore.setListingType(qType);
    if (qNeighborhood) filterStore.setNeighborhoodId(qNeighborhood);
    if (qKeyword) filterStore.setKeyword(qKeyword);
    if (qBedrooms) filterStore.setBedrooms(Number(qBedrooms));

    trackEvent('search_performed', {
      type: qType || 'all',
      keyword: qKeyword || '',
    });
  }, []);

  const { data: properties = [], isLoading } = useProperties(filterStore);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <SEOHead
        title="Search Luxury Residences"
        description="Search through prime residential estates, penthouses, and properties with filtered criteria in Nairobi."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Portfolio Discovery
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1">
            Search & Filter Properties
          </h1>
          <p className="text-xs sm:text-sm text-brand-stone-500">
            Real-time querying across all verified brokerage listings
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-white rounded-xl border border-brand-stone-200 p-1 shadow-sm shrink-0">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'split' ? 'bg-brand-dark text-white' : 'text-brand-stone-600 hover:text-brand-dark'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split View</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'grid' ? 'bg-brand-dark text-white' : 'text-brand-stone-600 hover:text-brand-dark'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid Only</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'map' ? 'bg-brand-dark text-white' : 'text-brand-stone-600 hover:text-brand-dark'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map Only</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <PropertyFilters />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-brand-stone-600 border-b border-brand-stone-200 pb-2">
        <span className="font-semibold text-brand-dark">{properties.length} Properties Found</span>
        <span>URL Synced & Shareable</span>
      </div>

      {/* Split / Grid / Map View Layout */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Property Cards Column */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading ? (
              <div className="py-20 text-center text-brand-stone-400">Querying database...</div>
            ) : properties.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-brand-stone-200">
                <p className="text-sm font-semibold text-brand-dark">No residences match your current criteria</p>
                <p className="text-xs text-brand-stone-500 mt-1">Try broadening your search query or reset filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>

          {/* Sticky Interactive Map Column */}
          <div className="lg:col-span-5 sticky top-24">
            <MapboxPropertyMap properties={properties} className="h-[600px]" />
          </div>
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <div>
          <MapboxPropertyMap properties={properties} className="h-[650px]" />
        </div>
      )}
    </div>
  );
};
