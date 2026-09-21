import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockDb, supabase, isLiveSupabaseConfigured } from '../lib/supabaseClient';
import { Property, PropertyStatus } from '../types/database';
import { PropertyFilterState } from '../types';

export function useProperties(filters?: PropertyFilterState) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let properties: Property[] = [];

      if (isLiveSupabaseConfigured && supabase) {
        let query = supabase.from('properties').select(`
          *,
          agent:agents(*, profile:profiles(*)),
          neighborhood:neighborhoods(*),
          images:property_images(*)
        `);

        if (filters?.listing_type && filters.listing_type !== 'all') {
          query = query.eq('listing_type', filters.listing_type);
        }
        if (filters?.neighborhood_id) {
          query = query.eq('neighborhood_id', filters.neighborhood_id);
        }
        if (filters?.min_price) {
          query = query.gte('price', filters.min_price);
        }
        if (filters?.max_price) {
          query = query.lte('price', filters.max_price);
        }

        const { data, error } = await query;
        if (!error && data) {
          properties = data as Property[];
        } else {
          properties = mockDb.getProperties();
        }
      } else {
        properties = mockDb.getProperties();
      }

      // Filter locally for smooth mock and responsive experience
      if (filters) {
        if (filters.listing_type && filters.listing_type !== 'all') {
          properties = properties.filter(p => p.listing_type === filters.listing_type);
        }
        if (filters.neighborhood_id) {
          properties = properties.filter(p => p.neighborhood_id === filters.neighborhood_id);
        }
        if (filters.min_price) {
          properties = properties.filter(p => p.price >= filters.min_price!);
        }
        if (filters.max_price) {
          properties = properties.filter(p => p.price <= filters.max_price!);
        }
        if (filters.bedrooms && filters.bedrooms !== 'any') {
          properties = properties.filter(p => (p.bedrooms || 0) >= Number(filters.bedrooms));
        }
        if (filters.bathrooms && filters.bathrooms !== 'any') {
          properties = properties.filter(p => (p.bathrooms || 0) >= Number(filters.bathrooms));
        }
        if (filters.keyword && filters.keyword.trim()) {
          const kw = filters.keyword.toLowerCase().trim();
          properties = properties.filter(p => 
            p.title.toLowerCase().includes(kw) ||
            (p.description && p.description.toLowerCase().includes(kw)) ||
            (p.address && p.address.toLowerCase().includes(kw)) ||
            (p.neighborhood && p.neighborhood.name.toLowerCase().includes(kw))
          );
        }

        // Sorting
        if (filters.sort === 'price_asc') {
          properties.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price_desc') {
          properties.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'size_desc') {
          properties.sort((a, b) => (b.size_sqm || 0) - (a.size_sqm || 0));
        } else {
          // newest
          properties.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
      }

      return properties;
    },
  });
}

export function useProperty(slug: string | undefined) {
  return useQuery({
    queryKey: ['property', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      if (!slug) return null;
      const prop = mockDb.getPropertyBySlug(slug);
      return prop || null;
    },
  });
}

export function useSavePropertyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (property: Property) => {
      return mockDb.addProperty(property);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdatePropertyStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: PropertyStatus }) => {
      return mockDb.updateProperty(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}
