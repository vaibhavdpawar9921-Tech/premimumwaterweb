const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / Status Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    brand: 'ROYAL PREMIUM WATER',
    service: 'Backend API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected (using fallback cache)',
    time: new Date().toISOString(),
  });
});

// Mount Routes
const productRoutes = require('./routes/productRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Royal Premium Water API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      enquiries: '/api/enquiries',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Database connection & Server initialization
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/royal_premium_water';

const startServer = async () => {
  try {
    if (MONGO_URI && !MONGO_URI.includes('undefined')) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log('MongoDB connected successfully');
    }
  } catch (err) {
    console.warn(
      'Notice: MongoDB connection not established (' +
        err.message +
        '). Operating in resilient in-memory mode for development.'
    );
  }

  app.listen(PORT, () => {
    console.log(`Royal Premium Water Backend API running on port ${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/health`);
  });
};

startServer();

module.exports = app;
