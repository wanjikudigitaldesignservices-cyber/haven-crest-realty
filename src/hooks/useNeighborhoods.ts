import { useQuery } from '@tanstack/react-query';
import { mockDb } from '../lib/supabaseClient';
import { Neighborhood } from '../types/database';

export function useNeighborhoods() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: async () => {
      return mockDb.getNeighborhoods();
    },
  });
}

export function useNeighborhood(slug: string | undefined) {
  return useQuery({
    queryKey: ['neighborhood', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const neighborhoods = await mockDb.getNeighborhoods();
      return neighborhoods.find(n => n.slug === slug) || null;
    },
  });
}
