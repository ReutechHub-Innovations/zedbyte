// Simple one-time seed guard for race conditions / refreshes.
// It creates a document in a dedicated collection and prevents re-seeding.

const mongoose = require('mongoose');

const seedGuardSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, index: true },
    appliedAt: { type: Date, default: Date.now },
  },
  { collection: 'seed_guard' }
);

const SeedGuard = mongoose.models.SeedGuard || mongoose.model('SeedGuard', seedGuardSchema);

async function applyOnce(mongoUri, key, fn) {
  await mongoose.connect(mongoUri);

  const existing = await SeedGuard.findOne({ key });
  if (existing) {
    console.log(`Seed guard: ${key} already applied at ${existing.appliedAt.toISOString()}`);
    await mongoose.connection.close();
    return { skipped: true };
  }

  await fn();
  await SeedGuard.create({ key });
  await mongoose.connection.close();
  return { skipped: false };
}

module.exports = { applyOnce };

