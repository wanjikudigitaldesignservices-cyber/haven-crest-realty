import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyFormSchema, PropertyFormData } from '../../lib/validators';
import { useSavePropertyMutation } from '../../hooks/useProperties';
import { useNeighborhoods } from '../../hooks/useNeighborhoods';
import { useAuthStore } from '../../store/authStore';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { slugify } from '../../lib/utils';
import { PlusCircle, Image, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: neighborhoods = [] } = useNeighborhoods();
  const saveMutation = useSavePropertyMutation();

  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [newImageInput, setNewImageInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      listing_type: 'buy',
      status: 'pending_approval',
      bedrooms: 4,
      bathrooms: 4,
      size_sqm: 450,
      amenities: ['Infinity Pool', 'Staff Quarters', 'Solar Battery Microgrid'],
      images: imageUrls,
      featured: false,
    },
  });

  const handleAddImage = () => {
    if (newImageInput.trim()) {
      const updated = [...imageUrls, newImageInput.trim()];
      setImageUrls(updated);
      setValue('images', updated);
      setNewImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updated);
    setValue('images', updated);
  };

  const onSubmit = async (data: PropertyFormData) => {
    const newPropertyId = `prop-${Date.now()}`;
    const slug = `${slugify(data.title)}-${Date.now().toString().slice(-4)}`;

    await saveMutation.mutateAsync({
      id: newPropertyId,
      agent_id: user?.id || 'usr-agent-marcus',
      neighborhood_id: data.neighborhood_id,
      slug,
      title: data.title,
      description: data.description,
      listing_type: data.listing_type,
      status: data.status,
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      size_sqm: data.size_sqm,
      address: data.address,
      featured: data.featured,
      amenities: data.amenities,
      lat: -1.286389,
      lng: 36.817223,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      images: data.images.map((url, i) => ({
        id: `img-${newPropertyId}-${i}`,
        property_id: newPropertyId,
        storage_path: url,
        position: i,
      })),
    });

    navigate('/agent/listings');
  };

  return (
    <DashboardShell portal="agent">
      <SEOHead title="Draft New Property Listing" />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/agent/listings"
              className="inline-flex items-center gap-1.5 text-xs text-brand-stone-500 hover:text-brand-dark mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to My Listings</span>
            </Link>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              Draft New Luxury Listing
            </h1>
            <p className="text-xs text-brand-stone-500">
              Complete the architectural particulars below. Submissions undergo administrative moderation before public syndication.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card space-y-6">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-brand-dark border-b border-brand-stone-100 pb-2">
              1. Basic Mandate Particulars
            </h3>

            <Input
              label="Listing Title *"
              placeholder="e.g. The Waterfall Residence at Kitisuru Ravine"
              error={errors.title?.message}
              {...register('title')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Transaction Type *"
                error={errors.listing_type?.message}
                {...register('listing_type')}
              >
                <option value="buy">For Sale (Acquisition)</option>
                <option value="rent">For Rent (Lease)</option>
              </Select>

              <Input
                label="Guide Price (KES) *"
                type="number"
                placeholder="250000000"
                error={errors.price?.message}
                {...register('price')}
              />

              <Select
                label="Neighborhood Enclave *"
                error={errors.neighborhood_id?.message}
                {...register('neighborhood_id')}
              >
                <option value="">Select Enclave</option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </Select>
            </div>

            <Input
              label="Specific Street Address / Location *"
              placeholder="e.g. Tate Close, Kitisuru, Nairobi"
              error={errors.address?.message}
              {...register('address')}
            />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-display font-bold text-lg text-brand-dark border-b border-brand-stone-100 pb-2">
              2. Dimensions & Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Bedrooms *"
                type="number"
                error={errors.bedrooms?.message}
                {...register('bedrooms')}
              />
              <Input
                label="Bathrooms *"
                type="number"
                error={errors.bathrooms?.message}
                {...register('bathrooms')}
              />
              <Input
                label="Internal Area (sqm) *"
                type="number"
                error={errors.size_sqm?.message}
                {...register('size_sqm')}
              />
            </div>

            <Textarea
              label="Architectural Description *"
              placeholder="Provide architectural narrative, construction finishes, natural lighting, and luxury attributes..."
              rows={4}
              error={errors.description?.message}
              {...register('description')}
            />
          </div>

          {/* Photo Gallery Assets */}
          <div className="space-y-4 pt-4">
            <h3 className="font-display font-bold text-lg text-brand-dark border-b border-brand-stone-100 pb-2">
              3. High-Resolution Photographs
            </h3>

            <div className="flex gap-2">
              <Input
                placeholder="Paste public image URL (Unsplash or Supabase Storage)..."
                value={newImageInput}
                onChange={(e) => setNewImageInput(e.target.value)}
              />
              <Button type="button" variant="secondary" onClick={handleAddImage} className="shrink-0 text-xs">
                Add Photo
              </Button>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden aspect-[4/3] border border-brand-stone-200 group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white text-xs hover:bg-rose-600 transition-colors"
                  >
                    ✕
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-brand-dark/80 text-[9px] font-bold text-brand-gold uppercase">
                      Hero
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-brand-stone-100 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/agent/listings')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              isLoading={saveMutation.isPending}
            >
              Submit for Admin Moderation
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};
