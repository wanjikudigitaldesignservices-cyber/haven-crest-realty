-- [CLIENT NAME] Real Estate — 16-Layer Production Database Schema
-- Supabase PostgreSQL Migration

-- 1. ENUMS
create type user_role as enum ('admin', 'agent', 'visitor');
create type listing_type as enum ('buy', 'rent');
create type property_status as enum ('draft', 'pending_approval', 'published', 'archived');
create type lead_type as enum ('viewing', 'valuation', 'contact');
create type lead_status as enum ('new', 'contacted', 'qualified', 'closed');

-- 2. PROFILES TABLE (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'visitor',
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now()
);

-- 3. AGENTS TABLE
create table agents (
  id uuid primary key references profiles(id) on delete cascade,
  bio text,
  years_experience int default 0,
  specialties text[] default '{}',
  license_number text,
  whatsapp_number text,
  is_active boolean default true
);

-- 4. NEIGHBORHOODS TABLE
create table neighborhoods (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  hero_image_url text,
  lat numeric,
  lng numeric
);

-- 5. PROPERTIES TABLE
create table properties (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete set null,
  neighborhood_id uuid references neighborhoods(id) on delete set null,
  slug text unique not null,
  title text not null,
  description text,
  listing_type listing_type not null,
  status property_status not null default 'draft',
  price numeric not null,
  bedrooms int,
  bathrooms int,
  size_sqm numeric,
  lat numeric,
  lng numeric,
  address text,
  featured boolean default false,
  amenities text[] default '{}',
  search_vector tsvector,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. PROPERTY IMAGES TABLE
create table property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  storage_path text not null,
  position int default 0
);

-- 7. BLOG POSTS TABLE
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete set null,
  slug text unique not null,
  title text not null,
  summary text,
  body text not null,
  cover_image_url text,
  tags text[] default '{}',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- 8. LEADS TABLE
create table leads (
  id uuid primary key default gen_random_uuid(),
  type lead_type not null,
  status lead_status not null default 'new',
  property_id uuid references properties(id) on delete set null,
  assigned_agent_id uuid references agents(id) on delete set null,
  name text not null,
  email text,
  phone text not null,
  message text,
  preferred_date date,
  preferred_time text,
  valuation_property_type text,
  valuation_bedrooms int,
  valuation_address text,
  notes text,
  created_at timestamptz default now()
);

-- 9. SAVED LISTINGS TABLE
create table saved_listings (
  visitor_id uuid references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (visitor_id, property_id)
);

-- 10. AUDIT LOGS TABLE (Layer 13 Security & Compliance)
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 11. INDEXES & TSVECTOR GENERATION
create index idx_properties_status_type on properties(status, listing_type);
create index idx_properties_neighborhood on properties(neighborhood_id);
create index idx_properties_agent on properties(agent_id);
create index idx_leads_status on leads(status);
create index idx_leads_assigned_agent on leads(assigned_agent_id);
create index idx_properties_search_vector on properties using gin(search_vector);

-- Search vector auto-update trigger function
create or replace function update_property_search_vector() returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.address, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.description, '')), 'C');
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger trg_property_search_vector
before insert or update on properties
for each row execute function update_property_search_vector();

-- 12. ROW LEVEL SECURITY (RLS)
alter table profiles enable row level security;
alter table agents enable row level security;
alter table neighborhoods enable row level security;
alter table properties enable row level security;
alter table property_images enable row level security;
alter table blog_posts enable row level security;
alter table leads enable row level security;
alter table saved_listings enable row level security;
alter table audit_logs enable row level security;

-- PROFILES RLS
create policy "public_read_agents_profiles"
  on profiles for select
  using (role in ('agent', 'admin') or auth.uid() = id);

create policy "users_update_own_profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "admin_manage_profiles"
  on profiles for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- AGENTS RLS
create policy "public_read_active_agents"
  on agents for select
  using (is_active = true or auth.uid() = id or exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "agent_update_own_bio"
  on agents for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "admin_manage_agents"
  on agents for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- NEIGHBORHOODS RLS
create policy "public_read_neighborhoods"
  on neighborhoods for select
  using (true);

create policy "admin_manage_neighborhoods"
  on neighborhoods for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- PROPERTIES RLS
create policy "public_read_published"
  on properties for select
  using (status = 'published');

create policy "agent_manage_own"
  on properties for all
  using (agent_id = auth.uid())
  with check (agent_id = auth.uid());

create policy "admin_manage_all_properties"
  on properties for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- PROPERTY IMAGES RLS
create policy "public_read_property_images"
  on property_images for select
  using (exists (select 1 from properties where id = property_images.property_id and properties.status = 'published'));

create policy "agent_manage_own_property_images"
  on property_images for all
  using (exists (select 1 from properties where id = property_images.property_id and properties.agent_id = auth.uid()))
  with check (exists (select 1 from properties where id = property_images.property_id and properties.agent_id = auth.uid()));

create policy "admin_manage_all_property_images"
  on property_images for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- BLOG POSTS RLS
create policy "public_read_published_blogs"
  on blog_posts for select
  using (published = true);

create policy "admin_manage_blogs"
  on blog_posts for all
  using (exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'agent')));

-- LEADS RLS
create policy "public_insert_leads"
  on leads for insert
  with check (true);

create policy "agent_read_assigned_leads"
  on leads for select
  using (assigned_agent_id = auth.uid());

create policy "agent_update_assigned_leads"
  on leads for update
  using (assigned_agent_id = auth.uid())
  with check (assigned_agent_id = auth.uid());

create policy "admin_manage_all_leads"
  on leads for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- SAVED LISTINGS RLS
create policy "visitor_manage_own_saved"
  on saved_listings for all
  using (auth.uid() = visitor_id)
  with check (auth.uid() = visitor_id);

-- AUDIT LOGS RLS
create policy "admin_read_audit_logs"
  on audit_logs for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "system_insert_audit_logs"
  on audit_logs for insert
  with check (true);
