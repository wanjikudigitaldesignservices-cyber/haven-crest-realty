import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types/database';
import { formatCurrency, formatSqm } from '../../lib/utils';
import { useSavedStore } from '../../store/savedStore';
import { Bed, Bath, Maximize2, Heart, MapPin, Eye } from 'lucide-react';
import { ListingTypeBadge, StatusBadge } from '../ui/Badge';

interface PropertyCardProps {
  property: Property;
  showStatus?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, showStatus = false }) => {
  const { isSaved, toggleSaved } = useSavedStore();
  const saved = isSaved(property.id);

  const heroImage =
    property.images && property.images.length > 0
      ? property.images[0].storage_path
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(property.id);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-brand-stone-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
      {/* Image Container with Fixed 16:10 or 4:3 Aspect Ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-stone-100">
        <img
          src={heroImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <ListingTypeBadge type={property.listing_type} />
            {property.featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-dark shadow-sm">
                Featured
              </span>
            )}
            {showStatus && <StatusBadge status={property.status} />}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto ${
              saved
                ? 'bg-rose-500 text-white shadow-md scale-110'
                : 'bg-white/80 hover:bg-white text-brand-stone-700 hover:text-rose-500 shadow-sm'
            }`}
            title={saved ? 'Remove from saved' : 'Save residence'}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Price on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-xs uppercase tracking-wider text-brand-gold font-semibold block">
              {property.listing_type === 'buy' ? 'Guide Price' : 'Monthly Lease'}
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-white drop-shadow-sm">
              {formatCurrency(property.price)}
              {property.listing_type === 'rent' && (
                <span className="text-xs text-brand-stone-300 font-normal"> /mo</span>
              )}
            </span>
          </div>

          {property.neighborhood && (
            <span className="text-xs text-brand-stone-200 bg-brand-dark/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
              {property.neighborhood.name}
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/property/${property.slug}`} className="block group-hover:text-brand-gold-dark transition-colors">
            <h3 className="font-display font-bold text-base sm:text-lg text-brand-dark line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-brand-stone-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="line-clamp-1">{property.address || 'Nairobi Prime'}</span>
          </div>
        </div>

        {/* Bed / Bath / Sqm Icon Row */}
        <div className="pt-3 border-t border-brand-stone-100 grid grid-cols-3 gap-2 text-brand-stone-700 text-xs">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-brand-stone-400" />
            <span className="font-medium">{property.bedrooms ?? '—'} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-brand-stone-400" />
            <span className="font-medium">{property.bathrooms ?? '—'} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-brand-stone-400" />
            <span className="font-medium">{property.size_sqm ? `${property.size_sqm} m²` : '—'}</span>
          </div>
        </div>

        {/* Footer with Agent Avatar & CTA */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={
                property.agent?.profile?.avatar_url ||
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80'
              }
              alt={property.agent?.profile?.full_name || 'Agent'}
              className="w-6 h-6 rounded-full object-cover border border-brand-stone-200"
            />
            <span className="text-[11px] text-brand-stone-500 font-medium truncate max-w-[110px]">
              {property.agent?.profile?.full_name || 'Haven Broker'}
            </span>
          </div>

          <Link
            to={`/property/${property.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-dark hover:text-brand-gold transition-colors"
          >
            <span>View Residence</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
