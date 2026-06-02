const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dns = require('dns');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middleware/errorHandler');
const cloudinaryConfig = require('./config/cloudinary');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure Node's DNS resolver can perform SRV lookups for MongoDB Atlas.
// Some Windows environments or DNS setups block the resolver used by Node (c-ares).
// Setting public DNS servers (Google / Cloudflare) often resolves ECONNREFUSED for SRV queries.
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    console.log('DNS servers set for Node resolver:', dns.getServers());
} catch (err) {
    console.warn('Unable to set DNS servers in Node runtime:', err.message);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS for the client (set CLIENT_URL in server .env in production)
const clientUrl = process.env.CLIENT_URL || process.env.CLIENT_ORIGIN || '*';
app.use(cors({ origin: clientUrl, credentials: true }));

// Cloudinary configuration
cloudinaryConfig();

// Database connection
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!mongoUri) {
    console.error('MongoDB connection string is missing. Set MONGODB_URI or DATABASE_URL in .env');
    process.exit(1);
}

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);

// Optional seeds (one-time) when explicitly requested
// Usage:
//   SEED_ADMIN=true (plus ADMIN_EMAIL/ADMIN_PASSWORD)
//   SEED_SERVICES_PROJECTS=true (optional)
//   SEED_SERVICES_JSON='[...]' and/or SEED_PROJECTS_JSON='[...]' to fully control payload.
if (process.env.SEED_ADMIN === 'true') {
    // eslint-disable-next-line global-require
    require('./scripts/seedAdmin');
}

if (process.env.SEED_SERVICES_PROJECTS === 'true') {
    // eslint-disable-next-line global-require
    require('./scripts/seedServicesProjectsOnce');
}


// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});