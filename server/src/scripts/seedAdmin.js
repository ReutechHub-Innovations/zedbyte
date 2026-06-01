const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

async function seed() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI or DATABASE_URL');
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('Missing JWT_SECRET');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';

  if (!adminEmail || !adminPassword) {
    console.warn(
      'Seed skipped: set ADMIN_EMAIL and ADMIN_PASSWORD in .env to create an admin user.'
    );
    return;
  }

  await mongoose.connect(mongoUri);

  // If admin exists, do nothing
  const existing = await User.findOne({ email: adminEmail.toLowerCase() });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
      console.log(`Updated existing user to admin: ${adminEmail}`);
    } else {
      console.log(`Admin already exists: ${adminEmail}`);
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const newUser = await User.create({
    username: adminUsername,
    email: adminEmail.toLowerCase(),
    password: hashedPassword,
    role: 'admin',
  });

  console.log(`Seeded admin user: ${newUser.email}`);
}

seed()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seed admin failed:', err);
    process.exit(1);
  });

