import React, { useEffect } from 'react';
import { useProperties } from '../../hooks/useProperties';
import { useFilterStore } from '../../store/filterStore';
import { PropertyCard } from '../../components/property/PropertyCard';
import { PropertyFilters } from '../../components/property/PropertyFilters';
import { SEOHead } from '../../components/shared/SEOHead';
import { MapboxPropertyMap } from '../../components/map/MapboxPropertyMap';

export const BuyListingsPage: React.FC = () => {
  const { setListingType } = useFilterStore();
  const filterState = useFilterStore();

  useEffect(() => {
    setListingType('buy');
  }, [setListingType]);

  const { data: properties = [], isLoading } = useProperties({
    ...filterState,
    listing_type: 'buy',
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <SEOHead
        title="Luxury Residences for Sale"
        description="Browse exclusive luxury homes, architectural villas, and private residential estates for sale in Nairobi prime enclaves."
      />

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Prime Portfolio
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-dark">
          Properties for Sale
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 max-w-2xl leading-relaxed">
          Explore trophy estates, private forest compounds, and contemporary architectural residences available for private acquisition.
        </p>
      </div>

      {/* Filters */}
      <PropertyFilters />

      {/* Map Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-stone-500">
          Geographic Pin Distribution
        </h3>
        <MapboxPropertyMap properties={properties} className="h-[360px]" />
      </div>

      {/* Grid of Properties */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-brand-stone-500 border-b border-brand-stone-200 pb-3">
          <span className="font-semibold text-brand-dark">
            {properties.length} Available Residences
          </span>
          <span>Showing verified listings only</span>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-brand-stone-400">Loading portfolio...</div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-brand-stone-200 p-8 space-y-3">
            <h4 className="font-display font-bold text-lg text-brand-dark">No residences match your current criteria</h4>
            <p className="text-xs text-brand-stone-500">Try adjusting your filters or resetting to view all for-sale properties.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
