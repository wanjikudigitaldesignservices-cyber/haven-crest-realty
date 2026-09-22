import { PrismaClient } from '@prisma/client';
import { MOCK_PROFILES, MOCK_AGENTS, MOCK_NEIGHBORHOODS, MOCK_PROPERTIES, MOCK_BLOG_POSTS, MOCK_LEADS } from './seedData';

const prisma = new PrismaClient();

async function main() {
  // Profiles
  for (const p of MOCK_PROFILES) {
    await prisma.profile.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        role: p.role,
        full_name: p.full_name,
        phone: p.phone,
        avatar_url: p.avatar_url,
        created_at: p.created_at ? new Date(p.created_at) : new Date(),
      },
    });
  }

  // Agents
  for (const a of MOCK_AGENTS) {
    await prisma.agent.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        bio: a.bio,
        years_experience: a.years_experience,
        specialties: JSON.stringify(a.specialties),
        license_number: a.license_number,
        whatsapp_number: a.whatsapp_number,
        is_active: a.is_active,
        profile_id: a.profile.id,
      },
    });
  }

  // Neighborhoods
  for (const n of MOCK_NEIGHBORHOODS) {
    await prisma.neighborhood.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        id: n.id,
        slug: n.slug,
        name: n.name,
        description: n.description,
        image_url: n.image_url,
        market_trend: n.market_trend,
        avg_price_sqm: n.avg_price_sqm,
        lat: n.lat,
        lng: n.lng,
      },
    });
  }

  // Properties
  for (const p of MOCK_PROPERTIES) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        id: p.id,
        agent_id: p.agent_id,
        neighborhood_id: p.neighborhood_id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        listing_type: p.listing_type,
        status: p.status,
        price: p.price,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        size_sqm: p.size_sqm,
        lat: p.lat,
        lng: p.lng,
        address: p.address,
        featured: p.featured,
        amenities: JSON.stringify(p.amenities),
        created_at: p.created_at ? new Date(p.created_at) : new Date(),
        updated_at: p.updated_at ? new Date(p.updated_at) : new Date(),
        images: {
          create: p.images.map(i => ({
            id: i.id,
            storage_path: i.storage_path,
            position: i.position
          }))
        }
      },
    });
  }

  // Blog Posts
  for (const b of MOCK_BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        id: b.id,
        author_id: b.author_id,
        slug: b.slug,
        title: b.title,
        summary: b.summary,
        content: b.content,
        cover_url: b.cover_url,
        published: b.published,
        created_at: b.created_at ? new Date(b.created_at) : new Date(),
      },
    });
  }

  // Leads
  for (const l of MOCK_LEADS) {
    await prisma.lead.upsert({
      where: { id: l.id },
      update: {},
      create: {
        id: l.id,
        type: l.type,
        status: l.status,
        property_id: l.property_id,
        assigned_agent_id: l.assigned_agent_id,
        name: l.name,
        email: l.email,
        phone: l.phone,
        message: l.message,
        preferred_date: l.preferred_date,
        created_at: l.created_at ? new Date(l.created_at) : new Date(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
