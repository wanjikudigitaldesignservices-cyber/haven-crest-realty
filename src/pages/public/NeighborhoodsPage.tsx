import React from 'react';
import { Link } from 'react-router-dom';
import { useNeighborhoods } from '../../hooks/useNeighborhoods';
import { useProperties } from '../../hooks/useProperties';
import { SEOHead } from '../../components/shared/SEOHead';
import { ArrowRight, Compass, Building2 } from 'lucide-react';

export const NeighborhoodsPage: React.FC = () => {
  const { data: neighborhoods = [] } = useNeighborhoods();
  const { data: properties = [] } = useProperties();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="Prime Neighborhoods & Enclaves"
        description="Comprehensive guides to Nairobi’s premier luxury real estate corridors: Karen, Muthaiga, Kitisuru, and Riverside."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Spatial Intelligence
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Prime Enclave Guides
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          Each enclave possesses a distinct character, zoning regulations, and capital appreciation velocity. Explore detailed neighborhood dossiers and active residences.
        </p>
      </div>

      {/* Neighborhood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {neighborhoods.map((n) => {
          const activeCount = properties.filter((p) => p.neighborhood_id === n.id).length;

          return (
            <Link
              key={n.id}
              to={`/neighborhoods/${n.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-stone-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-brand-stone-100">
                <img
                  src={n.hero_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                  alt={n.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <h3 className="font-display font-bold text-2xl">{n.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/20 backdrop-blur-md">
                    {activeCount} Active Residences
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-brand-stone-600 leading-relaxed">
                  {n.description}
                </p>

                <div className="pt-3 border-t border-brand-stone-100 flex items-center justify-between text-xs">
                  <span className="text-brand-stone-500 font-medium">Diplomatic & Executive Profile</span>
                  <span className="font-semibold text-brand-dark flex items-center gap-1 group-hover:text-brand-gold-dark group-hover:translate-x-1 transition-all">
                    <span>View Dossier & Homes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
