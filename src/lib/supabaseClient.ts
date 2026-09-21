import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  MOCK_PROPERTIES, 
  MOCK_AGENTS, 
  MOCK_NEIGHBORHOODS, 
  MOCK_BLOG_POSTS, 
  MOCK_LEADS, 
  MOCK_PROFILES 
} from './mockData';
import { Property, Agent, Neighborhood, BlogPost, Lead, Profile } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isLiveSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('https://')
);

export const supabase: SupabaseClient | null = isLiveSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// LOCAL STORAGE MOCK REPOSITORY (Fallback)
// ==========================================

const STORAGE_KEYS = {
  PROPERTIES: 'haven_properties_v1',
  AGENTS: 'haven_agents_v1',
  NEIGHBORHOODS: 'haven_neighborhoods_v1',
  BLOGS: 'haven_blogs_v1',
  LEADS: 'haven_leads_v1',
  SAVED: 'haven_saved_listings_v1',
  PROFILES: 'haven_profiles_v1',
};

function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn('Storage set failed', err);
  }
}

export const mockDb = {
  getProperties: (): Property[] => {
    return getStored<Property[]>(STORAGE_KEYS.PROPERTIES, MOCK_PROPERTIES);
  },
  saveProperties: (props: Property[]) => {
    setStored(STORAGE_KEYS.PROPERTIES, props);
  },
  getPropertyBySlug: (slug: string): Property | undefined => {
    const properties = mockDb.getProperties();
    return properties.find(p => p.slug === slug);
  },
  addProperty: (property: Property): Property => {
    const properties = mockDb.getProperties();
    const updated = [property, ...properties];
    mockDb.saveProperties(updated);
    return property;
  },
  updateProperty: (id: string, updates: Partial<Property>): Property | null => {
    const properties = mockDb.getProperties();
    const idx = properties.findIndex(p => p.id === id);
    if (idx === -1) return null;
    properties[idx] = { ...properties[idx], ...updates, updated_at: new Date().toISOString() };
    mockDb.saveProperties(properties);
    return properties[idx];
  },
  deleteProperty: (id: string): boolean => {
    const properties = mockDb.getProperties();
    const filtered = properties.filter(p => p.id !== id);
    mockDb.saveProperties(filtered);
    return true;
  },

  getAgents: (): Agent[] => {
    return getStored<Agent[]>(STORAGE_KEYS.AGENTS, MOCK_AGENTS);
  },
  updateAgent: (id: string, updates: Partial<Agent>): Agent | null => {
    const agents = mockDb.getAgents();
    const idx = agents.findIndex(a => a.id === id);
    if (idx === -1) return null;
    agents[idx] = { ...agents[idx], ...updates };
    setStored(STORAGE_KEYS.AGENTS, agents);
    return agents[idx];
  },
  addAgent: (agent: Agent): Agent => {
    const agents = mockDb.getAgents();
    const updated = [...agents, agent];
    setStored(STORAGE_KEYS.AGENTS, updated);
    return agent;
  },

  getNeighborhoods: (): Neighborhood[] => {
    return getStored<Neighborhood[]>(STORAGE_KEYS.NEIGHBORHOODS, MOCK_NEIGHBORHOODS);
  },

  getBlogs: (): BlogPost[] => {
    return getStored<BlogPost[]>(STORAGE_KEYS.BLOGS, MOCK_BLOG_POSTS);
  },
  addBlogPost: (post: BlogPost): BlogPost => {
    const posts = mockDb.getBlogs();
    const updated = [post, ...posts];
    setStored(STORAGE_KEYS.BLOGS, updated);
    return post;
  },
  updateBlogPost: (id: string, updates: Partial<BlogPost>): BlogPost | null => {
    const posts = mockDb.getBlogs();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return null;
    posts[idx] = { ...posts[idx], ...updates };
    setStored(STORAGE_KEYS.BLOGS, posts);
    return posts[idx];
  },

  getLeads: (): Lead[] => {
    return getStored<Lead[]>(STORAGE_KEYS.LEADS, MOCK_LEADS);
  },
  addLead: (lead: Lead): Lead => {
    const leads = mockDb.getLeads();
    const updated = [lead, ...leads];
    setStored(STORAGE_KEYS.LEADS, updated);
    
    // Simulate webhook out to Make.com / CRM
    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('https://')) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'lead.created', lead, timestamp: new Date().toISOString() }),
      }).catch(err => console.warn('Make.com webhook trigger notice:', err));
    }
    
    return lead;
  },
  updateLeadStatus: (id: string, status: Lead['status'], assignedAgentId?: string): Lead | null => {
    const leads = mockDb.getLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return null;
    leads[idx] = {
      ...leads[idx],
      status,
      ...(assignedAgentId ? { assigned_agent_id: assignedAgentId } : {})
    };
    setStored(STORAGE_KEYS.LEADS, leads);
    return leads[idx];
  },

  getSavedListingIds: (visitorId: string): string[] => {
    const allSaved = getStored<Record<string, string[]>>(STORAGE_KEYS.SAVED, {
      'usr-visitor-demo': ['prop-1', 'prop-3']
    });
    return allSaved[visitorId] || [];
  },
  toggleSavedListing: (visitorId: string, propertyId: string): boolean => {
    const allSaved = getStored<Record<string, string[]>>(STORAGE_KEYS.SAVED, {});
    const userSaved = allSaved[visitorId] || [];
    const exists = userSaved.includes(propertyId);
    let updated: string[];
    if (exists) {
      updated = userSaved.filter(id => id !== propertyId);
    } else {
      updated = [...userSaved, propertyId];
    }
    allSaved[visitorId] = updated;
    setStored(STORAGE_KEYS.SAVED, allSaved);
    return !exists;
  },

  getProfiles: (): Profile[] => {
    return getStored<Profile[]>(STORAGE_KEYS.PROFILES, MOCK_PROFILES);
  }
};
