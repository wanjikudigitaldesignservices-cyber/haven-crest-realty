import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty, useProperties } from '../../hooks/useProperties';
import { PropertyGallery } from '../../components/property/PropertyGallery';
import { PropertyCard } from '../../components/property/PropertyCard';
import { MapboxPropertyMap } from '../../components/map/MapboxPropertyMap';
import { ViewingRequestForm } from '../../components/forms/ViewingRequestForm';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/shared/SEOHead';
import { useSavedStore } from '../../store/savedStore';
import { formatCurrency, formatSqm } from '../../lib/utils';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  MessageSquare,
  CheckCircle2,
  Building,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading } = useProperty(slug);
  const { data: allProperties = [] } = useProperties();
  const { isSaved, toggleSaved } = useSavedStore();

  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-dark border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-6">
        <h1 className="font-display font-bold text-3xl text-brand-dark">Property Not Found</h1>
        <p className="text-sm text-brand-stone-500">
          The requested listing may have been sold, leased, or archived from the public registry.
        </p>
        <Link to="/buy">
          <Button variant="gold">View Active Residences</Button>
        </Link>
      </div>
    );
  }

  const saved = isSaved(property.id);
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.neighborhood_id === property.neighborhood_id || p.listing_type === property.listing_type))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title={property.title}
        description={property.description?.slice(0, 160) || undefined}
        ogImage={property.images?.[0]?.storage_path}
      />

      {/* Top Header: Breadcrumbs & Share/Save */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-stone-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-brand-stone-500">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <span>/</span>
          <Link to={property.listing_type === 'buy' ? '/buy' : '/rent'} className="hover:text-brand-dark capitalize">
            For {property.listing_type}
          </Link>
          <span>/</span>
          {property.neighborhood && (
            <>
              <Link to={`/neighborhoods/${property.neighborhood.slug}`} className="hover:text-brand-dark">
                {property.neighborhood.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-brand-dark font-medium truncate max-w-[200px]">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-stone-300 text-xs font-semibold text-brand-stone-700 hover:bg-brand-stone-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            onClick={() => toggleSaved(property.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              saved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'border-brand-stone-300 text-brand-stone-700 hover:bg-brand-stone-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-600' : ''}`} />
            <span>{saved ? 'Saved Residence' : 'Save Residence'}</span>
          </button>
        </div>
      </div>

      {/* Primary Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Details Grid: Left Content (2 cols) & Right Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Specs, Description, Amenities, Map */}
        <div className="lg:col-span-2 space-y-10">
          {/* Title & Key Pricing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-dark text-white">
                For {property.listing_type === 'buy' ? 'Sale' : 'Rent'}
              </span>
              {property.neighborhood && (
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-stone-100 text-brand-stone-800 border border-brand-stone-200">
                  {property.neighborhood.name}
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-brand-stone-500">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{property.address}</span>
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-brand-stone-500 font-bold block">
                {property.listing_type === 'buy' ? 'Guide Price' : 'Monthly Lease Term'}
              </span>
              <span className="font-display font-bold text-3xl sm:text-4xl text-brand-dark">
                {formatCurrency(property.price)}
                {property.listing_type === 'rent' && <span className="text-sm font-normal text-brand-stone-500"> / month</span>}
              </span>
            </div>
          </div>

          {/* Core Specs Metric Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-brand-stone-200 shadow-sm text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-brand-stone-400 text-xs">
                <Bed className="w-4 h-4" />
                <span>Bedrooms</span>
              </div>
              <p className="font-display font-bold text-xl text-brand-dark">{property.bedrooms ?? '—'}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-brand-stone-400 text-xs">
                <Bath className="w-4 h-4" />
                <span>Bathrooms</span>
              </div>
              <p className="font-display font-bold text-xl text-brand-dark">{property.bathrooms ?? '—'}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-brand-stone-400 text-xs">
                <Maximize2 className="w-4 h-4" />
                <span>Internal Area</span>
              </div>
              <p className="font-display font-bold text-xl text-brand-dark">{property.size_sqm ? `${property.size_sqm} m²` : '—'}</p>
            </div>
            <div className="space-y-1 hidden sm:block">
              <div className="flex items-center justify-center gap-1.5 text-brand-stone-400 text-xs">
                <Building className="w-4 h-4" />
                <span>Tenure</span>
              </div>
              <p className="font-display font-bold text-xl text-brand-dark">Freehold</p>
            </div>
          </div>

          {/* Architectural Narrative */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-brand-dark">Architectural Overview</h3>
            <div className="text-sm text-brand-stone-700 leading-relaxed space-y-3">
              <p>{property.description}</p>
            </div>
          </div>

          {/* Amenities & High-Specification Inclusions */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-brand-stone-200">
              <h3 className="font-display font-bold text-xl text-brand-dark">
                Distinguished Features & Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-stone-100 text-brand-stone-800 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geographic Location & Map */}
          <div className="space-y-4 pt-6 border-t border-brand-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-brand-dark">Location & Enclave</h3>
              <span className="text-xs text-brand-stone-500">{property.address}</span>
            </div>
            <MapboxPropertyMap properties={[property]} selectedPropertyId={property.id} className="h-[360px]" />
          </div>
        </div>

        {/* Right Sidebar: Agent Card & Viewing Action CTA */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-brand-stone-200 shadow-card sticky top-24 space-y-6">
            <div className="space-y-2 text-center pb-4 border-b border-brand-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                Exclusive Representation
              </span>
              <h3 className="font-display font-bold text-lg text-brand-dark">
                Private Viewing Appointment
              </h3>
              <p className="text-xs text-brand-stone-500">
                Discreet viewings available by prior appointment with security registration.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Button
                variant="gold"
                size="md"
                className="w-full"
                leftIcon={<Calendar className="w-4 h-4" />}
                onClick={() => setIsViewingModalOpen(true)}
              >
                Schedule Private Viewing
              </Button>
              <Link to="/valuation" className="block">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Request Comparative Valuation
                </Button>
              </Link>
            </div>

            {/* Agent Info Card */}
            {property.agent && (
              <div className="pt-4 border-t border-brand-stone-100 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      property.agent.profile?.avatar_url ||
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'
                    }
                    alt={property.agent.profile?.full_name || 'Agent'}
                    className="w-12 h-12 rounded-full object-cover border border-brand-gold/40 shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-dark">
                      {property.agent.profile?.full_name}
                    </h4>
                    <p className="text-[11px] text-brand-stone-500">
                      Senior Broker · {property.agent.license_number}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {property.agent.whatsapp_number && (
                    <a
                      href={`https://wa.me/${property.agent.whatsapp_number.replace(/[^\d]/g, '')}?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                        leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                      >
                        WhatsApp
                      </Button>
                    </a>
                  )}
                  {property.agent.profile?.phone && (
                    <a href={`tel:${property.agent.profile.phone}`} className="flex-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs"
                        leftIcon={<Phone className="w-3.5 h-3.5" />}
                      >
                        Direct Call
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-brand-stone-100 flex items-center justify-center gap-1.5 text-[10px] text-brand-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Full Fiduciary Client Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR PROPERTIES SECTION */}
      {similarProperties.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-brand-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Curated Recommendations
              </span>
              <h2 className="font-display font-bold text-2xl text-brand-dark mt-1">
                Similar Premier Residences
              </h2>
            </div>
            <Link to={property.listing_type === 'buy' ? '/buy' : '/rent'}>
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Schedule Viewing Modal */}
      <Modal
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
        title="Schedule Private Viewing"
        description="Select your preferred date and time for an exclusive walkthrough."
      >
        <ViewingRequestForm
          propertyId={property.id}
          propertyTitle={property.title}
          onSuccess={() => setIsViewingModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
