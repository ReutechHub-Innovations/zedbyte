const mongoose = require('mongoose');
const { applyOnce } = require('./seedGuard');

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
const guardKey = process.env.SEED_SERVICES_PROJECTS_KEY || 'services_projects_seed_v1';

if (!mongoUri) {
  throw new Error('Missing MONGODB_URI or DATABASE_URL');
}

async function run() {
  const Service = require('../models/Service');
  const Project = require('../models/Project');

  async function upsertByTitle(Model, docs) {
    for (const doc of docs) {
      const existing = await Model.findOne({ title: doc.title });
      if (existing) continue;
      await Model.create(doc);
    }
  }

  let servicesPayload = null;
  let projectsPayload = null;

  if (process.env.SEED_SERVICES_JSON) servicesPayload = JSON.parse(process.env.SEED_SERVICES_JSON);
  if (process.env.SEED_PROJECTS_JSON) projectsPayload = JSON.parse(process.env.SEED_PROJECTS_JSON);

  // Minimal schema-safe defaults (real DB rows, not mocks)
  const defaultServices = [
    {
      title: 'CCTV Installations',
      description: 'Professional CCTV system planning, installation and monitoring integrations.',
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

  await upsertByTitle(Service, servicesPayload || defaultServices);
  await upsertByTitle(Project, projectsPayload || defaultProjects);
}

applyOnce(mongoUri, guardKey, run)
  .then(() => {
    console.log('Services/projects seed done (guarded).');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Services/projects seed failed:', err);
    process.exit(1);
  });

