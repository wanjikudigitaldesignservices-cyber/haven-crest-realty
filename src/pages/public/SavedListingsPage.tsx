import React from 'react';
import { Link } from 'react-router-dom';
import { useSavedStore } from '../../store/savedStore';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/shared/SEOHead';
import { Heart, Search, ArrowRight } from 'lucide-react';

export const SavedListingsPage: React.FC = () => {
  const { savedIds } = useSavedStore();
  const { data: properties = [] } = useProperties();

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <SEOHead
        title="Saved Residences"
        description="Review your bookmarked luxury residences, estates, and rental penthouses."
      />

      <div className="border-b border-brand-stone-200 pb-4">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Personal Shortlist
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1">
          Saved Residences ({savedProperties.length})
        </h1>
        <p className="text-xs sm:text-sm text-brand-stone-500 mt-1">
          Listings remain bookmarked across your browsing session.
        </p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-brand-stone-200 p-8 space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-14 h-14 bg-brand-stone-100 text-brand-stone-400 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-brand-dark">Your shortlist is currently empty</h3>
            <p className="text-xs text-brand-stone-500 leading-relaxed">
              Explore our portfolio of estates and click the heart icon on any residence to curate your private collection.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/buy">
              <Button variant="gold" size="sm">Browse For Sale</Button>
            </Link>
            <Link to="/rent">
              <Button variant="outline" size="sm">Browse Rentals</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};
