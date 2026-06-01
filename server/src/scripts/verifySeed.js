const mongoose = require('mongoose');

const Service = require('../models/Service');
const Project = require('../models/Project');
const User = require('../models/User');

async function main() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!mongoUri) throw new Error('Missing MONGODB_URI or DATABASE_URL');

  await mongoose.connect(mongoUri);

  const [adminCount, serviceCount, projectCount] = await Promise.all([
    User.countDocuments({ role: 'admin' }),
    Service.countDocuments({}),
    Project.countDocuments({}),
  ]);

  console.log(JSON.stringify({ adminCount, serviceCount, projectCount }, null, 2));
  await mongoose.connection.close();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('verifySeed failed:', err);
    process.exit(1);
  });

