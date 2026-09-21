import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { ViewingRequestForm } from '../../components/forms/ViewingRequestForm';
import { SEOHead } from '../../components/shared/SEOHead';
import { Calendar, ShieldCheck, MapPin, Clock } from 'lucide-react';

export const ScheduleViewingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const propertyIdFromUrl = searchParams.get('propertyId') || undefined;
  const { data: properties = [] } = useProperties();

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>(propertyIdFromUrl);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title="Schedule a Private Viewing Appointment"
        description="Book a private walkthrough for prime luxury residences with Haven Crest Real Estate."
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Private Itinerary
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-dark">
          Schedule Private Viewing
        </h1>
        <p className="text-sm text-brand-stone-600 leading-relaxed">
          Walkthroughs are conducted discreetly with a licensed senior broker. Please select your desired residence and itinerary details below.
        </p>
      </div>

      {/* Property Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone-600 mb-2">
            Select Desired Residence
          </label>
          <select
            value={selectedPropertyId || ''}
            onChange={(e) => setSelectedPropertyId(e.target.value || undefined)}
            className="w-full rounded-xl border border-brand-stone-300 p-3 text-sm font-medium text-brand-stone-800 bg-brand-stone-50/50 focus:outline-none focus:border-brand-dark"
          >
            <option value="">-- Choose from Available Residences --</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.neighborhood?.name || 'Exclusive'} · For {p.listing_type})
              </option>
            ))}
          </select>
        </div>

        {selectedProperty && (
          <div className="flex gap-4 p-4 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 items-center">
            <img
              src={
                selectedProperty.images?.[0]?.storage_path ||
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80'
              }
              alt={selectedProperty.title}
              className="w-20 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-bold text-sm text-brand-dark truncate">
                {selectedProperty.title}
              </h4>
              <p className="text-xs text-brand-stone-500">{selectedProperty.address}</p>
            </div>
          </div>
        )}

        <ViewingRequestForm
          propertyId={selectedPropertyId}
          propertyTitle={selectedProperty?.title}
        />
      </div>
    </div>
  );
};
