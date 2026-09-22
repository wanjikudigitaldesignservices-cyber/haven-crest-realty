import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockDb } from '../lib/supabaseClient';
import { Agent } from '../types/database';

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      return mockDb.getAgents();
    },
  });
}

export function useAgent(idOrSlug: string | undefined) {
  return useQuery({
    queryKey: ['agent', idOrSlug],
    enabled: Boolean(idOrSlug),
    queryFn: async () => {
      const agents = await mockDb.getAgents();
      return agents.find(a => a.id === idOrSlug || a.profile?.full_name?.toLowerCase().replace(/\s+/g, '-') === idOrSlug) || null;
    },
  });
}

export function useUpdateAgentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Agent> }) => {
      return mockDb.updateAgent(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });
}
