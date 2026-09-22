import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Authorization middleware
const checkJwt = process.env.AUTH0_ISSUER_BASE_URL && process.env.AUTH0_AUDIENCE && !process.env.AUTH0_ISSUER_BASE_URL.includes('YOUR_AUTH0') 
  ? auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    })
  : (req: any, res: any, next: any) => {
      // Mock auth middleware if not configured
      req.auth = { payload: { sub: 'mock-user' } };
      next();
    };

// ==========================================
// ROUTES
// ==========================================

// --- Properties ---
app.get('/api/properties', async (req, res) => {
  const properties = await prisma.property.findMany({
    include: { images: { orderBy: { position: 'asc' } }, agent: { include: { profile: true } } },
    orderBy: { created_at: 'desc' }
  });
  // format response to match frontend expectations
  res.json(properties.map(p => ({
    ...p,
    amenities: JSON.parse(p.amenities),
  })));
});

app.get('/api/properties/:slug', async (req, res) => {
  const property = await prisma.property.findUnique({
    where: { slug: req.params.slug },
    include: { images: { orderBy: { position: 'asc' } }, agent: { include: { profile: true } } },
  });
  if (!property) return res.status(404).json({ error: 'Not found' });
  res.json({ ...property, amenities: JSON.parse(property.amenities) });
});

app.post('/api/properties', checkJwt, async (req, res) => {
  const data = req.body;
  const property = await prisma.property.create({
    data: {
      ...data,
      amenities: JSON.stringify(data.amenities || []),
      images: {
        create: data.images || []
      }
    },
  });
  res.json(property);
});

// --- Agents ---
app.get('/api/agents', async (req, res) => {
  const agents = await prisma.agent.findMany({
    include: { profile: true },
  });
  res.json(agents.map(a => ({
    ...a,
    specialties: JSON.parse(a.specialties)
  })));
});

app.post('/api/agents', checkJwt, async (req, res) => {
  const data = req.body;
  const agent = await prisma.agent.create({
    data: {
      ...data,
      specialties: JSON.stringify(data.specialties || []),
      profile: {
        create: data.profile
      }
    },
    include: { profile: true }
  });
  res.json({ ...agent, specialties: JSON.parse(agent.specialties) });
});

app.patch('/api/agents/:id', checkJwt, async (req, res) => {
  const agent = await prisma.agent.update({
    where: { id: req.params.id },
    data: req.body,
    include: { profile: true }
  });
  res.json({ ...agent, specialties: JSON.parse(agent.specialties) });
});

// --- Neighborhoods ---
app.get('/api/neighborhoods', async (req, res) => {
  const neighborhoods = await prisma.neighborhood.findMany();
  res.json(neighborhoods);
});

// --- Blogs ---
app.get('/api/blogs', async (req, res) => {
  const blogs = await prisma.blogPost.findMany({
    include: { author: { include: { profile: true } } },
    orderBy: { created_at: 'desc' }
  });
  res.json(blogs);
});

// --- Leads ---
app.get('/api/leads', checkJwt, async (req, res) => {
  const leads = await prisma.lead.findMany({
    include: { property: true, assigned_agent: { include: { profile: true } } },
    orderBy: { created_at: 'desc' }
  });
  res.json(leads);
});

app.post('/api/leads', async (req, res) => {
  const data = req.body;
  const lead = await prisma.lead.create({
    data
  });
  res.json(lead);
});

app.patch('/api/leads/:id/status', checkJwt, async (req, res) => {
  const { status, assigned_agent_id } = req.body;
  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: { status, assigned_agent_id }
  });
  res.json(lead);
});

// --- Profiles ---
app.get('/api/profiles', checkJwt, async (req, res) => {
  const profiles = await prisma.profile.findMany();
  res.json(profiles);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
