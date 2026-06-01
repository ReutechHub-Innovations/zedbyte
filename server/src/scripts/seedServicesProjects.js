const mongoose = require('mongoose');

const Service = require('../models/Service');
const Project = require('../models/Project');

async function upsertByTitle(Model, docs, { titleField = 'title' } = {}) {
  for (const doc of docs) {
    const title = doc[titleField];
    const existing = await Model.findOne({ [titleField]: title });
    if (existing) continue;
    await Model.create(doc);
  }
}

async function seed() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!mongoUri) throw new Error('Missing MONGODB_URI or DATABASE_URL');

  // If you want to fully control the content from env, set these to JSON arrays.
  // Otherwise we fall back to “minimal” required fields so documents can be created.
  // These are NOT API mocks; they are real DB rows.
  let servicesPayload = null;
  let projectsPayload = null;

  if (process.env.SEED_SERVICES_JSON) {
    servicesPayload = JSON.parse(process.env.SEED_SERVICES_JSON);
  }
  if (process.env.SEED_PROJECTS_JSON) {
    projectsPayload = JSON.parse(process.env.SEED_PROJECTS_JSON);
  }

  const defaultServices = [
    {
      title: 'CCTV Installations',
      description: 'Professional CCTV system planning, installation and monitoring integrations.',
      // Service schema requires image
      image: process.env.DEFAULT_SERVICE_IMAGE || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
    {
      title: 'Networking',
      description: 'LAN/WAN design, switches, Wi-Fi planning and secure network deployments.',
      image: process.env.DEFAULT_SERVICE_IMAGE || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
    {
      title: 'Web Development',
      description: 'Modern responsive websites and web applications built for performance and SEO.',
      image: process.env.DEFAULT_SERVICE_IMAGE || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
  ];

  const defaultProjects = [
    {
      title: 'Smart CCTV deployment',
      description: 'Complete camera system and monitoring installation for a busy corporate campus.',
      category: 'CCTV',
      link: process.env.DEFAULT_PROJECT_LINK || 'https://example.com',
      imageUrl: process.env.DEFAULT_PROJECT_IMAGE || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
    {
      title: 'Office network overhaul',
      description: 'Secure LAN/WLAN upgrade with managed switches, firewalls and fast cabling.',
      category: 'Networking',
      link: process.env.DEFAULT_PROJECT_LINK || 'https://example.com',
      imageUrl: process.env.DEFAULT_PROJECT_IMAGE || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
    {
      title: 'Web platform rollout',
      description: 'Modern web application rollout with SEO-focused UI/UX and performance optimization.',
      category: 'Web',
      link: process.env.DEFAULT_PROJECT_LINK || 'https://example.com',
      imageUrl: process.env.DEFAULT_PROJECT_IMAGE || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    },
  ];

  const servicesToSeed = servicesPayload || defaultServices;
  const projectsToSeed = projectsPayload || defaultProjects;

  await mongoose.connect(mongoUri);

  await upsertByTitle(Service, servicesToSeed, { titleField: 'title' });
  await upsertByTitle(Project, projectsToSeed, { titleField: 'title' });

  console.log('Seeded services/projects (no duplicates by title).');

  await mongoose.connection.close();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('seedServicesProjects failed:', err);
    process.exit(1);
  });

