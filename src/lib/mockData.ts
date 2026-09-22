import { Property, Agent, Neighborhood, BlogPost, Lead, Profile } from '../types/database';

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'usr-admin-1',
    role: 'admin',
    full_name: 'Victoria Alistair',
    phone: '+254 711 010 200',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 'usr-agent-kwame',
    role: 'agent',
    full_name: 'Kwame Omondi',
    phone: '+254 722 345 678',
    avatar_url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-01-15T09:30:00Z',
  },
  {
    id: 'usr-agent-amina',
    role: 'agent',
    full_name: 'Amina Hassan',
    phone: '+254 733 987 654',
    avatar_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-01-20T11:00:00Z',
  },
  {
    id: 'usr-agent-juma',
    role: 'agent',
    full_name: 'Juma Kiptoo',
    phone: '+254 744 112 233',
    avatar_url: 'https://images.unsplash.com/photo-1566492031773-4f4e13e6d486?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-02-01T14:15:00Z',
  },
  {
    id: 'usr-visitor-demo',
    role: 'visitor',
    full_name: 'Lord Jonathan Miller',
    phone: '+44 7700 900123',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-03-01T10:00:00Z',
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'usr-agent-kwame',
    bio: 'Senior Managing Broker with over 14 years advising diplomatic missions, private equity principals, and legacy families on trophy acquisitions in Karen and Muthaiga.',
    years_experience: 14,
    specialties: ['Trophy Estates', 'Diplomatic Relocation', 'Heritage Properties', 'Land Parcels'],
    license_number: 'REA-NAI-0842',
    whatsapp_number: '+254722345678',
    is_active: true,
    profile: MOCK_PROFILES[1],
  },
  {
    id: 'usr-agent-amina',
    bio: 'Modern architecture enthusiast with a decade of expertise marketing prime sky penthouses and luxury sustainable riverside residences for institutional investors.',
    years_experience: 10,
    specialties: ['Luxury Penthouses', 'Off-Plan Advisory', 'High-Yield Rentals', 'Waterfront Living'],
    license_number: 'REA-NAI-1290',
    whatsapp_number: '+254733987654',
    is_active: true,
    profile: MOCK_PROFILES[2],
  },
  {
    id: 'usr-agent-juma',
    bio: 'Trusted strategic advisor for foreign direct investments, commercial plots, and gated villa compounds across Kitisuru and surrounding diplomatic enclaves.',
    years_experience: 11,
    specialties: ['Investment Portfolios', 'Private Gated Villas', 'Asset Diversification', 'Due Diligence'],
    license_number: 'REA-NAI-0518',
    whatsapp_number: '+254744112233',
    is_active: true,
    profile: MOCK_PROFILES[3],
  }
];

export const MOCK_NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'neigh-karen',
    slug: 'karen',
    name: 'Karen',
    description: 'Serene, verdant sanctuary featuring sprawling multi-acre estates, private country clubs, equestrian trails, and secluded luxury sanctuaries.',
    hero_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    lat: -1.3195,
    lng: 36.7065,
  },
  {
    id: 'neigh-muthaiga',
    slug: 'muthaiga',
    name: 'Muthaiga',
    description: 'Known as the Beverly Hills of East Africa, offering aristocratic heritage, embassy residences, and prestigious private estates along serene tree-lined boulevards.',
    hero_image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    lat: -1.2536,
    lng: 36.8317,
  },
  {
    id: 'neigh-kitisuru',
    slug: 'kitisuru',
    name: 'Kitisuru',
    description: 'Lush forested hills, cantilevered architectural marvels, and unmatched proximity to premier international schools and diplomatic hubs.',
    hero_image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    lat: -1.2384,
    lng: 36.7725,
  },
  {
    id: 'neigh-riverside',
    slug: 'riverside',
    name: 'Riverside & Westlands',
    description: 'Cosmopolitan high-rise luxury, panoramic penthouse sky residences, private concierges, and Michelin-caliber dining within walking distance.',
    hero_image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    lat: -1.2683,
    lng: 36.7964,
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    agent_id: 'usr-agent-kwame',
    neighborhood_id: 'neigh-karen',
    slug: 'the-glass-pavilion-karen',
    title: 'The Glass Pavilion & Botanical Estate',
    description: 'An iconic architectural tour de force set on 2.5 manicured acres in prime Karen. Featuring dramatic 6-meter double-volume glass facades, infinity heated swimming pool, 600-bottle temperature-controlled wine cellar, separate 2-bedroom guest cottage, staff quarters for 4, and full smart-home automation powered by a dedicated solar battery microgrid. The master retreat offers dual dressing rooms, a private plunge spa, and panoramic forest vistas.',
    listing_type: 'buy',
    status: 'published',
    price: 285000000,
    bedrooms: 5,
    bathrooms: 6,
    size_sqm: 820,
    lat: -1.3210,
    lng: 36.7080,
    address: 'Windy Ridge Lane, Karen, Nairobi',
    featured: true,
    amenities: [
      'Infinity Heated Pool',
      'Temperature Wine Cellar',
      'Smart Home Automation',
      'Solar Microgrid & Battery Storage',
      'Private Tennis Court',
      'Guest Cottage',
      'CCTV Thermal Perimeter',
      'Borehole Water Purification'
    ],
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-03-01T14:30:00Z',
    images: [
      { id: 'img-1-1', property_id: 'prop-1', storage_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-1-2', property_id: 'prop-1', storage_path: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80', position: 1 },
      { id: 'img-1-3', property_id: 'prop-1', storage_path: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80', position: 2 },
      { id: 'img-1-4', property_id: 'prop-1', storage_path: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80', position: 3 },
    ]
  },
  {
    id: 'prop-2',
    agent_id: 'usr-agent-kwame',
    neighborhood_id: 'neigh-muthaiga',
    slug: 'muthaiga-colonial-manor',
    title: 'Muthaiga Colonial Manor & Private Forest',
    description: 'Steeped in timeless aristocratic heritage, this distinguished Muthaiga manor commands 3.2 acres of ancient indigenous woodland. Meticulously restored to the highest European standards, the estate features solid herringbone parquet, bespoke Calacatta marble kitchens, an ambassadorial receiving reception hall, and a heated indoor swimming pavilion. Uncompromising embassy-grade security includes multi-tier access control and an armored safe room.',
    listing_type: 'buy',
    status: 'published',
    price: 420000000,
    bedrooms: 6,
    bathrooms: 7,
    size_sqm: 1150,
    lat: -1.2550,
    lng: 36.8330,
    address: 'Limuru Road, Old Muthaiga, Nairobi',
    featured: true,
    amenities: [
      'Indoor Heated Pool Pavilion',
      'Private Indigenous Forest',
      'Diplomatic Clearance & Safe Room',
      'Helipad Access',
      'Herringbone European Oak Floors',
      'Bespoke Marble Kitchens',
      '4-Car Enclosed Garage',
      'Independent Staff Residence'
    ],
    created_at: '2026-02-14T11:00:00Z',
    updated_at: '2026-03-05T09:00:00Z',
    images: [
      { id: 'img-2-1', property_id: 'prop-2', storage_path: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-2-2', property_id: 'prop-2', storage_path: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80', position: 1 },
      { id: 'img-2-3', property_id: 'prop-2', storage_path: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80', position: 2 },
    ]
  },
  {
    id: 'prop-3',
    agent_id: 'usr-agent-amina',
    neighborhood_id: 'neigh-riverside',
    slug: 'the-azure-sky-penthouse',
    title: 'The Azure Sky Penthouse at Riverside',
    description: 'Occupying the entire top two floors of Riverside’s most prestigious development, this triplex penthouse delivers 360-degree vistas of the city skyline and verdant river corridor. Highlights include private key-card elevator opening directly into the formal foyer, private rooftop infinity plunge pool, open-concept Italian show kitchen plus wet catering kitchen, sauna, and acoustic home cinema.',
    listing_type: 'rent',
    status: 'published',
    price: 750000,
    bedrooms: 4,
    bathrooms: 4,
    size_sqm: 480,
    lat: -1.2675,
    lng: 36.7980,
    address: 'Riverside Drive, Westlands, Nairobi',
    featured: true,
    amenities: [
      'Private Rooftop Plunge Pool',
      'Direct Private Elevator',
      '24/7 White-Glove Concierge',
      'Spa, Sauna & Steam Suite',
      'Wraparound Sunset Terrace',
      'Acoustic Cinema Room',
      'Underground Secure Parking (4 bays)'
    ],
    created_at: '2026-02-18T12:00:00Z',
    updated_at: '2026-03-08T15:00:00Z',
    images: [
      { id: 'img-3-1', property_id: 'prop-3', storage_path: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-3-2', property_id: 'prop-3', storage_path: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80', position: 1 },
      { id: 'img-3-3', property_id: 'prop-3', storage_path: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80', position: 2 },
    ]
  },
  {
    id: 'prop-4',
    agent_id: 'usr-agent-juma',
    neighborhood_id: 'neigh-kitisuru',
    slug: 'kitisuru-waterfall-residence',
    title: 'The Waterfall Residence at Kitisuru Ravine',
    description: 'Nestled on the edge of a private natural river ravine, this cantilevered glass and stone villa represents the pinnacle of contemporary tropical luxury. Integrated seamlessly into lush hillside topography, the home features floor-to-ceiling sliding glass pocket doors opening onto timber sun decks, double fireplaces, 5 ensuite luxury suites, and a heated infinity lap pool.',
    listing_type: 'buy',
    status: 'published',
    price: 195000000,
    bedrooms: 5,
    bathrooms: 5,
    size_sqm: 620,
    lat: -1.2405,
    lng: 36.7740,
    address: 'Tate Close, Kitisuru, Nairobi',
    featured: false,
    amenities: [
      'Ravine & Waterfall Vistas',
      'Infinity Heated Lap Pool',
      'Volcanic Stone Fireplace',
      'Borehole & Reverse Osmosis',
      'Double-Height Living Gallery',
      'Biometric Entrance Security',
      'Lush Tropical Landscape'
    ],
    created_at: '2026-02-22T14:00:00Z',
    updated_at: '2026-03-02T16:00:00Z',
    images: [
      { id: 'img-4-1', property_id: 'prop-4', storage_path: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-4-2', property_id: 'prop-4', storage_path: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80', position: 1 },
    ]
  },
  {
    id: 'prop-5',
    agent_id: 'usr-agent-amina',
    neighborhood_id: 'neigh-riverside',
    slug: 'riverside-executive-loft',
    title: 'Riverside Executive Garden Loft',
    description: 'Fully furnished duplex garden loft combining raw industrial concrete with warm African hardwoods. Features a private Japanese zen garden with water feature, imported Italian Poliform cabinetry, Miele appliances, and full clubhouse access including heated lap pool and squash courts.',
    listing_type: 'rent',
    status: 'published',
    price: 380000,
    bedrooms: 2,
    bathrooms: 2,
    size_sqm: 210,
    lat: -1.2690,
    lng: 36.7950,
    address: 'Riverside Park Road, Nairobi',
    featured: false,
    amenities: [
      'Fully Furnished by Interior Architect',
      'Private Zen Garden & Water Feature',
      'Miele Kitchen Appliances',
      'Full Clubhouse & Gym Access',
      '100% Back-up Generator',
      'High-Speed Redundant Fiber'
    ],
    created_at: '2026-02-25T16:00:00Z',
    updated_at: '2026-03-04T11:00:00Z',
    images: [
      { id: 'img-5-1', property_id: 'prop-5', storage_path: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-5-2', property_id: 'prop-5', storage_path: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80', position: 1 },
    ]
  },
  {
    id: 'prop-6',
    agent_id: 'usr-agent-kwame',
    neighborhood_id: 'neigh-karen',
    slug: 'muringa-crest-villa',
    title: 'Muringa Crest Mediterranean Villa',
    description: 'Spanish-inspired courtyard villa situated within an exclusive gated community of only 6 residences. Featuring terracotta barrel-tiled roofs, central fountain courtyard, wine tasting room, vaulted timber ceilings, and sweeping views towards the Ngong Hills.',
    listing_type: 'buy',
    status: 'published',
    price: 165000000,
    bedrooms: 4,
    bathrooms: 4,
    size_sqm: 540,
    lat: -1.3250,
    lng: 36.7020,
    address: 'Muringa Drive, Karen, Nairobi',
    featured: false,
    amenities: [
      'Gated Community with 24/7 Patrol',
      'Central Fountain Courtyard',
      'Ngong Hills Sunset Views',
      'Wine Tasting Room',
      'Solar Heated Pool'
    ],
    created_at: '2026-02-28T09:00:00Z',
    updated_at: '2026-03-06T12:00:00Z',
    images: [
      { id: 'img-6-1', property_id: 'prop-6', storage_path: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-6-2', property_id: 'prop-6', storage_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', position: 1 },
    ]
  },
  {
    id: 'prop-7',
    agent_id: 'usr-agent-juma',
    neighborhood_id: 'neigh-kitisuru',
    slug: 'the-monolith-modernist-villa',
    title: 'The Monolith Modernist Villa',
    description: 'A striking statement in modern brutalist and minimalist residential architecture. Features cantilevered blackened steel balconies, board-formed concrete walls, floor-to-ceiling glass, and a temperature-controlled automobile gallery.',
    listing_type: 'buy',
    status: 'pending_approval',
    price: 340000000,
    bedrooms: 6,
    bathrooms: 6,
    size_sqm: 950,
    lat: -1.2420,
    lng: 36.7760,
    address: 'Peponi Valley, Kitisuru, Nairobi',
    featured: false,
    amenities: [
      'Automobile Showcase Gallery',
      'Board-Formed Concrete Architecture',
      'Cantilevered Infinity Pool',
      'Wellness Suite & Steam Room',
      'Solar Glass Windows'
    ],
    created_at: '2026-03-10T14:00:00Z',
    updated_at: '2026-03-10T14:00:00Z',
    images: [
      { id: 'img-7-1', property_id: 'prop-7', storage_path: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', position: 0 },
    ]
  },
  {
    id: 'prop-8',
    agent_id: 'usr-agent-kwame',
    neighborhood_id: 'neigh-muthaiga',
    slug: 'the-ambassadorial-residence-muthaiga',
    title: 'The Ambassadorial Residence Muthaiga',
    description: 'A masterpiece of contemporary luxury situated on 1.5 acres of beautifully landscaped grounds. This residence features a private screening room, a fully equipped gym, a sweeping double staircase, and a 10-car underground garage. Perfect for discerning diplomats and high-profile executives.',
    listing_type: 'buy',
    status: 'published',
    price: 310000000,
    bedrooms: 6,
    bathrooms: 8,
    size_sqm: 1050,
    lat: -1.2560,
    lng: 36.8340,
    address: 'Muthaiga Road, Nairobi',
    featured: true,
    amenities: [
      'Private Screening Room',
      'Underground 10-Car Garage',
      'Heated Outdoor Pool',
      'Professional Chef Kitchen',
      'Separate Guest House'
    ],
    created_at: '2026-04-10T14:00:00Z',
    updated_at: '2026-04-10T14:00:00Z',
    images: [
      { id: 'img-8-1', property_id: 'prop-8', storage_path: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-8-2', property_id: 'prop-8', storage_path: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1400&q=80', position: 1 },
    ]
  },
  {
    id: 'prop-9',
    agent_id: 'usr-agent-amina',
    neighborhood_id: 'neigh-karen',
    slug: 'karen-equestrian-estate',
    title: 'Karen Equestrian & Country Estate',
    description: 'An idyllic 4-acre country estate with private stables, a riding arena, and direct access to forest trails. The main residence exudes rustic elegance with exposed timber beams, grand stone fireplaces, and an expansive wraparound veranda overlooking the paddocks.',
    listing_type: 'buy',
    status: 'published',
    price: 450000000,
    bedrooms: 7,
    bathrooms: 6,
    size_sqm: 900,
    lat: -1.3300,
    lng: 36.6900,
    address: 'Bogani Road, Karen, Nairobi',
    featured: true,
    amenities: [
      'Private Stables & Arena',
      'Forest Trail Access',
      'Wraparound Veranda',
      'Stone Fireplaces',
      'Staff Quarters for 6'
    ],
    created_at: '2026-04-15T09:00:00Z',
    updated_at: '2026-04-15T10:00:00Z',
    images: [
      { id: 'img-9-1', property_id: 'prop-9', storage_path: 'https://images.unsplash.com/photo-1595521624992-48a59a495e8e?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-9-2', property_id: 'prop-9', storage_path: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80', position: 1 },
    ]
  },
  {
    id: 'prop-10',
    agent_id: 'usr-agent-juma',
    neighborhood_id: 'neigh-riverside',
    slug: 'riverside-zen-penthouse',
    title: 'Riverside Zen Penthouse Suite',
    description: 'A masterclass in modern minimalism, this fully automated smart penthouse features floating staircases, Japanese Zen gardens, and uninterrupted views of the Nairobi River. Ideal for tech entrepreneurs and expatriates seeking a tranquil oasis in the city.',
    listing_type: 'rent',
    status: 'published',
    price: 420000,
    bedrooms: 3,
    bathrooms: 3,
    size_sqm: 320,
    lat: -1.2700,
    lng: 36.7900,
    address: 'Riverside Drive, Nairobi',
    featured: false,
    amenities: [
      'Full Home Automation',
      'Japanese Zen Garden',
      'Floating Staircase',
      'Floor-to-Ceiling Windows',
      'Rooftop BBQ Area'
    ],
    created_at: '2026-04-20T11:00:00Z',
    updated_at: '2026-04-20T11:00:00Z',
    images: [
      { id: 'img-10-1', property_id: 'prop-10', storage_path: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', position: 0 },
      { id: 'img-10-2', property_id: 'prop-10', storage_path: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80', position: 1 },
    ]
  }
];

// Attach relationships to mock properties
MOCK_PROPERTIES.forEach(prop => {
  prop.agent = MOCK_AGENTS.find(a => a.id === prop.agent_id);
  prop.neighborhood = MOCK_NEIGHBORHOODS.find(n => n.id === prop.neighborhood_id);
});

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    author_id: 'usr-admin-1',
    slug: 'prime-residential-market-report-2026',
    title: 'Q3 2026 Prime Residential Index: Capital Growth & Diaspora Inflows',
    summary: 'An executive analysis of luxury property valuations, rental yields, and high-net-worth cross-border transactions across Nairobi’s prime corridors.',
    body: `### The Resilience of Prime Residential Real Estate

East Africa’s prime residential market has shown unprecedented resilience throughout 2026. Trophy estates in Karen and Muthaiga recorded steady capital appreciation of 7.4% year-over-year, anchored by strong diaspora remissions, multinational executive relocations, and sovereign wealth allocation.

#### Neighborhood Yield Differentials

While prime suburban homes deliver long-term capital preservation, high-end serviced penthouses in Riverside and Westlands are commanding gross rental yields between 8.2% and 9.6%. Discerning investors are balancing portfolios with both prime land appreciation and liquid rental cashflow.

#### Key Takeaways for Buyers:
- Suburban acreages continue to be tightly held, commanding historic premiums.
- ESG-certified properties equipped with microgrid solar and independent water purification fetch 14% higher rental premiums.
- Foreign direct investment transactions favor bespoke legal escrow structures.`,
    cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    tags: ['Market Reports', 'Wealth Advisory', 'Investments'],
    published: true,
    published_at: '2026-03-12T10:00:00Z',
    created_at: '2026-03-12T10:00:00Z',
    author: MOCK_PROFILES[0],
  },
  {
    id: 'post-2',
    author_id: 'usr-agent-kwame',
    slug: 'guide-to-buying-heritage-estates-karen',
    title: 'The Discerning Buyer’s Guide to Acquiring Heritage Estates in Karen',
    summary: 'Essential due diligence parameters regarding title deed verification, riparian boundaries, and architectural preservation.',
    body: `### Securing Legacy Properties

Acquiring a multi-acre property in Karen is more than a transaction; it is stewardship of generational wealth. 

#### Critical Due Diligence Checklist
1. **Title Validation**: Always conduct searches across both central registries and local county spatial registers.
2. **Topographical & Boundary Surveys**: Verify physical beacon markers against cadastral deed plans.
3. **Riparian Buffer Zones**: Estates bordering natural streams must comply with 30-meter buffer zoning.

Our senior advisors provide end-to-end guidance through deed verification, legal conveyance, and private architectural consultations.`,
    cover_image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    tags: ['Buyer Guide', 'Karen', 'Legal & Tax'],
    published: true,
    published_at: '2026-03-05T14:00:00Z',
    created_at: '2026-03-05T14:00:00Z',
    author: MOCK_PROFILES[1],
  },
  {
    id: 'post-3',
    author_id: 'usr-agent-amina',
    slug: 'architectural-trends-luxury-penthouses',
    title: 'Biophilic Design & Smart Microgrids: The New Benchmark in Luxury Penthouses',
    summary: 'How high-net-worth residents are prioritizing clean energy independence, acoustic isolation, and natural elements in sky residences.',
    body: `### The Evolution of the Sky Residence

Today’s discerning luxury buyers demand more than height and square footage; they seek sanctuaries of wellness and uninterrupted operational autonomy.

From integrated lithium battery storage that guarantees zero power disruptions to double-glazed acoustic glass that creates absolute stillness above the bustling metropolis, the bar for luxury living has permanently shifted.`,
    cover_image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    tags: ['Architecture', 'Design Trends', 'Sustainability'],
    published: true,
    published_at: '2026-02-20T09:00:00Z',
    created_at: '2026-02-20T09:00:00Z',
    author: MOCK_PROFILES[2],
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    type: 'viewing',
    status: 'new',
    property_id: 'prop-1',
    assigned_agent_id: 'usr-agent-kwame',
    name: 'Jonathan Miller',
    email: 'j.miller@investment-holdings.co.uk',
    phone: '+44 7700 900123',
    message: 'Interested in scheduling a private discreet viewing for The Glass Pavilion this Friday afternoon.',
    preferred_date: '2026-03-27',
    preferred_time: '14:00 - 16:00',
    created_at: '2026-03-18T11:20:00Z',
    property: MOCK_PROPERTIES[0],
    assigned_agent: MOCK_AGENTS[0],
  },
  {
    id: 'lead-2',
    type: 'valuation',
    status: 'contacted',
    property_id: null,
    assigned_agent_id: 'usr-agent-amina',
    name: 'Grace Wambui',
    email: 'gwambui@enterprises.ke',
    phone: '+254 722 999 888',
    message: 'Requesting professional valuation for a 4-bedroom townhouse in Kitisuru ahead of listing next month.',
    valuation_property_type: 'Townhouse',
    valuation_bedrooms: 4,
    valuation_address: 'Kitisuru Ridge, Plot 14',
    created_at: '2026-03-17T09:15:00Z',
    assigned_agent: MOCK_AGENTS[1],
  },
  {
    id: 'lead-3',
    type: 'contact',
    status: 'qualified',
    property_id: 'prop-3',
    assigned_agent_id: 'usr-agent-amina',
    name: 'Devin Thorne',
    email: 'devin.thorne@globalcapital.com',
    phone: '+1 415 555 2671',
    message: 'Relocating to Nairobi for a 2-year UN assignment. Looking for high-floor furnished penthouses.',
    created_at: '2026-03-15T15:40:00Z',
    property: MOCK_PROPERTIES[2],
    assigned_agent: MOCK_AGENTS[1],
  },
  {
    id: 'lead-4',
    type: 'viewing',
    status: 'closed',
    property_id: 'prop-2',
    assigned_agent_id: 'usr-agent-kwame',
    name: 'Ambassador Carl Lindqvist',
    email: 'carl.lindqvist@embassy-nordic.org',
    phone: '+254 700 888 111',
    message: 'Official mission residence acquisition inquiry.',
    preferred_date: '2026-03-10',
    preferred_time: '10:00 - 12:00',
    created_at: '2026-03-08T10:00:00Z',
    property: MOCK_PROPERTIES[1],
    assigned_agent: MOCK_AGENTS[0],
  }
];
