import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyFormSchema, PropertyFormData } from '../../lib/validators';
import { useProperties, useUpdatePropertyStatusMutation } from '../../hooks/useProperties';
import { useNeighborhoods } from '../../hooks/useNeighborhoods';
import { mockDb } from '../../lib/supabaseClient';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const EditListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: properties = [] } = useProperties();
  const { data: neighborhoods = [] } = useNeighborhoods();

  const property = properties.find((p) => p.id === id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFormSchema),
  });

  useEffect(() => {
    if (property) {
      setValue('title', property.title);
      setValue('listing_type', property.listing_type);
      setValue('status', property.status);
      setValue('price', property.price);
      setValue('bedrooms', property.bedrooms || 0);
      setValue('bathrooms', property.bathrooms || 0);
      setValue('size_sqm', property.size_sqm || 0);
      setValue('neighborhood_id', property.neighborhood_id || '');
      setValue('address', property.address || '');
      setValue('description', property.description || '');
      setValue('amenities', property.amenities || []);
      setValue('images', property.images?.map((img) => img.storage_path) || []);
      setValue('featured', property.featured || false);
    }
  }, [property, setValue]);

  const onSubmit = async (data: PropertyFormData) => {
    if (id) {
      mockDb.updateProperty(id, {
        title: data.title,
        listing_type: data.listing_type,
        status: data.status,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        size_sqm: data.size_sqm,
        neighborhood_id: data.neighborhood_id,
        address: data.address,
        description: data.description,
        amenities: data.amenities,
      });
    }
    navigate('/agent/listings');
  };

  if (!property) {
    return (
      <DashboardShell portal="agent">
        <div className="py-20 text-center space-y-4">
          <p className="text-sm text-brand-stone-500">Property not found or access restricted.</p>
          <Link to="/agent/listings">
            <Button variant="gold" size="sm">Return to Listings</Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell portal="agent">
      <SEOHead title={`Edit ${property.title}`} />

      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            to="/agent/listings"
            className="inline-flex items-center gap-1.5 text-xs text-brand-stone-500 hover:text-brand-dark mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Listings</span>
          </Link>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
            Edit Listing Particulars
          </h1>
          <p className="text-xs text-brand-stone-500">{property.title}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card space-y-6">
          <div className="space-y-4">
            <Input
              label="Listing Title *"
              error={errors.title?.message}
              {...register('title')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Transaction Type *"
                error={errors.listing_type?.message}
                {...register('listing_type')}
              >
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </Select>

              <Input
                label="Guide Price (KES) *"
                type="number"
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
              label="Street Address / Location *"
              error={errors.address?.message}
              {...register('address')}
            />

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
                label="Size (sqm) *"
                type="number"
                error={errors.size_sqm?.message}
                {...register('size_sqm')}
              />
            </div>

            <Textarea
              label="Description *"
              rows={4}
              error={errors.description?.message}
              {...register('description')}
            />
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
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Modifications
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};
