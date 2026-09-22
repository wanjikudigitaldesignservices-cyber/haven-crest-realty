export type UserRole = 'admin' | 'agent' | 'visitor';
export type ListingType = 'buy' | 'rent';
export type PropertyStatus = 'draft' | 'pending_approval' | 'published' | 'archived';
export type LeadType = 'viewing' | 'valuation' | 'contact';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Agent {
  id: string;
  bio: string | null;
  years_experience: number;
  specialties: string[];
  license_number: string | null;
  whatsapp_number: string | null;
  is_active: boolean;
  profile?: Profile;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  hero_image_url: string | null;
  lat: number | null;
  lng: number | null;
}

export interface Property {
  id: string;
  agent_id: string | null;
  neighborhood_id: string | null;
  slug: string;
  title: string;
  description: string | null;
  listing_type: ListingType;
  status: PropertyStatus;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  size_sqm: number | null;
  lat: number | null;
  lng: number | null;
  address: string | null;
  featured?: boolean;
  amenities?: string[];
  created_at: string;
  updated_at: string;
  
  // Relations
  agent?: Agent;
  neighborhood?: Neighborhood;
  images?: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  storage_path: string;
  position: number;
}

export interface BlogPost {
  id: string;
  author_id: string | null;
  slug: string;
  title: string;
  summary?: string;
  body: string;
  cover_image_url: string | null;
  tags?: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  author?: Profile;
}

export interface Lead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  property_id: string | null;
  assigned_agent_id: string | null;
  name: string;
  email: string | null;
  phone: string;
  message: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  valuation_property_type?: string | null;
  valuation_bedrooms?: number | null;
  valuation_address?: string | null;
  notes?: string | null;
  created_at: string;
  
  // Relations
  property?: Property;
  assigned_agent?: Agent;
}

export interface SavedListing {
  visitor_id: string;
  property_id: string;
  created_at?: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown>;
  created_at: string;
}
