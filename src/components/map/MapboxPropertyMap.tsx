import React, { useState } from 'react';
import { Property } from '../../types/database';
import { formatCurrency } from '../../lib/utils';
import { MapPin, Navigation, ExternalLink, Plus, Minus, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapboxPropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (id: string) => void;
  className?: string;
  zoom?: number;
}

export const MapboxPropertyMap: React.FC<MapboxPropertyMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  className = 'h-[450px]',
  zoom = 12,
}) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties.find((p) => p.id === selectedPropertyId) || properties[0] || null
  );

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-brand-stone-300 shadow-card bg-[#0F172A] ${className}`}>
      {/* Interactive Luxury Vector Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1320] via-[#152238] to-[#1E2D4A] overflow-hidden select-none">
        {/* Vector Grid & Topographical Contour Lines */}
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A880" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          {/* Topographical styled curves */}
          <path d="M0,150 Q300,50 600,200 T1200,100" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M0,280 Q400,320 800,180 T1400,260" fill="none" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M100,0 Q250,400 700,350 T1300,450" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
        </svg>

        {/* Nairobi Prime Corridors Visual Labels */}
        <div className="absolute top-8 left-10 text-[10px] font-bold tracking-widest text-brand-gold/60 uppercase">
          Muthaiga Diplomatic Enclave
        </div>
        <div className="absolute top-24 left-1/3 text-[10px] font-bold tracking-widest text-brand-gold/60 uppercase">
          Kitisuru Valley & Ridge
        </div>
        <div className="absolute top-1/2 right-12 text-[10px] font-bold tracking-widest text-brand-gold/60 uppercase">
          Riverside & Westlands Corridor
        </div>
        <div className="absolute bottom-12 left-1/4 text-[10px] font-bold tracking-widest text-brand-gold/60 uppercase">
          Karen Botanical Sanctuary
        </div>

        {/* Property Pins scattered dynamically */}
        <div className="absolute inset-0 p-8 sm:p-12">
          {properties.map((prop, idx) => {
            // Calculate a pseudo-geographic placement inside viewport bounds
            const positions = [
              { top: '68%', left: '26%' }, // Karen
              { top: '22%', left: '22%' }, // Muthaiga
              { top: '42%', left: '72%' }, // Riverside
              { top: '34%', left: '46%' }, // Kitisuru
              { top: '48%', left: '62%' }, // Riverside
              { top: '76%', left: '34%' }, // Karen
              { top: '28%', left: '52%' }, // Kitisuru
            ];
            const pos = positions[idx % positions.length];
            const isSelected = activeProperty?.id === prop.id;

            return (
              <div
                key={prop.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => {
                  setActiveProperty(prop);
                  if (onSelectProperty) onSelectProperty(prop.id);
                }}
              >
                {/* Pin Head */}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-lg ${
                    isSelected
                      ? 'bg-brand-gold text-brand-dark scale-110 ring-4 ring-brand-gold/30'
                      : 'bg-brand-dark/90 text-white border border-brand-gold/50 hover:bg-brand-gold hover:text-brand-dark'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{formatCurrency(prop.price)}</span>
                </div>

                {/* Pulsing ring indicator */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-brand-gold/30 animate-ping pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
        <button
          className="p-2 rounded-lg bg-brand-dark/80 hover:bg-brand-dark text-white border border-white/10 backdrop-blur-md shadow-sm transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg bg-brand-dark/80 hover:bg-brand-dark text-white border border-white/10 backdrop-blur-md shadow-sm transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg bg-brand-dark/80 hover:bg-brand-dark text-brand-gold border border-white/10 backdrop-blur-md shadow-sm transition-colors"
          title="Recenter"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Property Popup Card */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-30 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-modal border border-brand-stone-200">
          <div className="flex gap-3">
            <img
              src={
                activeProperty.images?.[0]?.storage_path ||
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
              }
              alt={activeProperty.title}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-wider">
                  {activeProperty.neighborhood?.name || 'Exclusive'} · For {activeProperty.listing_type}
                </span>
                <h4 className="font-display font-bold text-xs text-brand-dark truncate mt-0.5">
                  {activeProperty.title}
                </h4>
                <p className="text-xs font-extrabold text-brand-dark mt-0.5">
                  {formatCurrency(activeProperty.price)}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-brand-stone-500">
                <span>{activeProperty.bedrooms} Beds · {activeProperty.bathrooms} Baths</span>
                <Link
                  to={`/property/${activeProperty.slug}`}
                  className="font-bold text-brand-dark hover:text-brand-gold flex items-center gap-0.5"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
