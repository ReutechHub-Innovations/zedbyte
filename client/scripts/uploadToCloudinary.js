#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configuration: set CLOUDINARY_URL or CLOUD_NAME + API_KEY + API_SECRET in environment
if (!process.env.CLOUDINARY_URL && !(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)) {
  console.error('ERROR: Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET');
  process.exit(1);
}

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const dir = path.join(__dirname, '..', 'public', 'fronpicks');
if (!fs.existsSync(dir)) {
  console.error('ERROR: directory not found:', dir);
  process.exit(1);
}

async function uploadAll() {
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  if (!files.length) {
    console.error('No image files found in', dir);
    process.exit(1);
  }

  const urls = [];
  for (const f of files) {
    const full = path.join(dir, f);
    process.stdout.write(`Uploading ${f}... `);
    try {
      const res = await cloudinary.uploader.upload(full, { folder: 'fronpicks' });
      console.log('done');
      urls.push(res.secure_url);
    } catch (err) {
      console.error('failed', err && err.message || err);
    }
  }

  console.log('\nCloudinary URLs (comma-separated):');
  console.log(urls.join(','));
  console.log('\nCopy the above value into your .env as REACT_APP_FRONPICKS=<comma-separated-urls> and rebuild the client.');
}

uploadAll();
