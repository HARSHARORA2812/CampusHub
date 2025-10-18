import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import clubRoutes from './routes/clubs.js';
import resourceRoutes from './routes/resources.js';
import opportunityRoutes from './routes/opportunities.js';
import marketplaceRoutes from './routes/marketplace.js';
import lostFoundRoutes from './routes/lostFound.js';
import feedRoutes from './routes/feed.js';
import statsRoutes from './routes/stats.js';
import adminRoutes from './routes/admin.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => req.method === 'OPTIONS' // Skip rate limiting for OPTIONS requests
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`, req.body ? `Body: ${JSON.stringify(req.body)}` : '');
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.DB_NAME || 'CampusHub'
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CampusHub API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      clubs: '/api/clubs',
      resources: '/api/resources',
      opportunities: '/api/opportunities',
      marketplace: '/api/marketplace',
      lostFound: '/api/lost-found',
      feed: '/api/feed',
      stats: '/api/stats'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CampusHub API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});

export default app;
