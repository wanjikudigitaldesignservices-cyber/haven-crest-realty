import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { useNeighborhoods } from '../../hooks/useNeighborhoods';
import { useAgents } from '../../hooks/useAgents';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { PropertyCard } from '../../components/property/PropertyCard';
import { AgentCard } from '../../components/agent/AgentCard';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/shared/SEOHead';
import { SITE_CONFIG } from '../../config/site';
import { 
  Building2, 
  ArrowRight, 
  Compass, 
  Shield, 
  Award, 
  TrendingUp, 
  CheckCircle,
  Search,
  KeyRound,
  FileCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { data: properties = [] } = useProperties();
  const { data: neighborhoods = [] } = useNeighborhoods();
  const { data: agents = [] } = useAgents();
  const { data: blogPosts = [] } = useBlogPosts();

  const featuredProperties = properties.filter((p) => p.featured || p.status === 'published').slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      <SEOHead
        title="Luxury Residences & Private Estates"
        description="Exclusive representation for premier architectural properties, private diplomatic estates, and off-market residences in Nairobi."
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-dark pt-20">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Residence"
            className="w-full h-full object-cover object-center brightness-[0.45] scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Prime Real Estate Advisory & Brokerage</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
            Architectural Eminence. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark">
              Curated Exclusivity.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-brand-stone-200 max-w-2xl mx-auto font-light leading-relaxed">
            Representing premier trophy residences, secluded suburban sanctuaries, and panoramic sky penthouses across East Africa’s most distinguished enclaves.
          </p>

          {/* Quick Search Card */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-stone-500 mb-1">
                  Looking to
                </label>
                <div className="flex gap-1">
                  <Link to="/buy" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Purchase
                    </Button>
                  </Link>
                  <Link to="/rent" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Lease
                    </Button>
                  </Link>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-stone-500 mb-1">
                  Neighborhood
                </label>
                <Link to="/neighborhoods" className="block">
                  <div className="w-full py-2 px-3 text-xs bg-brand-stone-100 rounded-lg border border-brand-stone-200 text-brand-stone-700 flex items-center justify-between">
                    <span>Karen, Muthaiga, Kitisuru...</span>
                    <Compass className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                </Link>
              </div>

              <div className="flex items-end">
                <Link to="/search" className="w-full">
                  <Button variant="gold" size="md" className="w-full text-xs" leftIcon={<Search className="w-4 h-4" />}>
                    Explore All Residences
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-white/10 text-white/90">
            <div>
              <p className="font-display font-bold text-lg sm:text-2xl text-brand-gold">KES 24B+</p>
              <p className="text-[11px] text-brand-stone-400">Transactions Advised</p>
            </div>
            <div>
              <p className="font-display font-bold text-lg sm:text-2xl text-brand-gold">100%</p>
              <p className="text-[11px] text-brand-stone-400">Fiduciary Verification</p>
            </div>
            <div>
              <p className="font-display font-bold text-lg sm:text-2xl text-brand-gold">14 Yrs</p>
              <p className="text-[11px] text-brand-stone-400">Legacy Reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              Exclusive Portfolio
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-dark mt-1">
              Curated Residences & Estates
            </h2>
          </div>
          <Link to="/buy">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Properties For Sale
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* NEIGHBORHOOD ENCLAVES */}
      <section className="bg-brand-stone-100 py-20 border-y border-brand-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold-dark uppercase tracking-widest">
              Prime Corridors
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-dark">
              Explore Nairobi’s Premier Neighborhoods
            </h2>
            <p className="text-sm text-brand-stone-600 leading-relaxed">
              From tranquil suburban arboretums to cosmopolitan diplomatic enclaves, discover the character, amenities, and lifestyle of each location.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((n) => (
              <Link
                key={n.id}
                to={`/neighborhoods/${n.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card block"
              >
                <img
                  src={n.hero_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                  alt={n.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <h3 className="font-display font-bold text-xl">{n.name}</h3>
                  <p className="text-xs text-brand-stone-300 line-clamp-2">{n.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-gold font-semibold pt-2 group-hover:translate-x-1 transition-transform">
                    <span>Explore Enclave</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE VALUATION & ADVISORY CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-brand-gold/30">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-2">
              <KeyRound className="w-4 h-4" />
              <span>Private Seller Representation</span>
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl leading-tight">
              Thinking of Listing Your Trophy Residence?
            </h2>
            <p className="text-sm sm:text-base text-brand-stone-300 leading-relaxed font-light">
              Receive a confidential valuation dossier backed by comparative sales analysis, capital appreciation indices, and vetted high-net-worth buyer demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/valuation">
                <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request Property Valuation
                </Button>
              </Link>
              <Link to="/schedule-viewing">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Schedule Private Viewing
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 hidden lg:block pointer-events-none">
            <Building2 className="w-full h-full text-brand-gold object-contain" />
          </div>
        </div>
      </section>

      {/* SENIOR BROKERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              Unrivaled Counsel
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-dark mt-1">
              Meet Our Senior Advisory Partners
            </h2>
          </div>
          <Link to="/agents">
            <Button variant="outline" size="sm">
              All Brokers & Specialists
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.slice(0, 3).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* LATEST INSIGHTS & MARKET RESEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              Intelligence & Due Diligence
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-dark mt-1">
              Prime Market Reports & Insights
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline" size="sm">
              Read All Reports
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.slice(0, 2).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-stone-200 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/2 aspect-[16/10] sm:aspect-auto overflow-hidden bg-brand-stone-100">
                <img
                  src={post.cover_image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {post.tags?.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-dark group-hover:text-brand-gold-dark transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-brand-stone-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Market Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
