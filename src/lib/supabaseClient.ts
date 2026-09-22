import axios from 'axios';
import { Property, Agent, Neighborhood, BlogPost, Lead, Profile } from '../types/database';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Automatically inject Auth0 token into requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================================
// API REPOSITORY
// ==========================================

export const mockDb = {
  getProperties: async (): Promise<Property[]> => {
    const { data } = await apiClient.get<Property[]>('/properties');
    return data;
  },
  getPropertyBySlug: async (slug: string): Promise<Property | undefined> => {
    try {
      const { data } = await apiClient.get<Property>(`/properties/${slug}`);
      return data;
    } catch {
      return undefined;
    }
  },
  addProperty: async (property: Property): Promise<Property> => {
    const { data } = await apiClient.post<Property>('/properties', property);
    return data;
  },
  updateProperty: async (id: string, updates: Partial<Property>): Promise<Property | null> => {
    const { data } = await apiClient.patch<Property>(`/properties/${id}`, updates);
    return data;
  },
  deleteProperty: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/properties/${id}`);
    return true;
  },

  getAgents: async (): Promise<Agent[]> => {
    const { data } = await apiClient.get<Agent[]>('/agents');
    return data;
  },
  updateAgent: async (id: string, updates: Partial<Agent>): Promise<Agent | null> => {
    const { data } = await apiClient.patch<Agent>(`/agents/${id}`, updates);
    return data;
  },
  addAgent: async (agent: Agent): Promise<Agent> => {
    const { data } = await apiClient.post<Agent>('/agents', agent);
    return data;
  },

  getNeighborhoods: async (): Promise<Neighborhood[]> => {
    const { data } = await apiClient.get<Neighborhood[]>('/neighborhoods');
    return data;
  },

  getBlogs: async (): Promise<BlogPost[]> => {
    const { data } = await apiClient.get<BlogPost[]>('/blogs');
    return data;
  },
  addBlogPost: async (post: BlogPost): Promise<BlogPost> => {
    const { data } = await apiClient.post<BlogPost>('/blogs', post);
    return data;
  },
  updateBlogPost: async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
    const { data } = await apiClient.patch<BlogPost>(`/blogs/${id}`, updates);
    return data;
  },

  getLeads: async (): Promise<Lead[]> => {
    const { data } = await apiClient.get<Lead[]>('/leads');
    return data;
  },
  addLead: async (lead: Lead): Promise<Lead> => {
    const { data } = await apiClient.post<Lead>('/leads', lead);
    return data;
  },
  updateLeadStatus: async (id: string, status: Lead['status'], assignedAgentId?: string): Promise<Lead | null> => {
    const { data } = await apiClient.patch<Lead>(`/leads/${id}/status`, { status, assigned_agent_id: assignedAgentId });
    return data;
  },

  // Mocked out methods for Saved functionality since it's local only for visitors right now
  getSavedListingIds: (visitorId: string): string[] => {
    return [];
  },
  toggleSavedListing: (visitorId: string, propertyId: string): boolean => {
    return true;
  },

  getProfiles: async (): Promise<Profile[]> => {
    const { data } = await apiClient.get<Profile[]>('/profiles');
    return data;
  }
};

// Legacy exports to prevent breaks if used elsewhere
export const supabase = null;
export const isLiveSupabaseConfigured = false;
