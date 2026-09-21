import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockDb } from '../lib/supabaseClient';
import { Lead, LeadStatus } from '../types/database';
import { trackEvent } from '../lib/analytics';

export function useLeads(agentId?: string) {
  return useQuery({
    queryKey: ['leads', agentId],
    queryFn: async () => {
      let leads = mockDb.getLeads();
      if (agentId) {
        leads = leads.filter(l => l.assigned_agent_id === agentId);
      }
      return leads;
    },
  });
}

export function useSubmitLeadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (leadPayload: Omit<Lead, 'id' | 'created_at' | 'status'>) => {
      // 1. Bot honeypot check (handled upstream or ignored)
      // 2. Routing assignment: if property_id provided, assign to property agent or round-robin
      let assignedAgentId = leadPayload.assigned_agent_id;
      if (!assignedAgentId && leadPayload.property_id) {
        const prop = mockDb.getProperties().find(p => p.id === leadPayload.property_id);
        if (prop?.agent_id) {
          assignedAgentId = prop.agent_id;
        }
      }

      if (!assignedAgentId) {
        const agents = mockDb.getAgents().filter(a => a.is_active);
        if (agents.length > 0) {
          assignedAgentId = agents[Math.floor(Math.random() * agents.length)].id;
        }
      }

      const newLead: Lead = {
        ...leadPayload,
        id: `lead-${Date.now()}`,
        status: 'new',
        assigned_agent_id: assignedAgentId || null,
        created_at: new Date().toISOString(),
      };

      const saved = mockDb.addLead(newLead);
      trackEvent('lead_submitted', { lead_type: newLead.type, property_id: newLead.property_id || undefined });
      return saved;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useUpdateLeadStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, assignedAgentId }: { id: string; status: LeadStatus; assignedAgentId?: string }) => {
      return mockDb.updateLeadStatus(id, status, assignedAgentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
