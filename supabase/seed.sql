-- [CLIENT NAME] Real Estate — Production Seed Data
-- Neighborhoods, Agents, Properties, Images, Blogs, Leads

-- 1. NEIGHBORHOODS
insert into neighborhoods (id, slug, name, description, hero_image_url, lat, lng) values
('11111111-1111-1111-1111-111111111111', 'karen', 'Karen', 'Serene, verdant sanctuary featuring sprawling multi-acre estates, private country clubs, and secluded luxury sanctuaries.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', -1.3195, 36.7065),
('22222222-2222-2222-2222-222222222222', 'muthaiga', 'Muthaiga', 'Known as the Beverly Hills of East Africa, offering aristocratic heritage, embassy quarters, and prestigious private estates.', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', -1.2536, 36.8317),
('33333333-3333-3333-3333-333333333333', 'kitisuru', 'Kitisuru', 'Lush forested hills, architectural marvels, and proximity to premier international schools and diplomatic enclaves.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', -1.2384, 36.7725),
('44444444-4444-4444-4444-444444444444', 'riverside', 'Riverside & Westlands', 'Cosmopolitan high-rise luxury, penthouse sky residences, and Michelin-caliber dining within walking distance.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80', -1.2683, 36.7964);

-- 2. PROFILES & AGENTS
insert into profiles (id, role, full_name, phone, avatar_url) values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin', 'Victoria Alistair', '+254 711 010 200', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'agent', 'Marcus Sterling', '+254 722 345 678', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'agent', 'Elena Vance', '+254 733 987 654', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'agent', 'Tariq Al-Mansoor', '+254 744 112 233', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80');

insert into agents (id, bio, years_experience, specialties, license_number, whatsapp_number, is_active) values
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Specializing in trophy residential estates and diplomatic compounds across Karen and Muthaiga for over 14 years.', 14, ARRAY['Trophy Estates', 'Diplomatic Relocation', 'Heritage Properties'], 'REA-NAI-0842', '+254722345678', true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Passionate advocate for contemporary sustainable architecture, luxury penthouses, and riverside developments.', 8, ARRAY['Luxury Penthouses', 'Off-Plan Advisory', 'High-Yield Rentals'], 'REA-NAI-1290', '+254733987654', true),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Trusted advisor for high-net-worth foreign direct investments, commercial plots, and gated community villas in Kitisuru.', 11, ARRAY['Investment Portfolios', 'Private Gated Villas', 'Land Acquisition'], 'REA-NAI-0518', '+254744112233', true);

-- 3. PROPERTIES
insert into properties (id, agent_id, neighborhood_id, slug, title, description, listing_type, status, price, bedrooms, bathrooms, size_sqm, lat, lng, address, featured, amenities) values
(
  'p1111111-1111-1111-1111-111111111111',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '11111111-1111-1111-1111-111111111111',
  'the-glass-pavilion-karen',
  'The Glass Pavilion & Botanical Estate',
  'An iconic architectural masterpiece set on 2.5 manicured acres. Featuring 6-meter double-volume glass facades, infinity heated pool, wine cellar, dedicated staff quarters, and full smart-home automation with perimeter thermal security.',
  'buy',
  'published',
  285000000,
  5,
  6,
  820,
  -1.3210,
  36.7080,
  'Windy Ridge Lane, Karen, Nairobi',
  true,
  ARRAY['Infinity Pool', 'Wine Cellar', 'Smart Automation', 'Staff Quarters', 'Solar Battery Microgrid', 'Tennis Court']
),
(
  'p2222222-2222-2222-2222-222222222222',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '22222222-2222-2222-2222-222222222222',
  'muthaiga-colonial-manor',
  'Muthaiga Colonial Manor & Private Forest',
  'Rich colonial heritage seamlessly modernized with European oak timber, bespoke marble island kitchens, and century-old indigenous cedar trees. Features ambassadorial security clearance and a heated indoor swimming pavilion.',
  'buy',
  'published',
  420000000,
  6,
  7,
  1150,
  -1.2550,
  36.8330,
  'Limuru Road, Old Muthaiga, Nairobi',
  true,
  ARRAY['Indoor Heated Pool', 'Private Forest', 'Bespoke Wine Room', 'Embassy-Grade Security', 'Helipad Access', 'Guest Cottage']
),
(
  'p3333333-3333-3333-3333-333333333333',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '44444444-4444-4444-4444-444444444444',
  'the-azure-sky-penthouse',
  'The Azure Sky Penthouse at Riverside',
  'Triple-aspect duplex penthouse offering panoramic skyline views over Nairobi Arboretum. Includes private rooftop plunge pool, wraparound terrace, direct elevator key-card access, and Bang & Olufsen integrated sound.',
  'rent',
  'published',
  750000,
  4,
  4,
  480,
  -1.2675,
  36.7980,
  'Riverside Drive, Westlands, Nairobi',
  true,
  ARRAY['Rooftop Plunge Pool', 'Direct Private Elevator', 'Concierge Service', 'Fitness Center & Spa', 'Wraparound Terrace']
),
(
  'p4444444-4444-4444-4444-444444444444',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '33333333-3333-3333-3333-333333333333',
  'kitisuru-waterfall-residence',
  'The Waterfall Residence at Kitisuru Ravine',
  'Nestled alongside a natural river ravine, this cantilevered modern villa combines raw volcanic stone, cantilevered steel, and tranquil organic gardens. 4 ensuite guest wings and private cinema.',
  'buy',
  'published',
  195000000,
  5,
  5,
  620,
  -1.2405,
  36.7740,
  'Tate Close, Kitisuru, Nairobi',
  false,
  ARRAY['Ravine Views', 'Private Cinema', 'Volcanic Stone Fireplace', 'Borehole Water Purification', 'Security Panic Room']
),
(
  'p5555555-5555-5555-5555-555555555555',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '44444444-4444-4444-4444-444444444444',
  'riverside-executive-loft',
  'Riverside Executive Garden Loft',
  'Furnished contemporary ground-level duplex loft featuring 4.5m ceilings, private Japanese zen garden, designer Italian cabinetry, and biometric security.',
  'rent',
  'published',
  380000,
  2,
  2,
  210,
  -1.2690,
  36.7950,
  'Riverside Park Road, Nairobi',
  false,
  ARRAY['Fully Furnished', 'Zen Garden', 'Biometric Access', 'Backup Generator', 'High-Speed Fiber']
);

-- 4. PROPERTY IMAGES
insert into property_images (property_id, storage_path, position) values
('p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', 0),
('p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80', 1),
('p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80', 2),
('p2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', 0),
('p2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80', 1),
('p3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80', 0),
('p3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80', 1),
('p4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', 0),
('p5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80', 0);

-- 5. BLOG POSTS
insert into blog_posts (author_id, slug, title, summary, body, cover_image_url, tags, published, published_at) values
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'prime-residential-market-report-2026',
  'Q3 2026 Prime Residential Index: Capital Growth & Diaspora Inflows',
  'An in-depth review of luxury real estate valuations, rental yields, and high-net-worth cross-border transactions.',
  '## The Resilience of Trophy Assets

East Africa’s prime residential real estate has shown unprecedented resilience throughout 2026. Trophy estates in Karen and Muthaiga recorded steady capital appreciation of 7.4% year-over-year, anchored by strong diaspora remissions and multinational executive relocations.

### Neighborhood Yield Differentials

While prime suburban homes deliver long-term capital preservation, high-end serviced penthouses in Riverside and Westlands are commanding gross rental yields between 8.2% and 9.6%. Discerning investors are balancing portfolios with both prime land appreciation and rental cashflow.

### Key Advisory Takeaways
- Suburban acreages continue to be tightly held, commanding historic premiums.
- ESG-certified properties equipped with microgrid solar and independent water purification fetch 14% higher rental premiums.
- Foreign direct investment transactions favor bespoke legal escrow structures.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  ARRAY['Market Reports', 'Wealth Advisory', 'Investments'],
  true,
  now() - interval '2 days'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'guide-to-buying-heritage-estates-karen',
  'The Discerning Buyer’s Guide to Acquiring Heritage Estates in Karen',
  'Everything high-net-worth buyers need to know regarding title deed verification, riparian boundaries, and architectural preservation.',
  '## Securing Legacy Properties

Acquiring a multi-acre property in Karen is more than a transaction; it is stewardship of generational wealth. 

### Critical Due Diligence Checklist
1. **Title Validation**: Always conduct searches across both central registries and local county spatial registers.
2. **Topographical & Boundary Surveys**: Verify physical beacon markers against cadastral deed plans.
3. **Riparian Buffer Zones**: Estates bordering natural streams must comply with 30-meter buffer zoning.

Our senior advisors provide end-to-end guidance through deed verification, legal conveyance, and private architectural consultations.',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
  ARRAY['Buyer Guide', 'Karen', 'Legal & Tax'],
  true,
  now() - interval '10 days'
);

-- 6. LEADS
insert into leads (type, status, property_id, assigned_agent_id, name, email, phone, message, preferred_date, preferred_time) values
(
  'viewing',
  'new',
  'p1111111-1111-1111-1111-111111111111',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'Jonathan Miller',
  'j.miller@investment-holdings.co.uk',
  '+44 7700 900123',
  'Interested in scheduling a private discreet viewing for The Glass Pavilion this Friday afternoon.',
  current_date + interval '3 days',
  '14:00 - 16:00'
),
(
  'valuation',
  'contacted',
  null,
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'Grace Wambui',
  'gwambui@enterprises.ke',
  '+254 722 999 888',
  'Requesting professional valuation for a 4-bedroom townhouse in Kitisuru ahead of listing.',
  null,
  null
);
