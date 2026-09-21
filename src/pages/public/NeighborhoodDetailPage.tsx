import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNeighborhood } from '../../hooks/useNeighborhoods';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../../components/property/PropertyCard';
import { MapboxPropertyMap } from '../../components/map/MapboxPropertyMap';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/shared/SEOHead';
import { MapPin, ArrowRight, School, ShieldCheck, TreePine, Coffee } from 'lucide-react';

export const NeighborhoodDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: neighborhood, isLoading } = useNeighborhood(slug);
  const { data: allProperties = [] } = useProperties();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-dark border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!neighborhood) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <h1 className="font-display font-bold text-3xl text-brand-dark">Neighborhood Not Found</h1>
        <Link to="/neighborhoods">
          <Button variant="gold">View All Enclaves</Button>
        </Link>
      </div>
    );
  }

  const neighborhoodProperties = allProperties.filter(
    (p) => p.neighborhood_id === neighborhood.id
  );

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title={`${neighborhood.name} Luxury Real Estate & Neighborhood Dossier`}
        description={neighborhood.description || undefined}
        ogImage={neighborhood.hero_image_url || undefined}
      />

      {/* Hero Header */}
      <div className="relative min-h-[50vh] flex items-end overflow-hidden bg-brand-dark pt-28 pb-12">
        <img
          src={neighborhood.hero_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'}
          alt={neighborhood.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white space-y-4">
          <div className="flex items-center gap-2 text-xs text-brand-stone-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/neighborhoods" className="hover:text-white">Neighborhoods</Link>
            <span>/</span>
            <span className="text-brand-gold">{neighborhood.name}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            {neighborhood.name}
          </h1>

          <p className="text-sm sm:text-base text-brand-stone-200 max-w-2xl leading-relaxed">
            {neighborhood.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Lifestyle & Enclave Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <TreePine className="w-6 h-6 text-brand-gold" />
            <h3 className="font-display font-bold text-sm text-brand-dark">Environment & Zoning</h3>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              Minimum 0.5 to 2.5 acre controlled residential zoning preserving mature tree canopies.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-brand-gold" />
            <h3 className="font-display font-bold text-sm text-brand-dark">Security Infrastructure</h3>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              Dedicated private patrol beats, biometric gate access, and embassy diplomatic clearance.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <School className="w-6 h-6 text-brand-gold" />
            <h3 className="font-display font-bold text-sm text-brand-dark">Premier Education</h3>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              Immediate proximity to world-class British and International Baccalaureate academies.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <Coffee className="w-6 h-6 text-brand-gold" />
            <h3 className="font-display font-bold text-sm text-brand-dark">Lifestyle & Leisure</h3>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              Exclusive golf country clubs, organic farmer markets, and equestrian riding trails.
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-2xl text-brand-dark">Enclave Boundaries & Residences</h2>
            <span className="text-xs text-brand-stone-500">{neighborhood.name}, Nairobi</span>
          </div>
          <MapboxPropertyMap properties={neighborhoodProperties} className="h-[380px]" />
        </div>

        {/* Active Residences in this neighborhood */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-2xl text-brand-dark">
              Available Residences in {neighborhood.name} ({neighborhoodProperties.length})
            </h2>
            <Link to={`/search?neighborhood=${neighborhood.id}`}>
              <Button variant="outline" size="sm">Search with Filters</Button>
            </Link>
          </div>

          {neighborhoodProperties.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-brand-stone-200 space-y-3">
              <p className="font-display font-bold text-lg text-brand-dark">
                No public listings currently published in {neighborhood.name}
              </p>
              <p className="text-xs text-brand-stone-500 max-w-sm mx-auto">
                We frequently represent discreet off-market transactions in this enclave. Contact our concierge to inquire about private listings.
              </p>
              <Link to="/contact">
                <Button variant="gold" size="sm">Inquire About Off-Market Homes</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {neighborhoodProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
