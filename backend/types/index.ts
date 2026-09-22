import { Property, ListingType } from './database';

export * from './database';

export interface PropertyFilterState {
  listing_type?: ListingType | 'all';
  neighborhood_id?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number | 'any';
  bathrooms?: number | 'any';
  keyword?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'size_desc';
}

export interface UserSession {
  id: string;
  email: string;
  role: 'admin' | 'agent' | 'visitor';
  full_name: string;
  avatar_url?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface LeadSubmissionPayload {
  type: 'viewing' | 'valuation' | 'contact';
  name: string;
  phone: string;
  email?: string;
  message?: string;
  property_id?: string;
  preferred_date?: string;
  preferred_time?: string;
  valuation_property_type?: string;
  valuation_bedrooms?: number;
  valuation_address?: string;
  honeypot?: string; // Bot protection
}
